'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
// import { Dropdown } from 'react-bootstrap';

// const userId = firebaseKey-- The userId used for CRUD should be pulled from the user's firebaseId.

export default function ForecastCard({ UserId, forecastObj, LocationName, LocationType }) {
  return (
    <div>
      <Link href={`/SavedLocations/${UserId}`} passHref>
        <Button variant="primary" className="m-2">
          View Saved Locations
        </Button>
      </Link>

      <div>
        <h1>Forecast Data</h1>
        <ul>
          <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
              {forecastObj.map((forecast) => (
                <li key={forecast.id}>
                  <Card.Title>
                    <p>Location Name: {LocationName}</p>
                    <p>Location Type: {LocationType}</p>
                  </Card.Title>

                  {/* Rendering individual forecast properties instead of the whole object */}
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

      {/* Saved Locations Dropdown Menu goes here */}
      {/* <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>

        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>

        <Dropdown.Menu>
            <div className="d-flex flex-wrap justify-content-md-center">
              {tempList.map((genre) => (
                // GIVE DATA
                <Dropdown.Item onClick={() => submitClick(genre.id, genre.name)}> {genre.name} </Dropdown.Item>
              ))}
            </div>
          </Dropdown.Menu>

      </Dropdown.Menu>
    </Dropdown>
 */}
    </div>
  );
}

ForecastCard.propTypes = {
  forecastObj: PropTypes.arrayOf(
    PropTypes.shape({
      podcastId: PropTypes.number,
      id: PropTypes.number,
      date: PropTypes.string,
      temperature: PropTypes.number,
      humidity: PropTypes.number,
      chance_of_rain: PropTypes.number,
      icon: PropTypes.string,
    }),
  ).isRequired,
  UserId: PropTypes.string.isRequired,
  LocationName: PropTypes.string.isRequired,
  LocationType: PropTypes.number.isRequired,
};
