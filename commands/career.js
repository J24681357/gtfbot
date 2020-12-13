var gtf = require("/home/runner/gtfbot/functions/f_gtf")
var stats = require("/home/runner/gtfbot/functions/profile/f_stats")
var emote = require("/home/runner/gtfbot/index")
var gtftools = require("/home/runner/gtfbot/functions/misc/f_tools")

const Discord = require("discord.js")
const client = new Discord.Client()
var gtffile = process.env
////////////////////////////////////////////////////
var gtfuser = require("/home/runner/gtfbot/index")

module.exports = {
  name: "career",
  title: "Career Mode",
  cooldown: 3,
  level: 0,
  aliases: ["c"],
  channels: ["testing", "gtf-test-mode"],

  delete: true,
  availinmaint: false,
  requireuserdata: true,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  description: ["!career - Displays the list of leagues to select from.\n`Lv.XX` represents that the driver level that is required.", '!career ["league"] - Displays the list of events from a ["league"].\n Each event has car regulations that your current car must meet before entry.', '!career ["league"] [(number)] - Enters an event, given from the [(number)] associated with the list from a ["league"].\nUse the reactions to select races contained in each event (1️⃣,2️⃣,3️⃣, etc).'],
  execute(msg, query, userdata) {
    const embed = new Discord.MessageEmbed()
    embed.setColor(0x0151b0)
    var user = msg.guild.members.cache.get(userdata["id"]).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL())
    var args = "\n" + '`Args: !career ["league"] [(number)]`' + "\n"
    var page = 0
    var results = ""
    var info = "**❓ Select an event from the list above using the numbers associated or the reactions.**"

    /* Setup */
    var league = 0

    if (query.length == 0) {
      league = "Menu"
    } else {
      league = query[0]
    }

    if (parseInt(query[0]) == 1) {
      league = "B"
    }
    if (parseInt(query[0]) == 2) {
      league = "A"
    }
    if (parseInt(query[0]) == 3) {
      league = "IC"
    }
    if (parseInt(query[0]) == 4) {
      league = "IB"
    }
    if (parseInt(query[0]) == 5) {
      league = "IA"
    }
    if (query.includes("-")) {
      query = query[0].split("-")
    }

    var results2 = " "
    var ready = false
    var racesettings
    var finalgrid
    var mode = "CAREER"
    var reactionson = true

    var racedetails = ""
    if (league == "beginner" || league == "b" || league == "B") {
      var ready = true
      league = "B"
      var races = require("/home/runner/gtfbot/data/career/races").beginner()
    }
    if (league == "amateur" || league == "a" || league == "A") {
      if (!require(gtffile.EXP).checklevel(5, embed, msg, userdata)) {
        return
      }
      var ready = true
      league = "A"
      var races = require("/home/runner/gtfbot/data/career/races").amateur()
    }
    if (league == "icleague" || league == "ic" || league == "IC") {
      if (!require(gtffile.EXP).checklevel(10, embed, msg, userdata)) {
        return
      }
      var ready = true
      league = "IC"
      var races = require("/home/runner/gtfbot/data/career/races").icleague()
    }
    if (league == "ibleague" || league == "ib" || league == "IB") {
      if (!require(gtffile.EXP).checklevel(20, embed, msg, userdata)) {
        return
      }
      var ready = true
      league = "IB"
      var races = require("/home/runner/gtfbot/data/career/races").ibleague()
    }
    if (league == "ialeague" || league == "ia" || league == "IA") {
      if (!require(gtffile.EXP).checklevel(30, embed, msg, userdata)) {
        return
      }
      var ready = true
      league = "IA"
      var races = require("/home/runner/gtfbot/data/career/races").ialeague()
    }
    if (league == "sleague" || league == "s" || league == "S") {
      return
      if (!require(gtffile.EXP).checklevel(40, embed, msg, userdata)) {
        return
      }
      var ready = true
      league = "S"
      var races = require("/home/runner/gtfbot/data/career/races").sleague()
    } else {
      if (!ready && query.length != 0) {
        require(gtffile.EMBED).warning("⚠ Warning", "This league does not exist.", embed, msg, userdata)
      }
      embed.setTitle("🏁" + " __Career Mode__")
      results = "__**B**__ - !career [b] [(number)]" + "\n" +
       "__**A**__ - !career [a] [(number)] " + emote.exp + "`Lv.5`" + "\n" +
      "__**IC**__ - !career [ic] [(number)] " + emote.exp + "`Lv.10`" + "\n" +
      " "
      
    }
    /*+ "\n" + "__**IB**__ - !career [ib] [(number)] " + emote.exp + "`Lv.20`" + "\n" + "__**IA**__ - !career [ia] [(number)] " + emote.exp + "`Lv.30`" + */
    if (!ready) {
      var list = results
        .split("\n")
        .slice(0, -1)
        .map(function(x) {
          return [x, " "]
        })
      results2 = gtftools.list(list, page, "", "", true, "", 5, [query, "career"], embed, msg, userdata)

      embed.setDescription(results2)
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata))
      gtftools.createpages(results2, list, page, "", "", true, "", 5, [query, "career", reactionson, info], embed, msg, userdata)
    } else {
      var number = parseInt(query[1])
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
        embed.setTitle("🏁 __Career Mode - " + league + " (" + ids.length + " Events)" + "__")
        var list = results2
          .split("\n\n")
          .slice(0, -1)
          .map(function(x) {
            return [x, " "]
          })
        var page = 0

        results2 = gtftools.list(list, page, "", "", true, "", 3, [query, "career"], embed, msg, userdata)

        embed.setDescription(results2)
        embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata))
        gtftools.createpages(results2, list, page, "", "", true, "", 3, [query, "career", reactionson, info], embed, msg, userdata)
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
  },
}
