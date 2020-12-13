var gtf = require("../functions/f_gtf");
var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");
var gtfperf = require("../functions/marketplace/f_perf");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////

module.exports = {
  name: "restart",
  title: "GTF Bot Restarter",
  cooldown: 3,
   level:0,
     aliases: ["re"],
    channels: ["gtf-mode", "testing"],

     delete: false,
   
  requirecar: false,
  usedduringrace: true,

  usedinlobby: true,
  description: ["!restart - (ADMIN ONLY) Restarts the GT Fitness Bot."],
  level: 0,
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username
    var args = ""
    var page = 0
    var results = ''
    var info = ''

    /* Setup */

    if (userdata["id"] != "237450759233339393") {
      return msg.channel.send("No.")
    }
    var results = " ";
        results = "__**The GT Fitness bot is restarting....**__"
        embed.setDescription(results);
        msg.channel.send(embed).then(() =>{
          process.exit(1)
        msg.delete({timeout:3000})
        });
  }
};
