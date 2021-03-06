var gtf = require("../../files/directories");
var emote = require("../../index");

/*90-87*/
//limit 8.000
module.exports.beginner = function () {
  return {
    b1: {
      title: "Sunday Cup",
      eventid: "B-1",
      positions: [emote.goldtrophy + " 1st|1000", emote.silvertrophy + " 2nd|800", emote.bronzetrophy + " 3rd|600", "4th|500", "5th|400", "6th|300", "7th|200", "8th|100"],
      tracks: [
        [1, "High Speed Ring", 2],
        [2, "Suzuka Circuit East", 3],
        [3, "Autodrome Lago Maggiore - Center", 4],
      ],
      category: ["N200"],
      time: ["Day"],
      weather: ["Clear"],
      grid: 8,
      difficulty: 90,
      fpplimit: 300,
      upperfpp: 260,
      lowerfpp: 100,
      makes: [],
      models: [],
      drivetrains: [],
      types: ["Production", "Aftermarket"],
      prize: ["CREDITS", { id: -1, name: " ", item: 5000 }],
    },
    b2: {
      title: "MX-5/Roadster/Miata Cup",
      eventid: "B-2",
      positions: [emote.goldtrophy + " 1st|1300", emote.silvertrophy + " 2nd|1000", emote.bronzetrophy + " 3rd|800", "4th|500", "5th|400", "6th|300", "7th|200", "8th|100"],
      tracks: [
        [1, "Tsukuba Circuit", 4],
        [2, "Red Bull Ring Short Track", 3],
        [3, "Silverstone Grand Prix Circuit", 2],
      ],
      category: ["N100"],
      time: ["Day"],
      weather: ["Clear"],
      grid: 8,
      difficulty: 89,
      fpplimit: 240,
      upperfpp: 240,
      lowerfpp: 100,
      makes: ["Mazda"],
      models: ["MX-5", "Roadster", "Miata"],
      drivetrains: [],
      types: ["Production", "Race Car", "Aftermarket"],
      prize: ["RANDOMCAR", { id: -1, name: " ", make: ["Mazda"], fullname: ["Mazda MX-5 GT4 2012"] }],
    },
    b3: {
      title: "Madrid Tour",
      eventid: "B-3",
      positions: [emote.goldtrophy + " 1st|1500", emote.silvertrophy + " 2nd|1300", emote.bronzetrophy + " 3rd|1100", "4th|800", "5th|400", "6th|300", "7th|200", "8th|100"],
      tracks: [
        [1, "Circuito de Madrid – Mini", 4],
        [2, "Circuito de Madrid – Mini II", 4],
        [3, "Circuito de Madrid", 2],
      ],
      category: ["N200"],
      time: ["Day"],
      weather: ["Clear"],
      grid: 8,
      difficulty: 87,
      fpplimit: 300,
      upperfpp: 260,
      lowerfpp: 100,
      makes: [],
      models: [],
      drivetrains: [],
      types: ["Production", "Aftermarket"],
      prize: ["CREDITS", { id: -1, name: " ", item: 6000 }],
    },
  };
}; /*
   */ // ["RANDOMCAR", {"make": "Any", "upperfpp":300, "lowerfpp": 200}] // length 12.000
   /*86-84*/
