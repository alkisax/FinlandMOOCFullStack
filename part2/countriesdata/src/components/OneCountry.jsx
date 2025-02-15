import {  useEffect, useState } from 'react';
import axios from 'axios'; 

const OneCountry = ({ selectedCountry, apiKey }) => {
  const [ weather, setWeather ] = useState(null) 
  console.log("entered one country");  


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
      <div>
        <h2>{selectedCountry.name.common}</h2>
        <p><strong>Official Name:</strong> {selectedCountry.name.official}</p>
        <p><strong>Capital:</strong> {selectedCountry.capital}</p>
        <p><strong>Region:</strong> {selectedCountry.region}</p>
        <p><strong>Subregion:</strong> {selectedCountry.subregion}</p>
        <p><strong>Population:</strong> {selectedCountry.population}</p>
        <p><strong>Area:</strong> {selectedCountry.area}</p>
        <p><strong>Languages:</strong> {Object.values(selectedCountry.languages).join(", ")}</p>
        <p><strong>Currencies:</strong> {Object.keys(selectedCountry.currencies).join(", ")}</p>
        <p><strong>Timezones:</strong> {selectedCountry.timezones.join(", ")}</p>
        <p><strong>Flag:</strong> <img src={selectedCountry.flags.png} width="100" /></p>
        <p><strong>Coat of Arms:</strong> <img src={selectedCountry.coatOfArms.png} width="100" /></p>
        <p><strong>FIFA Code:</strong> {selectedCountry.fifa}</p>
        <p><strong>Country Code:</strong> {selectedCountry.ccn3}</p>
        <p><strong>Maps:</strong> <a href={selectedCountry.maps.googleMaps} target="_blank" rel="noopener noreferrer">Google Maps</a></p>

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
      </div>
    </>
    
  )}

export default OneCountry

