const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItunesPreviewSchema = new Schema({
  podcastId: {
    type: Number,
    required: true
  },
  feedUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 1
  },
  author: {
    type: String,
    required: true
  },
  artworkUrl: {
    type: String,
    required: true
  }
});
const ItunesPreviews = mongoose.model("ItunesPreviews", ItunesPreviewSchema);

module.exports = { ItunesPreviews };
