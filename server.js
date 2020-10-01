const express = require("express");
var path = require("path");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//for all front end files, lets the app know they will all be in the public folder
app.use(express.static('public'));


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });



  


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  