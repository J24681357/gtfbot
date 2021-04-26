var stats = require('../../functions/profile/f_stats');
var emote = require('../../index');
var gtftools = require('../../functions/misc/f_tools');

const Discord = require('discord.js');
var gtf = require('../../files/directories');
////////////////////////////////////////////////////

module.exports.setrace = function(racemode, mode, track) {
  if (racemode == 'beginner') {
    var title = 'Arcade Mode - Beginner';
    var track = require(gtf.TRACKS).random({}, 1)[0]
    var km = track["length"];
    var limit = 10.0;
    var time = require(gtf.TIME).random({}, 1)[0]
    var weather = require(gtf.WEATHER).random({}, 1)[0]

    var grid = ['8', '9', '10', '11', '12'];
    var category = [['N100'], ['N200'], ['N300'], ['Gr.4'], ['N100', 'N200'], ['N200', 'N300']];
    var place = [emote.gold + ' 1st|1000', emote.silver + ' 2nd|800', emote.bronze + ' 3rd|600', '4th|500', '5th|400', '6th|300', '7th|200', '8th|100'];
    var chance = 60;
    var clean = 5;
  } else if (racemode == 'amateur') {
    var title = 'Arcade Mode - Amateur';
    var track = require(gtf.TRACKS).random({}, 1)[0]
    var km = track["length"];
    var limit = 15.0;
    var time = require(gtf.TIME).random({}, 1)[0]
    var weather = require(gtf.WEATHER).random({}, 1)[0]
    var grid = ['10', '11', '12', '13', '14', '15', '16'];
    var category = [['N300'], ['N400'], ['N500'], ['N600'], ['Gr.4'], ['Gr.B'], ['Gr.3'], ['N300', 'N400'], ['N400', 'N500'], ['N500', 'N600']];
    var place = [emote.gold + ' 1st|2500', emote.silver + ' 2nd|2000', emote.bronze + ' 3rd|1500', '4th|1300', '5th|1100', '6th|900', '7th|700', '8th|500', '9th|400', '10th|300'];
    var chance = 55;
    var clean = 4;
  } else if (racemode == 'professional') {
    var title = 'Arcade Mode - Professional';
    var track = require(gtf.TRACKS).random({}, 1)[0]
    var km = track["length"];
    var limit = 30.0;
    var time = require(gtf.TIME).random({}, 1)[0]
    var weather = require(gtf.WEATHER).random({}, 1)[0]
    var grid = ['12', '13', '14', '15', '16', '17', '18', '19', '20'];
    var category = [['N700'], ['N800'], ['N1000'], ['Gr.4'], ['Gr.B'], ['Gr.3'], ['Gr.2'], ['Gr.1'], ['N700', 'N800'], ['N800', 'N900', 'N1000']];
    var place = [emote.gold + ' 1st|5000', emote.silver + ' 2nd|4000', emote.bronze + ' 3rd|3000', '4th|2700', '5th|2400', '6th|2100', '7th|1800', '8th|1500', '9th|1300', '10th|1200', '11th|1100', '12th|1000'];
    var chance = 50;
    var clean = 3;
  } else if (racemode == 'driftbeginner') {
    var title = 'Drift Trial - Beginner';
    var track = require(gtf.TRACKS).random({ options: ["Drift"] }, 1)[0]
    var km = track["length"];
    var limit = 1;
    var time = require(gtf.TIME).random({}, 1)[0]
    var weather = require(gtf.WEATHER).random({}, 1)[0]
    var grid = ['1'];
    var category = [['N100', 'N200', 'N300', 'N400', 'N500', 'N600', 'N700', 'N800', 'N900', 'N1000']];
    var place = [emote.gold + ' 1st|1000', emote.silver + ' 2nd|800', emote.bronze + ' 3rd|500', '4th|200'];
    var chance = 50;
    var clean = 0;
  } else if (racemode == 'driftprofessional') {
    var title = 'Drift Trial - Professional';
    var track = require(gtf.TRACKS).random({ options: ["Drift"] }, 1)[0]
    var km = track["length"];
    var limit = 1;
    var time = require(gtf.TIME).random({}, 1)[0]
    var weather = require(gtf.WEATHER).random({}, 1)[0]
    var grid = ['1'];
    var category = [['N100', 'N200', 'N300', 'N400', 'N500', 'N600', 'N700', 'N800', 'N900', 'N1000']];
    var place = [emote.gold + ' 1st|1000', emote.silver + ' 2nd|800', emote.bronze + ' 3rd|500', '4th|200'];
    var chance = 50;
    var clean = 0;
  } else if (racemode == 'endurance') {
    var track = require(gtf.TRACKS).random({}, 1)[0]
    var km = 0;
    var limit = ['1 Hour', '2 Hours', '3 Hours', '4 Hours', '8 Hours', '12 Hours', '24 Hours'];
    limit = limit[Math.floor(Math.random() * limit.length)];
    var time = require(gtf.TIME).random({}, 1)[0]
    var weather = require(gtf.WEATHER).random({}, 1)[0]
    var grid = ['24'];
    var category = [['N100'], ['N200'], ['N300'], ['N400'], ['N500'], ['N600'], ['N700'], ['N800'], ['N900'], ['N1000'], ['Gr.4'], ['Gr.B'], ['Gr.3'], ['Gr.2'], ['Gr.1']];
    var place = [emote.gold + ' 1st|10000', emote.silver + ' 2nd|9000', emote.bronze + ' 3rd|8000', '4th|7500', '5th|7000', '6th|6500', '7th|6000', '8th|5500', '9th|5000', '10th|4700', '11th|4000', '12th|3700', '13th|3400', '14th|3100', '15th|2800', '16th|2500'];
    place = place.map(function(x) {
      x = x.split('|');
      x[1] = parseInt(x[1]) * parseInt(limit.split(' ')[0]);
      return x.join('|');
    });
    var chance = 35;
    var clean = 1;

    var title = 'Arcade Mode - ' + limit + ' of ' + track[0][0];
  } else if (racemode == 'R' || racemode == 'ONLINE') {
    var title = 'ONLINE LOBBY';
    var track = require(gtf.TRACKS).random({}, 1)[0]
    var km = track["length"];
    var limit = 0;
    var time = require(gtf.TIME).random({}, 1)[0]
    var weather = require(gtf.WEATHER).random({}, 1)[0]
    var grid = [['ONLINE']];
    var category = ['ONLINE'];
    var place = ['ONLINE'];
    var chance = 50;
    var clean = 1;
  } else {
    racesettings = racemode;
    var time = require(gtf.TIME).random({ "name": racesettings["time"] }, 1)[0]
    var weather = require(gtf.WEATHER).random({ "name": racesettings["weather"] }, 1)[0]

    racesettings['time'] = time["emoji"] + ' ' + time["hour"].toString() + ":" + time["seconds"];
    racesettings['weather'] = weather["emoji"] + ' ' + weather["name"] + ' 💧' + weather["wetsurface"] + '%';
    return racesettings;
  }

  if (!isNaN(limit)) {
    var distance = gtftools.lapcalc(km, limit);
  } else {
    distance = [limit, 'N/A', 'N/A'];
  }
  grid = grid[Math.floor(Math.random() * grid.length)];
  if (mode == 'GARAGE') {
    category = ['CUSTOM'];
  } else {
    category = category[Math.floor(Math.random() * category.length)];
  }

  var racesettings = {
    title: title,
    grid: grid,
    category: category,
    time: time["emoji"] + ' ' + time["hour"].toString() + ":" + time["seconds"],
    weather: weather["emoji"] + ' ' + weather["name"] + ' 💧' + weather["wetsurface"] + '%',
    positions: place,
    track: track["name"],
    drivetrains: [],
    cleanbonus: clean,
    difficulty: chance,
    laps: distance[0],
    km: distance[1],
    mi: distance[2],
  };

  if (racemode == 'driftbeginner') {
    racesettings['originalsectors'] = 3;
    racesettings['sectors'] = 3;
    racesettings['current'] = 0;
    racesettings['points'] = 0;
  }
  if (racemode == 'driftprofessional') {
    racesettings['originalsectors'] = 6;
    racesettings['sectors'] = 6;
    racesettings['current'] = 0;
    racesettings['points'] = 0;
  }
  return racesettings;
};

