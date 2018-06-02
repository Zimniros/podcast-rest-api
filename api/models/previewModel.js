const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PreviewSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    reuired: true,
    minlength: 1
  },
  artwork: {
    type: String,
    reuired: true,
    minlength: 1
  },
  summary: {
    type: String
  }
});

const Previews = mongoose.model("Previews", PreviewSchema);

module.exports = { Previews };
