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
import { get3DayWeather } from '../api/WeatherApiTest';

export default function ForecastCard({ UserId }) {
  const { user } = useAuth();
  const [userLocations, setLocations] = useState([]);
  const [currentLocationName, setCurrentLocationName] = useState(null);
  const [currentLocationType, setCurrentLocationType] = useState(null);
  const [currentForecastInfo, setCurrentForecastInfo] = useState(null);
  const [currentForecastHumidity, setCurrentForecastHumidity] = useState(true);
  const [currentForecastCOR, setCurrentForecastCOR] = useState(true);

  useEffect(() => {
    if (user && user.uid) {
      getUserLocations(user.uid).then((locations) => {
        if (locations && typeof locations === 'object' && Object.keys(locations).length > 0) {
          // This will make sure locations is an object for the dropdown menu.
          setLocations(locations); // Set locations if valid
        } else {
          setLocations({});
          // If there are no Forecast Locations available, redirect to the New Forecast Form
          window.location.replace('/NewForecastLocation');
        }
      });
    }
  }, [user]);

  // Set the forecast to match the currently selected location.
  const handleLocationSelect = (location) => {
    setCurrentLocationName(location.name);
    setCurrentLocationType(location.location_type);
    setCurrentForecastHumidity(location.show_humidity);
    setCurrentForecastCOR(location.show_chance_of_rain);
    get3DayWeather(location.zipcode).then((forecast) => {
      setCurrentForecastInfo(forecast);
    });
  };

  // DEFAULT LOCATION HANDLING
  useEffect(() => {
    if (user && user.uid) {
      getUserLocations(user.uid)
        .then((locations) => {
          if (locations && typeof locations === 'object' && Object.keys(locations).length > 0) {
            // Check if locations is a valid object then, find the default location by searching for the location with set_default_location: true.
            const foundDefaultLocation = Object.values(locations).find((location) => location.set_default_location === true);

            if (foundDefaultLocation) {
              // If a default location is found render the forecast cards.
              handleLocationSelect(foundDefaultLocation);
            } else {
              console.log('No default location found');
            }
          } else {
            console.log('No locations available');
          }
        })
        .catch((error) => {
          console.error('Error fetching locations:', error);
        });
    }
  }, [user]); // Dependency on 'user', ensuring this runs when 'user' changes

  const displayLocationTypeName = () => {
    if (currentLocationType === 0) {
      return <div style={{ background: '#ffffff' }}>City </div>;
    }
    if (currentLocationType === 1) {
      return <div style={{ background: '#ffffff' }}>Rural </div>;
    }
    return <div style={{ background: '#ffffff' }}>Other </div>;
  };

  // Convert the userLocations object to an array for rendering in the dropdown
  const locationArray = Object.values(userLocations);

  return (
    <div>
      <div className="forecastoptions">
        <Link href={`/SavedLocations/${UserId}`} passHref>
          <Button variant="primary" className="m-2" style={{ width: '400px', height: '100px', alignSelf: 'center', background: '#bc6c25', borderColor: '#bc6c25', fontSize: '35px' }}>
            View Saved Locations
          </Button>
        </Link>

        {/* Saved Locations Dropdown Menu */}
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: '400px', height: '100px', alignSelf: 'center', background: '#ffffff', borderColor: '#ffffff', color: '#212121', fontSize: '35px', marginTop: '8px' }}>
            Select Location
          </Dropdown.Toggle>

          <Dropdown.Menu className="custom-dropdown-menu">
            {locationArray.length === 0 ? (
              <Dropdown.Item disabled>No saved locations</Dropdown.Item>
            ) : (
              locationArray.map((location) => (
                <Dropdown.Item className="custom-dropdown-item" key={location.firebaseKey} onClick={() => handleLocationSelect(location)}>
                  {location.name}
                </Dropdown.Item>
              ))
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="allforecasts" style={{ width: '18rem', marginTop: '180px', scale: '150%' }}>
        {currentForecastInfo && currentForecastInfo.forecast && currentForecastInfo.forecast.forecastday && currentForecastInfo.forecast.forecastday.length > 0 ? (
          <>
            <div className="primaryForecast">
              <Card style={{ width: '18rem', margin: '10px', background: '#606c38' }}>
                <Card.Body>
                  {/* Accessing forecast for each day directly */}
                  <Card.Title>
                    {/* <h1>Today</h1> */}
                    <div style={{ background: '#ffffff', fontSize: '50px' }}>{currentLocationName}</div>
                    {displayLocationTypeName()}
                  </Card.Title>

                  {/* For Day 1 */}
                  <div style={{ background: '#dda15e' }}>Date: {currentForecastInfo.current.last_updated}</div>
                  <div>
                    <img src={currentForecastInfo.current.condition.icon} alt={currentForecastInfo.current.condition.text} />
                  </div>
                  <div style={{ fontSize: '40px', background: '#dda15e' }}> {currentForecastInfo.current.temp_f}°F</div>

                  {/* Show only if humidity is set to true for this location */}
                  {currentForecastHumidity && <div style={{ background: '#dda15e' }}>Humidity: {currentForecastInfo.current.humidity}%</div>}

                  {/* Show only if chance of rain is set to true for this location */}
                  {currentForecastCOR && <div style={{ background: '#dda15e' }}>Chance of Rain: {currentForecastInfo.forecast.forecastday[0].day.daily_chance_of_rain}%</div>}
                </Card.Body>
              </Card>
            </div>

            <h1 className="upcoming" style={{ background: '#dda15e', color: '#090909', fontSize: '40px' }}>
              Upcoming Weather
            </h1>
            <div className="secondaryForecasts" style={{ background: '#283618' }}>
              <Card style={{ width: '18rem', margin: '10px', background: '#dda15e' }}>
                <Card.Body>
                  <Card.Title>
                    <h1> Tomorrow </h1>
                    {/* For Day 2 */}
                  </Card.Title>

                  <div>
                    <img src={currentForecastInfo.forecast.forecastday[1].day.condition.icon} alt="weather icon" />
                  </div>
                  <div style={{ fontSize: '40px', background: '#996f41', color: '#ffffff' }}>{currentForecastInfo.forecast.forecastday[1].day.avgtemp_f}°F</div>

                  {/* Show only if humidity is set to true for this location */}
                  {currentForecastHumidity && <div style={{ background: '#996f41', color: '#ffffff' }}>Humidity: {currentForecastInfo.forecast.forecastday[1].day.avghumidity}%</div>}

                  {/* Show only if chance of rain is set to true for this location */}
                  {currentForecastCOR && <div style={{ background: '#996f41', color: '#ffffff' }}>Chance of Rain: {currentForecastInfo.forecast.forecastday[1].day.daily_chance_of_rain}%</div>}
                </Card.Body>
              </Card>

              <Card style={{ width: '18rem', margin: '10px', background: '#dda15e' }}>
                <Card.Body>
                  <Card.Title>
                    <h1> In 2 Days </h1>
                    {/* For Day 3 */}
                  </Card.Title>
                  <div>
                    <img src={currentForecastInfo.forecast.forecastday[2].day.condition.icon} alt="weather icon" />
                  </div>
                  <div style={{ fontSize: '40px', background: '#996f41', color: '#ffffff' }}> {currentForecastInfo.forecast.forecastday[2].day.avgtemp_f}°F</div>

                  {/* Show only if humidity is set to true for this location */}
                  {currentForecastHumidity && <div style={{ background: '#996f41', color: '#ffffff' }}>Humidity: {currentForecastInfo.forecast.forecastday[2].day.avghumidity}%</div>}

                  {/* Show only if chance of rain is set to true for this location */}
                  {currentForecastCOR && <div style={{ background: '#996f41', color: '#ffffff' }}>Chance of Rain: {currentForecastInfo.forecast.forecastday[2].day.daily_chance_of_rain}%</div>}
                </Card.Body>
              </Card>
            </div>
          </>
        ) : (
          <div>Select a location to view the upcoming forecast.</div>
        )}
      </div>
    </div>
  );
}

ForecastCard.propTypes = {
  UserId: PropTypes.string.isRequired,
};
