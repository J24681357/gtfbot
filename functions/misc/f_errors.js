var gtf = require("/app/functions/f_gtf");
var stats = require("/app/functions/profile/f_stats");
var emote = require("/app/index");
var gtftools = require("/app/functions/misc/f_tools");
var gtfperf = require("/app/functions/marketplace/f_perf");
var parts = require("/app/functions/marketplace/f_parts");
var exp = require("/app/profile/expprofile");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
var fs = require("fs")
////////////////////////////////////////////////////

module.exports.warning = function(name, desc, embed, msg, id) {
  embed.setColor(0xFFFF00)
  var message = msg.content.split(" ").join(" ")
  if (message.length == 0) {
    message = "(no args)";
  }
  embed.addField(name + ' "' + message + '"', desc)
  return
}

module.exports.error = function(name, desc, embed, msg, id) {
  var embed = new Discord.MessageEmbed();
  var user = msg.guild.members.cache.get(id).user.username
  var gtfhelp = ""
  if (name.includes("Invalid")) {
    gtfhelp = "\n\n**❓ Maybe __!gtfhelp__ can help you.**"
  }
  embed.setAuthor(user, msg.guild.members.cache.get(id).user.displayAvatarURL);
  embed.setColor(0xFF0000)
  embed.addField(name + ' "' + msg.content.split(" ").join(" ") + '"', desc + gtfhelp, true)
  return msg.channel.send(embed)
}

module.exports.success = function(name, desc, time, special, embed, msg, id) {
  var embed = new Discord.MessageEmbed();

  var user = msg.guild.members.cache.get(id).user.username
  embed.setAuthor(user, msg.guild.members.cache.get(id).user.displayAvatarURL());
  embed.setColor(0x216C2A)
  embed.setDescription("__**" + name + "**__" + "\n" + desc)
  if (special == true) {
  return msg.channel.send(embed).then(msg=>{
    if (time > 0) {
    msg.delete({timeout:time})
  }
  })
  } else {
    
  msg.edit(embed).then(msg=>{
    if (time > 0) {
    msg.delete({timeout:time})
  }
  })
  }
}

module.exports.checkgarageerror = function(embed, msg, id) {
    if (stats.garagecount(id) >= gtf.garagelimit) {
      require(gtffile.EMBED).error("❌ Garage Full", "You have reached your garage limit of 50 or above.\nSell one of your cars using **!garage sell** in order to add cars to your garage.", embed, msg, id)
      return true
    } else {
      return false
    }
}

module.exports.checknocars = function(id) {
  return stats.currentcarmain(id) == "No car."
}
