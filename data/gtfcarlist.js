var stats = require("../functions/profile/f_stats");
var gtftools = require("../functions/misc/f_tools");
var emote = require("../index");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require("../files/directories");
////////////////////////////////////////////////////

module.exports.list = function (args) {
  var gtfcars = require(gtf.LISTS).gtfcarlist;
  var results = "";
  if (args.length == 0) {
    return results;
  }
  if (args == "all") {
    return gtfcars;
  }
  if (args == "makes") {
    results = Object.keys(gtfcars).map(function (x) {
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
  if (args["sort"] !== undefined) {
    var sort = args["sort"];
    delete args["sort"];
  }
  var total = Object.keys(args).length;
  var gtfcars = require(gtf.LISTS).gtfcarlist;
  var final = [];
  var makes = Object.keys(gtfcars);

  for (var key = 0; key < makes.length; key++) {
    var makekey = gtfcars[makes[key]];
    for (var i = 0; i < makekey.length; i++) {
      var count = 0;
      if (args["make"] !== undefined) {
        if (args["make"].length == 0) {
          count++;
        } else {
          var make = args["make"];
          var x = makekey[i]["make"];
          for (var makei = 0; makei < make.length; makei++) {
            if (x.toLowerCase().replace(/ /g, "_") === make[makei].toLowerCase().replace(/ /g, "_")) {
              count++;
              break;
            }
          }
        }
      }

      if (args["name"] !== undefined) {
        if (args["name"].length == 0) {
          count++;
        } else {
          var names = args["name"];
          for (var iname = 0; iname < names.length; iname++) {
            if (makekey[i]["name"].includes(names[iname])) {
              count++;
              break;
            }
          }
        }
      }

      if (args["fullname"] !== undefined) {
        if (args["fullname"].length == 0) {
          count++;
        } else {
          var fullnames = args["fullname"];
          for (var ifname = 0; ifname < fullnames.length; ifname++) {
            var text = makekey[i]["name"] + " " + makekey[i]["year"];
            if (text.includes(fullnames[ifname])) {
              count++;
              break;
            }
          }
        }
      }

      if (args["drivetrains"] !== undefined) {
        if (args["drivetrains"].length == 0) {
          count++;
        } else {
          var drivetrains = args["drivetrains"];
          for (var idt = 0; idt < drivetrains.length; idt++) {
            if (makekey[i]["drivetrain"].includes(drivetrains[idt])) {
              count++;
              break;
            }
          }
        }
      }

      if (args["year"] !== undefined) {
        if (args["year"].length == 0) {
          count++;
        } else {
          var years = args["year"];
          for (var iyear = 0; iyear < years.length; iyear++) {
            if (years[iyear].includes(makekey[i]["year"])) {
              count++;
              break;
            }
          }
        }
      }

      if (args["upperyear"] !== undefined) {
        if (args["upperyear"].length == 0) {
          count++;
        } else {
          var upperyears = args["upperyear"];
          for (var iupyear = 0; iupyear < upperyears.length; iupyear++) {
            if (parseInt(upperyears[iupyear]) <= parseInt(makekey[i]["year"])) {
              count++;
              break;
            }
          }
        }
      }

      if (args["types"] !== undefined) {
        if (args["types"].length == 0) {
          count++;
        } else {
          var types = args["types"];
          for (var itype = 0; itype < types.length; itype++) {
            if (makekey[i]["type"].includes(types[itype])) {
              count++;
              break;
            }
          }
        }
      }

      if (args["upperfpp"] !== undefined) {
        if (args["upperfpp"].length == 0) {
          count++;
        } else {
          var upperfpp = args["upperfpp"];
          var x = require(gtf.PERF).perf(makekey[i], "DEALERSHIP")["fpp"];
          if (x <= upperfpp) {
            count++;
          }
        }
      }

      if (args["lowerfpp"] !== undefined) {
        if (args["lowerfpp"].length == 0) {
          count++;
        } else {
          var lowerfpp = args["lowerfpp"];
          var x = require(gtf.PERF).perf(makekey[i], "DEALERSHIP")["fpp"];
          if (x >= lowerfpp) {
            count++;
          }
        }
      }
      if (count == total) {
        final.unshift(makekey[i]);
      }
    }
  }
  if (final.length == 0) {
    return "";
  }
  var id = 1;
  final.sort(function (a, b) {
    if (sort !== undefined) {
      if (sort == "fppasc") {
        return require(gtf.PERF).perf(a, "DEALERSHIP")["fpp"] - require(gtf.PERF).perf(b, "DEALERSHIP")["fpp"];
      } else if (sort == "fppdesc") {
        return require(gtf.PERF).perf(b, "DEALERSHIP")["fpp"] - require(gtf.PERF).perf(a, "DEALERSHIP")["fpp"];
      } else if (sort == "costasc") {
        a = require(gtf.MARKETPLACE).costcalc(a, require(gtf.PERF).perf(a, "DEALERSHIP")["fpp"]);
        b = require(gtf.MARKETPLACE).costcalc(b, require(gtf.PERF).perf(b, "DEALERSHIP")["fpp"]);
        return a - b;
      } else if (sort == "costdesc") {
        a = require(gtf.MARKETPLACE).costcalc(a, require(gtf.PERF).perf(a, "DEALERSHIP")["fpp"]);
        b = require(gtf.MARKETPLACE).costcalc(b, require(gtf.PERF).perf(b, "DEALERSHIP")["fpp"]);
        return b - a;
      } else {
        return a["name"].toString().localeCompare(b["name"]);
      }
    } else {
      return a["name"].toString().localeCompare(b["name"]);
    }
  });
  final.map(function (x) {
    x["id"] = id;
    id++;
  });

  return final;
};

module.exports.random = function (args, num) {
  var rlist = [];
  var list = require(gtf.CARS).find(args);
  for (var i = 0; i < num; i++) {
    rlist.push(list[Math.floor(Math.random() * list.length)]);
  }
  return rlist;
};
