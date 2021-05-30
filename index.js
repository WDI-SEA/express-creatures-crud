const express = require('express')
const rowdy = require('rowdy-logger')
const fs = require('fs')
const { emitWarning } = require('process')
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
//CONFIG APP
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false })) //for POST route
app.use(express.static(__dirname + '/public')) //where CSS will live
app.use(layouts) //use ejs layouts
app.use(methodOverride('_method'))

//DEFINE ROUTES
app.get('/', (req, res) => {
    res.render('home')
})

// GET /dinosaurs -- READ all dinos
app.get('/dinosaurs', (req, res) => {
    //read the dino file
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
    //send back the json
    res.render('dinosaurs/index.ejs', { dinoData }) //{dinoData} is the same as {dinoData:dinoData}
})

// POST /dinosaurs -- CREATE a new dino
app.post('/dinosaurs', (req, res) => {
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    console.log(req.body)
    //add data from the request body to the dino data
    dinoData.push(req.body)

    //write the file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    //redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

// GET /dinosaurs/new -- READ (show) a form to add a dino
app.get('/dinosaurs/new', (req, res) => {
    res.render('dinosaurs/new.ejs')
})

// GET /dinosaurs/:id -- READ one specific dino
app.get('/dinosaurs/:id', (req, res) => {
    //get dino data
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    //look up one dino with the request parameters 
    const dino = dinoData[req.params.id]

    //send one dino back
    res.json({ dino })
})

// GET /dinosaurs/edit/:id -- READ (show) form to edit one dino -- to DISPLAY a FORM
app.get('/dinosaurs/edit/:id', (req, res) => { // /edit/:id is cuz theres a dino/:id above
    // get the dino info to populate the form
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    const dino = dinoData[req.params.id]
    // render the template
    res.render('dinosaurs/edit.ejs', { dino: dino,  dinoId: req.params.id })
  })
  
  

// PUT /dinosaurs/:id -- UPDATE (edit) one dinp --- redirect to /dinosaur/:id
app.put('/dinosaurs/:id', (req, res) => {     //app.put works like app.post
    //get the dino data from our json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    //find on dino from the req.params.id and use the req body to update
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type

    //write the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    //redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

// DELETE /dinosaur/:id -- DESTROY one specific dino
app.delete('/dinosaurs/:id', (req, res) => {
    //get our dino JSON
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    //remove one dino from the array -- use req.params
    dinoData.splice(req.params.id, 1)

    //save dinosaurs.json
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    console.log("deleted")
    //redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

//GET /prehistoric_creatures -- READ all creatures\
app.get('/prehistoric_creatures', (req, res) => {
    //read the creature file
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    console.log(creatureData)
    //rend back the json
    res.render('prehistoric_creatures/index.ejs', { creatureData })
})

// POST /prehistoric_creatures -- CREATE a new creature 
app.post('/prehistoric_creatures', (req, res) => {
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    console.log(req.body)
    //add data from the request body to the creature data 
    creatureData.push(req.body)
    //write the file 
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    //redirect to /prehistoric_creatures
    res.redirect('/prehistoric_creatures')
})


//GET /prehistoric_creatures/new -- READ (show) a form to add a creature 
app.get('/prehistoric_creatures/new', (req, res) => {
    res.render('prehistoric_creatures/new.ejs')
})

//GET /prehistoric_creatures/:id -- READ one specific creature 
app.get('/prehistoric_creatures/:id', (req, res) => {
    //get creature data 
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    //look up one creature with the request parameters
    const creature = creatureData[req.params.id]
    //send one creature back
    res.json({ creature })
})

//GET /prehistoric_creatures/edit/:id -- READ (show) form to edit one creature -- to DISPLAY a FORM 
app.get('/prehistoric_creatures/edit/:id', (req, res) => {
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    const creature = creatureData[req.params.id]
    res.render('prehistoric_creatures/edit.ejs', { creature: creature, creatureId: req.params.id })
})    

//PUT /prehistoric_creatures/:id -- UPDATE (edit) one creature -- redirect to /prehistoric_creatures/:id	
app.put('/prehistoric_creatures/:id', (req, res) => {
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    creatureData[req.params.id].type = req.body.type
    creatureData[req.params.id].img_url = req.body.img_url
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})

//DELETE /prehistoric_creatures/:id	-- DESTROY one specific creature 
app.delete('/prehistoric_creatures/:id', (req, res) => {
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    creatureData.splice(req.params.id, 1)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})

//listen on a port
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`is that dinos AND prehistoric creatures i hear on port ${PORT}🦕`)
})
