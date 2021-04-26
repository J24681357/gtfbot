var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = process.env
////////////////////////////////////////////////////

module.exports = {
  "name": "levels",
  "title": "GTF Experience Levels",
  "cooldown": 0,
    "level": 0,
      "aliases": ["explevels", "level"],
  "channels": ["testing", "gtf-test-mode", "gtf-demo"],

  delete: false,
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
    var pageargs = {
      "text": "",
      "list": "",
      "start": "Level ", 
      "end": emote.exp,
      "query": query,
      "command": __filename.split("/").splice(-1)[0].split(".")[0],
      "rows": 5,
      "page": 0,
      "numbers": true,
      "reactions": true,
      "dm": false,
      "footer":  '**❓ Select a level from the list above using the levels associated or reactions.**',
       "special": "",
      "other": "__"
    }
    //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //

    embed.setTitle(
      emote.exp + "__GTF Level Milestones: " + Object.keys(require(gtf.LISTS).gtfexp).length + " Levels" + "__"
    );

    if (!isNaN(query[0])) {
      query.unshift("info");
      query[1] = parseInt(query[1]);
    }

    if (query.length != 0) {
      if (query[0] == "list") {
        query = []
      }

      if (query[0] == "info") {
        var number = query[1];
        if (
          number <= 0 ||
          isNaN(number) ||
          number === undefined ||
          number > require(gtf.LISTS).gtfexp.length
        ) {
          require(gtf.EMBED).alert({name:"❌ Invalid Number", description: "This level does not exist.", embed:"", seconds:0}, msg, userdata);
          return;
        }
        number = number - 1
        var levelchosen = require(gtf.LISTS).gtfexp[(number+1).toString()]

        results = "__Level " + (number+1).toString() + "__" + "\n" +
          "**Experience Required: " + levelchosen["exp"] + emote.exp + "**\n\n" +
          "**__Rewards__** " + "\n" +
            levelchosen["rewards"].join("\r")
      }
      embed.setDescription(results);
      msg.channel.send(embed);
      return;
    } else {
    var explevels = require(gtf.LISTS).gtfexp
    var list = Object.keys(explevels).map(function(level) {
        return ["", explevels[level]["exp"], explevels[level]["rewards"].join("\r")];
    })

      pageargs["list"] = list
      pageargs["text"] = gtftools.formpage(pageargs, embed, msg, userdata)
    gtftools.formpages(pageargs, embed, msg, userdata)
    }
  }
};
