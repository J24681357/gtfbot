var stats = require("../functions/profile/f_stats")
var emote = require("../index")
var gtftools = require("../functions/misc/f_tools")

const Discord = require("discord.js")
const client = new Discord.Client();
var gtf = require('../files/directories');
////////////////////////////////////////////////////

module.exports = {
  name: "seasonal",
  title: "Seasonal Events",
  cooldown: 3,
  level: 0,
  aliases: ["seasonals"],
  channels: ["testing", "gtf-demo"],

  delete: false,
  availinmaint: false,
  requireuserdata: true,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  description: ["!seasonal - Displays the list of seasonal events to select from.\n`Lv.XX` represents that the driver level that is required.", 'Each event has car regulations that your current car must meet before entry.', '!career ["league"] [(number)] - Enters an event, given from the [(number)] associated with the list from a ["league"].\nUse the reactions to select races contained in each event (1️⃣,2️⃣,3️⃣, etc).'],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed()
    embed.setColor(0x0151b0)
    var user = msg.author.username
    embed.setAuthor(user, msg.author.displayAvatarURL())
    var args = "\n" + '`Args: !seasonal [(number)]`' + "\n"
    var page = 0
    var results = ''
    	var pageargs = {
			text: '',
			list: '',
			start: '',
			end: '',
			query: query,
			command: __filename
				.split('/')
				.splice(-1)[0]
				.split('.')[0],
			rows: 10,
			page: 0,
			numbers: false,
			reactions: true,
			dm: false,
			footer: '**❓ Select an event from the list above using the numbers associated or the reactions.**',
      "special": "",
			other: '',
		};

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
    var racedetails = ""


    if (league == 1) {
      var ready = true
    }
    if (league == 2) {
      if (!require(gtf.EXP).checklevel(5, embed, msg, userdata)) {
        return
      }
      var ready = true
    }
    if (league == 3) {
      return
      if (!require(gtf.EXP).checklevel(10, embed, msg, userdata)) {
        return
      }
      var ready = true
    }
    if (league == 4) {
      return
      if (!require(gtf.EXP).checklevel(20, embed, msg, userdata)) {
        return
      }
      var ready = true
    }
    if (league == 5) {
      return
      if (!require(gtf.EXP).checklevel(30, embed, msg, userdata)) {
        return
      }
      var ready = true
    }
    if (league == 6) {
      return
      if (!require(gtf.EXP).checklevel(40, embed, msg, userdata)) {
        return
      }
      var ready = true
    }
      if (!ready && query.length != 0) {
        require(gtf.EMBED).alert({name:"⚠ Warning", description: "This event does not exist.",embed:embed, seconds:0}, msg, userdata);
      }
      embed.setTitle("🏁" + " __Seasonal Events__")

      var number = query[0]
      if (!gtftools.betweenInt(number, 1, Object.keys(races).length)) {
        if (number !== undefined) {
            require(gtf.EMBED).alert({name:"⚠ Warning", description: "This event does not exist.",embed:embed, seconds:0}, msg, userdata);
          }
      }
      if (gtftools.betweenInt(number, 1, Object.keys(races).length)) {
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata))
      var event = require(gtf.RACE).careerevent(races, number, embed, msg, asyncrace, userdata)
      } else {
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

        var date = new Date()
        var hoursleft = 23 - date.getHours()
        embed.setFooter("Seasonal Events Rotation: " + "~" + hoursleft + "hours")

        pageargs['list'] = list;
				pageargs['text'] = gtftools.formpage(pageargs, embed, msg, userdata);
				gtftools.formpages(pageargs, embed, msg, userdata);
        return
      }

      function asyncrace(event) {
        if (event == "Invalid") {
          return
        }

        var ready = true

        require(gtf.RACE).preparerace(mode, "", "GARAGE", event, args, embed, msg, userdata)
      }
  }
  } 
}
