const env = process.env.NODE_ENV || "development";

if (env === "development") {
  process.env.PORT = 3000;
  process.env.MONGO_URI = "mongodb://localhost/Podcast";
} else if (env === "test") {
  process.env.PORT = 3001;
  process.env.MONGO_URI = "mongodb://localhost/PodcastTest";
}

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;
const { Genres } = require("./api/models/genreModel");
const Episode = require("./api/models/episodeModel");
const { Podcast } = require("./api/models/podcastModel");
const Pair = require("./api/models/pairModel");
require("./api/schedules/index");

mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes declaration
const routes = require("./api/routes/routes");
routes(app);

app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port, () => {
  console.log("todo list RESTful API server started on: " + port);
});

module.exports = { app };
