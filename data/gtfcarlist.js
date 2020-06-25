var gtf = require('/app/functions/f_gtf');
var stats = require('/app/functions/profile/f_stats');
var gtftools = require('/app/functions/misc/f_tools');
var gtfperf = require('/app/functions/marketplace/f_perf');
var exp = require('/app/profile/expprofile');
var emote = require('/app/index');

var gtffile = process.env;
const Discord = require('discord.js');
const client = new Discord.Client();

////////////////////////////////////////////////////

module.exports.bmakes = function() {
  return [
    'Abarth',
    'Acura',
    'Chrysler',
    'Citroen',
    'Dacia',
    'Daihatsu',
    'Fiat',
    'Honda',
    'Hyundai',
    'Infiniti',
    'Isuzu',
    'Jeep',
    'Kia',
    'MG',
    'Mazda',
    'Mercury',
    'Mini',
    'Mitsubishi',
    'Opel',
    'Peugeot',
    'Pontiac',
    'Renault',
    'Scion',
    'SEAT',
    'Subaru',
    'Suzuki',
    'Tata-Motors',
    'Toyota',
    'Volkswagen',
    'Volvo',
  ];
};

module.exports.abarth = [
  'Abarth 124 Spider 2015 ⭐2 http://www.guide-autosport.com/wp-content/uploads/photo-gallery/Abarth%20124%20Spider/abarth-124-spider-15.jpg',
  'Abarth 1500 Biposto Bertone B.A.T 1 1952 https://upload.wikimedia.org/wikipedia/commons/f/f5/1952_Abarth_1500_Biposto_BAT_1_-_Flickr_-_edvvc_%281%29.jpg',
  'Abarth Grande Punto 2009 http://www.autoviva.com/img/photos/817/abarth_grande_punto_abarth_1_4t_jet_155cv_large_13817.jpg',
  'Abarth Punto Evo 2011 http://www.ausmotive.com/images2/Fiat-Abarth-Punto-Evo-01.jpg',
];

module.exports.acura = `Acura CL 3.0 1997 https://s1.cdn.autoevolution.com/images/gallery/ACURACL-1243_4.jpg|\
Acura Integra Type R 2001 https://s13252.pcdn.co/wp-content/uploads/2015/12/Screen-Shot-2015-12-15-at-12.24.15-PM-940x590.png|\
Acura NSX 2004 ⭐2 https://cdn1.mecum.com/auctions/sc0517/sc0517-282536/images/sc0517-282536_1@2x.jpg|\
Acura NSX 1991 ⭐2 http://www.rarecarsforsaleblog.com/wp-content/uploads/2014/01/lowmileage91nsx2a.jpg|\
Acura TSX 2004 https://upload.wikimedia.org/wikipedia/commons/9/93/Acura-TSX.jpg`;

module.exports.chrysler = `Chrysler 200 Limited 2015 https://www.carpixel.net/w/1233c3635db5477597c19fc715599877/chrysler-200-limited-car-wallpaper-10341.jpg|\
Chrysler 300C SRT8 2008 ⭐3 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/05q2/267355/chrysler-300c-srt8-photo-5272-s-original.jpg|\
Chrysler 300C SRT8 2015 ⭐3 http://motoringme.com/wp-content/uploads/2015/09/IMG_3442-HDR.jpg|\
Chrysler Crossfire 2004 ⭐2 https://static.cargurus.com/images/site/2008/05/11/20/19/2004_chrysler_crossfire-pic-34613-640x480.jpeg|\
Chrysler Imperial 1956 https://cdn.barrett-jackson.com/staging/carlist/items/Fullsize/Cars/208078/208078_Front_3-4_Web.jpg|\
Chrysler PT Cruiser GT 2004 https://assets.hemmings.com/story_image/39767-500-0@2x.jpg?rev=1|\
Chrysler PT Cruiser GT Convertible 2005 https://i.ytimg.com/vi/9dhdbyAKHz0/hqdefault.jpg|\
Chrysler Sebring Touring 2005 http://www.2040-cars.com/_content/cars/images/39/749639/001.jpg|\
Chrysler Sebring Touring Sedan 2008 https://dxsdcl7y7vn9x.cloudfront.net/390580/2465D901-CB56-41C1-996A-0814BA593CEA.jpg`;

module.exports.citroen = `Citroen C3 2017 https://car-images.bauersecure.com/pagefiles/33541/c3_01.jpg|\
Citroen C4 Coupe VTS 2009 https://i.pinimg.com/736x/de/fb/9c/defb9caa81677603ddba668594192775--wedding-cars-old-cars.jpg|\
Citroen DS 1970 ⭐0.4 https://www.classicdigest.com/extra/carimg/132601_132700/132607_0fa619d83bcec776.jpg|\
Citroen DS3 Racing 2011 ⭐2 http://cdn1.evo.co.uk/sites/evo/files/styles/gallery_adv/public/images/dir_758/car_photo_379108.jpg|\
Citroen Xsara VTR 2003 http://carphotos.cardomain.com/ride_images/3/2102/2301/30253650001_large.jpg`;

module.exports.dacia = `Dacia Duster 2009 https://cdn.drivemag.net/media/default/0001/09/thumb_8285_default_large.jpeg|\
Dacia Logan 1.5 dCi 2006 ⭐0.4 http://ipocars.com/imgs/a/b/w/b/i/dacia__logan_1_5_dci_ambiance_2006_2_lgw.jpg|\
Dacia Logan 1.5 dCi Ambiance 2015 https://i.ebayimg.com/00/s/NjAwWDgwMA==/z/yyUAAOSwRJ9XhkrQ/$_86.JPG|\
Dacia Logan Cabrio 2010 http://auto.blog.rs/gallery/108/dacia%20logan%20cabrio%2011.jpg|\
Dacia Logan MCV 2006 ⭐0.4 https://s1.cdn.autoevolution.com/images/gallery/DACIA-Logan-MCV-1369_19.jpg|\
Dacia Logan MCV 2009 http://ipocars.com/imgs/a/b/w/h/i/dacia__logan_mcv_1_6_lpg_laureate_air_5_seats_2009_1_lgw.jpg|\
Dacia Sandero 2008 http://img.autoabc.lv/Dacia-Sandero/Dacia-Sandero_2008_Hecbeks_1512754322_3.jpg|\
Dacia Sandero Stepway 1.6L 2010 https://www.cars.co.za/carimages_gen/Renault-Sandero/Renault-Sandero-1.6-Stepway_RenaSand1h10l.jpg`;

module.exports.daihatsu = `Daihatsu Boon 1.0 CL 2010 ⭐0.4 https://www.automobile-catalog.com/photo/2010/1225910/54584.html|\
Daihatsu Charade GTti 1992 ⭐0.4 http://carphotos.cardomain.com/ride_images/1/1029/2521/2571260006_large.jpg|\
Daihatsu Charmant 1.6L LGX 1982 ⭐0.4 https://www.innermobil.com/wp-content/uploads/2016/01/Daihatsu-Charmant-Mk-II-Design-Exterior-1981.jpg|\
Daihatsu Copen 2002 ⭐0.4 https://www.carzone.ie/reviews/images/338_daihatsu_copen2003_04.jpg|\
Daihatsu Copen 2014 ⭐0.4 http://www.j-spec.com.au/f17848/2014-Daihatsu-Copen-Robe_01.jpg|\
Daihatsu Cuore 1.0 Plus 2004 ⭐0.4 https://i.pinimg.com/originals/d7/33/3e/d7333e0c7d5d67aad0bbdfa6dee71d48.jpg|\
Daihatsu Cuore TR-XX Avanzato R4 1990 ⭐0.4 http://www.oldjapanesecar.com/trxx/1.jpg|\
Daihatsu e:S 2011 ⭐0.4 https://cache4.pakwheels.com/ad_pictures/821/daihatsu-mira-e-s-2011-8215113.png|\
Daihatsu Midget 1963 ⭐0.4 http://a2goos.com/data_images/galleryes/daihatsu-midget/daihatsu-midget-07.jpg|\
Daihatsu Mira TX 1999 ⭐0.4 https://www.productioncars.com/send_file.php/daihatsu_mira_tx_green_2d_1998.jpg|\
Daihatsu MOVE Custom RS Limited 2002 ⭐0.4 http://picture1.goo-net.com/7000540896/30180410/J/70005408963018041000100.jpg|\
Daihatsu Opti Aerodown Beex 1998 ⭐0.4 https://static.carfromjapan.com/spec_bb93b65c-9bff-4c01-b908-f364f8ee4410_640_0|\
Daihatsu Opti Club Sport 1997 ⭐0.4 https://static.carfromjapan.com/spec_dead5244-45e0-4a31-bc27-7fc5bb6670cd_640_0|\
Daihatsu Tanto EXE Custom 2010 ⭐0.4 https://static.carfromjapan.com/spec_934f85f1-858b-4622-9658-c2d2acbca348_640_0|\
Daihatsu Terios Kid Aerodown 1998 ⭐0.4 https://media.discordapp.net/attachments/306637248219185154/449224715748245514/BF188605_1.png?width=400&height=300|\
Daihatsu YRV Turbo 130 2004 http://daihatsucars.kamikaze-drive.com/YRV001F.jpg`;

module.exports.fiat = `Fiat 131 Abarth 1980 https://i.pinimg.com/originals/3f/41/60/3f4160613e2995455b34fb22b4ce2b02.jpg|\
Fiat 3 1/2 HP 1899 ⭐0.1 http://motoimg.com/images/fiat-3-12-hp-1899-10.jpg|\
Fiat 500 2008 ⭐0.4 https://media.discordapp.net/attachments/306637248219185154/464628184009146370/2008_fiat_500-pic-28253-1600x1200.png|\
Fiat 500 F 1968 ⭐0.1 http://www.italianvintagemotors.com/wp-content/uploads/2017/10/FIAT-500F-IVM-001.jpg|\
Fiat 500e 2015 ⭐0.4 https://cnet1.cbsistatic.com/img/L1UhafgNrmhn-mQFr1brUlUUFoA=/770x433/2015/12/09/9b2be60f-3a8d-465b-bf3d-2f54eab95e92/2016fiat500e-018.jpg|\
Fiat 600 1955 ⭐0.4 https://s1.cdn.autoevolution.com/images/gallery/FIAT600-2340_1.jpg|\
Fiat 8V Coupé Ghia 1953 http://www.carstyling.ru/resources/studios/1953-Ghia_Fiat-8V-Coupe-by-Mario-Boano-01.jpg|\
Fiat Barchetta 1.8 16V 1998 http://img.pistonheads.com/Fullsize/fiat/barchetta/convertibl/fiat-barchetta-convertibl-S2769319-1.jpg|\
Fiat Brava HGT 1.8 16V 2000 http://4.bp.blogspot.com/-0Jlnx59UhW0/UDLSzW_-LDI/AAAAAAAAU9M/IVoWvw67v3U/s640/67.100+reais+2000+Fiat+Brava+HGT+1.8+35.114+reais.jpg|\
Fiat Bravo T-Jet 1.4 Turbo 2014 http://s2.glbimg.com/_h9CieeM0SkWb3VglyURXXtmwCY=/620x400/e.glbimg.com/og/ed/f/original/2015/02/03/img_8811.jpg|\
Fiat Coupé Turbo 20V 1996 https://ph-classic-prod-images.s3.amazonaws.com/nimg/36306/PHHero_FiatCoupeTurbo_06.jpg|\
Fiat Dino 2.4 Coupé 1969 https://s3.amazonaws.com/images.hagerty.com/vehicle/web/P1110590_397_Fiat_1967_Dino_Coupe_135AC0000651_900.jpg|\
Fiat Dino 2400 Spider 1969 https://media.discordapp.net/attachments/306637248219185154/448234691011805185/FiatDinoSpider_1500.png?width=400&height=274|\
Fiat Panda 1000 1992 ⭐0.4 https://assets.bauer-wolke.co.uk/imagegen/p/800/-/s3/digital-cougar-assets-uk/MomoAds/2016/11/01/143252/IMG_1254.JPG|\
Fiat Punto 1.2 Sporting 2000 https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/UW0AAOSwONBZB0kh/$_86.JPG|\
Fiat Uno Turbo 1990 https://assets.catawiki.nl/assets/2017/12/19/7/2/9/729e2cec-4f86-4553-ad46-daff90322fe4.jpg|\
Fiat X1/9 1975 http://www.conceptcarz.com/images/Fiat/75_Fiat_X19_DV_05_Shdy_03.jpg`;

module.exports.honda = [
  'Honda Accord 1990 ' + 'http://consumerguide.com/wp-content/uploads/2014/07/90802041990211.jpg',
  'Honda Accord 1994 ' + 'http://st.motortrend.com/uploads/sites/5/2012/08/1994-Honda-Accord1.jpg',
  'Honda Accord LXi Hatchback 3-Door 1986 ' + 'http://www.2040-cars.com/_content/cars/images/63/269163/001.jpg',
  'Honda Accord Saloon 1998 ' + 'https://parkers-images.bauersecure.com/gallery-image/pagefiles/201518/static-exterior/1752x1168/98-saloon.jpg',
  'Honda Beat 1991 ⭐0.4 ' + 'https://media.discordapp.net/attachments/306637248219185154/453324375685464074/HONDA-Beat-2944_6.png?width=400&height=300',
  'Honda Civic EF9 SIR 1990 ' + 'https://i.ebayimg.com/00/s/NDUwWDgwMA==/z/oZ4AAOSwpRRWnqDK/$_86.JPG',
  'Honda Civic LX 1.7 2002 ' + 'https://www.muamat.com/adpics/50d2bd1aaa1bbb99fa210668b.jpg',
  'Honda Civic LXS 1.8 2008 ' + 'https://cdn.salaodocarro.com.br/_upload/carros/2016/11/19/honda-civic-2008-preto-94232-0.jpg',
  'Honda Civic Si 1986 ' + 'https://icdn-1.motor1.com/images/mgl/Oq4gR/s4/honda-civic-si-japanese-spec.jpg',
  'Honda Civic Si 1994 ' + 'http://image.superstreetonline.com/f/134347374+w660+h440+q80+re0+cr1/1994-honda-civic-si-front-bumper.jpg',
  'Honda Civic Si 1999 ' + 'https://s13252.pcdn.co/wp-content/uploads/2017/10/1-IMG_5876-e1507839488554-940x686.jpg',
  'Honda Civic Si Coupe 2006 ' + 'https://img.favcars.com/honda/civic/honda_civic_2006_pictures_13_b.jpg',
  'Honda Civic Si Hatchback 3-door 1990 ' + 'http://www.2040-cars.com/_content/cars/images/99/626699/001.jpg',
  'Honda Civic Si Sedan 1989 ' + 'https://img.favcars.com/honda/civic/honda_civic_1989_pictures_1_b.jpg',
  'Honda Civic Type R 2007 ⭐2 ' + 'https://www.carmagazine.co.uk/Images/upload/5596/images/civicrdr_4_560px.jpg',
  'Honda Civic Type R (FK2) 2015 ⭐3 https://i.imgur.com/JU15l5l.jpg',
  'Honda CR-V 2017 ' + 'https://cnet1.cbsistatic.com/img/Urh2ue0UoOOe-vMwo4qhjQK2WRY=/830x467/2016/11/29/65a18f1e-701c-456f-a386-d294eb1ba07f/2017hondacr-v073.jpg',
  'Honda CR-V LX 2.0 4x2 AT 2010 ' + 'https://www.carrosnaweb.com.br/imagensbd007/honda-cr-v-2011.jpg',
  'Honda Insight 1999 ' + 'https://s1.cdn.autoevolution.com/images/gallery/HONDAInsight-892_1.jpg',
  'Honda Insight LS 2009 ' + 'http://japanopenmarket.com/wp-content/uploads/2016/04/Insight-Grade-LS.jpg',
  'Honda Integra DB8 Type R 1996 ' + 'https://img.pistonheads.com/LargeSize/honda/integra/honda-integra-S2960771-1.jpg',
  'Honda Integra Type R (DC5) 2001 ⭐2 ' + 'https://cnet4.cbsistatic.com/img/mcgqo6QHZgdxcU9VaOdugXGlI7k=/936x527/2016/11/23/d75a2462-4878-4073-9686-dab09874a51d/2001-honda-integra-type-r-1.jpg',
  'Honda Integra XSI (E-DA6) 1989 ' + 'http://www.abbotsfordjapanauto.com/images/IM1020_89_integra-004.jpg',
  'Honda N360 1967 ⭐0.4 ' + 'https://s1.cdn.autoevolution.com/images/gallery/HONDAN360-2936_2.jpg',
  'Honda NSX 2017 ⭐3.5 ' + 'https://www.driving.co.uk/s3/st-driving-prod/uploads/2017/02/nsx-09.jpg',
  'Honda NSX-R GT 2005 ⭐3 ' + 'https://www.supercars.net/blog/wp-content/uploads/2016/04/2005_Honda_NSXRGT1.jpg',
  'Honda Odyssey 2003 ' + 'https://file.kbb.com/kbb/vehicleimage/housenew/480x360/2003/2003-honda-odyssey-frontside_htody031.jpg',
  'Honda Prelude 2.0Si 1988 ' + 'https://static.cargurus.com/images/site/2011/06/02/20/14/1989_honda_prelude-pic-5149038735259271942-1600x1200.jpeg',
  'Honda Prelude 2.2 VTEC 1991 ' + 'https://i.pinimg.com/originals/43/04/29/430429ff751adb8328d9537b0cee361f.jpg',
  'Honda S2000 Ultimate Edition 2010 ⭐3 ' + 'https://images.hgmsites.net/med/2009-honda-s2000-ultimate-edition_100193479_m.jpg',
  'Honda Z Act 1970 ⭐0.4 ' + 'http://st.automobilemag.com/uploads/sites/11/2013/05/1970-1972-Honda-600-front-left-view.jpg',
  'Honda NSX Gr.4 2017 ' + '<:gt4:698962765095632967> ' + 'https://www.kudosprime.com/gts/images/users/car_125_1_59ed1d3b269ce.jpg',
];

module.exports.hyundai = `Hyundai Genesis Coupe 2008 ⭐2 https://s1.cdn.autoevolution.com/images/gallery/HYUNDAI-Genesis-Coupe-4095_99.jpg|\
Hyundai Genesis Coupe 3.8 Track 2013 ⭐2 http://st.motortrend.com/uploads/sites/5/2012/02/2013-Hyundai-Genesis-Coupe-left-side-front-three-quarter-on-track.jpg|\
Hyundai Tiburon Turbulence 2.0L 1999 http://media.fastestlaps.com/j429juznj1rh|\
Hyundai Veloster N 2019 ⭐2 https://media.discordapp.net/attachments/306637248219185154/448235966822481950/01-2019-hyundai-veloster-n-detroit-1.png?width=400&height=225|\
Hyundai Veloster Turbo 2019 https://cnet4.cbsistatic.com/img/w20XMdbfWBqbK0dQk39a3wgbuMA=/724x407/2018/01/11/f423bcf0-c60b-4cc7-bef0-4b16c390aef7/30946-2019velosterturbo.jpg|\
Hyundai Genesis Gr.4 2013 <:gt4:698962765095632967> http://www.igcd.net/images/139/313.jpg`;

