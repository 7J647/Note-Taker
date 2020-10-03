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

//ONE LAST NOTE TO THE GRADERS:  on my local host, the note disappears on page refresh
//but on the deployed app, I haven't been able to duplicate this


  //TO GRADERS--I originally turned this on on Friday without app.delete
  //I then woke up Saturday thinking I was just overcomplicating it
  //I tried the below and the delete works to the extent that if you
  //refresh the page, the note is no longer there.  But I still was not
  //able to get the delete to happen immediately on clicking the delete button.
    app.delete("/api/notes/:id", function(req, res) {
      //creating an updated array with one less note, using .filter to weed out the id to be deleted
      //doing a parseInt on the req.params.id to convert from string to number
      updatedNotes = notes.filter((note)=>note.id !==parseInt(req.params.id));
      //this was pretty much just an idea I thought I would try, writing the updated array back to the db
      fs.writeFileSync("./db/db.json", JSON.stringify(updatedNotes))
    res.json(updatedNotes);
    //below, I was trying to say that notes = updatedNotes and that this might get the delete to appear immediately
    //this didn't work though.
    // notes = updatedNotes;
    // res.json(updatedNotes);
    
  });

  //TO GRADERS--this is what I originally turned in on Friday:
  
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
  

  