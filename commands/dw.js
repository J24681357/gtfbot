var stats = require('../functions/profile/f_stats');
var emote = require('../index');
var gtftools = require('../functions/misc/f_tools');

const Discord = require('discord.js');
var gtffile = process.env;
////////////////////////////////////////////////////
var dw = require('../index');

module.exports = {
  name: 'dw',
  title: 'GT Sport Daily Workout',
  cooldown: 3,
    level: 0,
  delete: true,
  channels: ["gtf-mode", "testing", "gtf-test-mode"],

  requirecar: false,
  availitoeveryone:true,
  availinmaint:true,
   requireuserdata:true,
  usedduringrace: true,
  usedinlobby: true,
  description: ['!dw - Chooses a random car from the GT Sport car list.', '!dw ["challenge"] - Starts a random Daily Workout challenge where you would need to earn a car that meets a category.\nYou can earn credits here.'],
  execute(msg, query, userdata) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0x0151b0);

    var user = msg.guild.members.cache.get(userdata["id"]).user.username;
    embed.setAuthor(user, msg.guild.members.cache.get(userdata["id"]).user.displayAvatarURL());
    var args = '';
    var page = 0
    var results = ''
    var info = ''

    /* Setup */
    var modeselect = [
      [
        'Abarth ',
        'Alfa Romeo ',
        'Alpine ',
        'Amuse ',
        'Aston Martin ',
        'Audi ',
        'BMW ',
        'Bugatti ',
        'Chevrolet ',
        'Citroën ',
        'Daihatsu ',
        'De Tomaso ',
        'Dodge ',
        'Eckerts Rod & Custom ',
        'Ferrari ',
        'Fiat ',
        'Ford ',
        'Gran Turismo ',
        'Greddy ',
        'Honda ',
        'Hyundai ',
        'Infiniti ',
        'IsoRivolta ',
        'Jaguar ',
        'KTM ',
        'Lamborghini ',
        'Lancia ',
        'Lexus ',
        'Maserati ',
        'Mazda ',
        'McLaren ',
        'Mercedes-Benz ',
        'Mitsubishi ',
        'Nissan ',
        'Pagani ',
        'Peugeot ',
        'Plymouth ',
        'Pontiac ',
        'Porsche ',
        'RE Amemiya ',
        'Renault ',
        'RenaultSport ',
        'Shelby ',
        'Subaru ',
        'Super Formula ',
        'Tesla Motors ',
        'Toyota ',
        'TVR ',
        'Volkswagen ',
      ],
      ['N100', 'N200', 'N300', 'N400', 'N500', 'N600', 'N700', 'N800', 'N1000', 'Gr.X', 'Gr.B', 'Gr.4', 'Gr.3', 'Gr.2', 'Gr.1'],
      ['Austria', 'France', 'Germany', 'Japan', 'Korea', 'PDI', 'UK', 'USA'],
    ];
    var mode = ['Make', 'Category', 'Country'];

    if (query[0] == 'challenge') {
      if (dw.dwcar['daily']['start']) {
        require(gtffile.EMBED).error('❌ Daily Workout Challenge Active', 'There is already a Daily Workout Challenge in progress.', embed, msg, userdata);
        return;
      }
      if (new Date().getTime() < dw.dwcar['daily']['time']) {
        require(gtffile.EMBED).error('❌ Global Cooldown', 'A challenge cannot be started yet. Please wait in ' + '`' + Math.floor((dw.dwcar['daily']['time'] - new Date().getTime()) / 1000 / 60) + '` minutes.', embed, msg, userdata);
        return;
      }
      var modenumber = gtftools.randomInt(0, 2);
      modeselect = modeselect[modenumber];
      dw.dwcar['daily'] = {
        select: modeselect[Math.floor(Math.random() * modeselect.length)],
        start: true,
        prize: 500,
        completed: false,
        mode: modenumber,
        time: new Date().getTime() + 60000 * 30,
      };
      var number = dw.dwcar['daily']['mode'];
      var select = dw.dwcar['daily']['select'];
      var prize = dw.dwcar['daily']['prize'];
      embed.setTitle('🚘 __**Daily Workout Challenge Started**__');
      results = 'The first person to earn a car with a ' + mode[number] + ' of **' + select + '** from the `!dw` command in 3 minutes will win ' + '**' + prize + '**' + emote.credits + '. Good luck!';
      embed.setDescription(results);
      msg.channel.send('**START**\n' + '<@&663248894003773440>',embed).then(msg => {
        gtftools.interval(
          function() {
            if (!dw.dwcar['daily']['completed']) {
              dw.dwcar['daily'] = {
                select: 'None',
                start: false,
                prize: 500,
                completed: true,
                mode: 0,
                time: dw.dwcar['daily']['time'],
              };
              results = "⏲ Time's up! No one has won the Daily Workout Challenge.";
              embed.setDescription(results);
              embed.setTitle('🚘 __**Daily Workout Challenge Ended**__');
              msg.channel.send('**FINISH**\n' + '<@&663248894003773440>', embed);
            }
          },
          180 * 1000,
          1
        );
      });
    } else {

      embed.setTitle(emote.gtlogowhite + ' __GTF Daily Workout__');
      var prize = '';
      var car = require(gtffile.GTSCARS).RandomGTSCar();
      if (dw.dwcar['daily']['start']) {
        if (dw.dwcar['daily']['mode'] == 0) {
          var carselect = car.name;
        }
        if (dw.dwcar['daily']['mode'] == 1) {
          var carselect = car.category;
        }
        if (dw.dwcar['daily']['mode'] == 2) {
          var carselect = car.country;
        }

        if (carselect.includes(dw.dwcar['daily']['select'])) {
          var prize = dw.dwcar['daily']['prize'];
          dw.dwcar['daily'] = {
            select: 'None',
            start: false,
            prize: 500,
            completed: true,
            mode: 0,
            time: dw.dwcar['daily']['time'],
          };
          //stats.addcredits(prize, userdata);
          embed.setColor(0x216c2a);
          msg.channel.send('**FINISH**\n' + '<@&663248894003773440>');
          prize = '\n\n' + user + ' has won the Daily Workout Challenge! ' + '**+' + prize + '**' + emote.credits + '\n\n' + '`Global Cooldown: ' + Math.floor((dw.dwcar['daily']['time'] - new Date().getTime()) / 1000 / 60) + ' minutes`';
        }
      }
      results = '** 🚘 ' + car.name + '**' + ' `' + car.category + '`' + prize;
      embed.setDescription(results);
      if (dw.dwcar['daily']['start']) {
        var mode = ['Make', 'Category', 'Country'];
        var number = dw.dwcar['daily']['mode'];
        embed.setFooter('Daily Workout Challenge Active - ' + mode[number] + ': ' + dw.dwcar['daily']['select'] + ' | Prize: ' + dw.dwcar['daily']['prize'] + ' credits');
      }
      msg.channel.send(embed).then(msg => {
        gtftools.interval(
          function() {
            embed.setColor(0x808080);
            msg.edit(embed);
          },
          3000,
          1
        );
      });
    }
  },
};
