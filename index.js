// required packages
const express = require('express')
// rowdy logger for loggin our routes
const rowdy = require('rowdy-logger')
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

// config app
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false })) // for the req body
app.use(express.static(__dirname + '/public')) // where the css will live
app.use(layouts) //use ejs layouts
// method overried so we can put and delete
app.use(methodOverride('_method'))

// define routes
app.get('/', (req, res) => {
  res.render('home')
})

// controllers
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/creatures', require('./controllers/prehistoric_creatures'))

// listen on a port
app.listen(PORT, () => {
  rowdyResults.print()
  console.log(`is that dinos i hear on port ${PORT} 🦖`)
})