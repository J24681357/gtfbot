var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");

const Discord = require("discord.js");
var gtf = process.env
////////////////////////////////////////////////////



module.exports.tracksettings = function(changes, lobbies, [page, query, reactionson, info, embed, msg, userdata]) {
    var tracks = require(gtf.TRACKS).list("names")
          var number = parseInt(query[2])
          if (!gtftools.betweenInt(number, 1, tracks.length)) {
            var list = tracks.map(x => [x, " "])
             results2 = gtftools.list(list, page, "", "", true, "", 15, [query, "lobby"], embed, msg, userdata)
      
             embed.setDescription(results2)
            gtftools.createpages(results2, list, page, "", "", true, "", 15, [query, "lobby", reactionson, info], embed, msg, userdata, "DM")
          return
          } else {
            var trackname = tracks[number-1]
            var track = require(gtf.TRACKS).find({"name":[trackname]})[0]
            lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["track"] = track["name"]
            lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["km"] = track["length"] * lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["laps"]
             lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["km"] = Math.round(  lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["km"] * 100 ) / 100
             
            lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["mi"] = (Math.round((100 *((track["length"] * lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["laps"])/ 1.609)))) / 100
            lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["mi"] = Math.round(  lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["mi"] * 100 ) / 100
            changes.push("**Track:** " + track["name"])
          }
}

module.exports.lapsettings = function(changes, lobbies, [page, query, reactionson, info, embed, msg, userdata]) {
          var number = parseInt(query[2])
          if (!gtftools.betweenInt(number, 1, 10)) {
          require(gtf.EMBED).error('❌ Invalid Laps', 'You can only set laps between 1 and 10 in a lobby.', embed, msg, userdata);
          changes = "ERROR"
          } else {
            var trackname = lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["track"]
            var track = require(gtf.TRACKS).find({"name":[trackname]})[0]
            lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["laps"] = number
                       lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["km"] = track["length"] * number
             lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["km"] = Math.round(  lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["km"] * 100 ) / 100
             
            lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["mi"] = (Math.round((100 *((track["length"] * number )/ 1.609)))) / 100
            lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["mi"] = Math.round(  lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["racesettings"]["mi"] * 100 ) / 100
            changes.push("**Laps:** " + number)
          }
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
