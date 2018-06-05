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
const Pairs = mongoose.model("Pairs", PairSchema);

module.exports = { Pairs };
