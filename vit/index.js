const router = require("express").Router();
const songController = require("./song-controller");
const stream = require("youtube-audio-stream");

router.get("/getSongsUniq", songController.getSongsUniq);

router.get("/stream/:videoID", async (req, res) => {
  try {
    stream(`http://youtube.com/watch?v=${req.params.videoID}`).pipe(res);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.writeHead(500);
      res.end("internal system error");
    }
  }
});
module.exports = router;
