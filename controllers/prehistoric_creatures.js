// bring in express and router
const express = require('express')
const router = express.Router()
const fs = require('fs')


/*~~ PREHISTORIC ROUTES ~~*/

// GET /prehistoric_creatures -- READ all prehistoric creatures
router.get('/', (req, res) => {
    // read prehistoric creatures file
    const creatureData = refreshData()
    
    // send back the json
    res.render('prehistoric_creatures/index.ejs', { creatureData } )
})

// GET /prehistoric_creatures/new -- READ (show) a form to add a prehistoric creature -- redirect to /prehistoric_creatures
router.get('/new', (req, res) => {
    res.render('prehistoric_creatures/new.ejs')
})

// POST /prehistoric_creatures -- CREATE a new prehistoric creature
router.post('/', (req, res) => {
    // read prehistoric creatures file
    const creatureData = refreshData()

    console.log(req.body)
    // add data from the request body to the prehistoric creatures data
    creatureData.push(req.body)

    // write the json file
    writeToJSONFile(creatureData)

    // redirect to /prehistoric_creatures
    res.redirect('/prehistoric_creatures/')
})

// GET /prehistoric_creatures/:id -- READ one specific prehistoric creature
router.get('/:id', (req, res) => {
    // read prehistoric creatures file
    const creatureData = refreshData()

    // look up one creature with the request parameters
    const creature = creatureData[req.params.id]

    res.json( { creature } )
})

// GET /prehistoric_creatures/edit/:id -- READ (show) a form to edit one prehistoric creature
router.get('/edit/:id', (req, res) => {
    // get the creature info to populate the form
    const creatureData = refreshData()

    const creature = creatureData[req.params.id]
    // render the template
    res.render('prehistoric_creatures/edit.ejs', { creature, creatureId: req.params.id })
})

// PUT /prehistoric_creatures/:id -- UPDATE (edit) one prehistoric creature -- redirect to /prehistoric_creatures
router.put('/edit/:id', (req, res) => {
    // read prehistoric creatures file
    const creatureData = refreshData()

    // find one prehistoric creature from the req.params.id and use the req.body to update
    creatureData[req.params.id].type = req.body.type
    creatureData[req.params.id].img_url = req.body.img_url

    // write the json file
    writeToJSONFile(creatureData)

    // redirect to /prehistoric_creatures
    res.redirect('/prehistoric_creatures')
})

// DELETE /prehistoric_creatures/:id -- DESTROY one specific prehistoric creature
router.delete('/:id', (req, res) => {
    // read prehistoric creatures file
    const creatureData = refreshData()

    // remove one creature from the array
    creatureData.splice(req.params.id, 1)

    // write the json file
    writeToJSONFile(creatureData)

    // redirect to /prehistoric_creatures
    res.redirect('/prehistoric_creatures')
})


/*~~ FUNCTIONS ~~*/

function refreshData() {
    const prehistCreatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(prehistCreatures)
    
    return creatureData
}

function writeToJSONFile(creatureData) {
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
}

module.exports = router