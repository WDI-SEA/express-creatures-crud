// required packages
const express = require('express')
// rowdy logger for loggin our routes
const rowdy = require('rowdy-logger')

// config app
const app = express()
const rowdyResults = rowdy.begin(app)
const PORT = 3000

// define routes
app.get('/', (req, res) => {
    res.json({ msg: 'hello dinos'})
})

//listen on a port
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`is that dinos i hear on port ${PORT}`)
})