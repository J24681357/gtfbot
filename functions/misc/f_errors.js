var gtf = require("../../functions/f_gtf");
var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");
var gtfperf = require("../../functions/marketplace/f_perf");
var parts = require("../../functions/marketplace/f_parts");
var exp = require("../../profile/expprofile");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
var fs = require("fs")
////////////////////////////////////////////////////

module.exports.warning = function(name, desc, embed, msg, userdata) {
  embed.setColor(0xFFFF00)
  var message = msg.content.split(" ").join(" ")
  if (message.length == 0) {
    message = "(no args)";
  }
  embed.addField(name + ' "' + message + '"', desc)
  return
}

module.exports.error = function(name, desc, embed, msg, userdata) {
  var embed = new Discord.MessageEmbed();
  var user = msg.guild.members.cache.get(userdata["id"]).user.username
  var gtfhelp = ""
  if (name.includes("Invaluserdata")) {
    gtfhelp = "\n\n**❓ Maybe __!gtfhelp__ can help you.**"
  }
  embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
  embed.setColor(0xFF0000)
  embed.addField(name + ' "' + msg.content.split(" ").join(" ") + '"', desc + gtfhelp, true)
  return msg.channel.send(embed)
}

module.exports.success = function(name, desc, time, special, embed, msg, userdata) {
  var embed = new Discord.MessageEmbed();

  var user = msg.guild.members.cache.get(userdata["id"]).user.username
  embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
  embed.setColor(0x216C2A)
  embed.setDescription("__**" + name + "**__" + "\n" + desc)
  if (special == true) {
    
  stats.save(userdata)
  return msg.channel.send(embed).then(msg=>{
    if (time > 0) {
    msg.delete({timeout:time})
  }
  })
  } else {
    
  stats.save(userdata)
  msg.edit(embed).then(msg=>{
    if (time > 0) {
    msg.delete({timeout:time})
  }
  })
  }
}

module.exports.checkgarageerror = function(embed, msg, userdata) {
    if (stats.garagecount(userdata) >= gtf.garagelimit) {
      require(gtffile.EMBED).error("❌ Garage Full", "You have reached your garage limit of 50 or above.\nSell one of your cars using **!garage sell** in order to add cars to your garage.", embed, msg, userdata)
      return true
    } else {
      return false
    }
}

module.exports.checknocars = function(userdata) {
  return stats.currentcarmain(userdata) == "No car."
}
