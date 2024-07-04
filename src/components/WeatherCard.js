import React from "react";

const WeatherCard = (props) => {
  const { temp, pressure, humidity } = props?.data?.main;
  const { speed, deg } = props?.data?.wind;
  return (
    <>
      <div className="atmo-card">
        <div className="temp-name">
          <h1 className="temp">{temp.toFixed(1) + "℃"}</h1>
          <h1 className="city">{props?.data?.name}</h1>
        </div>
        <hr />
        <div className="other-data">
        <p className="pressure">{pressure / 100 + " hPa "+"Pressure"}</p>
        <p className="humidity">{humidity + " g/m³ " + "Humidity"}</p>
        <p className="speed">{speed + " km/hr " + "Speed"}</p>
        <p className="direction">{deg + " deg " + "Direction"}</p>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
