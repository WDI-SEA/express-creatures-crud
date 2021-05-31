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

app.use('/dinos', require('./controllers/dinos'))
app.use('/creatures', require('./controllers/creatures'))

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
  const dino = fs.readFileSync('./dinos.json')
  const dinoData = JSON.parse(dino)
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
app.get('/creatures', (req, res) => {
  //read the creatures file
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)
  console.log(creatureData)
  res.render('creatures/index.ejs', {creatureData})
})

//POST /dinos -- CREATE a new creature -redirect to /creatures
app.post('/creatures', (req, res) => {
  //read creatures file 
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const dinoData = JSON.parse(creatures)
  console.log(dinoData)
  
  console.log(req.body)
  //add data from request body to the dino data
  dinoData.push(req.body)

  //write the file
fs.writeFileSync('./creatures.json', JSON.stringify(dinoData))

  //readirect to /creatures
  res.redirect('/creatures')
})

//GET /creatures/new - READ (show) a form to add a creature
app.get('/creatures/new', (req, res) => {
  // res.json({msg: 'show form to add dino' })
  res.render('creatures/new.ejs')
})

//GET ///GET /dinos/:id -- READ one specific dino
app.get('/creatures/:id', (req, res) => {
  //get dino data
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

    //look up one dino with the req params
  const creature = creatureData[req.params.id]
  //sent one dino back
  res.json({ creature })
})

//GET /creatures/:id -- READ one specific dino
app.get('/creatures/:id', (req, res) => {
  //get dino data
  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)

    //look up one dino with the req params
  const creature = creatureData[req.params.id]
  //sent one dino back
  res.json({ creature })
})

//GET /creatures/edit/:id -- READ (show) form to edit one dino
app.get('/creatures/edit/:id', (req, res) => {

  const creatures = fs.readFileSync('./prehistoric_creatures.json')
  const creatureData = JSON.parse(creatures)
  const creatureRender = creatureData[req.params.id]
  // render the template
  res.render('creatures/edit.ejs', { creature: creatureRender,  creatureId: req.params.id })
})

//PUT /dino/:id -- UPDATE (edit) one dino -- redirect to /dinos/:
app.put('/creatures/:id', (req, res) => {
  //get the dino date from json
const creatures = fs.readFileSync('./prehistoric_creatures.json')
const creatureData = JSON.parse(creatures)
console.log(creatureDataData, "👩‍🎤")

//find one that dino from req.params.id and us the req body to update
creatureData[req.params.id].name = req.body.name
creatureData[req.params.id].type = req.body.type

  //write the json file
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

//redirect to /dinos
res.redirect('/creatures')  

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



app.listen(PORT, () => {
  rowdyResults.print()
  console.log('iS that DInoS I hear')
})