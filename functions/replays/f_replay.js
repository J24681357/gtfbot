var gtf = require("../../functions/f_gtf");
var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");
var gtfperf = require("../../functions/marketplace/f_perf");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////
var gtfuser = require("../../index");

module.exports.delete = function(number, replaydata, userdata) {
  delete replaydata[number.toString()]

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF"

  MongoClient.connect(url, { useUnifiedTopology: true },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      dbo.collection("REPLAYS").replaceOne({ "id": userdata["id"] }, replaydata)
    }
  )
}

module.exports.clear = function(userdata) {

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF"

  MongoClient.connect(url, { useUnifiedTopology: true },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      dbo.collection("REPLAYS").deleteOne({ "id": userdata["id"] })
    }
  )
}

module.exports.load = function(number, id) {
  var replay = gtfuser.allreplays[id]["replays"][number - 1]
  var title = replay[1][0]
  var results = replay[1][1]
  var racedetails = replay[1][2]
  var grid = replay[1][3]

  return ["🎥 __" + title + "__", results, racedetails, grid]
}

module.exports.savem = function(title, results, racedetails, grid, userdata) {
  var replaydata = ""
  var found = false

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF"

  MongoClient.connect(url, { useUnifiedTopology: true },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");

      dbo.collection("REPLAYS").find({}).forEach(row => {
        if (typeof row["id"] === userdata["id"]) {
          console.log(replaydata)
          found = true
        }
        console.log("Replay Saved.")
      })
      if (found) {
        add()
        dbo.collection("REPLAYS").replaceOne({ "id": userdata["id"] }, replaydata)
      } else {
        doit()
        add()
        dbo.collection("REPLAYS").insertOne(replaydata)
      }

    }
  )

  function doit() {
    replaydata = {
      "id": userdata["id"],
      "replays": {},
    }

  }

  function add() {
    var size = Object.keys(replaydata["replays"]).length
    replaydata["replays"][size + 1] = [title, results, racedetails, grid, stats.lastonline(userdata)]
  }

}
