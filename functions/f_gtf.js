var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
var gtf = require("../files/directories");
////////////////////////////////////////////////////

/////////////////////VARIABLES/////////////////
module.exports.garagelimit = 50;
module.exports.replaylimit = 10;
module.exports.courselimit = 5;
module.exports.giftlimit = 5;

////////////////////////////
module.exports.checkregulations = function (gtfcar, regulations) {
  var car = require(gtf.CARS).find({ make: [gtfcar["make"]], fullname: [gtfcar["name"]], year: [gtfcar["year"]] })[0];

  var fpplimit = regulations["fpplimit"];
  var fppexist = fpplimit != "";

  var makes = regulations["makes"];
  var models = regulations["models"];
  var types = regulations["types"];
  var drivetrains = regulations["drivetrains"];

  var makeexist = makes.length > 0 && makes[0] != "Any";
  var modelexist = models.length > 0;
  var typeexist = types.length > 0;
  var dtexist = drivetrains.length > 0;

  var errors1 = [];

  var fppsuccess = false;
  if (fppexist) {
    var fpp = gtfcar["fpp"];
    if (fpp <= fpplimit) {
      fppsuccess = true;
    }
  }

  if (!fppsuccess) {
    errors1.push("**FPP Limit:** " + "**" + fpp + "**" + emote.fpp + " -> " + "**" + fpplimit + "**" + emote.fpp);
  }

  var makesuccess = false;
  if (makeexist) {
    var index = 0;
    while (index < makes.length) {
      if (makes[index].includes(car["make"])) {
        makesuccess = true;
        break;
      }
      index++;
    }
    if (!makesuccess) {
      errors1.push("**Makes:** " + car["make"] + " -> " + gtftools.removeDups(makes).join(", "));
    }
  }

  var modelsuccess = false;
  if (modelexist) {
    var index = 0;
    while (index < models.length) {
      if (car["name"].includes(models[index])) {
        modelsuccess = true;
        break;
      }
      index++;
    }
    if (!modelsuccess) {
      errors1.push("**Model:** " + car["name"] + " -> " + models.join(", "));
    }
  }

  var typesuccess = false;
  if (typeexist) {
    var index = 0;
    while (index < types.length) {
      if (car["type"] == types[index]) {
        typesuccess = true;
        break;
      }
      index++;
    }
    if (!typesuccess) {
      errors1.push("**Type:** " + car["type"] + " -> " + types.join(", "));
    }
  }

  var dtsuccess = false;
  if (dtexist) {
    var index = 0;
    while (index < drivetrains.length) {
      if (car["drivetrain"].includes(drivetrains[index])) {
        dtsuccess = true;
        break;
      }
      index++;
    }
    if (!dtsuccess) {
      errors1.push("**Drivetrain:** " + car["drivetrain"] + " -> " + drivetrains.join(", "));
    }
  }

  if (errors1.length == 0) {
    return [true, null];
  } else {
    return [false, errors1];
  }
};
module.exports.loadingscreen = function (title, carname) {
  if (carname === undefined) {
    carname = "";
  } else if (carname != "") {
    carname = "\n\n🚘 " + "**" + carname + "**";
  }

  return title + "\n" + emote.loading + " **Loading** " + emote.loading + carname;
};
