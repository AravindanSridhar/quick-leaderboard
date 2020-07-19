const express = require("express");
const leaderBoardRouter = express.Router();
const chalk = require("chalk");
const bodyParser = require("body-parser");
const redis = require("redis");

//Redis client instance
const client = redis.createClient();

//Error handling on connection
client.on("error", function(error) {
  console.error(error);
});
 
//Body Parser Middleware
leaderBoardRouter.use(bodyParser.urlencoded({ extended: false }));
leaderBoardRouter.use(bodyParser.json());

//Post route for putting the score
leaderBoardRouter.post("/putScore",(req,res)=>{
    const {userID, score} = req.body;
    client.zadd("leaderBoard",score, userID, (err,reply) =>{
        if(err){
            console.log(err);
            res.status(500).send({status : "putRank call failed."});
        }
        else{
            console.log(reply);
            res.status(201).send({sputRanktatus : "putRank call successful."});
        }
    });
});

leaderBoardRouter.get("/getTop",(req,res) => {
    const top = req.query.top;
    client.zrange("leaderBoard",0,top-1,"withscores",(err,reply)=>{
        if(err){
            console.log(err);
            res.status(500).send({status : "getTop call failed."});
        }
        else{
            console.log(reply);
            res.status(201).send({status : "getTop call successful.",reply : reply});
        }
    });
});

module.exports = leaderBoardRouter;