// required packages
const express = require('express')
// rowdy logger for logging our routes
const rowdy = require('rowdy-logger')
const fs = require('fs')
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

// config app
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 3000

// middleware setup
app.set('view engine', 'ejs')
app.use(express.urlencoded( { extended: false } ))
app.use(express.static(__dirname + '/public')) // where the css will live
app.use(layouts) // use ejs layouts
// method override so we can put and delete
app.use(methodOverride('_method'))

// controllers
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))

// define routes
app.get('/', (req, res) => {
    res.render('home')
})

// listen on a port
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`Is that dinos I hear on port ${PORT}?`)
})