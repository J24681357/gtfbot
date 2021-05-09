var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require("../files/directories");
////////////////////////////////////////////////////

module.exports.nitrous = function () {
  return [
    ["Normal (NOS)", 10000, "FPP", [300000]],
    ["Red (NOS)", 10000, "FPP", [300000]],
    ["Orange (NOS)", 10000, "FPP", [300000]],
    ["Yellow (NOS)", 10000, "FPP", [300000]],
    ["Lime (NOS)", 10000, "FPP", [300000]],
    ["Green (NOS)", 10000, "FPP", [300000]],
    ["Aqua (NOS)", 10000, "FPP", [300000]],
    ["Blue (NOS)", 10000, "FPP", [300000]],
    ["Purple (NOS)", 10000, "FPP", [300000]],
    ["Brown (NOS)", 10000, "FPP", [300000]],
    ["White (NOS)", 10000, "FPP", [300000]],
  ];
};

var oilchange = ["Oil Change", 1000, "FPP"];
var fuel = ["Fuel", 1000];

//////////////////

module.exports.list = function (args) {
  var gtfparts = require(gtf.LISTS).gtfpartlist;
  var results = "";
  if (args.length == 0) {
    return results;
  }
  if (args == "type") {
    results = Object.keys(gtfparts).map(function (x) {
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
  var gtfparts = require(gtf.LISTS).gtfpartlist;
  var final = [];
  var total = Object.keys(args).length;

  var types = Object.keys(gtfparts);

  for (var key = 0; key < types.length; key++) {
    var typekey = gtfparts[types[key]];
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

///////////////////////////////////

module.exports.tuninglist = function (part, gtfcar, embed, msg, userdata) {
  if (part["type"] == "Transmission") {
    var names = [
      [
        "__**Top Speed**__",
        " ",
        function (x) {
          return x;
        },
      ],
    ];
  }
  if (part["type"] == "Suspension") {
    var names = [
      [
        "__**Camber Angle**__",
        "in",
        function (x) {
          return x;
        },
      ],
      [
        "__**Toe Angle**__",
        "in",
        function (x) {
          return x;
        },
      ],
    ];
  }
  var tunevalues = gtfcar[part["type"].toLowerCase()]["tuning"];

  var list = [];

  for (var i = 0; i < names.length; i++) {
    if (tunevalues[i] == -999) {
      tunevalues[i] = 0;
    }
    if (tunevalues[i] < part["min"]) {
      tunevalues[i] = part["min"];
    }
    if (tunevalues[i] > part["max"]) {
      tunevalues[i] = part["max"];
    }
    var bar = [];
    for (var j = part["min"]; j < part["max"] + 1; j++) {
      if (j == tunevalues[i]) {
        bar.push(stats.setting("PROGRESSBAR", userdata)[0]);
      } else {
        bar.push(stats.setting("PROGRESSBAR", userdata)[1]);
      }
    }
    list.push([names[i][0] + " " + names[i][2](tunevalues[i]) + names[i][1] + "\r" + bar.join("") + "\r", " "]);
  }

  return list;
};

module.exports.checkpartsavail = function (part, gtfcar) {
  var ocar = require(gtf.CARS).find({ make: [gtfcar["make"]], fullname: [gtfcar["name"]], year: [gtfcar["year"]] })[0];
  var perf = require(gtf.PERF).perf(ocar, "DEALERSHIP");

  if (part["type"] == "Aero Kits") {
    var nameid = parseInt(part["name"].split(" ").pop()) - 1
    var list = ["❌", "❌"]
    var kits = ocar["image"].length - 1
    for (var x = 0; x < kits; x++) {
      if (gtfcar[part["type"].toLowerCase()]["current"] == part["name"]) {
        list[x] = "✅"
      } else {
        list[x] = require(gtf.PERF).partpreview(part, gtfcar, "GARAGE")["fpp"].toString();
      }
    }
    return list[nameid]
  }

  var bfpplimit = perf["fpp"] < part["fpplimit"];
  var bweightlimit = perf["oweight"] > part["weightlowerlimit"];
  var btype = part["eligible"].some(x => ocar["type"].includes(x))
  var prohibitcheck = part["prohibited"].some(x => ocar["special"].includes(x))
  if (btype && bfpplimit && bweightlimit && !prohibitcheck) {
    if (gtfcar[part["type"].toLowerCase()]["list"].includes(part["name"])) {
      if (gtfcar[part["type"].toLowerCase()]["current"] == part["name"]) {
        return "✅";
      } else {
        return "📦";
      }
    } else {
      return require(gtf.PERF).partpreview(part, gtfcar, "GARAGE")["fpp"].toString();
    }
  } else {
    return "❌";
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////
