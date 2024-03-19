import React, { useState } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(false);
    const apiKey = "LQfLSdhyoVrQ4Uw0ChtPaujspFsN94sF"; // Replace with your API key

    const handleSubmit = async () => {
        const apiURL = `https://api.tomorrow.io/v4/timelines?location=${city}&fields=temperature&timesteps=1h&units=metric&apikey=${apiKey}`;

        try {
            const response = await fetch(apiURL);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setWeather(data);
            setError(false);
        } catch (error) {
            console.error(error);
            setError(true);
            setWeather(null);
        }
    };

    return (
        <div className="card">
            <div className="search">
                <input
                    type="text"
                    placeholder="enter city name"
                    spellCheck="false"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={handleSubmit}>Search</button>
            </div>
            {error && <div className="error"><p>Failed to fetch weather data</p></div>}
            {weather && weather.data && weather.data.timelines && weather.location && (
                <div className="weather">
                    <h1>{weather.data.timelines[0].intervals[0].startTime}</h1>
                    <p>Temperature: {weather.data.timelines[0].intervals[0].values.temperature}°C</p>
                    <p>Humidity: {weather.data.timelines[0].intervals[0].values.humidity}%</p>
                    <p>Wind Speed: {weather.data.timelines[0].intervals[0].values.windSpeed} km/hr</p>
                    <p>Weather Code: {weather.data.timelines[0].intervals[0].values.weatherCode}</p>
                    <p>Location: {weather.location.name}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
