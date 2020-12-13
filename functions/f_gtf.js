var gtf = require("../functions/f_gtf");
var gtftracks = require("../data/allgtftracks");
var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");
var gtfperf = require("../functions/marketplace/f_perf");
var parts = require("../functions/marketplace/f_parts");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////

/////////////////////VARIABLES/////////////////
module.exports.garagelimit = 50;
module.exports.replaylimit = 50;
module.exports.giftlimit = 10;

////////////////////////////
module.exports.checkregulations = function(gtfcar, regulations) {
  
  var car = require(gtffile.CARS).find({"make":[gtfcar["make"]], "fullname":[gtfcar["name"]],"year":[gtfcar["year"]]})[0]
  
  var fpplimit = regulations["fpplimit"]
  var fppexist = (fpplimit != "")

  var makes = regulations["makes"]
  var models = regulations["models"]
  var types = regulations["types"]
  var drivetrains = regulations["drivetrains"]

  var makeexist = makes.length > 0 && makes[0] != "Any"
  var modelexist = models.length > 0
  var typeexist = types.length > 0
  var dtexist = drivetrains.length > 0

  var errors1 = [];

  var fppsuccess = false;
  if (fppexist) {
    var fpp = gtfcar["fpp"]
    if (fpp <= fpplimit) {
      fppsuccess = true
    }
  }

  if (!fppsuccess) {
    errors1.push("**FPP Limit:** " +  "**" + fpp + "**" + emote.fpp + " -> " + "**" + fpplimit + "**" + emote.fpp)
  }
  
  var makesuccess = false;
  if (makeexist) {
    var index = 0;
    while (index < makes.length) {
      if (makes[index].includes(car["make"])) {
        makesuccess = true
          break;
      }
      index++
  }
  if (!makesuccess) {
    errors1.push("**Makes:** " + car["make"] + " -> " + gtftools.removeDups(makes).join(", "))
  }

  }

  var modelsuccess = false;
  if (modelexist) {
    var index = 0;
    while (index < models.length) {
      if (car["name"].includes(models[index])) {
        modelsuccess = true
        break;
      }
      index++
    }
  if (!modelsuccess) {
    errors1.push("**Model:** " + car["name"] + " -> " + models.join(", "))
  }
  }

  var typesuccess = false
  if (typeexist) {
    var index = 0;
    while (index < types.length) {
      if (car["type"] == types[index]) {
        typesuccess = true
        break;
      }
      index++
    }
  if (!typesuccess) {
    errors1.push("**Type:** " + car["type"] + " -> " + types.join(", "))
  }
  }

  var dtsuccess = false
  if (dtexist) {
    var index = 0;
    while (index < drivetrains.length) {
      if (car["drivetrain"].includes(drivetrains[index])) {
        dtsuccess = true
        break;
      }
      index++
    }
  if (!dtsuccess) {
    errors1.push("**Drivetrain:** " + car["drivetrain"] + " -> " + drivetrains.join(", "))
  }
  }

  

  if (errors1.length == 0) {
    return [true, null]
  } else {
    return [false, errors1]
  }

}
module.exports.loadingscreen = function(title, carname) {
  if (carname === undefined) {
    carname = ""
  } else if (carname != "") {
    carname = "\n\n🚘 " + "**" + carname + "**"
  }
  
  return title + "\n" + emote.loading + " **Loading** " + emote.loading + carname
}



module.exports.createcat = function(sell, rating) {
  var emojis = ["⭐", "🔧"]
  var final = []
  
  if (rating.includes("<:gt4:")) {
    return ["Any <:gt4:698962765095632967>1"]
  }
  if (rating.includes("<:gt3:")) {
    return ["Any <:gt3:698962765443891280>1"]
  }
  if (rating.includes("<:gt1:")) {
    return ["Any <:gt1:700234313345663026>1"]
  }
  
  var licenses = [["License B" , "0.1", 1000], ["License B" , "0.4", 4000], ["License B", "1", 10000],["License B", "2", 20000],["License B" , "3", 40000],["License B", "3.5", 60000], ["License B", "4", 80000],   ["License B", "5", 160000], 
                  ["License A" , "0.3", 4500], ["License A", "1", 15000],["License A", "2", 30000],["License A", "2.5", 40000],["License A","3", 60000], ["License A", "4", 120000],   ["License A", "5", 240000], 
                 ["License IC" , "0.5", 10000], ["License IC", "1", 20000],["License IC", "1.5", 30000],["License IC", "2", 40000],["License IC","3", 80000], ["License IC", "3.5", 110000],  ["License IC", "4", 160000], ["License IC", "4.3", 200000],
                  ["License IB", "0.2", 6000], ["License IB" , "0.5", 15000], ["License IB", "1", 30000],["License IB", "1.5", 40000],["License IB", "2", 60000],["License IB","2.5", 80000], ["License IB", "3", 120000],  ["License IB", "3.5", 170000], ["License IB", "3.8", 210000],["License IA", "0.5", 20000], ["License IA" , "1", 40000], ["License IA", "2", 80000],["License IA", "2.3", 100000],["License IA", "3", 120000],["License IA","3.8", 150000], ["License IA", "4.5", 180000],  ["License IA", "5.5", 220000]
                 ]
  
  for (var i = 0; i < licenses.length; i++) {
    var lsell = require(gtffile.MARKETPLACE).sellcalc(licenses[i][2])
    var range = [sell - 20000, sell]
    if (range[0] < lsell & lsell >= range[1]) {
      for (var v = 0; v < emojis.length; v++) {
        final.push(licenses[i][0] + " " + emojis[v] + licenses[i][1])
      }
    }
  }
  return final
}
 /*
 var cost = -4000
var sellingprice = -Math.ceil((cost * 0.3 + 1) / 100) * 100
var lowest = Math.floor(100 + (sellingprice**0.475) - 30)
var highest = Math.floor(100 + (sellingprice**0.475))

GT4 cars Gr.4) top speed --- 40000


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
1.5 30000 145-175  (151-170)
2 40000 156-186 (171-190)
3 80000 190-220 (191-215)
3.5  110000 209-239 (216-240)
4 160000 237-267 (252-270)
4.3 200000 255-285 (271)

`IB License`
0.2 6000 104-134 
0.5 15000 123-153 (120-140)
1 30000 131-161 (141-160)
1.5 40000 156-186 (161-186)
2 60000 174-204 (187-200)
2.5 80000 190-220 (200-215)
3 120000 215-245 (215-242)
3.5 170000 242-272 (242-260)
3.8 210000 260-290

`IA License`

0.5 20000 131-161 (130-160)
1 40000 156-186 (160-190)
2 80000 190-220 (190-210)
2.3 100000 203-233 (210-230)
3 120000 215-245 (230-245)
3.8  150000 232-262 (245-260)
4.5 180000 246-276 (260-280)
5.5 220000 264-294 (280-
*/