module.exports.infiniti = `Infiniti Q60S 3.0T 2017 ⭐2 https://pictures.topspeed.com/IMG/crop/201702/2017-infiniti-q60s---2_800x0w.jpg|\
Infiniti Q70 2017 ⭐2 https://images.newcartestdrive.com/wp-content/uploads/2014/10/15-q70l-1-600x400.jpg|\
Infiniti Q50S 2014 ⭐2 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/14q2/584476/2014-infiniti-q50s-37-test-review-car-and-driver-photo-597135-s-original.jpg|\
Infiniti M35h Hybrid 2013 ⭐2 https://www.hybridcars.com/files/2012-Infiniti-M35-Hybrid-Beauty.jpg|\
Infiniti J30 1993 https://file.kbb.com/kbb/vehicleimage/housenew/640x480/1993/1993-infiniti-j-frontside_ifj30931.jpg|\
Infiniti G20 T 2000 https://i.ytimg.com/vi/tjPfrxxq2KM/hqdefault.jpg|\
Infiniti G37S Convertible 2009 ⭐2 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/media/267374/2009-infiniti-g37-convertible-photo-268146-s-original.jpg|\
Infiniti FX35 2006 https://upload.wikimedia.org/wikipedia/commons/5/50/%2706-%2708_Infiniti_FX35.JPG|\
Infiniti FX50 Sebastian Vettel Edition 2012 ⭐3 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/11q3/409396/infiniti-fx-sebastian-vettel-version-news-car-and-driver-photo-417001-s-original.jpg|\
Infiniti FX50S 2009 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/08q3/267371/2009-infiniti-fx50s-photo-204308-s-original.jpg|\
Infiniti G20 1990 http://images.thetruthaboutcars.com/2010/10/96g20.jpg|\
Infiniti G35 Coupe 2007 ⭐2 https://pictures.topspeed.com/IMG/jpg/200610/2007-infiniti-g35-coupe-7.jpg|\
Infiniti G35 Sedan 2006 ⭐2 https://pictures.topspeed.com/IMG/jpg/200605/2006-infiniti-g35-10.jpg|\
Infiniti G37 Coupe 2012 ⭐2 http://momentcar.com/images/infiniti-g37-coupe-4.jpg`;

module.exports.isuzu = `Isuzu Aska Irmscher 1985 https://img.favcars.com/isuzu/aska/isuzu_aska_1985_wallpapers_1_b.jpg|\
Isuzu Bellett 1600 GT-R 1969 http://3.bp.blogspot.com/-X7YHKjlDHxY/Ui6bsyRg-xI/AAAAAAAARCg/5fEFH925vPw/s1600/1.jpg|\
Isuzu Gemini Sedan (JT150) 1987 https://img.favcars.com/isuzu/gemini/pictures_isuzu_gemini_1987_1.jpg|\
Isuzu Gemini ZZ/R 1983 http://www.j-spec.com.au/f17724/1982-Isuzu-Gemini-ZZ-R_01.jpg|\
Isuzu I-Mark RS Hatchback 1989 http://bestride.com/wp-content/uploads/2016/01/isuzu_i-mark_1988_1-3.jpg|\
Isuzu I-Mark RS Turbo 1989 https://www.thetruthaboutcars.com/wp-content/uploads/2017/12/1988-isuzu-imark-lotus-rs-turbo-1-610x458.jpg|\
Isuzu Impulse RS Turbo 1987 https://s13252.pcdn.co/wp-content/uploads/2015/01/1987-Isuzu-Impulse-RS.jpg|\
Isuzu Impulse RS Turbo 1992 http://consumerguide.com/wp-content/uploads/2014/07/91805021990003.jpg|\
Isuzu Piazza XE 1981 https://i.pinimg.com/originals/bd/63/33/bd633389b40673c2eb8ab83404ddfd66.jpg|\
Isuzu Stylus XS 1991 http://www.imcdb.org/i355059.jpg|\
Isuzu VehiCROSS 2001 http://www.2040-cars.com/_content/cars/images/59/814259/001.jpg`;

module.exports.jeep = `Jeep Grand Cherokee SRT 2014 ⭐2 http://www.autoguide.com/images/content/2014-SRT-Jeep-Grand-Cherokee-Main.jpg|\
Jeep Grand Cherokee Trackhawk 2018 ⭐3 https://c.slashgear.com/wp-content/uploads/2017/08/2018-Jeep-Grand-Cherokee-Trackhawk-front-three-quarter-04-1-980x606.jpg|\
Jeep Wrangler 2019 https://cars.usnews.com/static/images/Auto/izmo/i106121439/2019_jeep_wrangler_angularfront.jpg|\
Jeep Compass 2018 https://www.jeep.com/content/dam/fca-brands/na/jeep/en_us/2018/compass-mp/gallery/interior/2018-Jeep-Compass-VLP-Gallery-Exterior-02.jpg.image.1440.jpg|\
Jeep Wrangler 1990 https://i.kinja-img.com/gawker-media/image/upload/s--H6rWwApT--/c_scale,f_auto,fl_progressive,q_80,w_800/1430829687054771604.jpg|\
Jeep Wrangler Unlimited Sport 2016 https://houstonexotics.blob.core.windows.net/ech-g245960/full/1img4562.jpg|\
Jeep Gladiator 2020 ⭐0.4 https://cnet3.cbsistatic.com/img/ksn7KvtWnKdSOdCighXQb3vi07A=/936x527/2018/11/29/7ee785b1-193d-4aa5-858f-f8b65226c8f3/2020-jeep-gladiator001.jpg`;

module.exports.kia = `Kia Forte SX 2010 http://st.motortrend.com/uploads/sites/5/2009/08/2010-kia-forte-sx-ft-tq.jpg|\
Kia Pro_ceed GT 2013 ⭐2 https://motors.mega.mu/cdn/media/news/2013-kia-proceed-gt-geneva.jpg|\
Kia Soul 2009 https://res.cloudinary.com/carsguide/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_large/v1/editorial/Kia-Soul-white-2009-suv.jpg|\
Kia Soul Turbo 2017 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/16q4/671590/2017-kia-soul-turbo-test-review-car-and-driver-photo-672942-s-original.jpg|\
Kia Soul 2020 https://www.motortrend.com/uploads/sites/5/2019/02/2020-Kia-Soul-GT-2.jpg?fit=around%7C875:492|\
Kia Stinger 2017 ⭐3 https://c.slashgear.com/wp-content/uploads/2017/09/kia-stinger-1-980x620.jpg`;

module.exports.mg = `MG A Twin Cam Roadster 1958 https://cdn.bringatrailer.com/wp-content/uploads/2015/07/1959-MGA-Twin-Cam-940x636.jpg|\
MG B GT 1966 ⭐0.4 http://owenauto.ca/wp-content/uploads/2016/05/IMG_7592-1024x683.jpg|\
MG B Roadster 1966 ⭐0.4 https://i.pinimg.com/originals/02/48/2b/02482b86e05819039f2a499167aa92ba.jpg|\
MG B V8 GT 1976 http://www.classicandperformancecar.com/uploads/cms_article/3801_3900/1973-1976-mg-b-gt-v8-3838_6427_969X727.jpg|\
MG Midget 1500 1980 ⭐0.4 https://img.favcars.com/mg/midget/mg_midget_1974_wallpapers_1_b.jpg|\
MG TF160 2005 ⭐2 http://www.usedcarsouthafrica.com/upload/2011/05/2301141160.jpg`;

module.exports.mazda = [
  'Mazda Miata 30th Anniversary 2019 ⭐2 ' + 'http://blog.consumerguide.com/wp-content/uploads/sites/2/2019/02/Miata-front.png',
  'Mazda Savanna AP GT 1975 http://i41.tinypic.com/212uwcn.jpg',
  'Mazda Atenza Sedan 2002 ' + 'https://image-cdn.beforward.jp/files/pictures/201310/160270/BF165196_1.jpg',
  'Mazda 6 Sport 2.2D 2010 ' + 'https://i.ebayimg.com/00/s/NzA5WDEwMjQ=/z/h3wAAOSwzy5aj-i5/$_86.JPG',
  'Mazda MX-5 1989 ' + 'https://www.speeddoctor.net/media/2012/06/Mazda-Eunos-Roadster-1989_01.jpg',
  'Mazda MX-5 2000 ' + 'https://s1.cdn.autoevolution.com/images/gallery/MAZDAMX-5-Miata-3549_2.jpg',
  'Mazda MX-5 25th Anniversary 2014 ' + 'https://cdn2.evo.co.uk/sites/evo/files/styles/gallery_adv/public/images/dir_1191/car_photo_595615.jpg?itok=9kFi29lW',
  'Mazda Protege 5 2003 ' + 'https://s.aolcdn.com/commerce/autodata/images/30MAGEH2.jpg',
  'Mazda Protege MP3 2001 ' + 'https://s3.us-east-2.amazonaws.com/prod.mm.com/img/new-cars/mazdamp3.jpg',
  'Mazda Protege 2001 ' + 'https://s.aolcdn.com/dims-global/dims3/GLOB/legacy_thumbnail/788x525/quality/85/https://s.aolcdn.com/commerce/autodata/images/USB10MAC061B1101.jpg',
  'Mazda RX-3 1973 ' + 'http://bestcarmag.com/sites/default/files/6680345blue_mazda_rx3_by_lpagan401-d1vao44.jpg',
  'Mazda RX-7 GSL-SE 1985 ⭐0.4 ' + 'https://cdn.bringatrailer.com/wp-content/uploads/2016/09/C35674D0-39D5-425B-9F17-7E8D2CD5738A-940x519.jpg',
  'Mazda Savanna RX-7 GT Limited (FC) 1986 ⭐2 ' + 'https://img.favcars.com/mazda/rx-7/mazda_rx-7_1985_photos_1.jpg',
  'Mazda 3 MPS 2007 ' + 'https://parkers-images.bauersecure.com/pagefiles/204170/cut-out/600x400/mazda3_mps_07-.jpg',
  'Mazda 3 MPS 2010 ' + 'https://s1.cdn.autoevolution.com/images/gallery/MAZDA3MPS-MAZDASPEED3-4140_9.jpg',
  'Mazda 3 S GT Hatchback 2014 ' + 'http://st.motortrend.com/uploads/sites/5/2015/04/2014-Mazda3-S-GT-Hatchback-front-three-quarter-04.jpg',
  'Mazda 3 Sport 23 S 2005 ' + 'http://royal-japancars.com//upload/9101392172587556.JPG',
  'Mazda 6 2016 ' + 'https://cnet4.cbsistatic.com/img/-hClWSDAPkuiQy28x68X76YV434=/830x467/2016/05/04/e75fd0a1-6eaa-48b9-b585-3e1a7c42e665/2016-mazda6-grand-touring-1.jpg',
  'Mazda 6 2.2 Skyactiv 175 Luxury 2017 ⭐2 ' + 'https://i.ytimg.com/vi/90QXPLNPSIU/maxresdefault.jpg',
  'Mazda Atenza Sedan XD L Package 2015 ⭐2 ' + 'https://media.glv.co.nz/car-i/img/thumb/1200x0900/0887/20171202A0000887/51950991LF001.JPG',
  'Mazda Autozam AZ-1 1991 ⭐0.4 ' + 'http://st.automobilemag.com/uploads/sites/11/2017/10/1992-Autozam-AZ1-02.jpg',
  'Mazda Eunos Cosmo 13B 1990 ' + 'http://topclassiccarsforsale.com/uploads/photoalbum/1990-mazda-eunos-cosmo-13b-2-rotor-twin-turbo-rx-7-1.jpg',
  'Mazda Eunos Cosmo 20B 1990 ⭐2 ' + 'http://www.carsaddiction.com/files/cars/90__Eunos_Cosmo_20B.jpg',
  'Mazda MX-5 Miata 2013 ' + 'https://file.kbb.com/kbb/vehicleimage/housenew/480x360/2013/2013-mazda-mx-5%20miata-frontside_mamx5131.jpg',
  'Mazda MX-5 RS-II 2002 ' + 'http://img.pistonheads.com.s3-eu-west-1.amazonaws.com/Fullsize/mazda/mx-5-mk2/mazda-mx-5-mk2-S1989012-1.jpg',
  'Mazda MX-5 Super20 2012 ⭐3 ' + 'https://cdn.gearpatrol.com/wp-content/uploads/2012/05/mazda-mx-5-miata-super20-gear-patrol-lead-image.jpg',
  'Mazda RX-7 Spirit R Type A (FD) 2002 ⭐3 ' + 'https://picolio.auto123.com/auto123-media/articles/2015/12/61624/Mazda-RX-7-Spirit-R_002fr.JPG',
  'Mazda RX-8 2003 ⭐2 ' + 'https://res.cloudinary.com/carsguide/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_large/v1/editorial/mazda-rx8-2003-red.jpg',
  'Mazda RX-8 R3 2011 ⭐2 ' + 'http://www.rx8club.com/attachments/rx-8s-sale-wanted-43/215743d1488292542-2011-mazda-rx-8-r3-20170211_165719.jpg',
  'Mazda Roadster S (ND) 2015 ' + 'https://upload.wikimedia.org/wikipedia/commons/2/27/Mazda_Roadster_02_-_Tokyo_Auto_Salon_2015.jpg',
  'Mazda Atenza Gr.3 Road Car 🔧3 ' + 'https://img00.deviantart.net/0608/i/2017/347/0/7/mazda_atenza_gr_3_road_car_by_gt7_garage-dbwkw17.jpg',
  'Mazda Atenza Gr.4 2015 <:gt4:698962765095632967> ' + 'https://i.ytimg.com/vi/H8ffUx2CcJQ/maxresdefault.jpg',
  'Mazda RX-VISION GT3 CONCEPT 2020 <:gt3:698962765443891280> ' + 'https://cdn.slashgear.com/wp-content/uploads/2020/05/Mazda-RX-Vision-GT3-Concept-Gran-Turismo_18-680x383.jpg',
];

module.exports.mercury = `Mercury Capri Black Magic 1982 http://www.stangranch.com/graphics/BlackMagic.jpg|\
Mercury Capri RS 1982 https://img.favcars.com/mercury/capri/photos_mercury_capri_1981_1_b.jpg|\
Mercury Capri XR2 1994 https://4.bp.blogspot.com/-YREVSDYhN3Q/Vwm7-C8u7bI/AAAAAAAABds/5k0V3HMjY7ADoj4NSHoTiR4xHgJdtx1tw/s640/Capri%2B4.jpg|\
Mercury Comet GT 1971 https://static.cargurus.com/images/site/2010/10/14/17/58/1971_mercury_comet-pic-1729247166360388225-1600x1200.jpeg|\
Mercury Cougar Convertible 428 Cobra Jet 1969 ⭐2 https://ccmarketplace.azureedge.net/cc-temp/listing/91/4893/3594811-1969-mercury-cougar-xr7-428-cobra-jet-std-c.jpg|\
Mercury Cougar Eliminator 1970 ⭐2 https://st.hotrod.com/uploads/sites/21/2017/05/nelson-1970-mercury-cougar-eliminator-front-three-quarter-alt-4.jpg|\
Mercury Cougar XR 2002 ⭐2 http://images.mautofied.com/adphotos/100044701_1.jpg|\
Mercury Cougar XR-7 1986 https://www.coolcats.net/modelyear/images/86xr7_01.jpg|\
Mercury Cougar XR-7 1968 https://st.hotrod.com/uploads/sites/21/2017/06/carpenter-1968-mercury-cougar-xr7g-front-three-quarterb.jpg?interpolation=lanczos-none&fit=around|\
Mercury Cyclone Spoiler 1970 ⭐3 http://wwwcdn.oldcarsweekly.com/wp-content/uploads/1970-Spoiler-main1.jpg|\
Mercury Marauder 2003 https://file.kbb.com/kbb/vehicleimage/housenew/480x360/2003/2003-mercury-marauder-frontside_memar031.jpg|\
Mercury Marauder X-100 1969 https://assets.hemmings.com/story_image/133013-500-0.jpg?rev=2|\
Mercury Milan Hybrid 2010 http://images.thecarconnection.com/lrg/2010-mercury-milan-hybrid_100230346_l.jpg|\
Mercury Eight 1949 ⭐0.4 https://dealeraccelerate-all.s3.amazonaws.com/ag/images/2/5/3/8/2538/208050_031663e90e_low_res.jpg|\
Mercury LN7 1983 ⭐0.4 https://i.pinimg.com/originals/3c/e0/c7/3ce0c70da26c0844183f734e0c3fa570.jpg`;

module.exports.mini = `Mini Cooper S 1965 ⭐0.4 https://s13252.pcdn.co/wp-content/uploads/2017/11/D8989707-6E1A-40B5-8421-B6797920546B-940x702.jpeg|\
Mini Cooper S 2001 https://vignette.wikia.nocookie.net/cooper-world/images/5/5e/2001-mini-cooper-s-5.jpg/revision/latest?cb=20160411214013|\
Mini Cooper S 2014 https://i.ytimg.com/vi/K_KcfLVHx0w/maxresdefault.jpg|\
Mini Cooper S Countryman 2011 http://st.motortrend.com/uploads/sites/5/2011/11/2011-Mini-Cooper-S-Countryman-ALL4-promo.jpg|\
Mini Cooper S Final Edition 2000 ⭐0.4 https://s-media-cache-ak0.pinimg.com/originals/50/fc/69/50fc690baca147b04dc3f33245490ac5.jpg|\
Mini John Cooper Works 2009 ⭐2 https://www.autoguide.com/gallery/d/61302-7/2009-mini-cooper-john-cooper-works-09.JPG|\
Mini John Cooper Works Challenge 2017 ⭐2 https://cnet2.cbsistatic.com/img/1fg87WSSRuniNzc9uG3U2cK4G0c=/2016/10/03/82ecbec9-162f-48db-9ede-97e7e6767040/mini-jcw-site.jpg|\
Mini John Cooper Works GP 2012 ⭐2 https://www.torquenews.com/sites/default/files/image-1084/%5Btitle-raw%5D/100390328_2013-mini-john-cooper-works-gp_0.jpeg`;

