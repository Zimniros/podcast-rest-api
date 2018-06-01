const { ObjectId } = require("mongoose").Types;

exports.genres = [
  {
    _id: new ObjectId(),
    name: "Arts",
    id: 1301,
    subgenres: [
      {
        _id: new ObjectId(),
        name: "Food",
        id: 1306
      },
      {
        _id: new ObjectId(),
        name: "Literature",
        id: 1401
      },
      {
        _id: new ObjectId(),
        name: "Design",
        id: 1402
      },
      {
        _id: new ObjectId(),
        name: "Performing Arts",
        id: 1405
      },
      {
        _id: new ObjectId(),
        name: "Visual Arts",
        id: 1406
      },
      {
        _id: new ObjectId(),
        name: "Fashion & Beauty",
        id: 1459
      }
    ],
    __v: 0
  },
  {
    _id: new ObjectId(),
    name: "Kids & Family",
    id: 1305,
    subgenres: [],
    __v: 0
  }
];
