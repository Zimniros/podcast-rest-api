const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const EpisodeSchema = mongoose.model("Episodes").schema;

const PodcastSchema = new Schema({
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
  website: {
    type: String,
    required: true
  },
  episodes: [EpisodeSchema],
  description: {
    type: String,
    require: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  artworkUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Podcasts", PodcastSchema);
