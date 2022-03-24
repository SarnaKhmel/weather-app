import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=bcae092d49a4c425372b5aca10b59d35`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      {location != null && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp}°C</h1> : null}
            </div>
            <div className="description">
              {data.main ? <h2>{data.weather[0].main}</h2> : null}
            </div>
          </div>
          {data.name != undefined && (
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold">{data.main.feels_like}°C</p>
                ) : null}
                <p>Feels like</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity}% </p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed} m/s</p>
                ) : null}
                <p>Wind</p>
              </div>
            </div>
          )}
        </div>
      )}
      {/* {location == null && (
        <div className="empty">
          <h1>Enter location !</h1>
        </div>
      )} */}
    </div>
  );
}

export default App;
