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
  name: "levels",
  title: "GTF Experience Levels",
  cooldown: 5,
    level: 0,
      aliases: ["explevels", "level"],
  channels: ["gtf-mode", "testing", "gtf-test-mode"],

  delete: true,
  availitoeveryone:true,
  availinmaint:false,
  available:true,
  requirecar: false,
  usedduringrace: false,
  usedinlobby: false,
    description: ["!levels - Display a list of EXP levels with their rewards.", "!levels [info] [(number)] - Shows information about an EXP level including the required EXP and prizes."],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args =
      "\n" +
      "`Args: !levels [info] [(number)]`" +
      "\n";
    var page = 0;
    var results = " ";
    var info = '**❓ Select a level from the list above using the levels associated or reactions.**'
    /* Setup */
    var reactionson = true

    embed.setTitle(
      emote.exp + "__GTF Level Milestones: " + Object.keys(require(gtffile.EXP).ExpLevels()).length + " Levels" + "__"
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
          number > require(gtffile.EXP).ExpLevels().length
        ) {
          require(gtffile.EMBED).error(
            "❌ Invalid Number",
            "This level does not exist.",
            embed,
            msg, userdata
          );
          return;
        }
        number = number - 1
        var levelchosen = require(gtffile.EXP).ExpLevels()[(number+1).toString()]

        results = "__Level " + (number+1).toString() + "__" + "\n" +
          "**Experience Required: " + levelchosen["exp"] + emote.exp + "**\n\n" +
          "**__Rewards__** " + "\n" +
            levelchosen["rewards"].join("\r")
      }
      embed.setDescription(results);
      msg.channel.send(embed);
      return;
    } else {
    var explevels = require(gtffile.EXP).ExpLevels()
    var list = Object.keys(explevels).map(function(level) {
        return ["", explevels[level]["exp"], explevels[level]["rewards"].join("\r")];
    })

      results = gtftools.list(list, page, "Level ", emote.exp, true, "__", 5, userdata);

      embed.setDescription(results);
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
      gtftools.createpages(results, list, page, "Level ", emote.exp, true, "__", 5, [query, "levels", reactionson, info], embed, msg, userdata);
    }
  }
};
