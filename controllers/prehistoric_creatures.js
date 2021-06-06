const router = require('express').Router()
const fs = require('fs')

// GET /prehistoric_creatures -- READ all creatures
router.get('/', (req, res) => {
        
  // Read the creature file
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)
  console.log(creatureData)
  
  // Send back the json
  res.render('creatures/index.ejs', { creatureData })
})

// POST /prehistoric_creatures -- CREATE a new creature -- redirect to /prehistoric_creatures
router.post('/', (req, res) => {

  // Read creature file
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

  // Add data from the request body to the creature data
  creatureData.push(req.body)

  // Write the file
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

  // Redirect to /prehistoric_creatures
  res.redirect('/prehistoric_creatures')
})

// GET /prehistoric_creatures/new -- READ (show) a form to add a creature
router.get('/new', (req, res) => {
  res.render('creatures/new.ejs')
}) 

// GET /prehistoric_creatures/:id -- READ one specific creature
router.get('/:id', (req, res) => {

  // Get our creature data
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

  // Look up one creature with the request parameters
  const creature = creatureData[req.params.id]

  // Send one creature back
  res.json({ creature })
})

// GET /prehistoric_creatures/edit/:id -- READ (show) form to edit one creature
router.get('/edit/:id', (req, res) => {

  // Get the creature info to populate the form
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)
  const creature = creatureData[req.params.id]

  // Render the template
  res.render('creatures/edit.ejs', { creature: creature,  creatureId: req.params.id })
})

// PUT /prehistoric_creatures/:id -- UPDATE (edit) one creature -- redirect to /creature/:id
router.put('/:id', (req, res) => {
  
  // Get the creature data from our json
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

  // Find on creature from the req.params.id and us the req body to update
  creatureData[req.params.id].name = req.body.name
  creatureData[req.params.id].type = req.body.type

  // Write the json file
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

  // Redirect to /prehistoric_creatures
  res.redirect('/prehistoric_creatures')
})

// DELETE /prehistoric_creature/:id -- DESTROY one specific creature
router.delete('/:id', (req, res) => {
  
  // Get our creature json
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

  // Remove one creature from the array -- use req.params
  creatureData.splice(req.params.id, 1)

  // Save creatures.json
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

  // Redirect to /prehistoric_creatures
  res.redirect('/prehistoric_creatures')
})

module.exports = router