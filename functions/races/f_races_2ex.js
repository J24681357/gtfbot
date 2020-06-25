var gtf = require("/home/runner/gtfbot/functions/f_gtf");
var stats = require("/home/runner/gtfbot/functions/profile/f_stats");
var emote = require("/home/runner/gtfbot/index");
var gtftools = require("/home/runner/gtfbot/functions/misc/f_tools");
var gtfperf = require("/home/runner/gtfbot/functions/marketplace/f_perf");
var parts = require("/home/runner/gtfbot/functions/marketplace/f_parts");
var exp = require("/home/runner/gtfbot/profile/expprofile");
var fs = require("fs");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////
var gtfreplay = require("/home/runner/gtfbot/functions/replays/f_replay");
var gtfraces = require("/home/runner/gtfbot/functions/races/f_currentraces");
var gtfuser = require("/home/runner/gtfbot/index");
//SSRX//

module.exports.ssrxracelength = function(
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  embed,
  msg,
  args,
  checkpoint,
  id
) {
  var carspeed = gtftools.speedcalc(racesettings["misc"]["car"]);
  var speed = carspeed[0];
  var multiplier = carspeed[1] * 4;
  var showcar =
    "\n🚘 " +
    racesettings["misc"]["car"]["name"] +
    " **" +
    racesettings["misc"]["car"]["FPP"] +
    emote.fpp +
    "**";
  var racelength =
    (((Math.round(racesettings["km"] * 120000) / 10000) * 10000 - 300000) / 2) *
    multiplier;
  return [carspeed, speed, multiplier, showcar, racelength];
};

module.exports.ssrxmiandresults = function(
  speed,
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  embed,
  msg,
  args,
  checkpoint,
  id
) {
  stats.addmileage(racesettings["km"], racesettings["mi"], id);
  // stats.updatecurrentcarclean(-1)
  var results2 =
    "**Top Speed:** " +
    Math.round(speed / 1.609) +
    " MPH / " +
    speed +
    " KMH" +
    "\n" +
    "**Car:** " +
    racesettings["misc"]["car"]["name"] +
    " **" +
    racesettings["misc"]["car"]["FPP"] +
    emote.fpp +
    "**";
  return results2;
};
////CAREER///
module.exports.careerracelength = function(
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  embed,
  msg,
  args,
  checkpoint,
  id
) {
  var showcar =
    "\n🚘 " +
    racesettings["misc"]["car"]["name"] +
    " **" +
    racesettings["misc"]["car"]["FPP"] +
    emote.fpp +
    "**";
  var speed = gtftools.catcalc(racesettings["category"], racesettings["weather"], "");

  var racelength = (racesettings["km"] / speed) * 3600 * 1000;
  return [showcar, racelength];
};
////ARCADE/////

module.exports.arcaderacelength = function(
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  embed,
  msg,
  args,
  checkpoint,
  id
) {
  var showcar = "";
  if (racesettings["misc"]["car"].length != 0) {
    showcar =
      "\n🚘 " +
      racesettings["misc"]["car"]["name"] +
      " **" +
      racesettings["misc"]["car"]["FPP"] +
      emote.fpp +
      "**";
    var speed = gtftools.catcalc(racesettings["category"], racesettings["weather"], racesettings["misc"]["car"]["sell"]);
  } else {
    var speed = gtftools.catcalc(racesettings["category"], racesettings["weather"], "");
  }
  var racelength = (racesettings["km"] / speed) * 3600 * 1000;
  return [showcar, racelength];
};

//////DRIFT

module.exports.driftracelength = function(
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  embed,
  msg,
  args,
  checkpoint,
  id
) {
  var showcar = "";
  if (racesettings["misc"]["car"].length != 0) {
    showcar =
      "\n🚘 " +
      racesettings["misc"]["car"]["name"] +
      " **" +
      racesettings["misc"]["car"]["FPP"] +
      emote.fpp +
      "**";
  }
  var speed = gtftools.catcalc(["N300"], racesettings["weather"], "");
  var racelength = (racesettings["km"] / speed) * 3600 * 1000;
  return [showcar, racelength];
};

