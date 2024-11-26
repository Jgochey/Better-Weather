'use client';

import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ForecastCard from '../../components/ForecastCard';
import { useAuth } from '../../utils/context/authContext';
import { getUserLocations } from '../../api/userData';
import { getForecastsAlternate } from '../../api/forecastData';

export default function ForecastsPage() {
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
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={setUserLocations}>
          Test Locations
        </Button>

        <div>
          <Button onClick={() => updateCurrentLocationId(2)}>Update Location</Button>
        </div>

        <div>
          <Button onClick={() => forecastGetter()}>Test Forecast</Button>
        </div>

        <ForecastCard UserId={user.uid} forecastObj={forecasts} LocationName={currentLocationName} LocationType={currnetLocationType} />
      </div>

      {/* <div>
        <h1>Forecast Data</h1>
        <ul>
          {forecasts.map((forecast) => (
            <li key={forecast.id}>
              Rendering individual forecast properties instead of the whole object
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
      </div> */}

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

      {/* <div>
        {' '}
        Forecasts
        {forecasts.map((forecast) => (
          <ForecastCard key={forecast.id} ForecastObj={forecast} />
        ))}
      </div> */}
    </>
  );
}
