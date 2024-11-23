'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
// import { Dropdown } from 'react-bootstrap';

export default function ForecastCard({ ForecastObj, ObjId }) {
  return (
    <div>
      <Link href={`/SavedLocations/${ForecastObj.id}`} passHref>
        <Button variant="primary" className="m-2">
          View Saved Locations
        </Button>
      </Link>

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

      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          <Card.Title>
            {ForecastObj[ObjId]}
            {/* {ForecastObj[ObjId].location_type} */}
          </Card.Title>

          {/* <Image> {ForecastObj[ObjId].icon} </Image> */}

          <p className="card-text bold">
            {/* {ForecastObj.temperature}
          {ForecastObj.humidity}
          {ForecastObj.chance_of_rain} */}
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

ForecastCard.propTypes = {
  // ForecastObj: PropTypes.shape({
  //   location_id: PropTypes.number,
  //   temperature: PropTypes.number,
  //   humidity: PropTypes.number,
  //   chance_of_rain: PropTypes.number,
  //   // firebaseKey: PropTypes.string,
  // }).isRequired,
  // onUpdate: PropTypes.func.isRequired,

  ForecastObj: PropTypes.shape({
    location_id: PropTypes.number,
    temperature: PropTypes.number,
    humidity: PropTypes.number,
    chance_of_rain: PropTypes.number,
    name: PropTypes.string,
    location_type: PropTypes.number,
    icon: PropTypes.string,

    default_location: PropTypes.number,
    id: PropTypes.number,
    username: PropTypes.string,
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        // Not sure if this is right, there might be one more "layer" of nested data to go through to get the proper data inside of the location.
        location_id: PropTypes.number,
        temperature: PropTypes.number,
        humidity: PropTypes.number,
        chance_of_rain: PropTypes.number,
        // firebaseKey: PropTypes.string,
      }),
    ),
  }).isRequired,

  ObjId: PropTypes.arrayOf(
    PropTypes.shape({
      // Not sure if this is right, there might be one more "layer" of nested data to go through to get the proper data inside of the location.
      id: PropTypes.number,
      location_type: PropTypes.number,
      name: PropTypes.string,
      set_default_location: PropTypes.bool,
      show_humidity: PropTypes.bool,
      show_chance_of_rain: PropTypes.bool,
      userId: PropTypes.number,
      zipcode: PropTypes.string,
    }),
  ),
  // uid: PropTypes.number.isRequired,
};
