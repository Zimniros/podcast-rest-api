const mongoose = require("mongoose");
const Genres = mongoose.model("Genres");
const fetchGenres = require("./../helpers/fetchGenres");

exports.getGenres = (req, res) => {
  Genres.find().then(
    async genres => {
      if (genres.length === 0) {
        const data = await fetchGenres();
        Genres.insertMany(data);
        return res.send({ genres: data });
      }
      res.send({ genres });
    },
    e => {
      res.status(400).send(e);
    }
  );
};
