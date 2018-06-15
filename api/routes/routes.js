const genres = require("./../controllers/genreController");
const lookup = require("./../controllers/lookupController");
const podcasts = require("./../controllers/podcastController");

const server = require("./../../server");

module.exports = app => {
  app.route("/api/genres").get(genres.getGenres);
  app
    .route("/api/genres/:genreId")
    .all(server.cacheMiddleware(1800))
    .get(genres.getPreviews);

  app
    .route("/api/lookup/:term")
    .all(server.cacheMiddleware(300))
    .get(lookup.getSearchResults);
  app
    .route("/api/podcasts/:podcastId")
    .all(server.cacheMiddleware(1800))
    .get(podcasts.getPodcastById);
};
