'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createLocation, deleteSingleLocation, getLocationTypes, getUserLocations, updateDefaultLocation, updateLocation } from '../../api/userData';
// import { createNewForecast } from '../../api/forecastData';

const initialState = {
  name: '',
  zipcode: 0,
  show_humidity: true,
  show_chance_of_rain: true,
  set_default_location: false,
  location_type: 1,
  // firebaseKey: null,
};

function NewLocationForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [locationTypes, setLocationTypes] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getLocationTypes().then(setLocationTypes);
    getUserLocations(user.uid);

    if (obj.firebaseKey) setFormInput(obj); // Give formInput location data for editing.
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeType = (e) => {
    const { name, value } = e.target;

    // If the value is location_type, convert it to a number
    const newValue = name === 'location_type' ? Number(value) : value;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const saveLocation = () => {
    const action = obj.firebaseKey ? updateLocation : createLocation;
    const locationData = obj.firebaseKey ? { ...formInput, firebaseKey: obj.firebaseKey } : { ...formInput, uid: user.uid };

    action(user.uid, locationData).then(({ name }) => {
      if (!obj.firebaseKey) {
        const patchPayload = { firebaseKey: name };
        updateLocation(user.uid, name, patchPayload);
      }
      router.push(`/SavedLocations/${user.uid}`);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If the user wants to set this location as the default...
    if (formInput.set_default_location) {
      // ...Call updateDefaultLocation to ensure only one default location exists.
      deleteSingleLocation(user.uid, undefined);
      // Remove any unessecary, undefined locations.
      updateDefaultLocation(user.uid, formInput.firebaseKey)
        .then(() => {
          deleteSingleLocation(user.uid, undefined);
          saveLocation();
          // Check for undefined locations again and remove them.
        })
        .catch((error) => {
          console.error('Error updating default location:', error);
        });
    } else {
      // If the user does not want to set this location as the default, just save the location.
      saveLocation();
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Location</h2>

      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Location Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter a Name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      {/* ZIPCODE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Location Zipcode" className="mb-3">
        <Form.Control type="text" placeholder="Enter Zipcode" name="zipcode" value={formInput.zipcode} onChange={handleChange} required pattern="\d{5}" title="Please entre a valid 5-digit zipcode." />
      </FloatingLabel>

      {/* SHOW HUMIDITY INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Show Humidity" className="mb-3">
        <Form.Check
          className="text-white mb-3"
          type="switch"
          id="show_humidity"
          name="show_humidty"
          label="Show Humidity"
          checked={formInput.show_humidity}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              show_humidity: e.target.checked,
            }));
          }}
        />
      </FloatingLabel>

      {/* SHOW CHANCE OF RAIN INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Show Chance of Rain" className="mb-3">
        <Form.Check
          className="text-white mb-3"
          type="switch"
          id="show_chance_of_rain"
          name="show_chance_of_rain"
          label="Show Chance of Rain"
          checked={formInput.show_chance_of_rain}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              show_chance_of_rain: e.target.checked,
            }));
          }}
        />
      </FloatingLabel>

      {/* SET DEFAULT LOCATION INPUT  */}
      <FloatingLabel controlId="floatingInput5" label="Set Default Location" className="mb-3">
        <Form.Check
          className="text-white mb-3"
          type="switch"
          id="set_default_location"
          name="set_default_location"
          label="Set as Default Location"
          checked={formInput.set_default_location}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              set_default_location: e.target.checked,
            }));
          }}
        />
      </FloatingLabel>

      {/* LOCATION TYPE INPUT  */}
      <FloatingLabel controlId="floatingSelect" label="Location Type">
        <Form.Select aria-label="Location Type" name="location_type" onChange={handleChangeType} className="mb-3" value={formInput.location_type ?? ''} required>
          {/* The ?? will check for the 0th value */}
          <option value="">Select Location Type</option>
          {locationTypes.map((location) => (
            <option key={location.firebaseKey} value={location.firebaseKey}>
              {location.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Location</Button>
    </Form>
  );
}

NewLocationForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    zipcode: PropTypes.number,
    show_humidity: PropTypes.bool,
    show_chance_of_rain: PropTypes.bool,
    set_default_location: PropTypes.bool,
    location_type: PropTypes.number,
    firebaseKey: PropTypes.string,
  }),
};

export default NewLocationForm;
