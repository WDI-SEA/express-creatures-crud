const express = require('express')
const router = express.Router()
const fs = require('fs')

// GET /dinosaurs - READ all dinos
router.get('/', (req,res) => {
    //read dinos from json
    const dinos = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinos)
    //send back the json
    res.render('dinosaurs/index.ejs', { dinoData })
})

// POST /dinosaurs - CREATE a new dino -- redirect to /dinosaurs
router.post('/', (req,res) => {
    // read dino file
    const dinos = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinos)
    // add data from request body to dino data
    dinoData.push(req.body)
    // write file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

// GET /dinosaurs/new - READ a form to create a new dino
router.get('/new', (req,res) => {
    res.render('dinosaurs/new.ejs')
})

// GET /dinosaurs/:id - READ one specific dino
router.get('/:id', (req,res) => {
    // get dino data
    const dinos = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinos)
    // look up one dino with the request param
    const dino = dinoData[req.params.id]
    // send on dino back
    res.json({dino})
})

// GET /dinosaurs/edit/:id - READ a form to edit one dino
router.get('/edit/:id', (req,res) => {
    // get dino data to populate form
    const dinos = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinos)
    const dino = dinoData[req.params.id]
    //render
    res.render('dinosaurs/edit.ejs', {dino: dino, dinoID: req.params.id})
})

// PUT /dinosaurs/:id - UPDATE on dino - redirect to /dinosaurs/:id
router.put('/:id', (req,res) => {
    // get dino data
    const dinos = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinos)
    // find fino from id and update
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type
    //write to file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

// DELETE /dinosaurs/:id - DESTROY on specific dino
router.delete('/:id', (req,res) => {
    // get our dino json
    const dinos = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinos)
    // remove one dino from array
    dinoData.splice(req.params.id,1)
    // write new file back
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect /dinosaurs
    res.redirect('/dinosaurs')
})

module.exports = router