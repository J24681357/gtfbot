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

module.exports = {
  name: "settings",
  title: "GTF Settings",
  cooldown: 5,
   level:0,
  delete: true,
  description: ["!settings - Displays the settings for GTF, including your current preferences.", "!settings [\"setting\"] - Displays a list of preferences for that type of [\"setting\"].", "!settings [\"setting\"] [ (number)] - Sets the preference for the [(number)] associated with the list in its [\"setting\"]"],
  requirecar: false,
  usedduringrace: false,
  usedinlobby: false,
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = "\n" + "`Args: !settings [\"setting\"] [(number)]`" + "\n" + ""

    /* Setup */
    var results = "";
    var page = 0;
    var checked = false;

    embed.setTitle("⚙ __GTF Settings__");
  
    if (query[0] == "time") {
      checked = true
      var number = parseInt(query[1])
      results = require("/home/runner/gtfbot/functions/profile/f_settings").time(results, number, query, embed, msg, msgauthorid)
      if (results == "PAGES") {
        return
      }
    }
    
    if (query[0] == "progressbar") {
      checked = true
      var number = parseInt(query[1])
      results = require("/home/runner/gtfbot/functions/profile/f_settings").progressbar(results, number, query, embed, msg, msgauthorid)

      if (results == "PAGES") {
        return
      }
    }

    if (query[0] == "units") {
      checked = true
      var number = parseInt(query[1])

      results = require("/home/runner/gtfbot/functions/profile/f_settings").units(results, number, query, embed, msg, msgauthorid)

      if (results == "PAGES") {
        return
      }
    }
    
    /*if (query[0] == "compact" || query[0] == "mobile") {
      checked = true
      var number = parseInt(query[1])

      results = require("/home/runner/gtfbot/functions/profile/f_settings").compact(results, number, embed, msg, msgauthorid)

      if (results == "PAGES") {
        return
      }
    }*/
    
    if (query[2] !== undefined && !checked) {
      require(gtffile.EMBED).warning("⚠ Warning", "Invalid arguments.", embed, msg, msgauthorid)
    }
    
    if (checked) {
      if (results == "SUCCESS" || results == "INVALID") {
        return
      }
      embed.addField(stats.main(msgauthorid), stats.currentcarmain(msgauthorid));
      embed.setDescription(results)
      msg.channel.send(embed)
      return
    }
    
    if (!checked) {
      var m = ["KM","MI"]
  var list = "__**Mileage Units**__ - !settings units [(number)]\n" + m[stats.setting("MILEAGE", msgauthorid)] + "\n" +
           "__**Time Zone Offset**__ - !settings time [(number)]\n" + stats.setting("TIME OFFSET", msgauthorid) + "\n" +  
            "__**Progress Bar Color**__ - !settings progressbar [(number)]:\n" + stats.setting("PROGRESSBAR", msgauthorid).join(" ") + "\n"
                                                                                                                                           
    embed.addField(stats.main(msgauthorid), stats.currentcarmain(msgauthorid));
    
    embed.setDescription(list);
    msg.channel.send(embed)
    return
    }
  }
};
