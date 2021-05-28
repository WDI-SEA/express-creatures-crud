// required packages
const express = require('express')
// rowdy logger for logging our routes
const rowdy = require('rowdy-logger')
const fs = require('fs')

// Config app
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 3000
app.use(express.urlencoded({ extended: false }))

// define routes
app.get('/', (req, res) => {
    res.json({ msg: 'hello dinos!'})
})

// GET /dinosaurs -- READ all dinos
app.get('/dinosaurs', (req, res) => {
        // read dino file
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
        // send back json
    res.json({ dinoData })
})

// POST /dinosaurs -- CREATE a new dino -- redirect to /dinosaurs
app.post('/dinosaurs', (req, res) => {
        // read dino dile
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    console.log(req.body)
        // add data from the request body to the dino data
    dinoData.push(req.body)

        // write file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

        // redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

// GET /dinosaurs/new -- READ (show) a form to add a dino
app.get('/dinosaurs/new', (req, res) => {
    res.json({ msg: 'show form to add dino' })
})

// GET /dinosaurs/:id -- READ one specific dino
app.get('/dinosaurs/:id', (req, res) => {
        // get our dinoData 
const dinosaurs = fs.readFileSync('./dinosaurs.json')
const dinoData = JSON.parse(dinosaurs)

        // lookup one dino with the request parameters
const dino = dinoData[req.params.id]

        // send one dino back
res.json({ dino })
})

// GET /dinosaurs/edit/:id -- READ (show) form to edit one dino
app.get('/dinosaurs/edit', (req, res) => {
    res.json({ msg: `show form to edit dino ${req.params.id} `})
})

// PUT /dinosaurs/:id -- UPDATE (edit) one dino -- redirect to /dinosaur/
app.put('/dinosaurs/:id', (req, res) => {
    // get the dino data from json
const dinosaurs = fs.readFileSync('./dinosaurs.json')
const dinoData = JSON.parse(dinosaurs)

    //find on dino from the req.params.id and us the req body to update
dinoData[req.params.id].name = req.body.name
dinoData[req.params.id].type = req.body.type

// write the json file
fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

// redirect to /dinosaurs
res.redirect('/dinosaurs')

})
// DELETE /dinosaur/:id -- DESTROY one specific dino

//listen on a port
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`Do I hear a roar on ${PORT}?`)
})