# Complete Sport Archetype Mapping for Mizano Event Lab

**Purpose**: This is the authoritative reference for mapping every sport in the Mizano dropdown to its template group and configurable fields. Use this to implement the dynamic Game Rules panel.

**Total Sports**: 115 + 1 Custom ("🌐 Other")

---

## Template Group Summary

| Template Group | Logic Key | Count | Description |
|----------------|-----------|-------|-------------|
| **Time-Structured** | `timer_split` | 18 | Sports with periods/quarters and clock-based scoring |
| **Target-Score** | `set_cap` | 14 | Sports won by sets/games/frames with point caps |
| **Performance/Measurement** | `leaderboard` | 58 | Sports measured by time/distance/points/judges |
| **Turn/Move/Cycle** | `turn_cycle` | 10 | Sports with turns/innings/overs |
| **Combat/Bout** | `bout_logic` | 11 | Combat sports with rounds and decision systems |
| **Multi-Discipline** | `hybrid` | 7 | Sports combining multiple disciplines |
| **User-Defined** | `custom` | 4 | Custom sports and parasports needing wizard |

---

## Complete Sport-by-Sport Mapping

### TIME-STRUCTURED SPORTS (timer_split)
*Sports with periods/quarters and running clocks*

| Display Name | Value | Configurable Fields | Sport-Specific Notes |
|--------------|-------|---------------------|----------------------|
| **American Football** | `american_football` | • Game Length: 60:00<br>• Periods: 4<br>• Period Duration: 15:00<br>• Halftime Break: 12:00<br>• Overtime: Sudden Death toggle<br>• Clock Stop: On incomplete pass, out of bounds | • Default: 4 quarters × 15 min<br>• Overtime: 10 min sudden death |
| **Australian Rules Football** | `aus_rules_football` | • Game Length: 80:00<br>• Periods: 4 (quarters)<br>• Period Duration: 20:00<br>• Time On: After goals/out of bounds<br>• Siren: End when ball dead | • No halftime break structure<br>• Unique "time on" system |
| **Basketball** | `basketball` | • Game Length: 40:00 (FIBA) / 48:00 (NBA)<br>• Periods: 4 quarters<br>• Period Duration: 10:00 (FIBA) / 12:00 (NBA)<br>• Halftime: 15:00<br>• Overtime: 5:00<br>• Shot Clock: 24 sec<br>• Clock Stop: Dead ball, timeouts | • Default: FIBA rules (40 min)<br>• Shot clock mandatory<br>• Team fouls tracked per quarter |
| **Basketball 3x3** | `basketball_3x3` | • Game Length: 10:00 or first to 21<br>• Periods: 1<br>• Shot Clock: 12 sec<br>• Overtime: First to 2 points | • Unique: Points OR time win<br>• No halftime |
| **Beach Handball** | `beach_handball` | • Game Length: 20:00<br>• Periods: 2 sets<br>• Period Duration: 10:00<br>• Golden Goal: If tied after 2 sets<br>• Shootout: If still tied | • Two-set format<br>• Spectacularly scored goals = 2 points |
| **Beach Soccer** | `beach_soccer` | • Game Length: 36:00<br>• Periods: 3<br>• Period Duration: 12:00<br>• No Halftime<br>• Overtime: 3 min extra time<br>• Penalties: If still tied | • Three 12-min periods<br>• Clock stops on dead ball<br>• No draws in knockout |
| **Flag Football** | `flag_football` | • Game Length: 40:00<br>• Periods: 2 halves<br>• Period Duration: 20:00<br>• Halftime: 5:00<br>• Overtime: 4 downs from 5-yard line | • No contact tackling<br>• Clock stops last 2 min each half |
| **Floorball** | `floorball` | • Game Length: 60:00<br>• Periods: 3<br>• Period Duration: 20:00<br>• Overtime: 10 min sudden death<br>• Penalties: 2 min / 5 min / Match | • Similar to hockey<br>• Indoor sport |
| **Futsal** | `futsal` | • Game Length: 40:00<br>• Periods: 2 halves<br>• Period Duration: 20:00<br>• Halftime: 15:00<br>• Overtime: 2×5 min extra time<br>• Clock Stop: After goals, ball out | • Running clock stops frequently<br>• Unlimited subs |
| **Gaelic Football** | `gaelic_football` | • Game Length: 60:00 (70 senior)<br>• Periods: 2 halves<br>• Period Duration: 30:00 (35 senior)<br>• Halftime: 10:00<br>• Extra Time: 2×10 min if needed | • Irish sport<br>• Goals (3 pts) + Points (1 pt) |
| **Handball** | `handball` | • Game Length: 60:00<br>• Periods: 2 halves<br>• Period Duration: 30:00<br>• Halftime: 10:00 (15 major)<br>• Overtime: 2×5 min<br>• Penalties: 2 min suspension | • Team handball (Olympic)<br>• 7 players per side |
| **Hockey (Field)** | `hockey_field` | • Game Length: 60:00<br>• Periods: 4 quarters<br>• Period Duration: 15:00<br>• Quarter Breaks: 2:00<br>• Halftime: 5:00<br>• Penalties: Green/Yellow/Red cards | • Olympic format: 4×15<br>• Penalty corners tracked |
| **Hockey (Ice)** | `hockey_ice` | • Game Length: 60:00<br>• Periods: 3<br>• Period Duration: 20:00<br>• Intermissions: 15:00<br>• Overtime: 5 min 3-on-3<br>• Shootout: If tied after OT<br>• Penalties: 2/5/10 min + game misconduct | • Stop-time clock<br>• Icing/Offside rules<br>• Power plays tracked |
| **Hockey (Roller)** | `hockey_roller` | • Game Length: Same as ice hockey variants<br>• Periods: 2 or 3 (league dependent)<br>• Penalties: Similar to ice hockey | • Inline or quad skates<br>• Similar to ice hockey rules |
| **Lacrosse** | `lacrosse` | • Game Length: 60:00 (field) / 60:00 (box)<br>• Periods: 4 quarters (field) / 3 periods (box)<br>• Period Duration: 15:00 (field) / 20:00 (box)<br>• Overtime: Sudden victory<br>• Penalties: 30 sec / 1 min / 3 min | • Field vs Box variants<br>• Shot clock: 60 sec (field) |
| **Netball** | `netball` | • Game Length: 60:00<br>• Periods: 4 quarters<br>• Period Duration: 15:00<br>• Quarter Breaks: 3:00<br>• Halftime: 5:00<br>• Overtime: 7 min extra time (2 periods) | • Commonwealth sport<br>• 7 players, positional restrictions<br>• No dribbling |
| **Rugby League** | `rugby_league` | • Game Length: 80:00<br>• Periods: 2 halves<br>• Period Duration: 40:00<br>• Halftime: 10:00<br>• Overtime: Golden point extra time<br>• Sin Bin: 10 min | • 13 players per side<br>• 6-tackle rule<br>• Tries = 4 pts |
| **Rugby Union** | `rugby_union` | • Game Length: 80:00<br>• Periods: 2 halves<br>• Period Duration: 40:00<br>• Halftime: 15:00<br>• Overtime: 2×10 min extra time<br>• Sin Bin: 10 min (Yellow)<br>• Red Card: Permanent | • 15 players per side<br>• Tries = 5 pts<br>• Conversions, penalties, drop goals |
| **Rugby Sevens** | `rugby_sevens` | • Game Length: 14:00 (7 min halves)<br>• Periods: 2 halves<br>• Period Duration: 7:00<br>• Halftime: 2:00<br>• Finals: 10 min halves<br>• Overtime: Sudden death | • Olympic format<br>• 7 players per side<br>• Fast-paced variant |
| **Water Polo** | `water_polo` | • Game Length: 32:00<br>• Periods: 4 quarters<br>• Period Duration: 8:00<br>• Quarter Breaks: 2:00<br>• Overtime: 2×3 min periods<br>• Shot Clock: 30 sec<br>• Exclusion Fouls: 20 sec penalty | • Aquatics sport<br>• 7 players per team<br>• Treading water required |

