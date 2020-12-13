var stats = require('../functions/profile/f_stats');
var emote = require('../index');
var gtftools = require('../functions/misc/f_tools');

const Discord = require('discord.js');
var gtffile = process.env;
////////////////////////////////////////////////////

module.exports = {
  name: 'arcade',
  title: 'Arcade Mode',
  cooldown: 3,
  level: 0,
  roles: [],
  channels: ["testing", "gtf-test-mode"],

  delete: true,
  availinmaint:false,
  requireuserdata:true,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  description: [
    '!arcade - Displays the list of leagues/difficulties available.\n`Lv.XX` represents that the driver level that is required.',
    '!arcade ["mode"] - Enter a race in Arcade mode with the difficulty of [mode] with cars from GT Sport.\nYou can obtain credits and EXP here.\nThe amount you earn is based on your finishing position and [mode].',
  ],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args = '\n' + '`Args: !arcade ["mode"]`' + '\n';
    var page = 0
    var results = '';
    var info = '❓ **Select a race mode from the list above.**'

    /* Setup */

    var results2 = '';
    var mode = 'ARCADE';

    var racemode;
    var racedetails = '';
    var levelselect = '';
    var ready = false;
    var reactionson = true

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
      ready = true;
      levelselect = 'beginner';
    } else if (racemode == 'amateur' || racemode == 'a') {
      if (!require(gtffile.EXP).checklevel(5, embed, msg, userdata)) {
        return;
    }
      ready = true;
      levelselect = 'amateur';
    } else if (racemode == 'professional' || racemode == 'pro') {
      if (!require(gtffile.EXP).checklevel(20, embed, msg, userdata)) {
        return;
      }
      ready = true;
      levelselect = 'professional';
    } else {
      embed.setTitle('__Arcade Mode__');
      results = '__**Beginner**__ - !arcade [beginner] ' + '\n' + '__**Amateur**__ - !arcade [amateur] ' + emote.exp + '`Lv.5`' + '\n' + '__**Professional**__ - !arcade [professional] ' + emote.exp + '`Lv.20`' + "\n" + " "
      embed.setDescription(results);
    }
    if (!ready) {
      var list = results.split("\n").slice(0,-1).map(function(x){
      return [x, " "]
    })
    
    results2 = gtftools.list(list, page, "", "", true, "", 3, [query, "arcade"], embed, msg, userdata)
      
      embed.setDescription(results2)
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
      gtftools.createpages(results2, list, page, "", "", true, "", 3, [query, "arcade", reactionson, info], embed, msg, userdata)
      
    } else {
      embed.setTitle('__Arcade Mode - Car Selection__');

      results2 = '🚘' + ' ' + stats.currentcar(userdata)['name'] + '\n' + emote.gtlogowhite + ' ' + 'GT Sport Loaner Car' + '\n\n' + '❓ **Click one of the reactions to select a car.**';

      embed.setDescription(results2);
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
      msg.channel.send({ embed: embed}).then(msg => {
        function selectgaragemode() {
          embed.fields = [];
          return require(gtffile.RACE).preparerace(mode, levelselect, 'GARAGE', "", args, embed, msg, userdata);
        }

        function selectgtsportmode() {
          embed.fields = [];
          return require(gtffile.RACE).preparerace(mode, levelselect, 'GTSPORT', "", args, embed, msg, userdata);
        }

        var emojilist = [['🚘', '🚘', selectgaragemode], [emote.gtlogowhite, 'gtlogowhite', selectgtsportmode]];

        gtftools.createreactions(emojilist, msg, userdata);
      });
    }
  },
};
