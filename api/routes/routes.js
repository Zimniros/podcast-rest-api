const genres = require("./../controllers/genreController");
const podcasts = require("./../controllers/podcastController");

module.exports = app => {
  app.route("/api/genres").get(genres.getGenres);
  app.route("/api/genres/:genreId").get(genres.getPreviews);

  app.route("/api/podcasts/:podcastId").get(podcasts.getPodcastById);
};