---

### TARGET-SCORE / SET-BASED SPORTS (set_cap)
*Sports won by sets/games/frames with point thresholds*

| Display Name | Value | Configurable Fields | Sport-Specific Notes |
|--------------|-------|---------------------|----------------------|
| **Archery** | `archery` | • Win by: Sets (first to 6)<br>• Points per Arrow: 1-10<br>• Arrows per End: 3<br>• Total Ends: Variable<br>• Tie-Break: Shoot-off (closest to center) | • Olympic recurve: Set system<br>• Compound: Cumulative scoring<br>• Distance: 70m (Olympic) |
| **Badminton** | `badminton` | • Win by: Best of 3 games<br>• Points per Game: 21<br>• Win by 2: Yes<br>• Max Points: 30<br>• Service: Alternating sides | • Rally scoring (every point)<br>• Change ends at 11 in deciding game |
| **Beach Volleyball** | `beach_volleyball` | • Win by: Best of 3 sets<br>• Points per Set: 21 (sets 1-2), 15 (set 3)<br>• Win by 2: Yes<br>• No cap: Sets can go long | • Olympic format<br>• 2 players per team<br>• Switch sides every 7 points |
| **Bowling** | `bowling` | • Win by: Highest total pins<br>• Frames: 10<br>• Balls per Frame: 2 (1 if strike)<br>• Max Score: 300 (perfect game)<br>• Spares/Strikes: Bonus scoring | • Ten-pin or Nine-pin variants<br>• Strike = 10 + next 2 balls<br>• Spare = 10 + next 1 ball |
| **Darts** | `darts` | • Win by: First to 0 from 501/301<br>• Legs: Best of 3/5/7<br>• Sets: Best of X sets<br>• Checkout: Must finish on double<br>• Bust: Over 0 or wrong finish | • 501 standard (pro)<br>• 301 for casual<br>• Triple 20 = 60 pts |
| **Golf** | `golf` | • Win by: Lowest total strokes<br>• Holes: 18 (or 9/36)<br>• Par per Hole: 3/4/5<br>• Stroke Play: Total strokes<br>• Match Play: Holes won<br>• Tie-Break: Playoff holes | • Stroke play (medal)<br>• Match play (head-to-head)<br>• Handicap system available |
| **Padel** | `padel` | • Win by: Best of 3/5 sets<br>• Points per Set: 6 games<br>• Games: First to 4 points (deuce at 3-3)<br>• Tie-Break: At 6-6, first to 7<br>• Golden Point: At deuce (optional) | • Similar to tennis<br>• Walls are in play<br>• Doubles format standard |
| **Pickleball** | `pickleball` | • Win by: First to 11/15/21<br>• Win by 2: Yes<br>• Rally Scoring: Optional<br>• Side-Out Scoring: Traditional<br>• Doubles/Singles: Configurable | • Serve must bounce once<br>• Non-volley zone (kitchen)<br>• Underhand serve only |
| **Racquetball** | `racquetball` | • Win by: Best of 3 games<br>• Points per Game: 15 (games 1-2), 11 (game 3)<br>• Rally Scoring: Yes<br>• Service: 2 chances | • Enclosed court<br>• Walls/ceiling in play<br>• Serve must hit front wall first |
| **Squash** | `squash` | • Win by: Best of 3 or 5 games<br>• Points per Game: 11<br>• Win by 2: Yes at 10-10<br>• Service: Alternating boxes<br>• Rally Scoring: Yes | • Enclosed court<br>• Tin (out area) at bottom<br>• Service alternates on point loss |
| **Table Tennis** | `table_tennis` | • Win by: Best of 5/7 games<br>• Points per Game: 11<br>• Win by 2: Yes<br>• Service: 2 serves each, alternating<br>• Deuce: At 10-10, alternating serves | • Olympic sport<br>• Change ends every game<br>• Doubles has specific service order |
| **Tennis** | `tennis` | • Win by: Best of 3/5 sets<br>• Games per Set: First to 6 (win by 2)<br>• Tie-Break: At 6-6, first to 7 (win by 2)<br>• Advantage Scoring: Deuce/Ad system<br>• No-Ad Scoring: Deciding point at deuce | • Grand Slam: Best of 5 (men)<br>• WTA/ATP: Best of 3<br>• Super tie-break at 6-6 in final set (some tours) |
| **Teqball** | `teqball` | • Win by: Best of 3 sets<br>• Points per Set: 20<br>• Win by 2: No (cap at 20)<br>• Service: 5 serves each<br>• Curved table: No hand contact | • Football-based table sport<br>• 1v1 or 2v2<br>• Max 3 touches per side |
| **Volleyball** | `volleyball` | • Win by: Best of 5 sets<br>• Points per Set: 25 (sets 1-4), 15 (set 5)<br>• Win by 2: Yes<br>• Service Rotation: Clockwise on side-out<br>• Libero: Defensive specialist rules | • Rally scoring<br>• 6 players per side<br>• 3 hits max per side |

---

