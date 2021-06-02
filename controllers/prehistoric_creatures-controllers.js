const express = require('express')
const router = express.Router()

const fs = require('fs')

// GET /prehistoric_creatures -- read all
router.get('/prehistoric_creatures', (req, res) => {
  // read the dinosaurs.json
  const prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
  // parsed the json buffer to clean it up! -
  const prehistoric_creaturesData = JSON.parse(prehistoric_creatures)
  // console.log(prehistoric_creaturesData)
  // send back the json to Postman
  res.render('prehistoric_creatures/index.ejs', {
    prehistoric_creaturesData: prehistoric_creaturesData,
  })
})

// GET /prehistoric_creatures/edit/:id -- READ (show) form to edit one
router.get('/prehistoric_creatures/edit/:id', (req, res) => {
  // get the dino info to populate the form
  const prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
  const prehistoric_creaturesData = JSON.parse(prehistoric_creatures)
  const preHC = prehistoric_creaturesData[req.params.id]
  // console.log(preHC)
  // render the template
  res.render('prehistoric_creatures/edit.ejs', {
    preHC: preHC,
    prehistoric_creaturesId: req.params.id,
  })
})

// PUT /prehistoric_creatures/:id -- update (edit) one dino -- redirect to /dinosaurs
router.put('/prehistoric_creatures/:id', (req, res) => {
  console.log(req.body)
  // get dino data from our json
  const prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
  const prehistoric_creaturesData = JSON.parse(prehistoric_creatures)
  // get dino data form the req.params.id and use the req.body to update
  prehistoric_creaturesData[req.params.id].name = req.body.name
  prehistoric_creaturesData[req.params.id].type = req.body.type

  // write the json file
  fs.writeFileSync(
    './prehistoric_creatures.json',
    JSON.stringify(prehistoric_creaturesData)
  )

  // redirect to /prehistoric_creatures
  res.redirect('/prehistoric_creatures')
})

// GET /prehistoric_creatures/new -- READ (show) a form to edit one dino
router.get('/prehistoric_creatures/new', (req, res) => {
  res.render('prehistoric_creatures/new.ejs')
})
// POST /prehistoric_creatures -- CREATE a new dino -- redirect to /prehistoric_creatures
router.post('/prehistoric_creatures', (req, res) => {
  // read dino file
  const prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
  const prehistoric_creaturesData = JSON.parse(prehistoric_creatures)

  // console.log(req.body)
  // add data from the request body to prehistoric_creaturesData
  prehistoric_creaturesData.push(req.body)

  // write the file
  fs.writeFileSync(
    './prehistoric_creatures.json',
    JSON.stringify(prehistoric_creaturesData)
  )

  // redirect to /dinosaurs
  res.redirect('/prehistoric_creatures')
})

module.exports = router
