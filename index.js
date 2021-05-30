// import express (required packages)
const express = require('express')

// rowdy logger for logging out routes
const rowdy = require('rowdy-logger')
const fs = require('fs')
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

// invoke express (configure app)
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public')) // where the css will live
app.use(layouts)  // use ejs layouts
// method over ride so we can put and delete
app.use(methodOverride('_method'))
app.use('/dinosaurs', require('./controllers/dinosaur_controller'));
app.use('/creatures', require('./controllers/prehistoric_creatures_controller'));
// define routes
app.get('/', (req, res) => {
    res.render('home')
})

// listen on a port
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`are we at ${PORT} yet?🦥`)
})