### PERFORMANCE / MEASUREMENT SPORTS (leaderboard)
*Sports measured by time, distance, points, weight, or judges' scores*

| Display Name | Value | Configurable Fields | Sport-Specific Notes |
|--------------|-------|---------------------|----------------------|
| **Acrobatic Arts** | `acrobatic_arts` | • Measure by: Judges' Points<br>• Number of Judges: 3-7<br>• Sort Order: Descending (highest wins)<br>• Scoring: Average of judges<br>• Deductions: Execution/artistry | • Judged performance<br>• Average score after drop high/low<br>• Categories: Solo/Duo/Group |
| **Aerobatics** | `aerobatics` | • Measure by: Points (precision)<br>• Number of Judges: 5<br>• Sort Order: Descending<br>• Scoring: Maneuver difficulty × execution | • Aviation sport<br>• Known/Unknown/Freestyle sequences<br>• Penalty for deviations |
| **Air Sports** | `air_sports` | • Measure by: Time or Distance<br>• Sort Order: Ascending (time) / Descending (distance)<br>• Attempts: 1-3<br>• Weather Conditions: Logged | • General category<br>• Includes paragliding, hang gliding<br>• Safety protocols critical |
| **Artistic Gymnastics** | `artistic_gymnastics` | • Measure by: Points (D-score + E-score)<br>• Apparatus: 4 (women) / 6 (men)<br>• Judges: 2 panels (Difficulty + Execution)<br>• Attempts: 1 per apparatus<br>• All-Around: Sum of all apparatus | • Olympic sport<br>• D-score = difficulty<br>• E-score = execution (deductions from 10.0) |
| **Artistic Swimming** | `artistic_swimming` | • Measure by: Points (technical + artistic)<br>• Number of Judges: 7-10<br>• Events: Solo/Duet/Team<br>• Scoring: Average after drops | • Formerly synchronized swimming<br>• Technical + Free routines<br>• Music timing critical |
| **Athletics (Track & Field)** | `athletics` | • Measure by: Time (track) / Distance (field) / Points (combined)<br>• Sort Order: Ascending (time) / Descending (distance)<br>• Attempts: 3 (field) / 1 (track)<br>• Finals: Top 8 advance<br>• Wind Reading: For sprints/jumps | • Primary Talent Pipeline<br>• Events: 100m, Marathon, Long Jump, Shot Put, Heptathlon, etc.<br>• IAAF World Athletics rules |
| **Ballooning** | `ballooning` | • Measure by: Distance or Accuracy<br>• Sort Order: Descending (distance) / Points (accuracy)<br>• Tasks: Target landing, distance<br>• Weather: Critical factor | • Hot air balloon sport<br>• Competitive ballooning tasks<br>• Lifestyle/recreational default |
| **BMX (Cycling)** | `bmx_cycling` | • Measure by: Time (race) / Points (freestyle)<br>• Sort Order: Ascending (race)<br>• Heats: Moto system (top 4 advance)<br>• Judges: Freestyle scoring | • Olympic: BMX Racing + Freestyle<br>• Race: First across line<br>• Freestyle: Judged tricks |
| **Bobsleigh** | `bobsleigh` | • Measure by: Time (combined runs)<br>• Sort Order: Ascending<br>• Runs: 4 (Olympic)<br>• Aggregation: Sum of all runs<br>• Crew: 2-man / 4-man / Women's Monobob | • Winter Olympic sport<br>• Fastest total time wins<br>• Push start + sled design critical |
| **Breaking (Dance Sport)** | `breaking` | • Measure by: Judges' Points (battles)<br>• Number of Judges: 5-9<br>• Categories: Technique, Variety, Performativity, Musicality<br>• Format: Battle (head-to-head) | • Olympic sport (Paris 2024)<br>• B-boys/B-girls<br>• Round-robin → bracket |
| **Canoeing** | `canoeing` | • Measure by: Time<br>• Sort Order: Ascending<br>• Disciplines: Sprint / Slalom / Coastal<br>• Distance: 200m/500m/1000m (sprint)<br>• Penalties: Slalom gate touches (+2 sec) | • Olympic sport<br>• Sprint: Straight race<br>• Slalom: Gates on whitewater |
| **Cycling (Road/Mountain)** | `cycling` | • Measure by: Time (road) / Points (criterium) / Position (MTB)<br>• Sort Order: Ascending (time)<br>• Stages: Multi-day events (Tour)<br>• Sprints: Intermediate points | • Primary Talent Pipeline<br>• Road: Time trials, mass start<br>• MTB: Cross-country, downhill |
| **Cycleball** | `cycleball` | • Measure by: Goals (but no clock)<br>• Sort Order: Most goals<br>• Duration: 2×7 min halves<br>• Players: 2v2 | • Unique cycling sport<br>• Indoor arena<br>• Ball control with bike |
| **Dance Sport** | `dance_sport` | • Measure by: Judges' Points<br>• Number of Judges: 5-11<br>• Categories: Standard (Waltz, Tango) / Latin (Samba, Cha-cha)<br>• Rounds: Heats → Finals | • Competitive ballroom<br>• Couples judged<br>• Placement system (1st, 2nd, 3rd marks) |
| **Diving** | `diving` | • Measure by: Points (degree of difficulty × execution)<br>• Number of Judges: 5 or 7<br>• Dives: 5-6 per competition<br>• Platforms: 3m/10m<br>• Scoring: Drop high/low, multiply by DD | • Olympic sport<br>• Springboard vs Platform<br>• Synchronized diving (pairs) |
| **Donkey Racing** | `donkey_racing` | • Measure by: Time or Position<br>• Sort Order: Ascending (time) / First across line<br>• Distance: Variable (100m-500m)<br>• Heats: Multiple races | • Botswana regional/cultural<br>• Festive/community event<br>• Animal welfare protocols |
| **Equestrian** | `equestrian` | • Measure by: Points (Dressage/Show Jumping) / Time (Eventing XC)<br>• Disciplines: Dressage, Show Jumping, Eventing<br>• Penalties: Faults (jumping), time (XC)<br>• Judges: Variable by discipline | • Olympic sport<br>• Dressage: Precision movements<br>• Show Jumping: Faults on knockdowns<br>• Eventing: Combined 3-day |
| **Esports (Competitive Gaming)** | `esports` | • Measure by: Wins (MOBA/FPS) / Points (Racing/Fighting)<br>• Format: Best-of series<br>• Map/Round: Game-specific<br>• Scoring: Kill/Death/Assist (FPS), Objectives (MOBA) | • Digital Talent Pipeline<br>• Titles: League of Legends, CS:GO, FIFA, etc.<br>• LAN vs Online |
| **Figure Skating** | `figure_skating` | • Measure by: Points (Technical + Presentation)<br>• Number of Judges: 9-12<br>• Programs: Short + Free<br>• Elements: Jumps, spins, footwork<br>• Deductions: Falls, time violations | • Olympic sport<br>• Singles/Pairs/Ice Dance<br>• Grade of Execution (GOE) |
| **Freestyle Skiing** | `freestyle_skiing` | • Measure by: Points (judged) or Time (ski cross)<br>• Disciplines: Moguls, Aerials, Halfpipe, Slopestyle, Ski Cross<br>• Judges: 5-7 (aerials/halfpipe)<br>• Scoring: Difficulty × execution | • Olympic sport<br>• Aerials: Jumps judged<br>• Ski Cross: First across line |
| **Go Karting** | `go_karting` | • Measure by: Time (laps) or Position<br>• Sort Order: Ascending (time) / First across line<br>• Heats: Qualify → Finals<br>• Laps: Variable (10-30) | • Motor sport<br>• Indoor/Outdoor tracks<br>• Age categories (Cadet, Junior, Senior) |
| **Horse Polo** | `horse_polo` | • Measure by: Goals (but uses chukkers, not clock)<br>• Periods: 4-8 chukkers (7 min each)<br>• Players: 4 per team<br>• Handicap: Player ratings | • Animal sport<br>• High-speed equestrian<br>• Handicap balancing system |
| **Horse Racing** | `horse_racing` | • Measure by: Position (first across line) or Time<br>• Sort Order: Position<br>• Distance: Variable (5 furlongs - 2 miles)<br>• Track Condition: Logged | • Animal sport<br>• Flat vs Jump racing<br>• Handicap weights |
| **Jukskei** | `jukskei` | • Measure by: Points (stick placement)<br>• Sort Order: Descending<br>• Rounds: Variable<br>• Target: Peg (similar to horseshoes) | • South African traditional<br>• Regional/cultural sport<br>• Team or individual |
| **Lawn Bowls** | `lawn_bowls` | • Measure by: Points (bowls closest to jack)<br>• Sort Order: Descending<br>• Ends: 18-21<br>• Formats: Singles, Pairs, Triples, Fours | • Precision sport<br>• Commonwealth Games<br>• Bias on bowls creates curve |
| **Luge** | `luge` | • Measure by: Time (combined runs)<br>• Sort Order: Ascending<br>• Runs: 4 (Olympic)<br>• Aggregation: Sum of runs<br>• Types: Singles, Doubles, Team Relay | • Winter Olympic sport<br>• Fastest sled sport<br>• Feet-first descent |
| **Marathon & Road Running** | `marathon` | • Measure by: Time<br>• Sort Order: Ascending<br>• Distance: 42.195 km (marathon) / 10K, Half Marathon variants<br>• Splits: Mile/5K markers | • Athletics subcategory<br>• Mass participation races<br>• Elite vs recreational divisions |
| **Modern Pentathlon** | `modern_pentathlon` | • Measure by: Points (combined 5 disciplines)<br>• Disciplines: Fencing, Swimming, Equestrian, Laser Run<br>• Scoring: Each discipline converts to points<br>• Winner: Highest total points | • Olympic sport<br>• Multi-discipline hybrid<br>• See also Multi-Discipline section |
| **Motorcycle Racing** | `motorcycle_racing` | • Measure by: Position or Time<br>• Sort Order: First across line<br>• Laps: Variable (15-30)<br>• Disciplines: MotoGP (road), Motocross (dirt), Supercross | • Motor sport<br>• Classes: Moto3, Moto2, MotoGP<br>• Qualifying sets grid |
| **Mountain Biking** | `mountain_biking` | • Measure by: Time (XC) / Points (downhill runs)<br>• Sort Order: Ascending<br>• Disciplines: Cross-Country, Downhill, Enduro<br>• Laps: Multiple (XC) / Single (DH) | • Olympic: XC<br>• Downhill: Timed runs<br>• Enduro: Timed stages |
| **Ninja Sport** | `ninja_sport` | • Measure by: Time (obstacle course)<br>• Sort Order: Ascending<br>• Obstacles: Sequential challenges<br>• Falls: Elimination or time penalty | • American Ninja Warrior style<br>• Obstacle course racing<br>• Speed + strength + agility |
| **Obstacle Course Racing (OCR)** | `ocr` | • Measure by: Time<br>• Sort Order: Ascending<br>• Distance: 5K - Ultra (50K+)<br>• Obstacles: 20-40<br>• Penalties: Burpees (30) for failed obstacles | • Spartan Race, Tough Mudder<br>• Mud, walls, barbed wire<br>• Elite vs Open divisions |
| **Open Water Swimming** | `open_water_swimming` | • Measure by: Time<br>• Sort Order: Ascending<br>• Distance: 5K / 10K (Olympic) / 25K<br>• Environment: Lake, ocean, river | • Olympic: 10K marathon swim<br>• Mass start<br>• Buoy turns |
| **Parachuting** | `parachuting` | • Measure by: Accuracy (landing) / Style (judged)<br>• Sort Order: Points (accuracy) / Judges (style)<br>• Disciplines: Accuracy, Freestyle, Formation<br>• Attempts: Multiple jumps | • Air sport<br>• Skydiving competitions<br>• Target landing (10cm disc) |
| **Rhythmic Gymnastics** | `rhythmic_gymnastics` | • Measure by: Points (D-score + E-score)<br>• Apparatus: Rope, Hoop, Ball, Clubs, Ribbon<br>• Judges: Technical + Artistic panels<br>• Events: Individual All-Around, Group | • Olympic sport (women only)<br>• Dance + apparatus manipulation<br>• Music timing |
| **Rowing** | `rowing` | • Measure by: Time<br>• Sort Order: Ascending<br>• Distance: 2000m (Olympic)<br>• Boat Classes: Single, Double, Quad, Eight<br>• Heats: Qualify → Finals | • Olympic sport<br>• Sculling (2 oars) vs Sweep (1 oar)<br>• Coxswain in eights |
| **Sailing** | `sailing` | • Measure by: Points (races) or Position<br>• Sort Order: Lowest total points<br>• Races: Multiple (regatta)<br>• Scoring: Low point system (1st=1pt, 2nd=2pt)<br>• Classes: Laser, 470, 49er, etc. | • Olympic sport<br>• Race series (usually 10-12 races)<br>• Drop worst race |
| **Shooting** | `shooting` | • Measure by: Points (target score)<br>• Sort Order: Descending<br>• Disciplines: Rifle, Pistol, Shotgun<br>• Shots: 60 (rifle/pistol) / 125 (trap/skeet)<br>• Max Score: 10.9 per shot (rifle) | • Olympic sport<br>• Precision marksmanship<br>• Finals: Top 8 advance |
| **Skeleton** | `skeleton` | • Measure by: Time (combined runs)<br>• Sort Order: Ascending<br>• Runs: 4 (Olympic)<br>• Aggregation: Sum of runs | • Winter Olympic sport<br>• Head-first sled descent<br>• Similar to luge/bobsleigh |
| **Ski Jumping** | `ski_jumping` | • Measure by: Points (distance + style)<br>• Sort Order: Descending<br>• Jumps: 2 per competition<br>• Scoring: Distance points + 5 judges (style)<br>• Hill Size: K90, K120, K185 (ski flying) | • Winter Olympic sport<br>• Distance + Form judged<br>• Wind/gate compensation |
| **Ski Mountaineering (Skimo)** | `ski_mountaineering` | • Measure by: Time (uphill + downhill)<br>• Sort Order: Ascending<br>• Disciplines: Sprint, Vertical, Individual, Team<br>• Transitions: Ski mode changes | • Olympic sport (2026)<br>• Uphill skiing (skins) + downhill<br>• Endurance + technical |
| **Snowboarding** | `snowboarding` | • Measure by: Time (alpine/cross) or Points (halfpipe/slopestyle)<br>• Disciplines: Halfpipe, Slopestyle, Big Air, Parallel GS, Snowboard Cross<br>• Judges: 5-6 (freestyle)<br>• Scoring: Best run (halfpipe) or Race time | • Olympic sport<br>• Freestyle: Tricks judged<br>• Alpine: Racing |
| **Speed Skating** | `speed_skating` | • Measure by: Time<br>• Sort Order: Ascending<br>• Distances: 500m, 1000m, 1500m, 5000m, 10000m<br>• Lanes: 2 (switch each lap) | • Winter Olympic sport<br>• Long track (400m oval)<br>• Short track (111m oval, separate event) |
| **Swimming** | `swimming` | • Measure by: Time<br>• Sort Order: Ascending<br>• Distances: 50m, 100m, 200m, 400m, 800m, 1500m<br>• Strokes: Freestyle, Backstroke, Breaststroke, Butterfly<br>• Relays: 4×100, 4×200 | • Olympic sport<br>• Pool: 50m (long) / 25m (short)<br>• Heats → Semis → Finals |
| **Trampoline** | `trampoline` | • Measure by: Points (difficulty + execution + time of flight)<br>• Number of Judges: 5-7<br>• Routine: 10 skills<br>• Scoring: D-score + E-score + Horizontal displacement penalty | • Olympic sport<br>• Synchronized trampoline (pairs)<br>• Height + form + difficulty |
| **Weightlifting** | `weightlifting` | • Measure by: Weight (kg lifted)<br>• Sort Order: Descending<br>• Lifts: Snatch + Clean & Jerk<br>• Attempts: 3 per lift<br>• Total: Best snatch + best C&J<br>• Bodyweight Classes: 10 (men), 10 (women) | • Olympic sport<br>• Best valid lift counts<br>• Tie-break: Lighter bodyweight wins |
| **Wheelchair Sports** | `wheelchair_sports` | • Measure by: Varies (time/points/position)<br>• Disciplines: Basketball, Rugby, Tennis, Racing, Fencing<br>• Classification: Para sport classes<br>• Adaptations: Sport-specific rules | • Parasport category<br>• Each discipline has adapted rules<br>• Safety/Inclusion priority |
| **Wife Carrying** | `wife_carrying` | • Measure by: Time (obstacle course)<br>• Sort Order: Ascending<br>• Distance: 253.5m<br>• Obstacles: Water, sand, hurdles<br>• Penalty: +15 sec if wife dropped | • Unique/Niche sport<br>• Finnish origin (Eukonkanto)<br>• Min weight: 49kg (penalties if lighter) |
| **World Chase Tag (WCT)** | `world_chase_tag` | • Measure by: Points (tags)<br>• Sort Order: Descending<br>• Format: 1v1 chases (20 sec each)<br>• Chases: Best of 16<br>• Obstacles: Parkour-style arena | • Performance/Agility sport<br>• Evader vs Chaser alternating<br>• Athletic parkour movement |

