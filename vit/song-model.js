const Mongoose = require("mongoose");

const SongSchema = new Mongoose.Schema({
  name: String,
  requestBy: String,
  requesterAvatar: String,
  date: { type: Date, default: Date.now() },
  type: String,
  duration: String,
  image: String,
  thumbnail: String,
  id: String,
});

module.exports = Mongoose.model("Song", SongSchema);
