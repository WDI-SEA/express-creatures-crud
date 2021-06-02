const express = require('express')
const router = express.Router()

const fs = require('fs')

// ////////////////////////////////////// DINOSAURS ->

// Stub out my routes
// GET /dinosaurs -- read all dinos
router.get('/dinosaurs', (req, res) => {
  // read the dinosaurs.json
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  // parsed the json buffer to clean it up! -
  const dinoData = JSON.parse(dinosaurs)
  // console.log(dinoData)
  // send back the json to Postman
  res.render('dinosaurs/index.ejs', { dinoData: dinoData })
})

// POST /dinosaurs -- CREATE a new dino -- redirect to /dinosaurs
router.post('/dinosaurs', (req, res) => {
  // read dino file
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)

  console.log(req.body)
  // add data from the request body to the dino data
  dinoData.push(req.body)

  // write the file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

  // redirect to /dinosaurs
  res.redirect('/dinosaurs')
})

// GET /dinosaurs/new -- READ (show) a form to edit one dino
router.get('/dinosaurs/new', (req, res) => {
  res.render('dinosaurs/new.ejs')
})

// GET /dinosaurs/:id -- READ one specific dino // GET /dinosaurs/new -- READ (show) a form to add a dino
router.get('/dinosaurs/:id', (req, res) => {
  // get our dino data
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)
  // look up ine dino with the request parameters
  const dino = dinoData[req.params.id]
  // Send one dino back
  res.json({ dino })
})

// GET /dinosaurs/edit/:id -- READ (show) form to edit one dino
router.get('/dinosaurs/edit/:id', (req, res) => {
  // get the dino info to populate the form
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)
  const dino = dinoData[req.params.id]
  // console.log(dino)
  // render the template
  res.render('dinosaurs/edit.ejs', { dino: dino, dinoId: req.params.id })
})

// PUT /dinsosaurs/:id -- update (edit) one dino -- redirect to /dinosaurs
router.put('/dinosaurs/:id', (req, res) => {
  // console.log(req.body)
  // get dino data from our json
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)
  // get dino data form the req.params.id and use the req.body to update
  dinoData[req.params.id].name = req.body.name
  dinoData[req.params.id].type = req.body.type

  // write the json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

  // redirect to /dinosaurs
  res.redirect('/dinosaurs')
})

// DELETE /dinosaur/:id -- DESTROY one specific dino
router.delete('/dinosaurs/:id', (req, res) => {
  // get our dino json
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)

  // remove one dino from the array -- use req.params
  dinoData.splice(req.params.id, 1)

  // save dinosaurs.json
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

  // redirect to /dinosaurs
  res.redirect('/dinosaurs')
})

//
module.exports = router
