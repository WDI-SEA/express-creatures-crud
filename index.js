// APP SETUP ------------------------------------

// MODULE SETUP
const express = require("express")
const rowdy = require("rowdy-logger")
const fs = require("fs")
const layouts = require("express-ejs-layouts")
const methodOverride = require("method-override")

// MODULE IMPLEMENTATION
const app = express()
const rowdyResults = rowdy.begin(app)

// MIDDLEWARE
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname + "/public")) // where the css will live
app.use(layouts)
app.use(methodOverride("_method"))

// OPTIONAL CONSTANTS
const PORT = 7000
const log = console.log

// ROUTES ---------------------------------------

// HOME
app.get("/", (req, res) => {
    res.render("home.ejs")
})

// GET /dinosaurs -- READ (list) all dinos
app.get("/dinosaurs", (req, res) => {
    // read dinosaurs.json
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    // parse json buffer
    const dinoData = JSON.parse(dinosaurs)
    // send back the json
    res.render("dinosaurs/index.ejs", {dinoData})

})

// POST /dinosaurs -- CREATE a new dino -- redirect to /dinosaurs
app.post("/dinosaurs", (req, res) => {
    // read dinosaurs.json
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    const dinoData = JSON.parse(dinosaurs)
    // add data from request body to dinosaurs.json
    dinoData.push(req.body)
    // write file
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
    // redirect to /dinosaurs
    res.redirect("/dinosaurs")
})

// GET /dinosaurs/new -- READ (show) a form to add a dino
app.get("/dinosaurs/new", (req, res) => {
    res.render("dinosaurs/new.ejs")
})

// GET /dinosaurs/:id -- READ (list) info on one dino.
app.get("/dinosaurs/:id", (req, res) => {
    // read dinosaurs.json
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    const dinoData = JSON.parse(dinosaurs)
    // look up one dino with req.param
    const dino = dinoData[req.params.id]
    // send one dino back
    res.json({dino})
})

// GET /dinosaurs/edit/:id -- READ (show) form for editing one dino.
app.get("/dinosaurs/edit/:id", (req, res) => {
    // get dino info to populate the form
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    const dinoData = JSON.parse(dinosaurs)
    const dino = dinoData[req.params.id]
    // render the template
    res.render("dinosaurs/edit.ejs", {dino: dino, dinoId: req.params.id})
})

// PUT /dinosaurs/:id -- UPDATE (edit) info on one dino. -- redirect to /dinosaurs/:id OR /dinosaurs
app.put("/dinosaurs/:id", (req, res) => {
    // get dinosaurs.json
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    const dinoData = JSON.parse(dinosaurs)
    // find one dino from req.params.id; use req.body to update
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type
    // write the json file
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
    // redirect to /dinosaurs
    res.redirect("/dinosaurs")
})

// DELETE /dinosaurs/:id -- DELETE specified dino.
app.delete("/dinosaurs/:id", (req, res) => {
    // get dinosaurs.json
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    const dinoData = JSON.parse(dinosaurs)
    // remove one dino from array
    dinoData.splice(req.params.id, 1)
    // save dinosaurs.json
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
    // redirect to /dinosaurs
    res.redirect("/dinosaurs")
})

// LISTEN TO PORT
app.listen(PORT, () => {
    rowdyResults.print()
    log(`${PORT}`)
})
