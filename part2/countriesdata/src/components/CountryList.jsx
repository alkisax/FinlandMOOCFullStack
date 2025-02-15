const CountryList = ({ filteredCountries }) => {
  return (
    <>
    <ul>
      {filteredCountries.map ((country) => {
        return(
          <li key={country.id}> 
            {country.name.common}
          </li>
        )
      })}
    </ul>
  </>
  )}

export default CountryList