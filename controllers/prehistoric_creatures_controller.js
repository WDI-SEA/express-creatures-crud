const express = require('express');
const router = express.Router();
const fs = require('fs')

// GET /creatures -- READ all creatures
router.get('/', (req, res) => {
    // read the creatures file
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creaturesData = JSON.parse(creatures)
    console.log(creaturesData)
    // send back the json
    res.render('creatures/index.ejs', { creaturesData })
})

// POST /creatures -- CREATE a new creature -- redirect to /creates
router.post('/', (req, res) => {
    // read dinosaur file
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creaturesData = JSON.parse(creatures)

    console.log(req.body)
    // add data from the request body to the creature data 
    creaturesData.push(req.body)

    // write the file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))

    // redirect to /creatures
    res.redirect('/')
})

// GET /creatures/new -- READ (show) a form to add a creatures
router.get('/new', (req, res) => {
    res.render('creatures/new.ejs')
})

// GET /creatures/:id -- READ one specific creature
router.get('/:id', (req, res) => {
    // get our creature data
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creaturesData = JSON.parse(creatures)

    // look up one creatureX with the request parameters 
    const creatureX = creaturesData[req.params.id]

    // send one creatureX back
    res.json({ creatureX })
})

// GET /creatures/edit:id -- READ (show) form to edit one creatureX
router.get('/:id', (req, res) => {
    // get the creatures info to populate the form 
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)

    const creatureX = creatureXData[req.params.id]
    // render the templace
    res.render('creatures/edit.ejs', { creatureX: creatureX, creatureXId: req.params.id})
})

// PUT /creatures /:id -- UPDATE (edit) one creature -- redirect to /prehistoric_creatures/:id
router.put('/:id', (req, res) => {
    // get the creatureX data from our json
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creaturesData = JSON.parse(creatures)

    // find one creature from the req.params.id and use the req.body to update
    creaturesData[req.params.id].name = req.body.name
    creaturesData[req.params.id].type = req.body.type

    // write the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))

    // redirect to /creatures
    res.redirect('/')
})

// DELETE /creatures/:id -- DELETES one specific creature
    router.delete('/:id', (req, res) => {
        // get our creatures json
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creaturesData = JSON.parse(creatures)

        // remove one creatureX from the array -- use req.params
    creaturesData.splice(req.params.id, 1)     

        // save prehistoric_creatures.json 
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))

        // redirect to creatures
        res.redirect('/')    
    })
    module.exports = router;