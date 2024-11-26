'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { Button } from 'react-bootstrap';
import { signOut } from '@/utils/auth'; // anything in the src dir, you can use the @ instead of relative paths
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';
// import { Card } from 'react-bootstrap';
import { getUserLocations } from '../api/userData';
// import ForecastCard from '../components/ForecastCard';
// import Selector from '../components/Selector';
import { getForecastsAlternate } from '../api/forecastData';

// import { getUser } from '../api/userData';
// import { getForecasts, getLocations } from '../api/forecastData';

function Home() {
  const { user } = useAuth();
  const [locations, setLocations] = useState([]);

  const setUserLocations = () => {
    getUserLocations(user.uid).then(setLocations);
    console.log(locations);
  }; // SETS THE USERS LOCATIONS TO BE FILTERED LATER

  const [currentLocationId, setCurrentLocationId] = useState(null);
  const [currentLocationName, setCurrentLocationName] = useState(null);
  const [currnetLocationType, setCurrentLocationType] = useState(null);

  const updateCurrentLocationId = (number) => {
    if (locations[number] && locations[number].id) {
      setCurrentLocationId(locations[number].id);
      setCurrentLocationName(locations[number].name);
      setCurrentLocationType(locations[number].location_type);
      console.log(currentLocationId);
    } else {
      console.error('Invalid location or missing id');
    }
  };

  const [forecasts, setForecasts] = useState([]);

  const forecastGetter = () => {
    getForecastsAlternate(currentLocationId).then(setForecasts);
    console.log(forecasts);
  };

  useEffect(() => {
    // setUserLocations();
    // console.log(locations);

    if (locations !== null) {
      console.log(locations); // Logs the updated value
    }
  }, [locations]); // Dependency array, only triggers on changes to currentLocationId

  useEffect(() => {
    if (currentLocationId !== null) {
      console.log(currentLocationId);
    } // Logs the updated value
  }, [currentLocationId]);

  useEffect(() => {
    if (forecasts !== null) {
      console.log(forecasts); // Logs the updated value
    }
  }, [forecasts]);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}! </h1>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>

      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={setUserLocations}>
        Test Locations
      </Button>

      <div>
        <Button onClick={() => updateCurrentLocationId(2)}>Update Location</Button>
      </div>

      <div>
        <Button onClick={() => forecastGetter()}>Test Forecast</Button>
      </div>

      <div>
        <h1>Forecast Data</h1>
        <ul>
          {forecasts.map((forecast) => (
            <li key={forecast.id}>
              {/* Rendering individual forecast properties instead of the whole object */}
              <p>Date: {forecast.date}</p>
              <p>Temperature: {forecast.temperature}°C</p>
              <p>Humidity: {forecast.humidity}%</p>
              <p>Chance of Rain: {forecast.chance_of_rain}%</p>
              <p>
                Icon: <img src={forecast.icon} alt="weather icon" />
              </p>

              <p>Location Name: {currentLocationName}</p>
              <p>Location Type: {currnetLocationType}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Forecast Page

      View Saved Locations
      Dropdown Menu of Saved Locations

      Card
      location.name
      forecast.icon
      forecast.temperature
      forecast.humidity
      forecast.chance_of_rain
      location.type */}

      {/* <ForecastCard ForecastObj={} ObjId={} */}

      {/* <div className="d-flex flex-wrap justify-content-md-center">
        {locations.map((location) => (
          <ForecastCard key={location.id} ForecastObj={location} ObjId={1}  />
        ))}
      </div> */}
      {/* onUpdate={getFavPodList} */}
      {/* <ForecastCard ForecastObj={locations} ObjId={1} /> */}
      {/* <Selector SingleLocationId={1} /> */}
    </div>
  );
}

export default Home;
