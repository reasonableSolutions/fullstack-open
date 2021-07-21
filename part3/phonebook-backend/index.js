const { json, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
morgan.token('POSTdata', function(req, res) {
  // console.log('using POSTdata token')
  // console.log(res.body ? res.body : 'body undefined')
  if (res.body !== undefined){
    // console.log('have data in res.body')
    // return `${res.body.name} ${res.body.number}`
    return `${JSON.stringify(res.body)}`
  }
  else return ""
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :POSTdata', {stream: console.log()}))

let persons = [
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

const generateId = () => {
  return Math.floor(Math.random()*1000)
}

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

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    const errorMsg = body.name ? "number" : "name"
    return response.status(400).json({
      error: `${errorMsg} missing`
    })
  }

  if (persons.find(n => n.name === body.name) !== undefined){
    return response.status(400).json({
      error: 'name already exists in database'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  response.json(person)
  response.body = person
})

app.delete('/api/persons/:id', (request, response) =>{
  const id = Number(request.params.id)
  const target = persons.find(n => n.id === id)
  if (target !== undefined){
    persons = persons.filter(n => n.id !== id)
    response.body = express.json(persons)
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