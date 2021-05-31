// required packages
const express = require('express')

// rowdy-logger for loggin our routes
const rowdy = require('rowdy-logger')
const fs = require('fs') // for looking at json file
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

// config app
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public')) // where css will live
app.use(layouts) //use ejs layouts
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))

// allows you to use a form to PUT & DELETE
app.use(methodOverride('_method'))

// define routes
app.get('/', (req,res) => {
    res.render('home')
})

// listen on port
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`Are those dinos I hear on port ${PORT} 🦖`)
})