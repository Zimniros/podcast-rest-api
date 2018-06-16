const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const axios = require("axios");
const { filter } = require("lodash");
const X2JS = require("x2js");
const getPodcastItunesPreview = require("../helpers/getPodcastItunesPreview");

module.exports = async podcastId => {
  return await getData(podcastId);
};

async function getData(podcastId) {
  const itunesPreview = await getPodcastItunesPreview(podcastId);
  const json = await parseFeed(itunesPreview.feedUrl);

  return {
    ...itunesPreview,
    website: getWebsite(json),
    description: getDescription(json),
    summary: getSummary(json),
    episodes: getEpisodes(
      json,
      itunesPreview.podcastId,
      itunesPreview.artworkUrl
    )
  };
}

function parseFeed(feedUrl) {
  return axios(feedUrl)
    .then(res => xml2json(res.data))
    .then(res => res.rss.channel)
    .catch(err => console.log("Error in parseFeed", err));
}

function xml2json(xml) {
  const x2js = new X2JS();
  return x2js.xml2js(xml);
}

function getAuthor(data) {
  return data.author.toString();
}

function getWebsite(data) {
  return getStringfromArray(data.link);
}

function getDescription(data) {
  if (data.description) return getStringfromArray(data.description);
}

function getSummary(data) {
  if (data.summary) return data.summary.toString();
}

function getEpisodes(data, podcastId, podcastArtworkUrl) {
  return data.item.map(episode => {
    try {
      return {
        id: new ObjectId(),
        podcastId,
        podcastArtworkUrl,
        title: getStringfromArray(episode.title),
        description: getDescription(episode),
        author: getAuthor(data),
        mediaUrl: getMediaUrl(episode),
        duration: getDuration(episode),
        pubDate: getPubDate(episode),
        linkToEpisode: getLinkToEpisode(episode)
      };
    } catch (error) {
      console.log(episode);
    }
  });
}

function getMediaUrl(data) {
  return data.enclosure["_url"];
}

function getDuration(data) {
  const duration = data.duration.toString();
  const index = duration.indexOf(":");

  return index === -1 ? parseInt(duration) : toSeconds(duration);
}

function toSeconds(time) {
  let p = time.split(":"),
    s = 0,
    m = 1;

  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10);
    m *= 60;
  }

  return s;
}

function getPubDate(data) {
  return data.pubDate;
}

function getLinkToEpisode(data) {
  return data.link;
}

/*
"title": [
  "SYSK Selects: Was there a real King Arthur?",
  {
      "__prefix": "itunes",
      "__text": "SYSK Selects: Was there a real King Arthur?"
  }
]*/
function getStringfromArray(array) {
  if (typeof array === "string") return array;
  if (Array.isArray(array)) {
    const res = array.filter(el => {
      if (typeof el === "string") return el;
    });

    return res.length > 1 ? res[0] : res.toString();
  }
}
