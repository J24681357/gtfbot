var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require("../files/directories");
////////////////////////////////////////////////////

module.exports.find = function (args) {
  if (args === undefined) {
    return "";
  }
  var total = Object.keys(args).length;
  var gtfweather = require(gtf.LISTS).gtfweather;
  var final = [];
  var weathers = Object.keys(gtfweather);

  for (var key = 0; key < weathers.length; key++) {
    var wkey = gtfweather[weathers[key]];

    var count = 0;
    if (args["name"] !== undefined) {
      if (args["name"].length == 0 || args["name"][0] == "R" || args["name"][0] == "Random") {
        count++;
      } else {
        var names = args["name"];
        for (var iname = 0; iname < names.length; iname++) {
          if (wkey["name"].toLowerCase().includes(names[iname].toLowerCase())) {
            count++;
            break;
          }
        }
      }
    }
    if (count == total) {
      if (wkey["wet"]) {
        wkey["wetsurface"] = gtftools.randomInt(5, 100);
      } else {
        wkey["wetsurface"] = 0;
      }
      final.unshift(wkey);
    }
  }
  if (final.length == 0) {
    return "";
  }
  return final;
};

module.exports.random = function (args, num) {
  var rlist = [];
  var list = require(gtf.WEATHER).find(args);
  var randomizer = [];
  for (var i = 0; i < list.length; i++) {
    randomizer = randomizer.concat(Array(list[i]["chance"] * 100).fill(list[i]["name"]));
  }

  for (var i = 0; i < num; i++) {
    var rweather = randomizer[Math.floor(Math.random() * randomizer.length)];

    for (var j = 0; j < list.length; j++) {
      if (list[j]["name"] == rweather) {
        rweather = list[j];
        break;
      }
    }
    rlist.push(rweather);
  }
  return rlist;
};
