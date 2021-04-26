
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require('../files/directories');
////////////////////////////////////////////////////

module.exports.find = function(args) {
  if (args === undefined) {
    return "";
  }
  
  var arg_hour_total = 0
  if (args["hours"] !== undefined) {
    var arg_hours = args["hours"]
    delete args["hours"]
    arg_hour_total = 1
  }
  var total = Object.keys(args).length;
  var gtftime = require(gtf.LISTS).gtftime;
  var final = [];
  var times = Object.keys(gtftime);

  for (var key = 0; key < times.length; key++) {
      var tkey = gtftime[times[key]];

      var count = 0
      if (args["name"] !== undefined) {
        if (args["name"].length == 0 || args["name"][0] == "R" || args["name"][0] == "Random") {
          count++;
        } else {
          var names = args["name"];
          for (var iname = 0; iname < names.length; iname++) {
            if (tkey["name"].toLowerCase().includes(names[iname].toLowerCase())) {
              count++;
              break;
            }
          }
        }
      }
      if (count == total) {
        var j  = tkey["min"]

        while (j != (tkey["max"] + 1)) {
           var dict = {
            "name": tkey["name"],
            "emoji": tkey["emoji"],
            "hour": j,
            "seconds": "00"
          }
        var countx = 0
        
      if (arg_hours !== undefined) {
        if (arg_hours.length == 0) {
          countx++;
        } else {
          for (var ihour = 0; ihour < arg_hours.length; ihour++) {
            if (parseInt(dict["hour"]) == parseInt(arg_hours[ihour])) {
              countx++;
              break;
            }
          }
        }
      }
    if (countx == arg_hour_total) {
        final.unshift(dict);
      }
     j++
        if (j == 24) {
          j = 0
        }
          }
      }

    }
  if (final.length == 0) {
    return "";
  }
  return final;
}

module.exports.random = function(args, num) {
  var rlist = [];
  var list = require(gtf.TIME).find(args);
  for (var i = 0; i < num; i++) {
    rlist.push(list[Math.floor(Math.random() * list.length)]);
  }
  return rlist;
};