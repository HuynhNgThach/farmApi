require("dotenv").config();
const express = require("express");
const cluster = require("cluster");
const cpuLength = require("os").cpus().length;
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./_middleware/errorHandler");
const Mongoose = require("mongoose");
const vitRoute = require("./vit");

if (cluster.isMaster) {
  console.log(`Master ${process.pid} start`);

  //fork worker
  for (let i = 0; i < cpuLength; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Fork another worker");
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // allow cors requests from any origin and with credentials
  app.use(
    cors({
      origin: (origin, callback) => callback(null, true),
      credentials: true,
    })
  );

  //router
  app.use("/vit", vitRoute);

  //error handler
  app.use(errorHandler);

  //DB connection
  try {
    // connect database
    Mongoose.connect(process.env.VIT_DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //Mongoose.connection.on(
    //  "error",
    //  console.error.bind(console, "MongoDB connection error:")
    //);
  } catch (error) {
    console.log("ERROR", error);
  }

  const PORT = process.env.PORT || 3030;
  app.listen(PORT, () => {
    console.log(`Farm up with port: ${PORT}`);
  });
}
