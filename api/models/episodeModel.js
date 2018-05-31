const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
  podcastId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 1
  },
  linkToEpisode: {
    type: String,
    required: true,
    minlength: 1
  },
  pubDate: {
    type: Date,
    required: true
  },
  description: {
    type: String
  },
  mediaUrl: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Episodes", EpisodeSchema);
