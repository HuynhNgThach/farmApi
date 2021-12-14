const songService = require("./song-service");

const getSongsUniq = async (req, res) => {
  const uniqSongs = await songService.getUniqSongs();
  res.json(uniqSongs);
};

module.exports = {
  getSongsUniq,
};