module.exports.driftsection = function(
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  embed,
  msg,
  args,
  checkpoint,
  id,
   last
) {
  var difficulty = 60 // low numbers - more difficult
  var score = gtftools.randomInt(0, 100)
  var maxpoints = Math.ceil( ((racesettings["km"]) * 2000) / 1000) * 1000
  var gold = Math.ceil( ((racesettings["km"]) * 2000) / 100) * 100
  var silver = Math.ceil( ((racesettings["km"]* 0.90) * 2000) / 100) * 100
  var bronze = Math.ceil( ((racesettings["km"]* 0.80) * 2000) / 100) * 100


  var points = gtftools.randomInt(Math.round(maxpoints/8), Math.round(maxpoints/4))
  console.log([points, gold, silver, bronze])
  console.log(racesettings["sectors"])
  if (last && racesettings["sectors"] >= 1) {
    racesettings["sectors"]--
    return [points, gold, silver, bronze]
  }
  
  if (racesettings["sectors"] <= 0) {
    points = 0
  }
  
  if (score >= difficulty) {
    points = 0
  } else {
    racesettings["sectors"]--
  }
  console.log(points)
  return [points, gold, silver, bronze];
};

module.exports.driftresults = function(
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  embed,
  msg,
  args,
  checkpoint,
  id
) {
  stats.addmileage(racesettings["km"], racesettings["mi"], id);
  var medal = "COMPLETE"
  let final = require("/home/runner/gtfbot/functions/races/f_races_2ex").driftsection(user,racedetails,racesettings,finalgrid,startingrace,racefinished,embed,msg,args,checkpoint, id, true);
  racesettings["points"] += final[0]
  if (racesettings["points"] >= final[3]) {
    medal = emote.bronzetrophy + " BRONZE"
  }
  if (racesettings["points"] >= final[2]) {
    medal = emote.silvertrophy + " SILVER"
  }
  if (racesettings["points"] >= final[1]) {
    medal = emote.goldtrophy + " GOLD"
  }
  var garage =  "**Car:** " +
    racesettings["misc"]["car"]["name"] +
    " **" +
    racesettings["misc"]["car"]["FPP"] +
    emote.fpp +
    "**";
  var results2 =
    "**" + medal + "**" + "\n" + 
    "**Points:** " + racesettings["points"] + "pts"
   
  return results2;
  
}

////MISC
module.exports.createfinalreactions = function(
  user,
  racedetails,
  racesettings,
  finalgrid,
  startingrace,
  racefinished,
  results2,
  embed,
  msg,
  args,
  checkpoint,
  id
) {
  if (!checkpoint[0]) {
    function func() {
      gtfreplay.save(
        racesettings["title"],
        results2,
        racedetails,
        "__Starting Grid - " +
          racesettings["category"] +
          " | " +
          racesettings["grid"] +
          " cars" +
          "__" +
          "\n" +
          finalgrid +
          "\n",
        id
      );
      embed.setDescription(results2 + "\n\n☑️ Replay saved.");
      embed.setColor(0x8b0000);
      msg.edit(embed);
      gtftools.removereactions(["🎥"], msg);
      fs.writeFile(
        "./users/replays.json",
        JSON.stringify(gtfuser.allreplays),
        function(err, result) {
          if (err) console.log("error", err);
        }
      );
    }

    var emojilist = [["🎥", "🎥", func]];
    function goback() {
      gtfuser.gtfuserdata[id]["raceinprogress"] = [false, ["", ""], "", id];
      var e = racesettings["raceid"].split("-");
      var btevent = require("/home/runner/gtfbot/commands/career");
      msg.channel.messages.fetch().then(messages => {
        var m = messages
          .filter(
            msge =>
              msge.content.includes("**FINISH**") &&
              msge.author.id == gtffile.USERID
          )
          .first();
        m.delete({timeout:1000});
      });
      msg.delete({timeout:1000});
      btevent.execute(msg, [e[0], e[1]], id);
    }

      if (racesettings["mode"] == "CAREER") {
        //stats.updatecurrentcarclean(-1)
        if (!checkpoint[0]) {
          emojilist.push([emote.exit, "gtfexit", goback]);
        }
      }

    gtftools.createreactions(emojilist, msg, id);
  }
};
