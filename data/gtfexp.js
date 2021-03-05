var stats = require("/home/runner/gtfbot/functions/profile/f_stats");
var emote = require("/home/runner/gtfbot/index");
var gtftools = require("/home/runner/gtfbot/functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = process.env
////////////////////////////////////////////////////

module.exports.checklevel = function(level, embed, msg, id) {
  var exp = stats.exp(id)
  var currentlevel = stats.level(id)
  if (currentlevel >= level || level == 0) {
    return true
  } else {
  require(gtf.EMBED).error("🔒 " + "Level " + level + " Required", "Your level does not meet the requirements." + "\n\n" + "**Level: Lv." + currentlevel + emote.exp + " -> " + "Lv." + level + "**", embed, msg,id)
    return false
  }
}

module.exports.islevelup = function(id) {
  var exp = stats.exp(id)
  var level = stats.level(id)
  var levelup = 0
  var levelupbool = false
  var leveldetails = [""]
  var explevels = require(gtf.LISTS).gtfexp
  
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