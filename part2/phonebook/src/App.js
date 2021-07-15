import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import InputForm from './components/InputForm'
import Output from './components/Output'
import PersonService from './services/personservice'
import Notification  from './components/Notification'
import Error from './components/Error'

const App = () => {
  
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ noteMessage, setNoteMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

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
      const notice = `${newName} is already added to phonebook, update with new number?`
      const update = window.confirm(notice)
      if (update) {
        //lazy duplicating work here, could instead do something neater in parent conditional on line 39
        const updateID = persons.find(element => element.name === newName).id
        PersonService
          .update(updateID, nameObject)
          .then(response => {
            setPersons(persons.map(person => {
              if (person.id === updateID) {
                return response //if at number to be updated in app state, update with response
              }
              else return person //else just use what's already there
            }))
            setNoteMessage(`Added ${newName}`)
            setTimeout(() => {
              setNoteMessage(null)
            }, 5000)
          })
      }
    }
    else {  
      PersonService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNoteMessage(`Added ${newName}`)
          setTimeout(() => {
            setNoteMessage(null)
          }, 5000)
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
    setNewName('')
    setNewNumber('')
  }

  const handleRemove = (id) => {
    console.log("remove", id)
    PersonService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch (error => {
        setErrorMessage(`${persons.find(person => person.id === id).name} has already been removed.`)
      })
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
      <Notification message={noteMessage}/>
      <Error message={errorMessage}/>
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
      <Output 
        persons={personsToShow}
        handleRemove={handleRemove}
      />
    </div>
  )
}

export default App