import { useState } from "react";

const AddTasks = ({ addTask }) => {
  const [formData, setFormData] = useState({
    address: "",
    date: "",
    reminder: false,
  });

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

  const onSubmit = (e) => {
    e.preventDefault();

    //check if they filled out address
    if (formData.address.trim() === "") {
      alert("Fill out the address to add a task");
      setFormData({
        ...formData,
        address: "",
      });
      return;
    }

    //addTask
    addTask(formData.address, formData.date, formData.reminder);

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
      <div className="form-control">
        <label>Task Date</label>
        <input
          type="text"
          placeholder="boi add a task date!"
          value={formData.date}
          onChange={handleInputChange}
          name="date"
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
