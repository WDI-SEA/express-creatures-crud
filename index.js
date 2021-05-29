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
app.set('view engine', 'ejs')
app.use(express.urlencoded( { extended: false } ))
app.use(express.static(__dirname + '/public')) // where the css will live
app.use(layouts) // use ejs layouts
// method override so we can put and delete
app.use(methodOverride('_method'))

// define routes
app.get('/', (req, res) => {
    res.render('home')
})

/*~~ DINOSAUR ROUTES ~~*/

// GET /dinosaurs -- READ all dinos
app.get('/dinosaurs', (req, res) => {
    // read the dino file
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
    // send back the json
    res.render('dinosaurs/index.ejs', { dinoData: dinoData } )
})

// POST /dinosaurs -- CREATE a new dino
app.post('/dinosaurs', (req, res) => {
    // read dino file
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    console.log(req.body)
    // add data from the request body to the dino data
    dinoData.push(req.body)

    // write the file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

// GET /dinosaurs/new -- READ (show) a form to add a dino -- redirect to /dinosaurs
app.get('/dinosaurs/new', (req, res) => {
    res.render('dinosaurs/new.ejs')
})

// GET /dinosaurs/:id -- READ one specific dino
app.get('/dinosaurs/:id', (req, res) => {
    // get our dino data
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // look up one dino with the request parameters
    const dino = dinoData[req.params.id]

    // send one dino back
    res.json( { dino } )
})

// GET /dinosaurs/edit/:id -- READ (show) form to edit one dino
app.get('/dinosaurs/edit/:id', (req, res) => {
    // get the dino info to populate the form
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    const dino = dinoData[req.params.id]
    // render the template
    res.render('dinosaurs/edit.ejs', { dino: dino , dinoId: req.params.id})
})

// PUT /dinosaurs/:id -- UPDATE (edit) one dino -- redirect to /dinosaur/:id
app.put('/dinosaurs/:id', (req, res) => {
    // get the dino data from our json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // find one dino from the req.params.id and use the req.body to update
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type

    // write the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

// DELETE /dinosaurs/:id -- DESTROY one specific dino
app.delete('/dinosaurs/:id', (req, res) => {
    // get our dino json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // remove one dino from the array
    dinoData.splice(req.params.id, 1)

    // write the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to /dinosaurs
    res.redirect('/dinosaurs')
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