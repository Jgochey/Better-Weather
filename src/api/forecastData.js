// import { clientCredentials } from "../utils/client";

// const endpoint = clientCredentials.databaseURL;

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
