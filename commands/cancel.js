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
var gtfraces = require('/home/runner/gtfbot/functions/races/f_currentraces');

module.exports = {
  name: 'cancel',
  title: "Cancel Session",
  cooldown: 5,
    level: 0,
  delete: true,
   roles: [],
  requirecar: false,
  usedduringrace: true,
  usedinlobby: false,
  aliases: ['exit', 'quit'],
  description: ['!cancel - Cancels any active session.'],
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);
    var user = msg.guild.members.cache.get(stats.userid(msgauthorid)).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(stats.userid(msgauthorid)).user.displayAvatarURL());
    var args = '';

    var results = '';
    /* Setup */
    if (!stats.raceinprogressstat(msgauthorid)[0]) {
      require(gtffile.EMBED).error('❌ Error', 'You are not in a session.', embed, msg, msgauthorid);
      return;
    } else {
      if (query[0] == '✨✨✨') {
        exitnow(msg);
        return;
      }
      embed.setColor(0xffff00);
      var results = '⚠ Quit your current session?';

      embed.setDescription(results);

      msg.channel.send(embed).then(msg => {
        var emojilist = [[emote.exit, 'gtfexit', exitnow]];

        gtftools.createreactions(emojilist, msg, msgauthorid);
        return;
      });
    }

    function exitnow() {
      embed.setColor(0x0151b0);
      msg.channel.messages
        .fetch({
          around: stats.raceinprogressstat(msgauthorid)[1][1],
          limit: 1,
        })
        .then(messages => {
          messages.first().delete({ timeout: 0 });
        });
      stats.removeracedetails(msgauthorid);

      stats.raceinprogress(false, ['', ''], 'EXIT', msgauthorid);
      require(gtffile.EMBED).success('✅ Success', 'You have left the session.', 5000, false, embed, msg, msgauthorid);
      return;
    }
  },
};
