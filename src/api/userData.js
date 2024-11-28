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

export { checkUser, registerUser, getUser, getUserLocations, getSingleLocation, updateLocation, deleteSingleLocation, createLocation, getLocationTypes };
