//required packages
const express = require('express')
const rowdy = require('rowdy-logger')
const fs = require('fs')

//config app
const PORT = 3000
const app = express()
const rowdyResults = rowdy.begin(app)
//Allows use to POST with below
app.use(express.urlencoded({ extended: false }))

//define routes
app.get('/', (req, res) => {
    res.json({ msg: 'hello dinos!'})
})

//GET /dinosaurs -- READ all dinos
app.get('/dinosaurs', (req, res) => {
    //read the dino file
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
    //send back the json
    res.json({ dinoData })
})

//POST /dinosaurs -- CREATE a new dino -- redirect to /dinosaurs
app.post('/dinosaurs', (req, res) => {
    //read dino file
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    console.log(req.body)
    // add data from the request body to the dino data
    dinoData.push(req.body)

    //write the file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    //redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

//GET /dinosaurs/new -- READ (show) a form to add dino

//GET /dinosaurs/:id -- READ one specific dino
 
//GET /dinosaurs/edit:id -- READ (show) form to edit one dino

//PUT /dinosaurs/:id -- UPDATE (edit) one dino -- redirect to /dinosaur

//DELETE /dinosaurs/:id -- DESTROY one specific dino

//Listen on PORT
app.listen(PORT, ()=> {
    rowdyResults.print()
    console.log(`${PORT} workin workin`)
})