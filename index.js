// Required packages
const express = require('express')
// rowdy logger for logging our routes
rowdy = require('rowdy-logger')
// const fs = require('fs')
// makes layouts the default BASE doc
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

// const dinosaurs = require('./dinosaurs.json')
// Config app
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
// Site starts at /public ->
app.use(express.static(__dirname + '/public'))
app.use(layouts)
// method override so we can put and delete
app.use(methodOverride('_method'))

// Define routes or 'stubbing' routes
// HOME route
app.get('/', (req, res) => {
  res.render('home')
})

// requiring controllers
app.use('', require('./controllers/prehistoric_creatures-controllers'))
app.use('', require('./controllers/dinsosaurs-controllers'))

// List on port
app.listen(PORT, () => {
  rowdyResults.print()
  console.log(`Is that dinosaurs that I hear on port${PORT}`)
})
