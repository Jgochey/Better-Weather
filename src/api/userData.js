import 'firebase/auth';
import { clientCredentials } from '../utils/client';

const getUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/users/${uid}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getUserLocations = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/users/${uid}/locations.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getUserDefaultLocation = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/users/${uid}/locations.json?orderBy="set_default_location"&equalTo=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Ensure that we have data, and get the first location in the object (if available)
        if (data && Object.keys(data).length > 0) {
          // Assuming that only one location will have set_default_location true
          const defaultLocationKey = Object.keys(data)[0]; // Get the first location key
          resolve(data[defaultLocationKey]); // Return the location object
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('No default location found');
        }
      })
      .catch(reject);
  });

const updateDefaultLocation = (uid, newLocationId) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/users/${uid}/locations.json?orderBy="set_default_location"&equalTo=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatePromises = [];

        // If a default location exists, update it to set_default_location: false
        if (data && Object.keys(data).length > 0) {
          const defaultLocationKey = Object.keys(data)[0]; // Get the first location; there should only be one default location.

          // Create a promise to update the old default location to false.
          updatePromises.push(
            fetch(`${clientCredentials.databaseURL}/users/${uid}/locations/${defaultLocationKey}.json`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                set_default_location: false,
              }),
            }),
          );
        }

        // Set the new location as the new default.
        updatePromises.push(
          fetch(`${clientCredentials.databaseURL}/users/${uid}/locations/${newLocationId}.json`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              set_default_location: true,
            }),
          }),
        );

        // Make sure all the changes happen at once.
        Promise.all(updatePromises)
          .then(() => resolve('Default location updated successfully'))
          .catch(reject);
      })
      .catch(reject);
  });

const checkUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/checkuser?uid=${uid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((resp) => {
        if (resp.ok) {
          resolve(resp.json());
        } else {
          resolve({});
        }
      })
      .catch(reject);
  });

const registerUser = (userInfo) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/users`, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSingleLocation = (userId, firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/users/${userId}/locations/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteSingleLocation = (userId, firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/users/${userId}/locations/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createLocation = (userId, payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/users/${userId}/locations.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateLocation = (userId, firebaseKey, payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/users/${userId}/locations/${firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const getLocationTypes = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/location_types.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export { checkUser, registerUser, getUser, getUserLocations, getSingleLocation, updateLocation, deleteSingleLocation, createLocation, getLocationTypes, getUserDefaultLocation, updateDefaultLocation };
