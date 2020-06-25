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
  name: 'drift',
  title: 'Drift Trial',
  cooldown: 3,
  level: 5,
  delete: true,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  description: [
    '!drift - Displays the list of difficulties available.\n`Lv.XX` represents that the driver level that is required.',
    '!drift ["mode"] - Enter a Drift Trial with the difficulty of ["mode"] with cars from GT Sport.\nYou can obtain credits and EXP here.\nThe amount you earn is based on your finishing position and ["mode"].\nA `LOANER CAR` is used.',
  ],
  execute(msg, query, msgauthorid) {
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = '\n' + '`Args: !drift ["mode"]`' + '\n';

    /* Setup */

    var results = '';
    var results2 = '';
    var mode = "DRIFT"

    var racemode;
    var racedetails = '';
    var levelselect = '';
    var ready = false;

    if (query.length == 0) {
      racemode = 'Menu';
    } else {
      racemode = query[0];
    }
    if (racemode == 'beginner' || racemode == 'b') {
      var ready = true;
      if (!exp.checklevel(5, embed, msg, msgauthorid)) {
        return;
      }
      levelselect = 'driftbeginner';
    } /*else if (racemode == "professional" || racemode == "pro") {
      var ready = true;
      if (!exp.checklevel(15, embed, msg, msgauthorid)) {
        return;
      }
      levelselect = "driftprofessional"
    } */ else {
      embed.setTitle('__Drift Trial__');
      results = '__**Drift Trial (Beginner)**__ - !drift [beginner] ' + emote.exp + '`Lv.5`' + '\n' + '~~__**Drift Trial (Professional)**__ - !drift [pro] ' + emote.exp + '`Lv.15`~~' + '\n\n' + '❓ **Select a drift mode from the list above.**';
      embed.setDescription(results + '\n\n' + racedetails);
    }
    if (!ready) {
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
      msg.channel.send(embed);
    } else {
      embed.setTitle('__Drift Trial - Car Selection__');

      results2 = '~~🚘' + ' ' + stats.currentcar(msgauthorid)['name'] + '~~\n' + emote.gtlogowhite + ' ' + 'GT Sport Loaner Car' + '\n\n' + '❓ **Click one of the reactions to select a car.**';

      embed.setDescription(results2);
      embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
      msg.channel.send(embed).then(msg => {
        function selectgaragemode() {
          require(gtffile.EMBED).error('❌ Unavailable', 'This option is unavailable.', embed, msg, msgauthorid);
          return;
          embed.fields = [];
          //return readyforarcaderace('GARAGE');
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
