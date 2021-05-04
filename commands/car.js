var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
var gtf = require("../files/directories");
////////////////////////////////////////////////////

module.exports = {
  name: "car",
  title: "GTF Car Dealership",
  cooldown: 0,
  level: 0,
  channels: ["testing", "gtf-demo"],

  delete: false,
  availinmaint: false,
  requireuserdata: true,
  requirecar: false,
  usedduringrace: false,
  usedinlobby: false,
  description: [
    "!car - Displays the list of makes you can choose from.\n`Lv.XX` represents that the driver level that is required.",
    '!car ["make"] - Displays the list of cars from a ["make"].',
    '!car ["make"] [(number)] - Purchases a car from ["make"], given from the [(number)] associated with the list from its ["make"].',
    '!car ["info"] - Displays info about the GTF Car Dealership command.',
  ],
  execute(msg, query, userdata) {
    try {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var oquery = [...query];
    var args = "";
    var results = "";
    var pageargs = {
      text: "",
      list: "",
      start: "",
      end: "",
      query: oquery,
      command: __filename.split("/").splice(-1)[0].split(".")[0],
      rows: 10,
      page: 0,
      numbers: false,
      reactions: true,
      dm: false,
      footer: "❓ **Select from the makes listed above **",
      special: "",
      other: "",
    };
    //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //

    var sort = "costasc";

    var makelist = require(gtf.CARS).list("makes");
    var number = 0;
    var itempurchase = false;

    if (query[0] === undefined || query[0] == "list") {
      query = [];
    }

    for (var i = 0; i < query.length; i++) {
      if (query[i] == "sort") {
        query.splice(query.indexOf("sort"), 1);
        sort = query[i];
        query.splice(query.indexOf(sort), 1);
      }
    }

    if (query[0] == "info") {
      embed.setTitle("__GTF Car Dealerships: Info__");
      var total = 0;
      for (var makei = 0; makei < makelist.length; makei++) {
        var m = makelist[makei].replace(/,/g, "-");
        total = total + require(gtf.CARS).find({ make: [m] }).length;
      }

      results = "**Total Manufacturers:** " + makelist.length + "\n" + "**Total Cars:** " + total + "\n";
      embed.setDescription(results);
      msg.channel.send(embed);
      return;
    }

    if (query.length === 0) {
      var list = "";
    } else {
      var list = require(gtf.CARS).find({ make: [query[0]], sort: sort });
    }

    var total = list.length;

    if (list.length == 0) {
      list = [];
      if (query.length != 0) {
        if (query[0].length !== 0) {
          require(gtf.EMBED).alert({ name: "⚠ Warning", description: "Invalid arguments.", embed: embed, seconds: 0 }, msg, userdata);

          query.pop();
        }
      }

      for (var makei = 0; makei < makelist.length; makei++) {
        var m = makelist[makei].replace(/,/g, "-");
        var count = require(gtf.CARS).find({ make: [m] }).length;
        list.push([m + " `🚘" + count + "`", " "]);
      }
      embed.setTitle("__GTF Car Dealerships: " + list.length + " Makes" + "__");
      pageargs["list"] = list;
      pageargs["special"] = "Manufacturer";
      pageargs["text"] = gtftools.formpage(pageargs, embed, msg, userdata);
      gtftools.formpages(pageargs, embed, msg, userdata);
      return;
    }
    var make = list[0]["make"];
    var carlist = [];
    for (var i = 0; i < list.length; i++) {
      var fpp = require(gtf.PERF).perf(list[i], "DEALERSHIP")["fpp"];
      var cost = require(gtf.MARKETPLACE).costcalc(list[i], fpp);
      var name = list[i]["name"];
      var year = list[i]["year"];
      carlist.push(["**" + gtftools.numFormat(cost) + emote.credits + "** " + name + " " + year, fpp]);
    }

    if (query.length >= 2) {
      if (query[1] > total || isNaN(query[1]) || query[1] < 0) {
        require(gtf.EMBED).alert({ name: "⚠ Invalid ID", description: "Please use numbers associated with the list above.", embed: embed, seconds: 0 }, msg, userdata);
        query.pop();
      } else {
        itempurchase = true;
        var number = parseInt(query[1]) - 1;
        var item = list[number];
      }
      if (itempurchase) {
        embed.fields = [];
        require(gtf.MARKETPLACE).purchase(msg.member, item, "CAR", embed, msg, userdata);
        return;
      }
    }
    embed.setTitle("__" + make + ": " + carlist.length + " Cars" + "__");
    pageargs["footer"] = "**❓ Select a car from the list above using the numbers associated or the reactions.**";
    pageargs["list"] = carlist;
    pageargs["end"] = emote.fpp;
    pageargs["text"] = gtftools.formpage(pageargs, embed, msg, userdata);
    gtftools.formpages(pageargs, embed, msg, userdata);
    } catch (error) {
      var embed = new Discord.MessageEmbed();
      require(gtf.EMBED).alert({ name: "❌ Unexpected Error", description: "Oops, an unexpected error has occurred.\n" + "**" + error + "**", embed: "", seconds: 0 }, msg, userdata);
      
      throw "DONE"
    }
  } // execute
};
