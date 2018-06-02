const mongoose = require("mongoose");
const Genres = mongoose.model("Genres");
const fetchGenres = require("./../helpers/fetchGenres");
const fetchPreviews = require("./../helpers/fetchPreviews");

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

exports.getPreviews = async (req, res) => {
  const { genreId } = req.params;
  if (isNaN(genreId)) {
    return res.status(400).send({
      error: `Recieved genreId equal to ${genreId}. Parameter should be a number`
    });
  }
  const data = await fetchPreviews(genreId);
  res.send(data);
};
