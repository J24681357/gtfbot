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
  name: 'ssrx',
  title: 'Special Stage Route X - 10000m Top Speed Run',
  cooldown: 3,
   level:8,
  delete: true,
  requirecar: true,
  usedduringrace: false,
  usedinlobby: false,
  description: ['!ssrx - Start a 10000m Top Speed Run with your current car.'],
  execute(msg, query, msgauthorid) {
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = '\n' + '`Args: !ssrx`' + '\n';

    /* Setup */

    embed.setThumbnail('https://raw.githubusercontent.com/J24681357/gtfitness/master/images/ssrx/ssrxlogo.png');

    var results = '';
    var results2 = '';
    var mode = 'SSRX';
    var carmode = 'GARAGE';

    var ready = false;
    var main1 = stats.main(msgauthorid);
    var main2 = args + stats.currentcarmain(msgauthorid);
    if (query.length == 0) {
      query = 'Menu';
    }
    if (require(gtffile.EMBED).checknocars(msgauthorid)) {
      require(gtffile.EMBED).error('❌ No Car', 'You do not have a current car.', embed, msg, msgauthorid);
      return;
    }
    var car = stats.currentcar(msgauthorid);
    var ready = true;
    require(gtffile.RACE).preparerace(mode, '', carmode, "", args, embed, msg, msgauthorid);
  },
};
