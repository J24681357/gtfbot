var stats = require('../functions/profile/f_stats');
var emote = require('../index');
var gtftools = require('../functions/misc/f_tools');

const Discord = require('discord.js');
var gtffile = process.env;
////////////////////////////////////////////////////

module.exports = {
  name: 'garage',
  title: 'My Garage',
  level: 0,
  cooldown: 3,
  aliases: ['g'],
  channels: ["gtf-mode", "testing", "gtf-test-mode"],

  delete: false,
  availitoeveryone:true,
  availinmaint:false,
   requireuserdata:true,
   requirecar: true,
  usedduringrace: false,
  usedinlobby: true,
  description: [
    '!garage - Displays the list of all of your cars.\nFPP is displayed for each car.',
    '!garage [view] [(number)] - Views information about a car associated with the [(number)] from the list in your garage.',
    '!garage [(number)] - Selects a car associated with the [(number)] from the list in your garage.',
    '!garage sell [(number)] - Sells a car with its Selling Price. The car is associated with the [(number)] from the list in your garage.',
    'You can also sell a range of cars using **!garage sell** [(number)-(number)].',
  ],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args = '\n' + '`Args: !garage [(number)|sell (number)|view (number)|select (number)]`' + '\n';
    var page = 0
    var results = ''
    var info = ''

    /* Setup */
    var selected = false;
    var purchase = false;
    var viewonly = false;
    var accept = true;
    var regulate = false;
    var reactionson = true;
    var command = "garage";

    embed.setTitle('__My Garage: ' + stats.garagecount(userdata) + ' / ' + require(gtffile.GTF).garagelimit + ' Cars__');

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

      if (number <= 0 || (isNaN(number) || isNaN(number2)) || (number === undefined || number2 === undefined) || (number > stats.garagecount(userdata) || number2 > stats.garagecount(userdata)) || number2 < number) {
        require(gtffile.EMBED).error('❌ Invalid ID', 'This ID does not exist in your garage.', embed, msg, userdata);
        return;
      }
      if (number <= stats.currentcarnum(userdata) && number2 >= stats.currentcarnum(userdata)) {
        require(gtffile.EMBED).error('❌ Invalid ID', 'You cannot sell your current car.', embed, msg, userdata);
        return;
      }
      if (number2 == number) {
        var car = stats.garage(userdata)[number - 1];
        require(gtffile.MARKETPLACE).sell(user, car, 'CAR', embed, msg, userdata);
      } else {
        require(gtffile.MARKETPLACE).sell(user, [number, number2], 'CARS', embed, msg, userdata);
      }
    } else if (query[0] == 'view') {
      var number = query[1];
      if (number === undefined) {
        number = stats.currentcarnum(userdata);
      }
      if (number <= 0 || isNaN(number) || number > stats.garagecount(userdata)) {
        require(gtffile.EMBED).error('❌ Invalid ID', 'This ID does not exist in your garage.', embed, msg, userdata);
        return;
      }
      var car = stats.garage(userdata)[number - 1];
      var ocar = require(gtffile.CARS).find({"make":[car["make"]], "fullname":[car["name"]],"year":[car["year"]]})[0]
      results = stats.view(car, userdata);
      stats.addcount(userdata);
      embed.setThumbnail(ocar["image"])
      embed.setDescription(results);
         msg.channel.send(embed).then(msg => {
      function view2() {
        var results2 = stats.view2(car, userdata);
        embed.setDescription(results2)
        msg.edit(embed)

      }
      function view1() {
         embed.setDescription(results);
        msg.edit(embed)
      }

      var emojilist = [[emote.leftarrow,'leftarrow', view1], [emote.rightarrow, 'rightarrow', view2]]

      gtftools.createreactions(emojilist, msg, userdata)
    })
      return;
    } else if (query[0] == 'select') {
      selected = true;
      var number = parseInt(query[1]);
      var changecar = stats.setcurrentcar(number, userdata);
      if (changecar == 'Invalid') {
        require(gtffile.EMBED).error('❌ Invalid ID', 'This ID does not exist in your garage.', embed, msg, userdata);
        return;
      } else {
        stats.addcount(userdata);
        var car = stats.garage(userdata)[number - 1];
        require(gtffile.EMBED).success('✅ Success', 'Selected the **' + car['name'] + ' ' + car['fpp'] + emote.fpp + '**' + ' `🚘ID:' + number + '`.', 5000, true, embed, msg, userdata);
      }
      return;
    } else if (query[0] == 'regulate!🏴') {
      regulate = true;
      stats.addcount(userdata);
      var event = query[1];
      viewonly = true;
      var filter = stats.garage(userdata).filter(function(x) {
        var regulations = require(gtffile.GTF).checkregulations(x, event);
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
          require(gtffile.EMBED).error('❌ No Garage Cars Eligible (' + event['title'] + ' ' + event['eventid'] + ')', 'No garage cars are eligible for this event.', embed, msg, userdata);
          return
        }
        var list = [];
        var findex = 1;
        var cars = stats.garage(userdata);
        for (var i = 0; i < stats.garagecount(userdata); i++) {
          if (typeof filter[findex - 1] !== 'undefined') {
            if (cars[i]['ID'] == filter[findex - 1]['ID']) {
              list.push(['`🚘ID:' + (i + 1) + '` ' + '**' + cars[i]['name'] + '**', cars[i]['fpp']]);
              findex++;
            }
          }
        }
      } else {
        var list = stats.garage(userdata).map(function(car) {
          return [car['name'], car['fpp']];
        });
      }
      if (regulate) {
        results = gtftools.list(list, page, '', emote.fpp, false, '', 10, userdata);
        command = 'garage_regulate'
        info = "❓ **Select a car from the list above that is eligible for this event.**"
       // embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
         gtftools.createpages(results, list, page, '', emote.fpp, false, '', 10, [query, command, reactionson, info], embed, msg, userdata);
        return
      } else {
        results = gtftools.list(list, page, '🚘ID:', emote.fpp, true, '`', 10, userdata);
      }

      embed.setDescription(results);

      if (!viewonly) {
        embed.addField(stats.main(userdata), args + stats.currentcarmain(userdata));
      }
      
      gtftools.createpages(results, list, page, '🚘ID:', emote.fpp, true, '`', 10, [query, command, reactionson, info], embed, msg, userdata);
      return;
    }
    /*   var newcar = [id, make, name, sell, rating, ["FPP " + fpp], ["Col 0"], ["E S 0"], ["Tr S 0"], ["Su S 0"], ["We S 0"], ["Tu S 0"], ["Nos S 0"], ["Oil 100"], ["Clean 100"], ["Dam 100"], ["Rim 0"]] */
  },
};
