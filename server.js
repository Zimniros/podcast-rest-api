const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI || "mongodb://localhost/Podcast";
const Episode = require("./api/models/episodeModel");
const Podcast = require("./api/models/podcastModel");
const Pair = require("./api/models/pairModel");

mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes declaration
const routes = require("./api/routes/podcastRoutes");
routes(app);

app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);
console.log("todo list RESTful API server started on: " + port);
