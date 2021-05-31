const express = require('express')
const router = express.Router()
const fs = require('fs')
const methodOverride = require('method-override')

router.use(methodOverride('_method'))

router.get('/', (req,res) => {
    // read the dino file
    const prehistoric = fs.readFileSync('./prehistoric_creatures.json') // to not deal with buffer
    const prehistoricData = JSON.parse(prehistoric) // to make it look nicer
    // send back the json
    res.render('../views/prehiscreats/index.ejs', { prehistoricData })

})

router.get('/new', (req,res) => {
    res.render('../views/prehiscreats/new.ejs')
})

router.post('/', (req,res) => {
    // read dino file
    const prehistoric = fs.readFileSync('./prehistoric_creatures.json') 
    const prehistoricData = JSON.parse(prehistoric)

    console.log(req.body)
    // add data from the request body
    prehistoricData.push(req.body)
    // write the file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))
    // redirect to /
    res.redirect('/prehistoric_creatures') 
})

router.get('/:id', (req,res) => {
    // read dino file
    const prehistoric = fs.readFileSync('./prehistoric_creatures.json') 
    const prehistoricData = JSON.parse(prehistoric)

    // look up one creature with the request paramaters
    const creature = prehistoricData[req.params.id]
    console.log(creature)
    // send one dino back
    res.json({ creature })
})


router.get('/edit/:id',(req,res) =>{
    // read dino file
    const prehistoric = fs.readFileSync('./prehistoric_creatures.json') 
    const prehistoricData = JSON.parse(prehistoric)

    const creature = prehistoricData[req.params.id]

    // render the template
    res.render('../views/prehiscreats/edit.ejs', {creature: creature, creatureId: req.params.id})
})

router.put('/:id', (req,res) => {
    // read dino file
    const prehistoric = fs.readFileSync('./prehistoric_creatures.json') 
    const prehistoricData = JSON.parse(prehistoric)

    prehistoricData[req.params.id].type = req.body.type
    prehistoricData[req.params.id].img_url = req.body.img_url

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))
    
    // redirect to /
    res.redirect('/prehistoric_creatures')
})

router.delete('/:id', (req,res) => {
    // read dino file
    const prehistoric = fs.readFileSync('./prehistoric_creatures.json') 
    const prehistoricData = JSON.parse(prehistoric)

    // remove one dino from the array -- use req.params
    prehistoricData.splice(req.params.id, 1)

    // save dinosaurs.json
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))

    // redirect to /dinosaurs
    res.redirect('/prehistoric_creatures')
})


module.exports = router