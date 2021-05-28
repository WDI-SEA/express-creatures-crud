// require modules
const express = require('express')
const rowdy = require('rowdy-logger')
const fs = require('fs')
const layouts = require('express-ejs-layouts')

// config app
const PORT = 3000
const app = express()
let rowdyResults = rowdy.begin(app)
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'))
app.use(layouts)

// define routes

// GET /
app.get('/', (req,res) => {
    res.render('home')
})

// GET /dinosaurs - READ all dinos
app.get('/dinosaurs', (req,res) => {
    //read dinos from json
    const dinos = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinos)
    //send back the json
    res.json(dinoData)
})

// POST /dinosaurs - CREATE a new dino -- redirect to /dinosaurs
app.post('/dinosaurs', (req,res) => {
    // read dino file
    const dinos = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinos)
    // add data from request body to dino data
    dinoData.push(req.body)
    // write file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

// GET /dinosaurs/new - READ a form to create a new dino
app.get('/dinosaurs/new', (req,res) => {
    res.json({msg: 'showform to add a dino'})
})

// GET /dinosaurs/:id - READ one specific dino
app.get('/dinosaurs/:id', (req,res) => {
    // get dino data
    const dinos = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinos)
    // look up one dino with the request param
    const dino = dinoData[req.params.id]
    // send on dino back
    res.json({dino})
})

// GET /dinosaurs/edit/:id - READ a form to edit one dino
app.get('/dinosaurs/edit/:id', (req,res) => {
    res.json({msg: `show form to edit dino ${req.params.id}`})
})

// PUT /dinosaurs/:id - UPDATE on dino - redirect to /dinosaurs/:id
app.put('/dinosaurs/:id', (req,res) => {
    // get dino data
    const dinos = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinos)
    // find fino from id and update
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type
    //write to file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

// DELETE /dinosaurs/:id - DESTROY on specific dino
app.delete('/dinosaurs/:id', (req,res) => {
    // get our dino json
    const dinos = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinos)
    // remove one dino from array
    dinoData.splice(req.params.id,1)
    // write new file back
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect /dinosaurs
    res.redirect('/dinosaurs')
})

// listen on a port
app.listen(PORT, () => {
    console.log(`listening on :${PORT}`)
    rowdyResults.print()
})