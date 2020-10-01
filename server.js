const express = require("express");
var path = require("path");

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  