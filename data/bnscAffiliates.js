/**
 * Botswana National Sport Commission (BNSC) - Affiliated Sports Associations
 * Source: BNSC Affiliates Directory
 */

const bnscAffiliates = [
  {
    id: 1,
    name: "Botswana Amateur Fencing Society",
    sport: "Fencing",
    contact: {
      address: null,
      email: null,
      phone: null,
      website: null,
    },
    executive: [
      { name: "Mandlenkosi Masuku", role: "President" },
      { name: "Philani Mazibuko", role: "Vice President" },
      { name: "Cecilia Boom", role: "Secretary General" },
      { name: "Chawada Siku", role: "Treasurer" },
      { name: "Ewetse Khama", role: "PRO" },
      { name: "Karabo Thobega", role: "Technical Director" },
      { name: "Lorato Medupi", role: "Additional Member" },
      { name: "Thuso Nakedi", role: "Additional Member" },
    ],
    affiliations: [],
    founded: null,
    description: null,
  },

  {
    id: 2,
    name: "Botswana Athletics Association",
    shortName: "BAA",
    sport: "Athletics",
    contact: {
      address: "P.O. Box 2399, Gaborone",
      email: "bot@mf.iaaf.org",
      phone: "3914111",
      fax: "3184942",
      website: "www.baa.org.co.bw",
    },
    executive: [
      { name: "Phaphane Botlhale", role: "President" },
      { name: "Raymond Phale", role: "Vice President Finance" },
      { name: "Tshepo Kelaotswe", role: "Vice President Sports Development" },
      { name: "Oabona Theetso", role: "Vice President Admin" },
      { name: "Dr Eric Mandawu", role: "Coordinator" },
      { name: "Keamogetse Rancholo", role: "Coordinator" },
      { name: "Amogelang Magugae", role: "Coordinator" },
      { name: "Mpho Bagwasi", role: "Coordinator" },
    ],
    affiliations: [
      "International Association of Athletics Federations (IAAF)",
      "African Athletic Confederation (AAC)",
      "Botswana National Sport Commission (BNSC)",
    ],
    founded: "1972-06-18",
    registeredDate: "1979-06-31",
    description:
      "The Botswana Athletics Association (BAA) was established in June 1972 when about 22 people from towns and villages of Botswana met at Gaborone Secondary School to form a National Athletics Body.",
    vision:
      "The pursuit of performance excellence in athletics for the nation.",
    mission:
      "Botswana Athletics Association aims to develop athletics through enhancing and promoting the pursuit of athletics excellence from youth to masters.",
    memberClubs: 17,
  },

  {
    id: 3,
    name: "Botswana Badminton Association",
    shortName: "BBA",
    sport: "Badminton",
    contact: {
      address: "P.O. Box 201369, Gaborone",
      email: "secretary@botswanabadminton.co",
      phone: null,
      website: null,
    },
    executive: [
      { name: "Kunyalala H. Mphinyane", role: "President", phone: "5441797" },
      { name: "Moses Macheke", role: "Vice President" },
      { name: "Thuso Mudungo", role: "Secretary General" },
      { name: "Ms Wame Maphosa", role: "Treasurer" },
      { name: "Godwin O. Mathumo", role: "Technical Director" },
      { name: "Lesego Tsekane", role: "Events Manager" },
      { name: "Barulagye Ncube", role: "PRO" },
    ],
    affiliations: [
      "Botswana National Sport Commission (BNSC)",
      "Africa Badminton Federation",
      "International Badminton Federation",
    ],
    founded: "1990",
    description:
      "The Botswana Badminton Association was formed in 1990 under the chairmanship of Ishmael Bhamjee.",
    registeredClubs: 8,
    vision:
      "BBA shall endeavour to have a large pool of players for local and international competitions at all times and in all categories.",
    mission:
      "To promote and establish badminton as a competitive and socially rewarding game.",
  },

  {
    id: 4,
    name: "Botswana Basketball Association",
    shortName: "BBA",
    sport: "Basketball",
    contact: {
      address: "Private Bag BR 97, B/hurst, Suite No. Unit 36, Gaborone",
      email: "bba@botsnet.bw",
      phone: "317 0061",
      website: null,
    },
    executive: [
      { name: "Ms Boineelo Hardy", role: "President" },
      { name: "Mr Phineas Makgale", role: "Vice President" },
      { name: "Thatayaone Kgoadi", role: "Secretary General" },
      { name: "Mmoloki Njamela", role: "Treasurer" },
      { name: "Mr Tirafalo Matsetse", role: "Technical Director" },
      { name: "Ms Abale Lesego", role: "PRO" },
    ],
    affiliations: [
      "Botswana National Sport Commission (BNSC)",
      "Botswana National Olympic Committee (BNOC)",
      "Zone 6",
      "AFABA",
      "FIBA",
    ],
    founded: "1995",
    description:
      "Basketball was played informally in Botswana by mission schools from 1965. A formal organised structure came into being in the early nineties and was formally registered in 1995.",
    vision:
      "To have Basketball as the number one participating sport in the whole country at all age groups.",
    mission:
      "We shall facilitate the implementation of training programmes, athletes' development, facilities provision, community participation, multi-level linkages and global networking by democratic administrators.",
  },

  {
    id: 5,
    name: "Botswana Bowling Association",
    sport: "Bowling",
    contact: {
      address: "Gaborone, Botswana",
      email: null,
      phone: null,
      website: null,
    },
    executive: [
      { name: "Kitso Robert", role: "President" },
      { name: "Regent Reid", role: "Vice President" },
      { name: "Marea Modutlwa", role: "Director of Bowls" },
      { name: "Mervyn Mitchell", role: "Executive Member Finance" },
      { name: "Edwin Nyoka", role: "Executive Secretary" },
      { name: "Ookeditse Lekang", role: "Competitions Secretary" },
      { name: "Gasegarona Pabalelo", role: "Treasurer" },
    ],
    affiliations: [],
    founded: null,
    description: null,
  },

  {
    id: 6,
    name: "Botswana Boxing Association",
    shortName: "BABA",
    sport: "Boxing",
    contact: {
      address: "Private Bag Bo 184, Gaborone",
      email: null,
      phone: "3923090",
      fax: "3901352",
      website: null,
    },
    executive: [
      { name: "Dr Thato Moses Patlakwe", role: "President" },
      { name: "Dirang Thipe", role: "Vice President" },
      { name: "Lefiri Moremi", role: "Secretary General" },
      { name: "Frank Chigutshi", role: "Treasurer" },
      { name: "Taolo Tlouetsile", role: "Publicity & Info Secretary" },
      { name: "Gibson Rauwe", role: "Competitions Coordinator" },
      { name: "Hlanganani Digwere", role: "Additional Member" },
      { name: "Healer Modiradilo", role: "SDO" },
    ],
    affiliations: [
      "Zone 6",
      "Africa Boxing Confederation (ABC)",
      "Amateur International Boxing Association (AIBA)",
      "Botswana National Olympic Committee (BNOC)",
      "Botswana National Sport Commission (BNSC)",
    ],
    founded: "1974",
    description:
      "Boxing in Botswana started in Lobatse in the sixties. The Botswana Amateur Boxing Association (BABA) was registered with the Registrar of Societies in 1974.",
    vision:
      "To be the respectable Boxing Association that strives for excellence in Amateur Boxing Development in the Country.",
    mission:
      "To produce World class Amateur Boxers through Youth Development Programmes and Development of highly trained officials at all levels.",
  },

  {
    id: 7,
    name: "Botswana Bridge Federation",
    shortName: "BBF",
    sport: "Bridge",
    contact: {
      address: "P.O. Box 4728, Gaborone",
      email: "bridge@bnsc.co.bw",
      phone: null,
      website: null,
      patron: "Dr N.N. Mashalaba",
    },
    executive: [
      { name: "Letsogile Mafa", role: "President" },
      { name: "T. Jopi", role: "Vice President" },
      { name: "Lillian Pitoro (Mrs)", role: "Acting Secretary General" },
      { name: "Glod Maele", role: "Treasurer" },
      { name: "M. Mlilo", role: "PRO" },
      { name: "Keneilwe Mosomodi", role: "Adult Coordinator" },
      { name: "B. Ellece", role: "Youth Coordinator" },
    ],
    affiliations: [
      "Botswana National Sport Commission (BNSC)",
      "World Bridge Federation (WBF)",
      "African Bridge Federation (ABF)",
    ],
    founded: "1988",
    registeredWithBNSC: "1992",
    description:
      "The Botswana Bridge Federation (BBF) was established in 1988. The sport of Bridge was introduced in Botswana more than thirty years ago.",
    vision: "Sports for all, for leisure, health, employment and National Pride",
    mission:
      "To develop and promote Bridge throughout the country, develop competitive national teams and improved standards across the country.",
  },

  {
    id: 8,
    name: "Botswana Brigades Sports Association",
    shortName: "BOBSA",
    sport: "Brigades (Multi-Sport)",
    contact: {
      address: "Private Bag S4, Sebina",
      email: null,
      phone: null,
      website: null,
    },
    executive: [
      { name: "Mr Joseph Mtika", role: "President" },
      { name: "Mr Tefo Keaja", role: "Vice President" },
      { name: "Mr Mompoloki S. Lekoba", role: "General Secretary" },
      { name: "Mr B Sentsho", role: "Vice General Secretary" },
      { name: "Mr O. Modise", role: "Treasurer" },
      { name: "Neo Mmadintsi (Mrs)", role: "PRO" },
      { name: "Mr Mogomotsi Rhodes", role: "Additional Member" },
    ],
    affiliations: [],
    founded: "1995",
    description:
      "BOBSA is a multi-sport organisation formed entirely to organise and run sports affairs of the Brigades of Botswana.",
    vision:
      "BOBSA to be an acknowledged force in sport and health nationally and regionally.",
    mission:
      "BOBSA aims at providing sports development through competitive administration, improvement of technical skills, marketing of trainees' competencies, constructive leisure, interaction and promotion of health.",
  },

  {
    id: 9,
    name: "Botswana Chess Federation",
    shortName: "BCF",
    sport: "Chess",
    contact: {
      address: "P.O. Box 41090, Gaborone",
      email: "bcf@botsnet.bw",
      phone: "3500636",
      cell: "71323563",
      website: null,
    },
    executive: [
      { name: "Motlhokomedi Thabano", role: "President" },
      { name: "Roger Tiroyamodimo", role: "Vice President Administration" },
      { name: "Kelapile Kelatlhilwe", role: "Vice President Technical" },
      { name: "Mokwaledi Tingwe", role: "Secretary General" },
      { name: "Samuel Motlhala", role: "Treasurer" },
      { name: "Kutlwanpo Tatolo", role: "PRO" },
      { name: "Michael Mabaiwa", role: "Technical & Ratings Director" },
      { name: "Lesego Selemogwe", role: "Development Director" },
      { name: "Tshenolo Maruatona", role: "Member" },
    ],
    affiliations: [
      "Botswana National Sport Commission (BNSC)",
      "African Chess Union (ACU)",
      "Federation International Des Echecs (FIDE)",
    ],
    founded: null,
    registeredWithBNSC: "1982",
    description:
      "Botswana Chess Federation is a non-profit making organisation affiliated to BNSC (1982), ACU (1982) and FIDE (1982).",
    vision:
      "BCF will, in partnership with its stakeholders, make Botswana one of the best chess playing nations in the region and across the continent.",
    mission:
      "BCF is committed to cultivate the game of chess among the youngest stakeholders of our society.",
  },

  {
    id: 10,
    name: "Botswana Cricket Association",
    shortName: "BCA",
    sport: "Cricket",
    contact: {
      address: "Private Bag 00379, Gaborone",
      email: "girishr@cricketbotswana.org.bw",
      phone: null,
      website: "www.cricketbotswana.org.bw",
    },
    executive: [
      { name: "Ebrahim A. Bhamjee", role: "Chairperson" },
      { name: "Altaf Parekh", role: "Vice Chairperson" },
      { name: "Ahmed Fazal Sheriff", role: "Acting CEO / Secretary General" },
      { name: "Girish Ramakrishna", role: "Tournament Director" },
      { name: "Sumod Damodar", role: "PRO Secretary" },
      { name: "Madhu Menon (LCC)", role: "Treasurer" },
      { name: "Praful Jog (NCC)", role: "Proposer" },
    ],
    affiliations: [
      "International Cricket Council (ICC)",
      "Zone VI Cricket Association",
      "Africa Cricket Association",
    ],
    founded: "1979",
    affiliatedToICC: "2002",
    description:
      "The Botswana Cricket Association (BCA) was first convened in 1979. BCA achieved Affiliate Membership of the International Cricket Council (ICC) in 2002.",
    vision:
      "To ensure that cricket is spread to all people of Botswana, with a particular emphasis on grassroots levels.",
    mission: "Bringing Cricket to the Nation",
  },

  {
    id: 11,
    name: "Botswana Hockey Association",
    shortName: "BHA",
    sport: "Hockey",
    contact: {
      address: "Private Bag 0069, Gaborone",
      email: "botswanahockey@yahoo.com",
      phone: null,
      website: null,
    },
    executive: [
      { name: "Unaswi Matebu (Ms)", role: "Chairperson" },
      { name: "Dear Ramajalwa", role: "Vice Chairperson" },
      { name: "Koketso Ludwig", role: "Treasurer" },
      { name: "Bongani Nsumiwa", role: "Coaching & Development Coordinator" },
      { name: "Thoriso Bogwasi", role: "Member" },
    ],
    affiliations: [
      "Botswana National Sport Commission (BNSC)",
      "Botswana National Olympic Committee (BNOC)",
      "African Hockey Federation",
      "International Hockey Federation",
    ],
    founded: "1992-08",
    description:
      "The Botswana Hockey Association was formed in August 1992.",
    mission:
      "Botswana Hockey Association shall strive to promote, develop and facilitate the sport of hockey throughout Botswana with emphasis on participation, interest, interaction and enjoyment from a larger base of players.",
  },

  {
    id: 12,
    name: "Botswana Cycling Association",
    shortName: "BCA",
    sport: "Cycling",
    contact: {
      address: "P.O. Box 20024, Gaborone",
      email: null,
      phone: null,
      website: null,
    },
    executive: [
      { name: "Mmetla Masire", role: "President" },
      { name: "Moagi Sewawa", role: "Vice President" },
      { name: "Shimane Serameng", role: "Secretary General" },
      { name: "Game Mompe", role: "Vice Secretary General" },
      { name: "Karabo Rasenyai", role: "Treasurer" },
      { name: "Kelly Ramputswa-Tlale", role: "Member" },
      { name: "Shadrach Tirelo", role: "Member" },
    ],
    affiliations: ["Botswana National Sport Commission (BNSC)"],
    founded: null,
    acceptedByBNSC: "2009-11",
    description:
      "The BCA was accepted as a member of the BNSC in November 2009.",
    memberClubs: [
      "Gaborone Cycling Club",
      "Tsela Riders Cycling Club",
      "BMX Club Botswana",
    ],
  },

  {
    id: 13,
    name: "Botswana Dance Sport Association",
    shortName: "BODANSA",
    sport: "Dance Sport",
    contact: {
      address:
        "C/O Business Support Centre, Suite 186, Private Bag 00324, Gaborone",
      email: "bodansa@bnsc.co.bw",
      emailAlt: "bodansa@gmail.com",
      phone: null,
      website: null,
    },
    executive: [
      { name: "Tiroeaone Ntsima", role: "President" },
      { name: "Mothusi Sebego", role: "Vice President" },
      { name: "Abednico Tshambane", role: "Secretary General" },
      { name: "Tumelo Ekenyane", role: "Vice Secretary General" },
      { name: "Treasure Mothobi", role: "Treasurer" },
      { name: "Ms Janet Masebe", role: "Publicity Secretary" },
      { name: "Mrs Betty Gaamangwe", role: "Additional Member" },
      { name: "Mogomotsi Bolaane", role: "Additional Member" },
      { name: "Karabo Kemoabe", role: "Additional Member" },
      { name: "Tshepo Mokhuchedi", role: "Administration Officer" },
    ],
    affiliations: [
      "Botswana National Sport Commission (BNSC)",
      "Botswana National Olympic Committee (BNOC)",
      "Southern African Dance Sport Federation",
      "International Dance Sport Association (IDSF)",
    ],
    founded: null,
    originalName: "Botswana Ballroom Dance Association (BBDA)",
    renamedDate: "2003-04",
    acceptedByBNOC: "2009-07",
    description:
      "BODANSA was first registered as Botswana Ballroom Dance Association and changed its name in April 2003 after its mother body IDSF was accepted into the Olympic family.",
    memberSchools: 60,
    approximateAthletes: 500,
  },

  {
    id: 14,
    name: "Botswana Darts Association",
    shortName: "BODA",
    sport: "Darts",
    contact: {
      address: "P.O. Box 3146, Gaborone",
      email: null,
      phone: null,
      website: null,
    },
    executive: [
      { name: "Buyani Zongwani", role: "President" },
      { name: "Samuel Noga", role: "Vice President" },
      { name: "Mothusi Moakofi", role: "General Secretary" },
      { name: "Keitumetse Makhale", role: "Recording Secretary" },
      { name: "Kerataone Leririma", role: "Treasurer" },
      { name: "Thato Maphorisa", role: "PRO" },
      { name: "Victor Wolfenden", role: "Tournament Director" },
      { name: "Ms Machena Robert", role: "Youth Director" },
    ],
    affiliations: [
      "Botswana National Sport Commission (BNSC)",
      "Zone VI Federation",
      "World Darts Federation (WDF)",
    ],
    founded: "1983",
    description:
      "Botswana Darts Association (BODA) is a national body responsible for the organisation and promotion of the game of darts in Botswana, formed and registered in 1983.",
  },

  {
    id: 15,
    name: "Botswana Football Association",
    shortName: "BFA",
    sport: "Football",
    contact: {
      address: "P.O. Box 1396, Gaborone",
      email: "bfa@bfa.co.bw",
      phone: "3900279 / 3974997",
      fax: "3900280",
      direct: "3906220 / 3974956",
      website: "www.bfa.co.bw",
    },
    executive: [
      { name: "McClean Letshwiti", role: "President" },
      { name: "Mfolo Edwin Mfolo", role: "CEO" },
      { name: "Segolame Ramotlhwa", role: "1st Vice President - Admin" },
      { name: "Marshlow P. Motlogelwa", role: "2nd Vice President - Technical" },
      { name: "Eatametse Olopeng", role: "Additional Member" },
      { name: "Sesenki Sesinyi", role: "Additional Member" },
      { name: "Mrs Suzie Montsho", role: "Additional Member" },
      { name: "Masego Nchingane", role: "Additional Member" },
      { name: "Rapula Okaile", role: "Premier League Representative" },
      { name: "Samuel Keitireng", role: "1st Division Representative" },
      { name: "Tokyo Modise", role: "Western Bloc Representative" },
      { name: "Philemon Bunu", role: "Northern Bloc Representative" },
      { name: "Thapelo Otimile", role: "Southern Bloc Representative" },
      { name: "Reiger Mothoagae", role: "Eastern Bloc Representative" },
      { name: "Sipho Ziga", role: "Legal Advisor" },
    ],
    affiliations: [
      "Botswana National Sport Commission (BNSC)",
      "Federation Internationale de Football Association (FIFA)",
      "Confederation of African Football (CAF)",
      "Council of Southern African Football Associations (COSAFA)",
    ],
    founded: "1970",
    affiliatedToFIFA: "1978",
    description:
      "The Botswana Football Association was founded in 1970 (then known as BNFA) and affiliated to FIFA in 1978.",
    regionalAssociations: 16,
    registeredClubs: 200,
    leagues: {
      premier: { teams: 16 },
      firstDivision: { north: 12, south: 12 },
    },
  },

  {
    id: 16,
    name: "Botswana Golf Union",
    shortName: "BGU",
    sport: "Golf",
    contact: {
      address: "P.O. Box 1033, Gaborone",
      email: "bgu@bgu.org.bw",
      phone: "3161116",
      fax: "3911872",
      golfClub: "3912262",
      website: null,
    },
    executive: [
      {
        name: "Pius Molefe",
        role: "President",
        email: "molefep@bbs.co.bw",
        phone: "71307468",
      },
      {
        name: "Modiri Phuthego",
        role: "Vice President Admin",
        email: "modirip@hollard.co.bw",
        phone: "71601582",
      },
      {
        name: "Bekezele Mbakile",
        role: "Vice President Ladies",
        phone: "71332920",
      },
      {
        name: "Godfrey Gorogodo",
        role: "Vice President Development",
        email: "ggorogodo@debswana.bw",
      },
      {
        name: "Simon Ramphethu",
        role: "Treasurer",
        email: "s.ramphethu@botash.bw",
      },
      { name: "Dikgang Lemogang", role: "Additional Member" },
      { name: "Segopotso Bathobakae", role: "Additional Member" },
    ],
    affiliations: ["Botswana National Sports Council (BNSC)"],
    founded: null,
    description:
      "The Botswana Golf Union was registered under the Societies Act cap 18.01 of 1972.",
    registeredClubs: 10,
    playingCourses: [
      "Francistown",
      "Gaborone (x2)",
      "Lobatse",
      "Jwaneng",
      "Selibe Phikwe",
      "Sowa",
      "Orapa",
    ],
    vision:
      "We will produce world-class players capable of competing in the International European Professional Golf Association.",
    mission:
      "Botswana Golf Union strives to promote, regulate and improve the conduct and standard of golf in an efficient, effective and transparent manner.",
  },

  {
    id: 17,
    name: "Botswana Integrated Sports Association",
    shortName: "BISA",
    sport: "Integrated Sports (Secondary Schools)",
    contact: {
      address: "P.O. Box 80310, Gaborone",
      email: "bisa@bnsc.co.bw",
      phone: "71643482",
      website: null,
    },
    executive: [
      { name: "Joshua Gaotlhobogwe", role: "President" },
      { name: "Joy Kenosi", role: "Vice President Technical" },
      { name: "Harold Mosomane", role: "Secretary General" },
      { name: "Oreeditse Marakakgoro", role: "Vice Secretary General" },
      { name: "Tapiwa Mokoka Kengaletswe", role: "Treasurer" },
      { name: "Letsweletse Jonas", role: "Publicity Secretary" },
    ],
    affiliations: [
      "Botswana National Sport Commission (BNSC)",
      "Confederation of Schools Sports Associations of Southern Africa (COSSASA)",
    ],
    founded: null,
    description:
      "Botswana Integrated Sports Association (BISA) is the sole authority on Secondary Schools' sports in Botswana.",
    sportCodes: [
      "Athletics",
      "Basketball",
      "Badminton",
      "Boxing",
      "Football",
      "Karate",
      "Netball",
      "Softball",
      "Table Tennis",
      "Tennis",
      "Volleyball",
    ],
    operationalZones: ["South", "South Central", "North Central", "North"],
    vision:
      "Secondary school sports for leisure, health, self-development, and excellence.",
    mission:
      "We shall provide an opportunity for skills development through sports participation and help all to appreciate the value of sports through effective planning and management.",
  },

  {
    id: 18,
    name: "Botswana Judo Federation",
    shortName: "BJF",
    sport: "Judo",
    contact: {
      address: "P O Box 2316, Gaborone",
      email: "botswanajudo@it.bw",
      emailAlt: "judo@bnsc.co.bw",
      phone: null,
      website: null,
    },
    executive: [
      { name: "Japeta Letsholo", role: "President" },
      { name: "Kingsley Segokotlo", role: "Vice President" },
      { name: "Gaongalelwe Morris", role: "Secretary General" },
      { name: "Enerst Mathopa", role: "Treasurer" },
      { name: "Ishmael Thaga", role: "Development Director" },
      { name: "Patricia Nthibo", role: "Marketing Director" },
      { name: "Kgosipula Kaupa", role: "Sport Director" },
      { name: "Stephen Pheko", role: "Additional Member" },
    ],
    affiliations: [
      "Botswana National Sport Commission (BNSC)",
      "Botswana National Olympic Committee (BNOC)",
      "Zone VI Judo Association",
      "Commonwealth Judo Association (CJA)",
      "African Judo Union (AJU)",
      "International Judo Federation (IJF)",
    ],
    founded: "1996",
    originalName: "Botswana Amateur Judo Association",
    renamedDate: "2009-03",
    description:
      "The Botswana Amateur Judo Association was formed and registered in 1996. In March 2009, the name was changed to Botswana Judo Federation (BJF).",
    vision:
      "By the year 2012 Botswana judo will be widely recognised as a dynamic and growing sport with a high profile, significantly increased membership and improved national and international representation.",
  },

  {
    id: 19,
    name: "Botswana Karate Association",
    shortName: "BOKA",
    sport: "Karate",
    contact: {
      address: "P.O. Box 40010, Gaborone",
      email: "boka@botsnet.bw",
      phone: null,
      website: null,
    },
    executive: [
      {
        name: "Mr. Mpho Bakwadi",
        role: "President",
        phone: "71 302 222",
        email: "mbakwadi2005@gmail.com",
      },
      {
        name: "Mr. Moemedi Nthapeleng",
        role: "Vice President (Admin)",
        phone: "71 848 623",
      },
      {
        name: "Mr. Union Kgafela",
        role: "Vice President - Technical",
        phone: "71 446 229",
        email: "ukgafela@gmail.com",
      },
      {
        name: "Mr. Dick Othusitse Tshepang",
        role: "Secretary General",
        phone: "74 350 184",
        email: "tshepangdick1@gmail.com",
      },
      {
        name: "Mr. Keorapetse Dube",
        role: "Public Relations Officer",
        phone: "77 157 969",
        email: "keorapetsedube@gmail.com",
      },
      {
        name: "Ms. Kemmonye Seletamotse",
        role: "Treasurer",
        phone: "72 876 490",
      },
      {
        name: "Mr. Francois Alberts",
        role: "Vice Secretary General",
        phone: "71 303 227",
      },
    ],
    affiliations: [
      "Botswana National Sport Commission (BNSC)",
      "Zone VI",
      "Union of African Karate (UFKA)",
      "World Karate Federation (WKF)",
    ],
    founded: "1980",
    description:
      "The Botswana Karate Association (BOKA) was established in 1980. Karate was practiced in Botswana from the late 1960s and introduced to schools around 1979.",
    vision:
      "Karate for all, for health, recreation, self defence, employment and character building for a more civic and prestigious society.",
    federations: 5,
  },

  {
    id: 20,
    name: "Botswana Motor Sport",
    shortName: "BMS",
    sport: "Motor Sports",
    contact: {
      address: "P.O. Box 1404, Gaborone",
      email: null,
      phone: "+267 367 4110",
      fax: "3016076",
      website: null,
    },
    executive: [
      { name: "Kagiso Modibedi", role: "President" },
      { name: "Roseline Mamaloukos", role: "Vice President" },
      { name: "Tefo Dithapo", role: "General Secretary" },
      { name: "Gomolemo Chibana", role: "Head of FIM" },
      { name: "Thabiso Seobamo", role: "Head of FIA" },
      { name: "Thuso Majaha", role: "Treasurer" },
      { name: "Joseph Khengere", role: "PRO" },
    ],
    affiliations: ["FIA", "FIM"],
    founded: null,
    description:
      "Botswana Motor Sport (BMS) ensures that motorsport and leisure cycling are run according to the regulations that govern motorsport throughout the world.",
    vision: "To Achieve Excellence and Recognition in Motor Sport for Botswana.",
    mission:
      "To Provide Facilities, Training, and Encouragement for the Participation and Promotion of Motor Sport in Botswana with Proper Consideration for our Environment.",
  },

  {
    id: 21,
    name: "Botswana Netball Association",
    shortName: "BNA",
    sport: "Netball",
    contact: {
      address: "P O Box 236, Gaborone",
      email: "bonanetball@yahoo.com",
      phone: "3500945",
      website: null,
    },
    executive: [
      { name: "Malebo Raditladi", role: "President" },
      { name: "Oteng Masole", role: "Vice President - Technical" },
      {
        name: "Seipei Gaelesiwe",
        role: "Vice President - Projects & Events",
      },
      {
        name: "Kgololesego Freedom Diraditsile",
        role: "Secretary General",
      },
      { name: "Onicah Letshwenyo-Ramocha", role: "Treasurer" },
      { name: "Theresa Hirschfeld", role: "Marketing & PRO" },
      { name: "Masego Serumola", role: "Sport Development Officer" },
    ],
    affiliations: [
      "International Federation of Netball Associations (IFNA)",
      "COSANA",
    ],
    founded: "late 1970s",
    description:
      "The Botswana Netball Association was formed in the late seventies.",
    vision:
      "Netball shall be the number one code at all levels in the country by 2012 in the achievement of quality results locally, regionally and internationally.",
    mission:
      "Botswana Netball Association exists to provide a platform for recreation and meaningful competition through highly qualified personnel, partnership and teamwork.",
    zones: ["Southern", "Northern"],
    gradedUmpires: {
      cosana: 7,
      local: 30,
    },
    trainedCoaches: 22,
  },

  {
    id: 22,
    name: "Botswana Rugby Union",
    shortName: "BRU",
    sport: "Rugby",
    contact: {
      address:
        "Postnet Kgale View, Private Bag 00351, Suite 231, Gaborone",
      email: "bru@botswanarugbyunion.co.bw",
      phone: "390 2425 / 26",
      fax: "3902411",
      website: null,
    },
    executive: [
      { name: "Sean Irish", role: "President" },
      { name: "Bob Ofentse Lekan", role: "Vice President Administration" },
      { name: "Thusego Segaise", role: "Vice President Technical" },
      { name: "Boitshoko Tsiane", role: "Treasurer" },
      { name: "Vincent Mashaya", role: "Additional Member" },
      { name: "Mpho Masisi", role: "Additional Member" },
      { name: "Donald Kandima", role: "Additional Member" },
      { name: "Ms. Keneilwe Modise", role: "Coach" },
      { name: "Kinsley Dobrowsky", role: "Additional Member" },
      { name: "Kakanyo Mashaba", role: "Office Administration" },
      { name: "Zee Khumalo", role: "Member" },
      { name: "Dave Gilbert", role: "Member" },
      { name: "Fredrick Kebadiretse", role: "Member" },
    ],
    affiliations: [
      "International Rugby Board (IRB)",
      "Confederation of African Rugby (CAR)",
      "Botswana National Sports Council (BNSC)",
    ],
    founded: "1992",
    affiliatedToIRB: "1994",
    affiliatedToBNSC: "1997",
    affiliatedToCAR: "2000",
    description:
      "Club rugby has been in existence since the 70s. The Botswana Rugby Union was formally formed in 1992.",
    schoolsPlaying: 30,
    ladiesTeams: 6,
    vision:
      "To be recognised as the best run and most competitive rugby union amongst the unions affiliated to IRB, CAR and to BNSC.",
    mission:
      "To promote, develop and manage the game of rugby in a manner that will ensure wide participation and continuously improve standards of excellence in a safe and responsible manner.",
  },

  {
    id: 23,
    name: "Botswana Softball Association",
    shortName: "BSA",
    sport: "Softball",
    contact: {
      address: "P.O. Box 319, Gaborone",
      email: null,
      phone: "3901 340",
      website: null,
    },
    executive: [
      { name: "Thabo Thamane", role: "President" },
      { name: "Gontlafetse Batsetswe", role: "Vice President" },
      { name: "Ms Anastacia Tsuna Makwa", role: "Secretary General" },
      { name: "Rijn Shagwa", role: "Treasurer" },
      { name: "McDonald Fologang", role: "Competition Organiser" },
      { name: "Ms Kelebogile Seitei", role: "PR/Marketing" },
      { name: "Ms Olga Khumoetsile", role: "Legal Affairs Adviser" },
      { name: "Kabelo Kwape", role: "Technical Development" },
      { name: "Abel Mataboge", role: "Umpire in Chief" },
      { name: "Justus Kuswane", role: "General Manager North" },
      { name: "Ms Kelebogile Ditsele", role: "General Manager South" },
      { name: "Ms Masego Moiya", role: "BISA National Coordinator" },
    ],
    affiliations: [
      "Botswana National Sport Council (BNSC)",
      "Supreme Council for Sports in Africa Zone VI Confederation",
      "African Baseball and Softball Association (ABSA)",
      "International Softball Federation (ISF)",
      "Botswana National Olympic Committee (BNOC)",
    ],
    founded: "1977",
    description:
      "The Botswana Softball Association (BSA) was formed in 1977. Softball was introduced in the early 70s through the American Peace Corps.",
    activeTeams: 37,
    womenTeams: 16,
    approxActivePlayers: 1000,
    vision: "Softball; the Diamond Sport of Botswana by the year 2009.",
    mission:
      "Botswana Softball Association exists to promote and co-ordinate the development of softball as both leisure and a competitive sport locally and internationally.",
  },

  {
    id: 24,
    name: "Botswana Swimming Sport Association",
    shortName: "BSSA",
    sport: "Swimming",
    contact: {
      address: "P O Box 163, Gaborone",
      email: "botswanaswimming@gmail.com",
      phone: null,
      website: null,
    },
    executive: [
      { name: "Ms Ruth Van Der Merwe", role: "Chairperson" },
      { name: "Andrew W Freeman", role: "Vice Chairperson" },
      { name: "Mrs Sibongile Ruele", role: "Secretary General" },
      { name: "Timothy K Maje", role: "Assistant Secretary General" },
      { name: "Mrs Sikhangezile K. Bekker", role: "Treasurer" },
      { name: "Mokwadi Montsheki", role: "Additional Member" },
    ],
    affiliations: [],
    founded: null,
    description:
      "Botswana Swimming Sport Association oversees competitive swimming in Botswana.",
  },

  {
    id: 25,
    name: "Botswana Table Tennis Association",
    shortName: "BTTA",
    sport: "Table Tennis",
    contact: {
      address: "Private Bag 00147, Gaborone",
      email: "BTTA@rocketmail.com",
      phone: "3952 516",
      fax: "3952 516",
      website: null,
    },
    executive: [
      { name: "Kudzanani Motswagole", role: "President" },
      { name: "William Olyn", role: "Secretary General" },
      { name: "Oabona Raditloko (Ms)", role: "Treasurer" },
      { name: "Kabo Mosarwe", role: "Tournament Secretary" },
      { name: "Katlego Nkwakweng (Ms)", role: "Youth Development Manager" },
      { name: "Tiro Motswasele", role: "PRO" },
      { name: "Shiev Pal", role: "Additional Member" },
    ],
    affiliations: [
      "Botswana National Sports Council (BNSC)",
      "Botswana National Olympic Committee (BNOC)",
      "Botswana Integrated Sports Association (BISA)",
      "Botswana Brigades Sports Associations (BOBSA)",
      "Botswana Tertiary Students Sports Association (BOTESSA)",
      "Africa Table Tennis Federation (ATTF)",
      "International Table Tennis Federation (ITTF)",
      "Confederation of Zone VI Table Tennis Federations",
    ],
    founded: "1994",
    description:
      "Botswana Table Tennis Association (BTTA) was formed in 1994 and has been pivotal in the development of table tennis as a competitive sport in Botswana.",
  },

  {
    id: 26,
    name: "Botswana Tertiary Student Sports Association",
    shortName: "BOTESSA",
    sport: "Tertiary Sports (Multi-Sport)",
    contact: {
      address: "P O Box 46197, Gaborone",
      email: "botessa@bnsc.co.bw",
      phone: "3901305",
      fax: "3901352",
      cell: "74306742",
      website: null,
    },
    executive: [
      { name: "Keorapetse Setlhare", role: "President" },
      { name: "Mompati Molefe", role: "Vice President - Admin" },
      { name: "Tebogo Kgari", role: "Vice President - Technical" },
      { name: "Moreetsi Kediseng", role: "Secretary General" },
      { name: "Botho Thobega", role: "Vice Secretary General" },
      { name: "Thokgamo Nyathi", role: "Treasurer" },
      { name: "Duncan Segabo", role: "Publicity Secretary" },
    ],
    affiliations: [
      "Confederation of Colleges and Universities in Southern Africa (CUCSA)",
      "African University Sports Federation (FASU)",
      "International University Sports Federation (FISU)",
    ],
    founded: null,
    description:
      "Botswana Tertiary Student Sports Association (BOTESSA) is the umbrella body for all sports codes of the tertiary institutions of Botswana.",
    motto: "Developing the body and mind",
    brackets: {
      A: [
        "Francistown College of Education",
        "Tonota College of Education",
        "Serowe College of Education",
        "Tlokweng College of Education",
        "Lobatse College of Education",
        "Molepolole College of Education",
      ],
      B: [
        "University Of Botswana",
        "Botswana College of Agriculture",
        "Botswana Institute of Administration and Commerce",
        "Botswana Police College",
        "Lobatse Institute Of Health Sciences",
        "Molepolole Institute Of Health Sciences",
        "Gaborone Institute Of Health Sciences",
        "Serowe Institute Of Health Sciences",
        "Francistown Institute Of Health Sciences",
        "DRM School of Nursing",
      ],
      C: [
        "Gaborone Technical College",
        "Selebi Phikwe Technical College",
        "Palapye Technical College",
        "Automotive Training College",
        "Wildlife Training Institute",
        "Jwaneng Technical College",
        "Orapa Technical College",
        "Maun Technical College",
        "Roads Training Centre",
      ],
    },
  },

  {
    id: 27,
    name: "Botswana Traditional Sports & Games Confederation",
    sport: "Traditional Games",
    contact: {
      address: null,
      email: null,
      phone: null,
      website: null,
    },
    executive: [
      { name: "Kenneth Tebogo Middleton", role: "President" },
      { name: "Evans Kesiilwe", role: "Vice President" },
      { name: "Kebalepile Maikano", role: "Secretary General" },
      { name: "Nkubingangani Kabo Magama", role: "Vice Secretary General" },
      { name: "Batswana Basimolodi", role: "Treasurer" },
      { name: "Kingsley Mathwanye", role: "Additional Member" },
      { name: "Dorcas Ragono", role: "Additional Member" },
      { name: "Nkanyezi Sebina", role: "Additional Member" },
      { name: "Sifiso Hilton Dodana", role: "Additional Member" },
    ],
    affiliations: [],
    founded: null,
    description: null,
  },

  {
    id: 28,
    name: "Botswana Volleyball Federation",
    shortName: "BVF",
    sport: "Volleyball",
    contact: {
      address: "P.O. Box 1917, Gaborone",
      email: "bvf@botsnet.bw",
      phone: "3161448 / 408 / 3939483",
      fax: "3161544",
      website: null,
    },
    executive: [
      { name: "Daniel Molaodi", role: "President" },
      { name: "Ndibo Lebala", role: "Vice President Administration" },
      { name: "George Keotsenye", role: "Vice President Technical" },
      { name: "Moabi Tlalampe", role: "Treasurer" },
      { name: "Tebogo Tsie", role: "Additional Member" },
    ],
    affiliations: [
      "Botswana National Sport Commission (BNSC)",
      "Botswana National Olympic Committee (BNOC)",
      "Federation of International Volleyball (FIVB)",
      "Confederation of African Volleyball (CAVB)",
      "CAVB Zone Six",
    ],
    founded: "1979",
    description:
      "Botswana Volleyball Federation (BVF) was formed in 1979 with 3 clubs and has grown tremendously over the years.",
    affiliatedTeams: 44,
    activePlayers: 500,
    playerGenderSplit: { men: "55%", women: "45%" },
    annualBudget: "P500 000",
    budgetBreakdown: {
      government: "60%",
      privateSector: "35%",
      fundraising: "5%",
    },
    zoneCountries: [
      "Botswana",
      "Lesotho",
      "Swaziland",
      "Zambia",
      "Zimbabwe",
      "Mozambique",
      "South Africa",
      "Angola",
      "Malawi",
      "Namibia",
    ],
  },

  {
    id: 29,
    name: "Botswana Weightlifting Federation",
    shortName: "BBWFF",
    fullName: "Botswana Body Building and Weight Lifting Federation",
    sport: "Weight Lifting",
    contact: {
      address: "C/O P O Box 405533, Broadhurst, Gaborone",
      email: null,
      phone: null,
      website: null,
    },
    executive: [
      { name: "Col. Joseph Mathambo", role: "President" },
      { name: "Mr A. Makara", role: "Vice President / Technical" },
      { name: "Mr. Dikgang Kopi", role: "Vice President Admin" },
      { name: "Mr Alex K. Rankgwe", role: "Secretary General" },
      { name: "Ms. Keletso Chibana", role: "Treasurer" },
      { name: "Mr. H. Mabutho", role: "Assistant Secretary" },
      { name: "Mr. C. Boshomane", role: "Member" },
      { name: "Dick Obonwakae", role: "Member (Bodybuilding)" },
      { name: "Mr Omondi Collins", role: "Member" },
    ],
    affiliations: [],
    founded: "early 1980s",
    description:
      "The sport's origins in Botswana can be traced back to the early 1980s. Competitions became common in the early 1990s when it was introduced in the Botswana Defence Force.",
    registeredTeams: 12,
    vision:
      "To lead and promote the sport of weightlifting and bodybuilding in Botswana in line with the national sport vision.",
    mission:
      "BBWFF shall strive to bring the sport of weightlifting and bodybuilding to its highest attainable standard.",
  },

  {
    id: 30,
    name: "Botswana Wrestling Federation",
    shortName: "BWF",
    sport: "Wrestling",
    contact: {
      address: "P O Box 2109, Selibe Phikwe",
      email: "Bot@fila-wrestling.com",
      phone: null,
      website: null,
    },
    executive: [
      { name: "Moagi Sharp", role: "President" },
      { name: "Elijah Ramotapa", role: "Vice President" },
      { name: "Ms Opelo Nthutang", role: "Secretary General" },
      { name: "Emmanuel Mpathi", role: "Treasurer" },
      { name: "Ms Portia Sharp", role: "Equipment Manager" },
      { name: "Daniel Golekanye", role: "Member" },
      { name: "Ms Annie Curtin", role: "Member" },
      { name: "Mooketsi Mosele", role: "Member" },
      { name: "Ms Basadi Mathula", role: "Member" },
      { name: "Tshepang Mmuso", role: "Member" },
    ],
    affiliations: [],
    founded: "2003",
    registered: "2010-01-19",
    registeredIn: "Selebi Phikwe",
    description:
      "Botswana Wrestling Federation was formed in 2003 and registered on the 19th January 2010 in Selebi Phikwe.",
    affiliatedClubs: [
      "Selebi Phikwe Wrestling Club",
      "Francistown Wrestling Club",
      "Maun Wrestling Club",
      "Ghanzi Wrestling Club",
      "Lobatse Wrestling Club",
      "Gaborone Wrestling Club",
      "Molepolole Wrestling Club",
      "Mahalapye Wrestling Club",
      "Palapye Wrestling Club",
      "Serowe Wrestling Club",
    ],
  },

  {
    id: 31,
    name: "Horse Society of Botswana",
    shortName: "HSB",
    sport: "Horse Riding / Equestrian",
    contact: {
      address:
        "C/O Information Solutions, Plot 63, Unit C2, GICP, Gaborone",
      email: "hsb@hsb.co.bw",
      phone: null,
      website: "www.hsb.co.bw",
    },
    executive: [
      { name: "Sean Hughes", role: "Chairperson" },
      { name: "Eileen Peinke", role: "Vice Chairperson" },
      { name: "Sandy Davies", role: "Secretary" },
      { name: "Clarisse Lau", role: "Treasurer" },
      { name: "Reinette van der Merwe", role: "Grading Secretary" },
      { name: "Norma Tsara", role: "Additional Member" },
      { name: "Dirkie Luus", role: "Additional Member" },
      { name: "Belinda Irish", role: "Additional Member" },
    ],
    affiliations: [
      "Botswana National Sport Commission (BNSC)",
      "Botswana National Olympic Committee (BNOC)",
      "Federation Equestre Internationale (FEI)",
    ],
    founded: "1988-06",
    associatedWithBNSC: "1989-09",
    fullAffiliate: "1992-02",
    memberOfFEI: "1993-05",
    memberOfBNOC: "2002",
    description:
      "The Horse Society of Botswana (HSB) was formed in June 1988.",
    disciplines: [
      "Dressage",
      "Endurance",
      "Eventing",
      "Showjumping",
      "Showing",
      "Vaulting",
    ],
    vision:
      "To see Equestrian sport enjoyed by all sectors of the Botswana community and to have Botswana represented at International events by competent sportspersons.",
    mission:
      "We aim to take Equestrian Sport to the people of Botswana by the establishment of an independent National Equestrian Facility.",
  },

  {
    id: 32,
    name: "Parachute Association of Botswana",
    sport: "Parachuting",
    contact: {
      address: null,
      email: null,
      phone: null,
      website: null,
    },
    executive: [],
    affiliations: [],
    founded: null,
    description: null,
  },

  {
    id: 33,
    name: "Paralympic Association of Botswana",
    shortName: "PASSOBO",
    sport: "Paralympics (Multi-Sport for persons with disabilities)",
    contact: {
      address: "P O Box 3368, Gaborone",
      email: null,
      phone: null,
      website: null,
    },
    executive: [
      { name: "David Moatshe", role: "President" },
      { name: "Titus Kebuileng", role: "Vice President" },
      { name: "Cynthia Masikara", role: "Secretary General" },
      { name: "Jacob Seamogo", role: "Vice General Secretary" },
      { name: "Thuso Rasetapa", role: "PRO" },
      { name: "Boikanyo Ratlou", role: "Additional Member" },
      { name: "Carinah Rahube-Rahube", role: "Additional Member" },
    ],
    affiliations: [
      "International Paralympics Committee (IPC)",
      "ASCOD",
      "Botswana National Sport Commission (BNSC)",
    ],
    founded: "2000",
    description:
      "Paralympics Association of Botswana (PASSOBO) is the mother body of all sport codes for people with disabilities in Botswana, established in 2000.",
    motto: "SPORT FOR ALL!",
    affiliatesCountrywide: 37,
    mission:
      "All persons have the right to play on recreational sports teams and must be given the opportunity to do so.",
  },

  {
    id: 34,
    name: "Special Olympics Botswana",
    shortName: "SOB",
    sport: "Special Olympics",
    contact: {
      address: "Private Bag 459, Gaborone / Plot 4792, Old Lobatse Road",
      email: "sob@bnsc.co.bw",
      phone: null,
      website: null,
    },
    executive: [
      { name: "Mrs Virginia France", role: "Secretary General" },
      { name: "Miss Nico Lebotse", role: "Vice Secretary" },
      { name: "Mrs Martha Tshwenyego", role: "Treasurer" },
      { name: "Mrs Annastacia Mhaladi-Mfila", role: "Family Representative" },
      { name: "Montisetse Popo", role: "Additional Member" },
      { name: "Patrick Mosotho", role: "Additional Member" },
      { name: "Mrs Serefete Molosiwa", role: "Additional Member" },
      { name: "Tebogo Ditlhokwa", role: "National Coordinator" },
      { name: "Ross Tebele", role: "MoE Representative / National Director", phone: "+267 71300864", email: "ross@pgglass.co.bw", fax: "+267 3907829" },
      { name: "Mrs Cleopatra Tsoebebe", role: "Member" },
      { name: "Modise Maphanyane", role: "Member" },
      { name: "Ms Nelly Malatsi", role: "Treasurer", phone: "+267 71309908" },
    ],
    affiliations: ["Special Olympics International"],
    founded: "1981",
    accredited: "1985",
    patron: "Olebile Masire (Former First Lady)",
    description:
      "Special Olympics Botswana was founded in 1981 and accredited by Special Olympics, Inc. in 1985.",
    mission:
      "To provide year-round sport training and athletic competition in a variety of Olympic-type sports for children and adults with intellectual disability.",
    registeredAthletes: 550,
    coaches: 40,
    volunteers: 50,
    familyMembers: 420,
    sportsOffered: [
      "Aquatics",
      "Athletics",
      "Soccer",
      "Judo",
      "Equestrian",
    ],
    oath: "Let me win. But if I cannot win, let me be brave in the attempt.",
  },
];

export default bnscAffiliates;

// Named exports for convenience
export const getAffiliate = (id) =>
  bnscAffiliates.find((a) => a.id === id) || null;

export const getAffiliatesBySport = (sport) =>
  bnscAffiliates.filter((a) =>
    a.sport.toLowerCase().includes(sport.toLowerCase())
  );

export const searchAffiliates = (query) => {
  const q = query.toLowerCase();
  return bnscAffiliates.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      (a.shortName && a.shortName.toLowerCase().includes(q)) ||
      a.sport.toLowerCase().includes(q)
  );
};

export const getAllSports = () => [...new Set(bnscAffiliates.map((a) => a.sport))];

export const totalAffiliates = bnscAffiliates.length;
