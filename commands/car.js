var gtf = require("../functions/f_gtf");
var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");
var gtfperf = require("../functions/marketplace/f_perf");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////

module.exports = {
  name: "car",
  title: "GTF Car Dealership",
  cooldown: 3,
  level: 0,
  channels: ["gtf-mode", "testing", "gtf-test-mode"],

  delete: true,
  availinmaint:false,
  requireuserdata:true,
  requirecar: false,
  usedduringrace: false,
  usedinlobby: false,
  description: ["!car - Displays the list of makes you can choose from.\n`Lv.XX` represents that the driver level that is required.", "!car [\"make\"] - Displays the list of cars from a [\"make\"].", "!car [\"make\"] [(number)] - Purchases a car from [\"make\"], given from the [(number)] associated with the list from its [\"make\"]."],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args = "\n" + "`Args: !car [\"make\"] [(number)]`" + "\n"
    var page = 0
    var results = ""
    var info = "❓ **Select from the makes listed above in words.**"

    /* Setup */
    
    var makelist = require(gtffile.CARS).list("makes")

    var number = 0;
    var itempurchase = false;
    var reactionson = true

    if (query[0] == undefined) {
      query = []
    }


if (query.length == 0) {
  var list = ""
} else {
    var list = require(gtffile.CARS).find({"make":[query[0]]})
}
    
    var total = list.length

    if (list.length == 0) {
      list = []
      if (query.length != 0) {
 if (query[0].length !== 0) {
        require(gtffile.EMBED).warning("⚠ Warning", "Invalid arguments.", embed, msg, userdata);
        query.pop()
    }
      }
     

      for (var makei = 0; makei < makelist.length; makei++) {
        var m = makelist[makei].replace(/,/g, "-")
        var count = require(gtffile.CARS).find({"make":[m]}).length
          list.push([m + " `🚘" + count + "`",  " "])
      }

      list = list.sort()

      results = gtftools.list(list, page, "", "", false, "", 10, userdata);

      embed.setTitle("__GTF Car Dealerships: " + (list.length) + " Makes" + "__");
      embed.setDescription(results);
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
      gtftools.createpages(results, list, page, "", "", false, "", 10, [query,"car", reactionson, info], embed, msg, userdata);
      return
    }
    var make = list[0]["make"]
    var carlist = []
    for (var i = 0; i < list.length; i++) {
      var fpp = gtfperf.perf(list[i], "DEALERSHIP")["fpp"]
      var cost = require(gtffile.MARKETPLACE).costcalc(list[i], fpp)
      var name = list[i]["name"]
      var year = list[i]["year"]
      carlist.push(["**" + gtftools.numFormat(cost) + emote.credits + "** " + name + " " + year, fpp])
    }

if (query.length >= 2) {
     if ( (query[1] > total || isNaN(query[1]) || query[1] < 0)) {
        require(gtffile.EMBED).warning("⚠ Invalid ID", "Please use numbers associated with the list above.", embed, msg, userdata)
        query.pop()
    } else {
      itempurchase = true;
      var number = parseInt(query[1]) - 1
      var item = list[number]
    }
    if (itempurchase) {
      embed.fields = []
      require(gtffile.MARKETPLACE).purchase(msg.member, item, "CAR", embed, msg, userdata)
      return
    }
}
    info = "**❓ Select a car from the list above using the numbers associated or the reactions.**"
    results = gtftools.list(carlist, page, "", emote.fpp, true, "", 10, userdata);
    
    embed.setTitle("__" + make + ": " + (carlist.length) + " Cars" + "__");
    embed.setDescription(results);
    embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
    gtftools.createpages(results, carlist, page, "", emote.fpp, true, "", 10, [query, "car", reactionson, info], embed, msg, userdata)

  }

};
