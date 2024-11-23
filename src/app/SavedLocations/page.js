'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { Button, Card } from 'react-bootstrap';
import { getUserLocations } from '../../api/userData';

function SavedLocationsPage() {
  const { user } = useAuth();
  const [locations, setLocations] = useState([]);

  // console.log(user);

  const setUserLocations = () => {
    getUserLocations(user.uid).then(setLocations);
    console.log(locations);
  }; // SETS THE USERS LOCATIONS TO BE FILTERED LATER

  useEffect(() => {
    setUserLocations();
  }, []);

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
      {/* Saved Locations Page */}

      <Card>
        <div>
          {locations.map((location) => (
            <div key={location.id}>
              <h3>{location.name}</h3>
              <Button> Edit </Button>
              <Button> Delete </Button>

              {/* You can display other properties here as needed */}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default SavedLocationsPage;
