var gtf = require('/app/functions/f_gtf');
var stats = require('/app/functions/profile/f_stats');
var emote = require('/app/index');
var gtftools = require('/app/functions/misc/f_tools');
var gtfperf = require('/app/functions/marketplace/f_perf');
var exp = require('/app/profile/expprofile');

const Discord = require('discord.js');
const client = new Discord.Client();
var gtffile = process.env;
////////////////////////////////////////////////////
var gtfuser = require('/app/index');

module.exports = {
  name: 'career',
  title: 'Career Mode',
  cooldown: 3,
  level: 0,
  delete: true,
  aliases: ['c'],
  
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  description: [
    '!career - Displays the list of leagues to select from.\n`Lv.XX` represents that the driver level that is required.',
    '!career ["league"] - Displays the list of events from a ["league"].\n Each event has car regulations that your current car must meet before entry.',
    '!career ["league"] [(number)] - Enters an event, given from the [(number)] associated with the list from a ["league"].\nUse the reactions to select races contained in each event (1️⃣,2️⃣,3️⃣, etc).',
  ],
  execute(msg, query, msgauthorid) {
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = '\n' + '`Args: !career ["league"] [(number)]`' + '\n';

    /* Setup */
    var league = 0
    
    if (query.length == 0) {
      league = 'Menu';
    } else {
      league = query[0];
    }
  
    if (query.length == 1) {
      if (parseInt(league) == 1) {
        league = 'B';
      }
      if (parseInt(league) == 2) {
        league = 'A';
      }
      if (parseInt(league) == 3) {
        league = 'IC';
      }
      if (parseInt(league) == 4) {
        league = 'IB';
      }
      if (parseInt(league) == 5) {
        league = 'IA';
      }
    } else {
      if (query.includes('-')) {
        query = query[0].split('-');
      }
    }
    var results = ' ';
    var results2 = ' ';
    var ready = false;
    var racesettings;
    var finalgrid;
    var mode = 'CAREER';

    if (require(gtffile.EMBED).checknocars(msgauthorid)) {
      require(gtffile.EMBED).error('❌ No Car', 'You do not have a current car.', embed, msg, msgauthorid);
      return;
    }


    var racedetails = '';
    if (league == 'beginner' || league == 'b' || league == 'B') {
      var ready = true;
      league = 'B';
      var races = require('/app/data/career/races').beginner();
    }
    if (league == 'amateur' || league == 'a' || league == 'A') {
      if (!exp.checklevel(5, embed, msg, msgauthorid)) {
        return;
      }
      var ready = true;
      league = 'A';
      var races = require('/app/data/career/races').amateur();
    }
    if (league == 'icleague' || league == 'ic' || league == 'IC') {
      if (!exp.checklevel(10, embed, msg, msgauthorid)) {
        return;
      }
      var ready = true;
      league = 'IC';
      var races = require('/app/data/career/races').icleague();
    }
    if (league == 'ibleague' || league == 'ib' || league == 'IB') {
      if (!exp.checklevel(20, embed, msg, msgauthorid)) {
        return;
      }
      var ready = true;
      league = 'IB';
      var races = require('/app/data/career/races').ibleague();
    }
    if (league == 'ialeague' || league == 'ia' || league == 'IA') {
      if (!exp.checklevel(30, embed, msg, msgauthorid)) {
        return;
      }
      var ready = true;
      league = 'IA';
      var races = require('/app/data/career/races').ialeague();
    }
    if (league == 'sleague' || league == 's' || league == 'S') {
      return;
      if (!exp.checklevel(40, embed, msg, msgauthorid)) {
        return;
      }
      var ready = true;
      league = 'S';
      var races = require('/app/data/career/races').sleague();
    } else {
      if (!ready && query.length != 0) {
        require(gtffile.EMBED).warning('⚠ Warning', 'This league does not exist.', embed, msg, msgauthorid);
      }
      embed.setTitle('🏁' + ' __Career Mode__');
      results =
        '__**B**__ - !career [b] [(number)]' +
        '\n' +
        '__**A**__ - !career [a] [(number)] ' +
        emote.exp +
        '`Lv.5`' +
        '\n' +
        '__**IC**__ - !career [ic] [(number)] ' +
        emote.exp +
        '`Lv.10`' +
        '\n' +
        '__**IB**__ - !career [ib] [(number)] ' +
        emote.exp +
        '`Lv.20`' +
        '\n' +
        '__**IA**__ - !career [ia] [(number)] ' +
        emote.exp +
        '`Lv.30`' +
        '\n\n' +
        '**❓ Select a difficulty from the list above.**';
    }
if (!ready) {
      var list = results.split("\n").slice(0,-1).map(function(x){
      return [x, " "]
    })
    var page = 0
    console.log(query)
    results2 = gtftools.list(list, page, "", "", true, "", 5, [query, "career"], embed, msg, msgauthorid)
      
      embed.setDescription(results)
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
      gtftools.createpages(results2, list, page, "", "", true, "", 5, [query, "career"], embed, msg, msgauthorid)
    } else {
      var number = parseInt(query[1]);
      if (number <= 0 || isNaN(number) || number > races.length) {
        if (!isNaN(number)) {
          require(gtffile.EMBED).warning('⚠ Warning', 'This event does not exist.', embed, msg, msgauthorid);
        }
        var results2 = '';
        var ids = Object.keys(races);
        for (var t = 0; t < ids.length; t++) {
          var raceevent = races[ids[t]];
          var rmakes = raceevent['models'].filter(x => !x.includes('M ')).map(x => x.split(' ')[0].replace('License', ''));
          rmakes = gtftools.removeDups(rmakes);
          var rmodels = raceevent['models'].filter(x => x.includes('M ')).map(x => x.replace('M ', ''));
          if (rmodels.length != 0) {
            var line = ' | ';
          } else {
            var line = ' Open';
          }

          results2 =
            results2 +
            raceevent['title'] +
            ' - ' +
            raceevent['tracks'].length +
            ' Races ' +
            stats.eventstatus(league + '-' + (t + 1), msgauthorid) +
            '\r' +
            '**FPP Limit: ' +
            raceevent['fpplimit'] +
            emote.fpp +
            '**\r' +
            '**Regulations:** ' +
            rmakes.join(', ') +
            line +
            rmodels.join(', ') +
            '\r' +
            '**Type:** ' +
            raceevent['type'] +
            '\n\n';
        }
        embed.setTitle('🏁 __Career Mode - ' + league + ' (' + ids.length + ' Events)' + '__');
        var list = results2
          .split('\n\n')
          .slice(0, -1)
          .map(function(x) {
            return [x, ' '];
          });
        var page = 0;

        results2 = gtftools.list(list, page, '', '', true, '', 3, [query, 'career'], embed, msg, msgauthorid);

        embed.setDescription(results2);
        embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
        gtftools.createpages(results2, list, page, '', '', true, '', 3, [query, 'career'], embed, msg, msgauthorid);
        return;
      }

      function asyncrace(event) {
        if (event == 'Invalid') {
          return;
        }

        var ready = true;

        require(gtffile.RACE).preparerace(mode, '', 'GARAGE', event, args, embed, msg, msgauthorid);
      }
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
      var event = require(gtffile.RACE).careerevent(races, number, embed, msg, asyncrace, msgauthorid);
    }
  },
};
