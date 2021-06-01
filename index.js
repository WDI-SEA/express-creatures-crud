// required packages
const express = require('express')
// rowdy logger for logging our routes
const rowdy = require('rowdy-logger')
// const fs = require('fs') not using on this js
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')


// Config app
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public')) // where CSS will live
app.use(layouts) // use ejs layouts
//method overide so we can put and delete
app.use(methodOverride('_method'))
app.use('/dinosaurs', require('./controller/dinosaursController'))
// app.use('/dinosaurs', require('./controller/prehistoricController.js'))

// define routes
app.get('/', (req, res) => {
    res.render('home')
})

//listen on a port
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`Do I hear a roar on ${PORT}?`)
})