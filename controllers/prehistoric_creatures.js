const express = require('express')
const router = express.Router()
const fs = require('fs')
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')





// GET  /creatures -- READ all dinos
router.get('/', (req, res) => {
    // read the dino file
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    // console.log(creatureData)
    // send back the json
    res.render('creatures/index.ejs', {creatureData: creatureData})
})



// POST /creatures -- Create a new dino -- redirect to /creatures

router.post('/', (req, res) => {
    //read dino file 
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)

    console.log(req.body)

    //add data from the request body to the dino data
    creatureData.push(req.body)
    // write the file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    // redirect to /creatures
    res.redirect('/creatures')
})



// GET /creatures/new -- READ (show) a form to add a dino

router.get('/new', (req, res) => {
    res.render('creatures/new.ejs')
})


// GET /creatures/:id -- READ one specific dino

router.get('/:id', (req,res) => {
    // get our dino data
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)

    //look up one dino with the request parameters
    const dino = creatureData[req.params.id]

    //send one dino back
    res.json({ dino })
})




// GET /creatures/edit/:id -- READ (show) form to edit one

router.get('/edit/:id', (req,res) =>{
    // get the dino info to populate the form
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    let index = parseInt(req.params.id)
    const creature = creatureData[index]
    console.log(creature)
    // render the template
    res.render('creatures/edit.ejs', { creature: creature, index })
})




// PUT /creatures/:id -- UPDATE (edit) one dino -- redirect to /creatures/:id

router.put('/:id', (req, res) => {
    // get the dino data from our json
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)

    // find on dino from the req.params.id and use the req body to update
    creatureData[req.params.id].name = req.body.name
    creatureData[req.params.id].type = req.body.type

    //write the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    // redirect to /creatures
    res.redirect('/creatures')

})




// DELETE /dinosaur/:id -- DESTROY one specific dino

router.delete('/:id', (req, res) => {
    //get our dino JSON
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)

    //remove one dino from the array -- use req.params
    creatureData.splice(req.params.id, 1)

    //save the creatures.json
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    //redirect to /creatures
    res.redirect('/prehistoric_creatures')
})


















module.exports = router