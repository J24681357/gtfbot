var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");

const Discord = require("discord.js");
var gtf = require("../../files/directories");
////////////////////////////////////////////////////
var race2ex = require("../../functions/races/f_races_2ex");

module.exports.readysetgo = function (user, racedetails, racesettings, finalgrid, startingrace, racefinished, embed, msg, args, checkpoint, userdata) {
  startingrace = true;
  var results2 = " ";
  var index = 0;
  var points = 0;
  var showcar = "";
  var time = 3 * 1000;
  var racelength = 0;
  var startracetime = 4000;
  var resumerace = "";
  var progressbarblackarcolor = stats.setting("PROGRESSBAR", userdata)[0];
  var progressbarblack = stats.setting("PROGRESSBAR", userdata)[1];

  var lights = [
    [emote.redlightb, emote.yellowlightb, emote.yellowlightb, emote.greenlightb],
    [emote.redlight, emote.yellowlightb, emote.yellowlightb, emote.greenlightb],
    [emote.redlightb, emote.yellowlight, emote.yellowlightb, emote.greenlightb],
    [emote.redlightb, emote.yellowlightb, emote.yellowlight, emote.greenlightb],
    [emote.redlightb, emote.yellowlightb, emote.yellowlightb, emote.greenlight],
  ];
  var ready = ["**READY**\n", "➖  **3**  ➖", "➖  **2**  ➖", "➖  **1**  ➖", "**  START **"];
  var start = [progressbarblack, progressbarblack, progressbarblack, progressbarblack, progressbarblack, progressbarblack, progressbarblack, progressbarblack, progressbarblack, progressbarblack, progressbarblack, progressbarblack, progressbarblack, progressbarblack, progressbarblack, "🏁"];
  var results3 = start.join("");
  embed.fields = [];

  if (racesettings["type"] == "TIME") {
    racelength = 3600000
  }

  if (racesettings["mode"] == "SSRX") {
    let ssrx1 = race2ex.ssrxracelength(user, racedetails, racesettings, finalgrid, startingrace, racefinished, embed, msg, args, checkpoint, userdata);
    var speedmph = ssrx1[0];
    var speedkmh = ssrx1[1];
    showcar = ssrx1[2];
    racelength = ssrx1[3];
  } else if (racesettings["mode"] == "CAREER") {
    let career1 = race2ex.careerracelength(user, racedetails, racesettings, finalgrid, startingrace, racefinished, embed, msg, args, checkpoint, userdata);
    var showcar = career1[0];
    racelength = career1[1];
  } else if (racesettings["mode"] == "ARCADE") {
    let arcade1 = race2ex.arcaderacelength(user, racedetails, racesettings, finalgrid, startingrace, racefinished, embed, msg, args, checkpoint, userdata);
    var showcar = arcade1[0];
    racelength = arcade1[1];
  } else if (racesettings["mode"] == "ONLINE") {
    let online1 = race2ex.onlineracelength(user, racedetails, racesettings, finalgrid, startingrace, racefinished, embed, msg, args, checkpoint, userdata);
    var showcar = online1[0];
    racelength = online1[1];
  } else if (racesettings["mode"] == "DRIFT") {
    racesettings["sectors"] = racesettings["originalsectors"];
    racesettings["points"] = 0;
    let drift1 = race2ex.driftracelength(user, racedetails, racesettings, finalgrid, startingrace, racefinished, embed, msg, args, checkpoint, userdata);
    var showcar = drift1[0];
    racelength = drift1[1];
  }

  if (!checkpoint[0]) {
    var totaltime = new Date().getTime() + racelength + 4000;
    userdata["raceinprogress"] = [true, [msg.channel.id, msg.id], totaltime, userdata["id"]];
    gtftools.removereactions(["flag", "trackgtfitness", "gtfcargrid", "❓"], msg);
    stats.addracedetails(racesettings, racedetails, finalgrid, args, userdata);

    stats.save(userdata);
  } else {
    var totaltime = userdata["raceinprogress"][2];
    resumerace = "";
    startracetime = 0;
    index = 4
    racelength = totaltime - new Date().getTime() - 4000;
  }

  var results = function (index) {
    return lights[index][0] + "➖➖➖" + lights[index][0] + "\n" + lights[index][1] + ready[index] + lights[index][1] + "\n" + lights[index][2] + "➖➖➖" + lights[index][2] + "\n" + lights[index][3] + "➖➖➖" + lights[index][3];
  };
  index++;
  gtftools.interval(
    function () {
      console.log(index)
      var starttime = "";
      if (index == 4) {
        index = 4
        starttime = "\n~" + gtftools.milltominandsecs(racelength) + " minutes" + showcar + resumerace;
      }
      if (index == 5) {
        index = 5
        starttime = "\n~" + gtftools.milltominandsecs(racelength) + " minutes" + showcar + resumerace;
        embed.setDescription("**❗ Bot has restarted while in a race. Bar will appear when refreshed.**" +  starttime);
        msg.edit(embed);
        return
      }
      embed.setDescription(results(index) + starttime);
      msg.edit(embed);
      index++;
    },
    1000,
    4
  );
  var currenttime = new Date().getTime();
  var timeleft = totaltime - currenttime;
  var temptime = timeleft;
  var tempindex = 0;
  var timedivide = racelength / (start.length - 1);

  setTimeout(function () {
    var check = function () {
      if (userdata["raceinprogress"][2] == "EXIT") {
      }
      var currenttime = new Date().getTime();
      timeleft = totaltime - currenttime;
      temptime = timeleft;
      tempindex = 0;

      if (userdata["raceinprogress"][2] <= currenttime) {
        clearInterval(progress);
        userdata["raceinprogress"] = [false, ["", ""], undefined, userdata["id"]];
        msg.delete({ timeout: 1500 });

        stats.removeracedetails(userdata);
        startingrace = false;
        racefinished = true;

        if (racesettings["mode"] == "SSRX") {
          let ssrx2 = race2ex.ssrxmiandresults([speedmph, speedkmh], user, racedetails, racesettings, finalgrid, startingrace, racefinished, embed, msg, args, checkpoint, userdata);
          var results2 = ssrx2;
        } else if (racesettings["mode"] == "DRIFT") {
          let drift2 = race2ex.driftresults(user, racedetails, racesettings, finalgrid, startingrace, racefinished, embed, msg, args, checkpoint, userdata, racesettings["points"]);
          var results2 = drift2;
        } else if (racesettings["mode"] == "ONLINE") {
          results2 = require(gtf.RACE).startonline(racesettings, racedetails, user, userdata);
        } else {
          results2 = require(gtf.RACE).start(racesettings, racedetails, user, userdata);
        }

        if (racesettings["mode"] == "ONLINE") {
          embed.setDescription(results2);
        } else {
          embed.setDescription(results2 + "\n\n" + racedetails);
        }

        if (racesettings["misc"]["car"] == "") {
          var field2 = emote.transparent;
        } else {
          var field2 = stats.currentcarmain(userdata);
        }
        userdata["raceinprogress"] = [false, ["", ""], undefined, userdata["id"]];
        var ping = "<@" + userdata["id"] + ">";
        if (racesettings["mode"] == "ONLINE") {
          var role = msg.guild.roles.cache.find(r => r.name === "lobby-" + userdata["id"]);
          ping = "<@&" + role["id"] + ">";
        } else {
          embed.addField(stats.main(userdata), field2);
        }
        msg.channel.send(ping + " **FINISH**", embed).then(msg2 => {
          race2ex.createfinalreactions(user, racedetails, racesettings, finalgrid, startingrace, racefinished, results2, embed, msg2, args, checkpoint, userdata);
          if (racesettings["mode"] == "CAREER") {
            gtftools.interval(
              function () {
                var achieve = stats.isracescomplete(racesettings["raceid"].split("-").splice(0, 2).join("-"), racesettings["eventlength"], 1, userdata);
                if (achieve) {
                  stats.eventcomplete(racesettings["raceid"], userdata);
                  stats.gift(emote.goldmedal + " Congrats! All GOLD in " + racesettings["title"].split(" - ")[0] + " " + emote.goldmedal, racesettings["prize"], embed, msg, userdata);
                }
              },
              3000,
              1
            );
          }
        });

        stats.save(userdata);
        return;
      } else {
        for (temptime; temptime <= racelength; ) {
          start[tempindex - 1] = progressbarblackarcolor;
          tempindex += 1;
          temptime += timedivide;
        }
        results3 = start.join("");
      }
    };

    var progress = setInterval(function () {
      check();
      embed.setDescription(results3 + "\n" + " ~" + gtftools.milltominandsecs(timeleft) + " minutes" + showcar + resumerace);
      if (racesettings["mode"] == "DRIFT") {
        let drift1 = race2ex.driftsection(user, racedetails, racesettings, finalgrid, startingrace, racefinished, embed, msg, args, checkpoint, userdata, false);
        var icon = emote.transparent;
        if (drift1[0] > 0) {
          icon = emote.driftflag;
        }
        racesettings["points"] += drift1[0];
        embed.setDescription(results3 + "\n" + icon + " **" + racesettings["points"] + "pts**" + " ~" + gtftools.milltominandsecs(timeleft) + " minutes" + showcar + resumerace);
      }
      msg.edit(embed).catch(function () {
        clearInterval(progress);
        console.log("Race has ended. (Message is not there.)");
        userdata["raceinprogress"] = [false, ["", ""], undefined, userdata["id"]];
        return;
      });

      if (userdata["raceinprogress"][2] != "EXIT") {
        userdata["raceinprogress"] = [true, [msg.channel.id, msg.id], totaltime, userdata["id"]];
      }
    }, racelength / 10);
  }, startracetime);
};