module.exports.setracesettings = function(raceprep) {
  if (raceprep["mode"] == "ARCADE") {
    if (raceprep["modearg"] == 'beginner') {
      var title = 'Arcade Mode - Beginner';
      var limit = 10.0;
      var time = require(gtf.TIME).random({}, 1)[0]
      var weather = require(gtf.WEATHER).random({}, 1)[0]

      var grid = ['8', '9', '10', '11', '12'];
      var category = [['N100'], ['N200'], ['N300'], ['Gr.4'], ['N100', 'N200'], ['N200', 'N300']];
      var place = [emote.gold + ' 1st|1000', emote.silver + ' 2nd|800', emote.bronze + ' 3rd|600', '4th|500', '5th|400', '6th|300', '7th|200', '8th|100'];
      var chance = 60;
      var clean = 5;
    } else if (raceprep["modearg"] == 'amateur') {
      var title = 'Arcade Mode - Amateur';
      var limit = 15.0;
      var time = require(gtf.TIME).random({}, 1)[0]
      var weather = require(gtf.WEATHER).random({}, 1)[0]
      var grid = ['10', '11', '12', '13', '14', '15', '16'];
      var category = [['N300'], ['N400'], ['N500'], ['N600'], ['Gr.4'], ['Gr.B'], ['Gr.3'], ['N300', 'N400'], ['N400', 'N500'], ['N500', 'N600']];
      var place = [emote.gold + ' 1st|2500', emote.silver + ' 2nd|2000', emote.bronze + ' 3rd|1500', '4th|1300', '5th|1100', '6th|900', '7th|700', '8th|500', '9th|400', '10th|300'];
      var chance = 55;
      var clean = 4;
    } else if (raceprep["modearg"] == 'professional') {
      var title = 'Arcade Mode - Professional';
      var limit = 30.0;
      var time = require(gtf.TIME).random({}, 1)[0]
      var weather = require(gtf.WEATHER).random({}, 1)[0]
      var grid = ['12', '13', '14', '15', '16', '17', '18', '19', '20'];
      var category = [['N700'], ['N800'], ['N1000'], ['Gr.4'], ['Gr.B'], ['Gr.3'], ['Gr.2'], ['Gr.1'], ['N700', 'N800'], ['N800', 'N900', 'N1000']];
      var place = [emote.gold + ' 1st|5000', emote.silver + ' 2nd|4000', emote.bronze + ' 3rd|3000', '4th|2700', '5th|2400', '6th|2100', '7th|1800', '8th|1500', '9th|1300', '10th|1200', '11th|1100', '12th|1000'];
      var chance = 50;
      var clean = 3;
    }
  }
  if (raceprep["mode"] == "DRIFT") {
 if (raceprep["modearg"] == 'driftbeginner') {
    var title = 'Drift Trial - Beginner';
    var limit = 1;
    var time = require(gtf.TIME).random({}, 1)[0]
    var weather = require(gtf.WEATHER).random({}, 1)[0]
    var grid = ['1'];
    var category = [['N100', 'N200', 'N300', 'N400', 'N500', 'N600', 'N700', 'N800', 'N900', 'N1000']];
    var place = [emote.gold + ' 1st|1000', emote.silver + ' 2nd|800', emote.bronze + ' 3rd|500', '4th|200'];
    var chance = 50;
    var clean = 0;
  } if (raceprep["modearg"] == 'driftprofessional') {
    var title = 'Drift Trial - Professional';
    var limit = 1;
    var time = require(gtf.TIME).random({}, 1)[0]
    var weather = require(gtf.WEATHER).random({}, 1)[0]
    var grid = ['1'];
    var category = [['N100', 'N200', 'N300', 'N400', 'N500', 'N600', 'N700', 'N800', 'N900', 'N1000']];
    var place = [emote.gold + ' 1st|1000', emote.silver + ' 2nd|800', emote.bronze + ' 3rd|500', '4th|200'];
    var chance = 50;
    var clean = 0;
  }
  }
  if (raceprep["mode"] == "SSRX") {
      var title = 'Special Stage Route X - 10000m Top Speed Run';
      var limit = 1.0;
      var time = require(gtf.TIME).random({}, 1)[0]
      var weather = require(gtf.WEATHER).random({}, 1)[0]
      var grid = ['1'];
      var category = ["CUSTOM"];
      var place = [emote.gold + ' 1st|0'];
      var chance = 50;
      var clean = 3;
  }

  if (raceprep["modearg"] == 'endurance') {
    var track = require(gtf.TRACKS).random({}, 1)[0]
    var km = 0;
    var limit = ['1 Hour', '2 Hours', '3 Hours', '4 Hours', '8 Hours', '12 Hours', '24 Hours'];
    limit = limit[Math.floor(Math.random() * limit.length)];
    var time = require(gtf.TIME).random({}, 1)[0]
    var weather = require(gtf.WEATHER).random({}, 1)[0]
    var grid = ['24'];
    var category = [['N100'], ['N200'], ['N300'], ['N400'], ['N500'], ['N600'], ['N700'], ['N800'], ['N900'], ['N1000'], ['Gr.4'], ['Gr.B'], ['Gr.3'], ['Gr.2'], ['Gr.1']];
    var place = [emote.gold + ' 1st|10000', emote.silver + ' 2nd|9000', emote.bronze + ' 3rd|8000', '4th|7500', '5th|7000', '6th|6500', '7th|6000', '8th|5500', '9th|5000', '10th|4700', '11th|4000', '12th|3700', '13th|3400', '14th|3100', '15th|2800', '16th|2500'];
    place = place.map(function(x) {
      x = x.split('|');
      x[1] = parseInt(x[1]) * parseInt(limit.split(' ')[0]);
      return x.join('|');
    });
    var chance = 35;
    var clean = 1;

    var title = 'Arcade Mode - ' + limit + ' of ' + track[0][0];
  } else if (raceprep["modearg"] == 'R' || raceprep["modearg"] == 'ONLINE') {
    var title = 'ONLINE LOBBY';
    var track = require(gtf.TRACKS).random({}, 1)[0]
    var km = track["length"];
    var limit = 0;
    var time = require(gtf.TIME).random({}, 1)[0]
    var weather = require(gtf.WEATHER).random({}, 1)[0]
    var grid = [['ONLINE']];
    var category = ['ONLINE'];
    var place = ['ONLINE'];
    var chance = 50;
    var clean = 1;
  }
  
 if (raceprep["mode"] == "CAREER") {
    racesettings = raceprep["racesettings"];
    var time = require(gtf.TIME).random({ "name": racesettings["time"] }, 1)[0]
    var weather = require(gtf.WEATHER).random({ "name": racesettings["weather"] }, 1)[0]

    racesettings['time'] = time["emoji"] + ' ' + time["hour"].toString() + ":" + time["seconds"];
    racesettings['weather'] = weather["emoji"] + ' ' + weather["name"] + ' 💧' + weather["wetsurface"] + '%';
    return racesettings;
  }

  if (raceprep["trackselect"] == "RANDOM") {
    var track = require(gtf.TRACKS).random(raceprep["track"], 1)[0]
    var km = track["length"];
  } 
  if (raceprep["trackselect"] == "SELECT") {
    var track = raceprep["track"]
    var km = track["length"];
  }

  if (!isNaN(limit)) {
    var distance = gtftools.lapcalc(km, limit);
  } else {
    distance = [limit, 'N/A', 'N/A'];
  }
  grid = grid[Math.floor(Math.random() * grid.length)];
  if (raceprep["carselect"] == 'GARAGE') {
    category = ['CUSTOM'];
  } else {
    category = category[Math.floor(Math.random() * category.length)];
  }
  var image = ""

  var racesettings = {
    title: title,
    "image": image,
    "mode": raceprep["mode"],
    grid: grid,
    category: category,
    time: time["emoji"] + ' ' + time["hour"].toString() + ":" + time["seconds"],
    weather: weather["emoji"] + ' ' + weather["name"] + ' 💧' + weather["wetsurface"] + '%',
    positions: place,
    track: track["name"],
    drivetrains: [],
    cleanbonus: clean,
    difficulty: chance,
    laps: distance[0],
    km: distance[1],
    mi: distance[2],
  };

  if (raceprep["modearg"] == 'driftbeginner') {
    racesettings['originalsectors'] = 3;
    racesettings['sectors'] = 3;
    racesettings['current'] = 0;
    racesettings['points'] = 0;
  }
  if (raceprep["modearg"] == 'driftprofessional') {
    racesettings['originalsectors'] = 6;
    racesettings['sectors'] = 6;
    racesettings['current'] = 0;
    racesettings['points'] = 0;
  }
  return racesettings;
};

