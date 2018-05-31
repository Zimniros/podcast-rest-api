const mongoose = require("mongoose");
const axios = require("axios");
const Pairs = mongoose.model("Pairs");

module.exports = podcastId => {
  return Pairs.findOne({ podcastId }).then(pair => {
    if (!pair) {
      return fetchFeedUrl(podcastId).then(podcastFeedUrl => {
        if (podcastFeedUrl) {
          Pairs.create({
            podcastId,
            podcastFeedUrl
          });
          return podcastFeedUrl;
        }
      });
    }
    return pair.podcastFeedUrl;
  });
};

function fetchFeedUrl(podcastId) {
  return axios
    .get(`https://itunes.apple.com/lookup?id=${podcastId}`)
    .then(res => {
      const { resultCount, results } = res.data;
      if (resultCount === 0) {
        return null;
      }
      return results[0].feedUrl;
    })
    .catch(err => console.log(err));
}
