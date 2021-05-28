// require modules
const express = require('express')
const rowdy = require('rowdy-logger')
const fs = require('fs')

// config app
const PORT = 3000
const app = express()
let rowdyResults = rowdy.begin(app)
app.use(express.urlencoded({extended: false}))

// define routes

// GET /
app.get('/', (req,res) => {
    res.json({msg: 'hello dinos!'})
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

// GET /dinosaurs/:id - READ one specific dino

// GET /dinosaurs/edit/:id - READ a form to edit one dino

// PUT /dinosaurs/:id - UPDATE on dino - redirect to /dinosaurs/:id

// DELETE /dinosaurs/:id - DESTROY on specific dino

// listen on a port
app.listen(PORT, () => {
    console.log(`listening on :${PORT}`)
    rowdyResults.print()
}) 