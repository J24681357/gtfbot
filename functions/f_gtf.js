var gtf = require("/home/runner/gtfbot/functions/f_gtf");
var gtftracks = require("/home/runner/gtfbot/data/allgtftracks");
var stats = require("/home/runner/gtfbot/functions/profile/f_stats");
var emote = require("/home/runner/gtfbot/index");
var gtftools = require("/home/runner/gtfbot/functions/misc/f_tools");
var gtfperf = require("/home/runner/gtfbot/functions/marketplace/f_perf");
var parts = require("/home/runner/gtfbot/functions/marketplace/f_parts");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////

/////////////////////VARIABLES/////////////////
module.exports.garagelimit = 50;
module.exports.replaylimit = 50;
module.exports.giftlimit = 10;

////////////////////////////
module.exports.checkregulations = function(car, regulations) {
  
  var fpplimit = regulations["fpplimit"]
  var fppexist = (fpplimit != "")

  var makes = regulations["models"].filter(x => !x.includes("M "))
  var models = regulations["models"].filter(x => x.includes("M "))
  var types = regulations["type"]
  var makeexist = makes.length > 0
  var modelexist = models.length > 0

  var typeexist = regulations["type"].length > 0

  var errors1 = [];

  if (fppexist) {
    if (parseInt(car["FPP"]) <= fpplimit) {
    } else {
      errors1.push("**FPP Limit:** " +  "**" + car["FPP"] + "**" + emote.fpp + " -> " + "**" + fpplimit + "**" + emote.fpp)
    }
  }
  
  var makesuccess = false;
  if (makeexist) {
    var index = 0;
    while (index < makes.length) {
      if (makes[index].includes("License") || makes[index].includes("Any")) {
        makesuccess = true
          break;
      }
      if (car["make"] == makes[index].split(" ⭐")[0]) {
        makesuccess = true
        break;
      }
      index++
  }
  if (!makesuccess) {
    errors1.push("**Makes:** " + car["make"] + " -> " + gtftools.removeDups(makes.map(x=> x.split(" ")[0])).join(", "))
  }
  }

  var modelsuccess = false;
  if (modelexist) {
    var index = 0;
    while (index < models.length) {
      if (car["name"].includes(" " + models[index].split(" ")[1] + " ")) {
        modelsuccess = true
        break;
      }
      index++
    }
  if (!modelsuccess) {
    errors1.push("**Model:** " + car["name"] + " -> " + models.map(x => x.replace("M ", "")).join(", "))
  }
  }

  var typesuccess = false
  if (typeexist) {
    var index = 0;
    while (index < types.length) {
      var emoji = types[index].split(" ")[0]
      if (car["rating"].includes(emoji)) {
        typesuccess = true
        break;
      }
      index++
    }
  if (!typesuccess) {
    errors1.push("**Type:** " + car["rating"] + " -> " + types.join(", "))
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

module.exports.dealercarslist = function(carlist, make, cost) {
      var simplecarlist = carlist.map(function(car) {
      var numberid = carlist.indexOf(car) + 1
      var stars = 0
      var multiplier = 1
      var tempcost = cost
      var mcost = cost
      var special = false
      
      car = car.split(" ")
      var link = car.pop()
      
      var rating = car[car.length-1]
      car = car.join(" ")   
        
      if (rating.includes("⭐")) {
      } else if (rating.includes("🔧")) {
        multiplier = 1.75
      } else if (rating.includes("<:gt4:")) {
        special = true
        tempcost = require(gtffile.MARKETPLACE).sellcalc(parts.tires()[6][1]) + require(gtffile.MARKETPLACE).sellcalc(parts.transmission()[4][1]) + require(gtffile.MARKETPLACE).sellcalc(parts.engine()[2][1]) + require(gtffile.MARKETPLACE).sellcalc(parts.suspension()[2][1]) + (-Math.ceil((-5000 * 0.3 + 1) / 100) * 100) + 16200
        //RH Tires + Eng Stage 2 A + FC Transmission + weight reduction 1 + FC susp
        multiplier = 5
      } else if (rating.includes("<:gt3:")) {
        special = true
        
        tempcost = require(gtffile.MARKETPLACE).sellcalc(parts.tires()[6][1]) + require(gtffile.MARKETPLACE).sellcalc(parts.transmission()[4][1]) + require(gtffile.MARKETPLACE).sellcalc(parts.engine()[4][1]) + require(gtffile.MARKETPLACE).sellcalc(parts.suspension()[2][1]) + require(gtffile.MARKETPLACE).sellcalc(parts.weightreduction()[2][1]) + 18700
        //RH Tires + Eng Stage 3 A + FC Transmission + weight reduction 3 + FC susp
        multiplier = 6.25
      } else if (rating.includes("<:gt1:")) {
        special = true
        
        tempcost = require(gtffile.MARKETPLACE).sellcalc(parts.tires()[6][1]) + require(gtffile.MARKETPLACE).sellcalc(parts.transmission()[4][1]) + require(gtffile.MARKETPLACE).sellcalc(parts.engine()[5][1]) + require(gtffile.MARKETPLACE).sellcalc(parts.suspension()[2][1]) + require(gtffile.MARKETPLACE).sellcalc(parts.weightreduction()[4][1]) + 20500
        
        //RH Tires + Eng Stage 3 B + FC Transmission + weight reduction 5 + FC susp
        multiplier = 10
      } else {
        mcost = tempcost * multiplier
        car = [car, [cost, tempcost, mcost], link, make, numberid, "⭐1"]
        return car
      }
      car = car.split(" " + rating)[0]
        if (special) {
        mcost = tempcost * multiplier
        car = [car, [cost, tempcost, mcost], link, make, numberid, rating]
          return car
        } else {
        stars = parseFloat(rating.split(/(\d?[\.\d+]+)/)[1])
        if (stars > 1) {
          stars = Math.pow(2, stars - 1)
          tempcost = (Math.round((cost * stars) / 10000) * 10000)
          mcost = tempcost * multiplier
          } else {
            tempcost = cost * stars
            mcost = tempcost * multiplier
        }
          car = [car, [cost, tempcost, mcost], link, make, numberid, rating]
        }
      return car;
    })
    return simplecarlist
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
