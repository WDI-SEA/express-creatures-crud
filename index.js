// required packages
const express = require('express')
// rowdy logger for loggin our routes
const ejs = require('ejs')
const rowdy = require('rowdy-logger')
const fs = require('fs')
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

// config app
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 2012


//middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public')) // where the css will live
app.use(layouts) //use ejs layouts
// method override so we can put and delete
app.use(methodOverride('_method'))

//controllers
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/creatures', require('./controllers/creatures'))

// define routes
app.get('/', (req, res) => {
  res.render('home')
})


// app.get('/creatures', (req, res) => {
//   // const creatures = fs.readFileSync('./prehistoric-creatures.json')
//   // const creatureData = JSON.parse(creatures)
//   // res.render(creatures)
//   res.send('hi')
// })



// listen on a port
app.listen(PORT, () => {
  rowdyResults.print()
  console.log(`is that dinos i hear on port ${PORT} 🦖`)
})