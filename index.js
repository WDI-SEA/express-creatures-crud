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

// define routes
app.get('/', (req, res) => {
    res.render('home')
})

/*~~ PREHISTORIC ROUTES ~~*/

// GET /prehistoric_creatures -- READ all prehistoric creatures
app.get('/prehistoric_creatures', (req, res) => {
    // read prehistoric creatures file
    const prehistCreatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(prehistCreatures)

    res.send(creatureData)
})

// GET /prehistoric_creatures/new -- READ (show) a form to add a prehistoric creature -- redirect to /prehistoric_creatures
app.get('/prehistoric_creatures/new', (req, res) => {
    res.send('setup form to add a prehistoric creature')
})

// POST /prehistoric_creatures -- CREATE a new prehistoric creature
app.post('/prehistoric_creatures', (req, res) => {
    // read prehistoric creatures file
    const prehistCreatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(prehistCreatures)

    console.log(req.body)
    // add data from the request body to the prehistoric creatures data
    creatureData.push(req.body)

    // write the file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    // redirect to /prehistoric_creatures
    res.redirect('/prehistoric_creatures')
})

// GET /prehistoric_creatures/:id -- READ one specific prehistoric creature
app.get('/prehistoric_creatures/:id', (req, res) => {
    // read prehistoric creatures file
    const prehistCreatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(prehistCreatures)

    res.send(creatureData[req.params.id])
})

// GET /prehistoric_creatures/edit/:id -- READ (show) a form to edit one prehistoric creature
app.get('/prehistoric_creatures/edit/:id', (req, res) => {
    res.send('setup form to edit a prehistoric creature')
})

// PUT /prehistoric_creatures/:id -- UPDATE (edit) one prehistoric creature -- redirect to /prehistoric_creatures
app.put('/prehistoric_creatures/:id', (req, res) => {
    // read prehistoric creatures file
    const prehistCreatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(prehistCreatures)

    // find one prehistoric creature from the req.params.id and use the req.body to update
    creatureData[req.params.id].type = req.body.type
    creatureData[req.params.id].img_url = req.body.img_url

    // write the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    // redirect to /prehistoric_creatures
    res.redirect('/prehistoric_creatures')
})

// DELETE /prehistoric_creatures/:id -- DESTROY one specific prehistoric creature
app.delete('/prehistoric_creatures/:id', (req, res) => {
    // read prehistoric creatures file
    const prehistCreatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(prehistCreatures)

    // remove one creature from the array
    creatureData.splice(req.params.id, 1)

    // write the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    // redirect to /prehistoric_creatures
    res.redirect('/prehistoric_creatures')
})

// listen on a port
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`Is that dinos I hear on port ${PORT}?`)
})