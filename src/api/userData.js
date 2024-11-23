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

const getSingleLocation = (userId, locationId) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/users/${userId}/locations/${locationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { checkUser, registerUser, getUser, getUserLocations, getSingleLocation };
