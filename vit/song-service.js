const Song = require("./song-model");

const getUniqSongs = async () => {
  const songs = await Song.find().lean();
  const uniqSongs = [];
  songs.forEach((song) => {
    let existSong = uniqSongs.find((s) => s.id === song.id);

    if (!existSong) {
      existSong = song;
      existSong.count = 1;
      uniqSongs.push(existSong);
    } else {
      existSong.count++;
      songs[uniqSongs.find((s) => s.id === existSong.id)] = existSong;
    }
  });
  return uniqSongs.sort((a, b) => b.count - a.count);
};

module.exports = {
  getUniqSongs,
};
