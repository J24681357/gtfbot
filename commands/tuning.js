var stats = require("../functions/profile/f_stats")
var emote = require("../index")
var gtftools = require("../functions/misc/f_tools")

const Discord = require("discord.js")
const client = new Discord.Client()
var gtf = process.env
////////////////////////////////////////////////////

module.exports = {
  "name": "tuning",
  "title": "🛠 Car Tuning",
  "cooldown": 3,
  "level": 0,
  "channels": ["testing", "gtf-test-mode",],

  "delete": false,
  "availinmaint": false,
  "requirecar": true,
  "usedduringrace": false,
  "usedinlobby": true,
  "description": ["!tuning - Displays the list of tunable parts out of the parts in your current car.", "!tuning ['type'] - Opens the settings of [\"type\"] for your current car. \n⚠ Stock parts are not tunable."],
  "execute"(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed()
    embed.setColor(0x0151b0)

    var user = msg.guild.members.cache.get(userdata["id"]).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL())
    var args = ""
    var page = 0
    var results = ""
    var info = "❓ **For each setting, select an item (or number) corresponding from a setting's list.**"

    /* Setup */
    var title = "🛠 Car Tuning"

    var results2 = ""
    var gtfcar = stats.currentcar(userdata)
    embed.setTitle("__" + title + "__")

    var selectedtype = false
    var reactionson = true
    var list = []

    var engine = require(gtf.PARTS).find({ "name": gtfcar["engine"]["current"], "type": "engine" })
    var transmission = require(gtf.PARTS).find({ "name": gtfcar["transmission"]["current"], "type": "transmission" })
    var turbo = require(gtf.PARTS).find({ "name": gtfcar["turbo"]["current"], "type": "turbo" })
    var suspension = require(gtf.PARTS).find({ "name": gtfcar["suspension"]["current"], "type": "suspension" })

    /*if (engine.length != 0) {
      list.push("__**Engine**__ - !tuning [engine|eng|e]")
    }*/
    if (transmission.length != 0) {
      list.push("__**Transmission**__ - !tuning [transmission|tr|trans]")
    }
    if (suspension.length != 0) {
      list.push("__**Suspension**__ - !tuning [suspension|susp|su]")
    }
    /*
    if (turbo.length != 0) {
      list.push("__**Turbo**__ - !tuning [turbo|tu]")
    }*/

    if (list.length == 0) {
      require(gtf.EMBED).error("❌ No Tunable Parts", "There are no parts to tune for the **" + gtfcar["name"] + "**.", embed, msg, userdata)
      return
    }
    var part = []

    if (query[0] == "transmission" || query[0] == "trans" || query[0] == "tr") {
      list.map(function(x) {
        if (x.includes("Transmission")) {
          selectedtype = true
          part = transmission[0]
        }
      })
    }

    if (query[0] == "suspension" || query[0] == "susp" || query[0] == "su") {
      list.map(function(x) {
        if (x.includes("Suspension")) {
          selectedtype = true
          part = suspension[0]
        }
      })
    }

    if (!selectedtype) {
      var list = list.map(function(x) {
        return [x, " "]
      })
      var page = 0
      results = gtftools.list(list, page, "", "", true, "", 7, [query, "tuning"], embed, msg, userdata)
console.log(info)
      embed.setDescription(results + "\n" + info)
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata))
      gtftools.createpages(results, list, page, "", "", true, "", 7, [query, "tuning", info], embed, msg, userdata)
      return
    } else {
      var info = "**❓ Use the left and right arrows to adjust car tuning for each part.\n To apply changes, click the " + emote.yes + " emote.**"
      var list = require(gtf.PARTS).tuninglist(part, gtfcar, embed, msg, userdata)

      results = gtftools.list(list, page, "", "", false, "", 7, [query, "TUNING", info], embed, msg, userdata)
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata))

      var select = 0
      var reset = true
      var index = 0

      stats.addcount(userdata)
      results = JSON.stringify(results)
        .split("\\n")
        .map(function(x) {
          if (reset) {
            x = stats.setting("PROGRESSBAR", userdata)[0] + " " + x
            reset = false
          }
          return x.replace(/\\r/gi, "\n")
        })
        .join("\n")
        .replace(/\"/gi, "")
      embed.setDescription(results + "\n" + info)

      msg.channel.send(embed).then(msg => {
        function back() {
          gtfcar[part["type"].toLowerCase()]["tuning"][select]--
          var list = require(gtf.PARTS).tuninglist(part, gtfcar, embed, msg, userdata)

          results = gtftools.list(list, page, "", "", false, "", 7, [query, "TUNING", info], embed, msg, userdata)
          var selectcount = 0
          results = JSON.stringify(results)
            .split("\\n")
            .map(function(x) {
              if (selectcount == select) {
                x = stats.setting("PROGRESSBAR", userdata)[0] + " " + x
              }
              selectcount++
              return x.replace(/\\r/gi, "\n")
            })
            .join("\n")
            .replace(/\"/gi, "")

          embed.setDescription(results + "\n" + info)
          msg.edit(embed)
        }
        function selectoption() {
          stats.currentcar(userdata)[part["type"].toLowerCase()]["tuning"] = gtfcar[part["type"].toLowerCase()]["tuning"]
          require(gtf.EMBED).success("✅ Success", part["type"] + " settings saved for **" + gtfcar["name"] + "**", 5000, true, embed, msg, userdata)
        }

        function next() {
          gtfcar[part["type"].toLowerCase()]["tuning"][select]++
          var list = require(gtf.PARTS).tuninglist(part, gtfcar, embed, msg, userdata)

          results = gtftools.list(list, page, "", "", false, "", 7, [query, "TUNING", info], embed, msg, userdata)
          var selectcount = 0
          results = JSON.stringify(results)
            .split("\\n")
            .map(function(x) {
              if (selectcount == select) {
                x = stats.setting("PROGRESSBAR", userdata)[0] + " " + x
              }
              selectcount++
              return x.replace(/\\r/gi, "\n")
            })
            .join("\n")
            .replace(/\"/gi, "")

          embed.setDescription(results + "\n" + info)
          msg.edit(embed)
        }

        function up() {
          var index = 0

          var list = require(gtf.PARTS).tuninglist(part, gtfcar, embed, msg, userdata)
          results = gtftools.list(list, page, "", "", false, "", 7, [query, "TUNING", info], embed, msg, userdata)

          select--
          if (select <= -1) {
            select = JSON.stringify(results).split("\\n").length - 2
          }
          results = JSON.stringify(results)
            .split("\\n")
            .map(function(x) {
              if (select == index) {
                x = stats.setting("PROGRESSBAR", userdata)[0] + " " + x
              }
              index++
              return x.replace(/\\r/gi, "\n")
            })
            .join("\n")
            .replace(/\"/gi, "")
          embed.setDescription(results + "\n" + info)
          msg.edit(embed)
        }

        function down() {
          var index = 0
          var list = require(gtf.PARTS).tuninglist(part, gtfcar, embed, msg, userdata)
          results = gtftools.list(list, page, "", "", false, "", 7, [query, "TUNING", info], embed, msg, userdata)

          select++

          if (select >= JSON.stringify(results).split("\\n").length - 1) {
            select = 0
          }

          results = JSON.stringify(results)
            .split("\\n")
            .map(function(x) {
              if (select == index) {
                x = stats.setting("PROGRESSBAR", userdata)[0] + " " + x
              }
              index++
              return x.replace(/\\r/gi, "\n")
            })
            .join("\n")
            .replace(/\"/gi, "")
          embed.setDescription(results + "\n" + info)
          msg.edit(embed)
        }

        var emojilist = [[emote.yes, "Yes", selectoption, "Once"], [emote.leftarrow, "leftarrow", back], [emote.rightarrow, "rightarrow", next], [emote.uparrow, "uparrow", up], [emote.downarrow, "downarrow", down]]
        gtftools.createreactions(emojilist, msg, userdata)
      })

      return
    }
  }
}
