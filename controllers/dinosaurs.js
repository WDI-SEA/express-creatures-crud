const express = require('express')
const router = express.Router()

// define route for /products
router.get('/products', (req, res) => {
    let hatedProducts = ['Costco Vitamins', 'Internet']
    res.render('leaveit/products.ejs', { products: hatedProducts })
})

// define route for /movies
router.get('/movies', (req, res) => {
    let hatedMovies = ['Vanilla Sky', 'Cats']
    res.render('leaveit/movies.ejs', { movies: hatedMovies })
})

// export module so it can be used accross our app!
module.exports = router