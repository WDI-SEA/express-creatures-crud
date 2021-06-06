const router = require('express').Router()
const fs = require('fs')

// GET /dinosaurs -- READ all dinos
router.get('/', (req, res) => {
  
  // Read the dino file
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)
  console.log(dinoData)

  // Send back the json
  res.render('dinosaurs/index.ejs', { dinoData })
})

// POST /dinosaurs -- CREATE a new dino -- redirect to /dinosaurs
router.post('/', (req, res) => {

  // Read dino file
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)

  // Add data from the request body to the dino data
  dinoData.push(req.body)

  // Write the file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

  // Redirect to /dinosaurs
  res.redirect('/dinosaurs')
})

// GET /dinosaurs/new -- READ (show) a form to add a dino
router.get('/new', (req, res) => {
  res.render('dinosaurs/new.ejs')
}) 

// GET /dinosaurs/:id -- READ one specific dino
router.get('/:id', (req, res) => {
  
  // Get our dino data
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)

  // Look up one dino with the request parameters
  const dino = dinoData[req.params.id]

  // Send one dino back
  res.json({ dino })
})

// GET /dinosaurs/edit/:id -- READ (show) form to edit one dino
router.get('/edit/:id', (req, res) => {
  
  // Get the dino info to populate the form
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)

  const dino = dinoData[req.params.id]
  
  // Render the template
  res.render('dinosaurs/edit.ejs', { dino: dino,  dinoId: req.params.id })
})

// PUT /dinosaurs/:id -- UPDATE (edit) one dino -- redirect to /dinosaur/:id
router.put('/:id', (req, res) => {
  
  // Get the dino data from our json
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)

  // Find on dino from the req.params.id and us the req body to update
  dinoData[req.params.id].name = req.body.name
  dinoData[req.params.id].type = req.body.type

  // Write the json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

  // Redirect to /dinosaurs
  res.redirect('/dinosaurs')
})

// DELETE /dinosaur/:id -- DESTROY one specific dino
router.delete('/:id', (req, res) => {
  
  // Get our dino json
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)

  // Remove one dino from the array -- use req.params
  dinoData.splice(req.params.id, 1)

  // Save dinosaurs.json
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

  // Redirect to /dinosaurs
  res.redirect('/dinosaurs')
})

module.exports = router