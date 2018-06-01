const genres = require("./../controllers/genreController");
const podcast = require("./../controllers/podcastController");

module.exports = app => {
  app.route("/api/genres").get(genres.getGenres);

  // app.route("/api/podcasts/:podcastId").get(podcast.getPodcastById);
};
