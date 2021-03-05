var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = process.env
////////////////////////////////////////////////////

module.exports = {
  name: "settings",
  title: "GTF Settings",
  cooldown: 5,
  level:0,
     channels: ["testing", "gtf-demo"],

  availinmaint:false,
  delete: false,
  requirecar: false,
  usedduringrace: false,
  usedinlobby: false,
  description: ["!settings - Displays the settings for GTF, including your current preferences.", "!settings [\"setting\"] - Displays a list of preferences for that type of [\"setting\"].", "!settings [\"setting\"] [ (number)] - Sets the preference for the [(number)] associated with the list in its [\"setting\"]"],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args = "\n" + "`Args: !settings [\"setting\"] [(number)]`" + "\n" + ""
    var page = 0
    var results = ''
    var info = "❓ **For each setting, select an item (or number) corresponding from a setting's list.**"

    /* Setup */

    var checked = false;
    var reactionson = true

    embed.setTitle("⚙ __GTF Settings__");
    if (query[0] == 1) {
      query[0] = "units"
    } else if (query[0] == 2) {
      query[0] = "time"
    } else if (query[0] == 3) {
      query[0] = "progressbar"
    }
  
    if (query[0] == "time") {
      checked = true
      var number = parseInt(query[1])
      results = require("../functions/profile/f_settings").time(results, number, query, embed, msg, userdata)
      if (results == "PAGES") {
        return
      }
    }
    
    if (query[0] == "progressbar") {
      checked = true
      var number = parseInt(query[1])
      results = require("../functions/profile/f_settings").progressbar(results, number, query, embed, msg, userdata)

      if (results == "PAGES") {
        return
      }
    }

    if (query[0] == "units") {
      checked = true
      var number = parseInt(query[1])

      results = require("../functions/profile/f_settings").units(results, number, query, embed, msg, userdata)

      if (results == "PAGES") {
        return
      }
    }

    if (query[2] !== undefined && !checked) {
      require(gtf.EMBED).warning("⚠ Warning", "Invalid arguments.", embed, msg, userdata)
    }
    
    if (checked) {
      if (results == "SUCCESS" || results == "INVALID") {
        return
      }
      embed.addField(stats.main(userdata), stats.currentcarmain(userdata));
      embed.setDescription(results)
      msg.channel.send(embed)
      return
    }
    
    if (!checked) {
      var m = ["KM","MI"]
  var list = [["__**Mileage Units**__ - !settings units [(number)]\r" + m[stats.setting("MILEAGE", userdata)], " "],
           ["__**Time Zone Offset**__ - !settings time [(number)]\r" + stats.setting("TIME OFFSET", userdata), " "],
            ["__**Progress Bar Color**__ - !settings progressbar [(number)]:\r" + stats.setting("PROGRESSBAR", userdata).join(" ")]]

       results = gtftools.list(list, page, "", "", true, "", 3, [query, "settings"], embed, msg, userdata)

        embed.setDescription(results)
        embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata))
        gtftools.createpages(results, list, page, "", "", true, "", 3, [query, "settings", reactionson, info], embed, msg, userdata)                   
    return
    }
  }
};