module.exports.mitsubishi = `Mitsubishi 3000GT VR-4 1992 ⭐2 https://cdn.bringatrailer.com/wp-content/uploads/2016/10/a-61.jpg|\
Mitsubishi 3000GT VR-4 1998 ⭐2 https://i.kinja-img.com/gawker-media/image/upload/s--bCNEDxwG--/c_scale,f_auto,fl_progressive,q_80,w_800/l8yz9byqrna8vwfl57nz.jpg|\
Mitsubishi Colt 1.5 X Sport 2002 http://bay2car.com/img/MITSUBISHI-COLT-1-5-SPORT-06-BLACK-LOW-MILEAGE-HPi-CLEAR-SERVICE-HISTORY-2x-KEYS-252121590102/0.jpg|\
Mitsubishi Colt Ralliart 2010 http://www.zercustoms.com/news/images/Mitsubishi/2009-Mitsubishi-Colt-Ralliart-2.jpg|\
Mitsubishi CZ-3 Tarmac 2001 http://oldconceptcars.com/wp-content/uploads/mitsubishi_cz3_tarmac_concept_5.jpg|\
Mitsubishi Eclipse GS 16V https://www.automobile-catalog.com/img/pictonorzw/mitsubishi/mitsubishi-eclipse-3.jpg|\
Mitsubishi Eclipse GSX 1995 ⭐2 https://i.ytimg.com/vi/Yuytoyl_JoI/hqdefault.jpg|\
Mitsubishi Eclipse GT 2006 ⭐2 https://file.kbb.com/kbb/vehicleimage/housenew/480x360/2006/2006-mitsubishi-eclipse-frontside_mieclgt061.jpg|\
Mitsubishi Eclipse GT Coupe 2003 ⭐2 http://images.gtcarlot.com/pictures/14085673.jpg|\
Mitsubishi Eclipse GTS Spyder 2004 ⭐2 https://static.cargurus.com/images/site/2010/04/13/14/26/2004_mitsubishi_eclipse_spyder_gt_spyder-pic-8090805985717918041-1600x1200.jpeg|\
Mitsubishi eK Wagon 2002 ⭐0.4 http://car-pricenet.com/img/attachments/79/185779_large.jpg|\
Mitsubishi eK Wagon 2016 ⭐0.4 https://i.ytimg.com/vi/cXvobCvNGbU/maxresdefault.jpg|\
Mitsubishi FTO GP Version R 1999 ⭐2 https://i.pinimg.com/originals/ea/8f/94/ea8f949d77122f2928f1e135bc0088d9.jpg|\
Mitsubishi Galant VR-4 1987 http://www.autozine.org/Archive/Mitsubishi/classic/Galant_VR4_mk1.jpg|\
Mitsubishi Lancer Evolution Final Edition 2015 ⭐2 http://st.motortrend.com/uploads/sites/5/2015/10/2015-mitsubishi-lancer-evolution-final-edition-us-front-three-quarter-03.jpg|\
Mitsubishi Lancer Evolution IV GSR 1996 ⭐2 http://www.geocities.ws/go2idmisc/EVO_IV-1.jpg|\
Mitsubishi Lancer Evolution IV RS 1996 ⭐2 http://images.canadianlisted.com/nlarge/1996-mitsubishi-lancer-evolution-iv-gsr-8890_8945051.jpg|\
Mitsubishi Lancer Evolution IX FQ360 2008 ⭐3 https://www.supercars.net/blog/wp-content/uploads/2016/04/2006_Mitsubishi_LancerEvolutionIXFQ3601.jpg|\
Mitsubishi Lancer Evolution IX GT 2005 ⭐2 https://i.pinimg.com/originals/b8/1c/04/b81c047ba06f13be81d15626fb098a2f.jpg|\
Mitsubishi Lancer Evolution IX MIEV 2005 https://www.supercars.net/blog/wp-content/uploads/2016/04/2005_Mitsubishi_LancerEvolutionIXMIEV1.jpg|\
Mitsubishi Lancer Evolution IX MR 2006 ⭐2 http://www.dragtimes.com/images/15552-2006-Mitsubishi-Lancer-EVO.jpg|\
Mitsubishi Lancer Evolution IX Wagon 2006 https://images.carscoops.com/2017/01/mitsu-lancer-evo-ix-rare-autowagon-19.jpg|\
Mitsubishi Lancer Evolution VI GSR T.M.E. Special Color Package 1999 ⭐2 https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/evo6tm-288.jpg?itok=fw7APKM5|\
Mitsubishi Lancer Evolution VIII FQ330 2004 ⭐2 https://pictures.topspeed.com/IMG/jpg/200511/2004-mitsubishi-evo-viii--2.jpg|\
Mitsubishi Pajero SWB 2002 ⭐0.4 https://s1.cdn.autoevolution.com/images/gallery/MITSUBISHIPajero-Montero-ShogunSWB-368_7.jpg|\
Mitsubishi Starion ESI-R 1988 https://cdn.bringatrailer.com/wp-content/uploads/2017/06/a-34.jpg|\
Mitsubishi Lancer Evolution X FQ440 MR 2014 ⭐2 https://img.pistonheads.com/Fullsize/mitsubishi/lancer/2-0-evo-x-fq-440-mr-4x4-4dr/mitsubishi-lancer-2-0-evo-x-fq-440-mr-4x4-4dr-309768642-1.jpg|\
Mitsubishi Starion GSR-VR 1988 http://www.j-spec.com.au/f14466/1988-Mitsubishi-Starion-GSR-VR_1.jpg|\
Mitsubishi Lancer Evolution Final Edition Gr.B Road Car 🔧3 https://vignette.wikia.nocookie.net/gran-turismo/images/d/d5/Mitsubishi_Lancer_Evolution_Final_Edition_Gr.B_Road_Car.jpg/revision/latest?cb=20171207135517|\
Mitsubishi Lancer Evolution X Sparco Edition 2008 🔧3 https://c1.staticflickr.com/3/2724/4024045620_c3d867ca00_z.jpg?zz=1`;

module.exports.opel = `Opel Astra OPC Nürburgring Edition 2010 ⭐2 https://images-ext-2.discordapp.net/external/HGtC04O_giRaygYEzfjsDIAtlESTnx68CMdcfRQO_cQ/https/upload.wikimedia.org/wikipedia/commons/d/d0/Opel_Astra_H_OPC_N%25C3%25BCrburgring_Edition.JPG?width=400&height=283|\
Opel Corsa 1.4 2001 https://s1.cdn.autoevolution.com/images/gallery/OPELCorsa3doors-418_6.jpg|\
Opel Corsa OPC 2011 http://www.guide-autosport.com/wp-content/uploads/photo-gallery/Opel%20Corsa%20OPC/opel-corsa-opc-11.jpg|\
Opel Corsa OPC Nürburgring Edition 2012 ⭐2 http://www.carmag.co.za/wp-content/uploads/2013/09/OPCN_1.jpg|\
Opel GT 1972 https://barnfinds.com/wp-content/uploads/2018/04/opel-gt-front-e1523551407957-630x395.jpg|\
Opel Speedster 2001 https://s1.cdn.autoevolution.com/images/gallery/OPELSpeedster-458_3.jpg|\
Opel Speedster Turbo 2000 ⭐2 http://starmoz.com/images/opel-speedster-turbo-15.jpg|\
Opel Tigra 1.6i 1999 http://www.zeperfs.com/photos/275-f.jpg`;

module.exports.peugeot = `Peugeot 106 1.6 GTi 1997 https://images.esellerpro.com/2489/461241/images/objects/featured-cars/1.6-gti.jpg|\
Peugeot 106 1.6 Rallye 1997 http://www.zeperfs.com/photos/548-f.jpg|\
Peugeot 206 2.0 S16 http://www.motorstown.com/images/peugeot-206-2.0-s16-02.jpg|\
Peugeot 207 RC 2007 http://www.guide-autosport.com/wp-content/uploads/photo-gallery/Peugeot%20207%20RC/peugeot-207-rc-28.jpg|\
Peugeot 208 GTi 2014 ⭐2 https://res.cloudinary.com/carsguide/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/Peugeot-208-GTi-%281%29.jpg|\
Peugeot 308 R Hybrid 2015 ⭐2 https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/motor/2016/05/19/65296/Peugeot-308-R-Hybrid-review-main.jpg|\
Peugeot 404 1968 ⭐0.4 https://c1.staticflickr.com/5/4047/4219350770_172c758fff.jpg|\
Peugeot 406 Coupe 2.0 SE 1998 https://parkers-images.bauersecure.com/pagefiles/203465/cut-out/600x400/406_coupe.jpg|\
Peugeot 508 2018 ⭐2 https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/pug-2811.jpg?itok=HMeaBiaB|\
Peugeot RCZ Gr.3 Road Car 🔧3 https://www.kudosprime.com/gts/images/users/car_167_1_5a6bbb3d34fe7.jpg`;

module.exports.pontiac = `Pontiac Aztek 2001 https://file.kbb.com/kbb/vehicleimage/housenew/480x360/2001/2001-pontiac-aztek-frontside_pvazt015.jpg|\
Pontiac Fiero GT 1988 https://i2.cdn.turner.com/money/galleries/2010/autos/1002/gallery.cheap_collector_cars/images/pontiac_fiero_2.jpg|\
Pontiac Firebird Trans Am GTA 1987 ⭐2 https://dxsdcl7y7vn9x.cloudfront.net/3/432928/15323102/978537538.jpg|\
Pontiac GTO 6.4L V8 1966 http://www.2040-cars.com/_content/cars/images/79/196179/001.jpg|\
Pontiac GTO 6.0 2006 ⭐3 https://pictures.topspeed.com/IMG/jpg/200512/2006-pontiac-gto-11.jpg|\
Pontiac Solstice 2006 ⭐2 https://static.cargurus.com/images/site/2008/06/13/09/35/2006_pontiac_solstice_roadster-pic-54296-640x480.jpeg|\
Pontiac Solstice GXP Coupe 2009 ⭐2 https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/800x450/format/jpg/quality/85/http://www.blogcdn.com/www.autoblog.com/media/2009/06/solsticecoupe_rev1002_opt.jpg|\
Pontiac Vibe GT 2009 http://www.blogcdn.com/www.autoblog.com/media/2008/04/01_09vibe_garage.jpg`;

module.exports.renault = `Renault AVANTIME 2002 https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/flexslider_full/public/slideshow_image/1_32.jpg?itok=qxi-WsZd|\
Renault Sport Clio V6 Phase II 2005 ⭐2 http://crossley-webb.com/wp-content/uploads/Renault-Clio-V6-1-1140x650.jpg|\
Renault Sport Clio V6 24V 2000 ⭐2 http://www.voiture-collection.com/thmbwt/RW/1920/6KNt1NwcOK15XTJHjIqj5B3Fbfesq_PLS_pDpErx031T8bt4UlCSGjn_SLH_P_PLS_DxwlJDymu1DViiqnOnErZePXKoT4dKig_EQS__EQS_.jpg|\
Renault Sport Megane 2.0 16V 2003 http://www.zeperfs.com/photos/1038-f.jpg|\
Renault Sport Megane R.S. 250 2010 ⭐2 https://images.caradisiac.com/images/9/5/5/8/109558/S0-la-renault-megane-3-rs-tire-sa-reverence-retour-sur-la-carriere-de-la-mythique-compacte-384231.jpg|\
Renault Sport Clio R.S. 220 EDC Trophy 2015 ⭐2 https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/clio-trophy-220-001.jpg?itok=Gde3b56R|\
Renault Sport Clio R.S. 220 EDC Trophy 2016 ⭐2 https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/clio-rstrophy-386.jpg?itok=s51ZHj9l|\
Renault Sport Mégane R.S. 265 Trophy 2014 ⭐2 https://performancedrive.com.au/wp-content/uploads/2014/06/2014-Renault-Megane-R.S.-265-Cup-yellow.jpg|\
Renault Clio RS 2.0 16V 2001 https://i.ytimg.com/vi/sRXmfcrYmVk/maxresdefault.jpg|\
Renault Clio RS Cup 3 2011 http://www.imcdb.org/i449905.jpg|\
Renault Clio V6 24V 2000 ⭐2 https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/RenaultClioV6.jpg/1200px-RenaultClioV6.jpg|\
Renault Twingo I 1998 ⭐0.4 http://partsopen.com/images/1998-renault-twingo-4.jpg|\
Renault Twingo II Gordini R.S. 2012 https://auta5p.eu/vystavy/zeneva_2012/zeneva_242.jpg|\
Renault Twingo RS 133 Cup 2009 https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/9109931912475800x530.jpg?itok=wVJF0Sxg|\
Renault Sport R.S.01 GT3 2016 <:gt3:698962765443891280> https://images.carscoops.com/2015/10/Renault-Sport-RS-01-0.jpg`;

module.exports.scion = `Scion FR-S 10 Series 2013 ⭐2 http://www.autoguide.com/blog/wp-content/uploads/2013/03/2014-Scion-FRS-10-Series.jpg|\
Scion iQ 2015 https://file.kbb.com/kbb/vehicleimage/housenew/480x360/2015/2015-scion-iq-frontside_siiq151.jpg|\
Scion tC 2014 https://images.carscoops.com/2013/03/e1f7b6c8-scion-tc-125255b225255d.jpg|\
Scion tC RS 7.0 2012 https://dxsdcl7y7vn9x.cloudfront.net/3/629677/4068458/636383932.jpg|\
Scion tC Spec 2008 http://www.internationalcarcompany.com/imageServer/9vsjpzr8/640/1538671954_whrvpq-1.jpg|\
Scion xB 2012 https://images.autotrader.com/scaler/620/420/cms/content/articles/reviews/new/scion/xb/2012/170150.jpg|\
Scion xD 2009 https://file.kbb.com/kbb/vehicleimage/housenew/480x360/2009/2009-scion-xd-frontside_sixd091.jpg|\
Scion FR-S Evasive Motorsports 2013 🔧3 https://pictures.topspeed.com/IMG/crop/201210/2013-scion-fr-s-evasive-m_800x0w.jpg|\
Scion iQ Evasive Edition 2012 🔧2.5 https://images.hgmsites.net/lrg/2012-scion-iq-by_100368586_l.jpg`;

module.exports.seat = `Seat Ibiza Cupra R 2004 ⭐2 http://www.rsiauto.fr/images/SEAT/Ibiza-Cupra-R/Ibiza-Cupra-R-1.jpg|\
Seat Ateca 2018 ⭐2 https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/seat-ateca_0.jpg?itok=GVDuCPRS|\
Seat Mii Ecofuel 2014 ⭐0.4 http://www.ngvjournal.com/wp-content/uploads/2013/03/l_europa-seatmiiecofuel-4mar.jpg|\
Seat Mii 1.0 S 5dr 2015 ⭐0.4 https://d3s5bh2z564lhc.cloudfront.net/524082/original/524082-001_1.jpg|\
Seat Ibiza MK1 1984 https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/ibiza2a.jpeg|\
Seat Ibiza MK2 1993 https://img.favcars.com/seat/ibiza/seat_ibiza_1993_pictures_1_b.jpg|\
Seat Ibiza Cupra 2009 ⭐2 https://www.carmagazine.co.uk/Images/upload/19931/images/5SeatIbizaCupraCARreview.jpg|\
Seat Ibiza Cupra R 2018 ⭐2 https://www.vau-max.de/thumbs/img/News/43/58/00/p/p_normal/video-verschaerft-und-streng-limitierter-cupra-mit-310-ps-neuauflage-des-seat-leon-cupra-r-5843.jpg|\
Seat Leon Cupra R 2009 ⭐2 https://s1.cdn.autoevolution.com/images/gallery/SEATLeonCupraR-4279_2.jpg|\
Seat Leon Cupra R 2003 ⭐2 https://parkers-images.bauersecure.com/pagefiles/194765/cut-out/600x400/seat_leon_cupra_r02.jpg`;

module.exports.subaru = `Subaru Alcyone SVX 1992 ⭐2 http://cloud.leparking.fr/2018/10/05/02/24/subaru-alcyone-svx-subaru-svx-1992-3-3-awd-r-40-600-00_6483320970.jpg|\
Subaru Forester STI 2006 ⭐2 https://media.ed.edmunds-media.com/subaru/forester/2006/oem/2006_subaru_forester_wagon_base_fq_oem_2_500.jpg|\
Subaru Impreza Coupe 22B STi Version 1998 ⭐2 https://www.autotribute.com/wp-content/uploads/2013/12/1998-Subaru-Impreza-22b-STi-Coupe.jpg|\
Subaru Legacy B4 Blitzen 2002 ⭐2 https://www.supercars.net/blog/wp-content/uploads/2016/04/file151.jpeg|\
Subaru Legacy B4 RSK 1998 ⭐2 https://media.fastestlaps.com/subaru-legacy-b4-rsk.jpg?640x350m|\
Subaru WRX STI S208 2018 ⭐3 https://pictures.topspeed.com/IMG/jpg/201709/2018-subaru-wrx-sti-s208-2.jpg|\
Subaru BRZ S 2012 ⭐2 http://www.zercustoms.com/news/images/Subaru/Subaru-BRZ-4.jpg|\
Subaru Impreza Sedan WRX STi 2002 ⭐2 https://www.supercars.net/blog/wp-content/uploads/2016/04/2002_Subaru_ImprezaWRXSTi1.jpg|\
Subaru Impreza Sedan WRX STi 2010 ⭐2 https://www.carpixel.net/w/8e8a52ea7eaf36b8f557afe9456f68f9/subaru-impreza-wrx-sti-sedan-wallpaper-hd-3267.jpg|\
Subaru Impreza Sedan WRX STi 1994 ⭐2 http://www.autozine.org/Archive/Subaru/classic/Impreza_22B.jpg|\
Subaru Impreza WRX STI 2008 ⭐2 http://st.motortrend.com/uploads/sites/5/2010/05/2010-subaru-impreza-WRX-STI-special-edition-front-three-quarter-promo.jpg|\
Subaru Impreza 2.5i Premium Sedan 2010 https://s3-prod.autoweek.com/s3fs-public/styles/1152x647/public/100519853.jpg|\
Subaru Impreza WRX STi Spec-C 2009 ⭐2 http://st.motortrend.com/uploads/sites/5/2009/08/subaru-impreza-WRX-STI-spec-c-front-2.jpg|\
Subaru Impreza WRX STi Type S 2014 ⭐2 https://www.carscoops.com/wp-content/uploads/2014/08/Subaru-WRX-STI-JDM-spec-0.jpg|\
Subaru WRX STI S209 2020 ⭐3 http://imagesvc.timeincapp.com/v3/foundry/image/?q=70&w=1440&url=https%3A%2F%2Ftimedotcom.files.wordpress.com%2F2019%2F01%2Ff8a9911_cover-1-e1547491895241.jpg%3Fquality%3D85|\
Subaru WRX Gr.B Road Car 🔧3 https://www.kudosprime.com/gts/images/users/car_166_1_5a0c92edc175b.jpg|\
Subaru WRX Gr.4 2014 " <:gt4:698962765095632967> https://vignette.wikia.nocookie.net/gran-turismo/images/1/10/Subaru_WRX_Gr.4.jpg/revision/latest?cb=20181204105107|\
Subaru WRX Gr.3 2014 <:gt3:698962765443891280> http://wikinavi.net/gran-turismo-sport/index.php?plugin=ref&page=WRX%20Gr.3&src=wrxgr3.jpg`;

module.exports.suzuki = `Suzuki Alto 1980 ⭐0.4 http://www.carsplusplus.com/pictures/1980/28604/photo.jpg|\
Suzuki Alto Works RS/X 1987 ⭐0.4 https://cdn.bringatrailer.com/wp-content/uploads/2015/03/1987-Suzuki-Alto-Works-RS-X-Front-940x636.jpg|\
Suzuki Alto Works RS/Z 1998 ⭐0.4 http://car-pricenet.com/img/attachments/95/13295_large.jpg|\
Suzuki Alto Works Suzuki Sport Limited 1997 ⭐0.4 https://i.pinimg.com/originals/59/5a/f2/595af2d120cdfd926bfe454fdc183a28.jpg|\
Suzuki Cappuccino 1991 ⭐0.4 http://www.performance-car-guide.co.uk/images/L-Suzuki-Cappuccino-5.jpg|\
Suzuki Cervo SR 1997 ⭐0.4 http://www.goo-net.com/carphoto/10551006_200710s.jpg|\
Suzuki Cervo SR 2007 ⭐0.4 https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/2007_Suzuki_Cervo_01.JPG/400px-2007_Suzuki_Cervo_01.JPG|\
Suzuki Swift Sport 2007 https://parkers-images.bauersecure.com/pagefiles/190687/cut-out/600x400/suzuki_swift_sport.jpg|\
Suzuki Swift Sport 2012 https://performancedrive.com.au/wp-content/uploads/2012/04/2012-Suzuki-Swift-Sport-front-side-630x419.jpg|\
Suzuki Kizashi Sport 2011 http://www.autosavant.com/wp-content/uploads/2011/05/IMG_4841.jpg|\
Suzuki Swift 2003 ⭐0.4 https://image-cdn.beforward.jp/files/pictures/201307/135711/BF140927_1.jpg`;

module.exports.tata = `Tata Nano Twist XT 2018 ⭐0.1 https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/tata-nano-rt-2014-11_0.jpg?itok=z2lJE_59|\
Tata Nano GenX 2015 ⭐0.1 https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHC5-sgD58j43KzDSGMgNbsqgLneQ9p4iEeIK0QBL4ZoO1zv6x|\
Tata Nano CNG Emax 2013 ⭐0.1 https://imgct2.aeplcdn.com/img/600/cars/Tata-Nano-CNG-emax-tagged-as-most-fuel-efficient-car-with-low-carbonprint.jpeg|\
Tata Nano 2008 ⭐0.1 https://car-images.bauersecure.com/upload/7617/images/01tatananonew.jpg`;