module.exports.amateur = function () {
  return {
    a1: {
      title: "Clubman Cup",
      eventid: "A-1",
      positions: [emote.goldtrophy + " 1st|2500", emote.silvertrophy + " 2nd|2000", emote.bronzetrophy + " 3rd|1500", "4th|1300", "5th|1100", "6th|900", "7th|700", "8th|500", "9th|400", "10th|300"],
      tracks: [
        [1, "Autumn Ring", 4],
        [2, "Autodromo Nazionale Monza", 2],
        [3, "Trial Mountain Circuit 2010", 2],
      ],
      category: ["N300"],
      time: ["Day"],
      weather: ["Clear"],
      grid: 12,
      difficulty: 86,
      fpplimit: 400,
      upperfpp: 350,
      lowerfpp: 250,
      makes: [],
      models: [],
      drivetrains: [],
      types: ["Production", "Aftermarket"],
      prize: ["CREDITS", { id: -1, name: " ", item: 10000 }],
    },
    a2: {
      title: "Clio Cup",
      eventid: "A-2",
      positions: [emote.goldtrophy + " 1st|2600", emote.silvertrophy + " 2nd|2100", emote.bronzetrophy + " 3rd|1600", "4th|1200", "5th|1100", "6th|900", "7th|700", "8th|500", "9th|400", "10th|300"],
      tracks: [
        [1, "Nürburgring GP/F", 2],
        [2, "Broad Bean Raceway II", 10],
        [3, "Red Bull Ring", 3],
      ],
      category: ["N200"],
      time: ["Day"],
      weather: ["Clear"],
      grid: 10,
      difficulty: 90,
      fpplimit: 340,
      upperfpp: 330,
      lowerfpp: 260,
      makes: ["Renault"],
      models: ["Clio"],
      drivetrains: [],
      types: ["Production"],
      prize: ["RANDOMCAR", { id: -1, name: " ", make: ["Renault"], fullname: ["Renault Clio Cup Race Car 2013"] }],
    },
    a3: {
      title: "FR Challenge",
      eventid: "A-3",
      positions: [emote.goldtrophy + " 1st|2200", emote.silvertrophy + " 2nd|1900", emote.bronzetrophy + " 3rd|1600", "4th|1200", "5th|1000", "6th|900", "7th|700", "8th|500", "9th|400", "10th|300"],
      tracks: [
        [1, "WeatherTech Raceway Laguna Seca", 3],
        [2, "Suzuka Circuit", 2],
        [3, "Brands Hatch GP Circuit", 3],
      ],
      category: ["N300"],
      time: ["Day"],
      weather: ["Clear"],
      grid: 12,
      difficulty: 86,
      fpplimit: 400,
      upperfpp: 350,
      lowerfpp: 250,
      makes: [],
      models: [],
      drivetrains: ["FR"],
      types: ["Production"],
      prize: ["CREDITS", { id: -1, name: " ", item: 10000 }],
    },
    a4: {
      title: "Honda Festival",
      eventid: "A-4",
      positions: [emote.goldtrophy + " 1st|2200", emote.silvertrophy + " 2nd|1900", emote.bronzetrophy + " 3rd|1600", "4th|1200", "5th|1000", "6th|900", "7th|700", "8th|500", "9th|400", "10th|300"],
      tracks: [
        [1, "Eiger Nordwand Short Track", 4],
        [2, "Silverstone National Circuit", 5],
        [3, "Alsace - Village II", 2],
      ],
      category: ["N200"],
      time: ["Day"],
      weather: ["Clear"],
      grid: 10,
      difficulty: 86,
      fpplimit: 350,
      upperfpp: 330,
      lowerfpp: 100,
      makes: ["Honda"],
      models: [],
      drivetrains: [],
      types: ["Production", "Aftermarket"],
      prize: ["RANDOMCAR", { id: -1, name: " ", make: ["Honda"], fullname: ["Honda NSX Type-R 1992"] }],
    },
  };
};

/*84-80*/
// length 15.000

module.exports.icleague = function () {
  return {
    ic1: {
      title: "International IC League",
      eventid: "IC-1",
      positions: [emote.goldtrophy + " 1st|3000", emote.silvertrophy + " 2nd|2500", emote.bronzetrophy + " 3rd|2000", "4th|1800", "5th|1600", "6th|1500", "7th|1300", "8th|1100", "9th|1000", "10th|800", "11th|700", "12th|600"],
      tracks: [
        [1, "Special Stage Route 5", 4],
        [2, "Daytona Road Course", 3],
        [3, "Tokyo Expressway - South Outer Loop", 3],
        [4, "Broad Bean Raceway", 10],
      ],
      category: ["N400"],
      time: ["Day"],
      weather: ["Clear"],
      grid: 14,
      difficulty: 84,
      fpplimit: 500,
      upperfpp: 450,
      lowerfpp: 350,
      makes: [],
      models: [],
      drivetrains: [],
      types: ["Production", "Aftermarket"],
      prize: ["CREDITS", { id: -1, name: " ", item: 20000 }],
    },
    ic2: {
      title: "Autodrome Lago Maggiore Tour",
      eventid: "IC-2",
      positions: [emote.goldtrophy + " 1st|3500", "<a:silvertrophy:549169214200741889> 2nd|3000", "<a:bronzetrophy:549169213676322857> 3rd|2500", "4th|2000", "5th|1600", "6th|1500", "7th|1300", "8th|1100", "9th|1000", "10th|800", "11th|700", "12th|600"],
      tracks: [
        [1, "Autodrome Lago Maggiore - Center", 8],
        [2, "Autodrome Lago Maggiore - East", 4],
        [3, "Autodrome Lago Maggiore - West", 3],
        [4, "Autodrome Lago Maggiore - GP", 3],
      ],
      category: ["N400"],
      time: ["R"],
      weather: ["Clear"],
      grid: 14,
      difficulty: 82,
      fpplimit: 500,
      upperfpp: 450,
      lowerfpp: 350,
      makes: [],
      models: [],
      drivetrains: [],
      types: ["Production"],
      prize: ["CREDITS", { id: -1, name: " ", item: 25000 }],
    },
    ic3: {
      title: "MR Challenge",
      eventid: "IC-3",
      positions: [emote.goldtrophy + " 1st|3200", emote.silvertrophy + " 2nd|2600", emote.bronzetrophy + " 3rd|2200", "4th|1700", "5th|1600", "6th|1500", "7th|1200", "8th|1100", "9th|1000", "10th|800", "11th|700", "12th|600"],
      tracks: [
        [1, "WeatherTech Raceway Laguna Seca", 4],
        [2, "Autodromo De Interlagos", 3],
        [3, "Circuit de Valencia", 4],
      ],
      category: ["N400"],
      time: ["Day"],
      weather: ["Clear"],
      grid: 14,
      difficulty: 85,
      fpplimit: 520,
      upperfpp: 470,
      lowerfpp: 350,
      makes: [],
      models: [],
      drivetrains: ["MR"],
      types: ["Production"],
      prize: ["RANDOMCAR", { id: -1, name: " ", make: ["Ferrari"], fullname: ["Ferrari 458 Italia 2009"] }],
    },
  };
};

