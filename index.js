//required
const express = require('express')
//rowdy logger for loggin routes
const rowdy = require('rowdy-logger')
const fs = require('fs')
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

//config app
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 3030

//MIDDLEWARE SETUP
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false }))
app.use(express.static(__dirname + '/public')) //where the css will
app.use(layouts) // use ejs layouts
//method overide so we can put and delete
app.use(methodOverride('_method'))

// app.use('/dinos', require('./controllers/dinos'))
// app.use('/prehistoric-creatures', require('./controllers/creatures'))

//define routes
app.get('/', (req, res) => {
  res.render('home')
})

//GET /dinos -- READ all dinos
app.get('/dinos', (req, res) => {
  //read the dino file
  const dinos = fs.readFileSync('./dinos.json')
  const dinoData = JSON.parse(dinos)
  console.log(dinoData)
  //send back the json
  // res.json({ dinoData })
  res.render('dinos/index.ejs', {dinoData})

})

//POST /dinos -- CREATE a new dino -redirect to /dinos
app.post('/dinos', (req, res) => {
  //read dino file 
  const dinos = fs.readFileSync('./dinos.json')
  const dinoData = JSON.parse(dinos)
  console.log(dinoData)
  
  console.log(req.body)
  //add data from request body to the dino data
  dinoData.push(req.body)

  //write the file
fs.writeFileSync('./dinos.json', JSON.stringify(dinoData))

  //readirect to /dinos
  res.redirect('/dinos')
})


//GET /dinos/new - READ (show) a form to add a dino
app.get('/dinos/new', (req, res) => {
  // res.json({msg: 'show form to add dino' })
  res.render('dinos/new.ejs')
})

//GET /dinos/:id -- READ one specific dino
app.get('/dinos/:id', (req, res) => {
  //get dino data
  const dinos = fs.readFileSync('./dinos.json')
  const dinoData = JSON.parse(dinos)

  //look up one dino with the req params
  const dino = dinoData[req.params.id]
  //sent one dino back
  res.json({ dino })
})

//GET /dinos/edit/:id -- READ (show) form to edit one dino
app.get('/dinos/edit/:id', (req, res) => {
  //get the dino info to populate form
  const dinos = fs.readFileSync('./dinos.json')
  const dinoData = JSON.parse(dinos)
  const dinoRender = dinoData[req.params.id]
  // render the template
  res.render('dinos/edit.ejs', { dino: dinoRender,  dinoId: req.params.id })
})

//PUT /dino/:id -- UPDATE (edit) one dino -- redirect to /dinos/:
app.put('/dinos/:id', (req, res) => {
  //get the dino date from json
const dinos = fs.readFileSync('./dinos.json')
const dinoData = JSON.parse(dinos)
console.log(dinoData, "👩‍🎤")

//find one that dino from req.params.id and us the req body to update
dinoData[req.params.id].name = req.body.name
dinoData[req.params.id].type = req.body.type

  //write the json file
  fs.writeFileSync('./dinos.json', JSON.stringify(dinoData))

//redirect to /dinos
res.redirect('/dinos')

})

//DELETE / dinos/:id -- DESTROY one specific dino
app.delete('/dinos/:id', (req, res) => {
  //get our dino json
  const dinos = fs.readFileSync('./dinos.json')
  const dinoData = JSON.parse(dinos)

  //remove one from array
  dinoData.splice(req.params.id, 1)

  //save dinos.json
  fs.writeFileSync('./dinos.json', JSON.stringify(dinoData))

  //redirect to /dinos
  res.redirect('/dinos')
})


// Creatures START *******************

//GET /creatures -- READ all creatures
app.get('/prehistoric-creatures', (req, res) => {
  //read the creatures file
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)
  console.log(creatureData)
  res.render('prehistoric-creatures/index.ejs', {creatureData})
})

//GET /creatures/new - READ (show) a form to add a creature
app.get('/prehistoric-creatures/new', (req, res) => {
  // res.json({msg: 'show form to add dino' })
  res.render('prehistoric-creatures/new.ejs')
})

//POST -- CREATE a new creature -redirect to /creatures
app.post('/prehistoric-creatures', (req, res) => {
  //read creatures file 
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)
  console.log(creatureData)
  
  console.log(req.body)
  //add data from request body to the data
  creatureData.push(req.body)

  //write the file
fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

  //readirect to /creatures
  res.redirect('/prehistoric-creatures')
})


//GET ///GET  -- READ one specific 
app.get('/prehistoric-creatures/:id', (req, res) => {
  //get dino data
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

    //look up one  with the req params
  const creature = creatureData[req.params.id]
  //sent one dino back
  res.json({ creature })
})


//GET /creatures/edit/:id -- READ (show) form to edit one
app.get('/prehistoric-creatures/edit/:id', (req, res) => {

  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)
  const creatureRender = creatureData[req.params.id]
  // render the template
  res.render('prehistoric-creatures/edit.ejs', { creature: creatureRender,  creatureId: req.params.id })
})

//PUT  -- UPDATE (edit) one  -- redirect to 
app.put('/prehistoric-creatures/:id', (req, res) => {

const creatures = fs.readFileSync('./prehistoric_creatures.json')
const creatureData = JSON.parse(creatures)
console.log(creatureDataData, "👩‍🎤")

//find one that from req.params.id and us the req body to update
creatureData[req.params.id].type = req.body.type
creatureData[req.params.id].img = req.body.img

  //write the json file
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

//redirect 
res.redirect('/prehistoric-creatures')  

})

//DELETE - DESTROY one specific 
app.delete('/prehistoric-creatures/:id', (req, res) => {

  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

  //remove one from array
  creatureData.splice(req.params.id, 1)

  //save json
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

  //redirect to 
  res.redirect('/prehistoric-creatures')
})



app.listen(PORT, () => {
  rowdyResults.print()
  console.log('iS that DInoS I hear')
})