var gtf = require('/app/functions/f_gtf');
var stats = require('/app/functions/profile/f_stats');
var emote = require('/app/index');
var gtftools = require('/app/functions/misc/f_tools');
var gtferror = require('/app/functions/misc/f_errors');
var gtfperf = require('/app/functions/marketplace/f_perf');
var exp = require('/app/profile/expprofile');

const Discord = require('discord.js');
const client = new Discord.Client();
var gtffile = process.env;
////////////////////////////////////////////////////

module.exports = {
  name: 'gift',
  cooldown: 3,
  level:0,
  delete: true,
  description: ["Test"],
  aliases: ['inv', 'inventory', 'gifts'],
  requirecar: true,
  usedduringrace: false,
  usedinlobby: true,
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(stats.userid(msgauthorid)).user
      .username;
    embed.setAuthor(
      user,
      msg.guild.members.cache
        .get(stats.userid(msgauthorid))
        .user.displayAvatarURL()
    );
    var args = '\n' + '`Args: !gifts `' + '\n';

    /* Setup */
    var results = ' ';
    var page = 0;
    var selected = false;

    if (stats.gifts(msgauthorid).length == 0) {
      require(gtffile.EMBED).error(
        '❌ No Gifts',
        'You do not have any gifts available.',
        embed,
        msg,
        msgauthorid
      );
      return;
    }
    embed.setTitle(
      '__📦 My Inventory: ' +
        stats.gifts(msgauthorid).length +
        ' / ' +
        gtf.giftlimit +
        ' Items__'
    );

    if (!isNaN(query[0])) {
      query.unshift('accept');
      query[1] = parseInt(query[1]);
    }
    console.log(query)
    if (query[0] == "accept") {
      selected = true
      var number = query[1]
      var gifts = stats.gifts(msgauthorid)
      stats.gift(gifts[number - 1]["name"], gifts[number - 1], gifts[number - 1]["type"], embed, msg, msgauthorid)
    }

    if (selected) {
      return
    } else {
      var list = stats.gifts(msgauthorid).map(function(item) {
        return [item['author'] + "\r" + item['name'] + " " + item['type'], ' '];
      });
    }
    results = gtftools.list(list, page, '', '', true, '', 10, msgauthorid);

    embed.setDescription(results);
    embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));

    if (selected) {
      embed.addField(
        stats.main(msgauthorid),
        args + stats.currentcarmain(msgauthorid)
      );
    } else {
      gtftools.createpages(
        results,
        list,
        page,
        '',
        '',
        false,
        '',
        10,
        [query, 'gift'],
        embed,
        msg,
        msgauthorid
      );
      return;
    }
  },
};
