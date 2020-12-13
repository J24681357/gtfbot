var gtf = require("/home/runner/gtfbot/functions/f_gtf")
var stats = require("/home/runner/gtfbot/functions/profile/f_stats")
var emote = require("/home/runner/gtfbot/index")
var gtftools = require("/home/runner/gtfbot/functions/misc/f_tools")
var gtfperf = require("/home/runner/gtfbot/functions/marketplace/f_perf")

const Discord = require("discord.js")
const client = new Discord.Client()
var gtffile = process.env
////////////////////////////////////////////////////
var gtfuser = require("/home/runner/gtfbot/index")

module.exports = {
  name: "seasonal",
  title: "Seasonal Events",
  cooldown: 3,
  level: 0,
  aliases: ["seasonals"],
  channels: ["testing"],

  delete: true,
  availinmaint: false,
  requireuserdata: true,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  description: ["!sesonal - Displays the list of seasonal events to select from.\n`Lv.XX` represents that the driver level that is required.", 'Each event has car regulations that your current car must meet before entry.', '!career ["league"] [(number)] - Enters an event, given from the [(number)] associated with the list from a ["league"].\nUse the reactions to select races contained in each event (1️⃣,2️⃣,3️⃣, etc).'],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed()
    embed.setColor(0x0151b0)
    var user = msg.guild.members.cache.get(userdata["id"]).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL())
    var args = "\n" + '`Args: !seasonal [(number)]`' + "\n"
    var page = 0
    var results = ''
    var info = "**❓ Select an event from the list above using the numbers associated or the reactions.**"

    /* Setup */
  var races;

  
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF"

      MongoClient.connect(url, { useUnifiedTopology: true },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      dbo.collection("SEASONALS").find().forEach(row => {
            races = row["races"]
      }).then(() => 
      {seasonal()}
      )
})

    function seasonal() {
      var league = 0

    if (query.length == 0) {
      league = "Menu"
    } else {
      league = query[0]
    }

    var results2 = " "
    var ready = false
    var racesettings
    var finalgrid
    var mode = "CAREER"
    var reactionson = true
    var racedetails = ""


    if (league == 1) {
      var ready = true
    }
    if (league == 2) {
      if (!require(gtffile.EXP).checklevel(5, embed, msg, userdata)) {
        return
      }
      var ready = true
    }
    if (league == 3) {
      return
      if (!require(gtffile.EXP).checklevel(10, embed, msg, userdata)) {
        return
      }
      var ready = true
    }
    if (league == 4) {
      return
      if (!require(gtffile.EXP).checklevel(20, embed, msg, userdata)) {
        return
      }
      var ready = true
    }
    if (league == 5) {
      return
      if (!require(gtffile.EXP).checklevel(30, embed, msg, userdata)) {
        return
      }
      var ready = true
    }
    if (league == 6) {
      return
      if (!require(gtffile.EXP).checklevel(40, embed, msg, userdata)) {
        return
      }
      var ready = true
    }
      if (!ready && query.length != 0) {
        require(gtffile.EMBED).warning("⚠ Warning", "This event does not exist.", embed, msg, userdata)
      }
      embed.setTitle("🏁" + " __Seasonal Events__")

      var number = parseInt(query[0])
      if (number <= 0 || isNaN(number) || number > races.length) {
        if (!isNaN(number)) {
          require(gtffile.EMBED).warning("⚠ Warning", "This event does not exist.", embed, msg, userdata)
        }
        var results2 = ""
        var ids = Object.keys(races)
        for (var t = 0; t < ids.length; t++) {
          var raceevent = races[ids[t]]
          var rmakes = raceevent["makes"]
          var rmodels = raceevent["models"]
          if (rmodels.length != 0) {
            var line = " | "
          } else {
            var line = " Open"
          }

          var achieve = stats.isracescomplete(league + "-" + (t + 1), raceevent["tracks"].length, 1, userdata)
          if (achieve) {
            stats.eventcomplete(league + "-" + (t + 1), userdata)
            stats.gift(emote.goldmedal + " Congrats! All GOLD in " + raceevent["title"].split(" - ")[0] + " " + emote.goldmedal, raceevent["prize"], embed, msg, userdata)
          }

          results2 = results2 + raceevent["title"] + " - " + raceevent["tracks"].length + " Races " + stats.eventstatus(league + "-" + (t + 1), userdata) + "\r" + "**FPP Limit: " + raceevent["fpplimit"] + emote.fpp + "**\r" + "**Regulations:** " + rmakes.join(", ").replace("Any", "") + line + rmodels.join(", ") + "\r" + "**Types:** " + raceevent["types"].join(", ") + "\n\n"
        }
         embed.setTitle("🏁 __Seasonal Events - " + league + " (" + ids.length + " Events)" + "__")
        var list = results2
          .split("\n\n")
          .slice(0, -1)
          .map(function(x) {
            return [x, " "]
          })

        results2 = gtftools.list(list, page, "", "", true, "", 3, [query, "seasonal"], embed, msg, userdata)

        embed.setDescription(results2)
        var date = new Date()
        var hoursleft = 24 - date.getHours()
        embed.setFooter("Seasonal Events Rotation: " + "~" + hoursleft + "hours")
        embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata))
        gtftools.createpages(results2, list, page, "", "", true, "", 3, [query, "seasonal", reactionson, info], embed, msg, userdata)
        return
      }

      function asyncrace(event) {
        if (event == "Invalid") {
          return
        }

        var ready = true

        require(gtffile.RACE).preparerace(mode, "", "GARAGE", event, args, embed, msg, userdata)
      }
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata))
      var event = require(gtffile.RACE).careerevent(races, number, embed, msg, asyncrace, userdata)
    } 
  }
}