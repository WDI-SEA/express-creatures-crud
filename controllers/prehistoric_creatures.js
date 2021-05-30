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



// POST /dinosaurs -- Create a new dino -- redirect to /dinosaurs

router.post('/creatures', (req, res) => {
    //read dino file 
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)

    console.log(req.body)

    //add data from the request body to the dino data
    creatureData.push(req.body)
    // write the file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    // redirect to /dinosaurs
    res.redirect('/creatures')
})



// GET /dinosaurs/new -- READ (show) a form to add a dino

router.get('/creatures/new', (req, res) => {
    res.render('creatures/new.ejs')
})



















module.exports = router