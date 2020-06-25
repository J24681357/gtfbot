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
var replaystats = require("/app/functions/replays/f_replay");

module.exports = {
  name: "replay",
  title: "Replay Theater",
  cooldown: 3,
  level:0,
  delete: true,
  description: ["!replay - Displays the list of your saved replays.","!replay [load] [(number)] - Loads a saved replay from the [(number)] associated with the list of saved replays.", "!replay [delete] [(number)] - Deletes a saved replay from the [(number)] associated with the list of saved replays.", "!replay [clear] - Clears all of your saved replays."],
  aliases: ["r", "replays"],
  requirecar: false,
  usedduringrace: false,
  usedinlobby: true,
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x8b0000);

    var user = msg.guild.members.cache.get(msgauthorid).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args =
      "\n" +
      "`Args: !replay [load (number)|delete (number)|clear]`" +
      "\n";

    /* Setup */
    var results = " ";
    var page = 0;
    var success = false;

    embed.setTitle(
      "__Replay Theater: " +
        replaystats.replays(msgauthorid).length +
        " / " +
        gtf.replaylimit +
        " Replays__"
    );
    
    if (!isNaN(query[0])) {
      query.unshift("load");
      query[1] = parseInt(query[1]);
    }
    
    if (replaystats.replays(msgauthorid).length == 0) {
                require(gtffile.EMBED).error(
            "❌ No Replays",
            "There are no replays saved.",
            embed,
            msg, msgauthorid
          );
      return
    }

    /*if (!isNaN(query[0])) {
      query.unshift("select");
      query[1] = parseInt(query[1]);
    }*/
    if (query[0] == "clear") {
      success = true
    
      embed.setDescription("⚠ Clear all of your saved replays? This is permanent.")
       embed.setColor(0xFFFF00)
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
      msg.channel.send(embed).then(msg => {
        
      function clearreplay() {
        replaystats.clear(msgauthorid)
        embed.setDescription("✅ Replay data cleared.")
        embed.setColor(0x216C2A)
        msg.edit(embed).then(msg => {msg.delete({timeout:5000})})
      } 
        
      var emojilist = [[emote.yes, 'Yes', clearreplay]]
       gtftools.createreactions(emojilist, msg, msgauthorid)
      })
    }
    if (query[0] == "delete") {
      success = true
      var number = query[1];
        if (
          number <= 0 ||
          isNaN(number) ||
          number === undefined ||
          number > replaystats.replays(msgauthorid).length
        ) {
          require(gtffile.EMBED).error(
            "❌ Invalid ID",
            "This ID does not exist in your replay theater.",
            embed,
            msg, msgauthorid
          );
          return;
        }
      var name = replaystats.replays(msgauthorid)[number-1][1][0]
      embed.setDescription("⚠ Delete **" + name + "**?")
       embed.setColor(0xFFFF00)
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
      msg.channel.send(embed).then(msg => {
        
      function deletereplay() {
        replaystats.delete(number, msgauthorid)
        embed.setDescription("✅ Deleted **" + name + "**.")
        embed.setColor(0x216C2A)
        msg.edit(embed).then(msg => {msg.delete({timeout:5000})})
      } 
        
      var emojilist = [[emote.yes, 'Yes', deletereplay]]
       gtftools.createreactions(emojilist, msg, msgauthorid)
      })
    }
    if (query[0] == "load") {
        success = true
        var number = query[1];
        if (
          number <= 0 ||
          isNaN(number) ||
          number === undefined ||
          number > replaystats.replays(msgauthorid).length
        ) {
          require(gtffile.EMBED).error(
            "❌ Invalid ID",
            "This ID does not exist in your replay theater.",
            embed,
            msg, msgauthorid
          );
          return;
        }
        var replaydetails = replaystats.load(number, msgauthorid)
        embed.setDescription("**" + replaydetails[0] + "**" + "\n" + "⌛ **Loading**")
        msg.channel.send(embed).then(msg => {
          gtftools.interval(function() {
            embed.setTitle(replaydetails[0])
            embed.setDescription(replaydetails[1] + "\n\n" + replaydetails[2])
            embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
            msg.edit(embed)

            function grid() {
            embed.setDescription(replaydetails[3].split(",").join("\n"))
              msg.edit(embed)
            }
            function race() {
              embed.setDescription(replaydetails[1] + "\n\n" + replaydetails[2])
              msg.edit(embed)
              }
                var emojilist = [[emote.tracklogo, 'trackgtfitness', race], [emote.cargrid,'gtfcargrid', grid]]

            gtftools.createreactions(emojilist, msg, msgauthorid)
          }, 3000, 1)
        })


    }

    if (success) {
      return
    } else {

      var list = replaystats.replays(msgauthorid).map(function(replay) {
        return [replay[1][0] + " `" + replay[2] + "`", " "];
      });
      results = gtftools.list(list, page, "🕛ID:", "", true, "`", 10, msgauthorid);

      embed.setDescription(results + "\n" + "**❓ Choose a number that corresponds to the replays above.**");
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
      gtftools.createpages(results, list, page, "🕛ID:", "", true, "`", 10, [query, "replay"], embed, msg, msgauthorid);
    }
  }
};
