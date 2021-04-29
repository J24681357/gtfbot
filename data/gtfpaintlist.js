var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require("../files/directories");
////////////////////////////////////////////////////

module.exports.list = function (args) {
  var paint = require(gtf.LISTS).gtfpaintslist;
  var results = "";
  if (args.length == 0) {
    return results;
  }
  if (args == "type") {
    results = Object.keys(paint).map(function (x) {
      return x
        .split("-")
        .map(name => name.charAt(0).toUpperCase() + name.slice(1))
        .join();
    });
    return results;
  }
};

module.exports.find = function (args) {
  if (args === undefined) {
    return "";
  }
  var paint = require(gtf.LISTS).gtfpaintlist;
  var final = [];
  var total = Object.keys(args).length;

  var types = Object.keys(paint);

  for (var key = 0; key < types.length; key++) {
    var typekey = paint[types[key]];
    for (var i = 0; i < typekey.length; i++) {
      var count = 0;
      if (args["type"] !== undefined) {
        var type = args["type"];
        var x = typekey[i]["type"];
        if (x.toLowerCase().replace(/ /g, "-") === type.toLowerCase().replace(/ /g, "-")) {
          count++;
        }
      }

      if (args["name"] !== undefined) {
        var name = args["name"];
        var x = typekey[i]["name"];
        if (x === name) {
          count++;
        }
      }

      if (count == total) {
        final.unshift(typekey[i]);
      }
    }
  }
  if (final.length == 0) {
    return "";
  }
  return final.sort((x, y) => x["cost"] - y["cost"]);
};

module.exports.checkpaintsavail = function (paint, gtfcar) {
  if (gtfcar["color"]["current"] == paint["type"] + " " + paint["name"]) {
    return "✅";
  } else {
    return " ";
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////
