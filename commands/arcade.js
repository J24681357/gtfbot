var gtf = require('/home/runner/gtfbot/functions/f_gtf');
var stats = require('/home/runner/gtfbot/functions/profile/f_stats');
var emote = require('/home/runner/gtfbot/index');
var gtftools = require('/home/runner/gtfbot/functions/misc/f_tools');
var gtfperf = require('/home/runner/gtfbot/functions/marketplace/f_perf');
var exp = require('/home/runner/gtfbot/profile/expprofile');

const Discord = require('discord.js');
const client = new Discord.Client();
var gtffile = process.env;
////////////////////////////////////////////////////
var gtfuser = require('/home/runner/gtfbot/index');

module.exports = {
  name: 'arcade',
  title: 'Arcade Mode',
  cooldown: 3,
  level: 0,
  delete: true,
  roles: [],
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  description: [
    '!arcade - Displays the list of leagues/difficulties available.\n`Lv.XX` represents that the driver level that is required.',
    '!arcade ["mode"] - Enter a race in Arcade mode with the difficulty of [mode] with cars from GT Sport.\nYou can obtain credits and EXP here.\nThe amount you earn is based on your finishing position and [mode].',
  ],
  execute(msg, query, msgauthorid) {
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = '\n' + '`Args: !arcade ["mode"]`' + '\n';

    /* Setup */

    var results = '';
    var results2 = '';
    var mode = 'ARCADE';

    var racemode;
    var racedetails = '';
    var levelselect = '';
    var ready = false;

    if (query.length == 0) {
      racemode = 'Menu';
    } else {
      racemode = query[0];
      if (parseInt(racemode) == 1) {
        racemode = 'beginner';
      }
      if (parseInt(racemode) == 2) {
        racemode = 'amateur';
      }
      if (parseInt(racemode) == 3) {
        racemode = 'pro';
      }
    }
    if (racemode == 'beginner' || racemode == 'b' || racemode == 'sunday') {
      var ready = true;
      levelselect = 'beginner';
    } else if (racemode == 'amateur' || racemode == 'a') {
      var ready = true;
      if (!exp.checklevel(5, embed, msg, msgauthorid)) {
        return;
      }
      levelselect = 'amateur';
    } else if (racemode == 'professional' || racemode == 'pro') {
      var ready = true;
      if (!exp.checklevel(20, embed, msg, msgauthorid)) {
        return;
      }
      levelselect = 'professional';
    } else {
      embed.setTitle('__Arcade Mode__');
      results = '__**Beginner**__ - !arcade [beginner] ' + '\n' + '__**Amateur**__ - !arcade [amateur] ' + emote.exp + '`Lv.5`' + '\n' + '__**Professional**__ - !arcade [professional] ' + emote.exp + '`Lv.20`' + '\n\n' + '❓ **Select a race mode from the list above.**';
      embed.setDescription(results + '\n\n' + racedetails);
    }
    if (!ready) {
      var list = results.split("\n").slice(0,-1).map(function(x){
      return [x, " "]
    })
    var page = 0
    
    results2 = gtftools.list(list, page, "", "", true, "", 3, [query, "arcade"], embed, msg, msgauthorid)
      
      embed.setDescription(results)
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
      gtftools.createpages(results2, list, page, "", "", true, "", 3, [query, "arcade"], embed, msg, msgauthorid)
      
    } else {
      embed.setTitle('__Arcade Mode - Car Selection__');

      results2 = '🚘' + ' ' + stats.currentcar(msgauthorid)['name'] + '\n' + emote.gtlogowhite + ' ' + 'GT Sport Loaner Car' + '\n\n' + '❓ **Click one of the reactions to select a car.**';

      embed.setDescription(results2);
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
      msg.channel.send({ embed: embed}).then(msg => {
        function selectgaragemode() {
          embed.fields = [];
      if (require(gtffile.EMBED).checknocars(msgauthorid)) {
      require(gtffile.EMBED).error('❌ No Car', 'You do not have a current car.', embed, msg, msgauthorid);
      return;
    }
          return require(gtffile.RACE).preparerace(mode, levelselect, 'GARAGE', "", args, embed, msg, msgauthorid);
        }

        function selectgtsportmode() {
          embed.fields = [];
          return require(gtffile.RACE).preparerace(mode, levelselect, 'GTSPORT', "", args, embed, msg, msgauthorid);
        }

        var emojilist = [['🚘', '🚘', selectgaragemode], [emote.gtlogowhite, 'gtlogowhite', selectgtsportmode]];

        gtftools.createreactions(emojilist, msg, msgauthorid);
      });
    }
  },
};
