var gtf = require('/app/functions/f_gtf');
var stats = require('/app/functions/profile/f_stats');
var emote = require('/app/index');
var gtftools = require('/app/functions/misc/f_tools');
var gtferror = require('/app/functions/misc/f_errors');
var gtfperf = require('/app/functions/marketplace/f_perf');
var exp = require('/app/profile/expprofile');

const Discord = require('discord.js');
const client = new Discord.Client();
var gtffile = process.env;
////////////////////////////////////////////////////
var gtfuser = require('/app/index');
var fs = require('fs');

module.exports = {
  name: 'debug',
  title: 'DEBUG',
  cooldown: 0.1,
  level: 0,
  delete: false,
  
  requirecar: false,
  usedduringrace: true,
  usedinlobby: true,
  description: ['!debug - (ADMIN ONLY) This command is only used for testing purposes.'],
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = '\n' + '`SPECIAL PURPOSES`' + '\n';

    var extra = '';

    if (msgauthorid != '237450759233339393') {
      return msg.channel.send('No.');
    }
    var results = '';
    var success = false;
    if (msg.mentions.users.first() !== undefined) {
      var id = msg.mentions.users.first().id;
    } else {
      var id = msgauthorid;
    }

    if (query[0] == 'updatecommandslist') {
      var success = true;
      var extra = require('/app/functions/misc/f_extras');
      return;
    }
    if (query[0] == 'arcaderacelength') {
      var success = true;
      var racemode = query[1];
      var racesettings = require(gtffile.RACE).setrace(query[1], 'ARCADE');
      console.log(racesettings);
      var speed = gtftools.catcalc(racesettings['category'], racesettings['weather'], '');
      var racelength = (racesettings['km'] / speed) * 3600 * 1000;

      var extra =
        '\n**Estimated Time:** ' +
        '~' +
        gtftools.milltominandsecs(racelength) +
        ' minutes' +
        '\n' +
        '**Track:** ' +
        racesettings['track'] +
        '\n' +
        '**Time/Weather:** ' +
        racesettings['time'] +
        ' | ' +
        racesettings['weather'] +
        '\n' +
        '**Lap(s):** ' +
        racesettings['laps'] +
        '\n' +
        '**Total Distance:** ' +
        racesettings['km'] +
        ' km' +
        ' | ' +
        racesettings['mi'] +
        ' mi' +
        '\n' +
        '**Grid:** ' +
        racesettings['category'].join(' ') +
        ' | ' +
        racesettings['grid'];
    }
    if (query[0] == 'maintenance') {
      success = true;
      gtfuser.gtfbotconfig['maintenance'] = !gtfuser.gtfbotconfig['maintenance'];
      setTimeout(function() {
        require('/app/commands/restart').execute(msg, [''], id);
      }, 1000);
    }

    if (query[0] == 'addcredits') {
      success = true;
      stats.addcredits(parseInt(query[1]), id);
    }
    if (query[0] == 'setcredits') {
      success = true;
      gtfuser.gtfuserdata[id]['credits'] = parseInt(query[1]);
    }
    ///GIFTS
    if (query[0] == 'giftcredits') {
      success = true;
      stats.addgift('**' + query[1] + '**' + emote.credits, query[1], 'CREDITS', 'USERNAME', true, id);
    }
    if (query[0] == 'giftrandomcar') {
      success = true;
      var prizes = require(gtffile.CARS).randomcars(['Any'], [''], parseInt(query[1]));
      for (var i = 0; i < prizes.length; i++) {
        var item = prizes[i];
        var name = item[0];
        var costtoperf = item[1][1];
        var make = item[3];

        stats.addgift(name, stats.addcar(name, make, costtoperf, undefined, id), 'CAR', 'USERNAME', true, id);
      }
      results = '`' + query[0] + '` success to ' + msg.guild.members.cache.get(msgauthorid).user.username + '.' + '\n' + 'Added ' + query[1] + ' random cars to garage.';
    }
    if (query[0] == 'cleargifts') {
      success = true;
      gtfuser.gtfuserdata[id]['gifts'] = [];
    }
    if (query[0] == 'dailyoff') {
      success = true;
      stats.dailyworkout(false, id);
    }
    if (query[0] == 'forcecancel') {
      success = true;
      gtfuser.gtfuserdata[id]['raceinprogress'] = [false, ['', ''], 0, id];
    }
    if (query[0] == 'forcelobbycancel') {
      success = true;
      gtfuser.gtfuserdata[id]['inlobby'] = [false, ''];
    }
    if (query[0] == 'deleteprofile') {
      success = true;
      delete gtfuser.gtfuserdata[id];
    }
    if (query[0] == 'addrandomcar') {
      success = true;
      var prizes = require(gtffile.CARS).randomcars(['Any'], [''], parseInt(query[1]));
      for (var i = 0; i < prizes.length; i++) {
        var item = prizes[i];
        var name = item[0];
        var costtoperf = item[1][1];
        var make = item[3];

        stats.addcar(name, make, costtoperf, undefined, id);
      }
      results = '`' + query[0] + '` success to ' + msg.guild.members.cache.get(msgauthorid).user.username + '.' + '\n' + 'Added ' + query[1] + ' random cars to garage.';
    }
    if (query[0] == 'removecredits') {
      success = true;
      stats.addcredits(-parseInt(query[1]), id);
      results = 'Success.';
    }
    if (query[0] == 'addmileage') {
      success = true;
      stats.addmileage(query[1], query[1], id);
      results = 'Success.';
    }
    if (query[0] == 'addexp') {
      success = true;
      stats.addexp(parseInt(query[1]), id);
      results = 'Success.';
    }
    if (query[0] == 'resetexplevel') {
      success = true;

      results = 'Success.';
    }
    if (query[0] == 'careergift') {
      success = true;
      if (!query[1].includes('-')) {
        return;
      }
      if (query[1].split('-')[0] == 'b') {
        var races = require('/app/data/career/races').beginner();
      }
      if (query[1].split('-')[0] == 'a') {
        var races = require('/app/data/career/races').amateur();
      }
      if (query[1].split('-')[0] == 'ic') {
        var races = require('/app/data/career/races').icleague();
      }
      if (query[1].split('-')[0] == 'ib') {
        var races = require('/app/data/career/races').ibleague();
      }
      if (query[1].split('-')[0] == 'ia') {
        var races = require('/app/data/career/races').ialeague();
      }
      var event = races[Object.keys(races)[query[1].split('-')[1] - 1]];
      var tracks = event['tracks'];
      var track = require(gtffile.TRACKS).Track(tracks[1]);
      var racesettings = require(gtffile.RACE).setcareerrace(event, track, stats.currentcar(id), 0);
      stats.gift(emote.goldmedal + ' Congrats! All GOLD in ' + racesettings['title'].split(' - ')[0] + ' ' + emote.goldmedal, racesettings['prize'], 'RANDOMCAR', embed, msg, id);

      results = 'Success.';
    }
    if (success) {
      results = '`' + query[0] + '` success to ' + msg.guild.members.cache.get(id).user.username + '.' + '\n' + extra;
      embed.setDescription(results);
      //embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
      return msg.channel.send(embed);
    } else {
      msg.channel.send('Invalid');
    }
  },
};
