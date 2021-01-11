var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////

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
module.exports.specialpaints = paints.filter(x => x[0].includes("Special"))

