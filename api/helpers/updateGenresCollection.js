const mongoose = require("mongoose");
const Genres = mongoose.model("Genres");
const fetchGenres = require("./../helpers/fetchGenres");

module.exports = async () => {
  const genres = await fetchGenres();
  await Genres.remove({}).then(() => {
    Genres.insertMany(genres);
  });
};