module.exports.preparerace = function(mode, levelselect, carmode, event, args, embed, msg, userdata) {
  var results2 = '';
  if (mode == 'CAREER') {
    embed.fields = [];
    var racesettings = require(gtf.RACE).setrace(event);
    var loading = event['misc']['loading'];
  } else if (mode == 'ONLINE') {
    embed.fields = [];
    var racesettings = event
    var grid = racesettings["players"].length
    var finalgrid = racesettings["players"].map(function(x) {
      return [x["car"]["name"], "`" + msg.guild.members.cache.get(x['id']).user.username + "`"].join(" ")
    })
    racesettings["category"] = ["CUSTOM"]

    var pl = ["st", "nd", "rd", "th"]
    var positions = []

    var startingprize = 1000
    var prize = startingprize
    for (var x = 0; x < grid; x++) {
      if (x % 10 == 0 && (x + 1) != 11) {
        positions.push(emote.goldtrophy + " " + (x + 1) + "st|" + prize)
      }
      else if (x % 10 == 1 && (x + 1) != 12) {
        positions.push(emote.silvertrophy + " " + (x + 1) + "nd|" + prize)
      }
      else if (x % 10 == 2 && (x + 1) != 13) {
        positions.push(emote.bronzetrophy + " " + (x + 1) + "rd|" + prize)
      }
      else {
        positions.push((x + 1) + "th|" + startingprize)
      }
      prize = Math.ceil((startingprize - (prize / grid)) / 100) * 100
    }
    event['positions'] = positions
    event['misc'] = { 'loading': racesettings["title"] };

  } else if (mode == 'SSRX') {
    var racesettings = require(gtf.RACE).setrace(tracksettings);
  } else {
    if (levelselect.length != 0) {
      var racesettings = require(gtf.RACE).setrace(levelselect, mode);
    }
  }

  racesettings['mode'] = mode;

  if (carmode == 'GARAGE') {
    var car = stats.currentcar(userdata);
    var carname = car['name'];
    racesettings['misc'] = { "car": car };
    if (mode == 'CAREER') {
      var racesettingsmakes = racesettings['makes']
      var racesettingsmodels = racesettings['models']
      var racesettingstypes = racesettings['types']
      var racesettingsdt = racesettings['drivetrains']

      var args = {
        "makes": racesettingsmakes,
        "models": racesettingsmodels,
        "types": racesettingstypes,
        "drivetrains": racesettingsdt,
        "upperfpp": racesettings["upperfpp"],
        "lowerfpp": racesettings["lowerfpp"],
        "condition": "CUSTOM",
        "gtscarclass": "",
      }
      var finalgrid = require(gtf.RACE).creategrid(args, racesettings['misc']["car"], racesettings['grid']);

      var grid = racesettings['grid'];
    } else {
      var grid = racesettings['grid'];
      var car = racesettings['misc']["car"]
      racesettings["category"] = ["CUSTOM"]
      var args = {
        "makes": [],
        "models": [],
        "types": [
          require(gtf.CARS).find({ "make": [car["make"]], "fullname": [car["name"]], "year": [car["year"]] })[0]["type"]
        ],
        "upperfpp": racesettings['misc']["car"]["fpp"] + 50,
        "lowerfpp": racesettings['misc']["car"]["fpp"] - 50,
        "condition": "CUSTOM",
        "gtscarclass": [],
        "drivetrains": []
      }
      var finalgrid = require(gtf.RACE).creategrid(args, racesettings['misc']["car"], racesettings['grid']);
    }
  } else if (carmode == "ONLINE") {

  } else {

    var args = {
      "makes": racesettingsmakes,
      "models": racesettingsmodels,
      "types": racesettingstypes,
      "upperfpp": racesettings["fpplimit"] + 50,
      "lowerfpp": racesettings["fpplimit"] - 50,
      "condition": "GTS",
      "gtscarclass": racesettings["category"],
      "drivetrains": []
    }

    racesettings['misc'] = { car: '' };

    var finalgrid = require(gtf.RACE).creategrid(args, racesettings['misc']["car"], racesettings['grid']);
    var carname = '';

    if (carmode == 'GTSPORT') {
      var grid = racesettings['category'].join(' ') + ' | ' + racesettings['grid'];
      if (mode == 'DRIFT') {
        var grid = racesettings['grid'];
      }
    } else {
      var grid = racesettings['grid'];
    }
  }



  embed.setTitle('__' + racesettings['title'] + '__');
  var results = '**READY**';
  var track = racesettings['track'];
  var time = racesettings['time'];
  var weather = racesettings['weather'];
  var laps = racesettings['laps'];
  var distancekm = racesettings['km'];
  var distancemi = racesettings['mi'];
  var racedetails = '__Race Details__' + '\n' + '**Track:** ' + track + '\n' + '**Time/Weather:** ' + time + ' | ' + weather + '\n' + '**Lap(s):** ' + laps + '\n' + '**Total Distance:** ' + distancekm + ' km' + ' | ' + distancemi + ' mi' + '\n' + '**Grid:** ' + grid + ' cars';

  if (mode == 'CAREER') {
    loading = require(gtf.GTF).loadingscreen(loading, '');
  } else {
    var loading = require(gtf.GTF).loadingscreen('**' + racesettings['track'] + '**', carname);
  }
  embed.setDescription(loading);

  msg.channel.send(embed).then(msg => {
    setTimeout(function() {
      embed.setDescription(results + '\n\n' + racedetails);
      embed.thumbnail = [];

      if (mode == 'GARAGE') {
        embed.addField(stats.main(userdata), racesettings['misc']["car"]["name"]);
      } else {
        embed.addField(stats.main(userdata), "⠀");
        //args + 
      }
      msg.edit(embed).then(msg => {
        var startingrace = false;
        stats.raceinprogress(false, undefined, undefined, userdata);
        var racefinished = false;

        function flagstartrace() {
          embed.setColor(0x0151b0);
          var user = msg.guild.members.cache.get(userdata["id"]).toString();

          require('../../functions/races/f_races_2').readysetgo(user, racedetails, racesettings, finalgrid, startingrace, racefinished, embed, msg, args, [false, null], userdata);
        }
        function trackdetails() {
          if (racefinished) {
            results = results2;
          } else {
            results = '**READY**';
          }
          embed.setDescription(results + '\n\n' + racedetails);
          msg.edit(embed);
        }
        function cargrid() {
          if (carmode == 'GARAGE' || mode == 'DRIFT') {
            results = '__Starting Grid | ' + racesettings['grid'] + ' cars' + '__' + '\n' + finalgrid.join('\n');
          } else {
            results = '__Starting Grid - ' + racesettings['category'] + ' | ' + racesettings['grid'] + ' cars' + '__' + '\n' + finalgrid.join('\n');
          }

          embed.setDescription(results);
          msg.edit(embed);
        }
        var emojilist = [[emote.flag, 'flag', flagstartrace, 'Once'], [emote.tracklogo, 'trackgtfitness', trackdetails], [emote.cargrid, 'gtfcargrid', cargrid]];

        gtftools.createreactions(emojilist, msg, userdata);
      });
    }, 3000);
  });
};

