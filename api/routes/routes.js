const genres = require("./../controllers/genreController");

module.exports = app => {
  app.route("/api/genres").get(genres.getGenres);
  app.route("/api/genres/:genreId").get(genres.getPreviews);
};
