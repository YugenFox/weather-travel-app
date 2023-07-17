import { TiDelete } from "react-icons/ti";
import { LuSunrise, LuSunset, LuCloudRain } from "react-icons/lu";

// import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Task = ({ task, deleteTask, toggleReminder }) => {
  //set up api to get long & lat from the location or should I do this when making the task itself....
  const formatTime = (time) => {
    const [date, timeString] = time.split("T");
    const [hour, minute] = timeString.slice(0, 5).split(":");
    const formattedHour = (hour % 12 || 12).toString();
    const period = hour >= 12 ? "PM" : "AM";
    // return `${formattedHour}:${minute}` + `${period}`;
    return `5:3232`;
    //cuts off the return on screen to last 5 characters for some reason, Don't use
  };

  const startDateIndex = task.startDateIndex;
  const endDateIndex = task.endDateIndex;
  const temperaturesMax = task.weatherData.daily.temperature_2m_max.slice(
    startDateIndex,
    endDateIndex + 1
  );
  const temperaturesMin = task.weatherData.daily.temperature_2m_min.slice(
    startDateIndex,
    endDateIndex + 1
  );
  const precipitationProbabilities =
    task.weatherData.daily.precipitation_probability_max.slice(
      startDateIndex,
      endDateIndex + 1
    );
  const sunriseTimes = task.weatherData.daily.sunrise.slice(
    startDateIndex,
    endDateIndex + 1
  );
  const sunsetTimes = task.weatherData.daily.sunset.slice(
    startDateIndex,
    endDateIndex + 1
  );

  const dailyUnitsTemperature = task.weatherData.daily_units.temperature_2m_min;
  const dailyUnitsPrecipitation =
    task.weatherData.daily_units.precipitation_probability_max;

  // var customSlider = {
  //   dots: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   adaptiveHeight: true,
  //   variableWidth: true,
  // };
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
// delete
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const dayCardElements = task.weatherData.daily.time
    .slice(startDateIndex, endDateIndex + 1)
    .map((time, index) => (
      <div className="dayCard" key={index}>
        <p>
          <b>Date: {time.slice(5, 10)}</b>
        </p>
        <div className="dayCard_Temp">
          <p>
            {/* Max Temp */}
            {temperaturesMax[index] || "NA"}
          </p>{" "}
          / {""}
          <p>
            {/* Min Temp */}
            {temperaturesMin[index] || "NA"} {dailyUnitsTemperature || "NA"}
          </p>
        </div>
        <p>
          {/* Max Precipitation Probability */}
          <LuCloudRain /> {precipitationProbabilities[index]}
          {dailyUnitsPrecipitation}
        </p>
        <p>
          {/* Sunrise & Sunset Time */}
          <LuSunrise /> {sunriseTimes[index].slice(-5) ||
            "NA"} <LuSunset /> {sunsetTimes[index].slice(-5) || "NA"}
        </p>
      </div>
    ));

  let sliderComponent;

  if (dayCardElements.length > 3) {
    console.log(dayCardElements, dayCardElements.length)
    sliderComponent = <Slider {...sliderSettings}>{dayCardElements}</Slider>;
  } else {
    sliderComponent = <div className="locationCard">{dayCardElements}</div>;
  }

  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => toggleReminder(task.id)}
    >
      <h3>
        Location: {task.address}
        <TiDelete
          style={{ color: "red" }}
          onClick={() => deleteTask(task.id)}
        />
      </h3>
      <div>
        {/* loop through the weather data temperature min/max starting at task.startDateIndex ending at task.endDateIndex have to + 1 since .slice does not keep the last parameter in the return just the one before it*/}

        {sliderComponent}
      </div>

      <h2>Testing</h2>
      <Slider {...settings}>{dayCardElements}</Slider>

      {/* test slider, delete later */}
      <h2>Manuel</h2>
      <Slider {...settings}>
        <div>
          <div className="dayCard" key={0}>
            <p>
              <b>Date: 05:32</b>
            </p>
            <div className="dayCard_Temp">
              <p>{temperaturesMax[0] || "NA"}</p> / {""}
              <p>
                {temperaturesMin[0] || "NA"} {dailyUnitsTemperature || "NA"}
              </p>
            </div>
            <p>
              <LuCloudRain /> {precipitationProbabilities[0]}
              {dailyUnitsPrecipitation}
            </p>
            <p>
              <LuSunrise /> {sunriseTimes[0].slice(-5) || "NA"} <LuSunset />{" "}
              {sunsetTimes[0].slice(-5) || "NA"}
            </p>
          </div>
        </div>
        <div>
          <div className="dayCard" key={0}>
            <p>
              <b>Date: 05:32</b>
            </p>
            <div className="dayCard_Temp">
              <p>{temperaturesMax[0] || "NA"}</p> / {""}
              <p>
                {temperaturesMin[0] || "NA"} {dailyUnitsTemperature || "NA"}
              </p>
            </div>
            <p>
              <LuCloudRain /> {precipitationProbabilities[0]}
              {dailyUnitsPrecipitation}
            </p>
            <p>
              <LuSunrise /> {sunriseTimes[0].slice(-5) || "NA"} <LuSunset />{" "}
              {sunsetTimes[0].slice(-5) || "NA"}
            </p>
          </div>
        </div>
        <div>
          <div className="dayCard" key={0}>
            <p>
              <b>Date: 05:32</b>
            </p>
            <div className="dayCard_Temp">
              <p>{temperaturesMax[0] || "NA"}</p> / {""}
              <p>
                {temperaturesMin[0] || "NA"} {dailyUnitsTemperature || "NA"}
              </p>
            </div>
            <p>
              <LuCloudRain /> {precipitationProbabilities[0]}
              {dailyUnitsPrecipitation}
            </p>
            <p>
              <LuSunrise /> {sunriseTimes[0].slice(-5) || "NA"} <LuSunset />{" "}
              {sunsetTimes[0].slice(-5) || "NA"}
            </p>
          </div>
        </div>
        <div>
          <div className="dayCard" key={0}>
            <p>
              <b>Date: 05:32</b>
            </p>
            <div className="dayCard_Temp">
              <p>{temperaturesMax[0] || "NA"}</p> / {""}
              <p>
                {temperaturesMin[0] || "NA"} {dailyUnitsTemperature || "NA"}
              </p>
            </div>
            <p>
              <LuCloudRain /> {precipitationProbabilities[0]}
              {dailyUnitsPrecipitation}
            </p>
            <p>
              <LuSunrise /> {sunriseTimes[0].slice(-5) || "NA"} <LuSunset />{" "}
              {sunsetTimes[0].slice(-5) || "NA"}
            </p>
          </div>
        </div>
      </Slider>
    </div>
  );
};
export default Task;
