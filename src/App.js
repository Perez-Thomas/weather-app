import "./App.css";
import dateBuilder from "./DateBuilder";
import React, { useState } from "react";

const weatherAPI = {
  key: "6bfb68468aecdf3f230fcdc9615a4160",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App(props) {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  // This function gets out weather
  const search = (event) => {
    if (event.key === "Enter") {
      fetch(
        `${weatherAPI.base}weather?q=${query}&units=metric&APPID=${weatherAPI.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  // Separate component created for dateBuilder

  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input
            className="search-bar"
            type="text"
            placeholder="Enter your City or County for weather info...🔍"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {/* ⬇️ CHANGE NAME FROM warm TO night ⬇️*/}
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="Weather-Component">
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temp">
                {Math.round(weather.main.temp * 1.8) + 32}°F
                <div className="weather">{weather.weather[0].main}</div>
              </div>
              <div className="weather">
                🌡 Feels Like: {Math.round(weather.main.feels_like * 1.8 + 32)}°F
              </div>
              <div className="weather">
                🌂 Humidity: {weather.main.humidity}%
              </div>
              <div className="weather">
                📉 Min Temp: {Math.round(weather.main.temp_min * 1.8 + 32)}°F
              </div>
              <div className="weather">
                📈 Max Temp: {Math.round(weather.main.temp_max * 1.8 + 32)}°F
              </div>
              <div className="weather">{weather.wind.speed}</div>
            </div>
          </div>
        ) : (
          " "
        )}
      </main>
    </div>
  );
}

export default App;

// Add functionality so background image changes depending on weather
