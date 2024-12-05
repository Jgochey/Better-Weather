/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Dropdown } from 'react-bootstrap';
import { getUserLocations } from '../api/userData';
import { useAuth } from '../utils/context/authContext';
// import { getForecast } from '../api/forecastData';
import { get3DayWeather } from '../api/WeatherApiTest';

export default function ForecastCard({ UserId }) {
  const { user } = useAuth();
  const [userLocations, setLocations] = useState([]);
  const [currentLocationName, setCurrentLocationName] = useState(null);
  const [currentLocationType, setCurrentLocationType] = useState(null);
  // const [currentLocationId, setCurrentLocationId] = useState(null);
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

  // Set the forecast to match the currently selected location.
  const handleLocationSelect = (location) => {
    setCurrentLocationName(location.name);
    setCurrentLocationType(location.location_type);
    // setCurrentLocationId(location.id);
    get3DayWeather(location.zipcode).then((forecast) => {
      setCurrentForecastInfo(forecast);
    });
    console.log(currentForecastInfo);
  };

  const displayLocationTypeName = () => {
    // eslint-disable-next-line eqeqeq
    if (currentLocationType === 0) {
      return <p>Location Type: City </p>;
      // eslint-disable-next-line eqeqeq
    }
    if (currentLocationType === 1) {
      return <p>Location Type: Rural </p>;
    }
    return <p>Location Type: Other </p>;
  };

  // Convert the userLocations object to an array for rendering in the dropdown
  const locationArray = Object.values(userLocations);

  const weatherTest = () => {
    console.log(currentForecastInfo);
  };

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

        <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={weatherTest}>
          Test Weather Data
        </Button>

        <Dropdown.Menu>
          {locationArray.length === 0 ? (
            <Dropdown.Item disabled>No saved locations</Dropdown.Item>
          ) : (
            locationArray.map((location) => (
              <Dropdown.Item key={location.firebaseKey} onClick={() => handleLocationSelect(location)}>
                {location.name}
              </Dropdown.Item>
            ))
          )}
        </Dropdown.Menu>
      </Dropdown>

      <div>
        <h1>Forecast Data</h1>
        {currentForecastInfo && currentForecastInfo.forecast && currentForecastInfo.forecast.forecastday && currentForecastInfo.forecast.forecastday.length > 0 ? (
          <>
            <div className="primaryForecast">
              <Card style={{ width: '18rem', margin: '10px' }}>
                <Card.Body>
                  {/* Accessing forecast for each day directly */}
                  <Card.Title>
                    <p>Location Name: {currentLocationName}</p>
                    {displayLocationTypeName()}
                  </Card.Title>

                  {/* For Day 1 */}
                  <p>Date: {currentForecastInfo.current.last_updated}</p>
                  <p>Temperature: {currentForecastInfo.current.temp_f}°F</p>
                  <p>Humidity: {currentForecastInfo.current.humidity}%</p>
                  <p>Chance of Rain: {currentForecastInfo.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
                  <p>
                    Icon: <img src={currentForecastInfo.current.condition.icon} alt={currentForecastInfo.current.condition.text} />
                  </p>
                </Card.Body>
              </Card>
            </div>

            <p>Upcoming Weather</p>

            <div className="secondaryForecasts">
              <Card style={{ width: '18rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title>
                    <h1> Tomorrow </h1>
                    {/* For Day 2 */}
                  </Card.Title>

                  <p>
                    Icon: <img src={currentForecastInfo.forecast.forecastday[1].day.condition.icon} alt="weather icon" />
                  </p>
                  <p>Temperature: {currentForecastInfo.forecast.forecastday[1].day.avgtemp_f}°F</p>
                  <p>Humidity: {currentForecastInfo.forecast.forecastday[1].day.avghumidity}%</p>
                  <p>Chance of Rain: {currentForecastInfo.forecast.forecastday[1].day.daily_chance_of_rain}%</p>
                  <p>{displayLocationTypeName()}</p>
                </Card.Body>
              </Card>

              <Card style={{ width: '18rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title>
                    <h1> The Day After </h1>
                    {/* For Day 3 */}
                  </Card.Title>
                </Card.Body>
                Icon: <img src={currentForecastInfo.forecast.forecastday[2].day.condition.icon} alt="weather icon" />
                <p>Temperature: {currentForecastInfo.forecast.forecastday[2].day.avgtemp_f}°F</p>
                <p>Humidity: {currentForecastInfo.forecast.forecastday[2].day.avghumidity}%</p>
                <p>Chance of Rain: {currentForecastInfo.forecast.forecastday[2].day.daily_chance_of_rain}%</p>
                <p>{displayLocationTypeName()}</p>
              </Card>
            </div>
          </>
        ) : (
          <p>Select a location to view the upcoming forecast.</p>
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
