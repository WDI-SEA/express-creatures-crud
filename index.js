//required packages
const express = require('express')
const rowdy = require('rowdy-logger')
const fs = require('fs')
const { json } = require('express')
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

//config app
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname + '/public')) // where the css will live
app.use(layouts) //use ejs layouts
app.use(methodOverride('_method'))

function creatureParse() {
    const creatures = fs.readFileSync('./creatures.json')
    return JSON.parse(creatures)
}


//define routes
app.get('/', (req, res) => {
    res.render('home')
})

//GET /dinosaurs -- READ all dinos
app.get('/dinosaurs', (req, res) => {
    // console.log(req.query)
    //read the dino file
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    // console.log(dinoData)
    //send back the json
    
    res.render('dinosaurs/index.ejs', {
        dinoData,
        person1: 'joe',
        person2: 'ellie'
    })
})

//POST /dinosaurs -- CREATE new dino -- redirect to /dinosaurs
app.post('/dinosaurs', (req, res) => {
    //read dino file
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    console.log(req.body)
    //add data from the request body to the Dino data
    dinoData.push(req.body)
    //write the file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    //redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

//GET /dinosaurs == READ (show) a form to add a dino
app.get('/dinosaurs/new', (req, res) => {
    res.render('dinosaurs/new.ejs')
})

//GET /dinosaurs/:id -- READ one specific dino
app.get('/dinosaurs/:id', (req, res) => {
    console.log(req.params)
    //get our dino data
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    //look up one dino with the request params
    const dino = dinoData[req.params.id]
    //send one dino back
    res.json({dino})
})

//GET /dinosaurs/edit/:id -- READ (show) form to edit one dino
app.get('/dinosaurs/edit/:id', (req, res) => {
    //get the dino info to populate the form
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    const dino = dinoData[req.params.id]
    //render the template
    res.render('dinosaurs/edit.ejs', { dino: dino, dinoId: req.params.id})
   
})

//PUT /dinosaurs/:id -- UPDATE (edit) one dino -- redirect to /dinosaurs/:id
app.put('/dinosaurs/:id', (req, res) => {
    //get the dinoData from  our json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    //find one dino from the req.params.id and use the req.body to update
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type

    //write to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    //redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

//DELETE  /dinosaurs/:id -- DESTROY one specific dino
app.delete('/dinosaurs/:id', (req, res) => {
    //get our dino json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    //remove one dino from the array
    dinoData.splice(req.params.id, 1)
    //save dinosaurs.json
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    //redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

//GET /precrea
app.get('/precrea', (req, res) => {
    const creatureData = creatureParse()
    res.render('creatures/index.ejs', {creatureData})
})

// GET /precrea/new read a form to add a new creature
app.get('/precrea/new', (req, res) => {
    res.render('creatures/new.ejs')
})

//GET /precrea/edit/:id read a form to eddit a new creature
app.get('/precrea/edit/:id', (req, res) => {
    const creatureData = creatureParse()
    const oneCreature = creatureData[req.params.id]
    res.render('creatures/edit.ejs', {oneCreature: oneCreature, creatureID: req.params.id})
})

// GET /precrea/:id
app.get('/precrea/:id', (req, res) => {
    const creatureData = creatureParse()
    console.log(req.params)
    const oneCreature = creatureData[req.params.id]
    console.log(oneCreature)
    res.render('creatures/details.ejs', 
        {oneCreature: oneCreature, creatureID: req.params.id})
})

//POST /precrea
app.post('/precrea', (req, res) => {
    const creatureData = creatureParse()
    console.log(req.body)
    creatureData.push(req.body)
    fs.writeFileSync('./creatures.json', JSON.stringify(creatureData))
    res.redirect('/precrea')
})

//PUT /precrea/edit/:id
app.put('/precrea/:id', (req, res) => {
    const creatureData = creatureParse()
    creatureData[req.params.id].type = req.body.type
    creatureData[req.params.id].img_url = req.body.img_url

    fs.writeFileSync('./creatures.json', JSON.stringify(creatureData))

    res.redirect('/precrea')
})

//DELETE Xtra Cred
app.delete('/precrea/:id', (req, res) => {
    const creatureData = creatureParse()
    creatureData.splice(req.params.id, 1)
    fs.writeFileSync('./creatures.json', JSON.stringify(creatureData))
    res.redirect('/precrea')
})

app.listen(PORT, () => {
    rowdyResults.print()
    console.log('its WERKIIIIING!')
})