---

### TURN / MOVE / CYCLE SPORTS (turn_cycle)
*Sports with innings/overs/turns/moves*

| Display Name | Value | Configurable Fields | Sport-Specific Notes |
|--------------|-------|---------------------|----------------------|
| **Baseball** | `baseball` | • Max Innings: 9 (7 for youth)<br>• Outs per Inning: 3<br>• Extra Innings: Unlimited until winner<br>• Pitch Count: Optional limit<br>• Mercy Rule: 10-run rule (optional) | • 9 innings standard (MLB)<br>• 3 outs per half-inning<br>• Runs scored tracked |
| **Bridge (Mind Sport)** | `bridge` | • Boards: 26-32<br>• Scoring: IMPs or Matchpoints<br>• Sessions: Multiple (pairs/teams)<br>• Bidding: Contract bridge rules | • Mental performance sport<br>• Pairs or Teams format<br>• Duplicate bridge standard |
| **Billiards** | `billiards` | • Game Type: Carom (3-cushion) / English<br>• Points to Win: 50-100 (carom)<br>• Innings: Player alternates until miss<br>• Fouls: Ball in hand or spot | • Cue sport<br>• No pockets (carom)<br>• Cushion contact rules |
| **Chess** | `chess` | • Time Control: Rapid (15+10), Blitz (3+2), Classical (90+30)<br>• Moves: Unlimited<br>• Draw Conditions: Stalemate, 3-fold repetition, 50-move rule<br>• Illegal Move: Loses on 2nd offense | • Mental performance sport<br>• FIDE time controls<br>• Touch-move rule |
| **Cricket** | `cricket` | • Overs: 20 (T20) / 50 (ODI) / Unlimited (Test)<br>• Innings: 2 per team (Test) / 1 per team (limited)<br>• Wickets: 10 per innings<br>• Balls per Over: 6<br>• Powerplay: First 6 overs (fielding restrictions) | • Test: 5 days, 2 innings<br>• ODI: 50 overs per side<br>• T20: 20 overs per side<br>• Runs + wickets tracked |
| **Curling** | `curling` | • Ends: 8 or 10<br>• Stones per End: 16 (8 per team)<br>• Scoring: Stones closest to button<br>• Extra End: If tied after regulation<br>• Time: Thinking time per team (38 min) | • Winter Olympic sport<br>• Sweeping affects stone path<br>• Hammer = last stone advantage |
| **Go (Mind Sport)** | `go_mind_sport` | • Board Size: 19×19 (13×13, 9×9 for casual)<br>• Time Control: Byo-yomi (30 sec per move) or Fischer<br>• Komi: 7.5 points (compensation for second player)<br>• Scoring: Territory + captured stones | • Asian strategy game<br>• More complex than chess<br>• Professional ranks (dan) |
| **Pool / Snooker** | `pool_snooker` | • Game Type: 8-Ball, 9-Ball, Snooker<br>• Balls: 15 (8-ball) / 9 (9-ball) / 22 (snooker)<br>• Frames: Best of X<br>• Fouls: Ball in hand (pool) / Points penalty (snooker)<br>• Snooker Scoring: Reds (1) + Colors (2-7) | • Cue sport<br>• 8-ball: Stripes/Solids<br>• Snooker: 147 max break |
| **Softball** | `softball` | • Max Innings: 7<br>• Outs per Inning: 3<br>• Extra Innings: International tie-breaker (runner on 2nd)<br>• Pitch: Underhand<br>• Mercy Rule: 10-run (optional) | • Similar to baseball<br>• Smaller field, larger ball<br>• Fastpitch vs Slowpitch |