/*83-78*/
//limit 15.000

module.exports.ibleague = function () {
  return {
    ib1: {
      title: "International IB League",
      eventid: "IB-1",
      positions: [emote.goldtrophy + " 1st|5000", emote.silvertrophy + " 2nd|4000", emote.bronzetrophy + " 3rd|3000", "4th|2700", "5th|2400", "6th|2100", "7th|1900", "8th|1700", "9th|1400", "10th|1200", "11th|1100", "12th|1000", "13th|900", "14th|800"],
      tracks: [
        [1, "Sardegna - Road Track - A II", 4],
        [2, "Circuit de la Sarthe", 2],
        [3, "Indianapolis Road Course", 5],
        [4, "Côte d’Azur", 6],
      ],
      category: ["N600"],
      time: ["Day"],
      weather: ["Clear"],
      grid: 16,
      difficulty: 80,
      fpplimit: 650,
      upperfpp: 600,
      lowerfpp: 450,
      makes: [],
      models: [],
      drivetrains: [],
      types: ["Production", "Aftermarket"],
      prize: ["CREDITS", { id: -1, name: " ", item: 40000 }],
    },
    ib2: {
      title: "Corvette Championship",
      eventid: "IB-2",
      positions: [emote.goldtrophy + " 1st|5200", emote.silvertrophy + " 2nd|4100", emote.bronzetrophy + " 3rd|3000", "4th|2500", "5th|2400", "6th|2100", "7th|1900", "8th|1700", "9th|1400", "10th|1200", "11th|1100", "12th|1000", "13th|900", "14th|800"],
      tracks: [
        [1, "Indianapolis Super Speedway", 6],
        [2, "WeatherTech Raceway Laguna Seca", 5],
        [3, "Willow Springs (Big Willow)", 5],
        [4, "Daytona Road Course", 4],
      ],
      category: ["N500"],
      time: ["Day"],
      weather: ["Clear"],
      grid: 16,
      difficulty: 80,
      fpplimit: 550,
      upperfpp: 520,
      lowerfpp: 300,
      makes: ["Chevrolet"],
      models: ["Corvette"],
      drivetrains: [],
      types: ["Production"],
      prize: ["RANDOMCAR", { id: -1, name: " ", make: ["Chevrolet"], fullname: ["Chevrolet Corvette ZR1 (C7) 2019"] }],
    },
    ib3: {
      title: "Special Stage Route Tour",
      eventid: "IB-3",
      positions: [emote.goldtrophy + " 1st|5500", emote.silvertrophy + " 2nd|5000", emote.bronzetrophy + " 3rd|4500", "4th|3000", "5th|2500", "6th|2100", "7th|1900", "8th|1700", "9th|1400", "10th|1200", "11th|1100", "12th|1000", "13th|900", "14th|800"],
      tracks: [
        [1, "Special Stage Route 5", 5],
        [2, "Special Stage Route 5 II", 5],
        [3, "Special Stage Route 7", 1],
        [4, "Special Stage Route X", 1],
      ],
      category: ["N600"],
      time: ["Night"],
      weather: ["Clear"],
      grid: 16,
      difficulty: 80,
      fpplimit: 630,
      upperfpp: 600,
      lowerfpp: 450,
      makes: [],
      models: [],
      drivetrains: [],
      types: ["Production"],
      prize: ["CREDITS", { id: -1, name: " ", item: 45000 }],
    },
    ib4: {
      title: "Tesla Racing Series",
      eventid: "IB-4",
      positions: [emote.goldtrophy + " 1st|3500", emote.silvertrophy + " 2nd|3000", emote.bronzetrophy + " 3rd|2500", "4th|2000", "5th|1600", "6th|1500", "7th|1200", "8th|1100", "9th|1000", "10th|800", "11th|700", "12th|600"],
      tracks: [
        [1, "WeatherTech Raceway Laguna Seca", 3],
        [2, "Ascari Full Track", 3],
        [3, "Tokyo Expressway - South Outer Loop", 3],
      ],
      category: ["N400"],
      time: ["Day"],
      weather: ["Clear"],
      grid: 10,
      difficulty: 83,
      fpplimit: 500,
      upperfpp: 490,
      lowerfpp: 200,
      makes: ["Tesla"],
      models: [],
      drivetrains: [""],
      types: ["Production"],
      prize: ["RANDOMCAR", { id: -1, name: " ", make: ["Tesla"], fullname: ["Tesla Cybertrack Prototype (Tri Motor AWD) 2019"] }],
    },
    ib5: {
    title: "GT4 World Championship",
      eventid: "IB-5",
      positions: [emote.goldtrophy + " 1st|7500", emote.silvertrophy + " 2nd|6000", emote.bronzetrophy + " 3rd|5000", "4th|4000", "5th|3000", "6th|2000", "7th|1800", "8th|1700", "9th|1400", "10th|1200", "11th|1100", "12th|1000", "13th|900", "14th|800"],
      tracks: [
        [1, 'Brands Hatch GP Circuit', 5],
        [2, 'Trial Mountain Circuit 2010', 5],
        [3, 'Willow Springs (Big Willow)', 5],
      ],
      category: ["Gr.4"],
      time: ["R"],
      weather: ["Clear"],
      grid: 20,
      difficulty: 76,
      fpplimit: 600,
      upperfpp: 580,
      lowerfpp: 500,
      makes: [],
      models: [],
      drivetrains: [],
      types: ["Race Car: GT4"],
      prize: ["RANDOMCAR", { id: -1, name: " ", make: ["Saleen"], fullname: ["Saleen S1 GT4 Concept 2019"] }]
  }
  }
};
/*

    ib4: {
      "title": 'GT4 World Championship',
      "eventid": 'IB-4',
      positions: [
        emote.goldtrophy + ' 1st|5500',
        '<a:silvertrophy:549169214200741889> 2nd|5000',
        '<a:bronzetrophy:549169213676322857> 3rd|4000',
        '4th|3000',
        '5th|2500',
        '6th|2400',
        '7th|2300',
        '8th|2200',
        '9th|2000',
        '10th|1800',
        '11th|1600',
        '12th|1400',
        '13th|1300',
        '14th|1200',
      ],
      tracks: [
        [1, 'Brands Hatch GP Circuit', 5],
        [2, 'Trial Mountain Circuit 2010', 5],
        [3, 'Willow Springs (Big Willow)', 5],
      ],
      category: ['Gr.4'],
      "time": '',
      "weather": '',
      grid: 16,
      difficulty: 78,
      fpplimit: 440,
      models: ['Any <:gt4:698962765095632967>1'],
      type: ['<:gt4:698962765095632967> GT4 Race Car'],
      prize: ['Caterham ⭐1', 'M Supersport R'],
    },
  };
};*/