module.exports.raceprep = function(raceprep, embed, msg, userdata) {
   var results2 = '';
  if (raceprep["mode"] == 'ARCADE' || raceprep["mode"] == 'DRIFT') {
    var racesettings = require(gtf.RACE).setracesettings(raceprep);
  } else if (raceprep["mode"] == 'CAREER') {
    embed.fields = [];
    var racesettings = require(gtf.RACE).setracesettings(raceprep);
    var loading = racesettings['misc']['loading'];
  } else if (raceprep["mode"] == 'ONLINE') {
    embed.fields = [];
    var racesettings = raceprep["racesettings"]
    var grid = racesettings["players"].length
    var finalgrid = racesettings["players"].map(function(x) {
      return [x["car"]["name"], "`" + msg.guild.members.cache.get(x['id']).user.username + "`"].join(" ")
    })
    racesettings["category"] = ["CUSTOM"]

    var pl = ["st", "nd", "rd", "th"]
    var positions = []

    var startingprize = 1000
    var prize = startingprize
    for (var x = 0; x < grid; x++) {
      if (x % 10 == 0 && (x + 1) != 11) {
        positions.push(emote.goldtrophy + " " + (x + 1) + "st|" + prize)
      }
      else if (x % 10 == 1 && (x + 1) != 12) {
        positions.push(emote.silvertrophy + " " + (x + 1) + "nd|" + prize)
      }
      else if (x % 10 == 2 && (x + 1) != 13) {
        positions.push(emote.bronzetrophy + " " + (x + 1) + "rd|" + prize)
      }
      else {
        positions.push((x + 1) + "th|" + startingprize)
      }
      prize = Math.ceil((startingprize - (prize / grid)) / 100) * 100
    }
    event['positions'] = positions
    event['misc'] = { 'loading': racesettings["title"] };

  } else if (raceprep["mode"]  == 'SSRX') {
    var racesettings = require(gtf.RACE).setracesettings(raceprep);
  }

  if (raceprep["carselect"] == 'GARAGE') {
    var carname = raceprep["car"]['name'];
    racesettings['misc'] = { "car": raceprep["car"] };
    if (raceprep["mode"] == 'CAREER') {
      var racesettingsmakes = racesettings['makes']
      var racesettingsmodels = racesettings['models']
      var racesettingstypes = racesettings['types']
      var racesettingsdt = racesettings['drivetrains']

      var args = {
        "makes": racesettingsmakes,
        "models": racesettingsmodels,
        "types": racesettingstypes,
        "drivetrains": racesettingsdt,
        "upperfpp": racesettings["upperfpp"],
        "lowerfpp": racesettings["lowerfpp"],
        "condition": "CUSTOM",
        "gtscarclass": "",
      }
      var finalgrid = require(gtf.RACE).creategrid(args, racesettings['misc']["car"], racesettings['grid']);

      var grid = racesettings['grid'];
    } else if (raceprep["mode"] == 'ARCADE' || raceprep["mode"] == 'SSRX'|| raceprep["mode"] == 'DRIFT') {
      var grid = racesettings['grid'];
      var car = racesettings['misc']["car"]
      racesettings["category"] = ["CUSTOM"]
      var args = {
        "makes": [],
        "models": [],
        "types": [
          require(gtf.CARS).find({ "make": [car["make"]], "fullname": [car["name"]], "year": [car["year"]] })[0]["type"]
        ],
        "upperfpp": racesettings['misc']["car"]["fpp"] + 50,
        "lowerfpp": racesettings['misc']["car"]["fpp"] - 50,
        "condition": "CUSTOM",
        "gtscarclass": [],
        "drivetrains": []
      }
      var finalgrid = require(gtf.RACE).creategrid(args, racesettings['misc']["car"], racesettings['grid']);
    }
  } else {

    var args = {
      "makes": racesettingsmakes,
      "models": racesettingsmodels,
      "types": racesettingstypes,
      "upperfpp": racesettings["fpplimit"] + 50,
      "lowerfpp": racesettings["fpplimit"] - 50,
      "condition": "GTS",
      "gtscarclass": racesettings["category"],
      "drivetrains": []
    }

    racesettings['misc'] = { car: '' };
    var finalgrid = require(gtf.RACE).creategrid(args, racesettings['misc']["car"], racesettings['grid']);
    var carname = '';

    if (raceprep["carselect"] == 'GTSPORT') {
      var grid = racesettings['category'].join(' ') + ' | ' + racesettings['grid'];
      if (raceprep["mode"] == 'DRIFT') {
        var grid = racesettings['grid'];
      }
    } else {
      var grid = racesettings['grid'];
    }
  }



  embed.setTitle('__' + racesettings['title'] + '__');
  if (racesettings["image"].length != 0) {
    embed.setThumbnail(racesettings["image"])
  }
  var results = '**READY**';
  var track = racesettings['track'];
  var time = racesettings['time'];
  var weather = racesettings['weather'];
  var laps = racesettings['laps'];
  var distancekm = racesettings['km'];
  var distancemi = racesettings['mi'];
  var racedetails = '__Race Details__' + '\n' + '**Track:** ' + track + '\n' + '**Time/Weather:** ' + time + ' | ' + weather + '\n' + '**Lap(s):** ' + laps + '\n' + '**Total Distance:** ' + distancekm + ' km' + ' | ' + distancemi + ' mi' + '\n' + '**Grid:** ' + grid + ' cars';

  if (raceprep["mode"] == 'CAREER') {
    loading = require(gtf.GTF).loadingscreen(loading, '');
  } else {
    var loading = require(gtf.GTF).loadingscreen('**' + racesettings['track'] + '**', carname);
  }
  embed.setDescription(loading);

  msg.channel.send(embed).then(msg => {
    setTimeout(function() {
      embed.setDescription(results + '\n\n' + racedetails);
      embed.thumbnail = [];

      if (raceprep["mode"] == 'GARAGE') {
        embed.addField(stats.main(userdata), racesettings['misc']["car"]["name"]);
      } else {
        embed.addField(stats.main(userdata), "⠀");
        //args + 
      }
      msg.edit(embed).then(msg => {
        var startingrace = false;
        stats.raceinprogress(false, undefined, undefined, userdata);
        var racefinished = false;

        function flagstartrace() {
          embed.setColor(0x0151b0);
          var user = msg.guild.members.cache.get(userdata["id"]).toString();

          require('../../functions/races/f_races_2').readysetgo(user, racedetails, racesettings, finalgrid, startingrace, racefinished, embed, msg, args, [false, null], userdata);
        }
        function trackdetails() {
          if (racefinished) {
            results = results2;
          } else {
            results = '**READY**';
          }
          embed.setDescription(results + '\n\n' + racedetails);
          msg.edit(embed);
        }
        function cargrid() {
          if (raceprep["carselect"]  == 'GARAGE' || raceprep["mode"] == 'DRIFT') {
            results = '__Starting Grid | ' + racesettings['grid'] + ' cars' + '__' + '\n' + finalgrid.join('\n');
          } else {
            results = '__Starting Grid - ' + racesettings['category'] + ' | ' + racesettings['grid'] + ' cars' + '__' + '\n' + finalgrid.join('\n');
          }

          embed.setDescription(results);
          msg.edit(embed);
        }
        var emojilist = [[emote.flag, 'flag', flagstartrace, 'Once'], [emote.tracklogo, 'trackgtfitness', trackdetails], [emote.cargrid, 'gtfcargrid', cargrid]];

        gtftools.createreactions(emojilist, msg, userdata);
      });
    }, 3000);
  });
};

