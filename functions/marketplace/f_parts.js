var gtf = require("/home/runner/gtfbot/functions/f_gtf");
var stats = require("/home/runner/gtfbot/functions/profile/f_stats");
var emote = require("/home/runner/gtfbot/index");
var gtftools = require("/home/runner/gtfbot/functions/misc/f_tools");
var gtfperf = require("/home/runner/gtfbot/functions/marketplace/f_perf");
var exp = require("/home/runner/gtfbot/profile/expprofile");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////

///100,000 Car - 30000
/// All cars - 300000
module.exports.engine = function() {
  return [["Engine Stage 1 A", 2500, "FPP", [300000]], ["Engine Stage 1 B", 5000, "FPP", [300000]], ["Engine Stage 2 A", 7500, "FPP", ["<:gt4:", 300000]], ["Engine Stage 2 B", 10000, "FPP", ["<:gt4:", 300000]], ["Engine Stage 3 A", 17500, "FPP", ["<:gt4:", "<:gt3:", 300000]], ["Engine Stage 3 B", 25000, "FPP", ["<:gt4:", "<:gt3:", "<:gt1:", 30000]], ["Engine Stage 4", 50000, "FPP", ["<:gt4:", "<:gt3:",30000]]]
}

module.exports.transmission = function() {
  return [["5-Speed Transmission", 2000, "", [300000]], ["6-Speed Transmission", 5000, "", [300000]], ["7-Speed Transmission", 6000, "", [300000]], ["8-Speed Transmission", 8000, "", [300000]], 
          ["Fully Customizable Transmission", 15000, "", ["<:gt4:", "<:gt3:","<:gt1:",300000]]];
}

module.exports.suspension = function() {
  return [["Sports Suspension Kit", 2000, "FPP", ""], ["Rally Suspension Kit", 5000, "FPP",[30000]], ["Fully Customizable Suspension Kit", 10000, "FPP", ["<:gt4:", "<:gt3:","<:gt1:", 300000]]];
}

module.exports.tires = function() {
  return [["Comfort Hard Tires", 1000, "FPP", ["<:gt4:", "<:gt3:","<:gt1:", 300000]],
          ["Comfort Medium Tires", 1500, "FPP", ["<:gt4:", "<:gt3:", "<:gt1:",300000]],
          ["Comfort Soft Tires", 2000, "FPP", ["<:gt4:", "<:gt3:", "<:gt1:",300000]], 
          ["Sports Hard Tires", 5000, "FPP", ["<:gt4:", "<:gt3:", "<:gt1:",300000]], 
          ["Sports Medium Tires", 6000, "FPP", ["<:gt4:", "<:gt3:", "<:gt1:",300000]], 
          ["Sports Soft Tires", 7000, "FPP", ["<:gt4:", "<:gt3:", "<:gt1:",300000]], 
          ["Racing Hard Tires", 10000, "FPP", ["<:gt4:", "<:gt3:", "<:gt1:",300000]], 
          ["Racing Medium Tires", 15000, "FPP", ["<:gt4:", "<:gt3:", "<:gt1:",300000]], 
          ["Racing Soft Tires", 20000, "FPP", ["<:gt4:", "<:gt3:", "<:gt1:",300000]], 
          ["Racing Super Soft Tires", 25000, "FPP", ["<:gt4:", "<:gt3:", "<:gt1:",300000]], 
          ["Racing Intermediate Tires", 10000, "FPP", ["<:gt4:", "<:gt3:", "<:gt1:",300000]], 
          ["Racing Heavy Wet Tires", 10000, "FPP", ["<:gt4:", "<:gt3:", "<:gt1:",300000]], 
          ["Dirt Tires", 7500, "FPP",""], 
          ["Snow Tires", 7500, "FPP",""]];
}

module.exports.weightreduction = function() {
  return [
    ["Weight Reduction Stage 1", 5000, "FPP", ["<:gt4:", 300000]],
          ["Weight Reduction Stage 2", 10000, "FPP", ["<:gt4:", 300000]], 
          ["Weight Reduction Stage 3", 20000, "FPP", ["<:gt4:", "<:gt3:", 30000]], 
          ["Weight Reduction Stage 4", 30000, "FPP", ["<:gt4:", "<:gt3:", 30000]], 
          ["Weight Reduction Stage 5", 40000, "FPP", ["<:gt1:", 0]]
          ]
}

