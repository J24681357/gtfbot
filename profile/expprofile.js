var gtf = require("/app/functions/f_gtf");
var stats = require("/app/functions/profile/f_stats");
var emote = require("/app/index");
var gtftools = require("/app/functions/misc/f_tools");
var gtfperf = require("/app/functions/marketplace/f_perf");
var parts = require("/app/functions/marketplace/f_parts");
var exp = require("/app/profile/expprofile");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////

module.exports.createexplevels = function() {
  var levelprogress = [[1, 0]]

for (var i = 0; i < 49; i++) {
  var number = (levelprogress[i][1]) + (Math.pow(i,2)) + (90 * i) + 350
  levelprogress.push([i+2, number])
}
  return levelprogress
}

module.exports.getpoints = function(num) {
  if (num == 51) {
    num--
  }
  return require(gtffile.EXP).ExpLevels()[num-1]["exp"]
}

module.exports.islevelup = function(id) {
  var exp = stats.exp(id)
  var level = stats.level(id)
  var levelup = 0
  var levelupbool = false
  var leveldetails = [""]
  var explevels = require(gtffile.EXP).ExpLevels()
  
for (var i = level; i < Object.keys(explevels).length; i++) {
  if (exp >= explevels[(i + 1).toString()]["exp"]) {
    levelup++
    levelupbool = true
    if (typeof explevels[(i + 1).toString()]["rewards"] == 'undefined') {
    leveldetails.push(explevels[(i + 1).toString()]["rewards"])
    }
  } else {
    break;
  }
}
 stats.levelup(levelup, id)
return [levelupbool, levelup, leveldetails]
}

module.exports.checklevel = function(level, embed, msg, id) {
  var exp = stats.exp(id)
  var currentlevel = stats.level(id)
  if (currentlevel >= level || level == 0) {
    return true
  } else {
  require(gtffile.EMBED).error("🔒 " + "Level " + level + " Required", "Your level does not meet the requirements." + "\n\n" + "**Level: Lv." + currentlevel + emote.exp + " -> " + "Lv." + level + "**", embed, msg,id)
    return false
  }
}