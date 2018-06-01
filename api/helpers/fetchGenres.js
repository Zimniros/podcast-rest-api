const mongoose = require("mongoose");
const axios = require("axios");
const { values, pick } = require("lodash");
const Genres = mongoose.model("Genres");
const fs = require("fs");

module.exports = async () => {
  return await getData();
};

function getData() {
  return axios
    .get(
      "https://itunes.apple.com/WebObjects/MZStoreServices.woa/ws/genres?id=26"
    )
    .then(res => res.data[26]["subgenres"])
    .then(res => prettifyData(res))
    .then(res => {
      return res.map(el => {
        el.subgenres = prettifyData(el.subgenres, ["name", "id"]);
        return el;
      });
    });
}

function prettifyData(arr, properties = ["name", "id", "subgenres"]) {
  return values(arr).map(el => pick(el, properties));
}
