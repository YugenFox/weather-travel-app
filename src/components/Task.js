import { TiDelete } from "react-icons/ti";

const Task = ({ task, deleteTask, toggleReminder }) => {
  //set up api to get long & lat from the location or should I do this when making the task itself....

  const startDateIndex = task.startDateIndex;
  const endDateIndex = task.endDateIndex;
  const temperaturesMax = task.weatherData.daily.temperature_2m_max.slice(startDateIndex, endDateIndex + 1);
  const temperaturesMin = task.weatherData.daily.temperature_2m_min.slice(startDateIndex, endDateIndex + 1);
  const precipitationProbabilities = task.weatherData.daily.precipitation_probability_max.slice(startDateIndex, endDateIndex + 1);
  const sunriseTimes = task.weatherData.daily.sunrise.slice(startDateIndex, endDateIndex + 1);
  const sunsetTimes = task.weatherData.daily.sunset.slice(startDateIndex, endDateIndex + 1);
  const dailyUnitsTemperature = task.weatherData.daily_units.temperature_2m_min
  const dailyUnitsPrecipitation = task.weatherData.daily_units.precipitation_probability_max


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
        .slice(startDateIndex, endDateIndex + 1)
        .map((time, index) => (
          <div className="dayCard" key={index}>
            <p>
              <b>Date: {time.slice(5, 10)}</b>
            </p>
            <p>
              {/* Max Temp */}
              {temperaturesMax[index]} / {""}
              {/* Min Temp */}
              {temperaturesMin[index]}{" "}
              {dailyUnitsTemperature}
            </p>
            <p>
              %precip: {precipitationProbabilities[index]}
              {dailyUnitsPrecipitation}
            </p>
            <p>
              {/* Sunrise:{" "} */}
              {sunriseTimes[index].slice(-5)} {/* Sunset:{" "} */}
              {sunsetTimes[index].slice(-5)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Task;
