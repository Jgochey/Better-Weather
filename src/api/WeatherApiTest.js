const endpoint = 'https://api.weatherapi.com/v1';

const getWeather = (location) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/current.json?key=a292c40e97674731878225419240211&q=${location}&aqi=no'`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const get3DayWeather = (location) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/forecast.json?key=a292c40e97674731878225419240211&q=${location}&days=3&aqi=no&alerts=no`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getWeather, get3DayWeather };
