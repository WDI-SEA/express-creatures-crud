const express = require("express")
const rowdy = require("rowdy-logger")

const app = express()
const rowdyResults = rowdy.begin(app)

const PORT = 7000
const log = console.log

app.get("/", (req, res) => {
    res.json({ msg: "Hello dinos!"})
})

app.listen(PORT, () => {
    rowdyResults.print()
    log(`${PORT}`)
})
