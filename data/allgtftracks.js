const Discord = require("discord.js");
const client = new Discord.Client();
var gtffile = process.env
////////////////////////////////////////////////////
var gtftools = require("../functions/misc/f_tools");
var rdistance = function() {
  return parseInt(
    gtftools.randomInt(1, 16) +
      "." +
      gtftools.randomInt(0, 9) +
      gtftools.randomInt(0, 9) +
      gtftools.randomInt(0, 9)
  );
};
var rturns = function() {
  return gtftools.randomInt(2, 10);
};


var tracklist = function() {
  var total = 1
  return [
  ["Alsace - Village", 5.423, "Original", 17, "Drift"],
  ["Alsace - Village II", 5.423, "Original", 17, "Drift"],
  ["Andalucia (Circuit)", rdistance(), "Original", 0, "Drift"],
  ["Apricot Hill Raceway", 3.863, "Original", 0, "Drift"],
  ["Apricot Hill Raceway II", 3.863, "Original", 0, "Drift"],
  ["Ascari Full Track", 5.425, "Real", 0, "Drift"],
  ["Autodrome Lago Maggiore - Center", 1.706, "Original", 0, "Drift"],
  ["Autodrome Lago Maggiore - Center II", 1.706, "Original", 0, "Drift"],
  ["Autodrome Lago Maggiore - East", 3.643, "Original", 0, "Drift"],
  ["Autodrome Lago Maggiore - East II", 3.643, "Original", 0, "Drift"],
  ["Autodrome Lago Maggiore - GP", 5.089, "Original", 0, "Drift"],
  ["Autodrome Lago Maggiore - GP II", 5.089, "Original", 0, "Drift"],
  ["Autodrome Lago Maggiore - West", 4.168, "Original", 0, "Drift"],
  ["Autodrome Lago Maggiore - West II", 4.168, "Original", 0, "Drift"],
  ["Autodromo De Interlagos", 4.309, "Real", 0, "Drift"],
  ["Autodromo Nazionale Monza", 5.793, "Real", 0, "Drift"],
  ["Autodromo Nazionale Monza (No Chicane)", 5.793, "Original", 0, "Drift"],
  ["Autodromo Nazionale Monza 1980s", 5.802, "Real", 0, "Drift"],
  ["Autopolis International Racing Course", 4.674, "Real", 0, "Drift"],
  ["Autopolis International Racing Course Shortcut Course", 3.022, "Real", 0, "Drift"],
  ["Autumn Ring", 2.95, "Original", 0, "Drift"],
  ["Autumn Ring II", 2.95, "Original", 0, "Drift"],
  ["Autumn Ring – Mini", 1.281, "Original", 0, "Drift"],
  ["Autumn Ring – Mini II", 1.281, "Original", 0, "Drift"],
  ["Blue Moon Bay Speedway", 3.2, "Original", 0, "N/A"],
  ["Blue Moon Bay Speedway - Infield A", 3.35, "Original", 0, "Drift"],
  ["Blue Moon Bay Speedway - Infield A II", 3.35, "Original", 0, "Drift"],
  ["Blue Moon Bay Speedway - Infield B", 2.68, "Original", 0, "Drift"],
  ["Blue Moon Bay Speedway - Infield B II", 2.68, "Original", 0, "Drift"],
  ["Blue Moon Bay Speedway II", 3.2, "Original", 0, "Drift"],
  ["Brands Hatch GP 1980s", 1.937, "Real", 0, "Drift"],
  ["Brands Hatch GP Circuit", 3.916, "Real", 0, "Drift"],
  ["Brands Hatch Indy 1980s", 1.937, "Real", 0, "Drift"],
  ["Brands Hatch Indy Circuit", 1.944, "Real", 0, "Drift"],
  ["Broad Bean Raceway", 1.665, "Original", 0, "N/A"],
  ["Broad Bean Raceway II", 1.665, "Original", 0, "N/A"],
  ["Cape Ring", 7.07, "Original", 0, "Drift"],
  ["Cape Ring Inside", 2.475, "Original", 0, "Drift"],
  ["Cape Ring North", 3.839, "Original", 0, "Drift"],
  ["Cape Ring Periphery", 4.6, "Original", 0, "Drift"],
  ["Cape Ring South", 3.231, "Original", 0, "Drift"],
  ["Circuit de Barcelona-Catalunya Grand Prix Layout", 4.655, "Real", 0, "Drift"],
  ["Circuit de Sainte-Croix - A", 9.477, "Original", 0, "Drift"],
  ["Circuit de Sainte-Croix - A II", 9.477, "Original", 0, "Drift"],
  ["Circuit de Sainte-Croix - B", 7.062, "Original", 0, "Drift"],
  ["Circuit de Sainte-Croix - B II", 7.062, "Original", 0, "Drift"],
  ["Circuit de Sainte-Croix - C", 10.825, "Original", 0, "Drift"],
  ["Circuit de Sainte-Croix - C II", 10.825, "Original", 0, "Drift"],
  ["Circuit de Spa-Francorchamps", 7.004, "Real", 0, "Drift"],
  ["Circuit de Valencia", 4.051, "Real", 0, "Drift"],
  ["Circuit de la Sarthe", 13.629, "Real", 0, "Drift"],
  ["Circuit de la Sarthe (No Chicanes)", 13.567, "Real", 0, "Drift"],
  ["Circuit de la Sarthe 2005", 13.65, "Real", 0, "Drift"],
  ["Circuit de la Sarthe 2005 (No Chicanes)", 13.588, "Real", 0, "Drift"],
  ["Circuito de Madrid", 3.388, "City", 0, "Drift"],
  ["Circuito de Madrid II", 3.388, "City", 0, "Drift"],
  ["Circuito de Madrid – Mini", 2.125, "City", 0, "Drift"],
  ["Circuito de Madrid – Mini II", 2.125, "City", 0, "Drift"],
  ["Circuito de la Sierra", 27, "Original", 0, "Drift"],
  ["Clubman Stage Route 5", 2.46, "City", 0, "Drift"],
  ["Clubman Stage Route 5 II", 2.46, "City", 0, "Drift"],
  ["Côte d’Azur", 3.351, "City", 0, "Drift"],
  ["Daytona International Speedway", 4.023, "Real"],
  ["Daytona Road Course", 5.729, "Real", 0, "Drift"],
  ["Death Valley (Circuit)", rdistance(), "Original", 0, "Drift"],
  ["Deep Forest Raceway", 3.601, "Original", 0, "Drift"],
  ["Deep Forest Raceway II", 3.601, "Original", 0, "Drift"],
  ["Dragon Trail - Gardens", 4.352, "Original", 0, "Drift"],
  ["Dragon Trail - Gardens II", 4.352, "Original", 0, "Drift"],
  ["Dragon Trail - Seaside", 5.209, "Original", 0, "Drift"],
  ["Dragon Trail - Seaside II", 5.209, "Original", 0, "Drift"],
  ["Eifel (Circuit)", rdistance(), "Original", 0, "Drift"],
  ["Eifel Flat (Circuit)", rdistance(), "Original", 0, "Drift"],
  ["Eiger Nordwand Short Track", 2.436, "Original", 0, "Drift"],
  ["Eiger Nordwand Short Track II", 2.436, "Original", 0, "Drift"],
  ["Fuji International Speedway F", 4.563, "Real", 0, "Drift"],
  ["Fuji International Speedway GT", 4.526, "Real", 0, "Drift"],
  ["Goodwood Motor Circuit", 3.809, "Real", 0, "Drift"],
  ["Gran Turismo Arena (Layout A)", 0.668, "Original", 0, "Drift"],
  ["Gran Turismo Arena (Layout A) II", 0.668, "Original", 0, "Drift"],
  ["Grand Valley East", 2.998, "Original", 0, "Drift"],
  ["Grand Valley East II", 2.998, "Original", 0, "Drift"],
  ["Grand Valley Speedway", 4.945, "Original", 0, "Drift"],
  ["Grand Valley Speedway II", 4.945, "Original", 0, "Drift"],
  ["High Speed Ring", 4, "Original", 0, "Drift"],
  ["High Speed Ring II", 4, "Original", 0, "Drift"],
  ["Indianapolis Road Course", 4.192, "Real", 0, "Drift"],
  ["Indianapolis Super Speedway", 4.023, "Real", 0, "N/A"],
  ["Kyoto Driving Park - Miyabi", 1.953, "Original", 0, "Drift"],
  ["Kyoto Driving Park - Yamagiwa", 4.912, "Original", 0, "Drift"],
  ["Kyoto Driving Park - Yamagiwa + Miyabi", 6.846, "Original", 0, "Drift"],
  ["Kyoto Driving Park - Yamagiwa + Miyabi II", 6.846, "Original", 0, "Drift"],
  ["Kyoto Driving Park - Yamagiwa II", 4.912, "Original", 0, "Drift"],
  ["London", 1.921, "City", 0, "Drift"],
  ["London II", 1.921, "City", 0, "Drift"],
  ["Matterhorn Dristelen", 3.214, "Original", 0, "Drift"],
  ["Matterhorn Riffelsee", 3.301, "Original", 0, "Drift"],
  ["Matterhorn Rotenboden", 3.577, "Original", 0, "Drift"],
  ["Matterhorn Short Track", 0.771, "Original", 0, "Drift"],
  ["Mid-Field Raceway", 3.562, "Original", 0, "Drift"],
  ["Mid-Field Raceway II", 3.562, "Original", 0, "Drift"],
  ["Mount Panorama Circuit", 6.213, "Real", 0, "Drift"],
  ["Mt.Aso (Circuit)", rdistance(), "Original", 0, "Drift"],
  ["Northern Isle Speedway", 0.858, "Original"],
  ["Nürburgring 24h", 25.378, "Real", 0, "Drift"],
  ["Nürburgring GP/D", 3.629, "Real", 0, "Drift"],
  ["Nürburgring GP/F", 5.148, "Real", 0, "Drift"],
  ["Nürburgring Nordschleife", 20.832, "Real", 0, "Drift"],
  ["Nürburgring Type V", 24.433, "Real", 0, "Drift"],
  ["Red Bull Ring", 4.318, "Real", 0, "Drift"],
  ["Red Bull Ring Short Track", 2.336, "Real", 0, "Drift"],
  ["Sardegna - Road Track - A", 5.113, "Original", 0, "Drift"],
  ["Sardegna - Road Track - A II", 5.113, "Original", 0, "Drift"],
  ["Sardegna – Road Track - B", 3.893, "Original", 0, "Drift"],
  ["Sardegna – Road Track - B II", 3.893, "Original", 0, "Drift"],
  ["Sardegna – Road Track - C", 2.661, "Original", 0, "Drift"],
  ["Sardegna – Road Track - C II", 2.661, "Original", 0, "Drift"],
  ["Silverstone Grand Prix Circuit", 3.66, "Real", 0, "Drift"],
  ["Silverstone International Circuit", 2.978, "Real", 0, "Drift"],
  ["Silverstone National Circuit", 2.639, "Real", 0, "Drift"],
  ["Silverstone Stowe Circuit", 1.738, "Real", 0, "Drift"],
  ["Special Stage Route 5", 3.787, "City", 0, "Drift"],
  ["Special Stage Route 5 II", 3.787, "City", 0, "Drift"],
  ["Special Stage Route 7", 23.28, "Original", 0, "Drift"],
  ["Special Stage Route X", 30.283, "Original", 0, "N/A"],
  ["Suzuka Circuit", 5.807, "Real", 0, "Drift"],
  ["Suzuka Circuit East", 2.243, "Real", 0, "Drift"],
  ["Tokyo Bay (Circuit)", rdistance(), "Original", 0, "Drift"],
  ["Tokyo Expressway - Central Inner Loop", 4.369, "City", 0, "Drift"],
  ["Tokyo Expressway - Central Outer Loop", 4.405, "City", 0, "Drift"],
  ["Tokyo Expressway - East Inner Loop", 7.192, "City", 0, "Drift"],
  ["Tokyo Expressway - East Outer Loop", 7.301, "City", 0, "Drift"],
  ["Tokyo Expressway - South Inner Loop", 6.56, "City", 0, "Drift"],
  ["Tokyo Expressway - South Outer Loop", 5.201, "City", 0, "Drift"],
  ["Tokyo R246", 5.117, "City", 0, "Drift"],
  ["Tokyo R246 II", 5.117, "City", 0, "Drift"],
  ["Top Gear Test Track", 2.82, "Real", 0, "Drift"],
  ["Toscana (Tarmac) (Circuit)", rdistance(), "Original", 0, "Drift"],
  ["Trial Mountain Circuit 2020", 5.44, "Original", 0, "Drift"],
  ["Trial Mountain Circuit 2020 II", 5.44, "Original", 0, "Drift"],
  ["Trial Mountain Circuit 2010", 3.983, "Original", 0, "Drift"],
  ["Trial Mountain Circuit 2010 II", 3.983, "Original", 0, "Drift"],
  ["Tsukuba Circuit", 2.045, "Real", 0, "Drift"],
  ["Twin Ring Motegi East", 3.422, "Real", 0, "Drift"],
  ["Twin Ring Motegi Road Course", 4.801, "Real", 0, "Drift"],
  ["Twin Ring Motegi Super Speedway", 2.413, "Real", 0, "N/A"],
  ["Twin Ring Motegi West", 1.49, "Real", 0, "Drift"],
  ["WeatherTech Raceway Laguna Seca", 3.602, "Real", 0, "Drift"],
  ["Willow Springs (Big Willow)", 3.951, "Real", 0, "Drift"],
  ["Willow Springs (Horse Thief Mile)", 1.624, "Real", 0, "Drift"],
  ["Willow Springs (Horse Thief Mile) II", 1.624, "Real", 0, "Drift"],
  ["Willow Springs (Streets of Willow)", 2.675, "Real", 0, "Drift"],
  ["Willow Springs (Streets of Willow) II", 2.675, "Real", 0, "Drift"]
].sort().map(function(x){
    x.unshift(total)
    total++
    return x
  });
}

