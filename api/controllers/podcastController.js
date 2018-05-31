const mongoose = require("mongoose");
const Podcasts = mongoose.model("Podcasts");
const getPodcastFeedUrl = require("./../helpers/getPodcastFeedUrl");

exports.getPodcastById = (req, res) => {
  const id = req.params.podcastId;
  Podcasts.findOne({ id })
    .then(podcast => {
      if (!podcast) {
        return getPodcastFeedUrl(id)
          .then(feedUrl => {
            if (feedUrl) {
              return res.status(200).send({ feedUrl });
            }
            return res.status(400).send({ feedUrl: "Nothing was found" });
          })
          .catch(e => {
            res.status(400).send();
          });

        return res.status(404).send();
      }

      res.status(201).send(podcast);
    })
    .catch(e => {
      res.status(400).send();
    });
};
