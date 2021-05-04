var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = require("../files/directories");
//////////////////////////////////////////////////// "testing", "gtf-demo", "⭐"

module.exports = {
  name: "garage",
  title: "My Garage",
  level: 0,
  cooldown: 3,
  aliases: ["g"],
  channels: [],

  delete: false,
  availitoeveryone: true,
  availinmaint: false,
  requireuserdata: true,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: true,
  description: [
    "!garage - Displays the list of all of your cars.\nFPP is displayed for each car.",
    "!garage [view] [(number)] - Views information about a car associated with the [(number)] from the list in your garage.",
    "!garage [(number)] - Selects a car associated with the [(number)] from the list in your garage.",
    "!garage sell [(number)] - Sells a car with its Selling Price. The car is associated with the [(number)] from the list in your garage.",
    "You can also sell a range of cars using **!garage sell** [(number)-(number)].",
  ],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args = "";
    //var args = '\n' + '`Args: !garage [(number)|sell (number)|view (number)|select (number)]`' + '\n';
    var results = "";
    var pageargs = {
      text: "",
      list: "",
      start: "🚘ID:",
      end: emote.fpp,
      query: query,
      command: __filename.split("/").splice(-1)[0].split(".")[0],
      rows: 10,
      page: 0,
      numbers: true,
      reactions: true,
      dm: false,
      footer: "",
      special: "",
      other: "",
    };
    //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //

    var selected = false;
    var purchase = false;
    var viewonly = false;
    var accept = true;
    var regulate = false;
    var command = "garage";

    embed.setTitle("__My Garage: " + stats.garagecount(userdata) + " / " + require(gtf.GTF).garagelimit + " Cars__");

    if (!isNaN(query[0])) {
      query.unshift("select");
      query[1] = parseInt(query[1]);
    }
    if (query[0] == "list") {
      query = [];
    }

    if (query[0] == "sell") {
      selected = true;
      purchase = true;
      var number = query[1];
      var number2 = 0;
      if (number.includes("-")) {
        number = parseInt(query[1].split("-")[0]);
        number2 = parseInt(query[1].split("-")[1]);
      } else {
        number2 = number;
      }

      if (number <= 0 || isNaN(number) || isNaN(number2) || number === undefined || number2 === undefined || number > stats.garagecount(userdata) || number2 > stats.garagecount(userdata) || number2 < number) {
        require(gtf.EMBED).alert({ name: "❌ Invalid ID", description: "This ID does not exist in your garage.", embed: "", seconds: 0 }, msg, userdata);
        return;
      }
      if (number <= stats.currentcarnum(userdata) && number2 >= stats.currentcarnum(userdata)) {
        require(gtf.EMBED).alert({ name: "❌ Invalid ID", description: "You cannot sell your current car.", embed: "", seconds: 0 }, msg, userdata);
        return;
      }
      if (number2 == number) {
        var car = stats.garage(userdata)[number - 1];
        require(gtf.MARKETPLACE).sell(user, car, "CAR", embed, msg, userdata);
      } else {
        require(gtf.MARKETPLACE).sell(user, [number, number2], "CARS", embed, msg, userdata);
      }
    } else if (query[0] == "view") {
      var number = query[1];
      if (number === undefined) {
        number = stats.currentcarnum(userdata);
      }
      if (number <= 0 || isNaN(number) || number > stats.garagecount(userdata)) {
        require(gtf.EMBED).alert({ name: "❌ Invalid ID", description: "This ID does not exist in your garage.", embed: "", seconds: 0 }, msg, userdata);
        return;
      }
      var car = stats.garage(userdata)[number - 1];
      var ocar = require(gtf.CARS).find({ make: [car["make"]], fullname: [car["name"]], year: [car["year"]] })[0];
      results = stats.view(car, userdata);
      stats.addcount(userdata);
      embed.setThumbnail(ocar["image"][0]);
      embed.setDescription(results);
      msg.channel.send(embed).then(msg => {
        function view2() {
          var results2 = stats.view2(car, userdata);
          embed.setDescription(results2);
          msg.edit(embed);
        }
        function view1() {
          embed.setDescription(results);
          msg.edit(embed);
        }

        var emojilist = [
          [emote.leftarrow, "leftarrow", view1],
          [emote.rightarrow, "rightarrow", view2],
        ];

        gtftools.createreactions(emojilist, msg, userdata);
      });
      return;
    } else if (query[0] == "select") {
      selected = true;
      var number = parseInt(query[1]);
      var changecar = stats.setcurrentcar(number, userdata);
      if (changecar == "Invalid") {
        require(gtf.EMBED).alert({ name: "❌ Invalid ID", description: "This ID does not exist in your garage.", embed: "", seconds: 0 }, msg, userdata);
        return;
      } else {
        stats.addcount(userdata);
        var car = stats.garage(userdata)[number - 1];
        if (stats.inlobbystat(userdata)[0]) {
          require(gtf.LOBBY).updateusercar(car, userdata);
        }
        require(gtf.EMBED).success("✅ Success", "Selected the **" + car["name"] + " " + car["fpp"] + emote.fpp + "**" + " `🚘ID:" + number + "`.", 5000, true, embed, msg, userdata);
      }
      return;
    } else if (query[0] == "regulate!🏴") {
      regulate = true;
      stats.addcount(userdata);
      var event = query[1];
      viewonly = true;
      var filter = stats.garage(userdata).filter(function (x) {
        var regulations = require(gtf.GTF).checkregulations(x, event);
        return regulations[0];
      });
      query.pop();
      query.pop();
    }

    if (purchase) {
      return;
    }
    if (selected) {
      embed.fields = [];
      embed.setDescription(results);
      msg.channel.send(embed).then(msg => {
        msg.delete({ timeout: 5000 });
      });
    } else {
      if (viewonly) {
        embed.fields = [];
        if (filter.length != 0) {
          embed.setTitle("❗ **" + filter.length + " Garage Cars Eligible (" + event["title"] + " " + event["eventid"] + ")**");
        } else {
          require(gtf.EMBED).alert({ name: "❌ No Garage Cars Eligible (" + event["title"] + " " + event["eventid"] + ")", description: "No garage cars are eligible for this event.", embed: "", seconds: 0 }, msg, userdata);
          return;
        }
        var list = [];
        var findex = 1;
        var cars = stats.garage(userdata);
        for (var i = 0; i < stats.garagecount(userdata); i++) {
          if (typeof filter[findex - 1] !== "undefined") {
            if (cars[i]["ID"] == filter[findex - 1]["ID"]) {
              list.push(["`🚘ID:" + (i + 1) + "` " + "**" + cars[i]["name"] + "**", cars[i]["fpp"]]);
              findex++;
            }
          }
        }
      } else {
        var list = stats.garage(userdata).map(function (car) {
          return [car["name"], car["fpp"]];
        });
      }
      if (regulate) {
        pageargs["start"] = "";
        pageargs["end"] = emote.fpp;
        pageargs["numbers"] = false;
        pageargs["special"] = "Regulation";
        pageargs["info"] = "❓ **Select a car from the list above that is eligible for this event.**";
        pageargs["list"] = list;

        pageargs["text"] = gtftools.formpage(pageargs, embed, msg, userdata);
        gtftools.formpages(pageargs, embed, msg, userdata);
        return;
      } else {
        pageargs["list"] = list;
        pageargs["other"] = "`";
      }

      embed.setDescription(results);

      pageargs["list"] = list;
      pageargs["text"] = gtftools.formpage(pageargs, embed, msg, userdata);
      gtftools.formpages(pageargs, embed, msg, userdata);
    }
  },
};
