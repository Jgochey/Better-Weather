'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { get3DayWeather } from '../../api/WeatherApiTest';

export default function SignUpPage() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    get3DayWeather(36608).then(setWeatherData);
  }, [weatherData]); // Dependency array, only triggers on changes to currentLocationId

  const weatherTest = () => {
    console.log(weatherData);
  };

  const weatherTestTwo = () => {
    console.log(weatherData);
    console.log(weatherData.current.last_updated);
    console.log(weatherData.current.temp_f);
    console.log(weatherData.current.humidity);

    // console.log(weatherData.forcecast?.forecastday[0]?.day?.daily_chance_of_rain)

    if (weatherData && weatherData.forecast && Array.isArray(weatherData.forecast.forecastday)) {
      console.log(weatherData.forecast.forecastday[0].day.daily_chance_of_rain);
    } else {
      console.log('forecastday is not available or the data structure is not correct');
    }

    // I think  this is working, apply it to the forecast page now.
  };

  const weatherTestThree = () => {
    console.log(weatherData.forecast.forecastday[0].day.daily_chance_of_rain);
  };

  return (
    <div>
      SignUp Page
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={weatherTest}>
        Test Weather Data
      </Button>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={weatherTestTwo}>
        Test All Weather Data
      </Button>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={weatherTestThree}>
        Test forecastday
      </Button>
    </div>
  );
}
