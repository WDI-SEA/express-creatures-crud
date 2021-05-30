// required packages
const express = require('express')
// rowdy logger for loggin our routes
const rowdy = require('rowdy-logger')
const fs = require('fs')
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

// config app
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(express.static(__dirname + '/public'))  // where the css will live
app.use(layouts)  // use ejs layouts
// method override so we can put and delete
app.use(methodOverride('_method'))
app.use('/dinosaurs', require('./controllers/dinosaurController'))
app.use('/creatures', require('./controllers/prehistoricCreatures'))

// define routes
app.get('/', (req, res) => {
    res.render('home')
})


//listen on a port
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`is that dinos i hear on port ${PORT} 🦕`)
})