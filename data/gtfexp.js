var stats = require("/home/runner/gtfbot/functions/profile/f_stats");
var emote = require("/home/runner/gtfbot/index");
var gtftools = require("/home/runner/gtfbot/functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////

var explevels = function() {
  return [ [ 1, 0 ],
  [ 2, 350 ],
  [ 3, 791 , ["Daily Workout (4 Cars) - **!dw4**"]],
  [ 4, 1325 ],
  [ 5, 1954 , ["Career Mode - Amateur - **!career [a]**", "Arcade Mode - Amateur - **!dw4**", "Drift Trial - Beginner - **!drift [beginner]**"]],
  [ 6, 2680],
  [ 7, 3505 ],
  [ 8, 4431, ["Special Stage Route X - Top Speed Run - **!ssrx**"]],
  [ 9, 5460 ],
  [ 10, 6594 , ["Career Mode - IC League - **career [ic]**"]],
  [ 11, 7835],
  [ 12, 9185 ],
  [ 13, 10646 ],
  [ 14, 12220 ],
  [ 15, 13909 ],
  [ 16, 15715 ],
  [ 17, 17640  ],
  [ 18, 19686 ],
  [ 19, 21855],
  [ 20, 24149, ["Career Mode - IB League - **career [ib]**", "Arcade Mode - Professional - **!arcade pro**"]],
  [ 21, 26570],
  [ 22, 29120  ],
  [ 23, 31801 ],
  [ 24, 34615 ],
  [ 25, 37564 ],
  [ 26, 40650 ],
  [ 27, 43875],
  [ 28, 47241 ],
  [ 29, 50750 ],
  [ 30, 54404, ["Career Mode - IA League - **career [ia]**"]],
  [ 31,  58205],
  [ 32, 62155 ],
  [ 33, 66256 ],
  [ 34,  70510],
  [ 35, 74919 ],
  [ 36, 79485 ],
  [ 37, 84210 ],
  [ 38, 89096],
  [ 39, 94145],
  [ 40, 99359],
  [ 41, 104740],
  [ 42,  110290 ],
  [ 43, 116011 ],
  [ 44, 121905 ],
  [ 45, 127974 ],
  [ 46, 134220 ],
  [ 47,  140645],
  [ 48, 147251 ],
  [ 49, 154040],
  [ 50, 161014 ] 
           ]
}

module.exports.ExpLevels = function() {
  var dict = {}

  for (var i = 0; i < explevels().length; i++) {
  var e = explevels()[i][2] 
  if (e === undefined) {
    e = [""]
  }
  dict[(i + 1).toString()] = {
    "exp":explevels()[i][1],
    "rewards": e
  } 
  }
  return dict
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