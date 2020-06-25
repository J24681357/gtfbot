var gtf = require("/home/runner/gtfbot/functions/f_gtf");
var stats = require("/home/runner/gtfbot/functions/profile/f_stats");
var emote = require("/home/runner/gtfbot/index");
var gtftools = require("/home/runner/gtfbot/functions/misc/f_tools");
var gtferror = require("/home/runner/gtfbot/functions/misc/f_errors");
var gtfperf = require("/home/runner/gtfbot/functions/marketplace/f_perf");
var parts = require("/home/runner/gtfbot/functions/marketplace/f_parts");
var exp = require("/home/runner/gtfbot/profile/expprofile");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////
var gtfuser = require("/home/runner/gtfbot/index");

module.exports.replays = function(id) {
  return gtfuser.allreplays[id]["replays"]
}

module.exports.replay = function(number, id) {
  return gtfuser.allreplays[id]["replays"][number-1]
}

module.exports.delete = function(number, id) {
  var replay = gtfuser.allreplays[id]["replays"][number-1]
  var replayid = replay[0]

  
  var replays = gtfuser.allreplays[id]["replays"].filter(x => (x[0] != replayid))
  gtfuser.allreplays[id]["replays"] = replays
  return
}

module.exports.clear = function(id) {
  gtfuser.allreplays[id]["replays"] = []
}

module.exports.load = function(number,id) {
  var replay = gtfuser.allreplays[id]["replays"][number-1]
  var title = replay[1][0]
  var results = replay[1][1]
  var racedetails = replay[1][2]
  var grid = replay[1][3]

  return ["🎥 __" + title + "__",results,racedetails,grid]
}

module.exports.save = function(title, results, racedetails, grid, id) {
  gtfuser.allreplays[id]["replays"].push([gtfuser.allreplays[id]["replayid"], [title, results, racedetails, grid], stats.lastonline(id)])
  gtfuser.allreplays[id]["replayid"]++
}