module.exports.creategrid = function(args, car, amount) {
  var makes = args["makes"]
  var models = args["models"]
  var types = args["types"]
  var drivetrains = args["drivetrains"]
  var upperfpp = args["upperfpp"]
  var lowerfpp = args["lowerfpp"]
  var condition = args["condition"]
  var gtscarclass = args["gtscarclass"]

  var grid = [];
  if (amount == 1) {
    if (condition == 'GTS') {
      var carname = require(gtf.GTSCARS).RandomGTSCar({ "name": models, "category": gtscarclass }).name;

    } else {
      var carname = car['name'];
    }
    var finalgrid = ['**1. ' + carname + '**' + ' `You`'];
    return finalgrid;
  }

  if (condition == "GTS") {
    grid = require(gtf.GTSCARS).GTSCars({ "name": models, "category": gtscarclass });
    var finalgrid = [];
    var index = 0;
    var position = gtftools.randomInt(2, amount - 1);
    while (amount > 1) {
      if (position == amount) {
        finalgrid.push('**' + (index + 1) + '. ' + grid[Math.floor(Math.random() * grid.length)].name + '**' + ' `You`');
        index++;
      }
      finalgrid.push(index + 1 + '. ' + grid[Math.floor(Math.random() * grid.length)].name);
      amount--;
      index++;
    }
    return finalgrid;
  }



  if (condition != '') {
    var randomcars = require(gtf.CARS).random({ "make": makes, "name": models, "drivetrains": drivetrains, "types": types, "upperfpp": upperfpp, "lowerfpp": lowerfpp }, amount)

    var finalgrid = [];
    var index = 0;
    var position = gtftools.randomInt(2, amount - 1);
    while (index < randomcars.length) {
      if (position == amount) {
        finalgrid.push('**' + (index + 1) + '. ' + car['name'] + '**' + ' `You`');
        index++;
      }
      finalgrid.push(index + 1 + '. ' + randomcars[index]["name"] + " " + randomcars[index]["year"]);
      amount--;
      index++;
    }
    return finalgrid;
  }

};

