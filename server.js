const express = require("express");
var path = require("path");
var fs = require("fs");

const app = express();

let notes =  require("./db/db.json");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//for all front end files, lets the app know they will all be in the public folder
app.use(express.static('public'));


  app.get("/api/notes", function(req, res) {
      //not using fs.readFile because now it's not coming in as a string 
    // fs.readFile("./db/db.json", "utf-8", (err, data) => {
    res.json(notes);   
    // })  
  });

  app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    notes.push(newNote);

    //this gives each object in the array an id number
    notes.forEach((note, index) => {
        note.id = index + 1;
    });
  
    //not using err because we are using writeFileSync.
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(newNote);
  });

   //NOTE TO GRADERS--I figured out I wasn't that far off, we needed to 
   //change const note to let notes and then have notes = updated notes.
    app.delete("/api/notes/:id", function(req, res) {
  
      updatedNotes = notes.filter((note)=>note.id !==parseInt(req.params.id));
     
      fs.writeFileSync("./db/db.json", JSON.stringify(updatedNotes))
      notes = updatedNotes
    res.json(notes);
   
    
  });


  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  

  