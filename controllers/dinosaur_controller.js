const express = require('express');
const router = express.Router();
const fs = require('fs')

// GET /dinosaurs -- READ all dinosaurs
router.get('/', (req, res) => {
    // read the dinosaur file
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
    // send back the json
    res.render('dinosaurs/index.ejs', { dinoData })
})

// POST /dinosaurs -- CREATE a new dinosaur -- redirect to /dinosaurs
router.post('/', (req, res) => {
    // read dinosaur file
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    console.log(req.body)
    // add data from the request body to the dinosaur data 
    dinoData.push(req.body)

    // write the file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to /dinosaurs
    res.redirect('/')
})

// GET /dinosaurs/new -- READ (show) a form to add a dinosaur
router.get('/new', (req, res) => {
    res.render('dinosaurs/new.ejs')
})

// GET /dinosaurs/:id -- READ one specific dinosaur
router.get('/:id', (req, res) => {
    // get our dinosaur data
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // look up one dinosaur with the request parameters 
    const dino = dinoData[req.params.id]

    // send one dinosaur back
    res.json({ dino })
})

// GET /dinosaurs/edit:id -- READ (show) form to edit one dino
router.get('/:id', (req, res) => {
    // get the dinosaur info to populate the form 
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    const dino = dinoData[req.params.id]
    // render the templace
    res.render('dinosaurs/edit.ejs', { dino: dino, dinoId: req.params.id})
})

// PUT /dinosaurs/:id -- UPDATE (edit) one dinosaur -- redirect to /dinosaur/:id
router.put('/:id', (req, res) => {
    // get the dino data from our json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // find one dinosaur from the req.params.id and use the req.body to update
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type

    // write the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to /dinosaurs
    res.redirect('/')
})

// DELETE /dinosaur/:id -- DELETES one specific dinosaur
    router.delete('/:id', (req, res) => {
        // get our dino json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

        // remove one dino from the array -- use req.params
    dinoData.splice(req.params.id, 1)     

        // save dinosaurs.json 
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

        // redirect to dinosaurs
        res.redirect('/')    
    })
    module.exports = router;