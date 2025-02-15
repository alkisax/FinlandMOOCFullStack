const CountryList = ({ filteredCountries, viewBtn }) => {

  return (
    <>
    <ul>
      {filteredCountries.map ((country) => {
        console.log("country cca3: ",country.cca3);
        
        return(
          <li key={country.cca3}> 
            {country.name.common} 
            <button onClick={() => viewBtn(country.cca3)}>view</button>
          </li>
        )
      })}
    </ul>
  </>
  )}

export default CountryList