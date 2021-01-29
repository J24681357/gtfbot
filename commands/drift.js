var stats = require('../functions/profile/f_stats');
var emote = require('../index');
var gtftools = require('../functions/misc/f_tools');

const Discord = require('discord.js');
var gtffile = process.env;
////////////////////////////////////////////////////

module.exports = {
  name: 'drift',
  title: 'Drift Trial',
  cooldown: 3,
  level: 5,
  channels: ["gtf-mode", "gtf-demo", "testing"],

  delete: false,
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
    var reactionson = true

    if (query.length == 0) {
      racemode = 'Menu';
    } else {
      racemode = query[0];
    }

    if (parseInt(query[0]) == 1) {
      racemode = "B"
    }
    if (parseInt(query[0]) == 2) {
      racemode = "Pro"
    }
    if (query.includes("-")) {
      query = query[0].split("-")
    }


    if (racemode == 'beginner' || racemode == 'b' || racemode == 'B') {
      ready = true;
      if (!require(gtffile.EXP).checklevel(5, embed, msg, userdata)) {
        return;
      }
      levelselect = 'driftbeginner';
    } else if (racemode == "professional" || racemode == "pro" || racemode == "Pro") {
      ready = true;
      if (!require(gtffile.EXP).checklevel(15, embed, msg, userdata)) {
        return;
      }
      levelselect = "driftprofessional"
    } else {
      embed.setTitle('__Drift Trial__');
      results = '__**Drift Trial (Beginner)**__ - !drift [beginner] ' + emote.exp + '`Lv.5`' + '\n' + '__**Drift Trial (Professional)**__ - !drift [pro] ' + emote.exp + '`Lv.15`' + "\n" + " ";
      embed.setDescription(results + '\n\n' + racedetails);
    }
    if (!ready) {
      var list = results
        .split("\n")
        .slice(0, -1)
        .map(function(x) {
          return [x, " "]
        })
      results2 = gtftools.list(list, page, "", "", true, "", 2, [query, "drift"], embed, msg, userdata)

      embed.setDescription(results2)
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata))
      gtftools.createpages(results2, list, page, "", "", true, "", 2, [query, "drift", reactionson, info], embed, msg, userdata)
    } else {
      embed.setTitle('__Drift Trial - Car Selection__');
      var gtfcar = stats.currentcar(userdata)

      results2 = '🚘' + ' ' + gtfcar['name'] + '\n' + emote.gtlogowhite + ' ' + '~~GT Sport Loaner Car~~' + '\n\n' + '❓ **Click one of the reactions to select a car.**';

      embed.setDescription(results2);
      embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
      msg.channel.send(embed).then(msg => {
        function selectgaragemode() {
          embed.fields = [];

          var ocar = require(gtffile.CARS).find({"make":[gtfcar["make"]], "fullname":[gtfcar["name"]],"year":[gtfcar["year"]]})[0]

          if (ocar["drivetrain"] == "FF") {
            require(gtffile.EMBED).error('❌ FF Cars Prohibited', 'Front Wheel Drive cars are not allowed in a Drift Trial.', embed, msg, userdata);
            return
          }
          require(gtffile.RACE).preparerace(mode, levelselect, 'GARAGE', "", args, embed, msg, userdata);
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
