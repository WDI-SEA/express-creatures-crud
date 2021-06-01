const express = require('express')
const router = express.Router()
const fs = require('fs')



// GET list all prehistorics
router.get("/", (req , res) => {
    const creatures = fs.readFileSync("./prehistoric_creatures.json")
    const creaturesData = JSON.parse(creatures)
    console.log(creaturesData)
    res.render("prehistoric_creatures/index.ejs", {creaturesData})
})

// GET show a form to make a NEW prehistoric READ
router.get("/new", (req, res) => {
    res.render("prehistoric_creatures/new.ejs")
})

// POST will catch the new prehistoric from the form and redirect to /prehistoric
router.post("/", (req , res) => {
    const creatures = fs.readFileSync("./prehistoric_creatures.json")
    const creaturesData = JSON.parse(creatures)

    creaturesData.push(req.body)

    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creaturesData))

    res.redirect("/prehistoric_creatures")

})

// GET list info about specific prehistoric /prehistoric/:id
router.get("/:id", (req ,res) => {
    const creatures = fs.readFileSync("./prehistoric_creatures.json")
    const creaturesData = JSON.parse(creatures)

    const creature = creaturesData[req.params.id]

    res.json({creature})
})

// GET READ edit specific prehistoric creature using a form
router.get("/edit/:id", (req, res) => {
    const creatures = fs.readFileSync("./prehistoric_creatures.json")
    const creaturesData = JSON.parse(creatures)

    const creature = creaturesData[req.params.id]

    res.render("prehistoric_creatures/edit.ejs", {creature:creature, creatureId: req.params.id})
})

// PUT updates the data from the edit from and then redirects
router.put("/:id", (req, res) => {
  const creatures = fs.readFileSync("./prehistoric_creatures.json")
  const creaturesData = JSON.parse(creatures)

  creaturesData[req.params.id].type = req.body.type
  creaturesData[req.params.id].img_url = req.body.img_url

  fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creaturesData))

  res.redirect("/prehistoric_creatures")
  
})

// DELETE (STRETCH GOAL) deletes prehistoric w/ the specified id 
router.delete("/:id", (req, res) => {
    const creatures = fs.readFileSync("./prehistoric_creatures.json")
    const creaturesData = JSON.parse(creatures)

    creaturesData.splice(req.params.id, 1)

    // save dinosaurs.json
    fs.writeFileSync("./prehistoric_creatures", JSON.stringify(creaturesData))
  
    // redirect to /dinosaurs
    res.redirect("/prehistoric_creatures")
})




module.exports= router