module.exports.turbo = function() {
  return  [["Low RPM Range Turbo Kit", 4000, "FPP", ["<:gt4:", 30000]], ["Mid RPM Range Turbo Kit", 20000, "FPP", ["<:gt4:",  30000]], ["High RPM Range Turbo Kit", 40000, "FPP", ["<:gt4:", "<:gt3:", "<:gt1:", 300000]], ["Supercharger", 20000, "FPP", ["<:gt4:",  300000]]];
}

module.exports.nitrous = function() {
  return [["Normal (NOS)", 10000, "FPP", [300000]], ["Red (NOS)", 10000, "FPP", [300000]], ["Orange (NOS)", 10000, "FPP", [300000]], ["Yellow (NOS)", 10000, "FPP", [300000]],["Lime (NOS)", 10000, "FPP", [300000]], ["Green (NOS)", 10000, "FPP", [300000]], ["Aqua (NOS)", 10000, "FPP", [300000]], ["Blue (NOS)", 10000, "FPP", [300000]], ["Purple (NOS)", 10000, "FPP", [300000]], ["Brown (NOS)", 10000, "FPP", [300000]], ["White (NOS)", 10000, "FPP", [300000]]]
}

var paints = [ [ 'Gloss Light Red', 1000, 'PAINT' ],
  [ 'Gloss Red', 1000, 'PAINT' ],
  [ 'Gloss Dark Red', 1000, 'PAINT' ],
  [ 'Gloss Light Orange', 1000, 'PAINT' ],
  [ 'Gloss Orange', 1000, 'PAINT' ],
  [ 'Gloss Dark Orange', 1000, 'PAINT' ],
  [ 'Gloss Light Yellow', 1000, 'PAINT' ],
  [ 'Gloss Yellow', 1000, 'PAINT' ],
  [ 'Gloss Dark Yellow', 1000, 'PAINT' ],
  [ 'Gloss Light Green', 1000, 'PAINT' ],
  [ 'Gloss Green', 1000, 'PAINT' ],
  [ 'Gloss Dark Green', 1000, 'PAINT' ],
  [ 'Gloss Light Blue', 1000, 'PAINT' ],
  [ 'Gloss Blue', 1000, 'PAINT' ],
  [ 'Gloss Dark Blue', 1000, 'PAINT' ],
  [ 'Gloss Light Purple', 1000, 'PAINT' ],
  [ 'Gloss Purple', 1000, 'PAINT' ],
  [ 'Gloss Dark Purple', 1000, 'PAINT' ],
  [ 'Gloss Pink', 1000, 'PAINT' ],
  [ 'Gloss Light Brown', 1000, 'PAINT' ],
  [ 'Gloss Brown', 1000, 'PAINT' ],
  [ 'Gloss Dark Brown', 1000, 'PAINT' ],
  [ 'Gloss White', 1000, 'PAINT' ],
  [ 'Gloss Light Grey', 1000, 'PAINT' ],
  [ 'Gloss Grey', 1000, 'PAINT' ],
  [ 'Gloss Dark Grey', 1000, 'PAINT' ],
  [ 'Gloss Black', 1000, 'PAINT' ],
  [ 'Metallic Light Red', 3000, 'PAINT' ],
  [ 'Metallic Red', 3000, 'PAINT' ],
  [ 'Metallic Dark Red', 3000, 'PAINT' ],
  [ 'Metallic Light Orange', 3000, 'PAINT' ],
  [ 'Metallic Orange', 3000, 'PAINT' ],
  [ 'Metallic Dark Orange', 3000, 'PAINT' ],
  [ 'Metallic Light Yellow', 3000, 'PAINT' ],
  [ 'Metallic Yellow', 3000, 'PAINT' ],
  [ 'Metallic Dark Yellow', 3000, 'PAINT' ],
  [ 'Metallic Light Green', 3000, 'PAINT' ],
  [ 'Metallic Green', 3000, 'PAINT' ],
  [ 'Metallic Dark Green', 3000, 'PAINT' ],
  [ 'Metallic Light Blue', 3000, 'PAINT' ],
  [ 'Metallic Blue', 3000, 'PAINT' ],
  [ 'Metallic Dark Blue', 3000, 'PAINT' ],
  [ 'Metallic Light Purple', 3000, 'PAINT' ],
  [ 'Metallic Purple', 3000, 'PAINT' ],
  [ 'Metallic Dark Purple', 3000, 'PAINT' ],
  [ 'Metallic Pink', 3000, 'PAINT' ],
  [ 'Metallic Light Brown', 3000, 'PAINT' ],
  [ 'Metallic Brown', 3000, 'PAINT' ],
  [ 'Metallic Dark Brown', 3000, 'PAINT' ],
  [ 'Metallic White', 3000, 'PAINT' ],
  [ 'Metallic Light Grey', 3000, 'PAINT' ],
  [ 'Metallic Grey', 3000, 'PAINT' ],
  [ 'Metallic Dark Grey', 3000, 'PAINT' ],
  [ 'Metallic Black', 3000, 'PAINT' ],
  [ 'Pearl Light Red', 6000, 'PAINT' ],
  [ 'Pearl Red', 6000, 'PAINT' ],
  [ 'Pearl Dark Red', 6000, 'PAINT' ],
  [ 'Pearl Light Orange', 6000, 'PAINT' ],
  [ 'Pearl Orange', 6000, 'PAINT' ],
  [ 'Pearl Dark Orange', 6000, 'PAINT' ],
  [ 'Pearl Light Yellow', 6000, 'PAINT' ],
  [ 'Pearl Yellow', 6000, 'PAINT' ],
  [ 'Pearl Dark Yellow', 6000, 'PAINT' ],
  [ 'Pearl Light Green', 6000, 'PAINT' ],
  [ 'Pearl Green', 6000, 'PAINT' ],
  [ 'Pearl Dark Green', 6000, 'PAINT' ],
  [ 'Pearl Light Blue', 6000, 'PAINT' ],
  [ 'Pearl Blue', 6000, 'PAINT' ],
  [ 'Pearl Dark Blue', 6000, 'PAINT' ],
  [ 'Pearl Light Purple', 6000, 'PAINT' ],
  [ 'Pearl Purple', 6000, 'PAINT' ],
  [ 'Pearl Dark Purple', 6000, 'PAINT' ],
  [ 'Pearl Pink', 6000, 'PAINT' ],
  [ 'Pearl Light Brown', 6000, 'PAINT' ],
  [ 'Pearl Brown', 6000, 'PAINT' ],
  [ 'Pearl Dark Brown', 6000, 'PAINT' ],
  [ 'Pearl White', 6000, 'PAINT' ],
  [ 'Pearl Light Grey', 6000, 'PAINT' ],
  [ 'Pearl Grey', 6000, 'PAINT' ],
  [ 'Pearl Dark Grey', 6000, 'PAINT' ],
  [ 'Pearl Black', 6000, 'PAINT' ],
  [ 'Matte Light Red', 10000, 'PAINT' ],
  [ 'Matte Red', 10000, 'PAINT' ],
  [ 'Matte Dark Red', 10000, 'PAINT' ],
  [ 'Matte Light Orange', 10000, 'PAINT' ],
  [ 'Matte Orange', 10000, 'PAINT' ],
  [ 'Matte Dark Orange', 10000, 'PAINT' ],
  [ 'Matte Light Yellow', 10000, 'PAINT' ],
  [ 'Matte Yellow', 10000, 'PAINT' ],
  [ 'Matte Dark Yellow', 10000, 'PAINT' ],
  [ 'Matte Light Green', 10000, 'PAINT' ],
  [ 'Matte Green', 10000, 'PAINT' ],
  [ 'Matte Dark Green', 10000, 'PAINT' ],
  [ 'Matte Light Blue', 10000, 'PAINT' ],
  [ 'Matte Blue', 10000, 'PAINT' ],
  [ 'Matte Dark Blue', 10000, 'PAINT' ],
  [ 'Matte Light Purple', 10000, 'PAINT' ],
  [ 'Matte Purple', 10000, 'PAINT' ],
  [ 'Matte Dark Purple', 10000, 'PAINT' ],
  [ 'Matte Pink', 10000 , 'PAINT'],
  [ 'Matte Light Brown', 10000 , 'PAINT'],
  [ 'Matte Brown', 10000 , 'PAINT'],
  [ 'Matte Dark Brown', 10000 , 'PAINT'],
  [ 'Matte White', 10000 , 'PAINT'],
  [ 'Matte Light Grey', 10000, 'PAINT' ],
  [ 'Matte Grey', 10000, 'PAINT' ],
  [ 'Matte Dark Grey', 10000, 'PAINT' ],
  [ 'Matte Black', 10000, 'PAINT' ],
  ['Special Gran Turismo 6 15th Anniversary Blue', 50000, 'PAINT'],
  ['Special 5727cc Paint', 100000, 'PAINT']]
