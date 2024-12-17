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
      if (!data || Object.keys(data).length === 0) {
        // Redirect to the New Forecast form if the user does not have any saved locations
        window.location.replace('/NewForecastLocation');
        return;
      }

      const locationsWithKeys = Object.entries(data).map(([key, value]) => ({
        ...value, // Spread the existing location data (e.g., id, name, etc.)
        firebaseKey: key, // Add the Firebase key to the location object
      }));

      setLocations(locationsWithKeys);
    });
  }; // SETS THE USERS LOCATIONS TO BE FILTERED LATER

  useEffect(() => {
    if (user && user.uid) {
      setUserLocations();
    }
  }, [user.uid]);

  const deleteSavedLocation = (location) => {
    if (window.confirm(`Delete ${location.name}?`)) {
      deleteSingleLocation(user.uid, location.firebaseKey).then(() => setUserLocations());
    }
  };

  const displayLocationTypeName = (locationType) => {
    // Displays the proper name of the location type depending on the value.
    if (locationType === 0 || locationType === '0') {
      return 'City';
    }
    if (locationType === 1 || locationType === '1') {
      return 'Rural';
    }
    return 'Other';
  };

  return (
    <>
      <div className="text-center d-flex flex-column justify-content-center align-content-center newForecastOptions">
        <Link href="/NewForecastLocation/new" passHref>
          <Button variant="danger" type="button" size="lg" className="copy-btn" style={{ background: '#ffffff', borderColor: '#ffffff', color: '#1a1a1a' }}>
            Add New Forecast Location
          </Button>
        </Link>

        <Link href="/" passHref>
          <Button variant="primary" className="m-2" style={{ background: '#dda15e', borderColor: '#dda15e', color: '#ffffff' }}>
            Return to Forecast
          </Button>
        </Link>
      </div>

      <div className="savedLocationsContainer">
        {Object.values(locations).map((location) => (
          <Card className="savedlocationcard" key={location.firebaseKey} style={{ background: '#606c38' }}>
            <h3 style={{ color: '#ffffff' }}>
              {location.name} {location.set_default_location && '⭐'}{' '}
            </h3>

            {/* Show the proper name of the location type depending on the number value of location.location_type */}
            <h3 style={{ color: '#ffffff' }}>{displayLocationTypeName(location.location_type)}</h3>

            <Link href={`/NewForecastLocation/${user.uid}/edit/${location.firebaseKey}`} passHref>
              <Button variant="info" style={{ background: '#ffffff', borderColor: '#ffffff', color: '#1a1a1a', width: '100%' }}>
                {' '}
                Edit{' '}
              </Button>
            </Link>

            <Button variant="danger" onClick={() => deleteSavedLocation(location)}>
              {' '}
              Delete{' '}
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}

export default SavedLocationsPage;