/*83-75*/
//limit 20

module.exports.ialeague = function () {
  return {
    ia1: {
      title: "International IA League",
      eventid: "IA-1",
      positions: [emote.goldtrophy + " 1st|10000", emote.silvertrophy + " 2nd|8000", emote.bronzetrophy + " 3rd|6000", "4th|5000", "5th|4000", "6th|3500", "7th|3000", "8th|2500", "9th|2300", "10th|2100", "11th|1900", "12th|1700", "13th|1500", "14th|1400", "15th|1300", "16th|1200"],
      tracks: [
        [1, "Circuit de la Sarthe (No Chicanes)", 2],
        [2, "Nürburgring GP/F", 6],
        [3, "Cape Ring", 5],
        [4, "Suzuka Circuit", 5],
        [5, "Matterhorn Rotenboden", 6],
      ],
      category: ["N800"],
      time: ["R"],
      weather: ["Clear"],
      grid: 20,
      difficulty: 80,
      fpplimit: 850,
      upperfpp: 800,
      lowerfpp: 600,
      makes: [],
      models: [],
      drivetrains: [],
      types: ["Production", "Aftermarket"],
      prize: ["CREDITS", { id: -1, name: " ", item: 100000 }],
    },
    ia2: {
      title: "La Festa Cavallino",
      eventid: "IA-2",
      positions: [emote.goldtrophy + " 1st|15000", emote.silvertrophy + " 2nd|12000", emote.bronzetrophy + " 3rd|10000", "4th|9000", "5th|7000", "6th|5000", "7th|3000", "8th|2500", "9th|2300", "10th|2100", "11th|1900", "12th|1700", "13th|1500", "14th|1400", "15th|1300", "16th|1200"],
      tracks: [
        [1, "Circuit de la Sarthe (No Chicanes)", 2],
        [2, "Nürburgring GP/F", 6],
        [3, "Autodromo Nazionale Monza", 4],
        [4, "Circuito di Roma", 6],
        [5, "Circuit de Sainte-Croix - B", 3],
      ],
      category: ["N700"],
      time: ["Day"],
      weather: ["Clear"],
      grid: 20,
      difficulty: 78,
      fpplimit: 760,
      upperfpp: 710,
      lowerfpp: 400,
      makes: ["Ferrari"],
      models: [],
      drivetrains: [],
      types: ["Production", "Aftermarket"],
      prize: ["RANDOMCAR", { id: -1, name: " ", make: ["Ferrari"], fullname: ["Ferrari LaFerrari 2013"] }],
    },
    ia3: {
      title: "GT3 World Championship",
      eventid: "IA-3",
      positions: [emote.goldtrophy + " 1st|20000", emote.silvertrophy + " 2nd|14000", emote.bronzetrophy + " 3rd|9000", "4th|6000", "5th|5500", "6th|5000", "7th|4000", "8th|3000", "9th|2500", "10th|2200", "11th|1900", "12th|1800", "13th|1600", "14th|1500", "15|1200", "16|1000"],
      tracks: [
        [1, "Circuit de Barcelona-Catalunya Grand Prix Layout", 5],
        [2, "Fuji International Speedway F", 5],
        [3, "Trial Mountain Circuit 2010 II", 6],
        [4, "Mount Panorama Circuit", 4],
        [5, "Nürburgring Nordschleife", 2],
      ],
      category: ["Gr.3"],
      time: ["Day"],
      weather: ["Clear"],
      grid: 20,
      difficulty: 77,
      fpplimit: 600,
      upperfpp: 600,
      lowerfpp: 400,
      makes: [],
      models: [],
      drivetrains: [],
      types: ["Race Car: GT3"],
      prize: ["RANDOMCAR", { id: -1, name: " ", make: ["Peugeot"], fullname: ["Peugeot Vision Gran Turismo Gr.3 2017"] }],
    },
  };
};