module.exports.toyota = `Toyota 86 GRMN 2016 ⭐2 https://images.betweentheaxles.net/toyota_86_grmn_tas_2016/toyota-86-grmn-100_usx4z.jpg|\
Toyota 86 GT 2015 ⭐2 https://www.motoringresearch.com/wp-content/uploads/2014/10/Toyota_GT86.jpg|\
Toyota 2000GT 1967 https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/TOYOTA_2000GT.jpg/1200px-TOYOTA_2000GT.jpg|\
Toyota Alphard V 2002 ⭐0.4 https://image-cdn.beforward.jp/files/pictures/201304/117050/BF122506_1.jpg|\
Toyota Aqua S 2011 ⭐0.4 https://usercontent1.hubstatic.com/9022306_f520.jpg|\
Toyota Aygo Go 2011 ⭐0.4 https://images.honestjohn.co.uk/imagecache/file/width/640/media/3540183/62805toy.jpg|\
Toyota Camry SE 2014 https://st.motortrend.com/uploads/sites/10/2015/09/2014-Toyota-Camry-SE-three-quarters-in-motion-front-view.jpg|\
Toyota Camry SE 2018 https://article.images.consumerreports.org/prod/content/dam/CRO%20Images%202017/Cars/June/CR-Cars-Inline-2018-Toyota-Camry-SE-06-17|\
Toyota Celica SS-I 2003 https://upload.wikimedia.org/wikipedia/commons/4/41/TC2004GTS-AP.jpeg|\
Toyota Celica Supra 1984 https://st.automobilemag.com/uploads/sites/11/2016/03/1982-Toyota-Supra-P-Type-front-three-quarter-in-motion-02.jpg|\
Toyota CH-R 2018 https://www.autoguide.com/blog/wp-content/gallery/2018-toyota-c-hr-review-photos/2018-Toyota-CHR-ILIKA-1600x1067003.jpg|\
Toyota Corolla Axio Luxel 1.8 2007 https://cache3.pakwheels.com/ad_pictures/1847/toyota-corolla-axio-1-8-luxel-2007-18474932.jpg|\
Toyota Corolla DX (E70) 1981 ⭐0.4 https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/1983_Toyota_Corolla_%28KE70%29_CS_sedan_%282015-07-03%29_01.jpg/1200px-1983_Toyota_Corolla_%28KE70%29_CS_sedan_%282015-07-03%29_01.jpg|\
Toyota Corolla E11 1.4 2000 http://ng.afrishoponline.com/wp-content/uploads/2015/06/toyota10.png|\
Toyota Corolla Sedan 2020 https://www.cstatic-images.com/stock/1170x1170/60/img1828903361-1542124681260.jpg|\
Toyota Estima Hybrid 2001 http://image.autowini.com/IMG/spec/Toyota_Estima%20Hybrid/Toyota-Estima%20Hybrid-2001.jpg|\
Toyota GR Supra 2020 ⭐2 https://t1-cms-3.images.toyota-europe.com/toyotaone/gben/header_tcm-3060-1542578.jpg|\
Toyota MR2 GT-S 1997 ⭐2 http://picture1.goo-net.com/7000903807/30171010/J/70009038073017101000200.jpg|\
Toyota Prius 2016 http://st.motortrend.com/uploads/sites/5/2015/11/2016-Toyota-Prius-Four-Touring-side-profile.jpg|\
Toyota S-FR 2015 ⭐0.4 https://i.kinja-img.com/gawker-media/image/upload/s--7ajZmTxE--/c_scale,f_auto,fl_progressive,q_80,w_800/t2xphhl6pbwchugeroxf.jpg|\
Toyota Supra RZ 1997 ⭐2 http://www.diseno-art.com/images_8/Toyota-Supra.jpg|\
Toyota Supra 1988 http://carphotos.cardomain.com/ride_images/3/76/681/25187840007_large.jpg|\
Toyota Yaris GRMN 2018 ⭐2 https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/toyota-yaris-grmn.jpg?itok=7P0d4VV_`;

module.exports.volkswagen = `Volkswagen e-Golf 2017 ⭐0.4 https://car-images.bauersecure.com/pagefiles/71992/1040x585/vw_egolf_2017_01.jpg|\
Volkswagen Golf GTI 2.0 MK4 2003 https://i.ebayimg.com/00/s/NjgzWDEwMjQ=/z/e54AAOSwZW5aOUpQ/$_86.JPG|\
Volkswagen Golf GTI MK1 1976 https://i.pinimg.com/originals/0e/23/8a/0e238a7238def7ba39ccf48773539d33.jpg|\
Volkswagen Golf GTI MK2 1992 https://www.vwgolfmk2.co.uk/cars-for-sale/wp-content/uploads/2017/05/YCVZ1671.jpg|\
Volkswagen Golf GTI MK5 2005 https://d1ix0byejyn2u7.cloudfront.net/drive/images/made/drive/images/remote/https_f2.caranddriving.com/images/used/big/vwgolfgtimkv_750_500_70.jpg|\
Volkswagen Golf GTI MK3 1991 https://d1ix0byejyn2u7.cloudfront.net/drive/images/made/drive/images/remote/https_f2.caranddriving.com/images/used/big/vwgolfgtimk3_750_500_70.jpg|\
Volkswagen Golf R32 MK4 2003 ⭐2 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/02q4/267411/2003-volkswagen-golf-r32-photo-106233-s-original.jpg|\
Volkswagen Lupo GTI 2001 https://d1ix0byejyn2u7.cloudfront.net/drive/images/made/drive/images/remote/https_f2.caranddriving.com/images/used/big/vwlupogti_750_500_70.jpg|\
Volkswagen New Beetle 2.0 2000 http://consumerguide.com/wp-content/uploads/2014/07/00606141990001.jpg|\
Volkswagen Scirocco R 2010 ⭐2 http://www.blogcdn.com/www.autoblog.com/media/2009/12/scirocco_r-nice.jpg|\
Volkswagen Scirocco S 1981 http://carphotos.cardomain.com/ride_images/3/507/2141/26266070002_large.jpg|\
Volkswagen Typ2 (T1) SambaBus 1962 ⭐0.1 http://topclassiccarsforsale.com/uploads/photoalbum/1962-vw-23-window-samba-bus-1.JPG|\
Volkswagen Up 2013 ⭐0.4 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/11q3/409394/2013-volkswagen-up-first-drive-review-car-and-driver-photo-417379-s-original.jpg`;

module.exports.volvo = `Volvo 122 S Amazon 1969 ⭐0.4 https://www.carfolio.com/images/dbimages/zgas/models/id/4784/1968_volvo_122_s.jpg|\
Volvo 240 GLT Estate 1988 ⭐0.4 https://topworldauto.com/pics/Volvo/volvo-240-glt-estate-03.jpg|\
Volvo 740 GLT 16 Valve Sedan 1988 ⭐0.4 https://images.autouncle.com/se/car_images/29e05d7d-154b-4a92-adfb-43b4b5aa6a59_volvo-740-glt-16-valve-88.jpg|\
Volvo 740 Turbo Estate 1989 https://i.pinimg.com/originals/9c/8a/c4/9c8ac4dd03bf404f48b5204c058521a6.jpg|\
Volvo C30 T5 R-Design 2010 ⭐2 https://media.autoweek.nl/m/m1cyjs7bjx8f_800.jpg|\
Volvo C70 T5 2008 ⭐2 https://dxsdcl7y7vn9x.cloudfront.net/3/1011873/17671656/1015811779.jpg|\
Volvo C70 T5 Cabriolet 2009 ⭐2 http://www.2040-cars.com/_content/cars/images/88/664788/001.jpg|\
Volvo S40 T5 R-Design 2011 ⭐2 https://i.ytimg.com/vi/F7TLhnASWNk/maxresdefault.jpg|\
Volvo S60 D5 Summum 2013 ⭐2 https://www.autokilta.fi/sites/default/files/styles/trade_in_car_xlarge/public/netwheels//VZB189_1.JPG?itok=ZV4puX_Z|\
Volvo S60 T5 Sport 2003 ⭐2 http://static.cargurus.com/images/site/2009/01/31/05/53/2003_volvo_s60_t5-pic-44083.jpeg|\
Volvo S60 T6 Polestar AWD R-Design 2013 ⭐3 https://enthusiastnetwork.s3.amazonaws.com/uploads/sites/5/2013/06/2013-Volvo-S60-T6-AWD-R-Design-front-three-quarters-in-motion.jpg?impolicy=entryimage|\
Volvo S70 R 2000 https://d1dz0t0d9nyisa.cloudfront.net/volvo-gallery/2018/03/13123524/laser_blue_volvo-v70-r-awd-1772x1200.jpg|\
Volvo V60 Polestar AWD 2017 ⭐2 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/17q1/674167/2017-volvo-v60-polestar-test-review-car-and-driver-photo-675489-s-original.jpg`;

////////////////////////////////////////////////////////////////////////////////////
module.exports.amakes = function() {
  return ['Alfa-Romeo', 'Alpine', 'BMW', 'Chevrolet', 'Dodge', 'Ford', 'Lancia', 'Lotus', 'Nissan'];
};

module.exports.alfaromeo = `Alfa Romeo 156 GTA 2002 ⭐2 https://i.pinimg.com/originals/19/6b/e1/196be123e918d24f26ecebf9b6797344.jpg|\
Alfa Romeo 4C Launch Edition 2015 ⭐2 https://s13252.pcdn.co/wp-content/uploads/2017/01/IMG_2928-1-940x627.jpg|\
Alfa Romeo 8C Competizione 2008 ⭐3 https://i.ytimg.com/vi/yPjlu97kKfg/maxresdefault.jpg|\
Alfa Romeo Brera 3.2 JTS V6 Q4 2006 https://upload.wikimedia.org/wikipedia/commons/4/4b/Alfa_Romeo_Brera_Ti_2011_%2810750450035%29.jpg|\
Alfa Romeo MiTo 1.4 T Sport 2009 https://img4.annuncicdn.it/c0/ff/c0ff6ca828bce930d2ba616db994e9aa_orig.jpg|\
Alfa Romeo MiTo Quadrifoglio Verde 2010 https://img.favcars.com/alfa-romeo/mito/wallpapers_alfa-romeo_mito_2010_5.jpg|\
Alfa Romeo Spider 1600 Duetto 1966 ⭐0.3 https://hymanltd.com/wp-content/uploads/2015/07/5520-1.jpg|\
Alfa Romeo TZ3 Stradale Zagato 2011 ⭐3 https://hips.hearstapps.com/roa.h-cdn.co/assets/cm/14/47/1280x782/546b710e527bc_-_zagato-alfa-romeo-tz3-stradale-lg.jpg|\
Alfa Romeo 4C Gr.3 Road Car 🔧2.5 https://vignette.wikia.nocookie.net/gran-turismo/images/5/5f/Alfa_Romeo_4C_Gr.3_Road_Car.jpg|\
Alfa Romeo 4C Gr.4 2014 <:gt4:698962765095632967> https://vignette.wikia.nocookie.net/gran-turismo/images/2/23/Alfa_Romeo_4C_Gr.4.jpg/revision/latest?cb=20171011095815|\
Alfa Romeo 4C Gr.3 2014 <:gt3:698962765443891280> https://i.ytimg.com/vi/spREBFUGlz0/maxresdefault.jpg`;

module.exports.alpine = [
  'Alpine A110 1600S 1972 ' + 'https://www.sportscarmarket.com/wp-content/uploads/2016/06/1971-alpine-a110-1600s-coupe-pass-front.jpg',
  'Alpine A110 Première Édition 2017 ⭐2 ' + 'http://www.hdwallpapers.in/walls/2017_alpine_a110_premiere_edition_4k-HD.jpg',
  'Alpine A108 1958 ⭐0.3 ' + 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Alpine_108_02.jpg/800px-Alpine_108_02.jpg',
  'Alpine A106 Mille Milles 1956 ⭐0.3 ' + 'https://i.pinimg.com/originals/bd/9d/53/bd9d53eb0aa807b536649966201108fa.jpg',
  'Alpine A310 V6 GT Pack 1982 ' + 'http://www.rsiauto.fr/images/ALPINE/A310-V6-Pack-GT/A310-V6-Pack-GT-1.jpg',
  'Alpine GTA V6 Turbo Le Mans 1990 ' + 'https://img.favcars.com/alpine/gta/alpine_gta_1990_photos_1_b.jpg',
];

module.exports.bmw = `BMW Z8 2001 ⭐2 https://cdn.bringatrailer.com/wp-content/uploads/2018/01/5a69148c6d14e_15161338087dff9f98764daZ89-940x541.jpg|\
BMW 1M Coupe 2011 ⭐2 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/11q2/395918/2011-bmw-1-series-m-coupe-test-review-car-and-driver-photo-396361-s-original.jpg|\
BMW 2002 Turbo 1973 https://s1.cdn.autoevolution.com/images/gallery/BMW-2002-Turbo-1643_19.jpg|\
BMW 228i 2014 ⭐2 http://www.autoguide.com/images/content/2014-BMW-228i-Main.jpg|\
BMW 318is Coupé 1993 http://www.2carpros.com/forum/automotive_pictures/206424_misce36photos06_1.jpg|\
BMW 3200 CS 1965 ⭐0.2 http://cartype.com/pics/9176/full/bmw_3200_cs_bertone_3_65.jpg|\
BMW 320si 2006 http://www.e90post.com/forums/attachment.php?attachmentid=634155&stc=1&d=1327172944|\
BMW 323i 1981 http://www.classiccarshq.co.uk/wp-content/uploads/2014/12/BMW-19.jpg|\
BMW 325TDS 1994 http://a403.idata.over-blog.com/2/28/46/03/BMW-325-tds.jpg|\
BMW 328i E36 Coupé 1995 https://i0.wp.com/blog.srpneus.com.br/wp-content/uploads/1998-BMW-328i.jpg?resize=1280%2C640|\
BMW 330i 2018 https://www.thrustzone.com/wp-content/uploads/2018/05/2018-BMW-330i-Petrol-Review-4.jpg|\
BMW 330i Sedan 2003 https://static1.squarespace.com/static/508013f5e4b0f60e9fd33fd4/t/5081b1b1e4b0ca69423a6ad9/1350676914435/P6021354+%28800x375%29.jpg|\
BMW 540i M Sport 2003 ⭐2 https://s13252.pcdn.co/wp-content/uploads/2017/03/58d00afdd5170_FullSizeRender_3-1-940x675.jpg|\
BMW Isetta 600 1958 ⭐0.2 https://www.classicdriver.com/sites/default/files/styles/two_third_slider/public/cars_images/dsc_3329.jpg?itok=K60JxFNd|\
BMW M1 1981 ⭐2.5 http://st.automobilemag.com/uploads/sites/11/2011/07/1978-1981-bmw-m1-front-left-view-parked.jpg|\
BMW M3 1991 https://media.ed.edmunds-media.com/bmw/m3/1991/oem/1991_bmw_m3_coupe_base_fq_oem_1_500.jpg|\
BMW M3 Coupe 2007 ⭐2.5 https://vms.atcdn.co.uk/media/804f52f27a7e483dacee97fc1cea407f?width=900|\
BMW M3 Sedan 2010 ⭐2.5 https://autoworld.files.wordpress.com/2008/05/bmw-2010-m3-sedan-facelift-img_1.jpg|\
BMW M3 Sedan 2014 ⭐2 https://i.ytimg.com/vi/k5uWIOwd_cw/maxresdefault.jpg|\
BMW M3 Sport Evolution 1989 ⭐2 http://www.topcarrating.com/bmw/1989-bmw-m3-sport-evolution-e30.jpg|\
BMW M4 Coupé 2014 ⭐2.5 https://www.carmagazine.co.uk/Images/upload/32335/images/0004f0e2126c-8e36-43ba-9.jpg|\
BMW M4 Gr.4 2014 <:gt4:698962765095632967> https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8q_dJKMTowDhLPibdC3ITn0xmGPPHdmO0DYCYFZo0BexUJu8d|\
BMW M6 GT3 (Walkenhorst Motorsport) 2016 <:gt3:698962765443891280> https://farm1.static.flickr.com/835/40845249744_95993ef14c.jpg`;

module.exports.chevy = [
  'Chevrolet Corvette C8 Stingray 2020 ⭐3 ' + 'https://cnet2.cbsistatic.com/img/HDYsVHjZkMCR4qLkbPsh541SPq8=/1092x0/2019/07/19/cc0fb7e1-b6f5-4672-bbea-20242e836b09/2020-chevrolet-c8-corvette-006.jpg',
  'Chevrolet Astra Advantage 2.0 8V 2010 ' + 'http://nxmotors.com.br/media/c:fullcentered/w:1200/a/1/3/acfcf93108bb9a8fa620f9057d480.jpg',
  'Chevrolet Astra GLS 2.0 MPFi 1995 ' + 'https://img.olx.com.br/images/58/580807004550375.jpg',
  'Chevrolet Avalanche 2013 ⭐0.3 ' + 'https://media.ed.edmunds-media.com/chevrolet/black-diamond-avalanche/2013/oem/2013_chevrolet_black-diamond-avalanche_crew-cab-pickup_ltz_fq_oem_1_1280.jpg',
  'Chevrolet Blazer 1992 ' + 'https://static.cargurus.com/images/site/2008/06/11/11/38/1992_chevrolet_blazer-pic-616-1600x1200.jpeg',
  'Chevrolet C10 Cheyenne Super 1972 ⭐0.3 ' + 'https://s13252.pcdn.co/wp-content/uploads/2015/04/1972-Chevrolet-Cheyenne-Engine-Front-940x636.jpg',
  'Chevrolet Camaro SS 35th Anniversary 2002 ⭐2 ' + 'https://www.supercars.net/blog/wp-content/uploads/2016/03/10242241.jpg',
  'Chevrolet Camaro SS 2014 ⭐2.5 ' + 'http://st.motortrend.com/uploads/sites/10/2015/09/2014-Chevrolet-Camaro-SS-Passenger-Front-Three-Quarters.jpg',
  'Chevrolet Camaro SS 2016 ⭐2.5 ' + 'https://media.discordapp.net/attachments/306637248219185154/471867696200417290/2016-Chevrolet-Camaro-SS-front-three-quarter-in-motion-06.png?width=400&height=266',
  'Chevrolet Camaro Z28 2014 ⭐2 ' + 'http://st.automobilemag.com/uploads/sites/11/2014/03/2014-Chevrolet-Camaro-Z28-front-three-quarters-view.jpg',
  'Chevrolet Camaro Z28 1970 ' + 'https://ccmarketplace.azureedge.net/cc-temp/listing/101/3350/9263884-1970-chevrolet-camaro-z28-thumb-c.jpg',
  'Chevrolet Camaro ZL1 2012 ⭐2.5 ' + 'http://www.blogcdn.com/www.autoblog.com/media/2012/01/01-2012-chevrolet-camaro-zl1-fd.jpg',
  'Chevrolet Camaro ZL1 1LE 2018 ⭐3 ' + 'https://icdn2.digitaltrends.com/image/2018-chevrolet-camaro-zl1-1le-640x427-c.jpg?ver=1',
  'Chevrolet Caprice LS 1989 ⭐0.3 ' + 'https://static.cargurus.com/images/site/2011/11/05/21/55/1989_chevrolet_caprice-pic-5959612249521642967-1600x1200.jpeg',
  'Chevrolet Chevelle SS 396 1967 ' + 'https://dealeraccelerate-all.s3.amazonaws.com/smt/images/5/6/2/562/9078_e94d112b6d_low_res.jpg',
  'Chevrolet Chevelle SS 454 LS6 1970 ⭐2 ' + 'http://autocarhd.com/wp-content/uploads/1970-Chevelle-Ss-454-Ls624.jpg',
  'Chevrolet Cobalt SS Supercharged 2005 ⭐2 ' + 'https://media.ed.edmunds-media.com/chevrolet/cobalt/2005/oem/2005_chevrolet_cobalt_coupe_ss-supercharged_fq_oem_2_500.jpg',
  'Chevrolet Corvette C1 1958 ⭐0.3 ' + 'https://www.corvsport.com/wp-content/uploads/2017/01/chevrolet-corvette-c1-1958-vray.jpg',
  'Chevrolet Corvette C2 Stingray Z06 1963 ' + 'https://i.pinimg.com/originals/59/38/43/593843633f2026ed43d43ed5c2c5e374.jpg',
  'Chevrolet Corvette C3 427 V8 Convertible 1968 ' + 'https://img.pistonheads.com/Fullsize/chevrolet/corvette/chevrolet-corvette-S3583247-1.jpg',
  'Chevrolet Corvette C3 Stingray Coupe 1972 ' + 'https://static.cargurus.com/images/site/2008/06/04/02/28/1972_chevrolet_corvette_coupe-pic-40899-640x480.jpeg',
  'Chevrolet Corvette C4 1983 ' + 'https://s1.cdn.autoevolution.com/images/gallery/CHEVROLETC4Coupe-1857_1.jpg',
  'Chevrolet Corvette C5 Z06 2001 ⭐2.5 ' + 'http://media.fastestlaps.com/mm1npls5f5u3',
  'Chevrolet Corvette C6 Z06 2006 ⭐3 ' + 'https://i.pinimg.com/originals/81/90/94/8190945b183baaff0ba68635f0f3666a.jpg',
  'Chevrolet Corvette C6 ZR1 2009 ⭐3 ' + 'https://www.corvsport.com/wp-content/uploads/2017/03/2009-chevrolet-corvette-zr1-blue-devil-restoration-05.jpg',
  'Chevrolet Corvette C7 Stingray 2014 ⭐3 ' + 'https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/13q1/494260/2014-chevrolet-c7-corvette-stingray-z51-photos-and-info-news-car-and-driver-photo-495546-s-original.jpg',
  'Chevrolet Cruze RS 2013 ' + 'https://media.ed.edmunds-media.com/chevrolet/cruze/2013/oem/2013_chevrolet_cruze_sedan_ltz_fq_oem_1_1280.jpg',
  'Chevrolet Fleetline 1947 ⭐0.3 ' + 'https://i.pinimg.com/originals/8d/b9/7e/8db97e72c317bb9ff4ff981a83a36df6.jpg',
  'Chevrolet Fleetline Roadster 1947 ⭐0.3 ' + 'http://ipocars.com/imgs/a/h/h/p/s/chevrolet__fleetmaster_convertibile_1947_1_lgw.jpg',
  'Chevrolet Impala 454 cid 1972 ' + 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Chevrolet_Impala_1972_%2814106775621%29.jpg/800px-Chevrolet_Impala_1972_%2814106775621%29.jpg',
  'Chevrolet Impala Bubble Top 409 1962 ' + 'http://oldcarandtruckpictures.com/Chevrolet/1962_Chevy_Bel_Air_409_Bubble-Top.JPG',
  'Chevrolet Impala Supernatural 1967 ' + 'http://thenewswheel.com/wp-content/uploads/2016/01/1967-Chevy-Impala-Supernatural-760x459.png',
  'Chevrolet Silverado SS 2003 ' + 'https://media.ed.edmunds-media.com/chevrolet/silverado-1500/2003/oem/2003_chevrolet_silverado-1500_extended-cab-pickup_ss_fq_oem_2_500.jpg',
  'Chevrolet Sonic RS 2013 ' + 'https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/11q4/424154/2013-chevrolet-sonic-rs-news-car-and-driver-photo-434370-s-original.jpg',
  'Chevrolet Spark 1.2 LT 2011 ⭐0.3 ' + 'https://i.ebayimg.com/00/s/NTc2WDEwMjQ=/z/AD0AAOSwiONYOe2H/$_86.JPG',
  'Chevrolet Styleline Deluxe Sport Coupe 1949 ⭐0.3 ' + 'https://s3.amazonaws.com/images.hagerty.com/vehicle/web/MecumAuctionsIndianapolis%202017_T172_Chevrolet_1949_Styleline%20Deluxe_2-Dr.%20Sedan_6GKG56028_Overall.jpg',
  'Chevrolet Super Sport 2014 ⭐2 ' + 'http://st.motortrend.com/uploads/sites/5/2013/02/2014-Chevrolet-SS-Daytona1.jpg',
  'Chevrolet WA (Military 4x4 Truck) 1942 ⭐0.3 ' + 'https://farm8.staticflickr.com/7286/27686249573_7c46b31407_b.jpg',
  'Chevrolet Corvette C7 Gr.3 Road Car 🔧2.5 ' + 'http://www.kudosprime.com/gts/images/cars/gts_car_159.jpg?v=1',
  'Chevrolet Corvette C7 Gr.4 ' + '<:gt4:698962765095632967> ' + 'https://vignette.wikia.nocookie.net/gran-turismo/images/a/a5/Chevrolet_Corvette_C7_Gr.4.jpg/revision/latest?cb=20171011073100',
];

