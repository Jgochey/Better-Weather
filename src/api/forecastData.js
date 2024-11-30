import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// const getForecasts = (userId) =>
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}/${userId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => resolve(data))
//       .catch(reject);
//   });

//   const getLocations = (userId) =>
//     new Promise((resolve, reject) => {
//       fetch(`${endpoint}/${userId}/locations`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => resolve(data))
//         .catch(reject);
//     });

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

const createNewForecast = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/forecasts.json`, {
      method: 'POST',
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

// const getForecastsTakeThree = (userId, locationsId) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/locations.json?orderBy="userId"&equalTo="${userId}"`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data) {
//         resolve(Object.values(data));
//       } else {
//         resolve([]);
//       }
//     })
//     .catch(reject);
// });

export { getLocationsByLocationId, getLocationsByUserId, getForecastsAlternate, createNewForecast };
