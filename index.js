const express = require('express')

//rowdy logger for logging our routes
const rowdy = require('rowdy-logger')
const fs = require('fs')
const layouts = require('express-ejs-layouts')


const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 2000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname+ '/public')) // where the css will live
app.use(layouts)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/dinosaurs', (req, res) => {
const dinosaurs = fs.readFileSync ('./dinosaurs.json')
const dinoData = JSON.parse(dinosaurs)
res.json({ dinoData })
})


app.post('/dinosaurs', (req, res) => {
    const dinosaurs = fs.readFileSync ('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    
    dinoData.push(req.body)

    fs.writeFileSync ('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

app.get('/dinosaurs/new', (req,res) => {
    res.json ({ msg: 'show form to add a dino' })
})

app.get('/dinosaurs/:id', (req, res) => {
    // get our dino data
    const dinosaurs = fs.readFileSync ('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // look up one dino with the request parameters
    const dino = dinoData[req.params.id]


    //send one dino back
    res.json ({ dino })
})
app.get('/dinosaurs/edit/:id', (req, res) => {
    res.json ({ msg: `show form to edit dino ${req.params.id}`})
})

//update one dino - redirect to /dinosaurs
app.put('/dinosaurs/:id', (req, res) =>{
    // get the dino data from our json
    const dinosaurs = fs.readFileSync ('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    //find on dino from the req.params.id and use the req.body to update
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type

    fs.writeFileSync ('./dinosaurs.json', JSON.stringify(dinoData))

    //redirect to /dinosaurs
    res.redirect('/dinosaurs')
})

//DELETE
app.delete('/dinosaurs/:id', (req, res) => {
    const dinosaurs = fs.readFileSync ('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    dinoData.splice(req.params.id, 1)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
})



app.listen(PORT, () => {
    rowdyResults.print()
    console.log('dino '+PORT+' goes GRRR 🐱‍🐉🐱‍🐉🐱‍🐉')
})