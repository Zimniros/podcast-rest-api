const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PairSchema = new Schema({
  podcastId: {
    type: Number,
    required: true
  },
  podcastFeedUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Pairs", PairSchema);
