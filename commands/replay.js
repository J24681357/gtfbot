var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = process.env
////////////////////////////////////////////////////
var replaystats = require("../functions/replays/f_replay");

module.exports = {
  name: "replay",
  title: "Replay Theater",
  cooldown: 3,
  level:0,
    aliases: ["r", "replays"],
    channels: ["gtf-mode", "testing", "gtf-demo"],

  delete: false,
  availinmaint:false,
  requirecar: false,
  usedduringrace: false,
  usedinlobby: true,
    description: ["!replay - Displays the list of your saved replays.","!replay [load] [(number)] - Loads a saved replay from the [(number)] associated with the list of saved replays.", "!replay [delete] [(number)] - Deletes a saved replay from the [(number)] associated with the list of saved replays.", "!replay [clear] - Clears all of your saved replays."],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x8b0000);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args =
      "\n" +
      "`Args: !replay [load (number)|delete (number)|clear]`" +
      "\n";
    var page = 0
    var results = ''
    var info = "**❓ Choose a number that corresponds to the replays above.**"

    /* Setup */
    var success = false;
    var replaystats = []

    var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF"

  MongoClient.connect(url, { useUnifiedTopology: true },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      dbo.collection("REPLAYS").find({"id":userdata["id"]}).forEach(row => {
        console.log(row)
            replaystats = row["replays"]
      }).then(() => 
      {replay()}
      )
})

        
  function replay() {
    var reactionson = true
    if (Object.keys(replaystats).length == 0) {
                require(gtf.EMBED).error(
            "❌ No Replays",
            "There are no replays saved.",
            embed,
            msg, userdata
          );
      return
    }

    embed.setTitle(
      "__Replay Theater: " +
        Object.keys(replaystats).length +
        " / " +
        require(gtf.GTF).replaylimit +
        " Replays__"
    );
    
    if (!isNaN(query[0])) {
      query.unshift("load");
      query[1] = parseInt(query[1]);
    }


    /*if (!isNaN(query[0])) {
      query.unshift("select");
      query[1] = parseInt(query[1]);
    }*/
    if (query[0] == "list") {
      query = []
    }
    if (query[0] == "clear") {
      success = true
    
      embed.setDescription("⚠ Clear all of your saved replays? This is permanent.")
       embed.setColor(0xFFFF00)
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
      msg.channel.send(embed).then(msg => {
        
      function clearreplay() {
        replaystats.clear(userdata)
        embed.setDescription("✅ Replay data cleared.")
        embed.setColor(0x216C2A)
        msg.edit(embed).then(msg => {msg.delete({timeout:5000})})
      } 
        
      var emojilist = [[emote.yes, 'Yes', clearreplay]]
       gtftools.createreactions(emojilist, msg, userdata)
      })
    }
    if (query[0] == "delete") {
      success = true
      var number = query[1];
        if (
          number <= 0 ||
          isNaN(number) ||
          number === undefined ||
          number > replaystats.length
        ) {
          require(gtf.EMBED).error(
            "❌ Invalid ID",
            "This ID does not exist in your replay theater.",
            embed,
            msg, userdata
          );
          return;
        }
      var name = replaystats[number.toString()][0]
      embed.setDescription("⚠ Delete " + "`🕛ID:" + number + "` " + "**" + name + "**?")
       embed.setColor(0xFFFF00)
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
      msg.channel.send(embed).then(msg => {
        
      function deletereplay() {
        require(gtf.REPLAY).delete(number, replaystats, userdata)
        embed.setDescription("✅ Deleted "  + "`🕛ID:" + number + "` " + "**" + name + "**.")
        embed.setColor(0x216C2A)
        msg.edit(embed).then(msg => {msg.delete({timeout:5000})})
      } 
        
      var emojilist = [[emote.yes, 'Yes', deletereplay]]
       gtftools.createreactions(emojilist, msg, userdata)
      })
    }
    if (query[0] == "load") {
        success = true
        var number = query[1];
        if (
          number <= 0 ||
          isNaN(number) ||
          number === undefined ||
          number > replaystats.length
        ) {
          require(gtf.EMBED).error(
            "❌ Invalid ID",
            "This ID does not exist in your replay theater.",
            embed,
            msg, userdata
          );
          return;
        }
        var replaydetails = replaystats[number.toString()]
        var loading = require(gtf.GTF).loadingscreen("**" + replaydetails[0] + "**", '')
        embed.setDescription(loading)
        msg.channel.send(embed).then(msg => {
          gtftools.interval(function() {
            embed.setTitle(replaydetails[0])
            embed.setDescription(replaydetails[1] + "\n\n" + replaydetails[2])
            embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
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

            gtftools.createreactions(emojilist, msg, userdata)
          }, 3000, 1)
        })


    }

    if (success) {
      return
    } else {

      var list = Object.keys(replaystats).map(function(id) {
        return [replaystats[id][0] + " `" + replaystats[id][4] + "`", " "];
      });
      results = gtftools.list(list, page, "🕛ID:", "", true, "`", 10, userdata);

      embed.setDescription(results);
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
      gtftools.createpages(results, list, page, "🕛ID:", "", true, "`", 10, [query, "replay", reactionson, info], embed, msg, userdata);
    }
  }
  }
};
