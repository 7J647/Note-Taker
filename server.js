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

  
  // app.delete("/api/notes/:id", function(req, res) {
  //   //reading all of the notes from the db.json file
  //   fs.readFile("./db/db.json", "utf-8", (err, data) => {
  //       if (err) throw err;
   
  //   //I just wasn't able to understand this.  What I am thinking
  //   //is that we need to fs.readFile again.  Somehow use req.params
  //   //to isolate the id.  Use .filter on notes to remove the note with
  //   //the selected id.  Rewrite the updated array of notes to the 
  //   //database. 
    
  //   //I had many hours put in with a ton of different
  //   //ideas but at this stage I don't think any amount of time is
  //   //going to help me get this on my own, alas.

  //   fs.writeFileSync("./db/db.json", JSON.stringify(notesArray)), 
  
  //   res.json(notesArray);
  
  //   });
  // });

  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  

  