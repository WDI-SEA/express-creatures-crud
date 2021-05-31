const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    res.render('prehistoric_creatures/index.ejs', { creatureData})
})

router.post('/', (req, res) => {
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)

    console.log(req.body)
    creatureData.push(req.body)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/creatures')
})

router.get('/new', (req,res) => {
    res.render('prehistoric_creatures/new.ejs')
})

router.get('/:id', (req, res) => {
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    const creature = creatureData[req.params.id]
    res.render('prehistoric_creatures/show.ejs', {creature})
})


router.get('/edit/:id', (req, res) => {
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)
    const creature = creatureData[req.params.id]

    res.render('prehistoric_creatures/edit.ejs', { creature: creature, creatureId: req.params.id})
})

router.put('/:id', (req, res) => {
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)

    creatureData[req.params.id].type = req.body.type
    creatureData[req.params.id].img_url = req.body.img_url

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(creatureData))
    res.redirect('/creatures')
})

router.delete('/delete/:id', (req, res) => {
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)

    creatureData.splice(req.params.id, 1)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(creatureData))
    res.redirect('/creatures')
})




module.exports = router

