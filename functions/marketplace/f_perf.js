var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require("../../files/directories");
////////////////////////////////////////////////////

module.exports.speedcalc = function (number, gtfcar) {
  // based from careerdifficultycalc
  var rnorm = require("random-normal");
  var topspeed = rnorm({ mean: number * 1.3, dev: 15 });
  var value = gtfcar["transmission"]["tuning"];
  if (value <= 0) {
    topspeed = topspeed * (1 - 0.04 * Math.abs(value));
  } else {
    topspeed = topspeed * (1 + 0.01 * Math.abs(value));
  }
  return [Math.round(topspeed), Math.round(topspeed * 1.609)];
};

module.exports.perf = function (gtfcar, condition) {
  var power = gtfcar["power"];
  var weight = gtfcar["weight"];
  var aero = gtfcar["aerom"];

  var drivetrain = gtfcar["drivetrain"];

  var sell = require(gtf.MARKETPLACE).sellcalc(require(gtf.MARKETPLACE).costcalc(gtfcar));

  if (condition == "DEALERSHIP") {
    var offset = 3000 - weight;
    offset = Math.round(offset / 30);

    var offset_dt = 1;
    if (drivetrain == "FF") {
      offset_dt = 0.95;
    }
    if (drivetrain == "MR") {
      offset_dt = 1.08;
    }
    if (drivetrain.includes("4WD")) {
      offset_dt = 1.05;
    }
    if (drivetrain == "RR") {
      offset_dt = 1.1;
    }
    var aero = (aero - 1) * 30;

    var fpp = Math.round(((power - 50 + offset + 200) / 1200) * 900 * offset_dt + aero);
    power = gtfcar["power"];

    return { fpp: fpp, opower: gtfcar["power"], power: power, oweight: gtfcar["weight"], weight: weight, osell: gtfcar["cost"], sell: sell };
  }

  if (condition == "GARAGE") {
    var car = require(gtf.CARS).find({ make: [gtfcar["make"]], fullname: [gtfcar["name"]], year: [gtfcar["year"]] })[0];
    power = car["power"];
    weight = car["weight"];
    aero = car["aerom"];
    drivetrain = car["drivetrain"];
    sell = require(gtf.MARKETPLACE).sellcalc(require(gtf.MARKETPLACE).costcalc(car));
    /// PARTS
    var engine = require(gtf.PARTS).find({ name: gtfcar["engine"]["current"], type: "engine" })[0];
    var transmission = require(gtf.PARTS).find({ name: gtfcar["transmission"]["current"], type: "transmission" })[0];
    var suspension = require(gtf.PARTS).find({ name: gtfcar["suspension"]["current"], type: "suspension" })[0];
    var weightred = require(gtf.PARTS).find({ name: gtfcar["weight reduction"]["current"], type: "weight-reduction" })[0];
    var turbo = require(gtf.PARTS).find({ name: gtfcar["turbo"]["current"], type: "turbo" })[0];

    if (engine !== undefined) {
      var enginep = (100 + engine["percent"]) / 100;
      power = power * enginep;
      sell += require(gtf.MARKETPLACE).sellcalc(engine["cost"]);
    }
    if (suspension !== undefined) {
      var suspp = suspension["percent"] / 100;
      aero = aero * suspp;
      sell += require(gtf.MARKETPLACE).sellcalc(suspension["cost"]);
    }
    if (weightred !== undefined) {
      var weightredp = (100 - weightred["percent"]) / 100;
      console.log(weight);
      weight = weight * weightredp;
      console.log(weight);
      sell += require(gtf.MARKETPLACE).sellcalc(weightredp["cost"]);
    }
    if (turbo !== undefined) {
      var turbop = (100 + turbo["percent"]) / 100;
      power = power * turbop;
      sell += require(gtf.MARKETPLACE).sellcalc(turbo["cost"]);
    }
    ///////
    3000 - 3001 - 1;
    var offset = 3000 - weight;
    offset = Math.round(offset / 30);

    var offset_dt = 1;
    if (drivetrain == "FF") {
      offset_dt = 0.95;
    }
    if (drivetrain == "MR") {
      offset_dt = 1.08;
    }
    if (drivetrain.includes("4WD")) {
      offset_dt = 1.05;
    }
    if (drivetrain == "RR") {
      offset_dt = 1.1;
    }
    var aero = (aero - 1) * 30;

    var fpp = Math.round(((power - 50 + offset + 200) / 1200) * 900 * offset_dt + aero);

    return { fpp: fpp, opower: car["power"], power: Math.round(power), oweight: car["weight"], weight: Math.round(weight), osell: car["cost"], sell: Math.round(sell) };
  }
};

module.exports.topspeed = function (car) {
  var sellperf = require(gtf.PERF).sell(car);
  var lowest = Math.floor(100 + sellperf ** 0.475 - 30);
  var highest = Math.floor(100 + sellperf ** 0.475);

  var speed = gtftools.randomInt(lowest, highest);
  return [Math.round(speed * 1.609), speed];
};

module.exports.careerdifficultycalc = function (difficulty, car, fpplimit) {
  var num = Math.round((parseInt(car["fpp"]) / fpplimit) * difficulty);
  console.log("Diff:" + Math.round((parseInt(car["fpp"]) / fpplimit) * difficulty));
  if (num > difficulty + 5) {
    num = difficulty + 5;
  }
  return num;
};

module.exports.partpreview = function (part, car, condition) {
  if (condition == "GARAGE") {
    var car5 = JSON.stringify(car);
    var car2 = JSON.parse(car5);
    car2[part["type"].toLowerCase()]["current"] = part["name"];
    return require(gtf.PERF).perf(car2, condition);
  }
};

module.exports.partinstall = function (part, userdata) {
  var installedpart = userdata["garage"][stats.currentcarnum(userdata) - 1][part["type"].toLowerCase()];
  installedpart["current"] = part["name"];
  for (var i = 0; i < installedpart["tuning"].length; i++) {
    installedpart["tuning"][i] = -999;
  }

  if (!installedpart["list"].includes(part["name"]) && part["name"] != "Stock") {
    userdata["garage"][stats.currentcarnum(userdata) - 1][part["type"].toLowerCase()]["list"].push(part["name"]);
  }

  userdata["garage"][stats.currentcarnum(userdata) - 1][part["type"].toLowerCase()] = installedpart;

  userdata["garage"][stats.currentcarnum(userdata) - 1]["fpp"] = require(gtf.PERF).perf(userdata["garage"][stats.currentcarnum(userdata) - 1], "GARAGE")["fpp"];
};

module.exports.paint = function (paint, userdata) {
  var installedpart = userdata["garage"][stats.currentcarnum(userdata) - 1]["color"];
  installedpart["current"] = paint["type"] + " " + paint["name"];
  userdata["garage"][stats.currentcarnum(userdata) - 1]["color"] = installedpart;
};
