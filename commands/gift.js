var stats = require('../functions/profile/f_stats');
var emote = require('../index');
var gtftools = require('../functions/misc/f_tools');

const Discord = require('discord.js');
const client = new Discord.Client();
var gtf = process.env;
////////////////////////////////////////////////////

module.exports = {
  name: 'gift',
  cooldown: 3,
  level:0,
  channels: ["gtf-demo", "testing"],
  
  delete: false,
  availinmaint:false,
  description: ["Test"],
  aliases: ['inv', 'inventory', 'gifts'],
  requirecar: true,
  usedduringrace: false,
  usedinlobby: true,
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user
      .username;
    embed.setAuthor(
      user,
      msg.guild.members.cache
        .get(userdata["id"])
        .user.displayAvatarURL()
    );
    var args = '\n' + '`Args: !gifts [(number)]`' + '\n';
    var page = 0
    var results = ''
    var info = ''

    /* Setup */
    var selected = false;
    var reactionson = true

    if (stats.gifts(userdata).length == 0) {
      require(gtf.EMBED).error(
        '❌ No Gifts',
        'You do not have any gifts available.',
        embed,
        msg,
        userdata
      );
      return;
    }
    embed.setTitle(
      '__📦 My Inventory: ' +
        stats.gifts(userdata).length +
        ' / ' +
        require(gtf.GTF).giftlimit +
        ' Items__'
    );

    if (!isNaN(query[0])) {
      query.unshift('accept');
      query[1] = parseInt(query[1]);
    }
    if (query[0] == "accept") {
      selected = true
      var number = query[1]
      var gift = stats.gifts(userdata)[number - 1]
    results = "Redeem?"
  embed.setDescription(results);
  embed.addField(stats.main(userdata), stats.currentcarmain(userdata));
  msg.channel.send(embed).then(msg => {
    function accept() {
      stats.gift("✅" + gift[1]["name"] + " has been redeemed!", gift, embed, msg, userdata)
      return
    }
    
      var emojilist = [[emote.yes,'Yes', accept, "Once"]]

      gtftools.createreactions(emojilist, msg, userdata)
  })
  return
    }

    if (selected) {
      return
    } else {
      var list = stats.gifts(userdata).map(function(item) {
        return [item[1]['author'] + "\r" + item[1]['name'] + " " + item[0], ' '];
      });
    }
    results = gtftools.list(list, page, '', '', true, '', 10, userdata);

    embed.setDescription(results);
    embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));

    if (selected) {
      embed.addField(
        stats.main(userdata),
        args + stats.currentcarmain(userdata)
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
        [query, 'gift', reactionson, info],
        embed,
        msg,
        userdata
      );
      return;
    }
  },
};
