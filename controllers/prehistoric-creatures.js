const express = require('express')
const router = express.Router()

// controller rule for /loveit/foods
router.get('/foods', (req, res) => {
    let faveFoods = ['Boba', 'Fried Chicken Sandwhich', 'Pizza']
    res.render('loveit/foods.ejs', { foods: faveFoods })
})

// controller rule for /loveit/animals
router.get('/animals', (req, res) => {
    let faveAnimals = ['Manatee', 'Chinchila', 'Corgi']
    res.render('loveit/animals.ejs', { animals: faveAnimals})
})

module.exports = router