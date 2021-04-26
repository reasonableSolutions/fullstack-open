import React, { useState } from 'react'

const App = () => {
  
  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas', 
      number: '852-1216654'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person => 
          <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App