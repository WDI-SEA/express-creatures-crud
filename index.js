const express = require("express")
const rowdy = require("rowdy-logger")
const fs = require("fs")

const app = express()
const rowdyResults = rowdy.begin(app)

const PORT = 7000
const log = console.log

app.use(express.urlencoded({extended:false}))

// ROUTES
app.get("/", (req, res) => {
    res.json({ msg: "Hello dinos!"})
})

// GET /dinosaurs -- READ (list) all dinos
app.get("/dinosaurs", (req, res) => {
    // read dinosaurs.json
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    // parse json buffer
    const dinoData = JSON.parse(dinosaurs)
    // send back the json
    res.json({dinoData})

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
    res.redirect("./dinosaurs")
})

// GET /dinosaurs/new -- READ (show) a form to add a dino

// GET /dinosaurs/:id -- READ (list) info on one dino.

// GET /dinosaurs/edit/:id -- READ (show) form for editing one dino.

// PUT /dinosaurs/:id -- UPDATE (edit) info on one dino. -- redirect to /dinosaurs/:id OR /dinosaurs

// DELETE /dinosaurs/:id -- DELETE specified dino.

app.listen(PORT, () => {
    rowdyResults.print()
    log(`${PORT}`)
})