module.exports.dodge = `Dodge Challenger R/T 1970 https://ccmarketplace.azureedge.net/cc-temp/listing/103/311/9809467-1970-dodge-challenger-r-t-thumb-c.jpg|\
Dodge Challenger SRT-10 2010 ⭐2.5 https://media.discordapp.net/attachments/306637248219185154/477275433813934092/2010DodgeChallengerSRT8BeautyLeft001small.png?width=400&height=274|\
Dodge Challenger SRT Demon 2018 ⭐3 https://i.kinja-img.com/gawker-media/image/upload/s--ea4lwwDG--/c_scale,f_auto,fl_progressive,q_80,w_800/jimxbwg8trfbwoofvocl.jpg|\
Dodge Challenger SRT Hellcat 2015 ⭐3 http://st.motortrend.com/uploads/sites/5/2014/07/2015-Dodge-Challenger-SRT-Hellcat-side-view-with-reflection.jpg|\
Dodge Charger Daytona HEMI 1969 http://www.musclecarszone.com/wp-content/uploads/2013/07/1969-Dodge-Charger-Daytona-Hemi.jpg|\
Dodge Charger R/T 1969 https://i.pinimg.com/originals/e4/ee/6e/e4ee6ee48cfaf69ba605dd23f2aa8b74.jpg|\
Dodge Charger R/T General Lee 1969 🔧1 https://i.ytimg.com/vi/MwaQi3QghmQ/maxresdefault.jpg|\
Dodge Charger SRT-8 2006 ⭐2 https://image.cpsimg.com/sites/carparts-mc/assets/roadtests/dodgechargersrt8/images/rightfront.jpg|\
Dodge Charger SRT Hellcat 2015 ⭐3 http://lovedodge.com/wp-content/uploads/2017/06/2015-dodge-charger-srt-hellcat-the-most-powerful-sedan-in-the-world-ignition-ep-122-within-zip-97620-adel-or.jpg|\
Dodge Coronet 426 HEMI 1965 http://www.imcdb.org/i781402.jpg|\
Dodge Coronet 440 1966 https://i.pinimg.com/originals/7a/e3/21/7ae3217e1c8bbc5d32ce08d79ceade5c.jpg|\
Dodge D100 383 Pickup 1965 ⭐0.3 https://cdn3.mecum.com/auctions/ch1015/ch1015-223939/images/ch1015-223939_1.jpg?1444259762000|\
Dodge Dart GT 2014 http://www.thetruthaboutcars.com/wp-content/uploads/2014/06/IMG_0339.jpg|\
Dodge Dart SXT Rallye 2014 http://doubleclutch.ca/wp-content/uploads/2014/06/DSC_62681.jpg|\
Dodge Neon SRT-4 2003 https://static.cargurus.com/images/site/2008/07/07/15/14/2003_dodge_neon_srt-4_4_dr_turbo_sedan-pic-26166-640x480.jpeg|\
Dodge Ram 1500 Pickup North Edition 2019 ⭐0.3 https://www.torquenews.com/sites/default/files/images/ram_1500_north_snow_oosdx.jpg|\
Dodge Ram 1500 Rumble Bee 2004 ⭐0.3 https://imganuncios.mitula.net/dodge_ram_2004_2004_dodge_ram_1500_rumble_bee_5170003507135871655.jpg|\
Dodge Ram 2500 Laramie Longhorn Mega Cab 2013 ⭐0.3 https://i.ytimg.com/vi/qzRyhZd7lbE/maxresdefault.jpg|\
Dodge Ram 3500 Laramie Longhorn Dually 2015 ⭐0.3 http://pictures.dealer.com/k/kernersvillechryslerdodgecllc/0951/b41579473f7e12d063847e5f1e876466x.jpg|\
Dodge Ram SRT10 2005 https://cdn.bringatrailer.com/wp-content/uploads/2017/08/DSC08901-940x629.jpg|\
Dodge Ram W250 1993 ⭐0.3 https://dealeraccelerate-all.s3.amazonaws.com/ag/images/3/6/4/1/3641/304877_e2d9f49c06db_low_res.jpg|\
Dodge Viper SRT-10 ACR-X 2010 ⭐3 http://www.automotiveaddicts.com/wp-content/uploads/2009/12/dodge-viper-srt10-acr-x.jpg|\
Dodge Stealth R/T Turbo 1996 ⭐2 http://www.2040-cars.com/_content/cars/images/37/62437/001.jpg|\
Dodge Viper ACR 2016 ⭐3 http://st.motortrend.com/uploads/sites/10/2015/09/2016-Dodge-Viper-ACR-front-three-quarter-in-studio-02.jpg|\
Dodge Viper Competition Coupe 2003 ⭐3 https://www.ultimatecarpage.com/images/mediums/7197.jpg|\
Dodge Viper GTS 2013 ⭐3 https://hips.hearstapps.com/roa.h-cdn.co/assets/cm/14/47/546b77152c3d0_-_2013-srt-viper-lg.jpg|\
Dodge Viper GTS ACR 2000 ⭐3 https://cdn1.mecum.com/auctions/da0917/da0917-293801/images/da0917-293801_1.jpg?1503417396000|\
Dodge Viper GTS Final Edition 2002 ⭐3 https://cdn1.mecum.com/auctions/fl0116/fl0116-235229/images/fl0116-235229_12@2x.jpg?1447891404000|\
Dodge Viper SRT-10 2003 ⭐3 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/02q4/267343/dodge-viper-srt-10-photo-6196-s-original.jpg|\
Dodge Viper SRT-10 ACR 2008 ⭐3 http://st.motortrend.com/uploads/sites/5/2007/11/112_0711_18z-2008_dodge_viper_SRT10_ACR-front_view.jpg|\
Dodge Viper SRT-10 Coupe 2006 ⭐3 https://s.aolcdn.com/commerce/autodata/images/60DDGEC1.jpg|\
Dodge Viper Gr.4 2013 <:gt4:698962765095632967> https://i.ytimg.com/vi/pL9kCn3_OiY/maxresdefault.jpg`;

module.exports.ford = `Ford Mustang Mach 1 351 1971 https://car-from-uk.com/ebay/carphotos/full/ebay430047.jpg|\
Ford Mustang Premium V6 Performance Package 2014 http://st.motortrend.com/uploads/sites/5/2013/12/2014-Ford-Mustang-V6-front-view-in-motion-011.jpg|\
Ford Mustang Shelby GT500 2020 ⭐3 https://i.ytimg.com/vi/zqz6QQl4mAw/maxresdefault.jpg|\
Ford Mustang Shelby GT350R 2016 ⭐2.5 http://carsintrend.com/wp-content/uploads/2015/09/2016ShelbyGT350R_1.jpg|\
Ford Mustang Shelby GT500 1967 http://ford-mustang-shelby-gt.com/wp-content/uploads/2016/09/7-950x631.jpg|\
Ford Crown Victoria 2007 http://static.cargurus.com/images/site/2008/03/27/14/09/2007_ford_crown_victoria-pic-35173.jpeg|\
Ford Deluxe Business Coupe 1940 ⭐0.1 https://images1.americanlisted.com/nlarge/1940-ford-deluxe-business-coupe-for-sale-nc-39-500-americanlisted_36356121.jpg|\
Ford Escort RS Cosworth 1992 https://www.supercars.net/blog/wp-content/uploads/2016/04/1992_Ford_escortrscosworth4.jpg|\
Ford Escort RS Turbo MK2 1987 http://img.pistonheads.com.s3-eu-west-1.amazonaws.com/LargeSize/ford/escort/rs-turbo/ford-escort-rs-turbo-196588303-3.jpg|\
Ford F-150 SVT Raptor 2011 ⭐0.3 https://media.discordapp.net/attachments/306637248219185154/481652278500130817/6a00d83451b3c669e201543381cf89970c-800wi.png?width=400&height=250|\
Ford Focus RS 2009 ⭐2 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/09q3/267589/2009-ford-focus-rs-review-car-and-driver-photo-271811-s-original.jpg|\
Ford Focus RS500 2010 ⭐2 http://st.motortrend.com/uploads/sites/5/2010/06/ford-focus-RS-500-front-view-2.jpg|\
Ford Focus ST 2015 https://media.discordapp.net/attachments/306637248219185154/447594082366259231/FordFocusST2.png?width=650&height=425|\
Ford GT 2006 ⭐3 http://3dprint.com/wp-content/uploads/2015/08/gt.png|\
Ford GT40 MK1 1966 ⭐3 http://cdn.hiconsumption.com/wp-content/uploads/2016/06/Auction-Block-1966-Ford-GT40-MK-1-9.jpg|\
Ford Granada MK1 1973 ⭐0.3 https://media.discordapp.net/attachments/306637248219185154/463868440969740298/1fe2648ccb0c91459ec07b3d2eae0902--ford-granada-wagon.png?width=400&height=300|\
Ford Mustang GT Premium Fastback 2015 ⭐2 http://www.nada.com/b2b/Portals/0/SunBlogNuke/Temp/9899a1f1-a904-458e-90b0-bd6ffbbd3772/2015%20Ford%20Mustang%20GT.jpg|\
Ford Mustang GT V6 2011 http://www.thedetroitbureau.com/wp-content/uploads/2010/03/2011-Mustang.jpg|\
Ford Mustang Gr.3 Road Car 🔧2.5 https://www.gtplanet.net/wp-content/uploads/2017/11/Gran-Turismo-Sport-Mustang-Gr3-alxndrustinov-860x484.jpg|\
Ford F-150 Shelby Super Snake 2008 ⭐2 http://www.blogcdn.com/www.autoblog.com/media/2009/11/f150supersnake_03_opt.jpg|\
Ford F-150 XLT 1992 ⭐0.3 http://www.used-carlots.com/am/listings/images/84_1.jpg|\
Ford F-350 1964 ⭐0.1 https://assets.hemmings.com/uimage/66821657-770-0@2X.jpg?rev=1|\
Ford Fairlane Thunderbolt 427 1964 http://motorbase.s3.amazonaws.com/pictures/contributions/990720/std_1964_ford_fairlane_thunderbolt_427.jpg|\
Ford Fiesta ST 2014 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/13q1/494258/2014-ford-fiesta-st-hatchback-first-drive-review-car-and-driver-photo-506852-s-original.jpg|\
Ford GT 2016 ⭐4 http://johndagys.wpengine.netdna-cdn.com/wp-content/gallery/gt-2016-ford-gt-unveil-2/Ford_Detroit_2015_NAS_0932.jpg|\
Ford Flex Limited 2010 ⭐0.3 https://media.discordapp.net/attachments/306637248219185154/449384536586059776/unknown.png?width=400&height=225|\
Ford Mustang Gr.4 2015 <:gt4:698962765095632967> https://i.ytimg.com/vi/ge0lgVfUka0/maxresdefault.jpg`;

module.exports.lancia = `Lancia Delta HF Integrale 16V 1989 http://www.topcarrating.com/lancia/1987-lancia-delta-hf-integrale-16v-831.jpg|\
Lancia 037 Stradale 1982 https://images2.bonhams.com/image?src=Images/live/2017-11/23/24712656-1-39.jpg&width=640&height=480&autosizefit=1|\
Lancia Delta HF Integrale Evoluzione 1991 http://img.auto.cz/news/img/art/2015-27/620_559669b82b6ec.jpg|\
Lancia Stratos HF Stradale 1974 https://pictures.topspeed.com/IMG/crop/201809/lancia-stratos-hf-st-5_800x0w.jpg|\
Lancia Ypsilon 2012 ⭐0.3 https://images.honestjohn.co.uk/imagecache/file/fit/730x700/media/4330829/Chrysler~Ypsilon~(7).jpg|\
Lancia Kappa 2.0 Turbo LS 1995 https://www.automobile-catalog.com/img/pictonorzw/lancia/2-3-203.jpg`;

module.exports.lotus = `Lotus Elise 2005 https://s13252.pcdn.co/wp-content/uploads/2017/06/Screen-Shot-2017-06-13-at-12.37.06-PM-940x663.png|\
Lotus Elise 1996 http://www.classicandperformancecar.com/uploads/cms_article/5001_5100/lotus-elise-mk1-mk2-buying-guide-and-review-1996-present-5045_13011_640X470.jpg|\
Lotus Elise 111R 2004 http://media.fastestlaps.com/ptamnt8oc9z0/640x350m|\
Lotus Elise 111S 2003 http://www.imcdb.org/i075641.jpg|\
Lotus Elise Sport 190 1998 https://images-ext-2.discordapp.net/external/n8_Yj0wnAIoZ2_k1rjzAUJo3J4UGVVcjbm3mG1sjsgg/https/dealeraccelerate-all.s3.amazonaws.com/scd/images/6/6/2522c640314_low_res_1998-lotus-elise-sport-190.jpg?width=612&height=409|\
Lotus Elise Type 72 2001 https://www.supercars.net/blog/wp-content/uploads/2016/04/2002_Lotus_EliseType721.jpg|\
Lotus Evora S 2011 ⭐2 http://latimesblogs.latimes.com/.a/6a00d8341c630a53ef01538f30746e970b-800wi|\
Lotus Exige Cup 430 (Type 49) 2018 ⭐2.5 https://motoring.pxcrush.net/motoring/general/editorial/exige-i-jlq2.jpg?width=640|\
Lotus Exige Cup 430 (Type 79) 2018 ⭐2.5 https://www.conceptcarz.com/images/Lotus/Lotus-exige-type-79-image-07-800.jpg|\
Lotus Exige S 2007 ⭐2 https://cdn.bringatrailer.com/wp-content/uploads/2016/04/Screen-Shot-2017-03-13-at-3.03.58-PM-940x714.png|\
Lotus Exige S 2013 ⭐2 http://image.superstreetonline.com/f/39027170+w+h+q80+re0+cr1/epcp-1210-01%2B2013-lotus-exige-s%2Bcover.jpg|\
Lotus Exige S Roadster 2013 ⭐2 https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/exige-s-roadster.jpg?itok=uPQxTtZD`;

module.exports.nissan = [
  'Nissan 240SX (S13) 1994 ' + 'http://consumerguide.com/wp-content/uploads/2014/07/92809071990112.jpg',
  'Nissan 370Z Nismo 2015 ⭐2 ' + 'https://www.torquenews.com/sites/default/files/image-1080/2015_370z_nismo_-_1-600_0.jpg',
  'Nissan Bluebird 1600 Deluxe 1969 ⭐0.3 ' + 'https://www.nissan-global.com/EN/HERITAGE/img/modelDetail/054/image01.jpg',
  'Nissan Fairlady 300ZX Turbo (Z31) 1983 ⭐2 ' + 'http://www.topcarrating.com/nissan/1983-nissan-fairlady-300zx-turbo-z31-3.jpg',
  'Nissan GT-R Nismo 2014 ⭐3 ' + 'https://www.carmagazine.co.uk/Images/upload/31702/images/02NISSANGTRNISMOCARREVIEW.jpg',
  'Nissan GT-R Nismo 2017 ⭐3 ' + 'https://icdn7.digitaltrends.com/image/embargoed-until-52716-7amet-2017-gt-r-nismo-12-640x427-c.jpg?ver=1',
  'Nissan GT-R Premium Edition 2017 ⭐3 ' + 'http://www.latimes.com/resizer/L2-j4OqGruqQYggKLJJrsVk0KeI=/1400x0/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/7ZZWP5ZTGFAVXMVGD7DIBTWUPY.jpg',
  'Nissan GT-R Spec-V 2009 ⭐3 ' + 'https://media.discordapp.net/attachments/306637248219185154/463864028070936578/02_nissan_gt-r_specv_opt.png?width=400&height=225',
  'Nissan Juke Nismo 2014 ⭐2 ' + 'https://hips.hearstapps.com/roa.h-cdn.co/assets/cm/14/47/546b3bf3b688d_-_0012014nismojukers-lg.jpg',
  'Nissan Juke-R 2012 ⭐2 ' + 'https://i.pinimg.com/originals/e5/09/b3/e509b32a1d488d847f5121aa22fb3134.jpg',
  'Nissan Leaf 2018 ⭐0.3 ' + 'https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/nissan-leaf.jpg',
  'Nissan Leaf G 2011 ⭐0.3 ' + 'https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/11q2/395918/2011-nissan-leaf-sl-long-term-road-test-review-car-and-driver-photo-402468-s-original.jpg',
  'Nissan Skyline R32 GT-R V-Spec II 1994 ⭐2 ' + 'https://s1.cdn.autoevolution.com/images/gallery/NISSAN-Skyline-GT-R-V-Spec--R32--4037_3.jpg',
  'Nissan Skyline R33 GT-R V-Spec 1997 ⭐2 ' + 'https://s1.cdn.autoevolution.com/images/gallery/NISSANSkylineGT-RV-Spec-R33--4039_1.jpg',
  'Nissan Skyline R34 GT-R Nismo Z-Tune 2003 ⭐3 ' + 'https://farm9.staticflickr.com/8492/8306955200_cbc2e9e7a0_b.jpg',
  'Nissan GT-R Gr.4 2016 ' + '<:gt4:698962765095632967>' + ' https://i.ytimg.com/vi/BmMcFpYeIGw/maxresdefault.jpg',
  'Nissan GT-R NISMO GT3 N24 (Schulze Motorsport) 2013 <:gt3:698962765443891280> ' + 'https://cdn-8.motorsport.com/static/img/mgl/1700000/1710000/1719000/1719400/1719428/s8/endurance-24-hours-of-the-n-rburgring-2014-24-schulze-motorsport-nissan-gt-r-nismo-gt3-ka.jpg',
];

