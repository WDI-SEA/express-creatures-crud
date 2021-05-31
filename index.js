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
app.use("/dinosaurs", require("./controllers/dinosaurs"))
app.use("/prehistoric_creatures", require("./controllers/prehistoric_creatures"))

// OPTIONAL CONSTANTS
const PORT = 7000
const log = console.log

// ROUTES ---------------------------------------

// HOME
app.get("/", (req, res) => {
    res.render("home.ejs")
})

// LISTEN TO PORT
app.listen(PORT, () => {
    rowdyResults.print()
    log(`${PORT}`)
})
