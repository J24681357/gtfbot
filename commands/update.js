var stats = require('../functions/profile/f_stats');
var emote = require('../index');
var gtftools = require('../functions/misc/f_tools');

const Discord = require('discord.js');
const client = new Discord.Client();
var gtffile = process.env;
////////////////////////////////////////////////////
var gtfuser = require('../index');

module.exports = {
  name: 'update',
  title: 'GTF Updater',
  cooldown: 3,
  level: 0, 
  channels: ["gtf-mode", "testing"],

  delete: true,
  availinmaint:false,
  requirecar: false,
  usedduringrace: false,
  usedinlobby: false,
    description: ['!update - Updates your profile to the latest version.'],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args = '';
    var page = 0
    var results = ''
    var info = ""

    /* Setup */
    if (userdata['version'] >= gtfuser.gtfbotconfig['version']) {
      require(gtffile.EMBED).error('❌ Up to Date', 'Your save is already up to the latest version.', embed, msg, userdata);
      return;
    }
    if (userdata['version'] === undefined) {
      userdata['version'] = gtfuser.gtfbotconfig['version']
    } else {
       userdata['version'] = gtfuser.gtfbotconfig['version']
    }

    require(gtffile.EMBED).success('✅ Success', 'Update Complete!', 5000, true, embed, msg, userdata);
    return;
  },
  
}
