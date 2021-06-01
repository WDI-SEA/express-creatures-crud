const express = require('express')
const router = express.Router()
const fs = require('fs')


//GET /creatures -- READ all creatures
router.get('/', (req, res) => {
  //read the creatures file
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)
  console.log(creatureData)
  res.render('prehistoric-creatures/index.ejs', {creatureData})
})

//GET /creatures/new - READ (show) a form to add a creature
router.get('/new', (req, res) => {
  // res.json({msg: 'show form to add dino' })
  res.render('prehistoric-creatures/new.ejs')
})

//POST -- CREATE a new creature -redirect to /creatures
router.post('/', (req, res) => {
  //read creatures file 
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)
  console.log(creatureData)
  
  console.log(req.body)
  //add data from request body to the data
  creatureData.push(req.body)

  //write the file
fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

  //readirect to /creatures
  res.redirect('/prehistoric-creatures')
})


//GET ///GET  -- READ one specific 
router.get('/:id', (req, res) => {
  //get dino data
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

    //look up one  with the req params
  const creature = creatureData[req.params.id]
  //sent one dino back
  res.json({ creature })
})


//GET /creatures/edit/:id -- READ (show) form to edit one
router.get('/edit/:id', (req, res) => {

  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)
  const creatureRender = creatureData[req.params.id]
  // render the template
  res.render('prehistoric-creatures/edit.ejs', { creature: creatureRender,  creatureId: req.params.id })
})

//PUT  -- UPDATE (edit) one  -- redirect to 
router.put('/:id', (req, res) => {

const creatures = fs.readFileSync('./prehistoric_creatures.json')
const creatureData = JSON.parse(creatures)
console.log(creatureDataData, "👩‍🎤")

//find one that from req.params.id and us the req body to update
creatureData[req.params.id].type = req.body.type
creatureData[req.params.id].img = req.body.img

  //write the json file
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

//redirect 
res.redirect('/prehistoric-creatures')  

})

//DELETE - DESTROY one specific 
router.delete('/:id', (req, res) => {

  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

  //remove one from array
  creatureData.splice(req.params.id, 1)

  //save json
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

  //redirect to 
  res.redirect('/prehistoric-creatures')
})


module.exports = router 