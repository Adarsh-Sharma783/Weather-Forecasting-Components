import React, { useState, useEffect } from 'react';
import './WeatherApp.css';

// weather app has been added
const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const apiKey = 'a0f4054e77c430d5ccfb1c8c8ef76a6c';

  const fetchWeatherData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
      });
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  useEffect(() => {

    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className={`weather-app ${darkMode ? 'dark' : ''}`}>
      <h2>Weather App</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>
      <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      {weatherData ? (
        <div className="weather-info">
          {weatherData.cod === 200 ? (
            <div>
              <h3>Weather in {weatherData.name}</h3>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Weather: {weatherData.weather[0].description}</p>
            </div>
          ) : (
            <p className="error">City not found</p>
          )}
        </div>
      ) : (
        <p>Enter a city name and click "Get Weather"</p>
      )}
    </div>
  );
};

export default WeatherApp;
