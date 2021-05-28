// required packages
const express = require('express')
// rowdy logger for loggin our routes
const rowdy = require('rowdy-logger')
const fs = require('fs')

// config app
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 3000
app.use(express.urlencoded({ extended: false}))

// define routes
app.get('/', (req, res) => {
    res.json({ msg: 'hello dinos'})
})

// GET /dinosaurs -- READ all dinos
app.get('/dinosaurs', (req, res) => {
    // read the dino file
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
    // send back the json
    res.json({ dinoData })
})

// POST /dinosaurs -- CREATE a new dino -- redirect to /dinosaurs
app.post('/dinosaurs', (req, res) => {
    // read dino file
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    console.log(req.body)
    //add data from the request body to the dino data
    dinoData.push(req.body)

    // write the file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

// GET /dinosaurs/new -- READ (show) a form to add a dino
app.get('/dinosaurs/new', (req, res) => {
    res.json({ msg: 'show form to add a dino '})
})

// GET /dinosaurs/:id -- READ one specific dino
app.get('/dinosaurs/:id', (req, res) => {
    // get our dino data
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // look up one dino with the request parameters
    const dino = dinoData[req.params.id]

    // send one dino back
    res.json({ dino })
})

// GET /dinosaurs/edit/:id -- READ (show) form to edit one dino

// PUT /dinosaurs/:id -- UPDATE (edit) one dino -- redirect to /dinosaur/:id

// DELETE /dinosaurs/:id -- DESTROY one specific dino

//listen on a port
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`is that dinos i hear on port ${PORT}`)
})