var gtf = require('../../functions/f_gtf');
var stats = require('../../functions/profile/f_stats');
var emote = require('../../index');
var gtftools = require('../../functions/misc/f_tools');
var gtfperf = require('../../functions/marketplace/f_perf');

const Discord = require('discord.js');
const client = new Discord.Client();
var gtffile = process.env;
////////////////////////////////////////////////////

module.exports.changeseasonals = function() {
var seasonals = {}
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF"
  setInterval(function() {
    MongoClient.connect(url, { useUnifiedTopology: true },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      dbo.collection("SEASONALS").find({ "id": "1234567" }).forEach(row => {
            if (seasonalcheck(row["races"])) {
              console.log("Seasonals Changing")
         var seasonals = require(gtffile.SEASONAL).randomseasonal(1, 300, 200)
            var races = {
              "id": "1234567",
              "races": { seasonals }
           }
          dbo.collection("SEASONALS").replaceOne({ "id": "1234567" }, races)
        }
      }).then(() => {
 
        db.close()
      }
      )
    })


    function seasonalcheck(seasonal) {
      seasonal = seasonal["seasonals"]
    var date = new Date()
    var month = date.getMonth()
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    var year = date.getFullYear();
    var currentdate = month + day + year
    if (typeof(seasonal["date"]) === undefined) {
      return true
    }
    return currentdate != seasonal["date"]
    }


  }, 1000 * 60)

}

module.exports.randomseasonal = function(number, fpplimit, lowerfpp) {
  date = new Date()
  var month = date.getMonth()
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  var year = date.getFullYear();

  var eventid = "SEASONAL-1"
  var tracks = []
  if (number == 1) {
    var grid = gtftools.randomInt(6, 11)
    var startingprize = 2000;
    var tracksnum = 3
    var limit = 10.0;
  }
  for (var x = 0; x < tracksnum; x++) {
    var track = require(gtffile.TRACKS).RandomTrack();
    var km = track.length;
    var distance = gtftools.lapcalc(km, limit)
    tracks.push([x, track.name, distance[0]])
  }

  var finalfpp = Math.ceil(gtftools.randomInt(lowerfpp, fpplimit) / 10) * 10
  var pl = ["st", "nd", "rd", "th"]
  var positions = []

  var prize = startingprize
  for (var x = 0; x < grid; x++) {
    if (x % 10 == 0 && (x + 1) != 11) {
      positions.push(emote.goldtrophy + " " + (x + 1) + "st|" + prize)
    }
    else if (x % 10 == 1 && (x + 1) != 12) {
      positions.push(emote.silvertrophy + " " + (x + 1) + "nd|" + prize)
    }
    else if (x % 10 == 2 && (x + 1) != 13) {
      positions.push(emote.bronzetrophy + " " + (x + 1) + "rd|" + prize)
    }
    else {
      positions.push((x + 1) + "st|" + startingprize)
    }
    prize = Math.ceil((prize - (startingprize / (grid - 1))) / 100) * 100

  }
date = month + day + year

  var event = {
    "title": 'Seasonal Event ' + number,
    "eventid": eventid,
    "date": date,
    "positions": positions,
    "tracks": tracks,
    "category": ['N200'],
    "time": 'Day',
    "weather": 'Clear',
    "grid": grid,
    "difficulty": 90,
    "fpplimit": finalfpp,
    "upperfpp": finalfpp - 30,
    "lowerfpp": finalfpp - 80,
    "makes": [],
    "models": [],
    "drivetrains": [],
    "types": ['Production'],
    "prize": ["CREDITS", { "id": -1, "credits": 5000 }]
  }

  return event
}