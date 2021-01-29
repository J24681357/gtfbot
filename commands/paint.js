var stats = require("../functions/profile/f_stats")
var emote = require("../index")
var gtftools = require("../functions/misc/f_tools")

const Discord = require("discord.js")
const client = new Discord.Client()
var gtffile = process.env
////////////////////////////////////////////////////

module.exports = {
   name: "paint",
  title: "🎨 GTF Auto - Paints",
  cooldown: 3,
   level:0,
    channels: ["gtf-mode", "testing", "gtf-demo"],

  delete: false,
  availinmaint:false,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
    description: ["!paint - Displays the list of types of paints in GTF Auto.", "!paint [\"type\"] - Displays a list of [\"type\"] in GTF Auto.", "!paint [\"type\"] [(number)] - Purchases a paint from the [(number)] associated from the list of [\"type\"] paints.\nThis applies to your current car."],
  "execute"(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed()
    embed.setColor(0x0151b0)

    var user = msg.guild.members.cache.get(userdata["id"]).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL())
    var args = "\n" + "`Args: !paint [\"type\"] [(number)]`" + "\n"
    var page = 0
    var results = ""
    var info = "❓ **Choose a type of paint from the list above.**"

    /* Setup */
    var results2 = ""
    var select = ""
    var car = stats.currentcar(userdata)
    var title = "🎨 GTF Auto - Paints"
    embed.setTitle("__" + title + "__")
    console.log(query)

    var selectedtype = false
    var reactionson = true

    if (query.length == 0) {
      results ="__**Gloss Paints**__ - !paint [gloss|g]" + "\n" +
      "__**Metallic Paints**__ - !paint [metallic|m]" + "\n" +
      "__**Pearl Paints**__ - !paint [pearl|p]" + "\n" +
      "__**Matte Paints**__ - !paint [matte|ma]" + "\n" +
      "__**Special Paints**__ - !paint [special|spec]" + "\n" + " "
      var list = results.split("\n").map(function(x) {
        return [x, " "]
      })
      var page = 0
      results2 = gtftools.list(list, page, "", "", true, "", 5, [query, "paint",info], embed, msg, userdata)

      embed.setDescription(results)
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata))
      gtftools.createpages(results2, list, page, "", "", true, "", 5, [query, "paint", true, info], embed, msg, userdata)
      return
    }

var select
    if (query[0] == "gloss" || query[0] == "g" || query[0] == "Gloss" || parseInt(query[0]) == 1) {
      var selectedtype = true
      var type = "gloss"
    }
    if (query[0] == "metallic" || query[0] == "m" || query[0] == "Metallic" || parseInt(query[0]) == 2) {
       var selectedtype = true
      var type = "metallic"
    }
    if (query[0] == "pearl" || query[0] == "p" || query[0] == "Pearl"  || parseInt(query[0]) == 3) {
      var selectedtype = true
      var type = "pearl"
    }
    if (query[0] == "matte" || query[0] == "ma" || query[0] == "mt" || query[0] == "Matte" || parseInt(query[0]) == 4) {
       var selectedtype = true
      var type = "matte"
    }
    if (query[0] == "special" || query[0] == "Special" || parseInt(query[0]) == 5) {
       var selectedtype = true
      var type = "special"
    }
select = require(gtffile.PAINTS).find({ "type": type })

    if (selectedtype) {
      var type = select[0]["type"]
      var number = query[1]
      var itempurchase = true
      embed.setTitle("__GTF Auto - " + type + "__")
      if (number == "s" || number == "Stock" || number == "stock") {
        number = "S"
      }
      if (number != "S") {
        if (number <= 0 || isNaN(number) || number === undefined || number > select.length) {
          if (number !== undefined) {
            require(gtffile.EMBED).warning("⚠ Invalid ID", "This ID does not exist.", embed, msg, userdata)
          }
          itempurchase = false
        }
      }
    }

    if (itempurchase) {
      if (number == "S") {
        var paint = { "name": "Stock", "type": select[0]["type"], "cost": 0 }
      } else {
        var paint = select[number - 1]
        var cond = require(gtffile.PAINTS).checkpaintsavail(paint, car)
        if (cond.includes("❌")) {
          require(gtffile.EMBED).error("❌ Paint Unavailable", "**" + paint["type"] + " " + paint["name"] + "** is unavailable for **" + car["name"] + "**.", embed, msg, userdata)
          return
        }
        if (cond.includes("✅")) {
          require(gtffile.EMBED).error("❌ Paint Same Color", "**" + paint["type"] + " " + paint["name"] + "** is already applied for **" + car["name"] + "**.", embed, msg, userdata)
          return
        }
      }
      require(gtffile.MARKETPLACE).purchase(msg.member, paint, "PAINT", embed, msg, userdata)
      return
    }

    var select3 = select.map(function(x) {
      var cond = require(gtffile.PAINTS).checkpaintsavail(x, car)
      return ["**" + gtftools.numFormat(x["cost"]) + "**" + emote.credits + " " + x["type"] + " " + x["name"] + " ", cond]
    })

    results = gtftools.list(select3, page, "", "", true, "", 10, userdata)

    embed.setDescription(results)
    embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata))
    info = "❓ **Select a paint corresponding with the numbers above or the reactions.**"
    gtftools.createpages(results, select3, page, "", "", true, "", 10, [query, "paint", reactionson, info], embed, msg, userdata)
    return
  }
}