///////////////////////////////////////

module.exports.icmakes = function() {
  return ['Aston-Martin', 'Audi', 'Caterham', 'De-Tomaso', 'FordUK', 'Ginetta', 'Holden', 'Jaguar', 'Lexus', 'Lincoln', 'Maserati', 'Mercedes-Benz'];
};

module.exports.astonmartin = `Aston Martin Cygnet V8 2018 ⭐1.5 https://www.topgear.com/sites/default/files/styles/16x9_1280w/public/images/news-article/2018/07/4813e5549a8a6c6187a6420bcfce678a/26356-1.jpg?itok=o2Q4qLPk|\
Aston Martin DB10 2015 ⭐3 https://pictures.topspeed.com/IMG/jpg/201510/2015-aston-martin-db10-2.jpg|\
Aston Martin DB11 2016 ⭐2 http://www.thesupercarblog.com/wp-content/uploads/2016/02/Aston-Martin-DB11-2016-Geneva-Motor-Show-1-1024x576.jpg|\
Aston Martin One-77 2011 ⭐3.5 https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Aston_Martin_One-77_-_Flickr_-_skinnylawyer.jpg/1200px-Aston_Martin_One-77_-_Flickr_-_skinnylawyer.jpg|\
Aston Martin V8 Vantage S 2015 ⭐3 https://media.ed.edmunds-media.com/aston-martin/v12-vantage-s/2015/oem/2015_aston-martin_v12-vantage-s_coupe_base_fq_oem_2_1280.jpg|\
Aston Martin Vulcan 2016 ⭐3.5 https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/2015_Aston_Martin_Vulcan_%2820036637176%29.jpg/1200px-2015_Aston_Martin_Vulcan_%2820036637176%29.jpg|\
Aston Martin DBS Superleggara 2019 ⭐3 https://hothardware.com/ContentImages/NewsItem/44907/content/small_aston_martin_dbs_superleggera_5.jpg|\
Aston Martin Vantage Gr.4 2015 <:gt4:698962765095632967> https://www.granturismo-club.com/images/GT-sport/Voitures/Big/14.jpg`;

module.exports.audi = [
  'Audi 100 S4 Sedan 1994 ' + 'http://i.wheelsage.org/pictures/audi/s4/autowp.ru_audi_s4_sedan_31.jpg',
  'Audi 80 B1 1972 ⭐0.5 ' + 'https://www.speeddoctor.net/media/2012/05/Audi-80-B1_01.jpg',
  'Audi A1 Clubsport quattro 2010 ⭐1.5 ' + 'https://uncrate.com/assets_c/2011/06/audi-a1-clubsport-xl-thumb-960xauto-13890.jpg',
  'Audi A4 3.0 quattro 2016 ⭐1.5 ' + 'https://s1.cdn.autoevolution.com/images/testdrive2_chapters/audi-a4-30-tdi-quattro-review-2016-1.jpg',
  'Audi R8 4.2 FSI R tronic 2007 ⭐2 ' + 'http://www.motorstown.com/images/audi-r8-4.2-fsi-quattro-r-tronic-04.jpg',
  'Audi R8 5.2 FSI quattro 2009 ⭐3 ' + 'https://cdn.motor1.com/images/mgl/ymp6b/s3/2009-160134-audi-r8-v10-5-2-fsi-quattro-2009-naias1.jpg',
  'Audi R8 GT Spyder 2012 ⭐3 ' + 'https://parkers-images.bauersecure.com/pagefiles/192354/cut-out/600x400/audi_r8_gts.jpg',
  'Audi R8 Sport Performance Parts Edition 2019 🔧3 ' + 'https://pictures.topspeed.com/IMG/crop/201807/audi-sport-performan-4_1600x0w.jpg',
  'Audi TT RS Coupé 2010 ⭐1.5 ' + 'https://s1.cdn.autoevolution.com/images/gallery/AUDI-TT-RS-Coupe-4073_2.jpg',
  'Audi TT RS Roadster 2010 ⭐1.5 ' + 'http://www.hdcarwallpapers.com/walls/2010_audi_tt_rs_roadster_4-wide.jpg',
  'Audi TTS Coupe 2014 ' + 'http://st.motortrend.com/uploads/sites/10/2015/09/2014-audi-TT-coupe-three-quarters-view-2.jpg',
  'Audi quattro 1982 ⭐1.5 ' + 'https://enthusiastnetwork.s3.amazonaws.com/uploads/sites/5/2006/08/c12_0509_audiquattro09_z.jpg?impolicy=modalgallery',
  'Audi R8 LMS 2009 ' + '<:gt3:698962765443891280> ' + 'https://i.pinimg.com/originals/04/93/9a/04939a41e02168692419941c3d633936.jpg',
  'Audi R18 (Audi Sport Team Joest) 2016 ' + '<:gt1:700234313345663026> ' + 'https://cdn-7.motorsport.com/images/mgl/2yD7Onn0/s8/wec-march-official-test-2016-7-audi-sport-team-joest-audi-r18-marcel-fassler-andre-lottere.jpg',
  'Audi R18 TDI (Audi Sport Team Joest) 2011 ' + '<:gt1:700234313345663026> ' + 'https://s34.wheelsage.org/format/picture/picture-preview-large/audi/r18_tdi/autowp.ru_audi_r18_tdi_28.jpg',
];

module.exports.caterham = `Caterham Seven 420R 2016 https://www.dubicars.com/images/62bf5a/w_1200x630/morgan-motors-dubai/f229041b-5537-488e-b53d-e23b1c3b1aaf.jpg|\
Caterham Seven Fireblade 2002 ⭐1.5 http://3.bp.blogspot.com/-OFcUFDiWnLw/Tpn08ZG6c0I/AAAAAAAAEGI/u1vJcFXYKqU/s1600/2498231010084989876wyPVDp_ph.jpg|\
Caterham Super 7 Superlight R500 2003 ⭐1.5 https://www.innermobil.com/wp-content/uploads/2016/01/Caterham-Seven-Superlight-R500-2001-Design-Car-Exterior-Interior-1.jpg|\
Caterham Super Seven R500R 2002 ⭐1.5 https://i.pinimg.com/736x/83/15/c1/8315c1c5ecce1724976b49c0a8dd2b61--premium-cars-car-garage.jpg|\
Caterham Superlight R500 2013 ⭐1.5 https://car-images.bauersecure.com/upload/32712/images/000051725d74-6eab-4d76-a.jpg|\
Caterham Superlight R600 2013 ⭐1.5 http://cdn1.evo.co.uk/sites/evo/files/styles/gallery_adv/public/images/dir_1102/car_photo_551347.jpg?itok=-G8T8OiB|\
Caterham Supersport R 2013 http://uk.caterhamcars.com/sites/default/files/styles/main/public/preowned/1_10.jpg?itok=fV7qNQWn`;

module.exports.detomaso = `De Tomaso Mangusta 1969 ⭐1.5 https://cdn.motor1.com/images/mgl/L2RnG/s1/1969-de-tomaso-mangusta-for-sale.jpg|\
De Tomaso Pantera 1971 ⭐1.5 https://s3.amazonaws.com/images.hagerty.com/vehicle/web/Barrett-JacksonScottsdale2015_1027_De%20Tomaso_1972_Pantera_Coupe_THPNMB02340_.jpg|\
De Tomaso Pantera GT5-S ⭐2 https://www.supercars.net/blog/wp-content/uploads/2016/04/de-tomaso-pantera-gt5-s-06.jpg|\
De Tomaso Vallelunga 1967 ⭐1.5 https://cdn.bringatrailer.com/wp-content/uploads/2017/10/1-1-620x314-1.jpeg.jpg|\
De Tomaso Guarà 1996 ⭐1.5 https://images.cdn.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/f.png|\
De Tomaso Biguà 1998 ⭐1.5 https://www.supercars.net/blog/wp-content/uploads/2016/04/1998_Detomaso_Bigua1.jpg|\
De Tomaso Deauville 1972 https://www.classicdriver.com/sites/default/files/styles/full_width_slider/public/article_images/de-tomaso-deauville-watermark-1.jpg?itok=UCbTmh4m`;

module.exports.forduk = `Ford Falcon FG-X XR8 2015 ⭐2 https://res.cloudinary.com/carsguide/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/fg-x-ford-falcon-xr8-2014-malcolm-flynn-2.jpg|\
Ford Falcon XA GT RPO83 Hardtop 1973 https://www.shannons.com.au/library/images/auctions/GT7ED6027A247T86/1600x1066/1973-ford-falcon-xa-gt-rpo83-hardtop.jpg|\
Ford Falcon XA GT Sedan 1972 https://c1.staticflickr.com/9/8620/16367134656_4fd6cf1e99_b.jpg|\
Ford Falcon XA GTHO Phase 4 1972 ⭐2 https://c1.staticflickr.com/6/5697/21888846043_c140b191a0_b.jpg|\
Ford Falcon XB GT 1973 https://bestmoviecars.com/wp-content/uploads/2015/07/Ford-Falcon-XB-GT.jpg|\
Ford Falcon XK Deluxe 1961 ⭐0.5 http://www.earlyfalconcarclubqld.org.au/images/cars/98.jpg|\
Ford Falcon XL Sedan 1963 ⭐0.5 https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Ford_Falcon_XL_Sedan.jpg/1200px-Ford_Falcon_XL_Sedan.jpg|\
Ford Falcon XM Sedan 1964 ⭐0.5 https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ford_Falcon_XM_Sedan.jpg/1200px-Ford_Falcon_XM_Sedan.jpg|\
Ford Falcon XM UTE 1964 ⭐0.5 https://images-ext-1.discordapp.net/external/2vxBo17tFbbXk5gc7O-0Z3AvFz4njScUM5thyZkX1fs/https/upload.wikimedia.org/wikipedia/commons/0/0c/Ford_XM_Falcon_Utility.jpg?width=400&height=277|\
Ford Falcon XP Panel Van 1965 ⭐0.5 http://car-from-uk.com/ebay/carphotos/full/ebay145575523655448.jpg|\
Ford Falcon XP Sedan 1965 ⭐0.5 https://images-ext-2.discordapp.net/external/WuKUl3NBN6123JDnW1q_si-40Znp0__uDOpImVHc7Lk/https/upload.wikimedia.org/wikipedia/commons/a/a2/Ford_Falcon_XP_Sedan.jpg?width=401&height=300|\
Ford Falcon XR GT 1967 ⭐0.5 http://d3lp4xedbqa8a5.cloudfront.net/imagegen/p/1200/630/s3/digital-cougar-assets/tradeuniquecars/2016/11/15/133442/ford-falcon-xr-gt-1.jpg|\
Ford Falcon XW GTHO 1969 https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/motor-media/4045926/ford-falcon-gt.jpg|\
Ford Falcon XW GTHO Phase 2 1970 https://www.shannons.com.au/library/images/auctions/DH3MBBDG2YF17159/large/1970-ford-falcon-xw-gt-sedan.jpg|\
Ford Falcon XY GTHO Phase 3 1971 https://www.shannons.com.au/library/images/auctions/CU0O8QO54ADEX3AF/1600x1066/1971-ford-falcon-xy-gt-ho-phase-iii-sedan.jpg`;

module.exports.ginetta = `Ginetta F400 2010 ⭐2 http://media.fastestlaps.com/effgul91f3a2|\
Ginetta G21 1974 ⭐0.5 https://c1.staticflickr.com/8/7211/13511965485_ff906e2294_b.jpg|\
Ginetta G33 V8 1992 https://www.conceptcarz.com/images/ginetta/ginetta_g33_01.jpg|\
Ginetta G4 1964 ⭐0.5 http://www.topcarrating.com/ginetta/1964-ginetta-g4.jpg|\
Ginetta G60 2012 ⭐2 https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/ginetta-g60-18_0.jpg?itok=dePVwnhH`;

module.exports.holden = `Holden HQ Monaro GTS 350 Coupe 1971 ⭐0.5 https://i.pinimg.com/originals/65/df/2b/65df2b21c446303004c3f14a4e15782e.jpg|\
Holden LX Torana A9X Sedan 1977 ⭐0.5 https://www.shannons.com.au/library/images/auctions/KBN9BWY6BCAW8N04/1600x1066/1977-holden-lx-torana-a9x-sedan.jpg|\
Holden VE SS Wagon 2009 https://upload.wikimedia.org/wikipedia/commons/e/e7/2009%E2%80%932010_Holden_VE_Commodore_%28MY10%29_SS_V_Special_Edition_Sportwagon_03.jpg|\
Holden VF Commodore SS-V 2014 ⭐2 https://res.cloudinary.com/carsguide/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/Commodore-SSV.jpg|\
Holden VF Commodore SS UTE 2014 ⭐2 https://www.uteguide.com.au/wp-content/uploads/2013/09/Holden-VF-SSV-Ute-front-side.jpg|\
Holden VL Commodore SS Group A 1986 https://www.autoscene.com.au/wp-content/uploads/DSC_02021.jpg|\
Holden VL Commodore SS Group A SV 1988 https://www.autoscene.com.au/wp-content/uploads/DSC_1320-1024x684.jpg|\
Holden VS Commodore SS 1995 https://s-media-cache-ak0.pinimg.com/originals/c9/1f/f6/c91ff69734ed6f75f090ae6025553a9c.jpg|\
Holden VZ Monaro CV8 2005 ⭐2 http://silverdice.us/wp-content/uploads/2017/07/2005-holden-monaro-cv8-z-holden-vz-monaro-dsc-0616-jpg.jpg`;

module.exports.jaguar = [
  'Jaguar C-X75 2013 ⭐3 ' + 'https://car-images.bauersecure.com/upload/30489/images/1040x585/000084f33b70-ac91-417c-9.jpg',
  'Jaguar D-Type 1956 ⭐2 ' + 'https://bangshift.com/assets/galleries/demonstration-day-2014-at-simeone-museum/simeone-museum-demo-day-cobra-gt40-jag-porsche009.jpg',
  'Jaguar E-Type S1 1961 https://i.ytimg.com/vi/PaP3FTrIru0/maxresdefault.jpg',
  'Jaguar F-Type R Coupe 2014 ⭐2 ' + 'https://res.cloudinary.com/carsguide/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/Jaguar-F-type-Coupe-d.jpg',
  'Jaguar F-Type V8 S 2014 ⭐2 ' + 'http://st.motortrend.com/uploads/sites/5/2013/08/2014-Jaguar-F-Type-V8-S-front-three-quarters-view-in-motion1.jpg',
  'Jaguar XFR 2010 ⭐1.5 ' + 'http://www.blogcdn.com/www.autoblog.com/media/2009/05/xfrjag2010000.jpg',
  'Jaguar XJ220 1992 ⭐3 ' + 'https://www.ultimatecarpage.com/images/car/223/Jaguar-XJ220-3461.jpg',
  'Jaguar XK120 SE Roadster 1954 ' + 'https://i.pinimg.com/originals/49/16/fa/4916fa3a2429a57d640afc0fd76a7133.jpg',
  'Jaguar XKR-S 2011 ⭐2 ' + 'http://www.thesupercars.org/wp-content/uploads/2011/03/2011-Jaguar-XKR-S-Front-Angle-480.jpg',
  'Jaguar XKR-S GT 2015 ⭐2 ' + 'https://st.motortrend.com/uploads/sites/5/2014/01/2014-Jaguar-XKR-S-GT-front-three-quarter-in-motion-02.jpg',
  'Jaguar XKR-S 2009 ⭐1.5 ' + 'https://s1.cdn.autoevolution.com/images/gallery/JAGUARXKR-S-3666_4.jpg',
  'Jaguar F-Type Gr.4 2014 ' + '<:gt4:698962765095632967> ' + 'http://www.igcd.net/images/133/850.jpg',
  'Jaguar XKR GT RSR (Rocketsports Racing) 2011 ' + '<:gt3:698962765443891280> ' + 'https://farm7.static.flickr.com/6152/6193229221_c10ff72621_b.jpg',
];

module.exports.ktm = `KTM X-Bow GT 2010 https://www.ktm.com/globalassets/products-pim-data/ke2-xbow/x-bow-gt/x-bow-gt-2013/x1001m0/pho_bike_fact.jpg?h=340&w=550&mode=crop&404=fallback.png|\
KTM X-Bow 2008 https://s1.cdn.autoevolution.com/images/gallery/KTMX-Bow-3853_11.jpg|\
KTM X-Bow R 2012 https://s1.cdn.autoevolution.com/images/gallery/KTM-X-Bow-R-5758_7.jpg|\
KTM X-Bow RR 2014 ⭐1.5 https://s1.cdn.autoevolution.com/images/gallery/KTM-X-Bow-RR-5759_4.jpg`;

module.exports.lexus = `Lexus RC F Track Edition 2020 ⭐2 https://cdn.motor1.com/images/mgl/vM896/s3/2020-lexus-rc-f-track-edition.jpg|\
Lexus RX 450h F-Sport 2013 ⭐0.5 https://pictures.topspeed.com/IMG/jpg/201203/2013-lexus-rx-450h-f-spor.jpg|\
Lexus SC430 2010 https://images.hgmsites.net/med/2010-lexus-sc-430_100314159_m.jpg|\
Lexus LS 460 F-Sport 2013 http://chainimage.com/images/2013-lexus-ls460-f-sport.jpg|\
Lexus LS 460 SE-L 2008 http://bay2car.com/img/Lexus-LS-460-4-6-auto-SE-L-271714688380/0.jpg|\
Lexus LS 600h L 2009 ⭐0.5 https://static.cargurus.com/images/site/2009/07/14/20/59/2009-lexus-ls-600h-l-base-pic-7299-1600x1200.jpeg|\
Lexus RC F 2014 ⭐2 https://images.askmen.com/1080x540/cars/car_reviews/lexus-rc-f-review-1098814-TwoByOne.jpg|\
Lexus RC350 2015 ⭐1.5 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/14q3/612022/2015-lexus-rc350-coupe-first-drive-review-car-and-driver-photo-628679-s-original.jpg|\ 
Lexus CT200h 2011 ⭐0.5 https://res.cloudinary.com/carsguide/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_large/v1/editorial/Lexus-CT200h-2011.jpg|\
Lexus CT200h F-Sport 2011 ⭐0.5 http://www.blogcdn.com/www.autoblog.com/media/2010/10/web630-2011-lexus-ct-200h-f-sport-8.jpg|\
Lexus IS350 2006 https://pictures.topspeed.com/IMG/jpg/200605/2006-lexus-is350-25.jpg|\
Lexus IS430 Sport 2001 https://www.clublexus.com/forums/attachments/ls-3rd-gen-2001-2006/125012d1212551344-01-ls430-with-18-sport-edition-st3-rims-se1.jpg|\
Lexus LC500 2017 ⭐2 http://3.bp.blogspot.com/-wIdtHTNoQpE/VpPurcBkeEI/AAAAAAASDcQ/NY6SiLtjLqE/s1600/Lexus-LC500-14.jpg|\
Lexus LFA 2010 ⭐3 https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/lexus-lf-a-1_0.jpg?itok=ft5czLwa|\
Lexus ES 300 1992 https://static.cargurus.com/images/site/2008/04/19/01/21/1992_lexus_es_300_4_dr_std_sedan-pic-29211-640x480.jpeg|\
Lexus ES 350 2010 https://st.motortrend.com/uploads/sites/5/2009/11/2010-lexus-ES-350-front-three-quarters-passenger-promo.jpg|\
Lexus GS 350 F-Sport 2013 https://lexusenthusiast.com/images/weblog/13-04-15-lexus-gs-f-sport.jpg|\
Lexus GS 460 2009 ⭐1.5 https://www.cstatic-images.com/stock/1170x1170/12/1208912288-1425510092712.|\
Lexus IS 350 F-Sport 2014 ⭐1.5 http://st.motortrend.com/uploads/sites/5/2013/01/2014-Lexus-IS-350-Sport-front-three-quarters-in-motion.jpg|\
Lexus IS300 2005 https://file.kbb.com/kbb/vehicleimage/housenew/480x360/2005/2005-lexus-is-frontside_leis-051.jpg|\
Lexus LFA Nürburgring Package 2012 ⭐3 https://www.netcarshow.com/Lexus-LFA_Nurburgring_Package-2012-1024-09.jpg`;

