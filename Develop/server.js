// Dependencies
// =============================================================
const express = require("express");
// var path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
// var PORT = 3000;
const PORT = process.env.PORT || 3000;



//MIDDLEWARE
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Data

// const notes = [
//     {
//         routeName:"",
//         title:"",
//         text:""
//     }
// ]

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  




// // Routes
// // =============================================================

// //Route specifically for notes.html
// app.get("/notes", function(req, res) {
//     res.sendFile(path.join(__dirname, "notes.html"));
//   });

// // Basically a catch all that returns all routes other than notes.html to index.html
// app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "index.html"));
//   });

// // returns all saved notes as json
// app.get("/api/notes", function(req, res) {
//     return res.json(notes);
//   });


//   // Create New Notes - takes in JSON input
// app.post("/api/notes", function(req, res) {
//     // req.body hosts is equal to the JSON post sent from the user
//     // This works because of our body parsing middleware
//     const newNote = req.body;
  
//     // Using a RegEx Pattern to remove spaces from newCharacter
//     // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//     newNote.routeName = newNote.title.replace(/\s+/g, "").toLowerCase();
  
//     console.log(newNote);
  
//     notes.push(newNote);
  
//     res.json(newNote);
//   });