module.exports.trackslength = tracklist().length;
module.exports.tracks = tracklist();


module.exports.Track = function(name) {
  if (name == undefined) {
    this.id = null
    this.name = null
    this.length = null
    this.type = null
    
    this.drift = null
    return this
  }
  var t = tracklist()
  if (name == "Random" || name == "R" || name == "random") {
    return require(process.env.TRACKS).RandomTrack();
  }
  if (!isNaN(name)) {
    index = parseInt(name);
    this.id = t[index][0];
    this.name = t[index][1];
    this.length = t[index][2];
    this.type = t[index][3];
    
    this.drift = t[index][5];
  } else {
    for (var index = 0; index < t.length; index++) {
      if (t[index][1] == name) {
        this.name = name;
        this.id = t[index][0]
        this.length = t[index][2];
        this.type = t[index][3];
        
        this.drift = t[index][5];
      }
    }
  }
  return this;
}

module.exports.RandomTrack = function(args) {
  if (args == undefined) {
    length = 0
  } else {
    length = args.length
  }
  if (length == 0) {
  var index = Math.floor(Math.random() * tracklist().length);
  var track = tracklist()[index];
  this.id = track[0];
  this.name = track[1];
  this.length = track[2];
  this.type = track[3];
  
  this.drift = track[5];
  return this
} else {
  var list = filtertracks(args)
  console.log(list)
  return list[Math.floor(Math.random() * list.length)]
}
}

module.exports.Tracks = function(args) {
 return filtertracks(args)
}
  
function filtertracks(args) {
   var list = []
  var length = 0
  if (args.name !== undefined && !args.name.length == 0) {
    var name = args.name
    length++
  }
  if (args.category !== undefined && !args.category.length == 0) {
    var category = args.category
    length++
  }
  if (args.drift !== undefined && !args.drift.length == 0) {
  var drift = args.drift
    length++
  }

  var tracklistfiltered = tracklist().filter(function(x) {
    var good = 0
    if (name !== undefined) {
      var namex = new RegExp(name.toString(), "gi");
      if (namex.test(x[1].toString())) {
        good++
      }
    }
    if (drift !== undefined) {
      if (drift == x[5]) {
        good++
      }
    }
    return good == length
  })
  console.log(tracklistfiltered)
  
  for (var index = 0; index < tracklistfiltered.length; index++) {
    var track = {}
        track.id = tracklistfiltered[index][0]
        track.name = tracklistfiltered[index][1]
        track.length = tracklistfiltered[index][2];
        track.type = tracklistfiltered[index][3];
    
        track.drift = tracklistfiltered[index][5];
    list.push(track)
    }
  return list
}