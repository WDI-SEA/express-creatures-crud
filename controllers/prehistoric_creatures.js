const express = require('express')
const router = express.Router()
const fs = require('fs')

// GET /prehistoric_creatures - READ all creatures
router.get('/', (req,res) => {
    //read creatures from json
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    //send back the json
    res.render('prehistoric_creatures/index.ejs', { creatureData })
})

// POST /creatures - CREATE a new creature -- redirect to /creatures
router.post('/', (req,res) => {
    // read creature file
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    // add data from request body to creature data
    creatureData.push(req.body)
    // write file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    // redirect to /creatures
    res.redirect('/prehistoric_creatures')
})

// GET /prehistoric_creatures/new - READ a form to create a new creature
router.get('/new', (req,res) => {
    res.render('prehistoric_creatures/new.ejs')
})

// GET /prehistoric_creatures/:id - READ one specific creature
router.get('/:id', (req,res) => {
    // get creature data
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    // look up one creature with the request param
    const creature = creatureData[req.params.id]
    // send on creature back
    res.json({creature})
})

// GET /prehistoric_creatures/edit/:id - READ a form to edit one creature
router.get('/edit/:id', (req,res) => {
    // get creature data to populate form
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    const creature = creatureData[req.params.id]
    //render
    res.render('prehistoric_creatures/edit.ejs', {creature: creature, creatureID: req.params.id})
})

// PUT /prehistoric_creatures/:id - UPDATE on creature - redirect to /prehistoric_creatures/:id
router.put('/:id', (req,res) => {
    // get creature data
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    // find creature from id and update
    creatureData[req.params.id].type = req.body.type
    creatureData[req.params.id].img_url = req.body.img_url
    //write to file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    // redirect to /prehistoric_creatures
    res.redirect('/prehistoric_creatures')
})

// DELETE /prehistoric_creatures/:id - DESTROY on specific creature
router.delete('/:id', (req,res) => {
    // get our creature json
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    // remove one creature from array
    creatureData.splice(req.params.id,1)
    // write new file back
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    // redirect /prehistoric_creatures
    res.redirect('/prehistoric_creatures')
})

module.exports = router