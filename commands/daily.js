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

module.exports = {
  name: 'daily',
  title: 'GTF Daily Workout',
  cooldown: 5,
  level: 4,
  delete: true,
  description: ['!daily - Earns a random car from any GTF Dealership to be added to your garage.\nYou need to drive 26.2mi/42.1km in a span of 24 hours in order to use this command.\nYou can set your time zone in the settings.'],
  
  requirecar: true,
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
    embed.setTitle('__GTF Daily Workout - Prize__');

    var prizes = [];

    if (stats.dailyworkout(undefined, msgauthorid)) {
      require(gtffile.EMBED).error('❌ Daily Workout Completed', 'You have already earned your daily workout for the day.', embed, msg, msgauthorid);
      return;
    }

    require(gtffile.EMBED).checkgarageerror(embed, msg, msgauthorid);

    if (parseFloat(stats.mileage('KM', false, msgauthorid)) < 42.1 && parseFloat(stats.mileage('MI', false, msgauthorid)) < 26.2) {
      require(gtffile.EMBED).error('❌ Invalid Daily Workout', 'You are unable to earn your daily workout car because you have not drove 26.2mi/42.1km.', embed, msg, msgauthorid);
      return;
    }
    stats.dailyworkout(true, msgauthorid);

    results = '**You have earned a new car.**';
    var prizes = require(gtffile.CARS).randomcars(['Any'], [''], 4);

    require(gtffile.MARKETPLACE).fourcargifts('GTF Daily Workout', results, prizes, embed, msg, msgauthorid);
  },
};
