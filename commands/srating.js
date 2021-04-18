var stats = require('../functions/profile/f_stats');
var emote = require('../index');
var gtftools = require('../functions/misc/f_tools');

const Discord = require('discord.js');
const client = new Discord.Client();
var gtf = process.env;
////////////////////////////////////////////////////
var dw = require('../index');

module.exports = {
  name: 'srating',
  title: 'Sportsmanship Rating',
  cooldown: 3,
    level: 0,
  delete: true,
  aliases: ['sr'],
    channels: ["gtf-mode", "testing", "gtf-demo"],

  requirecar: false,
  availinmaint:true,
   requireuserdata:false,
  usedduringrace: true,
  usedinlobby: true,
  description: ['!srating - Shows the possible chances for Sportsmanship ranging from E to S.', '!srating [query] - Displays a random Sportsmanship rating for the message or image.'],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args = ''
    var results = ''
    var info = ""
    //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      // 

    var ratings = ["E", "D", "D", "C", "C", "C", "B", "B", "B", "A", "A", "S"]
    var rating = ratings[Math.floor(Math.random() * ratings.length)]

    if (query.length == 0 && msg.attachments.size == 0) {
      embed.setTitle(emote.gtlogoblue + ' __Sportmanship Rating Calculator - Chances__');
      results = "**E:** " + (Math.round( 1000 * (ratings.filter(x => x == "E").length / ratings.length)) / 1000) * 100  + "%" + "\n" + 
       "**D:** " + (Math.round( 1000 * (ratings.filter(x => x == "D").length / ratings.length)) / 1000) * 100  + "%" + "\n" + 
        "**C:** " + (Math.round( 1000 * (ratings.filter(x => x == "C").length / ratings.length)) / 1000) * 100  + "%" + "\n" + 
         "**B:** " + (Math.round( 1000 * (ratings.filter(x => x == "B").length / ratings.length)) / 1000) * 100  + "%" + "\n" + 
          "**A:** " + (Math.round( 1000 * (ratings.filter(x => x == "A").length / ratings.length)) / 1000) * 100  + "%" + "\n" + 
                "**S:** " + (Math.round( 1000 * (ratings.filter(x => x == "S").length / ratings.length)) / 1000) * 100  + "%" + "\n"
      embed.setDescription(results);
      msg.channel.send(embed)
      return
    }

    embed.setTitle(emote.gtlogoblue + ' __Sportmanship Rating Calculator__');
   var content = query.join(" ")
   if (content.length == 0) {
     content = "`None`"
   }
      results =  "**Message:** " + content + "\n" + "**Sportsmanship Rating:** "+ emote.loading
      embed.setDescription(results);
      if (msg.attachments.size >= 1) {
        msg.attachments.forEach(attachment => {
        embed.setImage(attachment.proxyURL)
});
      }
      msg.channel.send(embed).then(msg => {
        gtftools.interval(
          function() {
            embed.setColor(0x808080);
            results = "**Message:** " + content + "\n" + "**Sportsmanship Rating:** " + rating;
            embed.setDescription(results);
            msg.edit(embed);
          },
          2000,
          1
        );
      });
    }
};
