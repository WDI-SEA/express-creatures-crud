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

// app.use('/dinosaurs', require('./controllers/dinosaurs'))//  <-- pulled from love it leave it
// app.use('/prehistoric-creatures', require('./controllers/prehistoric-creatures')) //  <-- pulled from love it leave it


app.use(methodOverride('_method'))


// define routes
app.get('/', (req, res) => {
  res.render('home')
})


const dinoController = require('./controllers/dinosaurs');

// GET /dinosaurs -- READ all dinos ~~~~~~~~~
app.get('/dinosaurs', dinoController.dino_index)

// GET /dinosaurs/new -- READ (show) a form to add a dino~~~~~~~~~~~~~
app.get('/dinosaurs/new', dinoController.dino_create_get) 

// POST /dinosaurs -- CREATE a new dino -- redirect to /dinosaurs~~~~~~~~
app.post('/dinosaurs', dinoController.dino_create_post)

// GET /dinosaurs/:id -- READ one specific dino~~~~~~~~~~
app.get('/dinosaurs/:id', dinoController.dino_show_get_id)

// GET /dinosaurs/edit/:id -- READ (show) form to edit one dino~~~~~~~~~~~~
app.get('/dinosaurs/edit/:id', dinoController.dino_update_get_edit_id)

// PUT /dinosaurs/:id -- UPDATE (edit) one dino -- redirect to /dinosaur/:id~~~~~~~~~~~~~~~~~
app.put('/dinosaurs/:id', dinoController.dino_update_put_id)

// DELETE /dinosaur/:id -- DESTROY one specific dino~~~~~~~~~~~~~~~
app.delete('/dinosaurs/:id', dinoController.dino_delete_id)


/////~~~~~~~~//~~~~~~~~//~~~~~~~~//~~~~~~~~//~~~~~~~~//~~~~~~~~//~~~~~~~~//~~~~~~~~//~~~~~~~~//~~~~~~~~//~~~~~~~~

const pcController = require('./controllers/prehistoric-creatures.js'); // <-- check this line

// GET /prehistoric-creatures -- READ all pcs ~~~~~~~~~
app.get('/prehistoric-creatures', pcController.pc_index)


// GET /prehistoric-creatures/new -- READ (show) a form to add a pc~~~~~~~~~~~~~
app.get('/prehistoric-creatures/new', pcController.pc_update_get) 

// POST /prehistoric-creatures -- CREATE a new PC -- redirect to /prehistoric creature~~~~~~~~
app.post('/prehistoric-creatures', pcController.pc_create_post) /// <--- follow this 


// GET /prehistoric-creatures/:id -- READ one specific pc~~~~~~~~~~
app.get('/prehistoric-creatures/:id', pcController.pc_show_get_id)

// GET /prehistoric-creatures/edit/:id -- READ (show) form to edit one pc~~~~~~~~~~~~
app.get('/prehistoric-creatures/edit/:id', pcController.pc_update_get_edit_id)


// PUT /prehistoric-creatures/:id -- UPDATE (edit) one pc -- redirect to /prehistoric-creatures/:id~~~~~~~~~~~~~~~~~ <--- need help wit hthis one
app.put('/prehistoric-creatures/:id', pcController.pc_update_put_id)

// DELETE /prehistoric-creatures/:id -- DESTROY one specific PC~~~~~~~~~~~~~~~
app.delete('/prehistoric-creatures/:id', pcController.pc_delete_id)


//open the port for app to be listening on
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`${PORT} piles of Dino Crud 💩`)
})

