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

module.exports = {
  name: 'garage',
  title: 'My Garage',
  level:0,
  cooldown: 3,
  delete: true,
  description: [
    '!garage - Displays the list of all of your cars.\nFPP is displayed for each car.',
    '!garage [view] [(number)] - Views information about a car associated with the [(number)] from the list in your garage.',
    '!garage [(number)] - Selects a car associated with the [(number)] from the list in your garage.',
    '!garage sell [(number)] - Sells a car with its Selling Price. The car is associated with the [(number)] from the list in your garage.',
    'You can also sell a range of cars using **!garage sell** [(number)-(number)].',
  ],
  aliases: ['g'],
  requirecar: true,
  usedduringrace: false,
  usedinlobby: true,
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(msgauthorid).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = '\n' + '`Args: !garage [(number)|sell (number)|view (number)|select (number)]`' + '\n';

    /* Setup */
    var results = ' ';
    var page = 0;
    var selected = false;
    var purchase = false;
    var viewonly = false;
    var accept = true;
    var regulate = false;

    embed.setTitle('__My Garage: ' + stats.garagecount(msgauthorid) + ' / ' + gtf.garagelimit + ' Cars__');

    if (!isNaN(query[0])) {
      query.unshift('select');
      query[1] = parseInt(query[1]);
    }

    if (query[0] == 'sell') {
      selected = true;
      purchase = true;
      var number = query[1];
      var number2 = 0;
      if (number.includes('-')) {
        number = parseInt(query[1].split('-')[0]);
        number2 = parseInt(query[1].split('-')[1]);
      } else {
        number2 = number;
      }
      console.log(number);
      console.log(number2);

      if (number <= 0 || (isNaN(number) || isNaN(number2)) || (number === undefined || number2 === undefined) || (number > stats.garagecount(msgauthorid) || number2 > stats.garagecount(msgauthorid)) || number2 < number) {
        require(gtffile.EMBED).error('❌ Invalid ID', 'This ID does not exist in your garage.', embed, msg, msgauthorid);
        return;
      }
      if (number <= stats.currentcarnum(msgauthorid) && number2 >= stats.currentcarnum(msgauthorid)) {
        require(gtffile.EMBED).error('❌ Invalid ID', 'You cannot sell your current car.', embed, msg, msgauthorid);
        return;
      }
      console.log(number);
      if (number2 == number) {
        var car = stats.garage(msgauthorid)[number - 1];
        require(gtffile.MARKETPLACE).sell(user, car, 'CAR', embed, msg, msgauthorid);
      } else {
        require(gtffile.MARKETPLACE).sell(user, [number, number2], 'CARS', embed, msg, msgauthorid);
      }
    } else if (query[0] == 'view') {
      var number = query[1];
      if (number === undefined) {
        number = stats.currentcarnum(msgauthorid);
      }
      if (number <= 0 || isNaN(number) || number > stats.garagecount(msgauthorid)) {
        require(gtffile.EMBED).error('❌ Invalid ID', 'This ID does not exist in your garage.', embed, msg, msgauthorid);
        return;
      }
      var car = stats.garage(msgauthorid)[number - 1];
      results = stats.view(car, msgauthorid);
      stats.addcount(msgauthorid);
      embed.setDescription(results);
      msg.channel.send(embed);
      return;
    } else if (query[0] == 'select') {
      selected = true;
      var number = parseInt(query[1]);
      var changecar = stats.setcurrentcar(number, msgauthorid);
      if (changecar == 'Invalid') {
        require(gtffile.EMBED).error('❌ Invalid ID', 'This ID does not exist in your garage.', embed, msg, msgauthorid);
        return;
      } else {
        stats.addcount(msgauthorid);
        var car = stats.garage(msgauthorid)[number - 1];
        require(gtffile.EMBED).success('✅ Success', 'Selected the **' + car['name'] + ' ' + car['FPP'] + emote.fpp + '**' + ' `🚘ID:' + number + '`.', 5000, true, embed, msg, msgauthorid);
      }
      return;
    } else if (query[0] == 'regulate!🏴') {
      regulate = true;
      stats.addcount(msgauthorid);
      var event = query[1];
      viewonly = true;
      var filter = stats.garage(msgauthorid).filter(function(x) {
        var regulations = gtf.checkregulations(x, event);
        return regulations[0];
      });
      query.pop();
      query.pop();
    }

    if (purchase) {
      return;
    }
    if (selected) {
      embed.fields = [];
      embed.setDescription(results);
      msg.channel.send(embed).then(msg => {
        msg.delete({ timeout: 5000 });
      });
    } else {
      if (viewonly) {
        embed.fields = [];
        if (filter.length != 0) {
          embed.setTitle('❗ **' + filter.length + ' Garage Cars Eligible (' + event['title'] + ' ' + event['eventid'] + ')**');
        } else {
          embed.setTitle('❗ **No Garage Cars Eligible (' + event['title'] + ' ' + event['eventid'] + ')**');
          require(gtffile.EMBED).warning('⚠ Warning', '0 garage cars are eligible for this event.', embed, msg, msgauthorid);
        }
        var list = [];
        var findex = 1;
        var cars = stats.garage(msgauthorid);
        for (var i = 0; i < stats.garagecount(msgauthorid); i++) {
          if (typeof filter[findex - 1] !== 'undefined') {
            if (cars[i]['ID'] == filter[findex - 1]['ID']) {
              list.push(['`🚘ID:' + (i + 1) + '` ' + '**' + cars[i]['name'] + '**', cars[i]['FPP']]);
              findex++;
            }
          }
        }
      } else {
        var list = stats.garage(msgauthorid).map(function(car) {
          return [car['name'], car['FPP']];
        });
      }
      if (regulate) {
        results = gtftools.list(list, page, '', emote.fpp, false, '', 10, msgauthorid);
      } else {
        results = gtftools.list(list, page, '🚘ID:', emote.fpp, true, '`', 10, msgauthorid);
      }

      embed.setDescription(results);

      if (!viewonly) {
        embed.addField(stats.main(msgauthorid), args + stats.currentcarmain(msgauthorid));
      }
      gtftools.createpages(results, list, page, '🚘ID:', emote.fpp, true, '`', 10, [query, 'garage'], embed, msg, msgauthorid);
      return;
    }
    /*   var newcar = [id, make, name, sell, rating, ["FPP " + fpp], ["Col 0"], ["E S 0"], ["Tr S 0"], ["Su S 0"], ["We S 0"], ["Tu S 0"], ["Nos S 0"], ["Oil 100"], ["Clean 100"], ["Dam 100"], ["Rim 0"]] */
  },
};
