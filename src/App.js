import './App.css';
import React, { useState, useEffect } from "react";
import WeatherCard from './components/WeatherCard';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const {user, loginWithRedirect,isAuthenticated,logout} = useAuth0()
  const [weatherData, setWeatherData] = useState(null); 
  const [searchCity, setSearchCity] = useState("");
  const [error, setError] = useState(null); 

  const getData = async (city) => { 
    try {
      const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_ID}&units=metric`);
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

  return (
    <div className="App">
      {isAuthenticated? (<div className='subapp'>
        <div className='input-space'>
        <input
          className="search-box"
          type="text"
          value={searchCity}
          placeholder='Type your city name here'
          onChange={(e) => setSearchCity(e.target.value)}
        />
        <button className="search-btn" type="button" onClick={() => getData(searchCity)}>Search</button>
        <button className="logout-btn" type="button" onClick={e=>logout()}>Logout</button>
        </div> 
        
        {error && <p>No data found: {error}</p>}

       
        {weatherData && !error && <WeatherCard data={weatherData} />}
      </div>):(    <div className='login-page'>  <button type='submit'className='login-btn' onClick={(e)=>loginWithRedirect()}>Hey! User LogIn Here First....</button>
      <p className='tag-line'>Exclusive Weather Reports for Your City – Log In to Access!</p></div>
)}
      
    </div>
  );
}

export default App;

