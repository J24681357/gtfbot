var gtf = require("/app/functions/f_gtf");
var stats = require("/app/functions/profile/f_stats");
var emote = require("/app/index");
var gtftools = require("/app/functions/misc/f_tools");
var gtfperf = require("/app/functions/marketplace/f_perf");
var exp = require("/app/profile/expprofile");

const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////

module.exports = {
  name: "jay",
  title: "Jay The Fox",
  cooldown: 5,
    level: 0,
  delete: true,
  roles: ["🦊-enabled"],
  requirecar: false,
  usedduringrace: true,
  usedinlobby: true,
  description: ["!jay [\"text\"] - Responds to [\"text\"] with a yes, no, or others.", 
                "!jay [rate] [\"text\"] - Rates [\"text\"] out of 10 (or higher)."],
  execute(msg, query, msgauthorid) {
    /* Setup */
    const embed = new Discord.MessageEmbed();
    embed.setColor(0xF77C14);

    var user = msg.guild.members.cache.get(msgauthorid).user.username
    embed.setAuthor(user, msg.guild.members.cache.get(msgauthorid).user.displayAvatarURL());
    var args = ""

    /* Setup */

    var results = " ";

    var memory = require(gtffile.JAY).memory;
    var image = ["https://raw.githubusercontent.com/J24681357/gtfitness/master/images/jay/normal.png", "https://raw.githubusercontent.com/J24681357/gtfitness/master/images/jay/normal2.png"][Math.floor(Math.random() * 2)]

    query = query.join(" ").replace("?", "")

    if (!memory["Jay"])
      memory["Jay"] = {
        memory: [],
        hunger: 100,
      };
    var rmemory =
      memory["Jay"]["memory"][
        Math.floor(Math.random() * memory["Jay"]["memory"].length)
      ];

    var mark = [" ", "?", "!", "!?", "!?!", "."];
    var rmark = mark[Math.floor(Math.random() * mark.length)];

    var nom = ["noms", "nom nom", "nom nom nom", "nom nom nom nom", "eats", "devours"];
    var rnom = nom[Math.floor(Math.random() * nom.length)];

    var yesverbs = [
      "hope for",
      "admire",
      "appreciate",
      "go for",
      "love",
      "adore",
      "approve",
      "definitely agree",
      "cherish",
      "dig",
      "thumbs up for"
    ];
    var yverb = yesverbs[Math.floor(Math.random() * yesverbs.length)];

    var noverbs = [
      "dislike",
      "hate",
      "disapprove",
      "regret",
      "disfavor",
      "abominate",
      "definitely disagree",
      "not go for",
      "not like",
      "thumbs down for"
    ];
    var nverb = noverbs[Math.floor(Math.random() * noverbs.length)];

    var yeschoices = [
      "Yes.",
      "Yes! *smiles*",
      "Yes! *wags tail*",
      "Yes! *dances*",
      "Heck yeah!",
      "Yes, I would " + yverb + " that, " + user + ".",
      "Yes, I would " + yverb + " that very much!",
      "\"" + query + "\"" + "? " + "I would be interested.",
      "\"" + query + "\"" + "? " + "Of course!",
      "\"" + query + "\"" + "? " + "Yes!",
      "Yeah.",
      "*gives you the sparkly eyes*"
    ];
    var nochoices = [
      "No.",
      "No! *sad face*",
      "No no no! *angry face*",
      "No no.. *frown face*",
      "Heck no.",
      "No, I would " + nverb + " that, " + user + ".",
      "No, I would " + nverb + " buddy.",
      "\"" + query + "\"" + "? " + "I would " + nverb + " it!",
      "\"" + query + "\"" + "? " + "Nope.",
     "\"" + query + "\"" + "? " + "No.",
      "Nah.",
      "*stares at " + user + " with anger*"
    ];

    var others = [
      "*licks " + user + "'s face*.",
      "Did I ever tell you that I love cheesecake? *smiles*",
      "Not sure if I can respond to that.",
      "Your response is funny! *laughs*",
      "*punches " + user + "*",
      "What?",
      "I forgot what you said. hehe..",
      "I think my owner can answer that better than me.",
      "*leaves the room*",
      "Boop!",
      "*yawns*"
    ];

    var memorychoices = [
      "Hey! Let's talk.",
      "Let's chat about",
      "Hmm,",
      "I'm thinking...",
      "I thought",
      "Huh,",
      "What,",
      "Uh huh,",
      "I remember something...",
      "For some reason,",
      "Hi,",
      "Bye,",
      "Oh,",
      ""
    ];
    var rmemorychoices =
      memorychoices[Math.floor(Math.random() * memorychoices.length)];
    var foods = [
      "🍇 Grapes",
      "🍈 Melon",
      "🍉 Watermelon",
      "🍊 Tangerine",
      "🍋 Lemon",
      "🍌 Banana",
      "🍍 Pineapple",
      "🥭 Mango",
      "🍎 Red Apple",
      "🍏 Green Apple",
      "🍐 Pear",
      "🍑 Peach",
      "🍒 Cherries",
      "🍓 Strawberry",
      "🥝 Kiwi Fruit",
      "🍅 Tomato",
      "🥥 Coconut",
      "🥑 Avocado",
      "🍆 Eggplant",
      "🥔 Potato",
      "🥕 Carrot",
      "🌽 Ear of Corn",
      "🌶 Hot Pepper",
      "🥒 Cucumber",
      "🥬 Leafy Green",
      "🥦 Broccoli",
      "🍄 Mushroom",
      "🥜 Peanuts",
      "🌰 Chestnut",
      "🍞 Bread",
      "🥐 Croissant",
      "🥖 Baguette Bread",
      "🥨 Pretzel",
      "🥯 Bagel",
      "🥞 Pancakes",
      "🧀 Cheese Wedge",
      "🍖 Meat on Bone",
      "🍗 Poultry Leg",
      "🥩 Cut of Meat",
      "🥓 Bacon",
      "🍔 Hamburger",
      "🍟 French Fries",
      "🍕 Pizza",
      "🌭 Hot Dog",
      "🥪 Sandwich",
      "🌮 Taco",
      "🌯 Burrito",
      "🥙 Stuffed Flatbread",
      "🍳 Scrambled Eggs",
      "🥘 Shallow Pan of Food",
      "🍲 Pot of Food",
      "🥣 Food In a Bowl",
      "🥗 Green Salad",
      "🍿 Popcorn",
      "🧂 Salt",
      "🥫 Canned Food",
      "🍱 Bento Box",
      "🍘 Rice Cracker",
      "🍙 Rice Ball",
      "🍚 Cooked Rice",
      "🍛 Curry Rice",
      "🍜 Steaming Bowl",
      "🍝 Spaghetti",
      "🍠 Roasted Sweet Potato",
      "🍢 Oden",
      "🍣 Sushi",
      "🍤 Fried Shrimp",
      "🍥 Fish Cake With Swirl",
      "🥮 Moon Cake",
      "🍡 Dango",
      "🥟 Dumpling",
      "🥠 Fortune Cookie",
      "🥡 Takeout Box",
      "🍦 Soft Ice Cream",
      "🍧 Shaved Ice",
      "🍨 Ice Cream",
      "🍩 Doughnut",
      "🍪 Cookie",
      "🎂 Birthday Cake",
      "🍰 Shortcake",
      "🧁 Cupcake",
      "🥧 Pie",
      "🍫 Chocolate Bar",
      "🍬 Candy",
      "🍭 Lollipop",
      "🍮 Custard",
      "🍯 Honey Pot",
      "🍼 Baby Bottle",
      "🥛 Glass of Milk",
      "☕ Hot Beverage",
      "🍵 Teacup Without Handle",
      "🍹 Tropical Drink"
    ];
    
    var hungerchoices = ["I'm hungry.", "I don't want to answer because I'm hungry!", "Feed me!", "I'm a hungry foxxo!"]
    var hungerchoicesfull = ["I'm full!", "No food for me.", "I'm not starving."]

    var chance = Math.round(Math.random() * 1);
    var chance2 = Math.round(Math.random() * 10);
    var rate = Math.round(Math.random() * 11);
    var food = false
    for (var item in foods) {
        if (foods[item].substring(0, 2) == query) {
          food = true
          break;
        }
    }


    if (query.match(/@everyone/gi) || query.match(/@here/gi)) {
      results = "Not so fast mister UwU.";
    } else if (food) {
      results = "Thanks for the **" + foods[item] + "** " + user + ", *" + rnom + "*. " + " **+" + 1 + "**" + emote.credits;
      stats.addcredits(1, msgauthorid);
    memory["Jay"]["hunger"] += 50
    if (memory["Jay"]["hunger"] >= 100) {
        memory["Jay"]["hunger"] = 100
    }
      
    } else if (query.match(/hi/gi) && query.length == 2) {
      results = "Hello, " + user + "!";
    } else if (query.match(/hello/gi) && query.length == 5) {
      results = "Hello, " + user + "!";
    } else if (query === "") {
      results = rmemorychoices + " " + rmemory.replace(/'/g, "") + rmark;
    } else if (query.split(" ")[0] == "rate") {
      results = "I would " + query + " a `" + rate + "/10`, " + user + ".";
    } else if (
      query.match(/ cheesecake /gi) ||
      query.match(/cheesecake /gi) ||
      query.match(/ cheesecake/gi) ||
      query.match(/cheesecake/gi)
    ) {
      results = "**UwU**";
    } else {
      if (chance == 1) {
      results = yeschoices[Math.floor(Math.random() * yeschoices.length)];
      memory["Jay"]["memory"].unshift([query].join(" ").replace("?", ""));
      image = "https://raw.githubusercontent.com/J24681357/gtfitness/master/images/jay/happy.png"
      if (chance2 < 1) {
        results = others[Math.floor(Math.random() * others.length)];
      }
    } else {
      results = nochoices[Math.floor(Math.random() * nochoices.length)];
      memory["Jay"]["memory"].unshift([query].join(" ").replace("?", ""));
      image = "https://raw.githubusercontent.com/J24681357/gtfitness/master/images/jay/angry.png"
      if (chance2 < 1) {
        results = others[Math.floor(Math.random() * others.length)];
      }
    }
    }
    if (memory.length == 50) {
      memory.pop()
    }

    if (query === "") {
      query = ""
    } else {
      query = '"' + query + '"' + "\n"
    }
    var square = ["⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛","⬛", "⬛"]
    for (var i = 0; i < square.length; i++) {
      if (i * 10 <= memory["Jay"]["hunger"]) {
        square[i] = "🟧"
      } else {
        break;
      }
    }
    memory["Jay"]["hunger"] -= gtftools.randomInt(1,5)
    if (memory["Jay"]["hunger"] <= 0) {
        memory["Jay"]["hunger"] = 0 
    }
    /*if (memory["Jay"]["hunger"] >= 90) {
      results = hungerchoicesfull[Math.floor(Math.random() * hungerchoicesfull.length)];
      image = "https://raw.githubusercontent.com/J24681357/gtfitness/master/images/jay/normal.png"
    } */
    if (memory["Jay"]["hunger"] <= 10) {
      results = hungerchoices[Math.floor(Math.random() * hungerchoices.length)];
      image = "https://raw.githubusercontent.com/J24681357/gtfitness/master/images/jay/angry.png"
    }
    results = query + " \n" + "**Jay The Fox:** " + results + "\n" + "**Hunger: **" + square.join("")

    embed.setDescription(results);
    embed.setThumbnail(
      image
    );

    msg.channel.send(embed);
  }
};
