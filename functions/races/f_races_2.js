var gtf = require("/home/runner/gtfbot/functions/f_gtf");
var stats = require("/home/runner/gtfbot/functions/profile/f_stats");
var emote = require("/home/runner/gtfbot/index");
var gtftools = require("/home/runner/gtfbot/functions/misc/f_tools");
var gtfperf = require("/home/runner/gtfbot/functions/marketplace/f_perf");
var parts = require("/home/runner/gtfbot/functions/marketplace/f_parts");
var exp = require("/home/runner/gtfbot/profile/expprofile");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////
var gtfreplay = require("/home/runner/gtfbot/functions/replays/f_replay");
var gtfraces = require("/home/runner/gtfbot/functions/races/f_currentraces");
var race2ex = require("/home/runner/gtfbot/functions/races/f_races_2ex");
var gtfuser = require("/home/runner/gtfbot/index");
var fs = require("fs");

module.exports.readysetgo = function(
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
  startingrace = true;
  var results2 = " ";
  var index = 0;
  var points = 0;
  var showcar = "";
  var time = 3 * 1000;
  var racelength = 0;
  var startracetime = 4000;
  var resumerace = "";
  var progressbarblackarcolor = stats.setting("PROGRESSBAR", id)[0];
  var progressbarblack = stats.setting("PROGRESSBAR",id)[1]

  var lights = [
    [
      emote.redlightb,
      emote.yellowlightb,
      emote.yellowlightb,
      emote.greenlightb
    ],
    [emote.redlight, emote.yellowlightb, emote.yellowlightb, emote.greenlightb],
    [emote.redlightb, emote.yellowlight, emote.yellowlightb, emote.greenlightb],
    [emote.redlightb, emote.yellowlightb, emote.yellowlight, emote.greenlightb],
    [emote.redlightb, emote.yellowlightb, emote.yellowlightb, emote.greenlight]
  ];
  var ready = [
    "**READY**\n",
    "➖  **3**  ➖",
    "➖  **2**  ➖",
    "➖  **1**  ➖",
    "**  START **"
  ];
  var start = [progressbarblack,progressbarblack,progressbarblack,progressbarblack,progressbarblack,progressbarblack,progressbarblack,progressbarblack,progressbarblack,progressbarblack,progressbarblack,progressbarblack,progressbarblack,progressbarblack,progressbarblack,"🏁"];
  var results3 = start.join("");
  embed.fields = [];

    if (racesettings["mode"] == "SSRX") {
      let ssrx1 = race2ex.ssrxracelength(
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
      );
      var carspeed = ssrx1[0];
      var speed = ssrx1[1];
      var multiplier = ssrx1[2];
      showcar = ssrx1[3];
      racelength = ssrx1[4];
    }else if (racesettings["mode"] == "CAREER") {
      let career1 = race2ex.careerracelength(
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
      );
      var showcar = career1[0];
      racelength = career1[1];
    }else if (racesettings["mode"] == "ARCADE") {
      let arcade1 = race2ex.arcaderacelength(
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
      );
      var showcar = arcade1[0];
      racelength = arcade1[1];
    }else if (racesettings["mode"] == "DRIFT") {
      let drift1 = race2ex.driftracelength(
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
      );
      var showcar = drift1[0];
      racelength = drift1[1];
  }

  if (!checkpoint[0]) {
    var totaltime = new Date().getTime() + racelength + 4000;
    gtfuser.gtfuserdata[id]["raceinprogress"] = [
      true,
      [msg.channel.id, msg.id],
      totaltime,
      id
    ];
    gtftools.removereactions(
      ["flag", "trackgtfitness", "gtfcargrid", "❓"],
      msg
    );
    stats.addracedetails(racesettings, racedetails, finalgrid, args, id);
  } else {
    var totaltime = gtfuser.gtfuserdata[id]["raceinprogress"][2];
    resumerace =
      "\n⚠ Bot has restarted while in progress. Reactions will not appear in the race results.";
    startracetime = 0;
    racelength = totaltime - new Date().getTime() - 4000;
  }

  var results = function(index) {
    return (
      lights[index][0] +
      "➖➖➖" +
      lights[index][0] +
      "\n" +
      lights[index][1] +
      ready[index] +
      lights[index][1] +
      "\n" +
      lights[index][2] +
      "➖➖➖" +
      lights[index][2] +
      "\n" +
      lights[index][3] +
      "➖➖➖" +
      lights[index][3]
    );
  };
  index++;

  gtftools.interval(
    function() {
      var starttime = "";
      if (index == 4) {
        starttime =
          "\n~" +
          gtftools.milltominandsecs(racelength) +
          " minutes" +
          showcar +
          resumerace;
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
  
  setTimeout(function() {
    var check = function() {
      if (gtfuser.gtfuserdata[id]["raceinprogress"][2] == "EXIT") {
 
      }
      var currenttime = new Date().getTime();
      timeleft = totaltime - currenttime;
      temptime = timeleft;
      tempindex = 0;
      
      if (gtfuser.gtfuserdata[id]["raceinprogress"][2] <= currenttime) {
        clearInterval(progress)
        gtfuser.gtfuserdata[id]["raceinprogress"] = [
          false,
          ["", ""],
          undefined,
          id
        ];
        msg.delete({timeout:1});

        stats.removeracedetails(id)
        startingrace = false;
        racefinished = true;

          if (racesettings["mode"] == "SSRX") {
            let ssrx2 = race2ex.ssrxmiandresults(
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
            );
            var results2 = ssrx2;
          } else if (racesettings["mode"] == "DRIFT") {
               let drift2 = race2ex.driftresults(user,racedetails,racesettings,finalgrid,startingrace,racefinished,embed,msg,args,checkpoint, id, racesettings["points"]);
            var results2 = drift2
      } else {
            results2 = require(gtffile.RACE).start(racesettings, racedetails, user, id);
        }
    if (racesettings["mode"] == "CAREER") {
            gtftools.interval(function() {
              var achieve = stats.isracescomplete(racesettings["raceid"].split("-").slice(0, -1).join("-"), racesettings["eventlength"], 1, id)
              if (achieve) {
                stats.eventcomplete(racesettings["raceid"].split("-").slice(0, -1).join("-"), id)
                stats.gift(emote.goldmedal + " Congrats! All GOLD in " + racesettings["title"].split(" - ")[0] + " " + emote.goldmedal, racesettings["prize"], "RANDOMCAR", embed, msg, id)
              }
          }, 3000, 1)
            }  

        embed.setDescription(results2 + "\n\n" + racedetails);
       
        if (racesettings["misc"]["car"] == "") {
          var field2 = args
        } else {
        var field2 =  args + stats.currentcarmain(id)
        }
        
        embed.addField(stats.main(id));
        gtfuser.gtfuserdata[id]["raceinprogress"] = [
          false,
          ["", ""],
          undefined,
          id
        ];
        
        msg.channel.send("<@" + id + ">" + " **FINISH**",embed).then(msg => {
          race2ex.createfinalreactions(
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
          );
        });
        return
      } else {
        for (temptime; temptime <= racelength; ) {
          start[tempindex - 1] = progressbarblackarcolor;
          tempindex += 1;
          temptime += timedivide;
        }
        results3 = start.join("");
      }
    };

    var progress = setInterval(function() {
      check();
        embed.setDescription(results3 +"\n" +
          " ~" +gtftools.milltominandsecs(timeleft) + " minutes" + showcar + resumerace
      );
            if (racesettings["mode"] == "DRIFT") {
              let drift1 = race2ex.driftsection(user,racedetails,racesettings,finalgrid,startingrace,racefinished,embed,msg,args,checkpoint, id, false);
              var icon = emote.transparent
              if (drift1[0] > 0) {
                icon = emote.driftflag
              }
              racesettings["points"] += drift1[0]
              embed.setDescription( results3 + "\n" + 
              icon + " **" + racesettings["points"] + "pts**" + " ~" + gtftools.milltominandsecs(timeleft) + " minutes" + showcar + resumerace
        );
            }
      msg.edit(embed).catch(function(){
        clearInterval(progress);
        console.log("Race has ended. (Message is not there.)");
        gtfuser.gtfuserdata[id]["raceinprogress"] = [false, ["", ""], undefined, id];
        return;
      })
      
      if (gtfuser.gtfuserdata[id]["raceinprogress"][2] != "EXIT") {
        gtfuser.gtfuserdata[id]["raceinprogress"] = [
          true,
          [msg.channel.id, msg.id],
          totaltime,
          id
        ];
      }
    }, racelength / 10);
  }, startracetime);
};
