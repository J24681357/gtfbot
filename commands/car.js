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

module.exports = {
  name: "car",
  title: "GTF Car Dealership",
  cooldown: 3,
    level: 0,
  delete: true,
  
  requirecar: false,
  usedduringrace: false,
  usedinlobby: false,
  description: ["!car - Displays the list of makes you can choose from.\n`Lv.XX` represents that the driver level that is required.", "!car [\"make\"] - Displays the list of cars from a [\"make\"].", "!car [\"make\"] [(number)] - Purchases a car from [\"make\"], given from the [(number)] associated with the list from its [\"make\"]."],
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = "\n" + "`Args: !car [\"make\"] [(number)]`" + "\n"
    var makelist = [[require(gtffile.CARS).bmakes(), ""], [require(gtffile.CARS).amakes(), 6], [require(gtffile.CARS).icmakes(), 11], [require(gtffile.CARS).ibmakes(), 21], [require(gtffile.CARS).iamakes(), 31]]
    /* Setup */

    var results = " ";
    var page = 0;
    var number = 0;
    console.log(query)

    var list = require(gtffile.CARS).find(query[0], embed, msg, msgauthorid)
    
    if (list == "Invalid") {
      return
    }
    if (list[0] == "") {
      list = []
      if (query.length !== 0) {
        require(gtffile.EMBED).warning("⚠ Warning", "Invalid arguments.", embed, msg, msgauthorid);
    }

      for (var makei = 0; makei < makelist.length; makei++) {
        var extra = ""
        if (makelist[makei][1] != "") {
          extra = emote.exp + "`Lv." + makelist[makei][1] + "`"
        }

        for (var j = 0; j < makelist[makei][0].length; j++) {
          list.push([makelist[makei][0][j] + " " + extra, " "])
        }
      }
      list = list.sort()
      list.push(["GT4", " "])
      list.push(["GT3", " "])
      results = gtftools.list(list, page, "", "", false, "", 10, msgauthorid);

      embed.setTitle("__GTF Car Dealerships: " + (list.length-2) + " Makes" + "__");
      embed.setDescription(results + "\n" + "❓ **Select from the makes listed above in words.**");
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
      gtftools.createpages(results, list, page, "", "", false, "", 10, [query,"car"], embed, msg, msgauthorid);
      return
    }
    
    var carlist = list[0]
    
    var make = list[1]
    var cost = list[2]
    var total = carlist.length
    var reducedcost = Math.round(cost - (cost * Math.log10(total) * 0.20));
reducedcost = Math.ceil((reducedcost + 1) / 100) * 100;
    embed.setTitle("__" + make + " Dealership: " + total + " Cars" + "__");
        var fpp = ""
  if (!list[3]) {
    var simplecarlist = gtf.dealercarslist(carlist,make,cost)
    if (query[1] > total || isNaN(query[1]) || query[1] < 0) {
      if (query.length != 1) {
        require(gtffile.EMBED).warning("⚠ Invalid ID", "Please use numbers associated with the list above.", embed, msg, msgauthorid)
      }
    } else {
      var itempurchase = true;
      number = parseInt(query[1]) - 1
      var item = simplecarlist[number]
    }
    if (itempurchase) {
      embed.fields = []
      require(gtffile.MARKETPLACE).purchase(msg.member, item, "CAR", embed, msg, msgauthorid)
      return
    }
    
    var templist = simplecarlist.map(function(x){
      var calc = gtfperf.dealershipcalc(x, 0)[1]
      x[0] = "**" + x[1][2].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "**" + emote.credits + " " + x[0] + " " + x[5].replace("⭐1 ", " ")
      x[1] = "~" + calc
      return x.slice(0,2)
    })
  } else {
    var simplecarlist = list[0]
    if (query[1] > total || isNaN(query[1]) || query[1] < 0) {
      if (query.length != 1) {
        require(gtffile.EMBED).warning("⚠ Invalid ID", "Please use numbers associated with the list above.", embed, msg, msgauthorid)
      }
    } else {
      var itempurchase = true;
      number = parseInt(query[1]) - 1
      var item = simplecarlist[number]
    }
    if (itempurchase) {
      embed.fields = []
      require(gtffile.MARKETPLACE).purchase(msg.member, item, "CAR", embed, msg, msgauthorid)
      return
    }
    var templist = simplecarlist.map(function(x){
       var calc = gtfperf.dealershipcalc(x, 0)[1]
      x[0] = "**" + x[1][2].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "**" + emote.credits + " " + x[0] + " " + x[5].replace("⭐1", "")
      x[1] = "~" + calc
      return x.slice(0,2)
    })
  }
    results = gtftools.list(templist, page, "", emote.fpp, true, "", 10, msgauthorid);

    embed.setDescription(results);
    embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
    gtftools.createpages(results, templist, page, "", emote.fpp, true, "", 10, [query, "car"], embed, msg, msgauthorid)

  }

};
