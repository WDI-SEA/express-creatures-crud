//required
const express = require('express')
//rowdy logger for loggin routes
const rowdy = require('rowdy-logger')
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

//config app
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 3030

//MIDDLEWARE SETUP
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false }))
app.use(express.static(__dirname + '/public')) //where the css will
app.use(layouts) // use ejs layouts
//method overide so we can put and delete
app.use(methodOverride('_method'))

app.use('/dinos', require('./controllers/dinos'))
app.use('/prehistoric-creatures', require('./controllers/creatures'))

//define routes
app.get('/', (req, res) => {
  res.render('home')
})


app.listen(PORT, () => {
  rowdyResults.print()
  console.log('iS that DInoS I hear')
})