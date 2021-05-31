const express = require("express")
const router = express.Router()
const fs = require("fs")

router.get("/prehistoric_creatures", (req, res) => {
    const creatureData = JSON.parse(fs.readFileSync("./prehistoric_creatures.json"))
    res.render("prehistoric_creatures/index.ejs", {creatureData})
})

router.post("/prehistoric_creatures", (req, res) => {
    const creatureData = JSON.parse(fs.readFileSync("./prehistoric_creatures.json"))
    creatureData.push(req.body)
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatureData))
    res.redirect("/prehistoric_creatures/prehistoric_creatures")
})

router.get("/prehistoric_creatures/new", (req, res) => {
    res.render("prehistoric_creatures/new.ejs")
})

router.get("/prehistoric_creatures/:id", (req, res) => {
    const creatureData = JSON.parse(fs.readFileSync("./prehistoric_creatures.json"))
    const creature = creatureData[req.params.id]
    res.json({creature})
})

router.get("/prehistoric_creatures/edit/:id", (req, res) => {
    const creatureData = JSON.parse(fs.readFileSync("./prehistoric_creatures.json"))
    const creature = creatureData[req.params.id]
    res.render("prehistoric_creatures/edit.ejs", {creature: creature, creatureID: req.params.id })
})

router.put("/prehistoric_creatures/:id", (req, res) => {
    const creatureData = JSON.parse(fs.readFileSync("./prehistoric_creatures.json"))
    creatureData[req.params.id].type = req.body.type
    creatureData[req.params.id].img_url = req.body.img_url
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatureData))
    res.redirect("/prehistoric_creatures/prehistoric_creatures")
})

router.delete("/prehistoric_creatures/:id", (req, res) => {
    const creatureData = JSON.parse(fs.readFileSync("./prehistoric_creatures.json"))
    creatureData.splice(req.params.id, 1)
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatureData))
    res.redirect("/prehistoric_creatures/prehistoric_creatures")
})

module.exports = router
