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
  name: 'update',
  title: 'GTF Updater',
  cooldown: 3,
   level:0,
  delete: true,
  description: ['!update - Updates your profile to the latest version.'],
  requirecar: false,
  usedduringrace: false,
  usedinlobby: false,
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = '';

    /* Setup */
    var results = ' ';
    if (gtfuser.gtfuserdata[msgauthorid]['version'] >= gtfuser.gtfbotconfig['version']) {
      require(gtffile.EMBED).error('❌ Up to Date', 'Your save is already up to the latest version.', embed, msg, msgauthorid);
      return;
    }
    if (gtfuser.gtfuserdata[msgauthorid]['version'] === undefined) {
      gtfuser.gtfuserdata[msgauthorid]['version']++;
      gtfuser.gtfuserdata[msgauthorid]['version']++;
      gtfuser.gtfuserdata[msgauthorid]['gtsprofileid'] = '';
    } else if (gtfuser.gtfuserdata[msgauthorid]['version'] < 2) {
      gtfuser.gtfuserdata[msgauthorid]['version']++;
      gtfuser.gtfuserdata[msgauthorid]['version']++;
      gtfuser.gtfuserdata[msgauthorid]['gtsprofileid'] = '';
    }
    if (gtfuser.gtfuserdata[msgauthorid]['version'] < 4) {
      for (var i = 0; i < gtfuser.gtfuserdata[msgauthorid]['garage'].length; i++) {
        gtfuser.gtfuserdata[msgauthorid]['garage'][i]['rating'] = gtfuser.gtfuserdata[msgauthorid]['garage'][i]['rating']
          .replace('🏎️3️⃣', '<:gt3:698962765443891280>')
          .replace('🏎️4️⃣', '<:gt4:698962765095632967>')
          .replace('🏎4️⃣', '<:gt4:698962765095632967>')
          .replace('🏎3️⃣', '<:gt3:698962765443891280>');
      }
      gtfuser.gtfuserdata[msgauthorid]['version'] = 4;
    }
    if (gtfuser.gtfuserdata[msgauthorid]['version'] < 5) {
      gtfuser.gtfuserdata[msgauthorid]['racedetails'] = [];
      gtfuser.gtfuserdata[msgauthorid]['version'] = 5;
    }
    if (gtfuser.gtfuserdata[msgauthorid]['version'] < 7) {
      gtfuser.gtfuserdata[msgauthorid]['settings'] = {
        'RACE DM': 0,
        'MILEAGE': 0,
        'TIME OFFSET': 0,
        'PROGRESSBAR': ['⬜', '⬛'],
        'COMPACTMODE': 'Off',
        'HOMELAYOUT': 0,
        'HOMECOLOR': 0,
      };
      gtfuser.gtfuserdata[msgauthorid]['numgiftearned'] = 0
      gtfuser.gtfuserdata[msgauthorid]['version'] = 7;
    }

    require(gtffile.EMBED).success('✅ Success', 'Update Complete!', 5000, true, embed, msg, msgauthorid);
    return;
  },
};
