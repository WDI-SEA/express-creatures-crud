// require modules
const express = require('express')
const rowdy = require('rowdy-logger')
const fs = require('fs')
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

// config app
const PORT = 3000
const app = express()
let rowdyResults = rowdy.begin(app)
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'))
app.use(layouts)
app.use(methodOverride('_method'))
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))

// define routes

// GET /
app.get('/', (req,res) => {
    res.render('home')
})


// listen on a port
app.listen(PORT, () => {
    console.log(`listening on :${PORT}`)
    rowdyResults.print()
})