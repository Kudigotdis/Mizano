/**
 * MIZANO – BNSC Affiliated Associations Executive Profiles
 * Source: BNSC Affiliates Directory
 * 266 profiles · 34 associations (32 skipped: Parachute – no executives listed)
 *
 * Schema aligned with MIZANO_DATA.profiles (user_profiles_bw.js)
 * Extended fields: executive_role, sport_association, association_id, gender
 *
 * onboarding_level:
 *   2 = Senior office-bearers (President / Chairperson / CEO / VP / Secretary General / equivalent)
 *   1 = All other committee members
 *
 * capabilities:
 *   ["Creator"]              – all executives (sport administrators)
 *   ["Creator", "Guardian"]  – youth, development & SDO roles
 *
 * verified:  true  for Presidents / Chairpersons / CEOs only
 * whatsapp:  real number where published in source; placeholder otherwise
 */

window.MIZANO_DATA = window.MIZANO_DATA || {};

// ─── Raw executive roster ──────────────────────────────────────────────────────
// Columns: [display_name, executive_role, assoc_id, assoc_name, sport, location, gender, whatsapp?]
// Prefixes (Dr., Mr., Ms., Mrs., Miss, Col.) are stripped during profile generation.
const _bnscRaw = [

  /* ── 1 · Botswana Amateur Fencing Society ─────────────────────────────────── */
  ["Mandlenkosi Masuku",          "President",                         1, "Botswana Amateur Fencing Society",                  "Fencing",                   "Gaborone",       "Male"  ],
  ["Philani Mazibuko",            "Vice President",                    1, "Botswana Amateur Fencing Society",                  "Fencing",                   "Gaborone",       "Male"  ],
  ["Cecilia Boom",                "Secretary General",                 1, "Botswana Amateur Fencing Society",                  "Fencing",                   "Gaborone",       "Female"],
  ["Chawada Siku",                "Treasurer",                         1, "Botswana Amateur Fencing Society",                  "Fencing",                   "Gaborone",       "Male"  ],
  ["Ewetse Khama",                "PRO",                               1, "Botswana Amateur Fencing Society",                  "Fencing",                   "Gaborone",       "Male"  ],
  ["Karabo Thobega",              "Technical Director",                1, "Botswana Amateur Fencing Society",                  "Fencing",                   "Gaborone",       "Male"  ],
  ["Lorato Medupi",               "Additional Member",                 1, "Botswana Amateur Fencing Society",                  "Fencing",                   "Gaborone",       "Female"],
  ["Thuso Nakedi",                "Additional Member",                 1, "Botswana Amateur Fencing Society",                  "Fencing",                   "Gaborone",       "Male"  ],

  /* ── 2 · Botswana Athletics Association ───────────────────────────────────── */
  ["Phaphane Botlhale",           "President",                         2, "Botswana Athletics Association",                    "Athletics",                 "Gaborone",       "Male"  ],
  ["Raymond Phale",               "Vice President Finance",            2, "Botswana Athletics Association",                    "Athletics",                 "Gaborone",       "Male"  ],
  ["Tshepo Kelaotswe",            "Vice President Sports Development", 2, "Botswana Athletics Association",                    "Athletics",                 "Gaborone",       "Male"  ],
  ["Oabona Theetso",              "Vice President Admin",              2, "Botswana Athletics Association",                    "Athletics",                 "Gaborone",       "Male"  ],
  ["Dr Eric Mandawu",             "Coordinator",                       2, "Botswana Athletics Association",                    "Athletics",                 "Gaborone",       "Male"  ],
  ["Keamogetse Rancholo",         "Coordinator",                       2, "Botswana Athletics Association",                    "Athletics",                 "Gaborone",       "Female"],
  ["Amogelang Magugae",           "Coordinator",                       2, "Botswana Athletics Association",                    "Athletics",                 "Gaborone",       "Female"],
  ["Mpho Bagwasi",                "Coordinator",                       2, "Botswana Athletics Association",                    "Athletics",                 "Gaborone",       "Male"  ],

  /* ── 3 · Botswana Badminton Association ───────────────────────────────────── */
  ["Kunyalala H. Mphinyane",      "President",                         3, "Botswana Badminton Association",                    "Badminton",                 "Gaborone",       "Male",   "+267 5441797"],
  ["Moses Macheke",               "Vice President",                    3, "Botswana Badminton Association",                    "Badminton",                 "Gaborone",       "Male"  ],
  ["Thuso Mudungo",               "Secretary General",                 3, "Botswana Badminton Association",                    "Badminton",                 "Gaborone",       "Male"  ],
  ["Wame Maphosa",                "Treasurer",                         3, "Botswana Badminton Association",                    "Badminton",                 "Gaborone",       "Female"],
  ["Godwin O. Mathumo",           "Technical Director",                3, "Botswana Badminton Association",                    "Badminton",                 "Gaborone",       "Male"  ],
  ["Lesego Tsekane",              "Events Manager",                    3, "Botswana Badminton Association",                    "Badminton",                 "Gaborone",       "Female"],
  ["Barulagye Ncube",             "PRO",                               3, "Botswana Badminton Association",                    "Badminton",                 "Gaborone",       "Male"  ],

  /* ── 4 · Botswana Basketball Association ─────────────────────────────────── */
  ["Boineelo Hardy",              "President",                         4, "Botswana Basketball Association",                   "Basketball",                "Gaborone",       "Female"],
  ["Phineas Makgale",             "Vice President",                    4, "Botswana Basketball Association",                   "Basketball",                "Gaborone",       "Male"  ],
  ["Thatayaone Kgoadi",           "Secretary General",                 4, "Botswana Basketball Association",                   "Basketball",                "Gaborone",       "Male"  ],
  ["Mmoloki Njamela",             "Treasurer",                         4, "Botswana Basketball Association",                   "Basketball",                "Gaborone",       "Male"  ],
  ["Tirafalo Matsetse",           "Technical Director",                4, "Botswana Basketball Association",                   "Basketball",                "Gaborone",       "Male"  ],
  ["Abale Lesego",                "PRO",                               4, "Botswana Basketball Association",                   "Basketball",                "Gaborone",       "Female"],

  /* ── 5 · Botswana Bowling Association ────────────────────────────────────── */
  ["Kitso Robert",                "President",                         5, "Botswana Bowling Association",                      "Bowling",                   "Gaborone",       "Male"  ],
  ["Regent Reid",                 "Vice President",                    5, "Botswana Bowling Association",                      "Bowling",                   "Gaborone",       "Male"  ],
  ["Marea Modutlwa",              "Director of Bowls",                 5, "Botswana Bowling Association",                      "Bowling",                   "Gaborone",       "Female"],
  ["Mervyn Mitchell",             "Executive Member Finance",          5, "Botswana Bowling Association",                      "Bowling",                   "Gaborone",       "Male"  ],
  ["Edwin Nyoka",                 "Executive Secretary",               5, "Botswana Bowling Association",                      "Bowling",                   "Gaborone",       "Male"  ],
  ["Ookeditse Lekang",            "Competitions Secretary",            5, "Botswana Bowling Association",                      "Bowling",                   "Gaborone",       "Male"  ],
  ["Gasegarona Pabalelo",         "Treasurer",                         5, "Botswana Bowling Association",                      "Bowling",                   "Gaborone",       "Male"  ],

  /* ── 6 · Botswana Boxing Association ─────────────────────────────────────── */
  ["Thato Moses Patlakwe",        "President",                         6, "Botswana Boxing Association",                       "Boxing",                    "Gaborone",       "Male"  ],
  ["Dirang Thipe",                "Vice President",                    6, "Botswana Boxing Association",                       "Boxing",                    "Gaborone",       "Male"  ],
  ["Lefiri Moremi",               "Secretary General",                 6, "Botswana Boxing Association",                       "Boxing",                    "Gaborone",       "Male"  ],
  ["Frank Chigutshi",             "Treasurer",                         6, "Botswana Boxing Association",                       "Boxing",                    "Gaborone",       "Male"  ],
  ["Taolo Tlouetsile",            "Publicity & Info Secretary",        6, "Botswana Boxing Association",                       "Boxing",                    "Gaborone",       "Male"  ],
  ["Gibson Rauwe",                "Competitions Coordinator",          6, "Botswana Boxing Association",                       "Boxing",                    "Gaborone",       "Male"  ],
  ["Hlanganani Digwere",          "Additional Member",                 6, "Botswana Boxing Association",                       "Boxing",                    "Gaborone",       "Male"  ],
  ["Healer Modiradilo",           "SDO",                               6, "Botswana Boxing Association",                       "Boxing",                    "Gaborone",       "Male"  ],

  /* ── 7 · Botswana Bridge Federation ──────────────────────────────────────── */
  ["Letsogile Mafa",              "President",                         7, "Botswana Bridge Federation",                        "Bridge",                    "Gaborone",       "Male"  ],
  ["T. Jopi",                     "Vice President",                    7, "Botswana Bridge Federation",                        "Bridge",                    "Gaborone",       "Male"  ],
  ["Lillian Pitoro",              "Acting Secretary General",          7, "Botswana Bridge Federation",                        "Bridge",                    "Gaborone",       "Female"],
  ["Glod Maele",                  "Treasurer",                         7, "Botswana Bridge Federation",                        "Bridge",                    "Gaborone",       "Male"  ],
  ["M. Mlilo",                    "PRO",                               7, "Botswana Bridge Federation",                        "Bridge",                    "Gaborone",       "Male"  ],
  ["Keneilwe Mosomodi",           "Adult Coordinator",                 7, "Botswana Bridge Federation",                        "Bridge",                    "Gaborone",       "Female"],
  ["B. Ellece",                   "Youth Coordinator",                 7, "Botswana Bridge Federation",                        "Bridge",                    "Gaborone",       "Male"  ],

  /* ── 8 · Botswana Brigades Sports Association ─────────────────────────────── */
  ["Joseph Mtika",                "President",                         8, "Botswana Brigades Sports Association",               "Multi-Sport",               "Sebina",         "Male"  ],
  ["Tefo Keaja",                  "Vice President",                    8, "Botswana Brigades Sports Association",               "Multi-Sport",               "Sebina",         "Male"  ],
  ["Mompoloki S. Lekoba",         "General Secretary",                 8, "Botswana Brigades Sports Association",               "Multi-Sport",               "Sebina",         "Male"  ],
  ["B. Sentsho",                  "Vice General Secretary",            8, "Botswana Brigades Sports Association",               "Multi-Sport",               "Sebina",         "Male"  ],
  ["O. Modise",                   "Treasurer",                         8, "Botswana Brigades Sports Association",               "Multi-Sport",               "Sebina",         "Male"  ],
  ["Neo Mmadintsi",               "PRO",                               8, "Botswana Brigades Sports Association",               "Multi-Sport",               "Sebina",         "Female"],
  ["Mogomotsi Rhodes",            "Additional Member",                 8, "Botswana Brigades Sports Association",               "Multi-Sport",               "Sebina",         "Male"  ],

  /* ── 9 · Botswana Chess Federation ───────────────────────────────────────── */
  ["Motlhokomedi Thabano",        "President",                         9, "Botswana Chess Federation",                         "Chess",                     "Gaborone",       "Male"  ],
  ["Roger Tiroyamodimo",          "Vice President Administration",     9, "Botswana Chess Federation",                         "Chess",                     "Gaborone",       "Male"  ],
  ["Kelapile Kelatlhilwe",        "Vice President Technical",          9, "Botswana Chess Federation",                         "Chess",                     "Gaborone",       "Male"  ],
  ["Mokwaledi Tingwe",            "Secretary General",                 9, "Botswana Chess Federation",                         "Chess",                     "Gaborone",       "Male"  ],
  ["Samuel Motlhala",             "Treasurer",                         9, "Botswana Chess Federation",                         "Chess",                     "Gaborone",       "Male"  ],
  ["Kutlwanpo Tatolo",            "PRO",                               9, "Botswana Chess Federation",                         "Chess",                     "Gaborone",       "Male"  ],
  ["Michael Mabaiwa",             "Technical & Ratings Director",      9, "Botswana Chess Federation",                         "Chess",                     "Gaborone",       "Male"  ],
  ["Lesego Selemogwe",            "Development Director",              9, "Botswana Chess Federation",                         "Chess",                     "Gaborone",       "Female"],
  ["Tshenolo Maruatona",          "Member",                            9, "Botswana Chess Federation",                         "Chess",                     "Gaborone",       "Male"  ],

  /* ── 10 · Botswana Cricket Association ───────────────────────────────────── */
  ["Ebrahim A. Bhamjee",          "Chairperson",                       10, "Botswana Cricket Association",                     "Cricket",                   "Gaborone",       "Male"  ],
  ["Altaf Parekh",                "Vice Chairperson",                  10, "Botswana Cricket Association",                     "Cricket",                   "Gaborone",       "Male"  ],
  ["Ahmed Fazal Sheriff",         "Acting CEO / Secretary General",    10, "Botswana Cricket Association",                     "Cricket",                   "Gaborone",       "Male"  ],
  ["Girish Ramakrishna",          "Tournament Director",               10, "Botswana Cricket Association",                     "Cricket",                   "Gaborone",       "Male"  ],
  ["Sumod Damodar",               "PRO Secretary",                     10, "Botswana Cricket Association",                     "Cricket",                   "Gaborone",       "Male"  ],
  ["Madhu Menon",                 "Treasurer",                         10, "Botswana Cricket Association",                     "Cricket",                   "Gaborone",       "Male"  ],
  ["Praful Jog",                  "Proposer",                          10, "Botswana Cricket Association",                     "Cricket",                   "Gaborone",       "Male"  ],

  /* ── 11 · Botswana Hockey Association ────────────────────────────────────── */
  ["Unaswi Matebu",               "Chairperson",                       11, "Botswana Hockey Association",                      "Hockey",                    "Gaborone",       "Female"],
  ["Dear Ramajalwa",              "Vice Chairperson",                  11, "Botswana Hockey Association",                      "Hockey",                    "Gaborone",       "Male"  ],
  ["Koketso Ludwig",              "Treasurer",                         11, "Botswana Hockey Association",                      "Hockey",                    "Gaborone",       "Male"  ],
  ["Bongani Nsumiwa",             "Coaching & Development Coordinator",11, "Botswana Hockey Association",                      "Hockey",                    "Gaborone",       "Male"  ],
  ["Thoriso Bogwasi",             "Member",                            11, "Botswana Hockey Association",                      "Hockey",                    "Gaborone",       "Male"  ],

  /* ── 12 · Botswana Cycling Association ───────────────────────────────────── */
  ["Mmetla Masire",               "President",                         12, "Botswana Cycling Association",                     "Cycling",                   "Gaborone",       "Male"  ],
  ["Moagi Sewawa",                "Vice President",                    12, "Botswana Cycling Association",                     "Cycling",                   "Gaborone",       "Male"  ],
  ["Shimane Serameng",            "Secretary General",                 12, "Botswana Cycling Association",                     "Cycling",                   "Gaborone",       "Male"  ],
  ["Game Mompe",                  "Vice Secretary General",            12, "Botswana Cycling Association",                     "Cycling",                   "Gaborone",       "Male"  ],
  ["Karabo Rasenyai",             "Treasurer",                         12, "Botswana Cycling Association",                     "Cycling",                   "Gaborone",       "Male"  ],
  ["Kelly Ramputswa-Tlale",       "Member",                            12, "Botswana Cycling Association",                     "Cycling",                   "Gaborone",       "Female"],
  ["Shadrach Tirelo",             "Member",                            12, "Botswana Cycling Association",                     "Cycling",                   "Gaborone",       "Male"  ],

  /* ── 13 · Botswana Dance Sport Association ───────────────────────────────── */
  ["Tiroeaone Ntsima",            "President",                         13, "Botswana Dance Sport Association",                  "Dance Sport",               "Gaborone",       "Male"  ],
  ["Mothusi Sebego",              "Vice President",                    13, "Botswana Dance Sport Association",                  "Dance Sport",               "Gaborone",       "Male"  ],
  ["Abednico Tshambane",          "Secretary General",                 13, "Botswana Dance Sport Association",                  "Dance Sport",               "Gaborone",       "Male"  ],
  ["Tumelo Ekenyane",             "Vice Secretary General",            13, "Botswana Dance Sport Association",                  "Dance Sport",               "Gaborone",       "Male"  ],
  ["Treasure Mothobi",            "Treasurer",                         13, "Botswana Dance Sport Association",                  "Dance Sport",               "Gaborone",       "Female"],
  ["Janet Masebe",                "Publicity Secretary",               13, "Botswana Dance Sport Association",                  "Dance Sport",               "Gaborone",       "Female"],
  ["Betty Gaamangwe",             "Additional Member",                 13, "Botswana Dance Sport Association",                  "Dance Sport",               "Gaborone",       "Female"],
  ["Mogomotsi Bolaane",           "Additional Member",                 13, "Botswana Dance Sport Association",                  "Dance Sport",               "Gaborone",       "Male"  ],
  ["Karabo Kemoabe",              "Additional Member",                 13, "Botswana Dance Sport Association",                  "Dance Sport",               "Gaborone",       "Male"  ],
  ["Tshepo Mokhuchedi",           "Administration Officer",            13, "Botswana Dance Sport Association",                  "Dance Sport",               "Gaborone",       "Male"  ],

  /* ── 14 · Botswana Darts Association ─────────────────────────────────────── */
  ["Buyani Zongwani",             "President",                         14, "Botswana Darts Association",                        "Darts",                     "Gaborone",       "Male"  ],
  ["Samuel Noga",                 "Vice President",                    14, "Botswana Darts Association",                        "Darts",                     "Gaborone",       "Male"  ],
  ["Mothusi Moakofi",             "General Secretary",                 14, "Botswana Darts Association",                        "Darts",                     "Gaborone",       "Male"  ],
  ["Keitumetse Makhale",          "Recording Secretary",               14, "Botswana Darts Association",                        "Darts",                     "Gaborone",       "Female"],
  ["Kerataone Leririma",          "Treasurer",                         14, "Botswana Darts Association",                        "Darts",                     "Gaborone",       "Male"  ],
  ["Thato Maphorisa",             "PRO",                               14, "Botswana Darts Association",                        "Darts",                     "Gaborone",       "Male"  ],
  ["Victor Wolfenden",            "Tournament Director",               14, "Botswana Darts Association",                        "Darts",                     "Gaborone",       "Male"  ],
  ["Machena Robert",              "Youth Director",                    14, "Botswana Darts Association",                        "Darts",                     "Gaborone",       "Female"],

  /* ── 15 · Botswana Football Association ──────────────────────────────────── */
  ["McClean Letshwiti",           "President",                         15, "Botswana Football Association",                     "Football",                  "Gaborone",       "Male"  ],
  ["Mfolo Edwin Mfolo",           "CEO",                               15, "Botswana Football Association",                     "Football",                  "Gaborone",       "Male"  ],
  ["Segolame Ramotlhwa",          "1st Vice President - Admin",        15, "Botswana Football Association",                     "Football",                  "Gaborone",       "Male"  ],
  ["Marshlow P. Motlogelwa",      "2nd Vice President - Technical",    15, "Botswana Football Association",                     "Football",                  "Gaborone",       "Male"  ],
  ["Eatametse Olopeng",           "Additional Member",                 15, "Botswana Football Association",                     "Football",                  "Gaborone",       "Male"  ],
  ["Sesenki Sesinyi",             "Additional Member",                 15, "Botswana Football Association",                     "Football",                  "Gaborone",       "Male"  ],
  ["Suzie Montsho",               "Additional Member",                 15, "Botswana Football Association",                     "Football",                  "Gaborone",       "Female"],
  ["Masego Nchingane",            "Additional Member",                 15, "Botswana Football Association",                     "Football",                  "Gaborone",       "Female"],
  ["Rapula Okaile",               "Premier League Representative",     15, "Botswana Football Association",                     "Football",                  "Gaborone",       "Male"  ],
  ["Samuel Keitireng",            "1st Division Representative",       15, "Botswana Football Association",                     "Football",                  "Gaborone",       "Male"  ],
  ["Tokyo Modise",                "Western Bloc Representative",       15, "Botswana Football Association",                     "Football",                  "Gaborone",       "Male"  ],
  ["Philemon Bunu",               "Northern Bloc Representative",      15, "Botswana Football Association",                     "Football",                  "Francistown",    "Male"  ],
  ["Thapelo Otimile",             "Southern Bloc Representative",      15, "Botswana Football Association",                     "Football",                  "Lobatse",        "Male"  ],
  ["Reiger Mothoagae",            "Eastern Bloc Representative",       15, "Botswana Football Association",                     "Football",                  "Palapye",        "Male"  ],
  ["Sipho Ziga",                  "Legal Advisor",                     15, "Botswana Football Association",                     "Football",                  "Gaborone",       "Male"  ],

  /* ── 16 · Botswana Golf Union ────────────────────────────────────────────── */
  ["Pius Molefe",                 "President",                         16, "Botswana Golf Union",                               "Golf",                      "Gaborone",       "Male",   "+267 71307468"],
  ["Modiri Phuthego",             "Vice President Admin",              16, "Botswana Golf Union",                               "Golf",                      "Gaborone",       "Male",   "+267 71601582"],
  ["Bekezele Mbakile",            "Vice President Ladies",             16, "Botswana Golf Union",                               "Golf",                      "Gaborone",       "Female", "+267 71332920"],
  ["Godfrey Gorogodo",            "Vice President Development",        16, "Botswana Golf Union",                               "Golf",                      "Gaborone",       "Male"  ],
  ["Simon Ramphethu",             "Treasurer",                         16, "Botswana Golf Union",                               "Golf",                      "Gaborone",       "Male"  ],
  ["Dikgang Lemogang",            "Additional Member",                 16, "Botswana Golf Union",                               "Golf",                      "Gaborone",       "Male"  ],
  ["Segopotso Bathobakae",        "Additional Member",                 16, "Botswana Golf Union",                               "Golf",                      "Gaborone",       "Female"],

  /* ── 17 · Botswana Integrated Sports Association ─────────────────────────── */
  ["Joshua Gaotlhobogwe",         "President",                         17, "Botswana Integrated Sports Association",             "Multi-Sport",               "Gaborone",       "Male"  ],
  ["Joy Kenosi",                  "Vice President Technical",          17, "Botswana Integrated Sports Association",             "Multi-Sport",               "Gaborone",       "Female"],
  ["Harold Mosomane",             "Secretary General",                 17, "Botswana Integrated Sports Association",             "Multi-Sport",               "Gaborone",       "Male"  ],
  ["Oreeditse Marakakgoro",       "Vice Secretary General",            17, "Botswana Integrated Sports Association",             "Multi-Sport",               "Gaborone",       "Male"  ],
  ["Tapiwa Mokoka Kengaletswe",   "Treasurer",                         17, "Botswana Integrated Sports Association",             "Multi-Sport",               "Gaborone",       "Male"  ],
  ["Letsweletse Jonas",           "Publicity Secretary",               17, "Botswana Integrated Sports Association",             "Multi-Sport",               "Gaborone",       "Male"  ],

  /* ── 18 · Botswana Judo Federation ───────────────────────────────────────── */
  ["Japeta Letsholo",             "President",                         18, "Botswana Judo Federation",                          "Judo",                      "Gaborone",       "Male"  ],
  ["Kingsley Segokotlo",          "Vice President",                    18, "Botswana Judo Federation",                          "Judo",                      "Gaborone",       "Male"  ],
  ["Gaongalelwe Morris",          "Secretary General",                 18, "Botswana Judo Federation",                          "Judo",                      "Gaborone",       "Male"  ],
  ["Enerst Mathopa",              "Treasurer",                         18, "Botswana Judo Federation",                          "Judo",                      "Gaborone",       "Male"  ],
  ["Ishmael Thaga",               "Development Director",              18, "Botswana Judo Federation",                          "Judo",                      "Gaborone",       "Male"  ],
  ["Patricia Nthibo",             "Marketing Director",                18, "Botswana Judo Federation",                          "Judo",                      "Gaborone",       "Female"],
  ["Kgosipula Kaupa",             "Sport Director",                    18, "Botswana Judo Federation",                          "Judo",                      "Gaborone",       "Male"  ],
  ["Stephen Pheko",               "Additional Member",                 18, "Botswana Judo Federation",                          "Judo",                      "Gaborone",       "Male"  ],

  /* ── 19 · Botswana Karate Association ────────────────────────────────────── */
  ["Mpho Bakwadi",                "President",                         19, "Botswana Karate Association",                       "Karate",                    "Gaborone",       "Male",   "+267 71302222"],
  ["Moemedi Nthapeleng",          "Vice President Admin",              19, "Botswana Karate Association",                       "Karate",                    "Gaborone",       "Male",   "+267 71848623"],
  ["Union Kgafela",               "Vice President Technical",          19, "Botswana Karate Association",                       "Karate",                    "Gaborone",       "Male",   "+267 71446229"],
  ["Dick Othusitse Tshepang",     "Secretary General",                 19, "Botswana Karate Association",                       "Karate",                    "Gaborone",       "Male",   "+267 74350184"],
  ["Keorapetse Dube",             "Public Relations Officer",          19, "Botswana Karate Association",                       "Karate",                    "Gaborone",       "Male",   "+267 77157969"],
  ["Kemmonye Seletamotse",        "Treasurer",                         19, "Botswana Karate Association",                       "Karate",                    "Gaborone",       "Female", "+267 72876490"],
  ["Francois Alberts",            "Vice Secretary General",            19, "Botswana Karate Association",                       "Karate",                    "Gaborone",       "Male",   "+267 71303227"],

  /* ── 20 · Botswana Motor Sport ───────────────────────────────────────────── */
  ["Kagiso Modibedi",             "President",                         20, "Botswana Motor Sport",                              "Motor Sports",              "Gaborone",       "Male"  ],
  ["Roseline Mamaloukos",         "Vice President",                    20, "Botswana Motor Sport",                              "Motor Sports",              "Gaborone",       "Female"],
  ["Tefo Dithapo",                "General Secretary",                 20, "Botswana Motor Sport",                              "Motor Sports",              "Gaborone",       "Male"  ],
  ["Gomolemo Chibana",            "Head of FIM",                       20, "Botswana Motor Sport",                              "Motor Sports",              "Gaborone",       "Male"  ],
  ["Thabiso Seobamo",             "Head of FIA",                       20, "Botswana Motor Sport",                              "Motor Sports",              "Gaborone",       "Male"  ],
  ["Thuso Majaha",                "Treasurer",                         20, "Botswana Motor Sport",                              "Motor Sports",              "Gaborone",       "Male"  ],
  ["Joseph Khengere",             "PRO",                               20, "Botswana Motor Sport",                              "Motor Sports",              "Gaborone",       "Male"  ],

  /* ── 21 · Botswana Netball Association ───────────────────────────────────── */
  ["Malebo Raditladi",            "President",                         21, "Botswana Netball Association",                      "Netball",                   "Gaborone",       "Female"],
  ["Oteng Masole",                "Vice President Technical",          21, "Botswana Netball Association",                      "Netball",                   "Gaborone",       "Male"  ],
  ["Seipei Gaelesiwe",            "Vice President Projects & Events",  21, "Botswana Netball Association",                      "Netball",                   "Gaborone",       "Female"],
  ["Kgololesego Freedom Diraditsile", "Secretary General",             21, "Botswana Netball Association",                      "Netball",                   "Gaborone",       "Female"],
  ["Onicah Letshwenyo-Ramocha",   "Treasurer",                         21, "Botswana Netball Association",                      "Netball",                   "Gaborone",       "Female"],
  ["Theresa Hirschfeld",          "Marketing & PRO",                   21, "Botswana Netball Association",                      "Netball",                   "Gaborone",       "Female"],
  ["Masego Serumola",             "Sport Development Officer",         21, "Botswana Netball Association",                      "Netball",                   "Gaborone",       "Female"],

  /* ── 22 · Botswana Rugby Union ───────────────────────────────────────────── */
  ["Sean Irish",                  "President",                         22, "Botswana Rugby Union",                              "Rugby",                     "Gaborone",       "Male"  ],
  ["Bob Ofentse Lekan",           "Vice President Administration",     22, "Botswana Rugby Union",                              "Rugby",                     "Gaborone",       "Male"  ],
  ["Thusego Segaise",             "Vice President Technical",          22, "Botswana Rugby Union",                              "Rugby",                     "Gaborone",       "Male"  ],
  ["Boitshoko Tsiane",            "Treasurer",                         22, "Botswana Rugby Union",                              "Rugby",                     "Gaborone",       "Male"  ],
  ["Vincent Mashaya",             "Additional Member",                 22, "Botswana Rugby Union",                              "Rugby",                     "Gaborone",       "Male"  ],
  ["Mpho Masisi",                 "Additional Member",                 22, "Botswana Rugby Union",                              "Rugby",                     "Gaborone",       "Male"  ],
  ["Donald Kandima",              "Additional Member",                 22, "Botswana Rugby Union",                              "Rugby",                     "Gaborone",       "Male"  ],
  ["Keneilwe Modise",             "Coach",                             22, "Botswana Rugby Union",                              "Rugby",                     "Gaborone",       "Female"],
  ["Kinsley Dobrowsky",           "Additional Member",                 22, "Botswana Rugby Union",                              "Rugby",                     "Gaborone",       "Male"  ],
  ["Kakanyo Mashaba",             "Office Administration",             22, "Botswana Rugby Union",                              "Rugby",                     "Gaborone",       "Male"  ],
  ["Zee Khumalo",                 "Member",                            22, "Botswana Rugby Union",                              "Rugby",                     "Gaborone",       "Male"  ],
  ["Dave Gilbert",                "Member",                            22, "Botswana Rugby Union",                              "Rugby",                     "Gaborone",       "Male"  ],
  ["Fredrick Kebadiretse",        "Member",                            22, "Botswana Rugby Union",                              "Rugby",                     "Gaborone",       "Male"  ],

  /* ── 23 · Botswana Softball Association ──────────────────────────────────── */
  ["Thabo Thamane",               "President",                         23, "Botswana Softball Association",                     "Softball",                  "Gaborone",       "Male"  ],
  ["Gontlafetse Batsetswe",       "Vice President",                    23, "Botswana Softball Association",                     "Softball",                  "Gaborone",       "Male"  ],
  ["Anastacia Tsuna Makwa",       "Secretary General",                 23, "Botswana Softball Association",                     "Softball",                  "Gaborone",       "Female"],
  ["Rijn Shagwa",                 "Treasurer",                         23, "Botswana Softball Association",                     "Softball",                  "Gaborone",       "Male"  ],
  ["McDonald Fologang",           "Competition Organiser",             23, "Botswana Softball Association",                     "Softball",                  "Gaborone",       "Male"  ],
  ["Kelebogile Seitei",           "PR / Marketing",                    23, "Botswana Softball Association",                     "Softball",                  "Gaborone",       "Female"],
  ["Olga Khumoetsile",            "Legal Affairs Adviser",             23, "Botswana Softball Association",                     "Softball",                  "Gaborone",       "Female"],
  ["Kabelo Kwape",                "Technical Development",             23, "Botswana Softball Association",                     "Softball",                  "Gaborone",       "Male"  ],
  ["Abel Mataboge",               "Umpire in Chief",                   23, "Botswana Softball Association",                     "Softball",                  "Gaborone",       "Male"  ],
  ["Justus Kuswane",              "General Manager North",             23, "Botswana Softball Association",                     "Softball",                  "Francistown",    "Male"  ],
  ["Kelebogile Ditsele",          "General Manager South",             23, "Botswana Softball Association",                     "Softball",                  "Lobatse",        "Female"],
  ["Masego Moiya",                "BISA National Coordinator",         23, "Botswana Softball Association",                     "Softball",                  "Gaborone",       "Female"],

  /* ── 24 · Botswana Swimming Sport Association ────────────────────────────── */
  ["Ruth Van Der Merwe",          "Chairperson",                       24, "Botswana Swimming Sport Association",               "Swimming",                  "Gaborone",       "Female"],
  ["Andrew W. Freeman",           "Vice Chairperson",                  24, "Botswana Swimming Sport Association",               "Swimming",                  "Gaborone",       "Male"  ],
  ["Sibongile Ruele",             "Secretary General",                 24, "Botswana Swimming Sport Association",               "Swimming",                  "Gaborone",       "Female"],
  ["Timothy K. Maje",             "Assistant Secretary General",       24, "Botswana Swimming Sport Association",               "Swimming",                  "Gaborone",       "Male"  ],
  ["Sikhangezile K. Bekker",      "Treasurer",                         24, "Botswana Swimming Sport Association",               "Swimming",                  "Gaborone",       "Female"],
  ["Mokwadi Montsheki",           "Additional Member",                 24, "Botswana Swimming Sport Association",               "Swimming",                  "Gaborone",       "Female"],

  /* ── 25 · Botswana Table Tennis Association ──────────────────────────────── */
  ["Kudzanani Motswagole",        "President",                         25, "Botswana Table Tennis Association",                 "Table Tennis",              "Gaborone",       "Male"  ],
  ["William Olyn",                "Secretary General",                 25, "Botswana Table Tennis Association",                 "Table Tennis",              "Gaborone",       "Male"  ],
  ["Oabona Raditloko",            "Treasurer",                         25, "Botswana Table Tennis Association",                 "Table Tennis",              "Gaborone",       "Female"],
  ["Kabo Mosarwe",                "Tournament Secretary",              25, "Botswana Table Tennis Association",                 "Table Tennis",              "Gaborone",       "Male"  ],
  ["Katlego Nkwakweng",           "Youth Development Manager",         25, "Botswana Table Tennis Association",                 "Table Tennis",              "Gaborone",       "Female"],
  ["Tiro Motswasele",             "PRO",                               25, "Botswana Table Tennis Association",                 "Table Tennis",              "Gaborone",       "Male"  ],
  ["Shiev Pal",                   "Additional Member",                 25, "Botswana Table Tennis Association",                 "Table Tennis",              "Gaborone",       "Male"  ],

  /* ── 26 · Botswana Tertiary Student Sports Association ───────────────────── */
  ["Keorapetse Setlhare",         "President",                         26, "Botswana Tertiary Student Sports Association",       "Multi-Sport",               "Gaborone",       "Male"  ],
  ["Mompati Molefe",              "Vice President Admin",              26, "Botswana Tertiary Student Sports Association",       "Multi-Sport",               "Gaborone",       "Male"  ],
  ["Tebogo Kgari",                "Vice President Technical",          26, "Botswana Tertiary Student Sports Association",       "Multi-Sport",               "Gaborone",       "Male"  ],
  ["Moreetsi Kediseng",           "Secretary General",                 26, "Botswana Tertiary Student Sports Association",       "Multi-Sport",               "Gaborone",       "Male"  ],
  ["Botho Thobega",               "Vice Secretary General",            26, "Botswana Tertiary Student Sports Association",       "Multi-Sport",               "Gaborone",       "Male"  ],
  ["Thokgamo Nyathi",             "Treasurer",                         26, "Botswana Tertiary Student Sports Association",       "Multi-Sport",               "Gaborone",       "Female"],
  ["Duncan Segabo",               "Publicity Secretary",               26, "Botswana Tertiary Student Sports Association",       "Multi-Sport",               "Gaborone",       "Male"  ],

  /* ── 27 · Botswana Traditional Sports & Games Confederation ─────────────── */
  ["Kenneth Tebogo Middleton",    "President",                         27, "Botswana Traditional Sports & Games Confederation", "Traditional Games",         "Gaborone",       "Male"  ],
  ["Evans Kesiilwe",              "Vice President",                    27, "Botswana Traditional Sports & Games Confederation", "Traditional Games",         "Gaborone",       "Male"  ],
  ["Kebalepile Maikano",          "Secretary General",                 27, "Botswana Traditional Sports & Games Confederation", "Traditional Games",         "Gaborone",       "Male"  ],
  ["Nkubingangani Kabo Magama",   "Vice Secretary General",            27, "Botswana Traditional Sports & Games Confederation", "Traditional Games",         "Gaborone",       "Male"  ],
  ["Batswana Basimolodi",         "Treasurer",                         27, "Botswana Traditional Sports & Games Confederation", "Traditional Games",         "Gaborone",       "Male"  ],
  ["Kingsley Mathwanye",          "Additional Member",                 27, "Botswana Traditional Sports & Games Confederation", "Traditional Games",         "Gaborone",       "Male"  ],
  ["Dorcas Ragono",               "Additional Member",                 27, "Botswana Traditional Sports & Games Confederation", "Traditional Games",         "Gaborone",       "Female"],
  ["Nkanyezi Sebina",             "Additional Member",                 27, "Botswana Traditional Sports & Games Confederation", "Traditional Games",         "Gaborone",       "Male"  ],
  ["Sifiso Hilton Dodana",        "Additional Member",                 27, "Botswana Traditional Sports & Games Confederation", "Traditional Games",         "Gaborone",       "Male"  ],

  /* ── 28 · Botswana Volleyball Federation ─────────────────────────────────── */
  ["Daniel Molaodi",              "President",                         28, "Botswana Volleyball Federation",                    "Volleyball",                "Gaborone",       "Male"  ],
  ["Ndibo Lebala",                "Vice President Administration",     28, "Botswana Volleyball Federation",                    "Volleyball",                "Gaborone",       "Male"  ],
  ["George Keotsenye",            "Vice President Technical",          28, "Botswana Volleyball Federation",                    "Volleyball",                "Gaborone",       "Male"  ],
  ["Moabi Tlalampe",              "Treasurer",                         28, "Botswana Volleyball Federation",                    "Volleyball",                "Gaborone",       "Male"  ],
  ["Tebogo Tsie",                 "Additional Member",                 28, "Botswana Volleyball Federation",                    "Volleyball",                "Gaborone",       "Male"  ],

  /* ── 29 · Botswana Weightlifting Federation ──────────────────────────────── */
  ["Joseph Mathambo",             "President",                         29, "Botswana Weightlifting Federation",                  "Weight Lifting",            "Gaborone",       "Male"  ],
  ["A. Makara",                   "Vice President Technical",          29, "Botswana Weightlifting Federation",                  "Weight Lifting",            "Gaborone",       "Male"  ],
  ["Dikgang Kopi",                "Vice President Admin",              29, "Botswana Weightlifting Federation",                  "Weight Lifting",            "Gaborone",       "Male"  ],
  ["Alex K. Rankgwe",             "Secretary General",                 29, "Botswana Weightlifting Federation",                  "Weight Lifting",            "Gaborone",       "Male"  ],
  ["Keletso Chibana",             "Treasurer",                         29, "Botswana Weightlifting Federation",                  "Weight Lifting",            "Gaborone",       "Female"],
  ["H. Mabutho",                  "Assistant Secretary",               29, "Botswana Weightlifting Federation",                  "Weight Lifting",            "Gaborone",       "Male"  ],
  ["C. Boshomane",                "Member",                            29, "Botswana Weightlifting Federation",                  "Weight Lifting",            "Gaborone",       "Male"  ],
  ["Dick Obonwakae",              "Member (Bodybuilding)",             29, "Botswana Weightlifting Federation",                  "Weight Lifting",            "Gaborone",       "Male"  ],
  ["Omondi Collins",              "Member",                            29, "Botswana Weightlifting Federation",                  "Weight Lifting",            "Gaborone",       "Male"  ],

  /* ── 30 · Botswana Wrestling Federation ──────────────────────────────────── */
  ["Moagi Sharp",                 "President",                         30, "Botswana Wrestling Federation",                     "Wrestling",                 "Selebi Phikwe",  "Male"  ],
  ["Elijah Ramotapa",             "Vice President",                    30, "Botswana Wrestling Federation",                     "Wrestling",                 "Selebi Phikwe",  "Male"  ],
  ["Opelo Nthutang",              "Secretary General",                 30, "Botswana Wrestling Federation",                     "Wrestling",                 "Selebi Phikwe",  "Female"],
  ["Emmanuel Mpathi",             "Treasurer",                         30, "Botswana Wrestling Federation",                     "Wrestling",                 "Selebi Phikwe",  "Male"  ],
  ["Portia Sharp",                "Equipment Manager",                 30, "Botswana Wrestling Federation",                     "Wrestling",                 "Selebi Phikwe",  "Female"],
  ["Daniel Golekanye",            "Member",                            30, "Botswana Wrestling Federation",                     "Wrestling",                 "Selebi Phikwe",  "Male"  ],
  ["Annie Curtin",                "Member",                            30, "Botswana Wrestling Federation",                     "Wrestling",                 "Selebi Phikwe",  "Female"],
  ["Mooketsi Mosele",             "Member",                            30, "Botswana Wrestling Federation",                     "Wrestling",                 "Selebi Phikwe",  "Male"  ],
  ["Basadi Mathula",              "Member",                            30, "Botswana Wrestling Federation",                     "Wrestling",                 "Selebi Phikwe",  "Female"],
  ["Tshepang Mmuso",              "Member",                            30, "Botswana Wrestling Federation",                     "Wrestling",                 "Selebi Phikwe",  "Male"  ],

  /* ── 31 · Horse Society of Botswana ──────────────────────────────────────── */
  ["Sean Hughes",                 "Chairperson",                       31, "Horse Society of Botswana",                         "Horse Riding / Equestrian", "Gaborone",       "Male"  ],
  ["Eileen Peinke",               "Vice Chairperson",                  31, "Horse Society of Botswana",                         "Horse Riding / Equestrian", "Gaborone",       "Female"],
  ["Sandy Davies",                "Secretary",                         31, "Horse Society of Botswana",                         "Horse Riding / Equestrian", "Gaborone",       "Female"],
  ["Clarisse Lau",                "Treasurer",                         31, "Horse Society of Botswana",                         "Horse Riding / Equestrian", "Gaborone",       "Female"],
  ["Reinette van der Merwe",      "Grading Secretary",                 31, "Horse Society of Botswana",                         "Horse Riding / Equestrian", "Gaborone",       "Female"],
  ["Norma Tsara",                 "Additional Member",                 31, "Horse Society of Botswana",                         "Horse Riding / Equestrian", "Gaborone",       "Female"],
  ["Dirkie Luus",                 "Additional Member",                 31, "Horse Society of Botswana",                         "Horse Riding / Equestrian", "Gaborone",       "Male"  ],
  ["Belinda Irish",               "Additional Member",                 31, "Horse Society of Botswana",                         "Horse Riding / Equestrian", "Gaborone",       "Female"],

  // Association 32 · Parachute Association – no executives listed in source; skipped.

  /* ── 33 · Paralympic Association of Botswana ─────────────────────────────── */
  ["David Moatshe",               "President",                         33, "Paralympic Association of Botswana",                "Paralympics",               "Gaborone",       "Male"  ],
  ["Titus Kebuileng",             "Vice President",                    33, "Paralympic Association of Botswana",                "Paralympics",               "Gaborone",       "Male"  ],
  ["Cynthia Masikara",            "Secretary General",                 33, "Paralympic Association of Botswana",                "Paralympics",               "Gaborone",       "Female"],
  ["Jacob Seamogo",               "Vice General Secretary",            33, "Paralympic Association of Botswana",                "Paralympics",               "Gaborone",       "Male"  ],
  ["Thuso Rasetapa",              "PRO",                               33, "Paralympic Association of Botswana",                "Paralympics",               "Gaborone",       "Male"  ],
  ["Boikanyo Ratlou",             "Additional Member",                 33, "Paralympic Association of Botswana",                "Paralympics",               "Gaborone",       "Male"  ],
  ["Carinah Rahube-Rahube",       "Additional Member",                 33, "Paralympic Association of Botswana",                "Paralympics",               "Gaborone",       "Female"],

  /* ── 34 · Special Olympics Botswana ──────────────────────────────────────── */
  ["Virginia France",             "Secretary General",                 34, "Special Olympics Botswana",                         "Special Olympics",          "Gaborone",       "Female"],
  ["Nico Lebotse",                "Vice Secretary",                    34, "Special Olympics Botswana",                         "Special Olympics",          "Gaborone",       "Female"],
  ["Martha Tshwenyego",           "Treasurer",                         34, "Special Olympics Botswana",                         "Special Olympics",          "Gaborone",       "Female"],
  ["Annastacia Mhaladi-Mfila",    "Family Representative",             34, "Special Olympics Botswana",                         "Special Olympics",          "Gaborone",       "Female"],
  ["Montisetse Popo",             "Additional Member",                 34, "Special Olympics Botswana",                         "Special Olympics",          "Gaborone",       "Male"  ],
  ["Patrick Mosotho",             "Additional Member",                 34, "Special Olympics Botswana",                         "Special Olympics",          "Gaborone",       "Male"  ],
  ["Serefete Molosiwa",           "Additional Member",                 34, "Special Olympics Botswana",                         "Special Olympics",          "Gaborone",       "Female"],
  ["Tebogo Ditlhokwa",            "National Coordinator",              34, "Special Olympics Botswana",                         "Special Olympics",          "Gaborone",       "Male"  ],
  ["Ross Tebele",                 "National Director",                 34, "Special Olympics Botswana",                         "Special Olympics",          "Gaborone",       "Male",   "+267 71300864"],
  ["Cleopatra Tsoebebe",          "Member",                            34, "Special Olympics Botswana",                         "Special Olympics",          "Gaborone",       "Female"],
  ["Modise Maphanyane",           "Member",                            34, "Special Olympics Botswana",                         "Special Olympics",          "Gaborone",       "Male"  ],
  ["Nelly Malatsi",               "Treasurer",                         34, "Special Olympics Botswana",                         "Special Olympics",          "Gaborone",       "Female", "+267 71309908"],
];

