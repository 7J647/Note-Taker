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

  
  app.delete("/api/notes/:id", function(req, res) {
    //reading all of the notes from the db.json file
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;

  
    //variable to store the data read, convert back from a string    
    const notesArray = JSON.parse(data);
    // notesArray.push(req.body);

    // notesArray = notesArray.filter(x => {
    //     return x.Id != id;
    //   })
  
    // // notesArray.splice(0, 1, id);

//     var removeId = notesArray.map(note => note.id)
//                        .indexOf(note.id);

// ~removeId && notesArray.splice(removeId, id);
  
    fs.writeFileSync("./db/db.json", JSON.stringify(notesArray)), 
  
    res.json(notesArray);
  
    });
  });

//   POSSIBILITIES







//   var chosenNote = req.params.id;
//   console.log(chosenNote);

// // Filter to show only the selected character
// for (var i = 0; i < notesArray.length; i++) {
//   if (chosenNote === notesArray[i].id) {
//     return res.json(notesArray[i]);
//   });
// });
// }
// });


// In order to delete a note, you'll need to read all notes from the `db.json` file, 
// remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

  

  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  

  