---

### COMBAT / BOUT SPORTS (bout_logic)
*Sports with rounds/bouts and decision systems*

| Display Name | Value | Configurable Fields | Sport-Specific Notes |
|--------------|-------|---------------------|----------------------|
| **Beach Wrestling** | `beach_wrestling` | • Rounds: Best of 3 (2 min each)<br>• Win by: Pin, Technical Superiority (3-point lead), Points<br>• Scoring: Takedowns, holds<br>• Sand Surface: Outdoor beach arena | • Beach variant of wrestling<br>• 1-3 point moves<br>• No mat, outdoor sand circle |
| **Boxing (Amateur/Pro)** | `boxing` | • Rounds: 3×3 min (amateur) / 12×3 min (pro)<br>• Round Break: 1 min<br>• Win by: KO, TKO, Decision (points), Disqualification<br>• Scoring: 10-point must system (pro)<br>• Standing Count: Ref's discretion | • Combat sport<br>• Amateur: Headgear, 10oz gloves<br>• Pro: No headgear, 8-10oz gloves |
| **Fencing** | `fencing` | • Bouts: First to 15 touches (or 5 in pools)<br>• Periods: 3×3 min (with 1 min breaks)<br>• Weapon: Foil, Épée, Sabre<br>• Priority: Foil/Sabre (right of way)<br>• Video Review: Allowed | • Olympic sport<br>• Electronic scoring<br>• Foil: Torso target<br>• Épée: Whole body<br>• Sabre: Waist up |
| **Greco-Roman Wrestling** | `greco_roman_wrestling` | • Periods: 2×3 min<br>• Win by: Pin (fall), Technical Superiority (8-point lead), Points<br>• Scoring: Takedowns, throws, exposure<br>• No Leg Attacks: Upper body only | • Olympic sport<br>• No holds below waist<br>• Throws emphasized |
| **Judo** | `judo` | • Duration: 4 min (senior)<br>• Win by: Ippon (full point), 2×Waza-ari, Submission<br>• Scoring: Throws, holds, chokes, armlocks<br>• Golden Score: Sudden death if tied<br>• Penalties: Shido (3 = disqualification) | • Olympic sport<br>• Gi (uniform) required<br>• No strikes, only grappling |
| **Karate** | `karate` | • Duration: 3 min (kumite)<br>• Win by: Points (8-point lead) or Decision<br>• Scoring: Punches (1), Kicks (2-3)<br>• Penalties: Warnings → disqualification<br>• Kata: Judged forms (separate event) | • Olympic sport (Tokyo 2020)<br>• Kumite = sparring<br>• Kata = forms (no opponent) |
| **Mixed Martial Arts (MMA)** | `mma` | • Rounds: 3×5 min (amateur) / 5×5 min (title fights, pro)<br>• Round Break: 1 min<br>• Win by: KO, Submission, Decision (points), Doctor Stoppage<br>• Scoring: 10-point must system<br>• Illegal Moves: Groin strikes, eye gouges, biting | • Combat sport (all disciplines)<br>• Cage or ring<br>• Grappling + striking |
| **Muay Thai** | `muay_thai` | • Rounds: 5×3 min (pro)<br>• Round Break: 2 min<br>• Win by: KO, TKO, Decision<br>• Scoring: Kicks, knees, elbows, punches, clinch<br>• 8-limb striking: Fists, elbows, knees, shins | • Thai boxing<br>• Clinch work allowed<br>• Elbows/knees score high |
| **Sambo** | `sambo` | • Duration: 5 min<br>• Win by: Pin, Submission, Points (12-point lead)<br>• Scoring: Throws, holds, submissions<br>• Variants: Sport Sambo (jacket), Combat Sambo (strikes) | • Russian martial art<br>• Similar to judo + wrestling<br>• Leglocks allowed (unlike judo) |
| **Sumo** | `sumo` | • Bouts: Single round (seconds)<br>• Win by: Force opponent out of ring (dohyo) OR Make them touch ground with anything but feet<br>• Techniques: 82 recognized winning moves<br>• Rituals: Salt throwing, shikiri (pre-bout) | • Japanese traditional sport<br>• No weight classes<br>• Bouts last seconds<br>• Tournament: 15 days |
| **Taekwondo** | `taekwondo` | • Rounds: 3×2 min<br>• Round Break: 1 min<br>• Win by: KO, Points (20-point lead), Decision<br>• Scoring: Head kicks (4-5), Body kicks (2-3), Punches (1)<br>• Penalties: Gam-jeom (10 = disqualification) | • Olympic sport<br>• Electronic scoring (chest guard)<br>• High kicks emphasized |
| **Wrestling (Freestyle)** | `wrestling_freestyle` | • Periods: 2×3 min<br>• Win by: Pin (fall), Technical Superiority (10-point lead), Points<br>• Scoring: Takedowns, exposures, reversals<br>• Leg Attacks: Allowed (vs Greco-Roman) | • Olympic sport<br>• Both upper and lower body holds<br>• More dynamic than Greco-Roman |
| **Wushu** | `wushu` | • Events: Taolu (forms) / Sanda (sparring)<br>• Taolu Scoring: Judges' points (difficulty + execution)<br>• Sanda: 2×2 min rounds, points + KO<br>• Weapons: Staff, sword, spear (taolu) | • Chinese martial art<br>• Taolu = performance<br>• Sanda = combat |

