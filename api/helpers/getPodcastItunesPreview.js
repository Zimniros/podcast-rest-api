const mongoose = require("mongoose");
const axios = require("axios");
const ItunesPreviews = mongoose.model("ItunesPreviews");

module.exports = podcastId => {
  return ItunesPreviews.findOne({ podcastId })
    .then(itunesPreview => {
      if (!itunesPreview) {
        return fetchItunesPreview(podcastId).then(async itunesPreview => {
          if (itunesPreview) {
            await ItunesPreviews.create(itunesPreview);
            return itunesPreview;
          }
        });
      }
      return itunesPreview.toObject();
    })
    .catch(e => {
      console.log("inside getPodcastFeedUrl catch", e);
    });
};

function fetchItunesPreview(podcastId) {
  return axios
    .get(`https://itunes.apple.com/lookup?id=${podcastId}`)
    .then(res => {
      const { resultCount, results } = res.data;
      if (resultCount === 0) {
        return null;
      }
      return parseItunesPreview(results[0]);
    })
    .catch(err => console.log(err));
}

function parseItunesPreview(data) {
  return {
    podcastId: data.collectionId,
    feedUrl: data.feedUrl,
    title: data.trackName,
    author: data.artistName,
    artworkUrl: data.artworkUrl600 || data.artworkUrl100
  };
}
