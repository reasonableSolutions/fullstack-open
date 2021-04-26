import React, { useState } from 'react'

const App = () => {
  
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleAdd = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }
    if (persons.find(element => element.name === newName) !== undefined){
      const notice = `${newName} is already added to phonebook`
      window.alert(notice)
      }
    else {setPersons(persons.concat(nameObject))}
    setNewName('')
  }

  const handleTyping = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleTyping}/>
        </div>
        <div>
          <button type="submit" onClick={handleAdd}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App