'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createLocation, updateLocation } from '../../api/userData';

const initialState = {
  name: '',
  zipcode: 0,
  show_humidity: true,
  show_chance_of_rain: true,
  set_default_location: false,
  location_type: 1,
};

function NewLocationForm({ obj = initialState, locationId }) {
  const [formInput, setFormInput] = useState(obj);
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);
    console.log(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateLocation(formInput).then(() => router.push(`/SavedLocations/${user.uid}`));
    } else {
      const payload = { ...formInput, locationId };
      createLocation(payload).then(() => router.push(`/SavedLocations/${user.uid}`));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Location</h2>

      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Location Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter a Name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      {/* ZIPCODE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Location Zipcode" className="mb-3">
        <Form.Control type="text" placeholder="Enter Zipcode" name="zipcode" value={formInput.zipcode} onChange={handleChange} required />
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
      <FloatingLabel controlId="floatingInput3" label="Show Chance of Rain" className="mb-3">
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
      <FloatingLabel controlId="floatingInput3" label="Set Default Location" className="mb-3">
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
      <FloatingLabel controlId="floatingInput4" label="Location Type" className="mb-3">
        <Form.Select aria-label="Default select example">
          <option>Select Location Type</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
        </Form.Select>
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      {/* <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      /> */}

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Location</Button>
    </Form>
  );
}

NewLocationForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    iamgeUrl: PropTypes.string,
    favorite: PropTypes.bool,
  }),
  locationId: PropTypes.number.isRequired,
};

export default NewLocationForm;