module.exports.start = function(racesettings, racedetails, user, userdata) {
  var score;
  var clean = gtftools.randomInt(1, 10);
  var position;
  var place = racesettings['positions'];
  var prize = 0;
  var cprize = 0;
  var difficulty = racesettings['difficulty'];

  //////CAREER/////
  if (racesettings['mode'] == 'CAREER') {
    difficulty = require(gtf.PERF).careerdifficultycalc(difficulty, racesettings['misc']['car'], racesettings['fpplimit']);
  }

  var index = 0;
  for (index; index < place.length; index++) {
    score = gtftools.randomInt(0, 100);
    if (score < difficulty) {
      position = place[index].split('|')[0];
      break;
    }
  }
  if (place.length == index) {
    index--;
    position = place[index].split('|')[0];
  }

  prize = parseFloat(place[index].split('|')[1]);


  if (racesettings['mode'] == 'ARCADE') {
    prize = Math.round(parseFloat(prize + (prize * (racesettings["km"] / 30))))
  }

  if (clean < racesettings['cleanbonus']) {
    cprize = Math.round(prize * 0.5);
  }
  var exp = Math.round(prize / 10);
  //////CAREER/////
  if (racesettings['mode'] == 'CAREER') {
    exp = Math.round(Math.round(prize / 10) * 1.8);
  }
  stats.addcredits(prize + cprize, userdata);
  stats.addmileage(racesettings['km'], racesettings['mi'], userdata);
  stats.addtotalmileage(racesettings['km'], racesettings['mi'], userdata);
  stats.addexp(exp, userdata);

  if (racesettings['mode'] == 'CAREER') {
    stats.updatecareerrace(racesettings['raceid'], position, userdata);
  }

  return '__**' + position + ' Place**__ ' + '**+' + prize + emote.credits + ' +' + exp + emote.exp + '**' + '\n' + '`Clean Race Bonus:` ' + '**+' + cprize + emote.credits + '**';
};
///////////////CAREER/////////////////

