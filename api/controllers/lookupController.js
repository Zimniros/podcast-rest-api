const doLookup = require("./../helpers/doLookup");

exports.getSearchResults = async (req, res) => {
  const { term } = req.params;

  if (term.length < 3) {
    return res.status(400).send({
      error: `Recieved searchTerm too short. Search Term should be at least 3 symbols long`
    });
  }

  const data = await doLookup(term.split(" ").join("-"));
  res.send({ data });
};
