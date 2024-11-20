// Save this for later

const endpoint = 'http://api.weatherapi.com/v1';

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

export default getWeather;