module.exports.careerevent = function(races, number, embed, msg, callback, userdata) {

  if (races === undefined) {
    return
  }
  if (!gtftools.betweenInt(number, 1, Object.keys(races).length)) {
    return
  }
  var event = races[Object.keys(races)[number - 1]];
  if (stats.currentcarmain(userdata) == 'No car.') {
     require(gtf.EMBED).alert({name:"❌ Error", description: "You do not have a current car.",embed:"", seconds:0}, msg, userdata);
    return;
  }

  var currentcar = stats.currentcar(userdata);
  var regulations = require(gtf.GTF).checkregulations(currentcar, event);

  if (!regulations[0]) {
    require(gtf.EMBED).alert({name:"❌ Regulations Breached", description: 'Your **' + currentcar['name'] + '** does not meet the regulations for **' + event['title'] + '**.' + '\n\n' + regulations[1].join('\n') + '\n\n' + 'React to 🚘 to see what cars in your garage are currently eligible.', embed:"", seconds:0}, msg, userdata);
      msg.channel.send(embed).then(msg => {
        function func() {
          var btgarage = require('../../commands/garage');
          btgarage.execute(msg, ['regulate!🏴', event], userdata);
        }
        var emojilist = [['🚘', '🚘', func]];
        gtftools.createreactions(emojilist, msg, userdata);
      });
    return 'Invalid';
  }

  var tracks = event['tracks'];
  var results = '';
  var numberlist = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
  embed.setTitle('__' + event['title'] + ' (' + tracks.length + ' Races)' + '__');
  for (var j = 0; j < tracks.length; j++) {
    var raceid = event['eventid'] + '-' + (j + 1).toString();
    results = results + numberlist[j] + ' ' + tracks[j][1] + ' - ' + tracks[j][2] + ' Laps ' + stats.checkcareerrace(raceid, userdata) + '\n';
  }
  var prizemoney = event['positions'].slice(0, 3).map(function(x) {
    var credits = x
      .split('|')[1]
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return '**' + x.split('|')[0] + '**' + ' **' + credits + '**' + emote.credits;
  });
  if (event['prize'][0] == "RANDOMCAR") {
    var prizename = "Mystery Car"
  }
  if (event['prize'][0] == "CREDITS") {
    var prizename = "**" + gtftools.numFormat(event['prize'][1]["item"]) + "**" + emote.credits
  }
  results =
    prizemoney.join(' ') +
    '\n' +
    results +
    '\n' +
    '**FPP Limit: ' +
    event['fpplimit'] +
    emote.fpp +
    '**' +
    '\n' +
    '🎲 **All Gold Reward:** ' +
    prizename +
    '\n\n' +
    '**❓ React to one of the numbers below this message that corresponds to a specific race for entry.**';

  embed.setDescription(results);
  msg.channel.send(embed).then(msg => {
    var emojilist = [];

    function func(index) {
      var trackname = tracks[index][1];
      var track = require(gtf.TRACKS).find({ "name": [trackname] })[0]
      var racesettings = require(gtf.RACE).setcareerrace(event, track, currentcar, index);
      racesettings['misc']['loading'] = '__**Race ' + (index + 1) + ' - ' + track["name"] + '**__\n' + prizemoney.join(' ') + '\n\n' + '🚘' + '**' + currentcar['name'] + " " + currentcar["fpp"] + emote.fpp + " | " + currentcar["tires"]["current"].split(" ").map(x => x[0]).join("") + emote.tire + '**';
      callback(racesettings);
    }
    for (var index = 0; index < tracks.length; index++) {
      emojilist.push([numberlist[index], numberlist[index], func, index]);
    }
    gtftools.createreactions(emojilist, msg, userdata);
  });
};