module.exports.glosspaints = paints.filter(x => x[0].includes("Gloss"))
module.exports.metallicpaints = paints.filter(x => x[0].includes("Metallic"))
module.exports.pearlpaints = paints.filter(x => x[0].includes("Pearl"))
module.exports.mattepaints = paints.filter(x => x[0].includes("Matte"))
module.exports.specialpaints = paints.filter(x => x[0].includes("Special"))

var oilchange = ["Oil Change", 1000, "FPP"];
var fuel = ["Fuel", 1000]

// Functions /////////////////////////////////////////////////////////////////////////////////
//id, type, name, cost, fpp

module.exports.install = function(item, msgauthorid) {
  var id = item[0]
  if (id == 0) {
    id = "S"
  }
  var type = item[1]
  var name = item[2]
  var cost = item[3]
  var includefpp = item[4]
  if (cost == 0) {
  var sell = 0
  } else {
  var sell = -Math.ceil((-cost * 0.3 + 1) / 100) * 100
  }
  var car = stats.currentcar(msgauthorid)
  var number;

  car[type][0] = "S";
  car[type][1] = null
    car["sell"] = car["originalsell"] - car[type][2]
    stats.addcredits(car[type][2], msgauthorid)
    car[type][2] = 0

  
    car[type][0] = id
    car[type][1] = null
    car[type][2] = sell

    car["sell"] = car["originalsell"] + sell
    car["FPP"] = gtfperf.fpp(car)
}

