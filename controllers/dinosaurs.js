const express = require('express')
const router = express.Router()
const fs = require('fs')
const methodOverride = require('method-override')

router.use(methodOverride('_method'))

// GET /dinosaurs -- READ all dinos
router.get('/', (req,res) => {
    // read the dino file
    const dinosaurs = fs.readFileSync('../dinosaurs.json') // to not deal with buffer
    const dinoData = JSON.parse(dinosaurs) // to make it look nicer
    // send back the json
    res.render('../views/dinosaurs/index.ejs', { dinoData })
})

// POST /dinosaurs -- CREATE a new dino -- redirect to /dinosaurs/:id
router.post('/', (req,res) => {
    // read dino file
    const dinosaurs = fs.readFileSync('../dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs) 

    console.log(req.body)
    // add data from the request body to the dino data
    dinoData.push(req.body)
    // write the file
    fs.writeFileSync('../dinosaurs.json', JSON.stringify(dinoData))
    // redirect to /dinosaurs
    res.redirect('/dinosaurs') // always a get request and similar to typing get dinosaurs in clients chrome
})

// GET /dinosaurs/new -- READ (show) a form to add a dino
router.get('/new', (req,res) => {
    res.render('../views/dinosaurs/new.ejs')
})

// GET /dinosaurs/:id -- READ one specific dino
router.get('/:id', (req,res) => {
    // get our dino data
    const dinosaurs = fs.readFileSync('../dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // look up one dino with the request paramaters
    const dino = dinoData[req.params.id]
    
    // send one dino back
    res.json({ dino })
})

// GET /dinosaurs/edit/:id -- READ (show) a form to edit one dino
router.get('/edit/:id',(req,res) =>{
    // get the dino info to populate the form
    const dinosaurs = fs.readFileSync('../dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    const dino = dinoData[req.params.id]

    // render the template
    res.render('../views/dinosaurs/edit.ejs', {dino: dino, dinoId: req.params.id})
})

// PUT /dinosaurs/:id -- UPDATE (edit) one dino -- redirect to /dinosaurs
router.put('/:id', (req,res) => {
    // get the dino data from our json
    const dinosaurs = fs.readFileSync('../dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    //find one dino from the req.params.id a and use the req body to update
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type

    // write the json file
    fs.writeFileSync('../dinosaurs.json', JSON.stringify(dinoData))
    
    // redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

// DELETE /dinosaurs/:id -- DESTROY one specific dino
router.delete('/:id', (req,res) => {
    // get our dino json
    const dinosaurs = fs.readFileSync('../dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // remove one dino from the array -- use req.params
    dinoData.splice(req.params.id, 1)

    // save dinosaurs.json
    fs.writeFileSync('../dinosaurs.json', JSON.stringify(dinoData))

    // redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

module.exports = router