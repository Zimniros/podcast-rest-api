const podcast = require("./../controllers/podcastController");

module.exports = app => {
  app.route("/api/podcasts/:podcastId").get(podcast.getPodcastById);
};
