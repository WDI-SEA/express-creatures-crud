const fs = require('fs')

// GET /prehistoric-creatures -- READ all pcs ~~~~~~~~~
exports.pc_index = function (req, res) {
  // read the PC file
  const prehistoric = fs.readFileSync('./prehistoric-creatures.json')
  const pcData = JSON.parse(prehistoric)
  console.log(pcData)
  // send back the json
  res.render('prehistoric-creatures/index.ejs', {pcData: pcData})
  // res.json({ pcData })
}

// POST /prehistoric-creatures -- CREATE a new PC -- redirect to /prehistoric creature~~~~~~~~
exports.pc_create_post = function (req, res) {
  // read pc file
  const prehistoric = fs.readFileSync('./prehistoric-creatures.json')
  const pcData = JSON.parse(prehistoric)

  console.log(req.body)
  // add data from the request body to the pcnodata
  pcData.push(req.body)

  // write the file
  fs.writeFileSync('./prehistoric-creatures.json', JSON.stringify(pcData, null, 2))

  // redirect to /prehistoric-creatures
  res.redirect('/prehistoric-creatures')
}

exports.pc_create_get = function (req, res) {
    // read the PC file
    const prehistoric = fs.readFileSync('./prehistoric-creatures.json')
    const pcData = JSON.parse(prehistoric)
    console.log(pcData)
    // send back the json
    res.render('prehistoric-creatures/index.ejs', {pcData: pcData})
    
}

exports.pc_update_get = function (req, res) {
  res.render('prehistoric-creatures/new.ejs')
}

exports.pc_update_get_id = function (req, res) {
    // get our pc data
    const prehistoric = fs.readFileSync('./prehistoric-creatures.json')
    const pcData = JSON.parse(prehistoric)
  
    // look up one pc with the request parameters
    const pc = pcData[req.params.id]
  
    // send one pc back
    res.json({ pc })
}

exports.pc_update_get_edit_id = function (req, res) {
      // get the pc info to populate the form
      const prehistoric = fs.readFileSync('./prehistoric-creatures.json')
      const pcData = JSON.parse(prehistoric)
      const pc = pcData[req.params.id]
      // render the template
    res.render('prehistoric-creatures/edit.ejs', {pc: pc, pcId: req.params.id})

}


exports.pc_update_put_id = function (req, res) {
 // get the pc data from our json
 const prehistoric = fs.readFileSync('./prehistoric-creatures.json')
 const pcData = JSON.parse(prehistoric)
 // find on pc from the req.params.id and use the req body to update
 pcData[req.params.id].type = req.body.type // <--- need help with this one
 pcData[req.params.id].img_url = req.body.img_url // <--- need help with this one

 // write the json file
 fs.writeFileSync('./prehistoric-creatures.json', JSON.stringify(pcData, null, 2))


 // redirect to /prehistoric-creatures
 res.redirect('/prehistoric-creatures')
}

exports.pc_delete_id = function (req, res) {
      // get out pc json 
      const prehistoric = fs.readFileSync('./prehistoric-creatures.json')
      const pcData = JSON.parse(prehistoric)
  
      // remove one pc from the array -- use req. params
      pcData.splice(req.params.id, 1)
  
      // save prehistoric-creatures.json
      fs.writeFileSync('./prehistoric-creatures.json', JSON.stringify(pcData, null, 2))
  
      // redirect to /prehistoric-creatures
      res.redirect('/prehistoric-creatures')
}
