const express = require('express');
const router = express.Router();
const fs = require('fs')

// GET /dinosaurs -- READ all dinos
router.get('/', (req, res) => {
    // read dino file
const images = fs.readFileSync('.prehistoric_creatures.json')
const dinoPics = JSON.parse(images)
console.log(dinoPics)
    // send back json
res.render('views/dinosaurs/prehistoric.ejs', { dinoPics })
})