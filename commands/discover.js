var stats = require('../functions/profile/f_stats');
var emote = require('../index');
var gtftools = require('../functions/misc/f_tools');

const Discord = require('discord.js');
const client = new Discord.Client();
var gtf = process.env;
////////////////////////////////////////////////////

module.exports = {
  name: 'discover',
  title: 'GTS Livery Search',
  cooldown: 0,
  level: 0,
  channels: ["testing"],

  delete: false,
  availinmaint:false,
   requireuserdata:false,
  requirecar: false,
  usedduringrace: false,
  usedinlobby: false,
  description: [
    '!decal ["query"] - Return search results of Gran Turismo Sport decals from a ["query"].\nFetched from https://gtswiki.gt-beginners.net/decal/',
  ],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username;
    embed.setAuthor(
      user,
      msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL()
    );
    var args = '';
    var results = ' ';
        //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //      //


    var success = true;
    var thumbnail = true;
    var page = 0;
    var type = query.shift()

 
    if (query.length == 0) {
      require(gtf.EMBED).error('❌ Invalid Arguments', 'Your query is empty.', embed, msg, userdata);
      return
    }

    if (query.length >= 2) {
      var m = query.join('+');
    } else {
      var m = query[0];
    }
    var dict = {
      "decal":
       {"url": 'https://gtswiki.gt-beginners.net/decal/?searchword='+ m + '&lang=us&type=0&noid=1'},
      "car":
      {"url": 'https://gts.gt-beginners.net/livery/?cartag=&searchword='+ m + '&type=0&d='},
      "helmet":
      {"url": 'https://gts.gt-beginners.net/helmet/?searchword='+ m},
      "suit": 
      {"url": 'https://gts.gt-beginners.net/wear/?searchword='+ m}
       }
      //var psnid = "&noid=1"
      var psnid = ''


    results = require(gtf.GTF).loadingscreen("**Keyword:** " + query.join(' '));
    embed.setTitle('__**GTS Livery Search**__');
    embed.setDescription(results);
    if (query === undefined) {
      require(gtf.EMBED).error(
        '❌ Error',
        'Invalid arguments.',
        embed,
        msg,
        userdata
      );
      return;
    }
    msg.channel.send(embed).then(msg => {
      var https = require('https');
       /* if (true) {
          psnid = ""
       }*/
      https.get(dict[type]["url"] + psnid,
        resp => {
          let data = '';
          resp.on('data', chunk => {
            data += chunk;
          });

          resp.on('end', () => {
            setTimeout(function() {
              if (data.includes("The query found over 5000 results.")) {
                
                msg.delete({})
                embed.setTitle('__**GTS Livery Search**__');
                require(gtf.EMBED).error(
                  '❌ Error',
                  'API excceeded the amount of results to process this query.\n',
                  embed,
                  msg,
                  userdata
                );
                return;
              }
              var liveries = data
                .split('</tr>')
                .slice(1, 20).filter(x => x.includes('<td class="title">'))
                .map(function(x) {
                  var title = x
                    .split('<td class="title">')[1]
                    .split('</td>')[0];
                  var author = x
                    .split('<td class="author">')[1]
                    .split('</td>')[0];
                  var comment = x
                    .split('<td class="comment">')[1]
                    .split('</td>')[0];
                  if (type == "decal") {
                  var image =
                    'https://gtswiki.gt-beginners.net/' + type +
                    x
                      .split('src=".')[1]
                      .split('" width=')[0];
                  } else if (type == "car") {
                    var image = x.split('<amp-img class=\"sumb\" src=\"')[1].split('" width=')[0];
                  } else if (type == "helmet") {
                    var image = x.split('width="200px" src=\"')[1].split('\"></a>')[0]
                  } else if (type == "suit") {
                    var image = x.split('<img class="sumb" src=\"')[1].split('\"></a>')[0]
                  }
                  var link = x
                    .split('<a href="')[1]
                    .split('" target=')[0];
                  return [
                    title,
                    author,
                    comment,
                    image,
                    link,
                  ];
                });
              if (liveries.length == 0) {
                msg.delete({})

                require(gtf.EMBED).error(
                  '❌ Error',
                  'Query returned an error for any of these reasons:' +
                  '\n\n' +
                  'Query is invalid.\n' +
                  'There were no decals found.\n' +
                  'API excceeded the amount of results to process.\n' +
                  'Website has got an error.',
                  embed,
                  msg,
                  userdata
                );
                return;
              }
              function update() {
                results =
                  '[' +
                  liveries[page][0] +
                  ']' +
                  '(' +
                  liveries[page][4] +
                  ')' +
                  '\n' +
                  '**Author:** ' +
                  liveries[page][1] +
                  '\n' +
                  '**Description:** ' +
                  liveries[page][2] +
                  '\n' +
                  '**Link:** ' +
                  liveries[page][4];
                embed.setDescription(results);
                if (thumbnail) {
                  embed.image = [];
                  embed.setThumbnail(liveries[page][3]);
                } else {
                  embed.thumbnail = [];
                  embed.setImage(liveries[page][3]);
                }
                embed.setFooter(
                  'Page: ' +
                  (page + 1) +
                  ' / ' +
                  liveries.length
                );
              }
              update();
              msg.edit(embed).then(msg => {
                function back() {
                  if (page != 0) {
                    page--;
                  }
                  update();
                  msg.edit(embed);
                }

                function next() {
                  if (page != liveries.length - 1) {
                    page++;
                  }
                  update();
                  msg.edit(embed);
                }
                function image() {
                  if (thumbnail) {
                    thumbnail = false;
                  } else {
                    thumbnail = true;
                  }
                  update();
                  msg.edit(embed);
                }

                var emojilist = [
                  [emote.leftarrow, 'leftarrow', back],
                  [emote.rightarrow, 'rightarrow', next],
                  ['🖼', '🖼', image],
                ];

                gtftools.createreactions(
                  emojilist,
                  msg,
                  userdata
                );
              });
            }, 2000);
          });
        }
      );
    });
  },
};
