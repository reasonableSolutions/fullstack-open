import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import InputForm from './components/InputForm'
import Output from './components/Output'
import PersonService from './services/personservice'

const App = () => {
  
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  useEffect(() => {
    PersonService
      .getAll()
      .then(response => {
        setPersons(response)
      })
    /* axios
      .get('http://localhost:3001/persons')
      .then(response => {
        const notes = response.data
        setPersons(notes)
      }) */
  }, [])

  const personsToShow = (nameFilter === '')
    ? persons
    : persons.filter(person =>
      person.name.match(RegExp(nameFilter,'gi')) !== null)

  const handleAdd = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.find(element => element.name === newName) !== undefined){
      const notice = `${newName} is already added to phonebook`
      window.alert(notice)
      }
    else {  
      PersonService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
        .catch( error => {
          window.alert("whoops, HTTP POST failed")
        })
      /* axios
        .post('http://localhost:3001/persons', nameObject)
        .then( response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
        .catch( error => {
          window.alert("whoops, HTTP POST failed")
        }) */
    }
  }

  const handleTypingName = (event) => {
    setNewName(event.target.value)
  }

  const handleTypingNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleFilter={handleFilter}/>
      <h2>Add a contact</h2>
      <InputForm 
        newName={newName} 
        handleName={handleTypingName} 
        newNumber={newNumber}
        handleNumber={handleTypingNumber}
        handleAdd={handleAdd}
        />
      <h2>Numbers</h2>
      <Output persons={personsToShow}/>
    </div>
  )
}

export default App