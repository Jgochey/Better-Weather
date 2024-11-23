'use client';

// import React, { useState } from 'react';
// import ForecastCard from '../../components/ForecastCard';
// import { useAuth } from '../../utils/context/authContext';
// import { getUser } from '../../api/userData';

export default function ForecastsPage() {
  // const [forecasts, setForecasts] = useState([]);
  // const { user } = useAuth();

  // const getUserData = () => {
  //   getUser(user).then(setForecasts);
  // };

  // useEffect(() => {
  //   getUserData();

  //   // Get forecast data instead?
  // }, []);

  return (
    <div>
      {' '}
      Forecasts
      {/* {forecasts.map((forecast) => (
          <ForecastCard key={forecast.id} ForecastObj={forecast} />
        ))} */}
    </div>
  );
}
