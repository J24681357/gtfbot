var gtf = require("../../functions/f_gtf");
var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////

///100,000 Car - 30000
/// All cars - 300000
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






///////////////////////////////////////////////////////////////////////////////////////////////
