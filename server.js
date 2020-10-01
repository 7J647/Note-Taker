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
      //not using this because now it's not coming in as a string 
    // fs.readFile("./db/db.json", "utf-8", (err, data) => {
    res.json(notes);   
    // })  
  });

  app.post("/api/notes", function(req, res) {
    const newNote = req.body;

    newNote.id ="";

    //npm package for random number or take notes array select last note object
    //grab that note's id and increment it by 1
  
    console.log(newNote);
  
    notes.push(newNote);

  
    //not using err because we are using writeFileSync.   Taking array out of the file
    //adding a new thing into the array, putting the array back into the file.
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
  
    res.json(newNote);
  });

  app.delete("/api/notes/:note"


  

  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  