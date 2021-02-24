require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const cors = require('cors')

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const corsOptions = {
  exposedHeaders: ['token']
}
app.use(cors(corsOptions))

app.use(express.json())

app.use('/uploads', express.static('uploads'))

app.use('/', routes)

app.listen(3000)