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
  name: "license",
  title: "GTF Auto - Licenses",
  cooldown: 3,
  level:19,
  delete: true,
  aliases: ["licenses"],
  description: ["!license - Displays a list of licenses in GTF Auto.", "!license [(number)] - Purchases a license from the [(number)] associated with the list."],
  requirecar: false,
  usedduringrace: false,
  usedinlobby: false,
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = "\n" + "`Args: !license [(number)]`" + "\n"

    /* Setup */

    var results = " ";
    var page = 0;
    var number = 0;

    embed.setTitle("__GTF Auto: Licenses__");
    var args = ""

    var list = [[ 'Rally License', 250000 ],[ 'GTF License', 1000000],[ 'Ru License', 2500000 ]]
    var total = list.length

    results = gtftools.list(list, page, "", emote.credits, true, "",10, msgauthorid)


    if (query[0] > total || isNaN(query[0]) || query[0] < 0) {

      if (query[0] !== undefined) {
        require(gtffile.EMBED).warning("⚠ Invalid ID", "Please use numbers associated with the list above.", embed, msg, msgauthorid)
      }
    } else {
      var itempurchase = true;
      number = parseInt(query[0]) - 1
      var item = list[number]
    }

    embed.setDescription(results + "\n" + "❓ **Choose a part to install from the list above.**");
    embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));

    if (itempurchase) {
      embed.fields = []
      var roles = []
      var success = true;
      roles.unshift(item[0])
      if (!(roles === undefined)) {

      for (var i = 0; i < roles.length; i++) {
        if (msg.member.roles.cache.find(r => r.name === roles[i])) {
          roles.shift()
        }
        if (roles.length == 0) {
            break;
        }
      }
  if (roles.length > 0) {
  } else {
    require(gtffile.EMBED).error("❌ Check Your Roles!", "You already have this license.", embed, msg, msgauthorid);
  return 
  }
      }
      require(gtffile.MARKETPLACE).purchase(msg.member, item, "ROLE", embed, msg, msgauthorid)
    } else {
    gtftools.createpages(results, list, page, "", emote.credits, true, "",10, [query, "license"], embed, msg, msgauthorid)
    }
  }

};
