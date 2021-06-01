const express = require('express')
const router = express.Router()
const fs = require('fs')



//GET /dinos -- READ all dinos
router.get('/', (req, res) => {
  //read the dino file
  const dinos = fs.readFileSync('./dinos.json')
  const dinoData = JSON.parse(dinos)
  console.log(dinoData)
  //send back the json
  // res.json({ dinoData })
  res.render('dinos/index.ejs', {dinoData})

})

//POST /dinos -- CREATE a new dino -redirect to /dinos
router.post('/', (req, res) => {
  //read dino file 
  const dinos = fs.readFileSync('./dinos.json')
  const dinoData = JSON.parse(dinos)
  console.log(dinoData)
  
  console.log(req.body)
  //add data from request body to the dino data
  dinoData.push(req.body)

  //write the file
fs.writeFileSync('./dinos.json', JSON.stringify(dinoData))

  //readirect to /dinos
  res.redirect('/dinos')
})


//GET /dinos/new - READ (show) a form to add a dino
router.get('/new', (req, res) => {
  // res.json({msg: 'show form to add dino' })
  res.render('dinos/new.ejs')
})

//GET /dinos/:id -- READ one specific dino
router.get('/:id', (req, res) => {
  //get dino data
  const dinos = fs.readFileSync('./dinos.json')
  const dinoData = JSON.parse(dinos)

  //look up one dino with the req params
  const dino = dinoData[req.params.id]
  //sent one dino back
  res.json({ dino })
})

//GET /dinos/edit/:id -- READ (show) form to edit one dino
router.get('/edit/:id', (req, res) => {
  //get the dino info to populate form
  const dinos = fs.readFileSync('./dinos.json')
  const dinoData = JSON.parse(dinos)
  const dinoRender = dinoData[req.params.id]
  // render the template
  res.render('dinos/edit.ejs', { dino: dinoRender,  dinoId: req.params.id })
})

//PUT /dino/:id -- UPDATE (edit) one dino -- redirect to /dinos/:
router.put('/:id', (req, res) => {
  //get the dino date from json
const dinos = fs.readFileSync('./dinos.json')
const dinoData = JSON.parse(dinos)
console.log(dinoData, "👩‍🎤")

//find one that dino from req.params.id and us the req body to update
dinoData[req.params.id].name = req.body.name
dinoData[req.params.id].type = req.body.type

  //write the json file
  fs.writeFileSync('./dinos.json', JSON.stringify(dinoData))

//redirect to /dinos
res.redirect('/dinos')

})

//DELETE / dinos/:id -- DESTROY one specific dino
router.delete('/:id', (req, res) => {
  //get our dino json
  const dinos = fs.readFileSync('./dinos.json')
  const dinoData = JSON.parse(dinos)

  //remove one from array
  dinoData.splice(req.params.id, 1)

  //save dinos.json
  fs.writeFileSync('./dinos.json', JSON.stringify(dinoData))

  //redirect to /dinos
  res.redirect('/dinos')
})

module.exports = router 