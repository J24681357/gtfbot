var gtf = require("/app/functions/f_gtf");
var stats = require("/app/functions/profile/f_stats");
var emote = require("/app/index");
var gtftools = require("/app/functions/misc/f_tools");
var gtfperf = require("/app/functions/marketplace/f_perf");
var exp = require("/app/profile/expprofile");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////

module.exports = {
  name: "restart",
  title: "GTF Bot Restarter",
  cooldown: 3,
  delete: false,
   level:0,
  requirecar: false,
  usedduringrace: true,
  aliases: ["re"],
  usedinlobby: true,
  description: ["!restart - (ADMIN ONLY) Restarts the GT Fitness Bot."],
  level: 0,
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username
    var args = ""

    /* Setup */

    if (msgauthorid != "237450759233339393") {
      return msg.channel.send("No.")
    }
    var results = " ";
        results = "__**Restarting GT Fitness bot....**__"
        embed.setDescription(results);
        msg.channel.send(embed).then(() =>{
        msg.delete({timeout:3000})
        process.exit(1)});
  }
};
