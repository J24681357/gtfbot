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

var explevels = function() {
  return [ [ 1, 0 ],
  [ 2, 350 ],
  [ 3, 791 , ["Daily Workout (4 Cars) - **!dw4**"]],
  [ 4, 1325 , ["GTF Daily Workout - **!daily**"]],
  [ 5, 1954 , ["Career Mode - Amateur - **!career [a]**", "Arcade Mode - Amateur - **!dw4**", "Drift Trial - Beginner - **!drift [beginner]**"]],
  [ 6, 2680, ["Manufacturers: " + require(gtffile.CARS).amakes().join(", ").replace("-", " ") + " - **!car (make)**"]],
  [ 7, 3505 ],
  [ 8, 4431, ["Special Stage Route X - Top Speed Run - **!ssrx**"]],
  [ 9, 5460 ],
  [ 10, 6594 , ["Career Mode - IC League - **career [ic]**"]],
  [ 11, 7835, ["Manufacturers: " + require(gtffile.CARS).icmakes().join(", ").replace("-", " ") + " - **!car (make)**"]],
  [ 12, 9185 ],
  [ 13, 10646 ],
  [ 14, 12220 ],
  [ 15, 13909 ],
  [ 16, 15715 ],
  [ 17, 17640  ],
  [ 18, 19686 ],
  [ 19, 21855, ["GTF Auto - Licenses - **!license**"]],
  [ 20, 24149, ["Career Mode - IB League - **career [ib]**", "Arcade Mode - Professional - **!arcade pro**"]],
  [ 21, 26570 , ["Manufacturers: " + require(gtffile.CARS).ibmakes().join(", ").replace("-", " ") + " - **!car (make)**"] ],
  [ 22, 29120  ],
  [ 23, 31801 ],
  [ 24, 34615 ],
  [ 25, 37564 ],
  [ 26, 40650 ],
  [ 27, 43875],
  [ 28, 47241 ],
  [ 29, 50750 ],
  [ 30, 54404, ["Career Mode - IA League - **career [ia]**"]],
  [ 31,  58205, ["Manufacturers: " + require(gtffile.CARS).iamakes().join(", ").replace("-", " ") + " - **!car (make)**"]],
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
    e = ""
  }
  dict[(i + 1).toString()] = {
    "exp":explevels()[i][1],
    "rewards":e
  } 
  }
  return dict
}