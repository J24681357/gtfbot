var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
var gtf = process.env
////////////////////////////////////////////////////

/////////////////////VARIABLES/////////////////
module.exports.garagelimit = 30;
module.exports.replaylimit = 20;
module.exports.giftlimit = 5;

////////////////////////////
module.exports.checkregulations = function(gtfcar, regulations) {
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
module.exports.loadingscreen = function(title, carname) {
  if (carname === undefined) {
    carname = "";
  } else if (carname != "") {
    carname = "\n\n🚘 " + "**" + carname + "**";
  }

  return title + "\n" + emote.loading + " **Loading** " + emote.loading + carname;
};

/*

```NORMAL```
0.4 4000: 97-127 (97-100-110)
1 10000 2900: 114-144 (110-135)
2 20000 5900: 131-161 (136-160)
3 40000 : 156-186 (161-185)
3.5 60000 174-204 (186-200)
4 80000 : 190-220 (201-220)
5 160000 : 237-267 (252)

`A License`

0.3 4500: 100-130 (100-123)
1 15000 123-153 (124-150)
2 30000 145-175 (151-170)
2.5 40000 156-186 (171-185)
3 60000 174-204 (186-210)
4 120000 215-245 (210-240)
5 240000

`IC License`

0.5 10000 114-144 (110-135)
1 20000 131-161 (136-150)
1.5 30000 145-175  (151-170) (4-10)
2 40000 156-186 (171-190) 15
3 80000 190-220 (191-215) or 30
3.5  110000 209-239 (216-240)
4 160000 237-267 (252-270)
4.3 200000 255-285 (271)

`IB License`
0.2 6000 104-134 
0.5 15000 123-153 (120-140)
1 30000 131-161 (141-160)
1.5 40000 156-186 (161-186)
2 60000 174-204 (187-200)
2.5 80000 190-220 (200-215) 30
3 120000 215-245 (215-242)
3.5 170000 242-272 (242-260)
3.8 210000 260-290

`IA License`

0.5 20000 131-161 (130-160)
1 40000 156-186 (160-190)
2 80000 190-220 (190-210) 25-30
2.3 100000 203-233 (210-230)
3 120000 215-245 (230-245)
3.8  150000 232-262 (245-260)
4.5 180000 246-276 (260-280)
5.5 220000 264-294 (280-
*/