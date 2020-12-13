var gtf = require('../functions/f_gtf');
var stats = require('../functions/profile/f_stats');
var emote = require('../index');
var gtftools = require('../functions/misc/f_tools');
var gtfperf = require('../functions/marketplace/f_perf');

const Discord = require('discord.js');
const client = new Discord.Client();
var gtffile = process.env;
////////////////////////////////////////////////////
var gtfuser = require('../index');

module.exports = {
  name: 'drift',
  title: 'Drift Trial',
  cooldown: 3,
  level: 5,
  channels: ["gtf-mode", "testing"],

  delete: true,
  availitoeveryone:true,
  availinmaint:false,
   requireuserdata:true,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  description: [
    '!drift - Displays the list of difficulties available.\n`Lv.XX` represents that the driver level that is required.',
    '!drift ["mode"] - Enter a Drift Trial with the difficulty of ["mode"] with cars from GT Sport.\nYou can obtain credits and EXP here.\nThe amount you earn is based on your finishing position and ["mode"].\nA `LOANER CAR` is used.',
  ],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args = '\n' + '`Args: !drift ["mode"]`' + '\n';
    var page = 0
    var results = '';
    var info = '**❓ Select a drift mode from the list above.**'

    /* Setup */

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
      if (!require(gtffile.EXP).checklevel(5, embed, msg, userdata)) {
        return;
      }
      levelselect = 'driftbeginner';
    } /*else if (racemode == "professional" || racemode == "pro") {
      var ready = true;
      if (!require(gtffile.EXP).checklevel(15, embed, msg, userdata)) {
        return;
      }
      levelselect = "driftprofessional"
    } */ else {
      embed.setTitle('__Drift Trial__');
      results = '__**Drift Trial (Beginner)**__ - !drift [beginner] ' + emote.exp + '`Lv.5`' + '\n' + '~~__**Drift Trial (Professional)**__ - !drift [pro] ' + emote.exp + '`Lv.15`~~';
      embed.setDescription(results + '\n\n' + racedetails);
    }
    if (!ready) {
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
      msg.channel.send(embed);
    } else {
      embed.setTitle('__Drift Trial - Car Selection__');

      results2 = '~~🚘' + ' ' + stats.currentcar(userdata)['name'] + '~~\n' + emote.gtlogowhite + ' ' + 'GT Sport Loaner Car' + '\n\n' + '❓ **Click one of the reactions to select a car.**';

      embed.setDescription(results2);
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
      msg.channel.send(embed).then(msg => {
        function selectgaragemode() {
          require(gtffile.EMBED).error('❌ Unavailable', 'This option is unavailable.', embed, msg, userdata);
          return;
          embed.fields = [];
          //return readyforarcaderace('GARAGE');
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
