const { json, response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
  const time = new Date()
  response.send(`<div>Phonebook has info for ${persons.length} people </div>
      <br><br><br><br><br>
      <div> ${time} </div>`)
})

app.get('/api/persons/:id', (request, response) =>{
  const id = Number(request.params.id)
  // console.log(id)
  const target = persons.find(n => n.id === id)
  // console.log(target)
  if (target !== undefined){
    response.send(`
    Name: ${target.name}
    <br>
    Number: ${target.number}
    `)
  }
  else {
    response.status(400).end()
  }
})

app.delete('/api/persons/:id', (request, response) =>{
  const id = Number(request.params.id)
  const target = persons.find(n => n.id === id)
  if (target !== undefined){
    persons.filter(n => n.id !== id)
    response.status(200).end()
  }
  else {
    response.status(400).end()
  }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})