module.exports.lincoln = `Lincoln Continental Mark IV 1976 ⭐0.5 https://cdn1.mecum.com/auctions/fl0116/fl0116-230172/images/fl0116-230172_12@2x.jpg?1450305934000|\
Lincoln Continental Mark VII 1990 ⭐0.5 http://photos.imageevent.com/mmm_mag/1990lincolncontinentalmarkvii/DSC_2316_768.jpg|\
Lincoln LS 2004 ⭐0.5 https://static.cargurus.com/images/site/2009/03/11/08/10/2004_lincoln_ls-pic-31357-640x480.jpeg|\
Lincoln MKS Ecoboost 2010 ⭐1.5 https://i.kinja-img.com/gawker-media/image/upload/s--osRDBxYQ--/c_fill,f_auto,fl_progressive,g_center,h_675,q_80,w_1200/18rb5ljvr6m8tjpg.jpg|\
Lincoln MKT 3.5L Ecoboost 2010 ⭐1.5 http://1-photos7.motorcar.com/used-2010-lincoln-mkt-4drwagon35lawdwecoboost-12303-14101149-1-1024.jpg|\
Lincoln MKX 3.7L V6 2011 ⭐1.5 https://cs.copart.com/v1/AUTH_svc.pdoc00001/PIX94/525453d6-77d3-4f84-b059-2ee3a6408a53.JPG|\
Lincoln Model K Convertible Roadster 1935 ⭐0.5 https://i.pinimg.com/originals/cf/2f/a9/cf2fa9a3fa65435aba55561d8ab31416.jpg|\
Lincoln Navigator 2008 ⭐0.5 https://static.cargurus.com/images/site/2009/08/11/13/09/2008-lincoln-navigator-base-4wd-pic-24046-640x480.jpeg|\
Lincoln Navigator 2018 ⭐1.5 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/14q1/562748/2015-lincoln-navigator-photos-and-info-news-car-and-driver-photo-566809-s-original.jpg?crop=1xw:1xh|\
Lincoln Continental 1962 ⭐0.5 https://dy98q4zwk7hnp.cloudfront.net/1962-Lincoln-Continental-American%20Classics--Car-100929477-2071a07550399099f9966ed383181e3b.jpg`;

module.exports.maserati = `Maserati Quattroporte Sport GT S 2011 ⭐1.5 https://automanager.blob.core.windows.net/wmphotos/012359/f0555164dcd94350bf9fc590831e23a4/dcdd7ee819_640.jpg|\
Maserati Levante GTS 2019 ⭐2 https://s1.cdn.autoevolution.com/images/news/2019-maserati-levante-gts-is-no-trofeo-packs-550-hp-v8-engine-127045_1.jpg|\
Maserati Bora 1975 ⭐1.5 https://icdn-6.motor1.com/images/mgl/7YMkP/s1/the-maserati-bora-was-a-seventies-superstar.jpg|\
Maserati Ghibli Cup 1997 ⭐1.5 http://www.supercarworld.com/images/fullpics/170d.jpg|\
Maserati Ghibli S 2014 ⭐2 https://cnet2.cbsistatic.com/img/hAOqM7rrAwd1IVp-7yvC7l0LMnM=/830x467/2014/05/22/cd42fa61-f9b8-4568-842e-79bcd6141267/2014-maserati-ghibli-s-q4-06v.jpg|\
Maserati GranTurismo S 2008 ⭐2 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/07q4/267366/2008-maserati-granturismo-photo-8746-s-original.jpg|\
Maserati GranTurismo MC Stradale 2014 ⭐2 https://images.luxify.com/resize?height=560&nocrop=true&url=https%3A%2F%2Fcdn.luxify.com%2Fimages%2F20160919-213300-luxify-2208-97211.jpg|\
Maserati Gransport 2006 ⭐2 https://www.cars.com/cstatic-images/car-pictures/xl/70mzgea1.jpg|\
Maserati MC12 2004 ⭐3.5 http://2.bp.blogspot.com/-XRKnDThMUq0/TwAlk-Ka4nI/AAAAAAAAB7Q/-AnY6m8mrqw/s1600/maserati+mc12+wallpaper+%25281%2529.JPG|\
Maserati MC12 Corsa 2006 ⭐3.5 http://www.car-revs-daily.com/wp-content/uploads/MC12-Corsa-gif1-gap.jpg|\
Maserati Quattroporte S 2013 ⭐2 https://www.bentleygoldcoast.com/galleria_images/3330/3330_p2_l.jpg|\
Maserati GranTurismo Coupe 2018 ⭐2 https://www.motortrend.com/uploads/sites/5/2017/07/2018-Maserati-GranTurismo-coupe-front-three-quarters.jpg?fit=around%7C875:492`;

module.exports.mercedesbenz = `Mercedes-Benz AMG GT Black Series 2020 ⭐3 https://images-ext-2.discordapp.net/external/FLD-nAnNVstvtsMoxl1v4srJ5gDW5LLFPoHZCEsPRdM/https/cdn.motor1.com/images/mgl/V7WyK/s3/2020-mercedes-amg-gt.jpg?width=703&height=396|\
Mercedes-Benz AMG GT S 2015 ⭐3 https://res.cloudinary.com/carsguide/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_large/v1/editorial/mercedes-amg-gt-s-2015-%286%29.jpg|\
Mercedes-Benz A 45 AMG 2013 ⭐1.5 https://www.carmagazine.co.uk/Images/upload/30449/images/00084a29e9d0-6490-42bb-9.jpg|\
Mercedes-Benz C 43 AMG Coupe 2018 ⭐1.5 https://99fb33e723f7233b1b48-fccd3cff2cdbf7276b91d2616299f5f0.ssl.cf1.rackcdn.com/WDDWJ6EB3JF691646/9f8d785241052dbe89129faec86218c8.jpg|\
Mercedes-Benz C 63 AMG Black Series 2012 ⭐2 http://www.blogcdn.com/www.autoblog.com/media/2011/11/01-mercedes-c63-amg-black-series.jpg|\
Mercedes-Benz CL 65 AMG 2005 ⭐1.5 https://s1.cdn.autoevolution.com/images/news/gallery/2005-mercedes-benz-cl-65-amg-c215-long-term-test-by-edmund-s-photo-gallery_6.jpg|\
Mercedes-Benz SL 500 2003 ⭐1.5 https://dealeraccelerate-all.s3.amazonaws.com/flemings/images/1/6/0/2/1602/34105_7ff1a83d72_low_res.jpg|\
Mercedes-Benz SLK 200 Kompressor 2008 https://res.cloudinary.com/carsguide/image/private/t_cg_car_l/v1/car/0528/5708/2008_mercedes-benz_slk200_used_5285708_1.jpg?version=1529106894|\
Mercedes-Benz SLK 200 Kompressor 1998 https://i.ytimg.com/vi/tjPpxQkO2sg/maxresdefault.jpg|\
Mercedes-Benz SLS AMG 2010 ⭐3 https://dam.which.co.uk/b71070c9-47a8-4f4c-8608-05ec07904492.jpg|\
Mercedes-Benz SLS AMG Black Series 2014 ⭐3 https://i.ytimg.com/vi/98G5gAJwuUM/maxresdefault.jpg|\
Mercedes-Benz SLS Electric Drive 2013 ⭐2 http://www.blogcdn.com/green.autoblog.com/media/2013/06/mercedes-benz-sls-amg-coupe-electric-drive-5.jpg|\
Mercedes-Benz A 35 AMG 4Matic 2019 ⭐1.5 https://i.kinja-img.com/gawker-media/image/upload/s--dyWZeSly--/c_scale,f_auto,fl_progressive,q_80,w_800/clgs2pfmjkcslopuvice.jpg|\
Mercedes-Benz SLS AMG Gr.4 <:gt4:698962765095632967> https://i.ytimg.com/vi/ohucLw3Qpao/maxresdefault.jpg|\
Mercedes-Benz SLS AMG GT3 2011 <:gt3:698962765443891280> http://www.thedetroitbureau.com/wp-content/uploads/2010/03/2011-Mercedes-Benz-SLS-AMG-GT3.jpg|\
Mercedes-Benz GT S AMG GT3 (AMG-Team HTP-Motorsport) 2016 <:gt3:698962765443891280> http://www.dailysportscar.com/wp-content/uploads/2016/05/29-HTP-Motorsports-Mercedes-N24-2016-Qualifying.jpg`;

/////////////////////////////////////////////////////////////////////////

module.exports.ibmakes = function() {
  return ['Ascari', 'Ferrari', 'Lamborghini'];
};

module.exports.ascari = `Ascari A10 2007 ⭐3 http://1.bp.blogspot.com/_E7kWiVomJBY/R6Y2eQYXweI/AAAAAAAAAtw/2ATK9fiRoSk/s400/Ascari_A10_01.jpg|\
Ascari Ecosse 1999 ⭐2 http://2.bp.blogspot.com/-iY2O--5YnPg/T3sNRjFKSqI/AAAAAAAAByc/eGH6aLUkcNs/s1600/Ascari_Ecosse_1998_001_2E7AB210.jpg|\
Ascari KZ1 2003 ⭐2 http://www.topcarrating.com/ascari/2003-ascari-kz1-5.jpg|\
Ascari KZ1-R 2005 ⭐2.5 https://www.supercars.net/blog/wp-content/uploads/2016/04/2005_Ascari_KZ1R1.jpg|\
Ascari KZ1R GT3 Race Car 2007 <:gt3:698962765443891280> https://pictures.topspeed.com/IMG/jpg/200703/2007-ascari-kz-1r-gt3.jpg`;

module.exports.ferrari = `Ferrari F8 Tributo 2020 ⭐2.5 https://pressfrom.info/upload/images/real/2019/02/28/ferrari-s-latest-mid-engine-monster-is-the-f8-tributo__436404_.jpg?content=1|\
Ferrari 250 GT California Spyder LWB 1957 https://img.favcars.com/ferrari/250/ferrari_250_1957_wallpapers_11_b.jpg|\
Ferrari 288 GTO 1984 ⭐2 https://www.ultimatecarpage.com/images/car/169/Ferrari-288-GTO-63687.jpg|\
Ferrari 348 TB 1989 ⭐1.5 https://pictures.topspeed.com/IMG/crop/200909/ferrari-348-tb-7_1600x0w.jpg|\
Ferrari 360 Challenge Stradale 2003 ⭐1.5 http://www.supercarworld.com/images/fullpics/238p.jpg|\
Ferrari 458 Italia 2009 ⭐2.5 http://www.blogcdn.com/www.autoblog.com/media/2009/09/01-ferrari-458-live.jpg|\
Ferrari 458 Spider 2011 ⭐2 https://auto.ferrari.com/en_EN/wp-content/uploads/sites/5/2013/07/458-spider-thumb.jpg|\
Ferrari 458 Speciale 2014 ⭐2.5 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/13q4/543504/2014-ferrari-458-speciale-first-drive-review-car-and-driver-photo-551761-s-original.jpg|\
Ferrari 512 Testarossa 1991 ⭐2 https://pictures.topspeed.com/IMG/jpg/200910/ferrari-512-tr-4.jpg|\
Ferrari 512 BB 1976 ⭐2 https://pictures.topspeed.com/IMG/jpg/200909/ferrari-512-bb-4.jpg|\
Ferrari 599 GTO 2011 ⭐2.5 http://st.motortrend.com/uploads/sites/5/2010/05/ferrari-599-gTO-front-three-quarter-view-1.jpg|\
Ferrari 612 Scaglietti 2005 ⭐2 https://s13252.pcdn.co/wp-content/uploads/2017/09/59dfb7b9661f0_IMG_3186-e1508192899463-940x743.jpg|\
Ferrari Enzo Ferrari 2002 ⭐3 http://www.rssportscars.com/photos/cars/2002-ferrari-enzo/ferrari-enzo-h.jpg|\
Ferrari F12 Berlinetta 2012 ⭐2.5 https://www.carmagazine.co.uk/Images/upload/28935/images/ferrari6.jpg|\
Ferrari F40 1992 ⭐2.5 https://s3.amazonaws.com/images.hagerty.com/vehicle/original/Ritz%20Carlton%202019_137_Ferrari_1992_F40_Coupe_ZFFGJ34B000091464_Overall.jpeg|\
Ferrari F430 2006 ⭐2.5 https://pictures.topspeed.com/IMG/jpg/201506/2006-ferrari-f430-17.jpg|\
Ferrari F50 1995 ⭐2.5 https://www.topgear.com/sites/default/files/styles/16x9_1280w/public/news-listicle/image/2017/02/am17_r193_001.jpg?itok=lyiSUS4v|\
Ferrari FF 2011 ⭐2 http://www.carenthusiast.com/ferrari/ferrari__ff__2011__048.jpg|\
Ferrari LaFerrari 2013 ⭐3 http://cdn.hiconsumption.com/wp-content/uploads/2013/03/2013-Ferrari-LaFerrari-1.jpg|\
Ferrari SP38 Deborah 2018 ⭐2.5 https://icdn-6.motor1.com/images/mgl/g7Ono/s4/ferrari-sp38.jpg|\
Ferrari 458 Italia Gr.4 2009 <:gt4:698962765095632967> https://www.kudosprime.com/gts/images/users/car_99_1_59ed276ed237c.jpg`;

module.exports.lamborghini = `Lamborghini Huracan Evo 2019 ⭐2.5 https://cdn.motor1.com/images/mgl/NvMKX/s4/2020-lamborghini-huracan-evo.jpg|\
Lamborghini Urraco 1979 ⭐1.5 https://images-ext-1.discordapp.net/external/eKQO1XECUylanihOfOiwfiXEt_rd82OxlQ8eXFYcm5g/http/bestcarmag.com/sites/default/files/62114871974-Lamborghini-Urraco-P300-V1-1080.jpg?width=705&height=397|\
Lamborghini Aventador SVJ 2019 ⭐3 https://cdn.motor1.com/images/mgl/LKMJm/s4/lamborghini-aventador-svj.jpg|\
Lamborghini Aventador LP700-4 2011 ⭐3 https://car-images.bauersecure.com/upload/25151/images/0000d2fe50df-05a7-4d84-9.jpg|\
Lamborghini Centenario LP770-4 2017 ⭐3 http://www.sub5zero.com/wp-content/uploads/2016/03/2017_lamborghini_centenario_1.jpg|\
Lamborghini Countach LP400 1974 ⭐1.5 https://files.goodingco.com/content/vehicles/5880/images/20140710_020359_c30f0f/poster.jpg|\
Lamborghini Diablo GT 2000 ⭐2.5 https://www.supercars.net/blog/wp-content/uploads/2016/04/1999_Lamborghini_DiabloGT3.jpg|\
Lamborghini Gallardo LP570-4 Superleggera 2011 ⭐2.5 http://st.motortrend.com/uploads/sites/10/2015/09/2011-lamborghini-gallardo-LP-570-4-superleggera-front-three-quarter-static.jpg|\
Lamborghini Gallardo Superleggera 2008 ⭐2 https://pictures.dealer.com/l/lamborghinidallas/0880/3f53140949251937e02c359cd6fbd91fx.jpg|\
Lamborghini Miura P400 Bertone Prototype CN.0706 1967 ⭐1.5 https://www.supercars.net/blog/wp-content/uploads/2016/04/1966_Lamborghini_MiuraP400Prototipo-0-1536.jpg|\
Lamborghini Countach LP5000 QV 1988 ⭐2 https://www.supercars.net/blog/wp-content/uploads/2016/04/8839731.jpg|\
Lamborghini Diablo 1990 ⭐2.5 http://i1370.photobucket.com/albums/ag260/hammondsofknutsford/SE30110614_zps39ee8cf0.jpg|\
Lamborghini Diablo SV 1997 ⭐2.5 https://blog.dupontregistry.com/wp-content/uploads/2015/07/diablo-sv-main.jpg|\
Lamborghini Espada 1970 https://s13252.pcdn.co/wp-content/uploads/2012/08/1970_Lamborghini_Espada_Series_1_V12_Barn_Find_For_Sale_Front_1-470x318.jpg|\
Lamborghini Gallardo 2004 ⭐2 https://static.cargurus.com/images/site/2008/04/22/14/39/2004_lamborghini_gallardo-pic-11930-640x480.jpeg|\
Lamborghini Gallardo LP570-4 Spyder Performante 2012 ⭐2.5 https://st.motortrend.com/uploads/sites/5/2011/05/2011-lamborghini-gallardo-LP570-4-spyder-performante-promo.jpg|\
Lamborghini Huracán LP610-4 2015 ⭐2.5 https://i.gaw.to/photos/6/3/63455_2015_lamborghini_Huracan.jpg?1024x640|\
Lamborghini Miura P400 SV 1967 ⭐1.5 https://ag-spots-2017.o.auroraobjects.eu/2017/09/18/other/2880-1800-crop-lamborghini-miura-p400-sv-c469418092017191248_1.jpg|\
Lamborghini Murcielago 2001 ⭐2.5 https://vignette.wikia.nocookie.net/topgear/images/0/03/2002_lamborghini_murcielago_2.jpg/revision/latest?cb=20111203192849|\
Lamborghini Reventon 2008 ⭐2.5 http://www.motorward.com/wp-content/images/2016/09/2008-Lamborghini-Reventon-0.jpg|\
Lamborghini Sesto Elemento 2010 ⭐3 https://www.supercars.net/blog/wp-content/uploads/2016/04/2010_Lamborghini_SestoElemento1.jpg|\
Lamborghini Veneno 2014 ⭐3 http://naludamagazine.com/wp-content/uploads/2013/05/Lamborghini-Veneno-internet.jpg`;

///////////IA LICENSE/////////
module.exports.iamakes = function() {
  return ['Bentley', 'Bugatti', 'Hennessey'];
};

