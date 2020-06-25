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
  name: "levels",
  title: "GTF Experience Levels",
  cooldown: 5,
    level: 0,
  delete: true,
  description: ["!levels - Display a list of EXP levels with their rewards.", "!levels [info] [(number)] - Shows information about an EXP level including the required EXP and prizes."],
  aliases: ["explevels", "level"],
  requirecar: false,
  usedduringrace: false,
  usedinlobby: false,
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args =
      "\n" +
      "`Args: !levels [info] [(number)]`" +
      "\n";

    /* Setup */
    var results = " ";
    var page = 0;

    embed.setTitle(
      emote.exp + "__GTF Level Milestones: " + exp.explevels().length + " Levels" + "__"
    );

    if (!isNaN(query[0])) {
      query.unshift("info");
      query[1] = parseInt(query[1]);
    }

    if (query.length != 0) {

      if (query[0] == "info") {
        var number = query[1];
        if (
          number <= 0 ||
          isNaN(number) ||
          number === undefined ||
          number > exp.explevels().length
        ) {
          require(gtffile.EMBED).error(
            "❌ Invalid Number",
            "This level does not exist.",
            embed,
            msg, msgauthorid
          );
          return;
        }
        var levelchosen = exp.explevels()[number-1]
        var rewards = "None."
        if (levelchosen.length === 3) {
          rewards = levelchosen[2].join("\n")
        }
        results = "__Level " + levelchosen[0] + "__" + "\n" +
          "**Experience Required: " + levelchosen[1] + emote.exp + "**\n\n" +
          "**__Rewards__** " + "\n" +
            rewards
      }
      embed.setDescription(results);
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
      msg.channel.send(embed);
      return;
    } else {
      var list = exp.explevels().map(function(level) {
        var extra = " "
        if (level.length === 3) {
          extra = "\r" + level[2].join("\r")
        }
        return ["", level[1], extra];
      });

      results = gtftools.list(list, page, "Level ", emote.exp, true, "__",5, msgauthorid);

      embed.setDescription(results);
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
      gtftools.createpages(results, list, page, "Level ", emote.exp, true, "__", 5, [query, "levels"], embed, msg, msgauthorid);
    }
  }
};
