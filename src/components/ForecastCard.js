'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Dropdown } from 'react-bootstrap';
import { getUserLocations } from '../api/userData';
import { useAuth } from '../utils/context/authContext';
import { getForecastsAlternate } from '../api/forecastData';

// const userId = firebaseKey-- The userId used for CRUD should be pulled from the user's firebaseId.

// export default function ForecastCard({ UserId, forecastObj, LocationName, LocationType }) {
// export default function ForecastCard({ UserId, forecastObj }) {
export default function ForecastCard({ UserId }) {
  const { user } = useAuth();
  const [userLocations, setLocations] = useState([]);
  const [currentLocationName, setCurrentLocationName] = useState(null);
  const [currnetLocationType, setCurrentLocationType] = useState(null);
  const [currentLocationId, setCurrentLocationId] = useState(null);
  const [currentForecastInfo, setCurrentForecastInfo] = useState(null);

  useEffect(() => {
    if (user && user.uid) {
      getUserLocations(user.uid).then((locations) => {
        // This will make sure locations is an object for the dropdown menu.
        if (locations && typeof locations === 'object') {
          setLocations(locations);
        } else {
          setLocations({}); // Make sure its an object.
        }
      });
    }
  }, [user]);

  const handleLocationSelect = (location) => {
    setCurrentLocationName(location.name);
    setCurrentLocationType(location.location_type);
    setCurrentLocationId(location.id);
    getForecastsAlternate(currentLocationId).then(setCurrentForecastInfo);
  };

  // Convert the userLocations object to an array for rendering in the dropdown
  const locationArray = Object.values(userLocations);

  return (
    <div>
      <Link href={`/SavedLocations/${UserId}`} passHref>
        <Button variant="primary" className="m-2">
          View Saved Locations
        </Button>
      </Link>

      {/* Saved Locations Dropdown Menu */}
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select Location
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {locationArray.length === 0 ? (
            <Dropdown.Item disabled>No saved locations</Dropdown.Item>
          ) : (
            locationArray.map((location) => (
              <Dropdown.Item key={location.id} onClick={() => handleLocationSelect(location)}>
                {location.name}
              </Dropdown.Item>
            ))
          )}
        </Dropdown.Menu>
      </Dropdown>

      {/* <div>
        <h1>Forecast Data</h1>
        <ul>
          <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
              {currentForecastInfo.map((forecast) => (
                <li key={forecast.id}>
                  <Card.Title>
                    <p>Location Name: {currentLocationName}</p>
                    <p>Location Type: {currnetLocationType}</p>
                  </Card.Title>

                  Rendering individual forecast properties instead of the whole object
                  <p>Date: {forecast.date}</p>
                  <p>Temperature: {forecast.temperature}°C</p>
                  <p>Humidity: {forecast.humidity}%</p>
                  <p>Chance of Rain: {forecast.chance_of_rain}%</p>
                  <p>
                    Icon: <img src={forecast.icon} alt="weather icon" />
                  </p>
                </li>
              ))}
            </Card.Body>
          </Card>
        </ul>
      </div>

    </div>
  );
} */}
      <div>
        <h1>Forecast Data</h1>
        {currentForecastInfo && Array.isArray(currentForecastInfo) && currentForecastInfo.length > 0 ? (
          <ul>
            <Card style={{ width: '18rem', margin: '10px' }}>
              <Card.Body>
                {currentForecastInfo.map((forecast) => (
                  <li key={forecast.id}>
                    <Card.Title>
                      <p>Location Name: {currentLocationName}</p>
                      <p>Location Type: {currnetLocationType}</p>
                    </Card.Title>

                    {/* Rendering individual forecast properties */}
                    <p>Date: {forecast.date}</p>
                    <p>Temperature: {forecast.temperature}°C</p>
                    <p>Humidity: {forecast.humidity}%</p>
                    <p>Chance of Rain: {forecast.chance_of_rain}%</p>
                    <p>
                      Icon: <img src={forecast.icon} alt="weather icon" />
                    </p>
                  </li>
                ))}
              </Card.Body>
            </Card>
          </ul>
        ) : (
          <p>Select a location to view the forecast data.</p>
        )}
      </div>
    </div>
  );
}

ForecastCard.propTypes = {
  // forecastObj: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     podcastId: PropTypes.number,
  //     id: PropTypes.number,
  //     date: PropTypes.string,
  //     temperature: PropTypes.number,
  //     humidity: PropTypes.number,
  //     chance_of_rain: PropTypes.number,
  //     icon: PropTypes.string,
  //   }),
  // ).isRequired,
  UserId: PropTypes.string.isRequired,
  // LocationName: PropTypes.string.isRequired,
  // LocationType: PropTypes.number.isRequired,
};
