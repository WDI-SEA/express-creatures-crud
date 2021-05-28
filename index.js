// turns on the lights
const express = require("express");
const rowdy = require("rowdy-logger");
const app = express();
const rowdyResults = rowdy.begin(app);
const PORT = 3000;
const fs = require("fs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ msg: "hello dinos! 🦖" });
});

// GET /dinosaurs -- READ all dinosaurs
app.get("/dinosaurs", (req, res) => {
  // read the dino file
  const dinosaurs = fs.readFileSync("./dinosaurs.json");
  const dinoData = JSON.parse(dinosaurs);
  console.log(dinoData);
  // send back the json
  res.json({ dinoData });
});
// POST /dinosaurs -- CREATE a new dino -- redirect to /dinosaurs
app.post("/dinosaurs", (req, res) => {
  const dinosaurs = fs.readFileSync("./dinosaurs.json");
  const dinoData = JSON.parse(dinosaurs);
  dinoData.push(req.body);
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
  res.redirect("/dinosaurs");
});

// GET /dinosaurs/new -- READ (show) a form to add a dino
app.get("/dinosaurs/new", (req, res) => {
  res.json({ msg: "show form to add a dino" });
});
// GET /dinosaurs/edit/:id -- READ (show) form to edit one dino
app.get("/dinosaurs/:id", (req, res) => {
  const dinosaurs = fs.readFileSync("./dinosaurs.json");
  const dinoData = JSON.parse(dinosaurs);
  const dino = dinoData[req.params.id];
  res.json({ dino });
});
// GET /dinosaurs/edit/:id -- READ (show) form to edit one dino
app.get('/dinosaurs/edit/:id', (req, res) => {
  res.json({ msg: `show form to edit dino ${req.params.id}`})
})
// PUT /dinosaurs/:id -- UPDATE (edit) one dino -- redirect to /dinosaur/:old
app.put('/dinosaurs/:id', (req, res) => {
  // get the dino data from json
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)

  // find on dino from the req.params.id and us the req body to update
  dinoData[req.params.id].name = req.body.name
  dinoData[req.params.id].type = req.body.type

  // write the json file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
  // redirect to /dinosaurs
  res.redirect('/dinosaurs')
})

// DELETE /dinosaur/:id -- DESTROY one specific dino
app.delete('/dinosaurs/:id', (req, res) => {
  // get your dino json
  const dinosaurs = fs.readFileSync('./dinosaurs.json')
  const dinoData = JSON.parse(dinosaurs)

  //remove one dino from the array -- use req.params
  dinoData.splice(req.params.id, 1)

  // save dinosaurs.json
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
  // redirect to /dinosaurs
  res.redirect('/dinosaurs')
})

app.listen(PORT, () => {
  rowdyResults.print();
  console.log(`is that dinos i hear on ${PORT} dinoemoji.jpg`);
});
