//required packages
const express = require('express')
const rowdy = require('rowdy-logger')
const fs = require('fs')
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

//config app
const PORT = 3000
const app = express()
const rowdyResults = rowdy.begin(app)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public')) //where CSS will live
app.use(layouts) //use ejs layouts
app.use(methodOverride('_method'))

//define routes
app.get('/', (req, res) => {
    res.render('home')
})

// controllers
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))


//Listen on PORT
app.listen(PORT, ()=> {
    rowdyResults.print()
    console.log(`${PORT} workin workin`)
})