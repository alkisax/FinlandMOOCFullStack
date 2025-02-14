//
import { useState, useEffect } from 'react'
// import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import phoneService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  // const hook = () => {
  //   axios
  //     .get(url)
  //     .then (response => {
  //       console.log(response.data)
  //       setPersons(response.data)
  //       // setPersons(response.name)
  //       // setnewNumber(response.number)
  //   })
  // }
  // useEffect(hook, [])

  useEffect(() => {
    phoneService
      .getAll()
      .then(response => {
        setPersons(response.data)
    })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson){
      if (existingPerson.number !== newNumber){
        if(window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)){
          const updatedPerson = { ...existingPerson, number: newNumber }
          phoneService 
            .update(existingPerson.id, updatedPerson)
            .then(response => {
              setPersons(prevPersons =>
                prevPersons.map(person =>
                  person.id !== existingPerson.id ? person : response.data
                )
              );
              setNewName('');
              setNewNumber('');
            })
            .catch(error => {
              console.error('Error updating person:', error);
            });
        }        
      } else {
      console.log("same name/number");
      alert(`${newName} is already added to phonebook`)
      return
      }
    } else {
        const personObj = {
          name: newName,
          number: newNumber
        }
      phoneService
        .create(personObj)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
      })
    }
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
    setNewNumber(event.target.value)    
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

  const deleteBtn =(id) => {
    const tmpName = persons.find(person => person.id === id).name
    if (window.confirm(`Are you sure you want to delete ${tmpName} contact?`)){
          phoneService
      .deleteId(id)
      .then ( () => {
        setPersons(persons.filter( person => person.id !== id))
      })
      .catch (error => {
        console.error("Already deleted", error);
      })
    }
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
        deleteBtn={deleteBtn}
        showAllBtn={showAllBtn}
        peopleToShow={peopleToShow}
      />
    </div>
  )
}

export default App