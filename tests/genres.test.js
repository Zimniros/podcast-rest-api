const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server");
const { Genres } = require("./../api/models/genreModel");
const { genres } = require("./fixtures/fixtures");

beforeEach(done => {
  Genres.remove({})
    .then(() => {
      return Genres.insertMany(genres);
    })
    .then(() => done());
});

describe("GET /api/genres", () => {
  test("should get all todos", done => {
    request(app)
      .get("/api/genres")
      .expect(200)
      .expect(res => {
        expect(res.body.genres.length).toBe(genres.length);
      })
      .end(done);
  });
});
