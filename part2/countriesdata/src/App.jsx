import { useEffect, useState } from "react"
import axios from 'axios'
import Form from "./components/Form"
import TooMany from "./components/TooMany"
import CountryList from "./components/CountryList"
import NoCountries from "./components/NoCountries"
import OneCountry from "./components/OneCountry"

const apiKey = import.meta.env.VITE_APIKEY;
console.log(import.meta.env)
if (!apiKey) {
  console.error('API key is missing!');
}

const App = () => {
  const [ newFilter, setNewFilter] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ toggleState, setToggleState] = useState('')
  // const [ countryId, setCountryId ] = useState(0)
  const [ selectedCountry, setSelectedCountry ] = useState([])

  const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  const hook = () => {
    axios
      .get(url)
      .then (response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    setFilter(event.target.value)
  }

  const addFilter = (event) => {
    event.preventDefault()
    setFilter(newFilter)
    setNewFilter('')
  }

  const filteredCountries = filter
  ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  : countries;

  useEffect (() => {
    if (filteredCountries.length === 0) {
      setToggleState("noResults");
    } else if (filteredCountries.length === 1) {
      // setCountryId(filteredCountries[0].id)
      setSelectedCountry(filteredCountries[0])
      setToggleState("oneResult");
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      setToggleState("multipleResults");
    } else if (filteredCountries.length > 10) {
      setToggleState("tooManyResults");
    }
  }, [filteredCountries]) //check lesson, call aggain at every filtered countries change

  const viewBtn = (cca3) => {
    console.log("btn pressed")    
    const country = filteredCountries.find(country => cca3 === country.cca3)
    const countryName = country.name.common
    console.log("selected cca3", country.cca3);    
    console.log("name: ", countryName);
    setFilter(countryName)
    setSelectedCountry(country)
    setToggleState("oneResult");
  }

  return (
    <div>
        <Form 
          newFilter={newFilter}
          handleFilterChange={handleFilterChange}
          addFilter={addFilter}
        />

        {toggleState === "noResults" && <NoCountries />}

        {toggleState === "oneResult" && <OneCountry
          selectedCountry={selectedCountry}
          apiKey={apiKey}
        />}

        {toggleState === "multipleResults" && <CountryList 
          filteredCountries={filteredCountries}
          viewBtn={viewBtn}
        />}

        {toggleState === "tooManyResults" && <TooMany />}

    </div>    
  )
}
export default App