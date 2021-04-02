"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
const Data = require("./data.js");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/items", Data.getAllItems);
app.get("/items/:id", Data.getOneItem);

app.delete("/items/:id", Data.deleteOneItem);
app.post("/items", Data.addAnItem);
// add update
app.put("/items/:id", Data.updateOneItem);

app.use((error, req, res, next) => {
  res.status(500).send(`My Bad ... ${error.message}`);
});

app.use("*", (req, res) => {
  res.status(404).send("These are not the droids you are looking for.");
});

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, console.log(`Server is up and running on port: ${port}`));
  },
};
