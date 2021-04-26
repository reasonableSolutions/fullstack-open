import React, { useState } from 'react'

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
      <div>Filter shown by: <input value={nameFilter} onChange={handleFilter}/></div>
      <h2>Add a contact</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleTypingName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleTypingNumber}/>
        </div>
        <div>
          <button type="submit" onClick={handleAdd}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => 
          <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App