// ─── Classification helpers ────────────────────────────────────────────────────

/**
 * Roles that earn onboarding_level 2 (senior office-bearers).
 * Uses substring matching so variants like "1st Vice President – Admin" are caught.
 */
const _SENIOR_ROLES = [
  "President", "Chairperson", "CEO",
  "Vice President", "Vice Chairperson",
  "Secretary General", "Acting Secretary General", "General Secretary",
  "Vice Secretary General", "Vice General Secretary",
  "Acting CEO", "National Director",
];

/**
 * Roles that add "Guardian" capability (youth & development facing).
 * Exact / substring matches on executive_role.
 */
const _YOUTH_ROLES = [
  "Youth Director", "Youth Coordinator", "Youth Development Manager",
  "Development Director", "SDO",
  "Coaching & Development Coordinator",
];

/** Location → 3-letter code for UIDs. */
const _LOC_CODE = {
  "Gaborone":      "GAB",
  "Francistown":   "FRN",
  "Lobatse":       "LOB",
  "Palapye":       "PAL",
  "Sebina":        "SEB",
  "Selebi Phikwe": "SEL",
};

// ─── Profile generation ────────────────────────────────────────────────────────

window.MIZANO_DATA.bnscExecutives = _bnscRaw.map((row, i) => {
  const [display_name, exec_role, assoc_id, assoc_name, sport, location, gender, knownWhatsapp] = row;

  // Strip honorific prefixes for clean name fields
  const cleanName = display_name.replace(/^(Dr\.?|Col\.?|Mr\.?|Mrs\.?|Ms\.?|Miss)\s+/i, "").trim();
  const nameParts  = cleanName.split(" ");
  const first_name = nameParts[0];
  const surname    = nameParts.slice(1).join(" ") || "";

  // Role classification flags
  const isLeader = /^(President|Chairperson|CEO|National Director)$/.test(exec_role);
  const isSenior = isLeader || _SENIOR_ROLES.some(r => exec_role.includes(r));
  const isYouth  = _YOUTH_ROLES.some(r => exec_role.includes(r));

  // UID: USR-BW-{LOC}-{sequential from 2001}
  const locCode = _LOC_CODE[location] || "GAB";
  const uid = `USR-BW-${locCode}-${2001 + i}`;

  // WhatsApp: use published number if available, else generate a valid-format placeholder
  const whatsapp = knownWhatsapp || `+2677${String(1500001 + i)}`;

  return {
    uid,
    display_name:      cleanName,
    first_name,
    surname,
    location,
    gender,
    role:              "creator",
    profile_type:      "creator",
    whatsapp,
    interests:         [sport],
    verified:          isLeader,
    rating:            isLeader ? 4.8 : isSenior ? 4.6 : 4.3,
    onboarding_level:  isSenior ? 2 : 1,
    capabilities:      isYouth ? ["Creator", "Guardian"] : ["Creator"],
    sport_association: assoc_name,
    association_id:    assoc_id,
    executive_role:    exec_role,
  };
});