module.exports.bentley = `Bentley Turbo R 1993 ⭐0.5 https://dl4aex02brqj5.cloudfront.net/prod/media/184/b7e/983/184b7e983d63cffe48ef0dd9909a64b362e8c520.1200.png|\
Bentley Continental Supersports 2018 ⭐2 https://robbreportedit.files.wordpress.com/2017/09/st_james_red_0121.jpg?w=1024|\
Bentley Continental GT3-R 2015 ⭐2 https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/bentley-gt3-r-rt-024.jpg?itok=9mX8WXiw|\
Bentley Bentayga 2019 https://st.motortrend.com/uploads/sites/11/2018/03/Bentayga-by-Mulliner-Inspired-by-The-FestivalTM-1.jpg|\
Bentley Mulsanne W.O. Edition 2018 ⭐2 https://cnet1.cbsistatic.com/img/oIsZqcblHPLRDAyrFg9mwefUXDk=/2018/07/10/300ab05c-cad7-410c-bcde-2b4419ed2047/ogi1-002-bentley-wo-mulliner.jpg|\
Bentley Continental GT 2005 ⭐2 https://cdn.bringatrailer.com/wp-content/uploads/2017/11/IMG_6344-940x705.jpg|\
Bentley Continental GT Speed 2012 ⭐2 https://car-images.bauersecure.com/upload/28714/images/continentalgtspeed01.jpg|\
Bentley Continental GT 2018 ⭐2 https://cdn.motor1.com/images/mgl/1Op63/s1/2018-bentley-continental-gt.jpg|\
Bentley Continental GT3 2018 <:gt3:698962765443891280> https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/new_bentley_continental_gt3_-_1.jpg?itok=WfNort5n9`;

module.exports.bugatti = `Bugatti Chiron 2016 ⭐3.2 https://uncrate.com/p/2016/02/bugatti-chiron-1.jpg|\
Bugatti EB 110 1992 ⭐2.3 https://www.6speedonline.com/wp-content/uploads/2014/04/Bugatti-EB110-Blue.jpg|\
Bugatti Veyron 16.4 2009 ⭐2.9 http://www.moibbk.com/files/carsNews/images/2013-bugatti-veyron-164-grand-sport-vitesse-with-1200-horsepower.jpg|\
Bugatti Chiron Sport 2018 ⭐3.2 https://assets.bugatti.com/fileadmin/_processed_/sei/p121/se-image-4f750982624e527a8b1003408e4febcf.jpg|\
Bugatti Veyron Super Sport Vitesse 2011 ⭐3.2 https://cdn.thegentlemansjournal.com/wp-content/uploads/2012/03/Bugatti-Veyron-Grand-Sport-Vitesse-900x600-c-center.jpg|\
Bugatti Veyron Super Sport 2011 ⭐3.2 https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/images/10q4/368263/bugatti-veyron-2011-bugatti-veyron-164-super-sport-review-car-and-driver-photo-370402-s-original.jpg`;

module.exports.hennessey = `Hennessey Venom F5 2015 ⭐3.5 http://hennesseyperformance.com/wp-content/uploads/2016/02/Hennessey-Venom-F5-15.jpg|\
Hennessey Venom GT 2012 ⭐3.2 https://media.discordapp.net/attachments/306637248219185154/449420847900524544/12-hennessey-venom-gt-grey.png?width=400&height=266|\
Hennessey Venom GT2 2013 ⭐3.2 https://i.kinja-img.com/gawker-media/image/upload/s--O3ydcguX--/c_scale,f_auto,fl_progressive,q_80,w_800/186jn676xftp7jpg.jpg|\
Hennessey Venom GT Spyder 2013 ⭐3.2 https://theawesomer.com/photos/2012/01/010312_hennessey_venom_gt_spyder_1.jpg`;

module.exports.allmakes = function() {
  return require(gtffile.CARS)
    .bmakes()
    .concat(require(gtffile.CARS).amakes())
    .concat(require(gtffile.CARS).icmakes())
    .concat(require(gtffile.CARS).ibmakes())
    .concat(require(gtffile.CARS).iamakes());
};

module.exports.find = function(make, embed, msg, id) {
  var cars = require(gtffile.CARS);
  var list = [''];
  var cost = 0;
  var level = 1;
  var sort = false;
  // NO LICENSE
  if (make == 'abarth' || make == 'Abarth') {
    make = 'Abarth';
    cost = 10000;
    list = cars.abarth;
  }
  if (make == 'acura' || make == 'Acura') {
    make = 'Acura';
    cost = 10000;
    list = cars.acura.split('|');
  }
  if (make == 'chrysler' || make == 'Chrysler') {
    make = 'Chrysler';
    cost = 10000;
    list = cars.chrysler.split('|');
  }
  if (make == 'citroen' || make == 'Citroen' || make == 'citroën' || make == 'Citroën') {
    make = 'Citroen';
    cost = 10000;
    list = cars.citroen.split('|');
  }
  if (make == 'dacia' || make == 'Dacia') {
    make = 'Dacia';
    cost = 10000;
    list = cars.dacia.split('|');
  }
  if (make == 'daihatsu' || make == 'Daihatsu') {
    make = 'Daihatsu';
    cost = 10000;
    list = cars.daihatsu.split('|');
  }
  if (make == 'fiat' || make == 'Fiat') {
    make = 'Fiat';
    cost = 10000;
    list = cars.fiat.split('|');
  }
  if (make == 'honda' || make == 'Honda') {
    make = 'Honda';
    cost = 10000;
    list = cars.honda;
  }
  if (make == 'hyundai' || make == 'Hyundai') {
    make = 'Hyundai';
    cost = 10000;
    list = cars.hyundai.split('|');
  }
  if (make == 'infiniti' || make == 'Infiniti') {
    make = 'Infiniti';
    cost = 10000;
    list = cars.infiniti.split('|');
  }
  if (make == 'isuzu' || make == 'Isuzu') {
    make = 'Isuzu';
    cost = 10000;
    list = cars.isuzu.split('|');
  }
  if (make == 'jeep' || make == 'Jeep') {
    make = 'Jeep';
    cost = 10000;
    list = cars.jeep.split('|');
  }
  if (make == 'kia' || make == 'Kia') {
    make = 'Kia';
    cost = 10000;
    list = cars.kia.split('|');
  }
  if (make == 'mg' || make == 'MG') {
    make = 'MG';
    cost = 10000;
    list = cars.mg.split('|');
  }
  if (make == 'mazda' || make == 'Mazda') {
    make = 'Mazda';
    cost = 10000;
    list = cars.mazda;
  }

  if (make == 'mercury' || make == 'Mercury') {
    make = 'Mercury';
    cost = 10000;
    list = cars.mercury.split('|');
  }
  if (make == 'mini' || make == 'Mini') {
    make = 'Mini';
    cost = 10000;
    list = cars.mini.split('|');
  }
  if (make == 'mitsubishi' || make == 'Mitsubishi') {
    make = 'Mitsubishi';
    cost = 10000;
    list = cars.mitsubishi.split('|');
  }
  if (make == 'opel' || make == 'Opel') {
    make = 'Opel';
    cost = 10000;
    list = cars.opel.split('|');
  }
  if (make == 'peugeot' || make == 'Peugeot') {
    make = 'Peugeot';
    cost = 10000;
    list = cars.peugeot.split('|');
  }
  if (make == 'pontiac' || make == 'Pontiac') {
    make = 'Pontiac';
    cost = 10000;
    list = cars.pontiac.split('|');
  }
  if (make == 'Renault' || make == 'renault') {
    make = 'Renault';
    cost = 10000;
    list = cars.renault.split('|');
  }
  if (make == 'Scion' || make == 'scion') {
    make = 'Scion';
    cost = 10000;
    list = cars.scion.split('|');
  }
  if (make == 'SEAT' || make == 'Seat' || make == 'seat') {
    make = 'SEAT';
    cost = 10000;
    list = cars.seat.split('|');
  }
  if (make == 'Subaru' || make == 'subaru') {
    make = 'Subaru';
    cost = 10000;
    list = cars.subaru.split('|');
  }
  if (make == 'Suzuki' || make == 'suzuki') {
    make = 'Suzuki';
    cost = 10000;
    list = cars.suzuki.split('|');
  }
  if (make == 'Tata-Motors' || make == 'tata-motors' || make == 'Tata' || make == 'tata') {
    make = 'Tata Motors';
    cost = 10000;
    list = cars.tata.split('|');
  }
  if (make == 'Toyota' || make == 'toyota') {
    make = 'Toyota';
    cost = 10000;
    list = cars.toyota.split('|');
  }
  if (make == 'Volkswagen' || make == 'volkswagen' || make == 'VW' || make == 'vw') {
    make = 'Volkswagen';
    cost = 10000;
    list = cars.volkswagen.split('|');
  }
  if (make == 'Volvo' || make == 'volvo') {
    make = 'Volvo';
    cost = 10000;
    list = cars.volvo.split('|');
  }

  //////A LICENSE

  if (make == 'alfa-romeo' || make == 'Alfa-Romeo' || make == 'alfaromeo' || make == 'AlfaRomeo') {
    make = 'Alfa Romeo';
    cost = 15000;
    level = 6;
    list = cars.alfaromeo.split('|');
  }
  if (make == 'alpine' || make == 'Alpine') {
    make = 'Alpine';
    cost = 15000;
    level = 6;
    list = cars.alpine;
  }
  if (make == 'BMW' || make == 'bmw' || make == 'beamer') {
    make = 'BMW';
    cost = 15000;
    level = 6;
    list = cars.bmw.split('|');
  }
  if (make == 'Chevrolet' || make == 'chevrolet' || make == 'chevy' || make == 'Chevy' || make == 'chev') {
    make = 'Chevrolet';
    cost = 15000;
    level = 6;
    list = cars.chevy;
  }
  if (make == 'Dodge' || make == 'dodge') {
    make = 'Dodge';
    cost = 15000;
    level = 6;
    list = cars.dodge.split('|');
  }
  if (make == 'Ford' || make == 'ford') {
    make = 'Ford';
    cost = 15000;
    level = 6;
    list = cars.ford.split('|');
  }
  if (make == 'Lancia' || make == 'lancia') {
    make = 'Lancia';
    cost = 15000;
    level = 6;
    list = cars.lancia.split('|');
  }
  if (make == 'Lotus' || make == 'lotus') {
    make = 'Lotus';
    cost = 15000;
    level = 6;
    list = cars.lotus.split('|');
  }
  if (make == 'Nissan' || make == 'nissan') {
    make = 'Nissan';
    cost = 15000;
    level = 6;
    list = cars.nissan;
  }
  //IC LICENSE//

  if (make == 'AstonMartin' || make == 'astonmartin' || make == 'Aston-Martin' || make == 'aston-martin' || make == 'Astonmartin') {
    make = 'Aston Martin';
    cost = 20000;
    level = 11;
    list = cars.astonmartin.split('|');
  }
  if (make == 'Audi' || make == 'audi') {
    make = 'Audi';
    cost = 20000;
    level = 11;
    list = cars.audi;
  }
  if (make == 'Caterham' || make == 'caterham') {
    make = 'Caterham';
    cost = 20000;
    level = 11;
    list = cars.caterham.split('|');
  }
  if (make == 'DeTomaso' || make == 'Detomaso' || make == 'detomaso' || make == 'De-Tomaso' || make == 'de-tomaso') {
    make = 'De Tomaso';
    cost = 20000;
    level = 11;
    list = cars.detomaso.split('|');
  }
  if (make == 'FordUK' || make == 'fordUK' || make == 'forduk' || make == 'Ford-UK' || make == 'Ford-(UK)') {
    make = 'Ford (UK)';
    cost = 20000;
    level = 11;
    list = cars.forduk.split('|');
  }
  if (make == 'Ginetta' || make == 'ginetta') {
    make = 'Ginetta';
    cost = 20000;
    level = 11;
    list = cars.ginetta.split('|');
  }
  if (make == 'Holden' || make == 'holden') {
    make = 'Holden';
    cost = 20000;
    level = 11;
    list = cars.holden.split('|');
  }
  if (make == 'Jaguar' || make == 'jaguar') {
    make = 'Jaguar';
    cost = 20000;
    level = 11;
    list = cars.jaguar;
  }
  if (make == 'KTM' || make == 'ktm') {
    make = 'KTM';
    cost = 20000;
    level = 11;
    list = cars.ktm.split('|');
  }
  if (make == 'Lexus' || make == 'lexus') {
    make = 'Lexus';
    cost = 20000;
    level = 11;
    list = cars.lexus.split('|');
  }
  if (make == 'Lincoln' || make == 'lincoln') {
    make = 'Lincoln';
    cost = 20000;
    level = 11;
    list = cars.lincoln.split('|');
  }
  if (make == 'Maserati' || make == 'maserati') {
    make = 'Maserati';
    cost = 20000;
    level = 11;
    list = cars.maserati.split('|');
  }
  if (make == 'MercedesBenz' || make == 'mercedesbenz' || make == 'mercedes' || make == 'Mercedes' || make == 'Mercedes-Benz' || make == 'mercedes-benz') {
    make = 'Mercedes-Benz';
    cost = 20000;
    level = 11;
    list = cars.mercedesbenz.split('|');
  }
  //IB LICENSE////

  if (make == 'Ascari' || make == 'ascari') {
    make = 'Ascari';
    cost = 30000;
    level = 21;
    list = cars.ascari.split('|');
  }
  if (make == 'Ferrari' || make == 'ferrari') {
    make = 'Ferrari';
    cost = 30000;
    level = 21;
    list = cars.ferrari.split('|');
  }
  if (make == 'Lamborghini' || make == 'lamborghini') {
    make = 'Lamborghini';
    cost = 30000;
    level = 21;
    list = cars.lamborghini.split('|');
  }

  ///IA LICENSE///
  if (make == 'Bentley' || make == 'bentley') {
    make = 'Bentley';
    cost = 40000;
    level = 31;
    list = cars.bentley.split('|');
  }
  if (make == 'Bugatti' || make == 'bugatti') {
    make = 'Bugatti';
    cost = 40000;
    level = 31;
    list = cars.bugatti.split('|');
  }
  if (make == 'Hennessey' || make == 'hennessey') {
    make = 'Hennessey';
    cost = 40000;
    level = 31;
    list = cars.hennessey.split('|');
  }
  ///SPECIAL CASES////
  if (make == 'Tuner' || make == 'tuner' || make == 'custom' || make == 'Custom') {
    var list = [];
    sort = true;
    make = 'Tuner / Custom';

    var m = function(make) {
      var firstlist = cars.find(make);
      var scarlist = gtf.dealercarslist(firstlist[0], firstlist[1], firstlist[2]);
      scarlist = scarlist.filter(x => x[0].includes('🔧'));
      if (scarlist.length == 0) {
        return;
      } else {
        list = list.concat(scarlist);
      }
    };
    cars.allmakes().forEach(m);
  }

  if (make == 'GT4' || make == 'gt4' || make == 'Gr.4' || make == 'gr.4' || make == 'gr4' || make == 'GR4' || make == 'Gr4') {
    list = [];
    sort = true;
    make = 'GT4 Race Car';

    var m = function(make) {
      var firstlist = cars.find(make);
      var scarlist = gtf.dealercarslist(firstlist[0], firstlist[1], firstlist[2]);
      scarlist = scarlist.filter(x => x[5].includes('<:gt4:'));
      if (scarlist.length == 0) {
        return;
      } else {
        list = list.concat(scarlist);
      }
    };
    cars.allmakes().forEach(m);
  }

  if (make == 'GT3' || make == 'gt3' || make == 'Gr.3' || make == 'gr.3' || make == 'gr3' || make == 'GR3' || make == 'Gr3') {
    list = [];
    sort = true;
    make = 'GT3 Race Car';

    var m = function(make) {
      var firstlist = cars.find(make);
      var scarlist = gtf.dealercarslist(firstlist[0], firstlist[1], firstlist[2]);
      scarlist = scarlist.filter(x => x[5].includes('<:gt3:'));
      if (scarlist.length == 0) {
        return;
      } else {
        list = list.concat(scarlist);
      }
    };
    cars.allmakes().forEach(m);
  }

  if (make == 'GT1' || make == 'gt1' || make == 'Gr.1' || make == 'gr.1' || make == 'gr1' || make == 'GR1' || make == 'Gr1') {
    list = [];
    sort = true;
    make = 'GT1 Race Car';

    var m = function(make) {
      var firstlist = cars.find(make);
      var scarlist = gtf.dealercarslist(firstlist[0], firstlist[1], firstlist[2]);
      scarlist = scarlist.filter(x => x[5].includes('<:gt1:'));
      if (scarlist.length == 0) {
        return;
      } else {
        list = list.concat(scarlist);
      }
    };
    cars.allmakes().forEach(m);
  }

  if (embed !== undefined) {
    if (!exp.checklevel(level, embed, msg, id)) {
      return 'Invalid';
    }
  }

  return [list.sort(), make, cost, sort];
};

module.exports.randomcars = function(makes, models, number) {
  var prizes = [];

  var final = [];
  for (var ii = 0; ii < makes.length; ii++) {
    var rating = makes[ii].split(' ').slice(-1);
    if (!makes[ii].includes('⭐') && !makes[ii].includes('🔧') && !makes[ii].includes('<:gt4:') && !makes[ii].includes('<:gt3:') && !makes[ii].includes('<:gt1:')) {
      rating = '';
    }
    var makeselect = [];

    if (makes[ii].includes('Any')) {
      final = require(gtffile.CARS).allmakes();
      if (makes[ii].includes('⭐') || makes[ii].includes('🔧') || makes[ii].includes('<:gt4:') || makes[ii].includes('<:gt3:') || makes[ii].includes('<:gt1:')) {
        final = final.map(x => x + ' ' + rating);
      }
      break;
    }
    if (makes[ii].includes('License B')) {
      makeselect = makeselect.concat(require(gtffile.CARS).bmakes()).map(x => x + ' ' + rating);
    } else if (makes[ii].includes('License A')) {
      makeselect = makeselect.concat(require(gtffile.CARS).amakes()).map(x => x + ' ' + rating);
    } else if (makes[ii].includes('License IC')) {
      makeselect = makeselect.concat(require(gtffile.CARS).icmakes()).map(x => x + ' ' + rating);
    } else if (makes[ii].includes('License IB')) {
      makeselect = makeselect.concat(require(gtffile.CARS).ibmakes()).map(x => x + ' ' + rating);
    } else if (makes[ii].includes('License IA')) {
      makeselect = makeselect.concat(require(gtffile.CARS).iamakes()).map(x => x + ' ' + rating);
    } else if (makes[ii].includes('License S')) {
      makeselect = makeselect.concat(require(gtffile.CARS).smakes()).map(x => x + ' ' + rating);
    } else {
      final.push(makes[ii]);
      continue;
    }
    final = final.concat(makeselect);
  }

  for (var i = 0; i < number; i++) {
    var make = final[Math.floor(Math.random() * final.length)];
    var e = '';
    if (make.includes('⭐')) {
      rating = make.split(' ')[1];
    } else if (make.includes('🔧')) {
      rating = make.split(' ')[1];
    } else if (make.includes('<:gt4:')) {
      rating = '<:gt4:';
    } else if (make.includes('<:gt3:')) {
      rating = '<:gt3:';
    } else if (make.includes('<:gt1:')) {
      rating = '<:gt1:';
    } else {
      rating = '⭐1';
    }

    var makename = make.split(' ')[0];
    var list = require(gtffile.CARS).find(makename);
    var carlist = list[0];
    var make = list[1];
    var cost = list[2];

    var simplecarlist = gtf.dealercarslist(carlist, makename, cost);
    if (models.length !== 0 && models !== '' && !(models[0] == 'M None')) {
      simplecarlist = simplecarlist.filter(function(x) {
        for (var j = 0; j < models.length; j++) {
          if (
            x[0].includes(
              ' ' +
                models[j]
                  .split(' ')
                  .slice(1)
                  .join(' ')
            )
          ) {
            return true;
          }
        }
        return false;
      });
    }

    if (rating !== '') {
      simplecarlist = simplecarlist.filter(function(x) {
        if (x[5].includes(rating)) {
          return true;
        } else {
          return false;
        }
      });
    }
    if (simplecarlist === undefined) {
      i++;
      break;
    }
    var randomcar = simplecarlist[Math.floor(Math.random() * simplecarlist.length)];
    if (randomcar == undefined) {
      i--;
    } else {
      prizes.unshift(randomcar);
    }
  }

  return prizes;
};
