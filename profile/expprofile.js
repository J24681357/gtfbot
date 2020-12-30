var gtf = require("/home/runner/gtfbot/functions/f_gtf");
var stats = require("/home/runner/gtfbot/functions/profile/f_stats");
var emote = require("/home/runner/gtfbot/index");
var gtftools = require("/home/runner/gtfbot/functions/misc/f_tools");

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


