const router = require('express').Router()
const fs = require('fs')

// GET /prehistoric_creatures -- READ all creatures
router.get('/', (req, res) => {
  // read the creature file
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)
  console.log(creatureData)
  // send back the json
  res.render('creatures/index.ejs', { creatureData })
})

// POST /prehistoric_creatures -- CREATE a new creature -- redirect to /prehistoric_creatures
router.post('/', (req, res) => {
  // read creature file
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

  console.log(req.body)
  // add data from the request body to the creature data
  creatureData.push(req.body)

  // write the file
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

  // redirect to /prehistoric_creatures
  res.redirect('/creatures')
})

// GET /prehistoric_creatures/new -- READ (show) a form to add a creature
router.get('/new', (req, res) => {
  res.render('creatures/new.ejs')
}) 

// GET /prehistoric_creatures/:id -- READ one specific creature
router.get('/:id', (req, res) => {
  // get our creature data
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

  // look up one creature with the request parameters
  const creature = creatureData[req.params.id]

  // send one creature back
  res.json({ creature })
})

// GET /prehistoric_creatures/edit/:id -- READ (show) form to edit one creature
router.get('/edit/:id', (req, res) => {
  // get the creature info to populate the form
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

  const creature = creatureData[req.params.id]
  // render the template
  res.render('creatures/edit.ejs', { creature: creature,  creatureId: req.params.id })
})

// PUT /prehistoric_creatures/:id -- UPDATE (edit) one creature -- redirect to /creature/:id
router.put('/:id', (req, res) => {
  // get the creature data from our json
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

  // find on creature from the req.params.id and us the req body to update
  creatureData[req.params.id].name = req.body.name
  creatureData[req.params.id].type = req.body.type

  // write the json file
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

  // redirect to /prehistoric_creatures
  res.redirect('/creatures')
})

// DELETE /prehistoric_creature/:id -- DESTROY one specific creature
router.delete('/:id', (req, res) => {
  // get our creature json
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

  // remove one creature from the array -- use req.params
  creatureData.splice(req.params.id, 1)

  // save creatures.json
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

  // redirect to /prehistoric_creatures
  res.redirect('/creatures')
})

module.exports = router