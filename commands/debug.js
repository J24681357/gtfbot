var stats = require("../functions/profile/f_stats");
var emote = require("../index");
var gtftools = require("../functions/misc/f_tools");

const Discord = require("discord.js");
var gtf = process.env;
////////////////////////////////////////////////////
var fs = require("fs");

module.exports = {
  name: "debug",
  title: "DEBUG",
  cooldown: 3,
  level: 0,
  channels: ["gtf-demo","testing"],

  delete: false,
  availitoeveryone:true,
  availinmaint: false,
  requireuserdata: false,
  requirecar: false,
  usedduringrace: true,
  usedinlobby: true,
  description: [
    "!debug - (ADMIN ONLY) This command is only used for testing purposes."
  ],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.author.username;
    embed.setAuthor(
      user,
      msg.author.displayAvatarURL()
    );
    var args = "\n" + "`SPECIAL PURPOSES`" + "\n";
    var page = 0
    var results = ""
    var info = ' '
        //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //

    var extra = emote.transparent;
    var deletee = false;

    let MongoClient = require("mongodb").MongoClient;
    var url =
      "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF";
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      g();
    });
    function g() {
      if (userdata["id"] != "237450759233339393") {
        return msg.channel.send("No.");
      }
      results = "";
      var success = false;
      if (msg.mentions.users.first() !== undefined) {
        var id = msg.mentions.users.first().id;
      } else {
        var id = userdata["id"];
      }

      if (query[0] == "updatecommandslist") {
        var success = true;
        var extra = require("../functions/misc/f_extras");
        return;
      }
      if (query[0] == "updateseasonals" || query[0] == "changeseasonals" ) {
        var success = true;
        require(gtf.SEASONAL).changeseasonals(true)
      }

      if (query[0] == "arcaderacelength") {
        var success = true;
        var racemode = query[1];
        var racesettings = require(gtf.RACE).setrace(query[1], "ARCADE");
        var speed = gtftools.catcalc(
          racesettings["category"],
          racesettings["weather"],
          ""
        );
        var racelength = (racesettings["km"] / speed) * 3600 * 1000;

        var extra =
          "\n**Estimated Time:** " +
          "~" +
          gtftools.milltominandsecs(racelength) +
          " minutes" +
          "\n" +
          "**Track:** " +
          racesettings["track"] +
          "\n" +
          "**Time/Weather:** " +
          racesettings["time"] +
          " | " +
          racesettings["weather"] +
          "\n" +
          "**Lap(s):** " +
          racesettings["laps"] +
          "\n" +
          "**Total Distance:** " +
          racesettings["km"] +
          " km" +
          " | " +
          racesettings["mi"] +
          " mi" +
          "\n" +
          "**Grid:** " +
          racesettings["category"].join(" ") +
          " | " +
          racesettings["grid"];
      }
      if (query[0] == "maintenance") {
        success = true;
        if (require(gtf.MAIN).gtfbotconfig["maintenance"] == "YES") {
          require(gtf.MAIN).gtfbotconfig["maintenance"] = "NO";
        } else {
          require(gtf.MAIN).gtfbotconfig["maintenance"] = "YES";
        }
        setTimeout(function() {
          require("../commands/restart").execute(msg, [""], userdata);
        }, 1000);
      }
      if (query[0] == "partialmaintenance") {
        success = true;
        if (require(gtf.MAIN).gtfbotconfig["maintenance"] == "PARTIAL") {
          require(gtf.MAIN).gtfbotconfig["maintenance"] = "NO";
        } else {
          require(gtf.MAIN).gtfbotconfig["maintenance"] = "PARTIAL";
        }
        setTimeout(function() {
          require("../commands/restart").execute(msg, [""], userdata);
        }, 1000);
      }

      if (query[0] == "addcredits") {
        success = true;
        stats.addcredits(parseInt(query[1]), userdata);
      }
      
      if (query[0] == "removecredits") {
        success = true;
        stats.addcredits(-parseInt(query[1]), userdata);
        results = "Success.";
      }
      if (query[0] == "setcredits") {
        success = true;
        userdata["credits"] = parseInt(query[1]);
      }
      ///GIFTS
      if (query[0] == "giftcredits") {
        success = true;
        stats.addgift(
          query[1] + emote.credits,
          query[1],
          "CREDITS",
          "USERNAME",
          true,
          userdata
        );
      }
      if (query[0] == "giftrandomcar") {
        success = true;
        var car = require(gtf.CARS).random({}, 1)[0]
          stats.addgift(
          car["name"],
          car,
          "CAR",
          "USERNAME",
          true,
          userdata
        );
        results =
          "`" +
          query[0] +
          "` success to " +
          msg.author.username +
          "." +
          "\n" +
          "Added new car to gifts.";
      }
      if (query[0] == "cleargifts") {
        success = true;
        userdata["gifts"] = [];
      }
      if (query[0] == "dailyworkoutoff") {
        success = true;
        userdata["dailyworkout"] = false
      }
      if (query[0] == "dailyworkouton") {
        success = true;
        userdata["dailyworkout"] = true
      }
      if (query[0] == "forcecancel") {
        success = true;
        userdata["raceinprogress"] = [false, ["", ""], 0, id];
      }
      if (query[0] == "forcelobbycancel") {
        success = true;
        userdata["inlobby"] = [false, ""];
      }
      if (query[0] == "deleteprofile") {
        success = true;
        deletee = true;
      }
      if (query[0] == "cleargarage") {
        success = true;
        userdata["garage"] = [];
        userdata["currentcarnum"] = 0
      }
      if (query[0] == "addrandomcar") {
        success = true;
        var prizes = require(gtf.CARS).randomcars(
          ["Any"],
          [""],
          parseInt(query[1])
        );
        for (var i = 0; i < prizes.length; i++) {
          var item = prizes[i];
          var name = item[0];
          var costtoperf = item[1][1];
          var make = item[3];

          stats.addcar(name, make, costtoperf, undefined, userdata);
        }
        results =
          "`" +
          query[0] +
          "` success to " +
          msg.guild.members.cache.get(userdata).user.username +
          "." +
          "\n" +
          "Added " +
          query[1] +
          " random cars to garage.";
      }
       if (query[0] == "setmileage") {
        success = true;
        userdata["mileage"] = [query[1], query[1]]
        results = "Success.";
      }
      if (query[0] == "addmileage") {
        success = true;
        stats.addmileage(query[1], query[1], userdata);
        results = "Success.";
      }
      if (query[0] == "setexp") {
        success = true;
        userdata["exp"] = query[1]
        results = "Success.";
      }
      if (query[0] == "addexp") {
        success = true;
        stats.addexp(parseInt(query[1]), userdata);
        results = "Success.";
      }
      if (query[0] == "resetexp") {
        success = true;
        userdata["exp"] = 0
        userdata["level"] = 0
         results = "Success.";
      }

      if (query[0] == "resetexplevel") {
        success = true;
        userdata["level"] = 0
        results = "Success.";
      }
      if (query[0] == "careergift") {
        success = true;
        if (!query[1].includes("-")) {
          return;
        }
        if (query[1].split("-")[0] == "B") {
          var races = require("../data/career/races").beginner();
        }
        if (query[1].split("-")[0] == "A") {
          var races = require("../data/career/races").amateur();
        }
        if (query[1].split("-")[0] == "IC") {
          var races = require("../data/career/races").icleague();
        }
        if (query[1].split("-")[0] == "IB") {
          var races = require("../data/career/races").ibleague();
        }
        if (query[1].split("-")[0] == "IA") {
          var races = require("../data/career/races").ialeague();
        }

        var event = races[Object.keys(races)[query[1].split("-")[1] - 1]];
        var tracks = event["tracks"];
        var track = require(gtf.TRACKS).find({"name":tracks[1]})[0]
        var racesettings = require(gtf.RACE).setcareerrace(
          event,
          track,
          stats.currentcar(userdata),
          0
        );
        stats.gift(
          emote.goldmedal +
            " Congrats! All GOLD in " +
            racesettings["title"].split(" - ")[0] +
            " " +
            emote.goldmedal,
          racesettings["prize"],
          embed,
          msg,
          userdata
        );

        results = "Success.";
      }
      if (success) {
        results =
          "`" +
          query[0] +
          "` success to " +
          msg.guild.members.cache.get(userdata["id"]).user.username +
          "." +
          "\n" +
          extra;
        embed.setDescription(results);
        //embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
        if (deletee) {
          stats.save(userdata, "DELETE")
        } else {
      stats.save(userdata)
        return msg.channel.send(embed);
        }
      } else {
        require(gtf.EMBED).alert({name:"❌ Invalid", description: 'Invalid command.', embed:"", seconds:0}, msg, userdata);
        return
      }
    }
  }
};
