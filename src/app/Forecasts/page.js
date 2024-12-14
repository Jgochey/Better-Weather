// 'use client';

// import React from 'react';
// // import { Button } from 'react-bootstrap';
// import ForecastCard from '../../components/ForecastCard';
// import { useAuth } from '../../utils/context/authContext';
// // import { getUserLocations } from '../../api/userData';
// // import { getForecastsAlternate } from '../../api/forecastData';

// export default function ForecastsPage() {
//   const { user } = useAuth();
//   // const [locations, setLocations] = useState([]);

//   // const setUserLocations = () => {
//   //   getUserLocations(user.uid).then(setLocations);
//   //   console.log(locations);
//   // }; // SETS THE USERS LOCATIONS TO BE FILTERED LATER

//   // const [currentLocationId, setCurrentLocationId] = useState(null);
//   // const [forecasts, setForecasts] = useState([]);

//   // const updateCurrentLocationId = (number) => {
//   //   if (locations[number] && locations[number].id) {
//   //     setCurrentLocationId(locations[number].id);
//   //     console.log(currentLocationId);
//   //   } else {
//   //     console.error('Invalid location or missing id');
//   //   }
//   // };

//   // const forecastGetter = () => {
//   //   getForecastsAlternate(currentLocationId).then(setForecasts);
//   //   console.log(forecasts);
//   // };

//   // useEffect(() => {
//   //   // setUserLocations();
//   //   // console.log(locations);

//   //   if (locations !== null) {
//   //     console.log(locations); // Logs the updated value
//   //   }
//   // }, [locations]); // Dependency array, only triggers on changes to currentLocationId

//   // useEffect(() => {
//   //   if (currentLocationId !== null) {
//   //     console.log(currentLocationId);
//   //   } // Logs the updated value
//   // }, [currentLocationId]);

//   // useEffect(() => {
//   //   if (forecasts !== null) {
//   //     console.log(forecasts); // Logs the updated value
//   //   }
//   // }, [forecasts]);

//   return (
//     <div
//       className="text-center d-flex flex-column justify-content-center align-content-center"
//       style={{
//         height: '90vh',
//         padding: '30px',
//         maxWidth: '400px',
//         margin: '0 auto',
//       }}
//     >
//       {/* <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={setUserLocations}>
//         Test Locations
//       </Button>

//       <div>
//         <Button onClick={() => updateCurrentLocationId(2)}>Update Location</Button>
//       </div> */}

//       {/* <div>
//         <Button onClick={() => forecastGetter()}>Test Forecast</Button>
//       </div> */}

//       <ForecastCard UserId={user.uid} />
//     </div>
//   );
// }
