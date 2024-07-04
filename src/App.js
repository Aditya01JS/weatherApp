import "./App.css";
import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [weatherData, setWeatherData] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [error, setError] = useState(null);
  const [savedWeather, setSavedWeather] = useState([]); 

  const getData = async (city) => {
    try {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_ID}&units=metric`
      );
      const jsonData = await data.json();

      if (data.ok) {
        setWeatherData(jsonData);
        setError(null);
      } else {
        throw new Error(jsonData.message);
      }
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
      console.error("Error in fetching weather data:", error.message);
    }
  };

  useEffect(() => {
    getData("London");
  }, []);

  const handleSaveWeather = () => {
    if (weatherData) {
      setSavedWeather([...savedWeather, weatherData]);
    }
  };

  const handleDeleteWeather = (index) => {
    const newWeatherList = [...savedWeather];
    newWeatherList.splice(index, 1);
    setSavedWeather(newWeatherList);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div className="subapp">
          <div className="input-space">
            <input
              className="search-box"
              type="text"
              value={searchCity}
              placeholder="Type your city name here"
              onChange={(e) => setSearchCity(e.target.value)}
            />
            <button
              className="search-btn"
              type="button"
              onClick={() => getData(searchCity)}
            >
              Search
            </button>
            <button className="logout-btn" type="button" onClick={logout}>
              Logout
            </button>
          </div>

          {error && <p>No data found: {error}</p>}

          {weatherData && !error && <WeatherCard data={weatherData} />}

          <button className="save-btn" onClick={handleSaveWeather}>
            Save Weather Data
          </button>

          {savedWeather.length > 0 && (
            <div className="saved-weather-list">
              <h2>Saved Weather Entries:</h2>
              <ul>
                {savedWeather.map((weather, index) => (
                  <li key={index}>
                    <p>
                      {weather.name}: {weather.main.temp}°C
                    </p>
                    <p className="pressure">
                      {weather?.main?.pressure / 100 + " hPa " + "Pressure"}
                    </p>
                    <p className="humidity">
                      {weather?.main?.humidity + " g/m³ " + "Humidity"}
                    </p>
                    <p className="speed">{weather?.wind?.speed + " km/hr " + "Speed"}</p>
                    <p className="direction">{weather?.wind?.deg + " deg " + "Direction"}</p>
                    
                    <button onClick={() => handleDeleteWeather(index)}>
                      Delete
                    </button>
                    <hr />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="login-page">
          <button
            type="submit"
            className="login-btn"
            onClick={loginWithRedirect}
          >
            Log In
          </button>
          <p className="tag-line">
            Exclusive Weather Reports for Your City – Log In to Access!
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