module.exports.setcareerrace = function(event, track, currentcar, index) {
  var racesettings = {
    "title": event['title'] + ' - ' + 'Race ' + (index + 1),
    "image": "",
    "grid": event['grid'],
    "category": event['category'],
    "time": event['time'],
    "weather": event['weather'],
    "positions": event['positions'],
    "track": track["name"],
    "cleanbonus": 3,
    "difficulty": event['difficulty'],
    "laps": event['tracks'][index][2],
    "km": Math.round(1000 * track["length"] * event['tracks'][index][2]) / 1000,
    "mi": Math.round(100 * ((track["length"] * event['tracks'][index][2]) / 1.609)) / 100,

    "mode": 'CAREER',
    "raceid": event['eventid'] + '-' + event['tracks'][index][0],
    "eventlength": event['tracks'].length,

    "models": event['models'],
    "makes": event['makes'],
    "types": event['types'],
    "drivetrains": event['drivetrains'],
    "fpplimit": event['fpplimit'],
    "upperfpp": event['upperfpp'],
    "lowerfpp": event['lowerfpp'],
    "prize": event['prize'],
    "misc": { "car": currentcar },
  };
  return racesettings;
};

///////ONLINE///////

module.exports.startonline = function(racesettings, racedetails, user, userdata) {
  var score;
  var positions = racesettings['positions']
  var position;
  var prize = 1000;
  var cprize = 0;
  var winners = []
  var finalgridwinners = racesettings["players"]

  var rnorm = require("random-normal");

  finalgridwinners.forEach(function(player) {
    player["score"] = rnorm({ mean: player["car"]["fpp"], dev: 50 });
  })
  finalgridwinners = finalgridwinners.sort((x, y) => y["score"] - x["score"])

  var index = 0;

  if (racesettings['mode'] == 'ARCADE') {
    prize = Math.round(parseFloat(prize + (prize * (racesettings["km"] / 30))))
  }


  var exp = Math.round(prize / 10);

  let MongoClient = require("mongodb").MongoClient;
  var url = "mongodb+srv://GTFitness:DqbqWQH0qvdKj3sR@cluster0.pceit.mongodb.net/GTF";

  finalgridwinners.forEach(function(x) {
    var place = positions.shift()
    position = place.split('|')[0];
    prize = parseFloat(place.split('|')[1])
    prize = Math.round(parseFloat(prize + (prize * (racesettings["km"] / 30))))

    winners.push(position + " " + "<@" + x["id"] + ">" + " " + "**+" + prize + emote.credits + ' +' + exp + emote.exp + '**' + "\n" + x['car']["name"])

    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("GTFitness");
      var users = dbo.collection("USERS");
      dbo.collection("USERS").find({ "id": x["id"] }).forEach(row => {
        if (typeof row["id"] === undefined) {
          return {}
        } else {
          userdata = row
        }
      }).then(function() {
        stats.addcredits(prize + cprize, userdata);
        stats.addmileage(racesettings['km'], racesettings['mi'], userdata);
        stats.addtotalmileage(racesettings['km'], racesettings['mi'], userdata);
        stats.addexp(exp, userdata);
        stats.save(userdata)
      })

    });

  })


  return winners.join("\n");
};