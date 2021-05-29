// required packages
const express = require('express')
// rowdy logger for loggin our routes
const rowdy = require('rowdy-logger')
const fs = require('fs')
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

// config app
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public')) // where the css will live
app.use(layouts) // use ejs layouts
// method override so we can put and delete
app.use(methodOverride('_method'))




// define routes
app.get('/', (req, res) => {
  res.render('home')
})

// GET /prehistoric-creatures -- READ all dinos ~~~~~~~~~
app.get('/prehistoric-creatures', (req, res) => {
  // read the PC file
  const prehistoric = fs.readFileSync('./prehistoric-creatures.json')
  const pcData = JSON.parse(prehistoric)
  console.log(pcData)
  // send back the json
  res.render('prehistoric_creatures/index.ejs', {pcData: pcData})
})

// POST /dinosaurs -- CREATE a new dino -- redirect to /dinosaurs~~~~~~~~
app.post('/dinosaurs', (req, res) => {
  // read dino file
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)

  console.log(req.body)
  // add data from the request body to the dino data
  dinoData.push(req.body)

  // write the file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

  // redirect to /dinosaurs
  res.redirect('/dinosaurs')
})

// GET /dinosaurs/new -- READ (show) a form to add a dino~~~~~~~~~~~~~
app.get('/dinosaurs/new', (req, res) => {
  res.render('dinosaurs/new.ejs')
}) 

// GET /dinosaurs/:id -- READ one specific dino~~~~~~~~~~
app.get('/dinosaurs/:id', (req, res) => {
  // get our dino data
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)

  // look up one dino with the request parameters
  const dino = dinoData[req.params.id]

  // send one dino back
  res.json({ dino })
})

// GET /dinosaurs/edit/:id -- READ (show) form to edit one dino~~~~~~~~~~~~
app.get('/dinosaurs/edit/:id', (req, res) => {
    // get the dino info to populate the form
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    const dino = dinoData[req.params.id]
    // render the template
  res.render('dinosaurs/edit.ejs', {dino: dino, dinoId: req.params.id})
})

// PUT /dinosaurs/:id -- UPDATE (edit) one dino -- redirect to /dinosaur/:id~~~~~~~~~~~~~~~~~
app.put('/dinosaurs/:id', (req, res) => {
    // get the dino data from our json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    // find on dino from the req.params.id and use the req body to update
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type

    // write the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))


    // redirect to /dinosaurs
    res.redirect('/dinosaurs')

})

// DELETE /dinosaur/:id -- DESTROY one specific dino~~~~~~~~~~~~~~~
app.delete('/dinosaurs/:id', (req, res) => {

    // get out dino json 
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // remove one dino from the array -- use req. params
    dinoData.splice(req.params.id, 1)

    // save dionsaurs.json
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to /dinosaurs
    res.redirect('/dinosaurs')
})


//open the port for app to be listening on
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`${PORT} piles of Dino Crud 💩`)
})

