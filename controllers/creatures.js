const express = require('express')
const router = express.Router()

// //controller for index
// router.get('/index', (req, res) => {
//   // let favefoods = ['Boba', 'Fried Chicken Sandwich', 'Pizza']
//   res.render('creatures/index.ejs')
// })

// //edit
// router.get('/edit', (req, res) => {
//   // let faveAnimals = ['Dog', 'bird', 'Corgi'] 
//   res.render('creatures/edit.ejs')
// })


// router.get('/new', (req, res) => {
//   // let faveAnimals = ['Dog', 'bird', 'Corgi'] 
//   res.render('creatures/new.ejs')
// })
// Creatures START *******************

//GET /creatures -- READ all creatures
router.get('/prehistoric-creatures', (req, res) => {
  //read the creatures file
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)
  console.log(creatureData)
  res.render('prehistoric-creatures/index.ejs', {creatureData})
})

//GET /creatures/new - READ (show) a form to add a creature
router.get('/prehistoric-creatures/new', (req, res) => {
  // res.json({msg: 'show form to add dino' })
  res.render('prehistoric-creatures/new.ejs')
})

//POST -- CREATE a new creature -redirect to /creatures
router.post('/prehistoric-creatures', (req, res) => {
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
router.get('/prehistoric-creatures/:id', (req, res) => {
  //get dino data
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

    //look up one  with the req params
  const creature = creatureData[req.params.id]
  //sent one dino back
  res.json({ creature })
})


//GET /creatures/edit/:id -- READ (show) form to edit one
router.get('/prehistoric-creatures/edit/:id', (req, res) => {

  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)
  const creatureRender = creatureData[req.params.id]
  // render the template
  res.render('prehistoric-creatures/edit.ejs', { creature: creatureRender,  creatureId: req.params.id })
})

//PUT  -- UPDATE (edit) one  -- redirect to 
router.put('/prehistoric-creatures/:id', (req, res) => {

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
router.delete('/prehistoric-creatures/:id', (req, res) => {

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