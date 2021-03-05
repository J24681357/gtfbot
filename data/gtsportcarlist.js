const Discord = require("discord.js");
const client = new Discord.Client();
var gtf = process.env
////////////////////////////////////////////////////


var gtscarlist = function() {
  var total = 1
  return [
    ["Abarth 500 2009", "N100", "Italy" ],
[ "Abarth 1500 Biposto Bertone B.A.T. 1 1952", "N100", "Italy" ],
[ "Alfa Romeo 4C Gr.3", "Gr.3", "Italy" ],
[ "Alfa Romeo 4C Gr.4", "Gr.4", "Italy" ],
[ "Alfa Romeo 4C Launch Edition 2014", "N200", "Italy" ],
[ "Alfa Romeo Giulia TZ2 carrozzata da ZAGATO CN.AR750106 1965", "Gr.X", "Italy" ],
[ "Alfa Romeo MiTo 1.4 T Sport 2009", "N200", "Italy" ],
[ "Alpine A110 1600S 1972", "N100", "France"],
[ "Alpine A110 Première Édition 2017", "N300", "France"],
[ "Alpine Vision Gran Turismo 2017", "Gr.1", "France"],
[ "Alpine Vision Gran Turismo", "Gr.X", "France"], 
[ "Alpine Vision Gran Turismo Race Mode", "Gr.X", "France"],
[ "Amuse S2000 GT1 Turbo", "N600", "PDI"],
[ "Aston Martin DB3S CN.1 1953", "Gr.X", "UK" ],
[ "Aston Martin DB11 2016", "N600", "UK"],
[ "Aston Martin DP-100 Vision Gran Turismo", "Gr.X", "UK" ],
[ "Aston Martin One-77 2011", "N800", "UK"],
[ "Aston Martin V8 Vantage S 2015", "N400", "UK"],
[ "Aston Martin V12 Vantage GT3 2012", "Gr.3", "UK"],
[ "Aston Martin Vantage Gr.4", "Gr.4", "UK"],
[ "Aston Martin Vulcan 2016", "N800", "UK"],
[ "Aston Martin DBR9 GT1 2010", "Gr.3", "UK"],
[ "Audi E-TRON Vision Gran Turismo", "Gr.X", "Germany" ],
[ "Audi R8 4.2 FSI R tronic 2007", "N400", "Germany" ],
[ "Audi R8 LMS (Audi Sport Team WRT) 2015", "Gr.3", "Germany" ],
[ "Audi R18 (Audi Sport Team Joest) 2016", "Gr.1", "Germany" ],
[ "Audi R18 TDI (Audi Sport Team Joest) 2011", "Gr.1", "Germany" ],
[ "Audi R18 TDI (Le Mans 2011)", "Gr.1", "Germany" ],
[ "Audi Sport quattro S1 Pikes Peak 1987", "Gr.B", "Germany" ],
[ "Audi TT Coupé 3.2 quattro 2003", "N200", "Germany" ],
[ "Audi TT Cup 2016", "Gr.4", "Germany" ],
[ "Audi TTS Coupe 2014", "N300", "Germany" ],
[ "Audi Vision Gran Turismo (Gr.1)", "Gr.1", "Germany" ],
[ "BMW i3 2015", "Gr.X", "Germany" ],
[ "BMW M3 Coupé 2003", "N300", "Germany" ],
[ "BMW M3 Coupé 2007", "N400", "Germany" ],
[ "BMW M3 GT (BMW Motorsport) 2011", "Gr.3", "Germany" ],
[ "BMW M3 Sport Evolution 1989", "N200", "Germany" ],
[ "BMW M4 Coupé 2014", "N400", "Germany" ],
[ "BMW M4 Gr.4", "Gr.4", "Germany" ],
[ "BMW M6 GT3 (Walkenhorst Motorsport) 2016", "Gr.3", "Germany" ],
[ "BMW M6 GT3 M Power Livery 2016", "Gr.3", "Germany" ],
[ "BMW Vision Gran Turismo", "Gr.X", "Germany" ],
[ "BMW Z4 GT3 2011", "Gr.3", "Germany" ],
[ "BMW Z8 2001", "N400", "Germany" ],
[ "Bugatti Veyron 16.4 2013", "N1000", "France"],
[ "Bugatti Veyron Gr.4", "Gr.4", "France"],
[ "Bugatti Vision Gran Turismo", "Gr.X", "France"],
[ "Bugatti Vision Gran Turismo Gr.1", "Gr.1", "France"],
[ "Chevrolet Camaro SS 2016", "N500", "USA"],
[ "Chevrolet Camaro Z28 1969", "N300", "USA"],
[ "Chevrolet Camaro ZL1 1LE Package 2018", "N700", "USA"],
[ "Chevrolet Chaparral 2X Vision Gran Turismo", "Gr.X", "USA"],
[ "Chevrolet Corvette C7 Gr.3", "Gr.3", "USA"],
[ "Chevrolet Corvette C7 Gr.4", "Gr.4", "USA"],
[ "Chevrolet Corvette Stingray (C7) 2014", "N500", "USA"],
[ "Chevrolet Corvette Stingray Convertible (C3) 1969", "N300", "USA"],
[ "Chevrolet Corvette Stingray Racer Concept 1959", "Gr.X", "USA"],
[ "Chevrolet Corvette Stingray Sport Coupe (C2) 1963", "N400", "USA"],
[ "Chris Holstrom Concepts 1967 Chevy Nova", "N700", "PDI"],
[ "Citroën DS3 Racing 2011", "N200", "France"],
[ "Daihatsu Copen Active Top 2002", "N100", "Japan"],
[ "Daihatsu Copen RJ Vision Gran Turismo", "Gr.X", "Japan"],
[ "De Tomaso Pantera 1971", "N300", "Italy"],
[ "Dodge Challenger R/T 1970", "N400", "USA"],
[ "Dodge Charger SRT Hellcat 2015", "N700", "USA"],
[ "Dodge SRT Tomahawk GTS-R Vision Gran Turismo", "Gr.X", "USA"],
[ "Dodge SRT Tomahawk S Vision Gran Turismo", "Gr.X", "USA"],
[ "Dodge SRT Tomahawk Vision Gran Turismo Gr.1", "Gr.1", "USA"],
[ "Dodge SRT Tomahawk X Vision Gran Turismo", "Gr.X", "USA"],
[ "Dodge Super Bee 1970", "N300", "USA"],
[ "Dodge Viper Gr.4", "Gr.4", "USA"],
[ "Dodge Viper GTS 2002", "N500", "USA"],
[ "Dodge Viper GTS 2013", "N600", "USA"],
[ "Dodge Viper SRT10 Coupe 2006", "N500", "USA"],
[ "Dodge Viper SRT GT3-R 2015", "Gr.3", "USA"],
[ "Eckerts Rod & Custom Mach Forty", "N800" , "PDI"],
[ "Ferrari 250 GT Berlinetta passo corto CN.2521 1961", "N300", "Italy"  ],
[ "Ferrari 250 GTO CN.3729GT 1962", "Gr.X", "Italy"  ],
[ "Ferrari 330 P4 Race Car 1967", "Gr.X", "Italy" ],
[ "Ferrari 365 GTB4 1971", "N400", "Italy"  ],
[ "Ferrari 458 Italia 2009", "N600", "Italy" ],
[ "Ferrari 458 Italia Gr.4", "Gr.4" , "Italy" ],
[ "Ferrari 458 Italia GT3 2013", "Gr.3" , "Italy" ],
[ "Ferrari Dino 246 GT 1971", "N200", "Italy"  ],
[ "Ferrari Enzo Ferrari 2002", "N700", "Italy"  ],
[ "Ferrari F40 1992", "N500", "Italy"  ],
[ "Ferrari F50 1995", "N500", "Italy"  ],
[ "Ferrari GTO 1984", "N400", "Italy"  ],
[ "Ferrari LaFerrari 2013", "N1000", "Italy"  ],
[ "Fiat 500 F 1968", "N100", "Italy"  ],
[ "Fiat 500 1.2 8V Lounge SS 2008", "N100", "Italy"] ,
[ "Fittipaldi EF7 Vision Gran Turismo by Pininfarina", "Gr.X", "USA"],
[ "Ford F-150 SVT Raptor 2011", "N400", "USA"],
[ "Ford Focus Gr.B Rally Car", "Gr.B", "USA"],
[ "Ford Focus ST 2015", "N300", "USA"],
[ "Ford GT40 Mark I 1966", "N400", "USA"],
[ "Ford GT 2006", "N600", "USA"],
[ "Ford GT 2017", "N700", "USA"],
[ "Ford GT LM Spec II Test Car", "Gr.3", "USA"],
[ "Ford Mark IV Race Car 1967", "Gr.X", "USA"],
[ "Ford Mustang Gr.3", "Gr.3", "USA"],
[ "Ford Mustang Gr.4", "Gr.4", "USA"],
[ "Ford Mustang Gr.B Rally Car", "Gr.B", "USA"],
[ "Ford Mustang GT Premium Fastback 2015", "N400", "USA"],
[ "Ford Mustang Mach 1 1971", "N300", "USA"],
[ "Gran Turismo F1500T-A", "Gr.X" , "PDI"],
[ "Gran Turismo RACING KART 125 Shifter", "Gr.X", "PDI"],
[ "Gran Turismo Red Bull X2014 Junior 2014", "Gr.X" , "PDI"],
[ "Gran Turismo Red Bull X2014 Standard Car 2014", "Gr.X" , "PDI"],
[ "Gran Turismo X2019 Competition 2019", "Gr.X", "PDI"],
[ "Greddy Fugu Z", "N300", "PDI"],
[ "Citroën GT Gr.4", "Gr.4" , "France"],
[ "Citroën GT Race Car Gr.3", "Gr.3", "France"],
[ "Citroën GT Road Car", "N500", "France"],
[ "Honda Beat 1991", "N100", "Japan" ],
[ "Honda CIVIC TYPE R (EK) 1998", "N200", "Japan" ],
[ "Honda CIVIC TYPE R (FK2) 2015", "N300", "Japan" ],
[ "Honda EPSON NSX 2008", "Gr.2", "Japan" ],
[ "Honda Fit Hybrid 2014", "N100", "Japan" ],
[ "Honda Integra Type R (DC2) 1998", "N200", "Japan" ],
[ "Honda NSX 2017", "N600", "Japan" ],
[ "Honda NSX Gr.3", "Gr.3", "Japan" ],
[ "Honda NSX Gr.4", "Gr.4", "Japan" ],
[ "Honda NSX Gr.B Rally Car", "Gr.B", "Japan" ],
[ "Honda NSX Type R 1992", "N300", "Japan" ],
[ "Honda Project 2&4 powered by RC213V", "Gr.X", "Japan" ],
[ "Honda RAYBRIG NSX CONCEPT-GT 2016", "Gr.2", "Japan" ],
[ "Honda S660 2015", "N100", "Japan" ],
[ "Honda S800 1966", "N100", "Japan"],
[ "Honda S2000 1999", "N200", "Japan" ],
[ "Honda Sports Vision Gran Turismo", "Gr.X", "Japan" ],
[ "Hyundai Genesis Coupe 3.8 Track 2013", "N300", "Korea" ],
[ "Hyundai Genesis Gr.3", "Gr.3", "Korea" ],
[ "Hyundai Genesis Gr.4", "Gr.4", "Korea" ],
[ "Hyundai Genesis Gr.B Rally Car", "Gr.B", "Korea" ],
[ "Hyundai N 2025 Vision Gran Turismo", "Gr.X", "Korea" ],
[ "Hyundai N 2025 Vision Gran Turismo Gr.1", "Gr.1", "Korea" ],
[ "Infiniti Concept Vision Gran Turismo", "Gr.X", "USA"],
[ "IsoRivolta Zagato Vision Gran Turismo", "Gr.X", "Italy"],
[ "Jaguar D Type 1954", "Gr.X", "UK"],
[ "Jaguar E-type Coupé 1961", "N300", "UK"],
[ "Jaguar F-Type Gr.3", "Gr.3", "UK"],
[ "Jaguar F-Type Gr.4", "Gr.4", "UK"],
[ "Jaguar F-Type R Coupe 2014", "N600", "UK"],
[ "Jaguar Vision Gran Turismo Coupé 2020", "Gr.X", "UK"],
[ "Jaguar XJ13 Race Car 1966", "Gr.X", "UK"],
[ "Jaguar XJR-9 1988", "Gr.1", "UK"],
[ "KTM X-BOW R 2012", "N300", "Austria"],
[ "Lamborghini Aventador LP 700-4 2011", "N700", "Italy"  ],
[ "Lamborghini Aventador LP 750-4 Superveloce 2015", "N800", "Italy" ],
[ "Lamborghini Countach 25th Anniversary 1988", "N500", "Italy"  ],
[ "Lamborghini Countach LP400 1974", "N400", "Italy"  ],
[ "Lamborghini Diablo GT 2000", "N600", "Italy"  ],
[ "Lamborghini Huracán Gr.4", "Gr.4", "Italy"  ],
[ "Lamborghini Huracán GT3 2015", "Gr.3", "Italy" ],
[ "Lamborghini Huracán LP 610-4 2015", "N600" ],
[ "Lamborghini Miura P400 Bertone Prototype CN.0706 1967", "N400", "Italy"  ],
[ "Lamborghini Veneno 2014", "N800", "Italy"  ],
[ "Lancia Delta HF Integrale Evoluzione 1991", "N200", "Italy"  ],
[ "Lancia Stratos 1973", "N200", "Italy"  ],
[ "Lexus au TOMS RC F 2016", "Gr.2" , "Japan"],
[ "Lexus LC500 2017", "N500" , "Japan"],
[ "Lexus LF-LC GT Vision Gran Turismo", "Gr.X", "Japan" ],
[ "Lexus PETRONAS TOMS SC430 2008", "Gr.2", "Japan" ],
[ "Lexus RC F 2014", "N500", "Japan"],
[ "Lexus RC F Gr.4", "Gr.4", "Japan" ],
[ "Lexus RC F GT3 (Emil Frey Racing) 2017", "Gr.3", "Japan" ],
[ "Lexus RC F GT3 prototype (Emil Frey Racing) 2016", "Gr.3", "Japan" ],
[ "Maserati Gran Turismo S 2008", "N400", "Italy"  ],
[ "Mazda 787B 1991", "Gr.1", "Japan" ],
[ "Mazda Atenza Gr.3", "Gr.3", "Japan" ],
[ "Mazda Atenza Gr.4", "Gr.4", "Japan" ],
[ "Mazda Atenza Sedan XD L Package 2015", "N200", "Japan" ],
[ "Mazda Demio XD Touring 2015", "N100", "Japan"],
[ "Mazda Eunos Roadster (NA Special Package) 1989", "N100", "Japan" ],
[ "Mazda LM55 Vision Gran Turismo", "Gr.X", "Japan" ],
[ "Mazda LM55 Vision Gran Turismo Gr.1", "Gr.1", "Japan" ],
[ "Mazda Roadster S (ND) 2015", "N100", "Japan"],
[ "Mazda Roadster Touring Car", "N200", "Japan" ],
[ "Mazda RX-7 GT-X (FC) 1990", "N200", "Japan" ],
[ "Mazda RX-7 Spirit R Type A (FD) 2002", "N300", "Japan"],
[ "Mazda RX-VISION GT3 CONCEPT 2020", "Gr.3", "Japan"],
[ "McLaren 650S Coupe 2014", "N700", "UK"],
[ "McLaren 650S Gr.4", "Gr.4", "UK"],
[ "McLaren 650S GT3 2015", "Gr.3", "UK"],
[ "McLaren F1 1994", "N600", "UK"],
[ "McLaren F1 GTR - BMW (Kokusai Kaihatsu UK Racing) 1995", "Gr.3", "UK"],
[ "McLaren MP4-12C 2010", "N600", "UK"],
[ "McLaren P1 GTR 2016", "Gr.X", "UK"],
[ "McLaren Ultimate Vision Gran Turismo", "Gr.X", "UK"],
[ "McLaren Ultimate Vision Gran Turismo Gr.1", "Gr.1", "UK"],
[ "Mercedes-Benz AMG F1 W08 EQ Power+ (Color Variation) 2017", "Gr.X", "Germany" ],
[ "Mercedes-Benz AMG F1 W08 EQ Power+ 2017", "Gr.X", "Germany"],
[ "Mercedes-Benz AMG GT3 (AMG-Team HTP-Motorsport) 2016", "Gr.3", "Germany"],
[ "Mercedes-Benz AMG GT S 2015", "N500", "Germany"],
[ "Mercedes-Benz 300 SEL 6.8 AMG 1971", "Gr.X", "Germany"],
[ "Mercedes-Benz A 45 AMG 4Matic 2013", "N400", "Germany"],
[ "Mercedes-Benz AMG Vision Gran Turismo", "Gr.X", "Germany"],
[ "Mercedes-Benz AMG Vision Gran Turismo Racing Series", "Gr.X", "Germany" ],
[ "Mercedes-Benz Sauber Mercedes C9 1989", "Gr.1", "Germany"],
[ "Mercedes-Benz SLR McLaren 2009", "N600", "Germany"],
[ "Mercedes-Benz SLS AMG 2010", "N600", "Germany"],
[ "Mercedes-Benz SLS AMG Gr.4", "Gr.4", "Germany"],
[ "Mercedes-Benz SLS AMG GT3 2011", "Gr.3", "Germany"],
[ "MINI Clubman Vision Gran Turismo", "Gr.X", "Germany"],
[ "Mini Cooper S 1965", "N100" , "Germany"],
[ "MINI Cooper S 2005", "N200" , "Germany"],
[ "Mitsubishi Concept XR-PHEV EVOLUTION Vision Gran Turismo", "Gr.X", "Japan" ],
[ "Mitsubishi GTO Twin Turbo 1991", "N200", "Japan" ],
[ "Mitsubishi Lancer Evolution Final Edition 2015", "N300", "Japan" ],
[ "Mitsubishi Lancer Evolution Final Edition Gr.3", "Gr.3", "Japan" ],
[ "Mitsubishi Lancer Evolution Final Edition Gr.4", "Gr.4", "Japan" ],
[ "Mitsubishi Lancer Evolution Final Edition Gr.B Rally Car", "Gr.B", "Japan" ],
[ "Mitsubishi Lancer Evolution IV GSR 1996", "N300", "Japan" ],
[ "Nissan Concept 2020 Vision Gran Turismo", "Gr.X", "Japan" ],
[ "Nissan Fairlady Z 300ZX TwinTurbo 2-seater (Z32) 1989", "N300", "Japan" ],
[ "Nissan Fairlady Z Version S (Z33) 2007", "N300", "Japan" ],
[ "Nissan GT-R Gr.4", "Gr.4", "Japan" ],
[ "Nissan GT-R Gr.B Rally Car", "Gr.B", "Japan" ],
[ "Nissan GT-R LM NISMO 2015", "Gr.1", "Japan" ],
[ "Nissan GT-R NISMO 2017", "N600", "Japan" ],
[ "Nissan GT-R NISMO GT3 N24 Schulze Motorsport 2013", "Gr.3", "Japan" ],
[ "Nissan GT-R Premium Edition 2017", "N600", "Japan"],
[ "Nissan MOTUL AUTECH GT-R 2016", "Gr.2", "Japan" ],
[ "Nissan R92CP 1992", "Gr.1", "Japan"],
[ "Nissan Silvia Ks Dia Selection (S13) 1990", "N200", "Japan"],
[ "Nissan SKYLINE GT-R V • spec (R33) 1997", "N300", "Japan" ],
[ "Nissan SKYLINE GT-R V • spec II (R32) 1994", "N300", "Japan" ],
[ "Nissan SKYLINE GT-R V • spec II Nür (R34) 2002", "N300", "Japan" ],
[ "Nissan XANAVI NISMO GT-R 2008", "Gr.2", "Japan" ],
[ "Nissan 180SX Type X 1996", "N200", "Japan"],
[ "Pagani Huayra 2013", "N700", "Italy"  ],
[ "Pagani Zonda R 2009", "Gr.X", "Italy"  ],
[ "Peugeot 208 GTi by Peugeot Sport 2014", "N200", "France"],
[ "Peugeot 908 HDi FAP - Team Peugeot Total 2010", "Gr.1", "France"],
[ "Peugeot L500R HYbrid Vision Gran Turismo, 2017", "Gr.X", "France"],
[ "Peugeot L750R HYbrid Vision Gran Turismo, 2017", "Gr.1", "France"],
[ "Peugeot RCZ Gr.3", "Gr.3", "France"],
[ "Peugeot RCZ Gr.4", "Gr.4", "France"],
[ "Peugeot RCZ Gr.B Rally Car", "Gr.B", "France"],
[ "Peugeot RCZ GT Line 2015", "N200", "France"],
[ "Peugeot Vision Gran Turismo", "Gr.X", "France"],
[ "Peugeot Vision Gran Turismo Gr.3", "Gr.3", "France"],
[ "Plymouth XNR Ghia Roadster 1960", "N300", "USA"],
[ "Pontiac Firebird Trans Am 1978", "N200", "USA"],
[ "Porsche 356 A/1500 GS GT Carrera Speedster 1956", "N100", "Germany" ],
[ "Porsche 911 GT3 (996) 2001", "N400", "Germany"],
[ "Porsche 911 GT3 (997) 2008", "N400", "Germany" ],
[ "Porsche 911 GT3 RS (991) 2016", "N500", "Germany" ],
[ "Porsche 911 RSR (991) 2017", "Gr.3", "Germany" ],
[ "Porsche 911 Carrera RS Club Sport (993) 1995", "N300", "Germany" ],
[ "Porsche 911 Turbo (930) 1981", "N300", "Germany" ],
[ "Porsche 919 Hybrid (Porsche Team) 2017", "Gr.1", "Germany" ],
[ "Porsche 962 C 1988", "Gr.1", "Germany" ],
[ "Porsche Cayman GT4 Clubsport 2016", "Gr.4", "Germany" ],
[ "Porsche Taycan Turbo S 2019", "Gr.X", "Germany"],
[ "RE Amemiya FD3S RX-7", "N400", "Japan"],
[ "Renault R8 Gordini 1966", "Gr.X", "France"],
[ "Renault-Sport Clio R.S. 220 EDC Trophy 2015", "N200", "France"],
[ "Renault-Sport Clio R.S. 220 EDC Trophy 2016", "N200", "France"],
[ "Renault-Sport Clio V6 24V 2000", "N200", "France"],
[ "Renault-Sport Mégane Trophy 2011", "Gr.4", "France"],
[ "Renault-Sport Mégane Gr.4", "Gr.4", "France"],
[ "Renault-Sport Mégane R.S. Trophy 2011", "N300", "France"],
[ "Renault-Sport R.S.01 2016", "Gr.3", "France"],
[ "Renault-Sport R.S.01 GT3 2016", "Gr.3", "France"],
[ "RUF CTR3 2007", "N700", "Germany" ],
[ "Shelby Cobra 427 1966", "N500", "USA"],
[ "Shelby Cobra Daytona Coupe 1964", "Gr.X", "USA"],
[ "Shelby G.T.350 1965", "N300", "USA"],
[ "Subaru BRZ S 2015", "N200", "Japan" ],
[ "Subaru Falken Tires/Turn 14 Distribution BRZ 2017", "Gr.X", "Japan" ],
[ "Subaru Impreza 22B-STi Version 1998", "N300", "Japan" ],
[ "Subaru Impreza Coupe WRX Type R STi Version VI 1999", "N300", "Japan" ],
[ "Subaru VIZIV GT Vision Gran Turismo", "Gr.X", "Japan" ],
[ "Subaru WRX Gr.3", "Gr.3", "Japan" ],
[ "Subaru WRX Gr.4", "Gr.4", "Japan" ],
[ "Subaru WRX Gr.B Rally Car", "Gr.B", "Japan" ],
[ "Subaru WRX STi Isle of Man Time Attack Car 2016", "Gr.X", "Japan" ],
[ "Subaru WRX STi Type S 2014", "N300", "Japan" ],
[ "Super Formula Dallara SF19 Super Formula (Honda) 2019", "Gr.X", "Japan"],
[ "Super Formula Dallara SF19 Super Formula (Toyota) 2019", "Gr.X", "Japan" ],
[ "Suzuki Swift Sport 2007", "N100", "Japan" ],
[ "Tesla Motors Model S Signature Performance 2012", "Gr.X", "USA"],
[ "Toyota 86 Gr.4", "Gr.4", "Japan" ],
[ "Toyota 86 Gr.B Rally Car", "Gr.B", "Japan" ],
[ "Toyota 86 GRMN 2016", "N200", "Japan" ],
[ "Toyota 86 GT 2015", "N200", "Japan" ],
[ "Toyota 86 GT Limited 2016", "N200", "Japan"],
[ "Toyota 2000GT 1967", "N200", "Japan" ],
[ "Toyota Corolla Levin 3door 1600GT APEX (AE86) 1983", "N100", "Japan" ],
[ "Toyota Crown Athlete G 2013", "N300", "Japan"],
[ "Toyota FT-1 2014", "Gr.X", "Japan"],
[ "Toyota FT-1 Vision Gran Turismo", "Gr.X", "Japan"],
[ "Toyota FT-1 Vision Gran Turismo Gr.3", "Gr.3", "Japan"],
[ "Toyota GR SUPRA RACING CONCEPT 2018", "Gr.3", "Japan"],
[ "Toyota GR Supra RZ 2019", "N300", "Japan"],
[ "Toyota GR Supra RZ 2020", "N400", "Japan"],
[ "Toyota MR2 GT-S 1997", "N200", "Japan"],
[ "Toyota S-FR 2015", "N100", "Japan"],
[ "Toyota S-FR Racing Concept 2016", "N400", "Japan"],
[ "Toyota Sports 800 1965", "N100", "Japan"],
[ "Toyota Sprinter Trueno 3door 1600GT APEX (AE86) 1983", "N100", "Japan"],
[ "Toyota SUPRA 3.0GT Turbo A 1988", "N300", "Japan"],
[ "Toyota SUPRA RZ 1997", "N300", "Japan"],
[ "Toyota TS030 Hybrid 2012", "Gr.1", "Japan"],
[ "Toyota TS050 Hybrid (Toyota Gazoo Racing) 2016", "Gr.1", "Japan"],
[ "Toyota Tundra TRD Pro 2019", "N400", "Japan"],
[ "Toyota GR Yaris First Edition RZ (High Performance) 2020", "N300", "Japan"],
[ "TVR Tuscan Speed 6 2000", "N400", "UK"],
[ "Volkswagen 1200 1966", "N100" , "Germany"],
[ "Volkswagen Beetle Gr.3", "Gr.3" , "Germany"],
[ "Volkswagen Golf I GTI 1983", "N100", "Germany"],
[ "Volkswagen Golf VII GTI 2014", "N200", "Germany"],
[ "Volkswagen GTI Roadster Vision Gran Turismo", "Gr.X", "Germany"],
[ "Volkswagen GTI Supersport Vision Gran Turismo", "Gr.X", "Germany" ],
[ "Volkswagen GTI Vision Gran Turismo Gr.3", "Gr.3", "Germany" ],
[ "Volkswagen Scirocco Gr.4", "Gr.4", "Germany" ],
[ "Volkswagen typ2(T1) SambaBus 1962", "N100", "Germany" ]].sort().map(function(x){
    x.unshift(total)
    total++
    return x
  });
}

