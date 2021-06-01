const express = require('express');
const router = express.Router();
const fs = require('fs')

                // GET /prehistoric_creatures -- READ all prehistoric creatures
router.get('/', (req, res) => {
    // read dino file
const prehistoric = fs.readFileSync('./prehistoric_creatures.json')
const prehistoricData = JSON.parse(prehistoric)
console.log(prehistoricData)
    // send back json
res.render('prehistoric/prehistoric_cretures.ejs', { prehistoricData })
})
    
                // GET /prehistoric_creatures/new -- READ (show) a form to add a dino
router.get('/new', (req, res) => {
    res.render('prehistoric/prehistoric_creatures_new.ejs')
})


                // POST /prehistoric_creatures -- CREATE a new creature -- redirect to /prehistoric_creatures
router.post('/', (req, res) => {
    // read prehistoric file
const prehistoric = fs.readFileSync('./prehistoric_creatures.json')
const prehistoricData = JSON.parse(prehistoric)

console.log(req.body)
    // add data from the request body to the dino data
prehistoricData.push(req.body)

    // write file
fs.writeFileSync('.prehistoric_creatures.json', JSON.stringify(prehistoricData))

    // redirect to /prehistoric_creatures
res.redirect('/')
})



                // GET /prehistoric/:id -- READ one specific dino
router.get('/:id', (req, res) => {
    // get our prehistoricData 
const prehistoric = fs.readFileSync('.prehistoric_creatures.json')
const prehistoricData = JSON.parse(prehistoric)

    // lookup one creature with the request parameters
const creature = prehistoricData[req.params.id]

    // send one dino back
res.json({ creature })
})

            // GET /prehistoric/edit/:id -- READ (show) form to edit one dino
router.get('/edit/:id', (req, res) => {
// get the creature info to populate the form
const prehistoric = fs.readFileSync('.prehistoric_creatures.json')
const prehistoricData = JSON.parse(prehistoric)

const creature = prehistoricData[req.params.id]
//render the template
res.render('/prehistoric_creatures_edit.ejs', { creature: creature,  creatureId: req.params.id })
})

// PUT /prehistoric/:id -- UPDATE (edit) one dino -- redirect to /dinosaur/
router.put('/:id', (req, res) => {
// get the dino data from json
const prehistoric = fs.readFileSync('.prehistoric_creatures.json')
const prehistoricData = JSON.parse(prehistoric)

                //find on dino from the req.params.id and us the req body to update
                prehistoricData[req.params.id].img_url = prehistoric_cretures.data.img_url
                prehistoricData[req.params.id].type = prehistoric_cretures.data.type

// write the json file
fs.writeFileSync('.prehistoric_creatures.json', JSON.stringify(prehistoricData))

// redirect to /prehistoric
res.redirect('/')

})

// DELETE /dinosaur/:id -- DESTROY one specific dino
router.delete('/:id', (req, res) => {
// get our dino json
const prehistoric = fs.readFileSync('.prehistoric_creatures.json')
const prehistoricData = JSON.parse(prehistoric)

//remove one dino from the array -- use req.params
prehistoricData.splice(req.params.id, 1)

//save prehistoric.json
fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))

// redirect to /prehistoric
res.redirect('/')

})

module.exports = router;