---

### MULTI-DISCIPLINE / HYBRID SPORTS (hybrid)
*Sports combining multiple distinct disciplines*

| Display Name | Value | Configurable Fields | Sport-Specific Notes |
|--------------|-------|---------------------|----------------------|
| **Biathlon** | `biathlon` | • Disciplines: Cross-country skiing + Rifle shooting<br>• Distance: 7.5km (sprint) - 20km (individual)<br>• Shooting Stages: 2 or 4<br>• Targets: 5 per stage<br>• Penalties: Ski penalty loop (150m) OR Time added (1 min) | • Winter Olympic sport<br>• Missed shots = penalty laps<br>• Sprint, Pursuit, Mass Start formats |
| **Modern Pentathlon** | `modern_pentathlon` | • Disciplines: Fencing, Swimming, Equestrian, Laser Run (shooting + running)<br>• Fencing: Épée, round-robin (1-touch bouts)<br>• Swimming: 200m freestyle<br>• Equestrian: Show jumping (12 obstacles)<br>• Laser Run: 4×800m run + 5 shots each<br>• Scoring: Points from each discipline, total highest wins | • Olympic sport<br>• Points convert: Fencing wins, swim time, jump faults, laser run time<br>• One-day competition |
| **Nordic Combined** | `nordic_combined` | • Disciplines: Ski Jumping + Cross-Country Skiing<br>• Jump: K120 normal hill<br>• XC Distance: 10km<br>• Scoring: Jump points convert to time advantage in XC<br>• Format: Gundersen (jump → XC in converted time order) | • Winter Olympic sport<br>• Jump performance = XC start time advantage<br>• First across XC finish wins |
| **Ski Mountaineering (Skimo)** | `ski_mountaineering` | • Disciplines: Uphill (skins) + Downhill (skiing) + Transitions<br>• Formats: Sprint, Vertical, Individual, Team<br>• Transitions: Ski mode changes (climb/ski)<br>• Scoring: Total time (uphill + downhill + transitions) | • Olympic sport (2026)<br>• Endurance racing<br>• Gear transitions critical |
| **Triathlon** | `triathlon` | • Disciplines: Swim, Bike, Run<br>• Distances: Sprint (750m/20km/5km), Olympic (1.5km/40km/10km), Ironman (3.8km/180km/42km)<br>• Transitions: T1 (swim-bike), T2 (bike-run) timed<br>• Scoring: Total elapsed time | • Olympic sport<br>• No stopping clock in transitions<br>• Drafting rules (bike leg) |
| **Esports (certain titles)** | `esports` | • Disciplines: Varies by game (e.g., Rocket League = Soccer + Racing)<br>• Scoring: Game-specific<br>• Format: Best-of series<br>• Note: Most esports are single-discipline (Performance), but some like Rocket League blend mechanics | • Hybrid only if game blends genres<br>• Most esports = Performance category |

