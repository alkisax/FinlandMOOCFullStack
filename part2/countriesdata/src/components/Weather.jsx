import {  useEffect, useState } from 'react';
import axios from 'axios'; 

const Weather = ({ apiKey, selectedCountry }) => {
  const [ weather, setWeather ] = useState(null) 
  console.log("entered weather comp");  


  //api.openweathermap.org/data/2.5/weather?id=524901&appid=YOUR_API_KEY
  const urlWeather = 'https://api.openweathermap.org/data/2.5/weather?q='
  if (!apiKey) {console.error('API key is missing!')}

  const hook = () => {
    axios
      .get(`${urlWeather}${selectedCountry.name.common}&appid=${apiKey}`)
      .then (response => {
        console.log(response.data)
        setWeather(response.data)
      })
  }
  useEffect(hook, [selectedCountry, apiKey])
  return (
    <>
      <h3>Weather</h3>
      {weather ? (
        <div>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <p><strong>Temperature:</strong> {(weather.main.temp - 273.15).toFixed(2)}C</p>
          <p><strong>Weather:</strong> {weather.weather[0].description}</p>
          <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
          <p><strong>Sunrise:</strong> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p><strong>Sunset:</strong> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </>
  )
}
export default Weather