//required
const express = require('express')
//rowdy logger for loggin routes
const rowdy = require('rowdy-logger')
const fs = require('fs')
const layouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const ejsLint = require('ejs-lint');

//config app
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 3030
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false }))
app.use(express.static(__dirname + '/public')) //where the css will
app.use(layouts) // use ejs layouts
//method overide so we can put and delete
app.use(methodOverride('_method'))

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
  res.render('dinos/edit.ejs', { dino: dino,  dinoId: req.params.id })
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



app.listen(PORT, () => {
  rowdyResults.print()
  console.log('iS that DInoS I hear')
})