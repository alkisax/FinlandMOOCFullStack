//
import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const url = 'http://localhost:3001/persons'

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then (response => {
        console.log(response.data)
        setPersons(response.data)
        // setPersons(response.name)
        // setnewNumber(response.number)
      })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName )){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObj = {
      name: newName,
      number: newNumber
    }
    axios
      .post(url, personObj)
      .then (response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setnewNumber('')
      })
    // setPersons(persons.concat(personObj))
    // setNewName('')
    // setnewNumber('')
  }

  const addFilter = (event) => {
    event.preventDefault()
    setFilter(newFilter)
    setNewFilter('')
    setShowAll(false)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value);
    setnewNumber(event.target.value)    
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value)    
  }

  const peopleToShow = showAll ?
                       persons :
                       persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const showAllBtn = () => {
    setShowAll(true)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newFilter={newFilter} 
        handleFilterChange={handleFilterChange} 
        addFilter={addFilter} 
      />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />


      <h2>Numbers</h2>
      <Numbers
        showAllBtn={showAllBtn}
        peopleToShow={peopleToShow}
      />
    </div>
  )
}

export default App