//limit 30.000-50.000
module.exports.sleague = function () {
  return {
    s1: {
      title: "X2019 Competition Series",
      eventid: "S-1",
      positions: [
        emote.goldtrophy + " 1st|20000",
        emote.silvertrophy + " 2nd|15000",
        emote.bronzetrophy + " 3rd|10000",
        "4th|9000",
        "5th|8000",
        "6th|7000",
        "7th|6000",
        "8th|5500",
        "9th|5000",
        "10th|4500",
        "11th|4000",
        "12th|3700",
        "13th|3300",
        "14th|3100",
        "15th|2900",
        "16th|2600",
        "17th|2400",
        "18th|2100",
        "19th|1500",
        "20th|1000",
      ],
      tracks: [
        [1, "Silverstone Grand Prix Circuit", 8],
        [2, "Autopolis International Racing Course", 7],
        [3, "Fuji International Speedway GT", 6],
        [4, "Mid-Field Raceway", 10],
        [5, "Circuit de la Sarthe", 3],
      ],
      category: ["CUSTOM"],
      time: ["R"],
      weather: ["Clear"],
      grid: 30,
      difficulty: 75,
      fpplimit: 2000,
      upperfpp: 2000,
      lowerfpp: 1000,
      makes: ["RedBull"],
      models: ["X2019 Competition"],
      drivetrains: [],
      types: ["Redbull X"],
      prize: ["CREDITS", { id: -1, name: " ", item: 200000 }],
    },
  };
};

