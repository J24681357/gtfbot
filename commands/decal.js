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
    name: 'decal',
    title: 'GTS Decal Search',
    cooldown: 10,
    level: 0,
    delete: true,
    description: [
        '!decal ["query"] - Return search results of Gran Turismo Sport decals from a ["query"].\nFetched from https://gtswiki.gt-beginners.net/decal/',
    ],
  requirecar: false,
    usedduringrace: false,
    usedinlobby: false,
    execute(msg, query, msgauthorid) {
        /* Setup */
        const embed = new Discord.MessageEmbed();
        embed.setColor(0x0151b0);

        var user = msg.guild.members.cache.get(msgauthorid).user.username;
        embed.setAuthor(
            user,
            msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL()
        );
        var args = '';

        /* Setup */
        var results = ' ';
        var success = true;
        var thumbnail = true;
        var page = 0;
      if (query.length == 0) {
        require(gtffile.EMBED).error('❌ Invalid Arguments', 'Your query is empty.', embed, msg, msgauthorid);
        return
      }

        if (query.length >= 2) {
            var m = query.join('+');
        } else {
            var m = query[0];
        }

        results = gtf.loadingscreen("**Keyword:** " + query.join(' '));
        embed.setTitle('__**GTS Decal Search (BETA)**__');
        embed.setDescription(results);
        if (query === undefined) {
            require(gtffile.EMBED).error(
                '❌ Error',
                'Invalid arguments.',
                embed,
                msg,
                msgauthorid
            );
            return;
        }
        msg.channel.send(embed).then(msg => {
            console.log(m);
            var https = require('https');
            https.get(
                'https://gtswiki.gt-beginners.net/decal/?searchword=' +
                    m +
                    '&type=0&noid=1',
                resp => {
                    let data = '';
                    resp.on('data', chunk => {
                        data += chunk;
                    });

                    resp.on('end', () => {
                        setTimeout(function() {
                          if (data.includes("The query found over 5000 results.")) {
                            console.log(data)
                            msg.delete({})
                                require(gtffile.EMBED).error(
                                    '❌ Error',
                                        'API excceeded the amount of results to process this query.\n',
                                    embed,
                                    msg,
                                    msgauthorid
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
                                    var image =
                                        'https://gtswiki.gt-beginners.net/decal' +
                                        x
                                            .split('src=".')[1]
                                            .split('" width=')[0];
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
                            console.log(liveries);
                            if (liveries.length == 0) {
                            msg.delete({})
                                require(gtffile.EMBED).error(
                                    '❌ Error',
                                    'Search returned an error for any of these reasons:' +
                                        '\n\n' +
                                        'Query is invalid.\n' +
                                        'There were no decals found.\n' +
                                        'API excceeded the amount of results to process.\n' +
                                        'Website has got an error.',
                                    embed,
                                    msg,
                                    msgauthorid
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
                                    '**Comment:** ' +
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
                                    msgauthorid
                                );
                            });
                        }, 2000);
                    });
                }
            );
        });
    },
};
