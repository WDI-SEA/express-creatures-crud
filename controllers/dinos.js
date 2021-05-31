const express = require('express')
const router = express.Router()

//controller for index
router.get('/index', (req, res) => {
  // let favefoods = ['Boba', 'Fried Chicken Sandwich', 'Pizza']
  res.render('dinos/index.ejs', {foods: favefoods})
})

//edit
router.get('/edit', (req, res) => {
  // let faveAnimals = ['Dog', 'bird', 'Corgi'] 
  res.render('dinos/edit.ejs', {animals: faveAnimals})
})
    

router.get('/new', (req, res) => {
  // let faveAnimals = ['Dog', 'bird', 'Corgi'] 
  res.render('dinos/new.ejs', {animals: faveAnimals})
})

module.exports = router 