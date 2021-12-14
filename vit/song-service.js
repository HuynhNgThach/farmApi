const Song = require("./song-model");

const getUniqSongs = async () => {
  const songs = await Song.find();
  const uniqSongs = [];

  songs.forEach((song) => {
    const existSong = uniqSongs.find((s) => s.id === song.id);
    if (!existSong) {
      existSong = song;
      existSong.count = 1;
      uniqSongs.push(existSong);
    } else {
      existSong.count += 1;
      songs[uniqSongs.find((s) => s.id === existSong.id)] = existSong;
    }
  });
  return uniqSongs.sort((a, b) => a.count - b.count);
};

module.exports = {
  getUniqSongs,
};
