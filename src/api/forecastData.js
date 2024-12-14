import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getLocationsByUserId = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/locations.json?orderBy="userId"&equalTo="${userId}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const getLocationsByLocationId = (locationId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/locations.json?orderBy="id"&equalTo="${locationId}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const getForecast = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/forecasts/0.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Forecast data:', data); // Debugging line
        if (data) {
          resolve(Object.values(data)); // Convert object to array of values
        } else {
          resolve([]); // Return empty array if no data
        }
      })
      .catch(reject);
  });

const getForecastsAlternate = (locationId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/forecasts.json?orderBy="location_id"&equalTo=${locationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const createNewForecast = (forecastData) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/forecasts.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(forecastData), // Pass forecast data in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data)); // Resolve with forecast data
        } else {
          resolve([]); // If no data, resolve with an empty array
        }
      })
      .catch((error) => {
        console.error('Error creating forecast:', error);
        reject(error); // Reject the promise if the API call fails
      });
  });

export { getLocationsByLocationId, getLocationsByUserId, getForecast, getForecastsAlternate, createNewForecast };
