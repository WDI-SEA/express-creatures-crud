//express and router
const express = require('express')
const router = express.Router()
const fs = require('fs')

// GET /creatures -- READ all creatures
router.get('/', (req, res) => {
    // read the creatures file
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    // send back the json
    res.render('prehistoric_creatures/index.ejs', { creatureData })
})

//GET /prehistoric_creatures/new/new -- READ (show) a form to add creature
router.get('/new', (req, res) => {
    res.render('prehistoric_creatures/new.ejs')
    
})

//POST /creatures -- CREATE a new creature -- redirect to /prehistoric_creatures
router.post('/', (req, res) => {
   // read the creatures file
   const creatures = fs.readFileSync('./prehistoric_creatures.json')
   const creatureData = JSON.parse(creatures)

    console.log(req.body)
    // add data from the request body to the dino data
    creatureData.push(req.body)

    //write the file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    //redirect to /prehistoric_creatures
    res.redirect('/prehistoric_creatures')
})



//GET /prehistoric_creatures/new/:id -- READ one specific dino
router.get('/:id', (req, res) => {
    // read the creatures file
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)

    //look up one creature with the request parameters
    const creature = creatureData[req.params.id]

    //send one creature back
    res.json({creature})
})

//GET /prehistoric_creatures/edit:id -- READ (show) form to edit one creature
router.get('/edit/:id', (req, res) => {
  // read the creatures file
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

    //look up one creature with the request parameters
    const creature = creatureData[req.params.id]

    //render the template
    res.render('prehistoric_creatures/edit.ejs', { creature: creature, creatureId: req.params.id })
})

//PUT /prehistoric_creatures/:id -- UPDATE (edit) one creature -- redirect to /prehistoric_creatures
router.put('/:id', (req, res) => {
   // read the creatures file
   const creatures = fs.readFileSync('./prehistoric_creatures.json')
   const creatureData = JSON.parse(creatures)

    //find on creature from the req.params.id and use the req body to update
    creatureData[req.params.id].type = req.body.type
    creatureData[req.params.id].img_url = req.body.img_url

    //write the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    //rediect to ./prehistoric_creatures
    res.redirect('/prehistoric_creatures')
})

//DELETE /prehistoric_creatures/:id -- DESTROY one specific creature
router.delete('/:id', (req, res) => {
   // read the creatures file
   const creatures = fs.readFileSync('./prehistoric_creatures.json')
   const creatureData = JSON.parse(creatures)

    //remove one dino from the array
    creatureData.splice(req.params.id, 1)

    //save dinosaurs.json
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    //redirect to /dinosaurs
    res.redirect('/prehistoric_creatures')
})

module.exports = router