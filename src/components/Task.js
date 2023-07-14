import { TiDelete } from "react-icons/ti";

const Task = ({ task, deleteTask, toggleReminder }) => {
  //set up api to get long & lat from the location or should I do this when making the task itself....

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

      <div className="locationCard">
        {/* loop through the weather data temperature min/max starting at task.startDateIndex ending at task.endDateIndex have to + 1 since .slice does not keep the last parameter in the return just the one before it*/}

        {task.weatherData.daily.time
          .slice(task.startDateIndex, task.endDateIndex + 1)
          .map((time, index) => (
            <div className="dayCard" key={index}>
              <p>
                <b>Date: {time.slice(5, 10)}</b>
              </p>
              <p>
              {/* Max Temp */}
                {
                  task.weatherData.daily.temperature_2m_max.slice(
                    task.startDateIndex,
                    task.endDateIndex + 1
                  )[index]
                }{" / "}

                {/* Min Temp */}
                {
                  task.weatherData.daily.temperature_2m_min.slice(
                    task.startDateIndex,
                    task.endDateIndex + 1
                  )[index]
                }{" "}
                {
                  task.weatherData.daily_units
                    .temperature_2m_min
                }
              </p>
              <p>
                %precip:{" "}
                {
                  task.weatherData.daily.precipitation_probability_max.slice(
                    task.startDateIndex,
                    task.endDateIndex + 1
                  )[index]
                }{""}
                {
                  task.weatherData.daily_units
                    .precipitation_probability_max
                }
              </p>
              <p>
                {/* Sunrise:{" "} */}
                 
                {
                  task.weatherData.daily.sunrise.slice(
                    task.startDateIndex,
                    task.endDateIndex + 1
                  )[index].slice(-5)
                }{" "}
                {/* Sunset:{" "} */}
                
                {
                  task.weatherData.daily.sunset.slice(
                    task.startDateIndex,
                    task.endDateIndex + 1
                  )[index].slice(-5)
                }
              </p>
             
            </div>
          ))}
      </div>
    </div>
  );
};
export default Task;
