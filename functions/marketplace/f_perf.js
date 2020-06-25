var gtf = require("/home/runner/gtfbot/functions/f_gtf");
var stats = require("/home/runner/gtfbot/functions/profile/f_stats");
var emote = require("/home/runner/gtfbot/index");
var gtftools = require("/home/runner/gtfbot/functions/misc/f_tools");
var gtfperf = require("/home/runner/gtfbot/functions/marketplace/f_perf");
var parts = require("/home/runner/gtfbot/functions/marketplace/f_parts");
var exp = require("/home/runner/gtfbot/profile/expprofile");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////

module.exports.calc = function(number) {
  return Math.floor((number / 90000) * 1300 + 180);
};

module.exports.dealershipcalc = function(dealercar, condition) {
  var name = dealercar[0]
  var costofperf = dealercar[1][1]

  var sell = (-Math.ceil((-costofperf * 0.3 + 1) / 100) * 100) + (condition * 30)
  
  name = name.split(" `")
  var rating = dealercar[5]

  if (rating.includes("🔧")) {
    var part = (-Math.ceil((-parts.tires()[5][1] * 0.3 + 1) / 100)*100) - 1400
    sell = sell + part
  } else if (rating.includes("<:gt4:")) {
    var engine = require(gtffile.MARKETPLACE).sellcalc(parts.engine()[2][1])
    var transmission = require(gtffile.MARKETPLACE).sellcalc(parts.transmission()[4][1])
    var suspension = require(gtffile.MARKETPLACE).sellcalc(parts.suspension()[2][1])
    var tires = require(gtffile.MARKETPLACE).sellcalc(parts.tires()[6][1])
    var weight =require(gtffile.MARKETPLACE).sellcalc(parts.weightreduction()[0][1])
    sell = sell + engine + suspension + (tires - 1400) + weight
  } else if (rating.includes("<:gt3:")) {
    var engine = require(gtffile.MARKETPLACE).sellcalc(parts.engine()[4][1])
    var transmission = require(gtffile.MARKETPLACE).sellcalc(parts.transmission()[4][1])
    var suspension = require(gtffile.MARKETPLACE).sellcalc(parts.suspension()[2][1])
    var tires = require(gtffile.MARKETPLACE).sellcalc(parts.tires()[6][1])
    var weight = require(gtffile.MARKETPLACE).sellcalc(parts.weightreduction()[2][1])
    sell = sell + engine + suspension + (tires - 1400) + weight
  }  else if (rating.includes("<:gt1:")) {
    var engine = require(gtffile.MARKETPLACE).sellcalc(parts.engine()[5][1])
    var transmission = require(gtffile.MARKETPLACE).sellcalc(parts.transmission()[4][1])
    var suspension = require(gtffile.MARKETPLACE).sellcalc(parts.suspension()[2][1])   
    var tires = require(gtffile.MARKETPLACE).sellcalc(parts.tires()[6][1])
    var weight = require(gtffile.MARKETPLACE).sellcalc(parts.weightreduction()[4][1])
    sell = sell + engine + suspension + (tires - 1400) + weight
  } else {
    var part = (-Math.ceil((-parts.tires()[3][1] * 0.3 + 1) / 100)*100) - 1400
    sell = sell + part
  }
  var fpp = gtfperf.calc(sell)
  return [sell,fpp]
}

module.exports.fpp = function(car) {
  ///[3][0] Original Price , [7] Engine [9] Suspension
  var number = gtfperf.sell(car)
  return Math.floor((number / 90000) * 1300 + 180)
  //89900
};

module.exports.sell = function(car) {
  var number = car["originalsell"] + car["engine"]["sell"] + car["suspension"]["sell"] + (car["tires"]["sell"] - 1400) + car["weightreduction"]["sell"] + car["turbo"]["sell"] + (car["nitrous"]["sell"] / 3) + (car["condition"] * 30)
  return number
};

module.exports.topspeed = function(car) {
  var sellperf = gtfperf.sell(car)
  var lowest = Math.floor(100 + (sellperf**0.475) - 30)
  var highest = Math.floor(100 + (sellperf**0.475))

  var speed = gtftools.randomInt(lowest, highest)
  return [Math.round(speed*1.609), speed]
}

module.exports.careerdifficultycalc = function(difficulty, car, fpplimit) {
  console.log(Math.round(parseInt(car["FPP"])/fpplimit * (difficulty)))
  return Math.round(parseInt(car["FPP"])/fpplimit * (difficulty))
}

module.exports.partpreviewfpp = function(item, id) {
  var car = stats.currentcar(id)
  var car5 = JSON.stringify(car)
  var car2 = JSON.parse(car5)
  car2[item[1]][2] = require(gtffile.MARKETPLACE).sellcalc(item[3])
 

  car2["sell"] = car2["sell"] + require(gtffile.MARKETPLACE).sellcalc(item[3])
  car2["FPP"] = gtfperf.fpp(car2)
  
  return car2["FPP"]
}
