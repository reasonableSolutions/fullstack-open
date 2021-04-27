import React, { useState } from 'react'
import Filter from './components/Filter'
import InputForm from './components/InputForm'
import Output from './components/Output'

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

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
    else {setPersons(persons.concat(nameObject))}
    setNewName('')
    setNewNumber('')
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