---

### USER-DEFINED / CUSTOM SPORTS (custom)
*Sports requiring the Custom Logic Builder wizard*

| Display Name | Value | Configurable Fields | Sport-Specific Notes |
|--------------|-------|---------------------|----------------------|
| **🌐 Other (Please Specify)** | `other` | • Metric: User selects (Points/Time/Distance/Weight/Judges)<br>• Periods: User defines label + quantity<br>• Scoreboard: User builds columns<br>• Archetype: Auto-assigned or override | • Triggers 4-step inline wizard<br>• User defines all rules<br>• Saved to "Frequently Used" list<br>• Example: New regional sport, emerging trend |
| **Boccia (Parasport)** | `boccia` | • Custom due to unique parasport rules<br>• Ends: 4 or 6<br>• Balls: 6 per player/pair<br>• Scoring: Closest to jack<br>• Classification: BC1-BC4 para classes | • Paralympic sport<br>• Similar to bocce<br>• Wheelchair/assistive device rules |
| **Goalball (Parasport)** | `goalball` | • Custom due to blind/visually impaired rules<br>• Halves: 2×12 min<br>• Players: 3 per team<br>• Ball: Bells inside<br>• Penalties: Personal (3 = ejection), Team | • Paralympic sport<br>• All players blindfolded<br>• Sound-based ball tracking |
| **Parasports (General)** | `parasports_general` | • Custom per specific sport<br>• Classification: Para sport classes (varies)<br>• Adaptations: Sport-specific rules<br>• Wizard: User configures exact rules | • Safety/Inclusion category<br>• Each parasport has unique adaptations<br>• Examples: Para athletics, Para swimming, Wheelchair basketball |

---

## IMPLEMENTATION GUIDE FOR AI CODE BUILDER

### Step 1: Sport Selection Dropdown
```javascript
// Sport dropdown data structure
const sportsDropdown = [
  { value: 'soccer', display: 'Soccer', category: 'Primary Talent Pipeline' },
  { value: 'basketball', display: 'Basketball', category: 'Primary Talent Pipeline' },
  // ... all 115 sports from mapping above
  { value: 'other', display: '🌐 Other (Please Specify)', category: '[INPUT REQUIRED]' }
];

// Searchable dropdown with categories
// When user types, filter by display name OR category
// Show category as subtitle under each option
```

### Step 2: Template Group Dispatcher
```javascript
// Template assignment function
function assignTemplate(sportValue) {
  const templateMap = {
    // Time-Structured (18 sports)
    'american_football': { group: 'Time-Structured', key: 'timer_split' },
    'aus_rules_football': { group: 'Time-Structured', key: 'timer_split' },
    'basketball': { group: 'Time-Structured', key: 'timer_split' },
    'basketball_3x3': { group: 'Time-Structured', key: 'timer_split' },
    // ... (map all 115 sports)
    
    // Default/Custom
    'other': { group: 'User-Defined', key: 'custom' }
  };
  
  return templateMap[sportValue] || { group: 'Performance/Measurement', key: 'leaderboard' };
}

// On sport selection:
// 1. Get template group
// 2. Show Game Rules panel
// 3. Inject template-specific fields dynamically
```

