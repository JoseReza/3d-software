console.log("-->Starting Software");
const express = require("express");

const port = 3000;
const app = express();

async function start() {
  app.use("/", express.static(__dirname));

  app.listen(port, function () {
    console.log(`-->App listening on port ${port}`);
  });
}

start();
