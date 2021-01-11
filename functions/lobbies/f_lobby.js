var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");

const Discord = require("discord.js");
var gtffile = process.env
////////////////////////////////////////////////////

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

module.exports.save = function(lobby, userdata) {
   var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF"
  MongoClient.connect(url, { useUnifiedTopology: true }, 
   function(err, db) {
    if (err) throw err;
    var dbo = db.db("GTFitness");
 dbo.collection("LOBBIES").replaceOne({}, lobby).then(() => {
   console.log("Lobby data saved.") 
    db.close()})
      })

}