### Step 3: Dynamic Field Injection
```javascript
// Template field configurations
const templateFields = {
  'timer_split': {
    alwaysPresent: [
      { name: 'gameLength', label: 'Game Length', type: 'time', format: 'mm:ss' },
      { name: 'periods', label: 'Periods', type: 'number' },
      { name: 'periodDuration', label: 'Period Duration', type: 'time', format: 'mm:ss' },
      { name: 'halftimeBreak', label: 'Halftime Break', type: 'time', format: 'mm:ss' }
    ],
    dynamicInjected: [
      { name: 'overtime', label: 'Overtime', type: 'toggle', subFields: [...] },
      { name: 'suddenDeath', label: 'Sudden Death', type: 'toggle' },
      { name: 'clockStops', label: 'Clock Stops On', type: 'multiSelect', options: [...] }
    ]
  },
  'set_cap': {
    alwaysPresent: [
      { name: 'winBy', label: 'Win By', type: 'dropdown', options: ['Sets', 'Frames', 'Games'] },
      { name: 'pointsPerUnit', label: 'Points per Unit', type: 'number' },
      { name: 'maxUnits', label: 'Max Units', type: 'number' }
    ],
    dynamicInjected: [
      { name: 'tiebreakCap', label: 'Tie-break Cap', type: 'number' },
      { name: 'advantageRule', label: 'Advantage Rule', type: 'toggle' },
      { name: 'deuceLogic', label: 'Deuce Logic', type: 'text' }
    ]
  },
  // ... define all 7 template groups
};

// Render fields inline based on template group
function renderGameRulesFields(templateGroup) {
  const config = templateFields[templateGroup.key];
  
  // Render always-present fields (expanded by default)
  renderSection('Basic Rules', config.alwaysPresent, expanded: true);
  
  // Render dynamic injected fields (inline, below always-present)
  renderSection('Advanced Options', config.dynamicInjected, expanded: false);
}
```

### Step 4: Sport-Specific Defaults
```javascript
// Sport-specific default values
const sportDefaults = {
  'soccer': {
    gameLength: '90:00',
    periods: 2,
    periodDuration: '45:00',
    halftimeBreak: '15:00',
    overtime: true,
    overtimeDuration: '30:00'
  },
  'basketball': {
    gameLength: '40:00', // FIBA default
    periods: 4,
    periodDuration: '10:00',
    halftimeBreak: '15:00',
    shotClock: '24'
  },
  // ... define defaults for all 115 sports
};

// Pre-fill form with defaults on sport selection
function loadSportDefaults(sportValue) {
  const defaults = sportDefaults[sportValue];
  if (defaults) {
    Object.keys(defaults).forEach(field => {
      setFieldValue(field, defaults[field]);
    });
  }
}
```

### Step 5: Custom Sport Wizard (for "Other")
```javascript
// 4-step wizard for custom sports
const customSportWizard = {
  step1: {
    title: 'Metric Definition',
    fields: [
      { name: 'metric', type: 'radio', options: ['Points', 'Time', 'Distance', 'Weight', 'Judges\' Vote'] },
      // If 'Judges\' Vote' selected, expand:
      { name: 'numJudges', type: 'number', condition: 'metric === "Judges\' Vote"' },
      { name: 'criteriaLabels', type: 'textArray', condition: 'metric === "Judges\' Vote"' }
    ]
  },
  step2: {
    title: 'Period Setup',
    fields: [
      { name: 'periodLabel', type: 'text', default: 'Period', placeholder: 'e.g., Innings, Heats, Rounds' },
      { name: 'numPeriods', type: 'number' }
    ]
  },
  step3: {
    title: 'Scoreboard Layout',
    component: 'DragDropColumnBuilder', // Visual builder
    columns: ['Score', 'Time', 'Penalty', 'Custom Metric'],
    livePreview: true
  },
  step4: {
    title: 'Archetype & Save',
    fields: [
      { name: 'autoArchetype', type: 'display', value: 'Performance (based on your selections)' },
      { name: 'archetypeOverride', type: 'dropdown', optional: true, options: ['Performance', 'Target-Score', 'Turn-Based', 'Combat'] },
      { name: 'saveAsTemplate', type: 'checkbox', label: 'Save as Template for future use' }
    ]
  }
};

// Wizard stays inline (no modal)
// Progress indicators: Step 1/4, Step 2/4, etc.
// All data saved to localStorage until final confirmation
```

### Step 6: Preview Rules Button
```javascript
// For Full Sport Archetype Mapping table
// Each row has "Preview Rules" button
function showPreviewRules(sportValue) {
  const sport = sportsMapping[sportValue];
  const template = assignTemplate(sportValue);
  const defaults = sportDefaults[sportValue];
  
  // Inline expansion below table row
  return `
    <div class="preview-panel">
      <h4>${sport.display}</h4>
      <p><strong>Template Group:</strong> ${template.group}</p>
      <p><strong>Logic Key:</strong> ${template.key}</p>
      <h5>Default Configuration:</h5>
      <ul>
        ${Object.keys(defaults).map(key => `<li>${key}: ${defaults[key]}</li>`).join('')}
      </ul>
      <p><strong>Notes:</strong> ${sport.notes}</p>
    </div>
  `;
}
```

---

## CRITICAL RULES FOR AI CODE BUILDER

1. **Template Dispatch is Automatic**: User selects sport → Template group assigned instantly → Game Rules panel unlocks with template-specific fields. NO manual template selection.

2. **Inline Field Injection**: When sport selected, fields appear inline (slide down) in Game Rules panel. NO page reload, NO modal (except full-screen custom wizard).

3. **Defaults Pre-Filled**: Every sport has sensible defaults (see sport-specific notes column). Pre-fill fields on selection to save organizer time.

4. **Custom Wizard Inline**: "🌐 Other" triggers 4-step wizard that expands inline at bottom of Core Identity → Context sub-section. Stepper shows progress. Each step is collapsible card.

5. **Horizontally Scrollable Table**: Full Sport Archetype Mapping table must scroll horizontally on mobile. Each row has "Preview Rules" button that expands inline summary.

6. **Save to Frequently Used**: When user completes custom wizard and saves, add that custom sport to their personal "Frequently Used" list (appears at top of sport dropdown).

7. **Offline Caching**: All sport templates, defaults, and frequently used sports cached in IndexedDB for offline Event Lab creation.

8. **No Guessing**: Use this exact mapping. If a sport isn't listed (shouldn't happen - we have 115), default to Performance/Measurement (leaderboard) template.

---

**END OF COMPLETE SPORT ARCHETYPE MAPPING**

This document is the authoritative source for implementing sport-specific logic in the Mizano Event Lab. Every sport selection must resolve to exactly one template group and inject the correct configurable fields.
