var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");

const Discord = require("discord.js");
var gtf = require('../../files/directories');
////////////////////////////////////////////////////

module.exports.tracksettings = function(changes, lobbies, pageargs, embed, msg, userdata) {
    var tracks = require(gtf.TRACKS).list("names")
          var number = parseInt(pageargs["query"][2])
          if (!gtftools.betweenInt(number, 1, tracks.length) | number == 0) {
            var list = tracks.map(x => [x, " "])
            pageargs["text"] = gtftools.formpage(pageargs, embed, msg, userdata)
    gtftools.formpages(pageargs, embed, msg, userdata)
          changes.push("LIST")
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

module.exports.namesettings = function(changes, lobbies, pageargs, embed, msg, userdata) {
          var name = pageargs["query"][2]
          if (name === undefined) {
            require(gtf.EMBED).alert({name:'❌ Invalid Name', description: 'The room name must be at least 1 character.', embed:"", seconds:0}, msg, userdata);
          changes.push("ERROR")
          return
          }
          if (name.length > 20) {
            require(gtf.EMBED).alert({name:'❌ Invalid Name', description: 'The room name must be less than 20 characters.', embed:"", seconds:0}, msg, userdata);
            changes.push("ERROR")
          return
          }
          var roomname = lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["channelname"]
          var newname = "lobby-" + name.replace(/ /g, "-").toLowerCase()
          msg.guild.channels.cache.find(c => c.name === roomname).setName(newname);
          lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["channelname"] = newname
            changes.push("**Room Title:** " + newname)
}

module.exports.lapsettings = function(changes, lobbies, pageargs, embed, msg, userdata) {
          var number = parseInt(pageargs["query"][2])
          if (!gtftools.betweenInt(number, 1, 10)) {
            require(gtf.EMBED).alert({name:'❌ Invalid Laps', description: 'You can only set laps between 1 and 10 in a lobby.', embed:"", seconds:0}, msg, userdata);
            changes.push("ERROR")
          return
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

module.exports.updateusercar = function(car, userdata) {
  
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF"
  
  MongoClient.connect(url, { useUnifiedTopology: true },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      dbo.collection("LOBBIES").find({}).forEach(row => {
            lobbies = row
      }).then(() => 
      {lobby()}
      )
})
function lobby() {
var currentlobby = lobbies["lobbies"][stats.inlobbystat(userdata)[1]]
for (var i = 0; i< currentlobby["players"].length; i++) {
  if (currentlobby["players"][i]["id"] == userdata["id"]) {
lobbies["lobbies"][stats.inlobbystat(userdata)[1]]["players"][i]["car"] = car
  }
}
require(gtf.LOBBY).save(lobbies)

}
}