module.exports.gtscarslength = gtscarlist().length;
module.exports.gtscars = gtscarlist();

module.exports.GTSCar = function(name) {
  if (name == undefined) {
    this.id = null
    this.name = null
    this.category = null
    this.country = null
    return this
  }
  var list = gtscarlist()
  if (name == "Random" || name == "R" || name == "random") {
    return require(process.env.GTSCARS).RandomGTSCar();
  }
  if (!isNaN(name)) {
    index = parseInt(name);
    this.id = list[index][0];
    this.name = list[index][1];
    this.category = list[index][2];
    this.country = list[index][3];
  } else {
    for (var index = 0; index < list.length; index++) {
      if (list[index][1] == name) {
        this.name = name;
        this.id = list[index][0]
        this.category = list[index][2];
        this.country = list[index][3];
      }
    }
  }
  return this;
}

module.exports.RandomGTSCar = function(args) {
  if (args == undefined) {
    length = 0
  } else {
    length = args.length
  }
  if (length == 0) {
  var index = Math.floor(Math.random() * gtscarlist().length);
  var car = gtscarlist()[index];
  this.id = car[0];
  this.name = car[1];
  this.category = car[2];
  this.country = car[3];
  return this
  } else {
    var gcl = filtergtscarlist(args)
    return gcl[Math.floor(Math.random() * gcl.length)];
  }
  
}

module.exports.GTSCars = function(args) {
  return filtergtscarlist(args)
}

function filtergtscarlist(args) {
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
  if (args.country !== undefined && !args.country.length == 0) {
  var country = args.country
    length++
  }

  var gtscarlistf = gtscarlist().filter(function(x) {
    var good = 0
    if (name !== undefined) {
      var namex = new RegExp(name.toString(), "gi");
      if (namex.test(x[1].toString())) {
        good++
      }
    }
    if (category !== undefined) {
      for (var index = 0; index < category.length; index++) {
      if (category[index] == x[2]) {
        good++
        break;
      }
      }
    }
    if (country !== undefined) {
      for (var index = 0; index < country.length; index++) {
      if (country[index] == x[3]) {
        good++
        break;
      }
      }
    }
    return good == length
  })
  
  for (var index = 0; index < gtscarlistf.length; index++) {
    var car = {}
        car.id = gtscarlistf[index][0]
        car.name = gtscarlistf[index][1]
        car.category = gtscarlistf[index][2];
        car.country = gtscarlistf[index][3];
    list.push(car)
    }
  return list
}