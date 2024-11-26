'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { getUserLocations } from '../../../api/userData';

function SavedLocationsPage() {
  const { user } = useAuth();
  const [locations, setLocations] = useState([]);

  const setUserLocations = () => {
    getUserLocations(user.uid).then(setLocations);
    console.log(locations);
  }; // SETS THE USERS LOCATIONS TO BE FILTERED LATER

  useEffect(() => {
    setUserLocations();
  }, [user.uid]);

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
      {/* <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={setUserLocations}>
        Test Locations
      </Button>

      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={setUserLocations}>
        Add New Forecast Location
      </Button> */}

      <Link href="/Forecasts" passHref>
        <Button variant="primary" className="m-2">
          Return to Forecast
        </Button>
      </Link>

      <Card>
        <p> Coming Soon </p>

        <div>
          {Object.values(locations).map((location) => (
            <div key={location.id}>
              <h3>{location.name}</h3>
              <Button> Edit </Button>
              <Button> Delete </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default SavedLocationsPage;
