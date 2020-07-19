const express = require("express");
const path = require("path");
const chalk = require("chalk");
const bodyParser = require("body-parser");

//Server Initialization
var server = express();

//Server Port specification
server.set("port", process.env.PORT || 5000);

//==Middlewares==

//Body Parser
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//====Routing=====
const leaderBoardRouter = require("./src/routes/leaderBoard");

server.use("/", leaderBoardRouter);

//Server Listen
server.listen(server.get("port"), function () {
  console.log(
    "Quick Leaderboard Server started at : " +
      Date() +
      " at port : " +
      chalk.greenBright(server.get("port"))
  );
});