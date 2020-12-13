var gtf = require("../../functions/f_gtf");
var stats = require("../../functions/profile/f_stats");
var emote = require("../../index");
var gtftools = require("../../functions/misc/f_tools");

const Discord = require("discord.js");
var gtffile = process.env
////////////////////////////////////////////////////

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
  userdata
) {
  var numx = gtftools.catcalc(racesettings["category"], "0%", racesettings["misc"]["car"]);
  var carspeed = require(gtffile.PERF).speedcalc(numx)
  var showcar =
    "\n🚘 " +
    racesettings["misc"]["car"]["name"] +
    " **" +
    racesettings["misc"]["car"]["fpp"] +
    emote.fpp +
    "**";
  var racelength = (racesettings["km"] / numx) * 3600 * 1000;
  return [carspeed[0], carspeed[1], showcar, racelength];
};

module.exports.ssrxmiandresults = function(
  [speedmph, speedkmh],
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
  userdata
) {
  stats.addmileage(racesettings["km"], racesettings["mi"], userdata);
  stats.addtotalmileage(racesettings['km'], racesettings['mi'], userdata);
  // stats.updatecurrentcarclean(-1)
  var results2 =
    "**Top Speed:** " +
    speedmph +
    " MPH / " +
    speedkmh +
    " KMH" +
    "\n" +
    "**Car:** " +
    racesettings["misc"]["car"]["name"] +
    " **" +
    racesettings["misc"]["car"]["fpp"] +
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
  userdata
) {
  var showcar =
    "\n🚘 " +
    racesettings["misc"]["car"]["name"] +
    " **" +
    racesettings["misc"]["car"]["fpp"] +
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
  userdata
) {
  var showcar = "";
  if (racesettings["misc"]["car"].length != 0) {
    showcar =
      "\n🚘 " +
      racesettings["misc"]["car"]["name"] +
      " **" +
      racesettings["misc"]["car"]["fpp"] +
      emote.fpp +
      "**";
    var speed = gtftools.catcalc(racesettings["category"], racesettings["weather"], racesettings["misc"]["car"]);
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
  userdata
) {
  var showcar = "";
  if (racesettings["misc"]["car"].length != 0) {
    showcar =
      "\n🚘 " +
      racesettings["misc"]["car"]["name"] +
      " **" +
      racesettings["misc"]["car"]["fpp"] +
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
  userdata,
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
  userdata
) {
  stats.addmileage(racesettings["km"], racesettings["mi"], userdata);
  stats.addtotalmileage(racesettings['km'], racesettings['mi'], userdata);
  var medal = "COMPLETE"
  let final = require("../../functions/races/f_races_2ex").driftsection(user,racedetails,racesettings,finalgrid,startingrace,racefinished,embed,msg,args,checkpoint, userdata, true);
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
    racesettings["misc"]["car"]["fpp"] +
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
  userdata
) {
  if (!checkpoint[0]) {
    function func() {
      console.log("start")
      require(gtffile.REPLAY).savem( racesettings["title"],results2,racedetails,"__Starting Grid - " +
          racesettings["category"] +
          " | " +
          racesettings["grid"] +
          " cars" +
          "__" +
          "\n" +
          finalgrid +
          "\n",
        userdata
      );
      embed.setDescription(results2 + "\n" + racedetails + "\n\n☑️ Replay saved.");
      embed.setColor(0x8b0000);
      msg.edit(embed);
      gtftools.removereactions(["🎥"], msg);
    }

    var emojilist = [["🎥", "🎥", func]];
    function goback() {
      userdata["raceinprogress"] = [false, ["", ""], "", userdata["id"]];
      var e = racesettings["raceid"].split("-");
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
      if (racesettings["title"].includes("Seasonal Event")) {
        var btevent = require("../../commands/seasonal");
        btevent.execute(msg, [e[1]], userdata);
      }else {
      var btevent = require("../../commands/career");
      btevent.execute(msg, [e[0], e[1]], userdata);
      }
    }

      if (racesettings["mode"] == "CAREER") {
        //stats.updatecurrentcarclean(-1)
        if (!checkpoint[0]) {
          emojilist.push([emote.exit, "gtfexit", goback]);
        }
      }

    gtftools.createreactions(emojilist, msg, userdata);
  }
};