/*,

    ic3: {
      "title": 'Rain Master I',
      "eventid": 'IC-3',
      positions: [
        emote.goldtrophy + ' 1st|3200',
        '<a:silvertrophy:549169214200741889> 2nd|2800',
        '<a:bronzetrophy:549169213676322857> 3rd|2300',
        '4th|1900',
        '5th|1700',
        '6th|1500',
        '7th|1300',
        '8th|1100',
        '9th|1000',
        '10th|800',
        '11th|700',
        '12th|600',
      ],
      tracks: [
        [1, 'WeatherTech Raceway Laguna Seca', 4],
        [2, 'Circuito de Madrid', 3],
        [3, 'Brands Hatch GP Circuit', 5],
      ],
      category: ['N400'],
      "time": 'Day',
      "weather": 'Rain',
      grid: 14,
      difficulty: 81,
      fpplimit: 360,
      models: ['License B ⭐2'],
      type: ['⭐ Production Cars'],
      prize: ['License A ⭐2', 'M None'],
    },
    ic4: {
      "title": 'Mercedes-Benz Grand Prix',
      "eventid": 'IC-4',
      positions: [
        emote.goldtrophy + ' 1st|3500',
        '<a:silvertrophy:549169214200741889> 2nd|3000',
        '<a:bronzetrophy:549169213676322857> 3rd|2500',
        '4th|2100',
        '5th|1800',
        '6th|1500',
        '7th|1300',
        '8th|1100',
        '9th|1000',
        '10th|800',
        '11th|700',
        '12th|600',
      ],
      tracks: [
        [1, 'Nürburgring GP/F', 4],
        [2, 'Nürburgring GP/D', 5],
        [3, 'Red Bull Ring', 4],
      ],
      category: ['N400'],
      "time": 'Day',
      "weather": 'Clear',
      grid: 14,
      difficulty: 80,
      fpplimit: 370,
      models: [
        'Mercedes-Benz ⭐0.5',
        'Mercedes-Benz ⭐1',
        'Mercedes-Benz ⭐1.5',
        'Mercedes-Benz ⭐2',
      ],
      type: ['⭐ Production Cars'],
      prize: ['Mercedes-Benz <:gt4:698962765095632967>', 'M None'],
    },








   b2: {
      "title": 'Daihatsu Showdown',
      "eventid": 'B-2',
      positions: [
        emote.goldtrophy + ' 1st|1200',
        '<a:silvertrophy:549169214200741889> 2nd|900',
        '<a:bronzetrophy:549169213676322857> 3rd|700',
        '4th|500',
        '5th|400',
        '6th|300',
        '7th|200',
        '8th|100',
      ],
      tracks: [
        [1, 'Gran Turismo Arena (Layout A)', 5],
        [2, 'Tsukuba Circuit', 3],
        [3, 'Willow Springs (Big Willow)', 3],
      ],
      category: ['N100'],
      "time": 'Day',
      "weather": 'Clear',
      grid: 8,
      difficulty: 90,
      fpplimit: 200,
      models: ['Daihatsu ⭐1', 'Daihatsu ⭐0.4'],
      type: ['⭐ Production Cars'],
      prize: ['Daihatsu ⭐1', 'M None'],
    },
    b3: {
      "title": 'Honda Festival',
      "eventid": 'B-3',
      positions: [
        emote.goldtrophy + ' 1st|1200',
        '<a:silvertrophy:549169214200741889> 2nd|900',
        '<a:bronzetrophy:549169213676322857> 3rd|700',
        '4th|500',
        '5th|400',
        '6th|300',
        '7th|200',
        '8th|100',
      ],
      tracks: [
        [1, 'Tokyo Expressway - Central Inner Loop', 2],
        [2, 'Kyoto Driving Park - Miyabi', 5],
        [3, 'Tokyo R246', 2],
      ],
      category: ['N200'],
      "time": 'Day',
      "weather": 'Clear',
      grid: 8,
      difficulty: 88,
      fpplimit: 280,
      models: ['Honda ⭐1'],
      type: ['⭐ Production Cars'],
      prize: ['Honda ⭐2', 'M None'],
    },


   */
