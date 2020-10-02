const express = require("express");
var path = require("path");
var fs = require("fs");

const app = express();

const notes =  require("./db/db.json");

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

//   app.get("/api/notes/:note", function(req, res) {
//     var chosen = req.params.note;
//     for (var i = 0; i < notes.length; i++) {
//       if (chosen === notes[i].id) {
//         return res.json(notes[i]);
//       }
//     }
  
//     return res.send("No character found");
  
//   });

  app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    // const index = 0;

    // adding an id property to the object
    // newNote.id ="";

    //npm package for random number or take notes array select last note object
    //grab that note's id and increment it by 1
  
    // console.log(newNote);
  
    notes.push(newNote);

    //this gives each object in the array an id number
    notes.forEach((note, index) => {
        note.id = index + 1;
    });

  
    //not using err because we are using writeFileSync.
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
  
    res.json(newNote);
  });

//   app.delete("/api/notes/:note"

app.delete("/api/notes/:id", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
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
  

  