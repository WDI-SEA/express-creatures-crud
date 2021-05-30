const express = require('express')
const router = express.Router()

// GET  /creatures -- READ all dinos
app.get('/creatures', (req, res) => {
    // read the dino file
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    console.log(creatureData)
    // send back the json
    res.render('creatures/index_creatures.ejs', {creatureData: creatureData})
})



module.exports = router