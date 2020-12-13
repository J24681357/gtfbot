var stats = require("../functions/profile/f_stats")
var emote = require("../index")
var gtftools = require("../functions/misc/f_tools")

const Discord = require("discord.js")
const client = new Discord.Client()
var gtffile = process.env
////////////////////////////////////////////////////

module.exports = {
  name: "tune",
  title: "📦 GTF Auto - Tuning Shop",
  cooldown: 3,
  level: 0,
    channels: ["gtf-mode", "testing", "gtf-test-mode"],
    
  delete: true,
  availinmaint: false,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  description: ["!tune - Displays the list of types of performance parts in GTF Auto.", '!tune ["type"] - Displays a list of ["type"] in GTF Auto.', '!tune ["type"] [(number)] - Purchases a performance part from the [(number)] associated from the list of ["type"] parts.\nThis applies to your current car.\nThe current ["type"] part on your current car will be sold and replaced, but you must purchase the part with its full price first.', '!tune ["type"] [stock] - Revert the ["type"] installed to your car to Stock.'],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed()
    embed.setColor(0x0151b0)

    var user = msg.guild.members.cache.get(userdata["id"]).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL())
    var args = "\n" + '`Args: !tune ["type"] [(number)]`' + "\n"
    var page = 0
    var results = ''
    var info = "❓ **Select a part type corresponding with the name (or number) of the part type above.**"

    /* Setup */
    var results2 = ""
    var select = ""
    var car = stats.currentcar(userdata)
    var title = "📦 GTF Auto - Tuning Shop"
    embed.setTitle("__" + title + "__")

    var selectedtype = false
    var reactionson = true

    if (query.length == 0) {
      results = "__**Engine**__ - !tune [engine|eng|e] ['stock'|(number)]" + "\n" + "__**Suspension**__ - !tune [suspension|susp|su] ['stock'|(number)]" + "\n" + "__**Tires**__ - !tune [tires|tire|tr] ['stock'|(number)]" + "\n" + "__**Weight Reduction**__ - !tune [weight-reduction|weight|we] ['stock'|(number)]" + "\n" + "__**Turbo Kits**__ - !tune [turbo|tu] ['stock'|(number)]"
      var list = results
        .split("\n")
        .map(function(x) {
          return [x, " "]
        })
      var page = 0
      results2 = gtftools.list(list, page, "", "", true, "", 7, [query, "tune"], embed, msg, userdata)

      embed.setDescription(results)
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata))
      gtftools.createpages(results2, list, page, "", "", true, "", 7, [query, "tune", true, info], embed, msg, userdata)
      return
    }

    if (query[0] == "engine" || query[0] == "eng" || query[0] == "e" || parseInt(query[0]) == 1) {
      var selectedtype = true
      var type = "engine"
      var select = require(gtffile.PARTS).find({ "type": type })
    }

    /*if (query[0] == "transmission" || query[0] == "trans" || query[0] == "tr" || parseInt(query[0]) == 2) {
      selectedtype = true
      var select = require(gtffile.PARTS).transmission()
      var type = "transmission"
    }*/

    if (query[0] == "suspension" || query[0] == "susp" || query[0] == "sus" || query[0] == "su" || parseInt(query[0]) == 2) {
      selectedtype = true
      var type = "suspension"
      var select = require(gtffile.PARTS).find({ "type": type })
    }

    if (query[0] == "tires" || query[0] == "tire" || query[0] == "ti" || parseInt(query[0]) == 3) {
      var selectedtype = true
      var type = "tires"
      var select = require(gtffile.PARTS).find({ "type": type })
    }

    if (query[0] == "weight-reduction" || query[0] == "weight" || query[0] == "we" || parseInt(query[0]) == 4) {
      selectedtype = true
      var type = "weight-reduction"
      var select = require(gtffile.PARTS).find({ "type": type })
    }

    if (query[0] == "turbo" || query[0] == "supercharger" || query[0] == "tu" || parseInt(query[0]) == 5) {
      selectedtype = true
      var type = "turbo"
      var select = require(gtffile.PARTS).find({ "type": type })
    }


    if (selectedtype) {
      var name = select[0]["type"]
      var number = query[1]
      var itempurchase = true
      embed.setTitle("__GTF Auto - " + name + "__")
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
        var part = { "name": "Stock", "type": select[0]["type"], "cost": 0  }
      } else {
      var part = select[number - 1]
      var cond = require(gtffile.PARTS).checkpartsavail(part, car) 
        if (cond.includes("❌")) {
          require(gtffile.EMBED).error("❌ Part Unavailable", "**" + part["type"] + " " + part["name"] + "** is unavailable for **" + car["name"] + "**.", embed, msg, userdata)
          return
        }
        if (cond.includes("✅")) {
          require(gtffile.EMBED).error("❌ Part Already Installed", "**" + part["type"] + " " + part["name"] + "** is already installed for **" + car["name"] + "**.", embed, msg, userdata)
          return
        }
      }
      require(gtffile.MARKETPLACE).purchase(msg.member, part, "PART", embed, msg, userdata)
      return
    }

    /*if (stats.userid() == "237450759233339393") {
        stats.addgift(select2[number-1][0], item, "PART")
    }*/
    var select3 = select.map(function(x) {
      console.log(x)
      var cond = require(gtffile.PARTS).checkpartsavail(x, car)
      return ["**" + gtftools.numFormat(x["cost"]) + "**" + emote.credits + " " + x["type"] + " " + x["name"] + " ", cond]
    })

    results = gtftools.list(select3, page, "", "", true, "", 10, userdata)

    embed.setDescription(results)
    embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata))
    info = "❓ **Select an upgrade corresponding with the numbers above or the reactions.**"
    gtftools.createpages(results, select3, page, "", "", true, "", 10, [query, "tune", reactionson, info], embed, msg, userdata)
    return
  },
}
