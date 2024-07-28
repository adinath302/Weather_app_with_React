import React, { useEffect, useRef, useState } from "react";
import styles from "./Weather.module.css";

const Weather = () => {
  const [weatherData, setweatherData] = useState(false);

  const inputRef = useRef(); // for search bar input field reference

  const allIcons = {
    "01d": "./images/clear.png",
    "01n": "./images/clear.png",
    "02d": "./images/cloud.png",
    "02n": "./images/cloud.png",
    "03d": "./images/cloud.png",
    "03n": "./images/cloud.png",
    "04d": "./images/drizzle.png",
    "04n": "./images/drizzle.png",
    "09d": "./images/rain.png",
    "09n": "./images/rain.png",
    "10d": "./images/rain.png",
    "10n": "./images/rain.png",
    "13d": "./images/snow.png",
    "13n": "./images/snow.png",
  };

  const search = async (city) => {
    // search function for fetching data from API and setting it in weatherData object
    if (city === "") {
      // if search bar is empty then show alert
      alert("Please Enter City Name");
      return;
    }
    // Api Fetch here
    try {
      // try catch block for error handling
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url); // fetching data from url
      const data = await response.json(); // getting data in json format
      if (!response.ok) {
        alert(data.message);
        return; // if response is not ok then return
      }
      // console.log(data);

      const icon = allIcons[data.weather[0].icon]; // getting icon from allIcons object and storing it in icon variable

      setweatherData({
        // setting data in weatherData object for display in UI
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        Location: data.name,
        temperature: Math.floor(data.main.temp),
        icon: icon,
      });

      // console.log(weatherData);
    } catch (error) {
      setweatherData(false);
      console.error("Error in fetching weather data", error);
    }
  };

  useEffect(() => {
    // calling search function on page load
    search("Mumbai");
  }, []);

  return (
    <div className={styles.weather}>
      <div className={styles.search_bar}>
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src="./images/search.png"
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {weatherData ? (
        <>
          <img src={weatherData.icon} className={styles.weather_icon} />
          <p className={styles.temperature}>{weatherData.temperature}°C</p>
          <p className={styles.location}>{weatherData.Location}</p>
          <div className={styles.weather_data}>
            <div className={styles.col}>
              <img src={weatherData.icon} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className={styles.col}>
              <img src="./images/wind.png" alt="" />
              <div>
                <p>{weatherData.wind_speed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
