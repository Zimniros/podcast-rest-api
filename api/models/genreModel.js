const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const GenreSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  subgenres: {
    type: [
      {
        id: {
          type: Number,
          required: true
        },
        name: {
          type: String,
          required: true,
          minlength: 1,
          trim: true
        }
      }
    ],
    required: false
  }
});

const Genres = mongoose.model("Genres", GenreSchema);

module.exports = { Genres };
