var gtf = require("/app/functions/f_gtf");
var stats = require("/app/functions/profile/f_stats");
var emote = require("/app/index");
var gtftools = require("/app/functions/misc/f_tools");
var gtferror = require("/app/functions/misc/f_errors");
var gtfperf = require("/app/functions/marketplace/f_perf");
var exp = require("/app/profile/expprofile");


const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////

module.exports = {
  name: "profile",
  title: "My Profile",
  cooldown: 3,
   level:0,
  delete: true,
  description: ["!profile - Displays your information, stats, and career progression."],
  requirecar: false,
  usedduringrace: false,
  usedinlobby: false,
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = ""

    /* Setup */

    var results = " ";

    //////////EXP//////////
    var progress = stats.setting("PROGRESSBAR",msgauthorid)[0]
    var progressb = stats.setting("PROGRESSBAR",msgauthorid)[1]
    var expbar = [progressb,progressb,progressb,progressb,progressb,progressb,progressb,progressb,progressb,progressb]
    var exp1 = stats.exp(msgauthorid)
    var nextlevel = (stats.level(msgauthorid) + 1)
    if (nextlevel >= 51) {
      nextlevel = 50
    }
    var exppoints = require(gtffile.EXP).ExpLevels()[exp.getpoints(stats.level(msgauthorid) + 1)]
    var currentexppoints = require(gtffile.EXP).getpoints(stats.level(msgauthorid))

    for (var i = 0; i < expbar.length; i++) {
     if (exp1 >= currentexppoints) {
      currentexppoints += exppoints/10
      expbar[i] = progress
     }
    }

    //////////////////////

    embed.setTitle("__My Profile__");

    results = "__Credits__" + "\n" +
      "**" + stats.credits(msgauthorid).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + emote.credits + "**\n" +

    "__Experience__ " + "\n" +
    "**" + stats.exp(msgauthorid).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + emote.exp + "**\n" +
      "Lv." + stats.level(msgauthorid) + " " + expbar.join("") + " " + "Lv." + nextlevel + "\n" +

    "__Total Distance Driven__ " + "\n" +
    stats.mileage("KM", undefined, msgauthorid).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "km | " + stats.mileage("MI", undefined, msgauthorid).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "mi" + emote.mileage + "\n\n" +

    "**Total Car Purchases:** " + stats.numcarpurchase(msgauthorid).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Cars" + "\n" +
    "**Garage:** " + stats.garagecount(msgauthorid) + " Cars";

    embed.setDescription(results);
    embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
    msg.channel.send(embed).then(msg => {
      function careerprofile() {
        embed.setTitle("__Career Progress__");
        var list1 = [["__Beginner__", require("/app/data/career/races").beginner()],  ["__Amateur__", require("/app/data/career/races").amateur()], ["__IC League__", require("/app/data/career/races").icleague()],  ["__IB League__", require("/app/data/career/races").ibleague()], ["__IA League__", require("/app/data/career/races").ialeague()]]
        results2 = ""
        for (var level = 0; level < list1.length; level++) {
          var results2 = results2 + list1[level][0] + "\n"
          var certainraces = list1[level][1]
          var array = Object.keys(certainraces)
          console.log(array)
          for (var i = 0; i < array.length; i++) {
            results2 = results2 + certainraces[array[i]]["eventid"] + " " + stats.eventstatus(certainraces[array[i]]["eventid"], msgauthorid) + " "
          }
          results2 = results2 + "\n"
        }

        embed.setDescription(results2)
        msg.edit(embed)

      }
      function profile() {
        embed.setTitle("__My Profile__");
        embed.setDescription(results)
        msg.edit(embed)
      }

      var emojilist = [[emote.leftarrow,'leftarrow', profile], [emote.rightarrow, 'rightarrow', careerprofile]]

      gtftools.createreactions(emojilist, msg, msgauthorid)
    });
    return
  }
};
