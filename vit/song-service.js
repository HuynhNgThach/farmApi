const Song = require("./song-model");

const getUniqSongs = async () => {
  const songs = await Song.find();
  const uniqSongs = [];
  songs.forEach((song) => {
    const existIndex = uniqSongs.findIndex((s) => s.id === song.id);
    if (existIndex === -1) {
      uniqSongs.push(song);
    }
  });
  return uniqSongs;
};

module.exports = {
  getUniqSongs,
};
