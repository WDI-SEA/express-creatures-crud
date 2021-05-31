// required packages
const express = require('express')
const fs = require('fs')
const router = express.Router(); 


// GET /dinosaurs -- READ all dinos
router.get('/', (req, res) => {
    // read the dino file
    const creatures = fs.readFileSync('./prehistoricCreatures.json')
    const creaturesData = JSON.parse(creatures)
    console.log(creaturesData)
    // send back the json
    res.render('creatures/index.ejs', { creaturesData: creaturesData})
})

// POST /dinosaurs -- CREATE a new dino -- redirect to /dinosaurs
router.post('/', (req, res) => {
    // read dino file
    const creatures = fs.readFileSync('./prehistoricCreatures.json')
    const creaturesData = JSON.parse(creatures)

    console.log(req.body2)
    //add data from the request body to the dino data
    creaturesData.push(req.body2)

    // write the file
    fs.writeFileSync('./prehistoricCreatures.json', JSON.stringify(creaturesData))

    // redirect to /dinosaurs
    res.redirect('/')
})

// GET /dinosaurs/new -- READ (show) a form to add a dino
router.get('/new', (req, res) => {
    res.render('creatures/new.ejs')
})

// GET /dinosaurs/:id -- READ one specific dino
router.get('/:id', (req, res) => {
    // get our dino data
    const creatures = fs.readFileSync('./prehistoricCreatures.json')
    const creaturesData = JSON.parse(creatures)

    // look up one dino with the request parameters
    const creatureX = creatureData[req.params.id]

    // send one dino back
    res.json({ creatureX })
})

// GET /dinosaurs/edit/:id -- READ (show) form to edit one dino
router.get('/:id', (req, res) => {
    // get the dino info to populate the form
    const creatures = fs.readFileSync('./prehistoricCreatures.json')
    const creaturesData = JSON.parse(creatures)
        
    const creatureX= creatureXData[req.params.id]
    // render the template
    res.render('prehistoricCreatures/edit.ejs', { creatureX: creatureX, creatureXId: req.params.id})
})

// PUT /dinosaurs/:id -- UPDATE (edit) one dino -- redirect to /dinosaur/:id
router.put('/:id', (req, res) => {
    // get the dino data from our json
    const creatures = fs.readFileSync('./prehistoricCreatures.json')
    const creaturesData = JSON.parse(creatures)

    //find one dino from the req.params.id and use the req body to update
    creaturesData[req.params.id].name = req.body.name
    creaturesData[req.params.id].type = req.body.type

    // write the json file
    fs.writeFileSync('./prehistoricCreatures.json', JSON.stringify(creaturesData))

    // redirect to /dinosaurs
    res.redirect('/')
})

// DELETE /dinosaurs/:id -- DESTROY one specific dino
router.delete('/:id', (req, res) => {
    // get our dino json
    const creatures = fs.readFileSync('./prehistoricCreatures.json')
    const creaturesData = JSON.parse(creatures)

    // remove one dino form the array -- use req.params
    creaturesData.splice(req.params.id, 1)

    // save dinosaurs.json
    fs.writeFileSync('./prehistoricCreatures.json', JSON.stringify(creaturesData))

    // redirect to /dinosaurs
    res.redirect('/')
})
module.exports = router;