module.exports.getpart = function(type, number) {
  var select = ""
  if (type == "Col" || type == "color") {
    select = paints
  }
  if (type == "E" || type == "engine") {
    select = require(gtffile.PARTS).engine()
  }
  if (type == "Tr" || type == "transmission"){
    select = require(gtffile.PARTS).transmission()
  }
  if (type == "Su" || type == "suspension"){
    select = require(gtffile.PARTS).suspension()
  }
  if (type == "Ti" || type == "tires") {
    select = require(gtffile.PARTS).tires()
  }
  if  (type == "We" || type == "weightreduction") {
    select = require(gtffile.PARTS).weightreduction()
  }
  if (type == "Tu" || type == "turbo") {
    select = require(gtffile.PARTS).turbo()
  }
  if (type == "Nos" || type == "nitrous"){
    select = require(gtffile.PARTS).nitrous()
  }

  if (number == 0 || number == "S") {
    return ["Stock", 0, "FPP"]
  }

  return select[number-1]
}

module.exports.paintid = function (painttype, number) {
  if (painttype.includes("Gloss")) {
    return number
  }
  number = parseInt(number) + require(gtffile.PARTS).glosspaints.length
  if (painttype.includes("Metallic")) {
    return number
  }
  number = parseInt(number) + require(gtffile.PARTS).metallicpaints.length
  if (painttype.includes("Pearl")) {
    return number
  }
  number = parseInt(number) + require(gtffile.PARTS).pearlpaints.length
  if (painttype.includes("Matte")) {
    return number
  }
    number = parseInt(number) + require(gtffile.PARTS).mattepaints.length
  if (painttype.includes("Special")) {
    return number
  }
}

module.exports.checkpartsavail = function(part, sell, currentcarpart, rating) {

  if (part[0] == currentcarpart) {
        part.pop()
        part.push("✅")
        return part
  }
  var carallowed = false
  if (part[3] != "") {
    var type = part.pop()
    part.push("")
    } else {
      var type = [""]
  }
  var length = type.length
   var racecar = false
  
  if (rating.includes("<:gt4:")) {
    var ratinge = "<:gt4:"
    racecar = true
  }
  else if (rating.includes("<:gt3:")) {
    var ratinge = "<:gt3:"
    racecar = true
  }
  else if (rating.includes("<:gt1:")) {
    var ratinge = "<:gt1:"
    racecar = true
  }
  
      for (var i = 0; i < length; i++) {
        if (type[i] == "") {
          break;
        }
        if (isNaN(type[i])) {
          
        if (type[i].includes(ratinge)) {
            carallowed = true
            break;
        }
        }
        if (!racecar) {
        if (!isNaN(type[i])) {
          if (type[i] >= parseInt(sell)) {
            carallowed = true
            break;
          } else {
            carallowed = false
            break;
          }
        }
        }
      }
      if (carallowed) {
      } else {
            part[3] = "❌"
      }
  return part
}





///////////////////////////////////////////////////////////////////////////////////////////////
