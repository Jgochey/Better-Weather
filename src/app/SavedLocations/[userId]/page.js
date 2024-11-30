'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleLocation, getUserLocations } from '../../../api/userData';

function SavedLocationsPage() {
  const { user } = useAuth();
  const [locations, setLocations] = useState([]);

  const setUserLocations = () => {
    getUserLocations(user.uid).then((data) => {
      // Add the Firebase key to each location
      const locationsWithKeys = Object.entries(data).map(([key, value]) => ({
        ...value, // Spread the existing location data (e.g., id, name, etc.)
        firebaseKey: key, // Add the Firebase key to the location object
      }));
      setLocations(locationsWithKeys); // Update state with locations that now include firebaseKey
      console.log(locations);
    });
  }; // SETS THE USERS LOCATIONS TO BE FILTERED LATER

  useEffect(() => {
    setUserLocations();
    console.log(locations);
  }, [user.uid]);

  const deleteSavedLocation = (location) => {
    if (window.confirm(`Delete ${location.name}?`)) {
      deleteSingleLocation(user.uid, location.firebaseKey).then(() => setUserLocations());
    }
  };

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
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={setUserLocations}>
        Test Locations
      </Button>

      <Link href="/NewForecastLocation/new" passHref>
        <Button variant="danger" type="button" size="lg" className="copy-btn">
          Add New Forecast Location
        </Button>
      </Link>

      <Link href="/Forecasts" passHref>
        <Button variant="primary" className="m-2">
          Return to Forecast
        </Button>
      </Link>

      <Card>
        <div>
          {Object.values(locations).map((location) => (
            <div key={location.firebaseKey}>
              <h3>{location.name}</h3>

              <Link href={`/NewForecastLocation/${user.uid}/edit/${location.firebaseKey}`} passHref>
                <Button variant="info"> Edit </Button>
              </Link>

              <Button variant="danger" onClick={() => deleteSavedLocation(location)}>
                {' '}
                Delete{' '}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default SavedLocationsPage;