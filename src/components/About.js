import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about">
      <ul>
        <li>Author: Kaleb Day</li>
        <li>Date: 1/24/2023</li>
      </ul>
      <div>
        <h2>Introducing a Weather Travel App</h2>
        <p>
          Explore the world with our Weather Travel App. Powered by advanced
          technologies and APIs, it provides accurate weather information for
          your destinations. Here's what we used to create this powerful app:
        </p>
        <ul>
          <li>React: Building a responsive and dynamic user interface.</li>
          <li>
            CSS: Styling the app to create an appealing visual experience.
          </li>
          <li>
            Opencage Geocoding API: Converting addresses into precise
            coordinates for accurate weather data retrieval.
          </li>
          <li>
            Open-meteo Weather API: Fetching detailed weather information,
            including temperature, precipitation, and sunrise/sunset times.
          </li>
          <li>
            Local Storage: Storing user preferences and previous search results
            for a personalized experience.
          </li>
        </ul>
        <p>
          Plan your adventures with confidence using our Weather Travel App.
          Stay informed, make informed decisions, and enjoy your travels to the
          fullest.
        </p>
      </div>
      <Link to="/">Go Back</Link>
    </div>
  );
};
export default About;
