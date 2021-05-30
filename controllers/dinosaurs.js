const fs = require('fs')

// GET /dinosaurs -- READ all pcs ~~~~~~~~~
exports.dino_index = function (req, res) {
 // read the dino file
 const dinosaurs = fs.readFileSync('./dinosaurs.json')
 const dinoData = JSON.parse(dinosaurs)
 console.log(dinoData)
 // send back the json
 res.render('dinosaurs/index.ejs', {dinoData: dinoData})
}

// POST /dinosaurs -- CREATE a new PC -- redirect to /dinosaurs~~~~~~~~
exports.dino_create_post = function (req, res) {
  // read dino file
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)

  console.log(req.body)
  // add data from the request body to the dino data
  dinoData.push(req.body)

  // write the file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData, null, 2))

  // redirect to /dinosaurs
  res.redirect('/dinosaurs')
}

exports.dino_create_get = function (req, res) {
    // read the PC file
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
    // send back the json
    res.render('dinosaurs/index.ejs', {dinoData: dinoData})
    
}

exports.dino_update_get = function (req, res) {
  res.render('dinosaurs/new.ejs')
}

exports.dino_show_get_id = function (req, res) {
  // get our dino data
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)

  // look up one dino with the request parameters
  const dino = dinoData[req.params.id]

  // send one dino back
   // send one pc back
   res.render('dinosaurs/index.ejs', {dinoData: [dino]})
}

exports.dino_update_get_edit_id = function (req, res) {
    // get the dino info to populate the form
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    const dino = dinoData[req.params.id]
    // render the template
    res.render('dinosaurs/edit.ejs', {dino: dino, dinoId: req.params.id})

}


exports.dino_update_put_id = function (req, res) {
    // get the dino data from our json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    // find on dino from the req.params.id and use the req body to update
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type

    // write the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData, null, 2))


    // redirect to /dinosaurs
    res.redirect('/dinosaurs')
}

exports.dino_delete_id = function (req, res) {
    // get out dino json 
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // remove one dino from the array -- use req. params
    dinoData.splice(req.params.id, 1)

    // save dionsaurs.json
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData, null, 2))

    // redirect to /dinosaurs
    res.redirect('/dinosaurs')
}
