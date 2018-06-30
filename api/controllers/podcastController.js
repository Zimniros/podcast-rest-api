const mongoose = require("mongoose");
const fetchPodcast = require("./../helpers/fetchPodcast");

exports.getPodcastById = async (req, res) => {
  const { podcastId } = req.params;

  if (isNaN(podcastId)) {
    return res.status(400).send({
      error: `Recieved podcastId equal to ${podcastId}. Parameter should be a number`
    });
  }

  const data = await fetchPodcast(podcastId);

  if (!data) {
    return res.status(404).send({
      error: `Nothing was found.`
    });
  }
  res.send({ data });
};
