var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");

const Discord = require("discord.js");
var gtf = require('../../files/directories');
////////////////////////////////////////////////////
module.exports.alert = function(object, msg, userdata) {
  var name = object["name"]
  var desc = object["description"] 
  var embed = object["embed"]
  var seconds = object["seconds"]
  var color = ""
  if (name.includes("⚠")) {
 color = 0xffff00
  } 
  if (name.includes("❌")) {
     color = 0xff0000;
  }
  var message = msg.content.split(" ").join(" ");
  if (message.length == 0) {
    message = "";
  }
  
if (embed == "") {
  var embed = new Discord.MessageEmbed();
  embed.setAuthor(msg.guild.members.cache.get(userdata["id"]).user.username, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
  embed.setColor(color)
  embed.addField(name + ' "' + message + '"', desc);
  return msg.channel.send(embed).then(msg => {
        if (seconds > 0) {
          msg.delete({ timeout: seconds * 1000 }).then(() => {
            require(gtf.MAIN).embedcounts[userdata["id"]]--
          })
          
        }
      });
  } else {
    embed.addField(name + ' "' + message + '"', desc);
    embed.setColor(color)
  }
  return;
};

module.exports.success = function(name, desc, time, special, embed, msg, userdata, dm) {
  var embed = new Discord.MessageEmbed();
  var user = msg.guild.members.cache.get(userdata["id"]).user.username;
  embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
  embed.setColor(0x216c2a);
  embed.setDescription("__**" + name + "**__" + "\n" + desc);
  if (special == true) {
    stats.save(userdata);

    if (dm === undefined || dm === "") {
      return msg.channel.send(embed).then(msg => {
        if (time > 0) {
          msg.delete({ timeout: time });
        }
      });
    } else {
      msg.author.send(embed).then(msg => {
        if (time > 0) {
          msg.delete({ timeout: time });
        }
      });
    }
  } else {
    stats.save(userdata);
    msg.edit(embed).then(msg => {
      if (time > 0) {
        msg.delete({ timeout: time });
      }
    });
  }
};

module.exports.checkgarageerror = function(embed, msg, userdata) {
  if (stats.garagecount(userdata) > require(gtf.GTF).garagelimit) {
    require(gtf.EMBED).alert({name:"❌ Garage Full", description: "You have reached your garage limit of " + require(gtf.GTF).garagelimit + " or above.\nSell one of your cars using **!garage sell** in order to add more cars to your garage.", embed:"", seconds:0}, msg, userdata);
    return true;
  } else {
    return false;
  }
};

module.exports.checknocars = function(userdata) {
  return stats.currentcarmain(userdata) == "No car.";
};
