const schedule = require("node-schedule");
const mongoose = require("mongoose");
const Genres = mongoose.model("Genres");
const fetchGenres = require("./../helpers/fetchGenres");

const j = schedule.scheduleJob("*/1 * * * *", () => {
  updateGenresCollection();
});

async function updateGenresCollection() {
  const genres = await fetchGenres();
  await Genres.remove({}).then(() => {
    Genres.insertMany(genres);
  });
}
