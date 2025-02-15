import Weather from './Weather';

const OneCountry = ({ selectedCountry, apiKey }) => {
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
          <Weather
            apiKey={apiKey}
            selectedCountry={selectedCountry}
          />
        </>
      </div>
    </>
    
  )}

export default OneCountry

