const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
require('dotenv').config()


app.get('/', (req, res) => {
  res.send('hello from techverse server')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rl1a5mc.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run () {
  try{
    const courseCollection = client.db("TechVerse").collection('courses');

    app.get('/courses', async(req, res) => {
      const query = {}
      const cursor = courseCollection.find(query)
      const courses = await cursor.toArray()
      res.send(courses)
    })

    app.get('/courses/:id', async (req, res) => {
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const course = await courseCollection.findOne(query)
      res.send(course)
    })
  }
  finally{

  }
}

run().catch((err) => console.log(err))



app.listen(port, () => {
  console.log('This server is running from port', port)
})