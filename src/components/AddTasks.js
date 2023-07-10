import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTasks = ({ addTask }) => {
  const [formData, setFormData] = useState({
    address: "",
    startDate: null,
    endDate: null,
    startDateIndex: null,
    endDateIndex: null,
    reminder: false,
  });

  const today = new Date();
  //weather api only goes 16 days in the future
  //will use start date and end date to loop through only the parts of the next 16 days of data the user selects
  const minDate = today;
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 16);

  //logs the date range
  useEffect(() => {
    console.log(
      "dateRange",
      `Start: ${formData.startDate} - End: ${formData.endDate}  STARTINDEX: ${formData.startDateIndex} - ENDINDEX: ${formData.endDateIndex}`
    );
  }, [formData.startDate, formData.endDate]);

  const handleDateChange = (update) => {
    const today = new Date();
    const startDate = update[0];
    const endDate = update[1];

    if (startDate && endDate) {
      const startDay = startDate.getDate();
      const endDay = endDate.getDate();
      const daysFromTodayToStart = startDay - today.getDate();
      const daysFromTodayToEnd = endDay - today.getDate();
      //using 0 as fallback incase the date is negative or before today somehow
      const startDateIndex = Math.max(daysFromTodayToStart, 0);
      const endDateIndex = Math.max(daysFromTodayToEnd, 0);

      setFormData({
        ...formData,
        startDate: update[0],
        endDate: update[1],
        startDateIndex: startDateIndex,
        endDateIndex: endDateIndex,
      });
    } else {
      setFormData({
        ...formData,
        startDate: update[0],
        endDate: update[1],
      });
    }
  };

  const handleInputChange = (event) => {
    // another way to do much of below
    //const {name, value, type, checked} = event.target
    /*...prevFormData,
      [name]: type === "checkbox" ? checked : value */
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    //check if they filled out address
    //add check if its a valid address if opencage returns just Status OK instead of place
    if (formData.address.trim() === "") {
      alert("Fill out the address to add a task");
      setFormData({
        ...formData,
        address: "",
      });
      return;
    }

    //set geoCoordinates for addTask (Forward geocode - address to coordinates)
    let geoCoordinates = {}; //used in addTask
    const opencage = require("opencage-api-client");

    // note that the library takes care of URI encoding
    try {
      const data = await opencage.geocode({
        q: formData.address,
        key: process.env.REACT_APP_OPENCAGE_API_KEY,
      });
      if (data.status.code === 200 && data.results.length > 0) {
        const place = data.results[0];
        console.log(place.formatted);
        console.log(place.geometry);
        geoCoordinates = place.geometry; // e.g{lat: 33.2588817, lng: -86.8295337}
        console.log(place.annotations.timezone.name);
      } else {
        console.log("Status", data.status.message);
        console.log("total_results", data.total_results);
        //clears address form item if invalid address entered
        if (data.total_results === 0) {
          alert(`${data.total_results} results found, enter a valid address`);
          setFormData({
            ...formData,
            address: "",
          });
          return;
        }
      }
    } catch (error) {
      console.log("Error", error.message);
      if (error.status.code === 402) {
        console.log("hit free trial daily limit");
        console.log("become a customer: https://opencagedata.com/pricing");
      }
    }

    //get weather data from open-meteo.com - no api key required - 10,000 limit requests per day
    let weatherData = {}; //will be used in addTask and task component for rendering weather data
    //need start and end days added
    //right now is for only 1 day span
    const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${geoCoordinates.lat}&longitude=${geoCoordinates.lng}&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&windspeed_unit=mph&precipitation_unit=inch&timezone=auto&forecast_days=1`;
    try {
      const response = await fetch(weatherAPI);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      weatherData = data;
      console.log("weatherData: ", weatherData);
    } catch (error) {
      console.error(error);
    }

    //addTask
    addTask(
      formData.address,
      formData.reminder,
      geoCoordinates,
      weatherData,
      formData.startDate,
      formData.endDate,
      formData.startDateIndex,
      formData.endDateIndex
    );

    //set form state data back to blank after addTask complete
    setFormData({
      address: "",
      date: "",
      reminder: false,
    });
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Address Name</label>
        <input
          type="text"
          placeholder="Input address for next adventure"
          value={formData.address}
          onChange={handleInputChange}
          name="address"
        />
      </div>
      {/* <div className="form-control">
        <label>Task Date</label>
        <input
          type="text"
          placeholder="boi add a task date!"
          value={formData.date}
          onChange={handleInputChange}
          name="date"
        />
      </div> */}
      <div className="form-control">
        <label>Date Range</label>
        <DatePicker
          selectsRange={true}
          startDate={formData.startDate}
          endDate={formData.endDate}
          onChange={handleDateChange}
          isClearable={true}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Arrival - Leaving date"
        />
      </div>
      <div className="form-control-check">
        <label>Task Reminder</label>
        <input
          type="checkbox"
          placeholder="boi add a task description!"
          checked={formData.reminder}
          value={formData.reminder}
          onChange={handleInputChange}
          name="reminder"
        />
      </div>

      <input
        className="btn btn-block"
        type="submit"
        value="Submit Location"
      ></input>
    </form>
  );
};
export default AddTasks;
