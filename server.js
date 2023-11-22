// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
const methodOverride = require('method-override')

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(methodOverride('_method'))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads')
})

app.use(express.urlencoded({ extended: true }))
// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)


// MIDDLEWARE
app.use(express.static('public'))


// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})