// ─── Convenience lookup utilities (mirror user_profiles_bw.js pattern) ─────────

/**
 * Find a single executive profile by UID.
 * @param {string} uid
 * @returns {object|null}
 */
const getExecutiveByUid = (uid) =>
  window.MIZANO_DATA.bnscExecutives.find(p => p.uid === uid) || null;

/**
 * Find all executives belonging to a specific association.
 * @param {number} assocId
 * @returns {object[]}
 */
const getExecutivesByAssociation = (assocId) =>
  window.MIZANO_DATA.bnscExecutives.filter(p => p.association_id === assocId);

/**
 * Find all executives for a given sport (case-insensitive partial match).
 * @param {string} sport
 * @returns {object[]}
 */
const getExecutivesBySport = (sport) => {
  const q = sport.toLowerCase();
  return window.MIZANO_DATA.bnscExecutives.filter(p =>
    p.interests.some(s => s.toLowerCase().includes(q))
  );
};

/**
 * Search executives by name, association name or role (case-insensitive).
 * @param {string} query
 * @returns {object[]}
 */
const searchExecutives = (query) => {
  const q = query.toLowerCase();
  return window.MIZANO_DATA.bnscExecutives.filter(p =>
    p.display_name.toLowerCase().includes(q)     ||
    p.sport_association.toLowerCase().includes(q) ||
    p.executive_role.toLowerCase().includes(q)
  );
};

/** Total profile count. */
const totalBnscExecutives = window.MIZANO_DATA.bnscExecutives.length;

// Export helpers globally so other Mizano scripts can consume them
window.MIZANO_DATA.getExecutiveByUid       = getExecutiveByUid;
window.MIZANO_DATA.getExecutivesByAssociation = getExecutivesByAssociation;
window.MIZANO_DATA.getExecutivesBySport    = getExecutivesBySport;
window.MIZANO_DATA.searchExecutives        = searchExecutives;
window.MIZANO_DATA.totalBnscExecutives     = totalBnscExecutives;
