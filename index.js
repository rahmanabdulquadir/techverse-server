const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(cors())

const courses = require('./data/courses.json')

app.get('/', (req, res) => {
  res.send('hello from techverse server')
})

app.get('/courses', (req, res) => {
  res.send(courses)
})

app.get('/courses/:id', (req, res) => {
  const id = req.params.id
  const course = courses.find(cr => cr.id === id)
  res.send(course)
})

app.listen(port, () => {
  console.log('This server is running from port', port)
})