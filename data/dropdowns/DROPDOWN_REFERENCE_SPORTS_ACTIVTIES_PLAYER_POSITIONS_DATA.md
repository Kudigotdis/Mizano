DROPDOWN_REFERENCE_SPORTS_ACTIVTIES_PLAYER_POSITIONS_DATA

# Player Positions & Roles by Sport & Activity
**Used In:** Player Profile, Team Management, Match Roster, Scout Filters, Tactical Boards, Player Performance Analytics

**Architect’s Note:**  
For each sport/activity below, a **searchable dropdown** of positions/roles is presented.  
✅ **Every position includes an adjustable percentage input field** (`Weight %` slider / manual entry, 0–100) — used for proficiency, playing time allocation, or scout weighting.  
🌐 **`Other (Please Specify)`** always triggers a manual text input field for custom/hybrid roles.

---

## A

### Acrobatic Arts
(Used In: Gymnastics/Performance profiles, Troupe management)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| base | Base | Supports and lifts flyers; foundation of stunts | `[SLIDER 0-100]` |
| flyer | Flyer | Performs at the top of stunts; requires flexibility & strength | `[SLIDER 0-100]` |
| spotter | Spotter | Protects flyers; ensures safety during dismounts | `[SLIDER 0-100]` |
| tumbler | Tumbler | Executes floor passes and tumbling runs | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Custom acrobatic role | `[TEXT INPUT]` |

---

### Aerobatics
(Used In: Aviation sport profiles, competitive flying)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| pilot | Pilot | Controls the aircraft during aerobatic maneuvers | `[SLIDER 0-100]` |
| co_pilot | Co-Pilot | Assists pilot; safety monitoring | `[SLIDER 0-100]` |
| judge | Judge (if applicable) | Official evaluator in competitions | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Crew, coach, etc. | `[TEXT INPUT]` |

---

### Air Sports (General)
(Used In: General aviation, recreational flying)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| pilot | Pilot | Primary operator of aircraft | `[SLIDER 0-100]` |
| passenger | Passenger | Non-operating participant | `[SLIDER 0-100]` |
| instructor | Instructor | Provides training and certification | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Ground crew, spotter | `[TEXT INPUT]` |

---

### American Football
(Used In: Team management, roster, scouting)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| qb | Quarterback | Offensive leader; throws passes | `[SLIDER 0-100]` |
| rb | Running Back | Carries the ball; runs routes | `[SLIDER 0-100]` |
| wr | Wide Receiver | Catches passes; runs deep routes | `[SLIDER 0-100]` |
| te | Tight End | Hybrid blocker/receiver | `[SLIDER 0-100]` |
| ol | Offensive Lineman | Blocks for QB and runners | `[SLIDER 0-100]` |
| dt | Defensive Tackle | Interior line; stops run | `[SLIDER 0-100]` |
| de | Defensive End | Edge rusher; contains outside | `[SLIDER 0-100]` |
| lb | Linebacker | Versatile defender; coverage/run stop | `[SLIDER 0-100]` |
| cb | Cornerback | Pass coverage on receivers | `[SLIDER 0-100]` |
| s | Safety | Deep coverage; run support | `[SLIDER 0-100]` |
| k | Kicker | Placekicks, kickoffs | `[SLIDER 0-100]` |
| p | Punter | Kicks on fourth down | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Utility, special teams gunner | `[TEXT INPUT]` |

---

### Archery
(Used In: Individual precision sport, Olympic pipeline)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| recurve | Recurve Archer | Olympic discipline; standard bow | `[SLIDER 0-100]` |
| compound | Compound Archer | Uses pulley system; higher precision | `[SLIDER 0-100]` |
| barebow | Barebow Archer | Minimal equipment; traditional | `[SLIDER 0-100]` |
| longbow | Longbow Archer | Historical style | `[SLIDER 0-100]` |
| coach | Coach | Technical/tactical trainer | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Judge, marshal | `[TEXT INPUT]` |

---

### Artistic Gymnastics
(Used In: Olympic gymnastics, club competition)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| aa | All-Around | Competes in all apparatus | `[SLIDER 0-100]` |
| fx | Floor Specialist | Focus on floor exercise | `[SLIDER 0-100]` |
| vt | Vault Specialist | Focus on vault | `[SLIDER 0-100]` |
| ub | Uneven Bars Specialist | Women's apparatus | `[SLIDER 0-100]` |
| bb | Balance Beam Specialist | Women's apparatus | `[SLIDER 0-100]` |
| ph | Pommel Horse Specialist | Men's apparatus | `[SLIDER 0-100]` |
| sr | Still Rings Specialist | Men's apparatus | `[SLIDER 0-100]` |
| pb | Parallel Bars Specialist | Men's apparatus | `[SLIDER 0-100]` |
| hb | Horizontal Bar Specialist | Men's apparatus | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Choreographer, coach | `[TEXT INPUT]` |

---

### Artistic Swimming
(Used In: Aquatics, synchronized swimming)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| solo | Solo Swimmer | Performs alone | `[SLIDER 0-100]` |
| duet | Duet Partner | Pairs routine | `[SLIDER 0-100]` |
| team | Team Member | Part of a team routine | `[SLIDER 0-100]` |
| combo | Combo Swimmer | Participates in combination routine | `[SLIDER 0-100]` |
| figure | Figure Specialist | Focuses on technical figures | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Choreographer, coach | `[TEXT INPUT]` |

---

### Athletics (Track & Field)
(Used In: Primary talent pipeline, individual/team events)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| sprints | Sprints (100m–400m) | Short-distance speed events | `[SLIDER 0-100]` |
| hurdles | Hurdles | Sprint with obstacles | `[SLIDER 0-100]` |
| mid_dist | Middle Distance (800m–3000m) | Tactical racing | `[SLIDER 0-100]` |
| long_dist | Long Distance (5000m+) | Endurance events | `[SLIDER 0-100]` |
| marathon | Marathon / Road Running | 42.195km specialist | `[SLIDER 0-100]` |
| race_walk | Race Walking | Technical endurance | `[SLIDER 0-100]` |
| jumps_hj | High Jump | Vertical jump | `[SLIDER 0-100]` |
| jumps_pv | Pole Vault | Vertical jump with pole | `[SLIDER 0-100]` |
| jumps_lj | Long Jump | Horizontal jump | `[SLIDER 0-100]` |
| jumps_tj | Triple Jump | Horizontal jump with phases | `[SLIDER 0-100]` |
| throws_sp | Shot Put | Throwing heavy metal ball | `[SLIDER 0-100]` |
| throws_dt | Discus Throw | Throwing discus | `[SLIDER 0-100]` |
| throws_jt | Javelin Throw | Throwing javelin | `[SLIDER 0-100]` |
| throws_ht | Hammer Throw | Throwing hammer | `[SLIDER 0-100]` |
| combined | Combined Events (Decathlon/Heptathlon) | Multi-event athlete | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, official | `[TEXT INPUT]` |

---

### Australian Rules Football
(Used In: Team sport, Australian football)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| fwd | Forward | Primary goal scorer | `[SLIDER 0-100]` |
| mid | Midfielder | Ball winner; link-up play | `[SLIDER 0-100]` |
| def | Defender | Prevents opposition scoring | `[SLIDER 0-100]` |
| ruck | Ruckman | Taps ball at stoppages | `[SLIDER 0-100]` |
| utl | Utility | Plays multiple positions | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, runner | `[TEXT INPUT]` |

---

## B

### Badminton
(Used In: Racquet sport, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| singles | Singles Player | 1v1 court coverage | `[SLIDER 0-100]` |
| doubles_f | Doubles (Front) | Net player; fast reactions | `[SLIDER 0-100]` |
| doubles_r | Doubles (Rear) | Backcourt attacker | `[SLIDER 0-100]` |
| mixed | Mixed Doubles | Gender-combined team | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Ballooning
(Used In: Aviation lifestyle sport)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| pilot | Pilot | Controls hot air balloon | `[SLIDER 0-100]` |
| crew | Crew Member | Ground support, chase crew | `[SLIDER 0-100]` |
| passenger | Passenger | Participant | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Instructor | `[TEXT INPUT]` |

---

### Baseball
(Used In: Team sport, bat-and-ball)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| p | Pitcher | Throws ball to batter | `[SLIDER 0-100]` |
| c | Catcher | Receives pitches; defends home plate | `[SLIDER 0-100]` |
| 1b | First Baseman | Infield; catches throws at first | `[SLIDER 0-100]` |
| 2b | Second Baseman | Infield; double-play pivot | `[SLIDER 0-100]` |
| 3b | Third Baseman | Infield; quick reflexes | `[SLIDER 0-100]` |
| ss | Shortstop | Infield captain; range and arm | `[SLIDER 0-100]` |
| lf | Left Fielder | Outfield; left side | `[SLIDER 0-100]` |
| cf | Center Fielder | Outfield; speed and coverage | `[SLIDER 0-100]` |
| rf | Right Fielder | Outfield; strong arm | `[SLIDER 0-100]` |
| dh | Designated Hitter | Hits in place of pitcher (AL rules) | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, pinch runner | `[TEXT INPUT]` |

---

### Basketball
(Used In: Primary talent pipeline, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| pg | Point Guard | Primary ball-handler; playmaker | `[SLIDER 0-100]` |
| sg | Shooting Guard | Scoring guard; perimeter shooter | `[SLIDER 0-100]` |
| sf | Small Forward | Versatile wing; slash and defend | `[SLIDER 0-100]` |
| pf | Power Forward | Interior scorer; rebounder | `[SLIDER 0-100]` |
| c | Center | Post player; rim protector | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | 6th man, specialist | `[TEXT INPUT]` |

---

### Basketball 3x3
(Used In: Olympic half-court format)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| primary | Primary Ball-Handler | Initiates offense | `[SLIDER 0-100]` |
| shooter | Shooter | Spot-up perimeter threat | `[SLIDER 0-100]` |
| post | Post Player | Inside scoring/rebounding | `[SLIDER 0-100]` |
| utility | Utility | Fills gaps; defensive stopper | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Specialist | `[TEXT INPUT]` |

---

### Beach Handball
(Used In: Team sport, sand variant)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| fw | Forward | Primary attacker | `[SLIDER 0-100]` |
| df | Defender | Stops opposition attacks | `[SLIDER 0-100]` |
| gk | Goalkeeper | Shots on goal | `[SLIDER 0-100]` |
| spec | Specialist | Spin shots, 360° moves | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, referee | `[TEXT INPUT]` |

---

### Beach Soccer
(Used In: Team sport, sand)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| gk | Goalkeeper | Shot stopper on sand | `[SLIDER 0-100]` |
| df | Defender | Back line | `[SLIDER 0-100]` |
| mf | Midfielder | Transition, link-up | `[SLIDER 0-100]` |
| fw | Forward | Attacker, acrobatic finishes | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Pivot, specialist | `[TEXT INPUT]` |

---

### Beach Volleyball
(Used In: Olympic sand court, 2v2)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| blocker | Blocker | Net defense; blocks spikes | `[SLIDER 0-100]` |
| defender | Defender | Backcourt digs, serves receive | `[SLIDER 0-100]` |
| all_around | All-Around | Both blocking and defending | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, partner | `[TEXT INPUT]` |

---

### Beach Wrestling
(Used In: Combat sport on sand)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| wrestler | Wrestler | Competitor | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, referee | `[TEXT INPUT]` |

---

### Biathlon
(Used In: Winter sport, cross-country + shooting)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| sprinter | Sprint Specialist | Shorter distance, high pace | `[SLIDER 0-100]` |
| pursuit | Pursuit Specialist | Starting intervals, tactical | `[SLIDER 0-100]` |
| individual | Individual Specialist | Longer distance, penalty minutes | `[SLIDER 0-100]` |
| relay | Relay Team Member | Team event leg | `[SLIDER 0-100]` |
| mass_start | Mass Start Specialist | Pack racing, shooting under pressure | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, technician | `[TEXT INPUT]` |

---

### Billiards
(Used In: Cue sport, precision)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| player | Player | Competitor | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, referee | `[TEXT INPUT]` |

---

### BMX (Cycling)
(Used In: Olympic cycling, racing/freestyle)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| racer | BMX Racer | Gate start, speed, jumps | `[SLIDER 0-100]` |
| freestyler | BMX Freestyle | Park, flatland, street tricks | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, judge | `[TEXT INPUT]` |

---

### Bobsleigh
(Used In: Winter sport, sleigh racing)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| pilot | Pilot | Steers the sled | `[SLIDER 0-100]` |
| brakeman | Brakeman | Stops sled at finish; powerful push | `[SLIDER 0-100]` |
| crew | Crew Member (2-man/4-man) | Pusher, keeps low | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, technician | `[TEXT INPUT]` |

---

### Boccia (Parasport)
(Used In: Parasport, precision ball sport)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| bc1 | BC1 | Athlete with assistant | `[SLIDER 0-100]` |
| bc2 | BC2 | Athlete without assistant | `[SLIDER 0-100]` |
| bc3 | BC3 | Athlete uses ramp; assistant | `[SLIDER 0-100]` |
| bc4 | BC4 | Severe physical impairment | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Ramp operator, coach | `[TEXT INPUT]` |

---

### Bowling (Ten-pin/Nine-pin)
(Used In: Precision sport, alley)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| stroker | Stroker | Smooth, consistent release | `[SLIDER 0-100]` |
| cranker | Cranker | High rev rate, power | `[SLIDER 0-100]` |
| tweener | Tweener | Between stroker and cranker | `[SLIDER 0-100]` |
| two_handed | Two-Handed | No thumb, high revs | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Boxing (Amateur/Pro)
(Used In: Combat sport, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| out_boxer | Out-Boxer | Utilizes reach, footwork | `[SLIDER 0-100]` |
| swarmer | Swarmer | Pressure fighter, volume puncher | `[SLIDER 0-100]` |
| slugger | Slugger | Power puncher, brawler | `[SLIDER 0-100]` |
| boxer_puncher | Boxer-Puncher | Balanced offense/defense | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, cutman | `[TEXT INPUT]` |

---

### Breaking (Dance Sport)
(Used In: Olympic performance, street dance)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| bboy | B-Boy/B-Girl | Competitor | `[SLIDER 0-100]` |
| top_rock | Top Rock Specialist | Standing moves | `[SLIDER 0-100]` |
| down_rock | Down Rock Specialist | Footwork on floor | `[SLIDER 0-100]` |
| freeze | Freeze Specialist | Power holds | `[SLIDER 0-100]` |
| power | Power Move Specialist | Windmills, flares, etc. | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | DJ, MC, judge | `[TEXT INPUT]` |

---

### Bridge (Mind Sport)
(Used In: Mental performance, card game)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| declarer | Declarer | Plays the hand | `[SLIDER 0-100]` |
| dummy | Dummy | Partner of declarer; places cards | `[SLIDER 0-100]` |
| defender | Defender | Opponent trying to defeat contract | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, tournament director | `[TEXT INPUT]` |

---

## C

### Canoeing (Coastal/Slalom/Sprint)
(Used In: Aquatics, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| sprinter | Sprint Canoeist | Flatwater, 200m/500m/1000m | `[SLIDER 0-100]` |
| slalom | Slalom Canoeist | Whitewater, gates | `[SLIDER 0-100]` |
| coastal | Coastal Canoeist | Open water, waves | `[SLIDER 0-100]` |
| kayak | Kayaker | Sit-in boat, double-bladed paddle | `[SLIDER 0-100]` |
| canadian | Canadian Canoe | Single-bladed paddle, kneeling | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, safety boater | `[TEXT INPUT]` |

---

### Chess
(Used In: Mental performance, mind sport)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| player | Player | Competitor | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, arbiter | `[TEXT INPUT]` |

---

### Cricket
(Used In: Team sport, bat-and-ball)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| bat | Batter | Scores runs | `[SLIDER 0-100]` |
| bowl | Bowler | Delivers ball; pace/spin | `[SLIDER 0-100]` |
| wk | Wicket-Keeper | Behind stumps; catches | `[SLIDER 0-100]` |
| ar | All-Rounder | Competent batter and bowler | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, umpire | `[TEXT INPUT]` |

---

### Curling
(Used In: Winter sport, team)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| skip | Skip | Calls shots; throws last two stones | `[SLIDER 0-100]` |
| vice | Vice-Skip | Holds broom for skip; throws third | `[SLIDER 0-100]` |
| second | Second | Throws second two stones | `[SLIDER 0-100]` |
| lead | Lead | Throws first two stones; sweeping | `[SLIDER 0-100]` |
| alternate | Alternate | Substitute | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, technical official | `[TEXT INPUT]` |

---

### Cycleball
(Used In: Unique cycling sport, indoor)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| attacker | Attacker | Scores goals | `[SLIDER 0-100]` |
| defender | Defender | Prevents goals | `[SLIDER 0-100]` |
| all_round | All-Round | Both roles | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Cycling (Road/Mountain Bike)
(Used In: Primary talent pipeline)

**Road Cycling:**

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| gc | General Classification | Stage race contender | `[SLIDER 0-100]` |
| sprinter | Sprinter | Flat finish specialist | `[SLIDER 0-100]` |
| climber | Climber | Mountain specialist | `[SLIDER 0-100]` |
| tt | Time Trialist | Against-the-clock specialist | `[SLIDER 0-100]` |
| domestique | Domestique | Supports team leaders | `[SLIDER 0-100]` |
| puncheur | Puncheur | Short, steep hills | `[SLIDER 0-100]` |

**Mountain Bike:**

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| xc | Cross-Country | Endurance, technical climbs | `[SLIDER 0-100]` |
| dh | Downhill | High-speed descent | `[SLIDER 0-100]` |
| enduro | Enduro | Mixed terrain, timed stages | `[SLIDER 0-100]` |
| trail | Trail Rider | Recreational/backcountry | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, mechanic | `[TEXT INPUT]` |

---

## D

### Dance Sport
(Used In: Performance, competitive dance)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| latin | Latin Dancer | Cha-cha, samba, rumba, etc. | `[SLIDER 0-100]` |
| ballroom | Ballroom Dancer | Waltz, tango, foxtrot, etc. | `[SLIDER 0-100]` |
| lead | Lead | Guides partner | `[SLIDER 0-100]` |
| follow | Follow | Responds to lead | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Choreographer, coach | `[TEXT INPUT]` |

---

### Darts
(Used In: Precision sport)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| player | Player | Competitor | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, scorer | `[TEXT INPUT]` |

---

### Diving
(Used In: Aquatics, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| springboard | Springboard Diver | 1m/3m flexible board | `[SLIDER 0-100]` |
| platform | Platform Diver | 10m rigid platform | `[SLIDER 0-100]` |
| synchronized | Synchronized Diver | Pair synchronized | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Donkey Racing
(Used In: Botswana regional/cultural sport)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| jockey | Jockey | Rides the donkey | `[SLIDER 0-100]` |
| trainer | Trainer | Prepares donkey for race | `[SLIDER 0-100]` |
| owner | Owner | Enters donkey in competition | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Groom, handler | `[TEXT INPUT]` |

---

## E

### Equestrian
(Used In: Animal sport, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| dressage | Dressage Rider | Precision, elegance | `[SLIDER 0-100]` |
| jumping | Show Jumper | Obstacle course | `[SLIDER 0-100]` |
| eventing | Eventer | Combined: dressage, XC, jumping | `[SLIDER 0-100]` |
| endurance | Endurance Rider | Long-distance competition | `[SLIDER 0-100]` |
| reining | Reining | Western patterns, spins, stops | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Groom, coach | `[TEXT INPUT]` |

---

### Esports (Competitive Gaming)
(Used In: Digital talent pipeline)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| carry | Carry (MOBA) | Main damage dealer | `[SLIDER 0-100]` |
| support | Support | Utility, vision, heals | `[SLIDER 0-100]` |
| tank | Tank | Initiates fights, absorbs damage | `[SLIDER 0-100]` |
| jungler | Jungler (MOBA) | Roams between lanes | `[SLIDER 0-100]` |
| awper | AWPer (FPS) | Sniper rifle specialist | `[SLIDER 0-100]` |
| rifler | Rifler (FPS) | Rifle primary | `[SLIDER 0-100]` |
| igl | In-Game Leader | Calls strategies | `[SLIDER 0-100]` |
| flex | Flex Player | Plays multiple roles | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, analyst | `[TEXT INPUT]` |

---

## F

### Fencing
(Used In: Combat, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| foil | Foilist | Light thrusting weapon; right-of-way | `[SLIDER 0-100]` |
| epee | Epeeist | Heavier; whole body target; simultaneous hits | `[SLIDER 0-100]` |
| sabre | Sabreur | Cutting/thrusting; above waist; right-of-way | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, referee | `[TEXT INPUT]` |

---

### Figure Skating
(Used In: Performance, Olympic winter)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| singles | Singles Skater | Individual routine | `[SLIDER 0-100]` |
| pairs | Pairs Skater | Partnered lifts, throws | `[SLIDER 0-100]` |
| ice_dance | Ice Dancer | Focus on footwork, rhythm | `[SLIDER 0-100]` |
| synchronized | Synchronized Skater | Team formations | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Choreographer, coach | `[TEXT INPUT]` |

---

### Flag Football
(Used In: Non-contact team sport)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| qb | Quarterback | Passer | `[SLIDER 0-100]` |
| rb | Running Back | Ball carrier | `[SLIDER 0-100]` |
| wr | Wide Receiver | Pass catcher | `[SLIDER 0-100]` |
| db | Defensive Back | Pulls flags, coverage | `[SLIDER 0-100]` |
| blitzer | Blitzer | Rushes QB | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Floorball
(Used In: Indoor team sport)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| gk | Goalkeeper | No stick; saves with body | `[SLIDER 0-100]` |
| df | Defender | Protects own goal | `[SLIDER 0-100]` |
| fw | Forward | Attacks opponent goal | `[SLIDER 0-100]` |
| center | Center | Two-way player | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Freestyle Skiing
(Used In: Winter sport, aerial/moguls)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| moguls | Moguls Skier | Bumps, jumps | `[SLIDER 0-100]` |
| aerials | Aerials Skier | High jumps, twists | `[SLIDER 0-100]` |
| ski_cross | Ski Cross | Head-to-head racing | `[SLIDER 0-100]` |
| halfpipe | Halfpipe Skier | Tricks in U-shaped pipe | `[SLIDER 0-100]` |
| slopestyle | Slopestyle Skier | Rails, jumps on course | `[SLIDER 0-100]` |
| big_air | Big Air | Single massive jump | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Futsal
(Used In: Indoor soccer variant)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| gk | Goalkeeper | Shot stopper; distribution | `[SLIDER 0-100]` |
| fixo | Fixo (Defender) | Last line before keeper | `[SLIDER 0-100]` |
| ala | Ala (Winger) | Right/left wide player | `[SLIDER 0-100]` |
| pivo | Pivo (Pivot) | Target forward; holds up play | `[SLIDER 0-100]` |
| universal | Universal | All-rounder | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

## G

### Gaelic Football
(Used In: Irish team sport)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| gk | Goalkeeper | Sole player who can touch ground with hands | `[SLIDER 0-100]` |
| fb | Full Back | Defensive core | `[SLIDER 0-100]` |
| hb | Half Back | Defensive wing | `[SLIDER 0-100]` |
| mf | Midfielder | Aerial duels, link play | `[SLIDER 0-100]` |
| hf | Half Forward | Attacking support | `[SLIDER 0-100]` |
| ff | Full Forward | Primary scorer | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Go (Mind Sport)
(Used In: Strategic board game)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| player | Player | Competitor | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, referee | `[TEXT INPUT]` |

---

### Go Karting
(Used In: Motor sport, entry-level)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| driver | Driver | Controls kart | `[SLIDER 0-100]` |
| mechanic | Mechanic | Maintains kart | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Goalball (Parasport)
(Used In: Safety/inclusion, visually impaired)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| center | Center | Central defender, often thrower | `[SLIDER 0-100]` |
| left_wing | Left Wing | Left side defender | `[SLIDER 0-100]` |
| right_wing | Right Wing | Right side defender | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Guide, coach | `[TEXT INPUT]` |

---

### Golf
(Used In: Precision, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| player | Player | Competitor | `[SLIDER 0-100]` |
| caddie | Caddie | Carries clubs, advises | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Greco-Roman Wrestling
(Used In: Combat, Olympic; no holds below waist)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| wrestler | Wrestler | Competitor | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

## H

### Handball
(Used In: Team sport, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| gk | Goalkeeper | Shot stopper | `[SLIDER 0-100]` |
| lw | Left Wing | Fast breaks, corner shots | `[SLIDER 0-100]` |
| rw | Right Wing | Fast breaks, corner shots | `[SLIDER 0-100]` |
| lb | Left Back | Powerful shooter from distance | `[SLIDER 0-100]` |
| rb | Right Back | Powerful shooter from distance | `[SLIDER 0-100]` |
| cm | Centre Back | Playmaker, pivot distribution | `[SLIDER 0-100]` |
| pv | Pivot | Line player; close range, screens | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, referee | `[TEXT INPUT]` |

---

### Hockey (Field)
(Used In: Team sport, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| gk | Goalkeeper | Full protective gear; stops shots | `[SLIDER 0-100]` |
| df | Defender | Back line, tackles | `[SLIDER 0-100]` |
| mf | Midfielder | Link-up, transition | `[SLIDER 0-100]` |
| fw | Forward | Attacker, scorer | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, umpire | `[TEXT INPUT]` |

---

### Hockey (Ice)
(Used In: Team sport, winter Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| g | Goaltender | Stops pucks | `[SLIDER 0-100]` |
| ld | Left Defense | Defensive left side | `[SLIDER 0-100]` |
| rd | Right Defense | Defensive right side | `[SLIDER 0-100]` |
| lw | Left Wing | Offensive left side | `[SLIDER 0-100]` |
| c | Center | Faceoffs, two-way | `[SLIDER 0-100]` |
| rw | Right Wing | Offensive right side | `[SLIDER 0-100]` |
| en | Enforcer | Physical play, fights | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Hockey (Roller)
(Used In: Team sport, quad/inline)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| gk | Goalkeeper | Kneeling or standing | `[SLIDER 0-100]` |
| df | Defender | Back line | `[SLIDER 0-100]` |
| fw | Forward | Attacker | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Horse Polo
(Used In: Animal sport, team)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| 1 | Number 1 | Primary attacker | `[SLIDER 0-100]` |
| 2 | Number 2 | Offensive support | `[SLIDER 0-100]` |
| 3 | Number 3 | Playmaker, pivot | `[SLIDER 0-100]` |
| 4 | Number 4 | Defender | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, umpire | `[TEXT INPUT]` |

---

### Horse Racing
(Used In: Animal sport, racing)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| jockey | Jockey | Rides horse | `[SLIDER 0-100]` |
| trainer | Trainer | Prepares horse | `[SLIDER 0-100]` |
| owner | Owner | Enters horse | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Groom | `[TEXT INPUT]` |

---

## J

### Judo
(Used In: Combat, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| tori | Tori | Executes technique | `[SLIDER 0-100]` |
| uke | Uke | Receiver of technique | `[SLIDER 0-100]` |
| competitor | Competitor | Match player | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, referee | `[TEXT INPUT]` |

---

### Jukskei
(Used In: Botswana regional/cultural sport)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| thrower | Thrower | Aims skey at peg | `[SLIDER 0-100]` |
| captain | Team Captain | Calls tactics | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, scorer | `[TEXT INPUT]` |

---

## K

### Karate
(Used In: Combat, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| kumite | Kumite Competitor | Sparring | `[SLIDER 0-100]` |
| kata | Kata Competitor | Forms demonstration | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, judge | `[TEXT INPUT]` |

---

## L

### Lacrosse
(Used In: Team sport, stick-based)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| a | Attack | Scores goals | `[SLIDER 0-100]` |
| m | Midfield | Transition, ground balls | `[SLIDER 0-100]` |
| d | Defense | Prevents goals | `[SLIDER 0-100]` |
| g | Goalie | Protects net | `[SLIDER 0-100]` |
| foso | Face-Off Specialist | Wins possession at face-off | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Lawn Bowls
(Used In: Precision, green)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| lead | Lead | Delivers first bowls | `[SLIDER 0-100]` |
| second | Second | Follows lead | `[SLIDER 0-100]` |
| third | Third | Vice-skip, advises | `[SLIDER 0-100]` |
| skip | Skip | Team captain, delivers last bowls | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Luge
(Used In: Winter sport, sledding)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| singles | Singles Luger | One-person sled | `[SLIDER 0-100]` |
| doubles | Doubles Luger | Two-person sled | `[SLIDER 0-100]` |
| team_relay | Team Relay Member | Mixed-gender team event | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, technician | `[TEXT INPUT]` |

---

## M

### Marathon & Road Running
(Used In: Athletics, mass participation)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| elite | Elite Runner | Professional, top tier | `[SLIDER 0-100]` |
| age_group | Age-Group Runner | Competitive in category | `[SLIDER 0-100]` |
| pacer | Pacer | Sets even pace for others | `[SLIDER 0-100]` |
| wheelchair | Wheelchair Athlete | Para division | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, guide runner | `[TEXT INPUT]` |

---

### Mixed Martial Arts (MMA)
(Used In: Combat sport, cage/ring)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| striker | Striker | Stand-up fighter | `[SLIDER 0-100]` |
| grappler | Grappler | Wrestling/BJJ specialist | `[SLIDER 0-100]` |
| all_rounder | All-Rounder | Balanced skills | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, cornerman | `[TEXT INPUT]` |

---

### Modern Pentathlon
(Used In: Multi-sport, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| pentathlete | Pentathlete | Competes in all five disciplines | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, horse handler | `[TEXT INPUT]` |

---

### Motorcycle Racing (MotoGP/Motocross)
(Used In: Motor sport)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| rider | Rider | Controls motorcycle | `[SLIDER 0-100]` |
| mechanic | Mechanic | Maintains bike | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Team manager | `[TEXT INPUT]` |

---

### Mountain Biking
(Used In: Cycling discipline) *See Cycling (Road/Mountain Bike)*

---

### Muay Thai
(Used In: Combat sport, Thai boxing)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| muay_femur | Muay Femur | Technical, intelligent fighter | `[SLIDER 0-100]` |
| muay_mat | Muay Mat | Aggressive, pressure fighter | `[SLIDER 0-100]` |
| muay_khao | Muay Khao | Clinch, knee specialist | `[SLIDER 0-100]` |
| muay_dtae | Muay Dtae | Kicking specialist | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, corner | `[TEXT INPUT]` |

---

## N

### Netball
(Used In: Primary talent pipeline, women's team sport)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| gs | Goal Shooter | Scores in goal circle | `[SLIDER 0-100]` |
| ga | Goal Attack | Feeds shooter, scores | `[SLIDER 0-100]` |
| wa | Wing Attack | Feeds circle, center passes | `[SLIDER 0-100]` |
| c | Centre | Links attack/defense, restart | `[SLIDER 0-100]` |
| wd | Wing Defence | Marks WA, intercepts | `[SLIDER 0-100]` |
| gd | Goal Defence | Marks GA, defends circle | `[SLIDER 0-100]` |
| gk | Goal Keeper | Marks GS, blocks shots | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, umpire | `[TEXT INPUT]` |

---

### Ninja Sport
(Used In: Obstacle/performance, TV competitions)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| speed | Speed Specialist | Fast obstacle clearance | `[SLIDER 0-100]` |
| strength | Strength Specialist | Upper body dominant | `[SLIDER 0-100]` |
| grip | Grip Specialist | Hanging, laches | `[SLIDER 0-100]` |
| balance | Balance Specialist | Precision obstacles | `[SLIDER 0-100]` |
| all_round | All-Round | Competent in all areas | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, course builder | `[TEXT INPUT]` |

---

### Nordic Combined
(Used In: Winter sport, ski jumping + cross-country)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| jumper | Jump Specialist | Strong ski jumping phase | `[SLIDER 0-100]` |
| skier | Cross-Country Specialist | Fast skier | `[SLIDER 0-100]` |
| all_round | All-Round | Balanced | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

## O

### Obstacle Course Racing (OCR)
(Used In: Performance, endurance)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| elite | Elite OCR | Competitive racer | `[SLIDER 0-100]` |
| open | Open Racer | Mass participation | `[SLIDER 0-100]` |
| team | Team Member | Group competition | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Open Water Swimming
(Used In: Aquatics, non-pool)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| swimmer | Swimmer | Competitor | `[SLIDER 0-100]` |
| escort | Escort Pilot | Kayak/boat support | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, safety | `[TEXT INPUT]` |

---

## P

### Padel
(Used In: Racquet sport, doubles)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| drive | Right-side Player | Often more consistent | `[SLIDER 0-100]` |
| revés | Left-side Player | Often stronger hitter | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Parachuting
(Used In: Air sport, skydiving)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| solo | Solo Jumper | Individual | `[SLIDER 0-100]` |
| formation | Formation Skydiver | Relative work in groups | `[SLIDER 0-100]` |
| freefly | Freeflyer | Head-down, vertical flight | `[SLIDER 0-100]` |
| canopy | Canopy Pilot | Steers parachute for accuracy | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Instructor, videographer | `[TEXT INPUT]` |

---

### Parasports (General)
(Used In: Safety/inclusion, umbrella category)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| athlete | Athlete | Competitor | `[SLIDER 0-100]` |
| guide | Guide | Assists visually impaired | `[SLIDER 0-100]` |
| handler | Handler | Assists physical impairment | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, classifier | `[TEXT INPUT]` |

---

### Pickleball
(Used In: Racquet sport, paddle)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| singles | Singles Player | 1v1 | `[SLIDER 0-100]` |
| doubles | Doubles Player | 2v2 | `[SLIDER 0-100]` |
| mixed | Mixed Doubles | Gender-combined | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Polo (Bicycle/Elephant)
(Used In: Unique sport variants)

**Bicycle Polo:**

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| attacker | Attacker | Scores goals | `[SLIDER 0-100]` |
| defender | Defender | Protects goal | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

**Elephant Polo:**

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| mahout | Mahout | Drives elephant | `[SLIDER 0-100]` |
| hitter | Hitter | Strikes ball | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, umpire | `[TEXT INPUT]` |

---

### Pool / Snooker
(Used In: Cue sport)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| player | Player | Competitor | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, referee | `[TEXT INPUT]` |

---

## R

### Racquetball
(Used In: Racquet sport, indoor)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| singles | Singles Player | 1v1 | `[SLIDER 0-100]` |
| doubles | Doubles Player | 2v2 | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Rhythmic Gymnastics
(Used In: Gymnastics/Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| hoop | Hoop Specialist | Apparatus: hoop | `[SLIDER 0-100]` |
| ball | Ball Specialist | Apparatus: ball | `[SLIDER 0-100]` |
| clubs | Clubs Specialist | Apparatus: clubs | `[SLIDER 0-100]` |
| ribbon | Ribbon Specialist | Apparatus: ribbon | `[SLIDER 0-100]` |
| individual | Individual All-Around | Competes all apparatus | `[SLIDER 0-100]` |
| group | Group Gymnast | Team routine | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, choreographer | `[TEXT INPUT]` |

---

### Rowing
(Used In: Aquatics, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| sweep | Sweep Rower | One oar | `[SLIDER 0-100]` |
| scull | Sculler | Two oars | `[SLIDER 0-100]` |
| coxswain | Coxswain | Steers, motivates (if applicable) | `[SLIDER 0-100]` |
| bow | Bow Seat | Sets rhythm | `[SLIDER 0-100]` |
| stroke | Stroke Seat | Sets pace | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Rugby League
(Used In: Team sport, 13-a-side)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| fb | Fullback | Last line, counter-attack | `[SLIDER 0-100]` |
| wg | Wing | Finisher, speed | `[SLIDER 0-100]` |
| ce | Centre | Midfield attacker/defender | `[SLIDER 0-100]` |
| fe | Five-Eighth | Playmaker | `[SLIDER 0-100]` |
| hb | Halfback | Scrum-half, primary kicker | `[SLIDER 0-100]` |
| pr | Prop | Front row, powerful runner | `[SLIDER 0-100]` |
| hk | Hooker | Dummy-half, distributor | `[SLIDER 0-100]` |
| sr | Second Row | Ball-carrying forward | `[SLIDER 0-100]` |
| lk | Lock | Loose forward, workhorse | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, referee | `[TEXT INPUT]` |

---

### Rugby Sevens
(Used In: Team sport, Olympic, 7-a-side)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| speedster | Speedster | Explosive pace, wide attack | `[SLIDER 0-100]` |
| playmaker | Playmaker | Distributor, decision maker | `[SLIDER 0-100]` |
| power | Power Forward | Strong carrier, tackler | `[SLIDER 0-100]` |
| defensive | Defensive Specialist | Key tackler, breakdown | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Rugby Union
(Used In: Team sport, 15-a-side)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| 1 | Loosehead Prop | Front row, scrum stability | `[SLIDER 0-100]` |
| 2 | Hooker | Throw-in at lineout | `[SLIDER 0-100]` |
| 3 | Tighthead Prop | Front row, scrum power | `[SLIDER 0-100]` |
| 4 | Lock (Second Row) | Lineout jumper, engine room | `[SLIDER 0-100]` |
| 5 | Lock (Second Row) | Lineout jumper, engine room | `[SLIDER 0-100]` |
| 6 | Blindside Flanker | Physical, tackling | `[SLIDER 0-100]` |
| 7 | Openside Flanker | Poacher, breakdown specialist | `[SLIDER 0-100]` |
| 8 | Number 8 | Ball carrier, base of scrum | `[SLIDER 0-100]` |
| 9 | Scrum-Half | Distributor from base | `[SLIDER 0-100]` |
| 10 | Fly-Half | Playmaker, kicker | `[SLIDER 0-100]` |
| 11 | Left Wing | Finisher | `[SLIDER 0-100]` |
| 12 | Inside Centre | Powerful runner, distributor | `[SLIDER 0-100]` |
| 13 | Outside Centre | Speed, evasion | `[SLIDER 0-100]` |
| 14 | Right Wing | Finisher | `[SLIDER 0-100]` |
| 15 | Fullback | Last line, counter-attack | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, referee | `[TEXT INPUT]` |

---

## S

### Sailing
(Used In: Aquatics, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| skipper | Skipper | Helm, in charge | `[SLIDER 0-100]` |
| crew | Crew | Trim sails, balance | `[SLIDER 0-100]` |
| tactician | Tactician | Strategy, race decisions | `[SLIDER 0-100]` |
| bowman | Bowman | Foredeck, sail changes | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Sambo
(Used In: Combat sport, wrestling)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| sport_sambo | Sport Sambo | Similar to judo/wrestling | `[SLIDER 0-100]` |
| combat_sambo | Combat Sambo | Striking allowed | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Shooting
(Used In: Precision, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| rifle | Rifle Shooter | Prone/standing/kneeling | `[SLIDER 0-100]` |
| pistol | Pistol Shooter | 10m/25m/50m | `[SLIDER 0-100]` |
| shotgun | Shotgun Shooter | Trap, skeet, double trap | `[SLIDER 0-100]` |
| running_target | Running Target | Moving target | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, referee | `[TEXT INPUT]` |

---

### Skeleton
(Used In: Winter sport, head-first sled)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| slider | Slider | Competitor | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Ski Jumping
(Used In: Winter sport, aerial)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| normal_hill | Normal Hill Specialist | HS 90-100 | `[SLIDER 0-100]` |
| large_hill | Large Hill Specialist | HS 120-140 | `[SLIDER 0-100]` |
| flying | Ski Flying Specialist | HS > 180 | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Ski Mountaineering (Skimo)
(Used In: Winter sport, climbing + skiing)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| climber | Climber | Ascents specialist | `[SLIDER 0-100]` |
| skier | Skier | Descent specialist | `[SLIDER 0-100]` |
| all_round | All-Round | Balanced | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Snowboarding
(Used In: Winter sport, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| alpine | Alpine Snowboarder | Carving, GS | `[SLIDER 0-100]` |
| freestyle | Freestyle Snowboarder | Park, pipe, slopestyle | `[SLIDER 0-100]` |
| boardercross | Boardercross | Head-to-head racing | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Soccer
(Used In: Primary talent pipeline, global team sport)

*Refer to the detailed example in the prompt – this dropdown is mandatory for soccer profiles.*

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| gk | Goalkeeper | Last line of defense; unique rules apply | `[SLIDER 0-100]` |
| lb | Left Back | Wide defender on the left; supports wing play | `[SLIDER 0-100]` |
| rb | Right Back | Wide defender on the right; supports wing play | `[SLIDER 0-100]` |
| cb | Centre Back | Core of the defense; responsible for marking and clearances | `[SLIDER 0-100]` |
| dm | Defensive Midfield | The shield; protects the back four and disrupts play | `[SLIDER 0-100]` |
| cm | Central Midfield | The engine room; links defense to attack | `[SLIDER 0-100]` |
| am | Attacking Midfield | The "Number 10"; creative playmaker behind the strikers | `[SLIDER 0-100]` |
| lw | Left Wing | Attacker on the left flank; focuses on crosses and cutting in | `[SLIDER 0-100]` |
| rw | Right Wing | Attacker on the right flank; focuses on speed and crosses | `[SLIDER 0-100]` |
| cf | Centre Forward | Target man; plays high up, often with back to goal | `[SLIDER 0-100]` |
| st | Striker | Primary goal scorer; focused on finishing in the box | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Triggers text box for hybrid/niche roles | `[TEXT INPUT]` |

---

### Softball
(Used In: Team sport, variant of baseball)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| p | Pitcher | Underhand windmill | `[SLIDER 0-100]` |
| c | Catcher | Squats, receives | `[SLIDER 0-100]` |
| 1b | First Base | Infield | `[SLIDER 0-100]` |
| 2b | Second Base | Infield | `[SLIDER 0-100]` |
| 3b | Third Base | Infield | `[SLIDER 0-100]` |
| ss | Shortstop | Infield captain | `[SLIDER 0-100]` |
| lf | Left Field | Outfield | `[SLIDER 0-100]` |
| cf | Center Field | Outfield | `[SLIDER 0-100]` |
| rf | Right Field | Outfield | `[SLIDER 0-100]` |
| dp | Designated Player | Hits for a fielder | `[SLIDER 0-100]` |
| flex | Flex | Plays defense for DP | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Speed Skating
(Used In: Winter sport, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| long_track | Long Track | 400m oval, timed | `[SLIDER 0-100]` |
| short_track | Short Track | 111m oval, pack racing | `[SLIDER 0-100]` |
| marathon | Marathon Skater | Long distance outdoor | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Squash
(Used In: Racquet sport, indoor)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| singles | Singles Player | 1v1 | `[SLIDER 0-100]` |
| doubles | Doubles Player | 2v2 (rare) | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Sumo
(Used In: Combat, cultural)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| rikishi | Rikishi | Wrestler | `[SLIDER 0-100]` |
| yokozuna | Yokozuna | Grand champion rank | `[SLIDER 0-100]` |
| ozeki | Ozeki | Champion rank | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Gyoji (referee), coach | `[TEXT INPUT]` |

---

### Swimming
(Used In: Aquatics, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| freestyle | Freestyle Specialist | 50m-1500m | `[SLIDER 0-100]` |
| backstroke | Backstroke Specialist | 50m-200m | `[SLIDER 0-100]` |
| breaststroke | Breaststroke Specialist | 50m-200m | `[SLIDER 0-100]` |
| butterfly | Butterfly Specialist | 50m-200m | `[SLIDER 0-100]` |
| im | Individual Medley | All four strokes | `[SLIDER 0-100]` |
| relay | Relay Swimmer | Team events | `[SLIDER 0-100]` |
| open_water | Open Water Swimmer | Non-pool | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

## T

### Table Tennis
(Used In: Racquet, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| shakehand | Shakehand Grip | Common grip | `[SLIDER 0-100]` |
| penhold | Penhold Grip | Traditional Asian grip | `[SLIDER 0-100]` |
| chopper | Chopper | Defensive, heavy backspin | `[SLIDER 0-100]` |
| looper | Looper | Heavy topspin attacker | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Taekwondo
(Used In: Combat, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| kyorugi | Kyorugi (Sparring) | Olympic-style competition | `[SLIDER 0-100]` |
| poomsae | Poomsae (Forms) | Patterns, technique | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, referee | `[TEXT INPUT]` |

---

### Teqball
(Used In: Unique football-based sport)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| singles | Singles Player | 1v1 | `[SLIDER 0-100]` |
| doubles | Doubles Player | 2v2 | `[SLIDER 0-100]` |
| mixed | Mixed Doubles | 1 man + 1 woman | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Tennis
(Used In: Racquet, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| singles | Singles Player | 1v1 | `[SLIDER 0-100]` |
| doubles | Doubles Player | 2v2 | `[SLIDER 0-100]` |
| mixed | Mixed Doubles | Gender-combined | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Trampoline
(Used In: Gymnastics, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| individual | Individual Trampolinist | Solo routine | `[SLIDER 0-100]` |
| synchronized | Synchronized Trampolinist | Paired, same routine | `[SLIDER 0-100]` |
| double_mini | Double Mini Trampolinist | Two landing surfaces | `[SLIDER 0-100]` |
| tumbling | Tumbling | Floor passes on track | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Triathlon
(Used In: Multi-sport, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| swimmer | Swim Specialist | Strong in water | `[SLIDER 0-100]` |
| cyclist | Bike Specialist | Powerful on two wheels | `[SLIDER 0-100]` |
| runner | Run Specialist | Fast off the bike | `[SLIDER 0-100]` |
| all_round | All-Round | Balanced | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

## U

### Ultimate Frisbee
(Used In: Team sport, disc)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| handler | Handler | Primary thrower, playmaker | `[SLIDER 0-100]` |
| cutter | Cutter | Runs deep, catches goals | `[SLIDER 0-100]` |
| defender | Defender | Marks opponent, forces turnovers | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, spirit captain | `[TEXT INPUT]` |

---

## V

### Volleyball
(Used In: Team sport, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| s | Setter | Orchestrates offense | `[SLIDER 0-100]` |
| oh | Outside Hitter | Left side attacker, primary | `[SLIDER 0-100]` |
| mb | Middle Blocker | Net defense, quick attacks | `[SLIDER 0-100]` |
| op | Opposite Hitter | Right side attacker, backup setter | `[SLIDER 0-100]` |
| l | Libero | Defensive specialist, different color jersey | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, referee | `[TEXT INPUT]` |

---

## W

### Water Polo
(Used In: Aquatics, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| gk | Goalkeeper | Stands in goal, blocks shots | `[SLIDER 0-100]` |
| cf | Center Forward (Hole Set) | Offensive pivot near goal | `[SLIDER 0-100]` |
| cd | Center Defender (Hole D) | Guards center forward | `[SLIDER 0-100]` |
| wg | Wing | Outside shooter, drives | `[SLIDER 0-100]` |
| pt | Point | Point guard, sets offense | `[SLIDER 0-100]` |
| fld | Flat / Driver | Mid-range attacker | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Weightlifting
(Used In: Power, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| snatch | Snatch Specialist | One continuous lift overhead | `[SLIDER 0-100]` |
| cj | Clean & Jerk Specialist | Two-part lift | `[SLIDER 0-100]` |
| all_round | All-Round | Competes in both | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Wheelchair Sports
(Used In: Safety/inclusion, parasport)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| wheelchair_basketball | Wheelchair Basketball | Classification specific | `[SLIDER 0-100]` |
| wheelchair_rugby | Wheelchair Rugby (Quad Rugby) | High-contact | `[SLIDER 0-100]` |
| wheelchair_tennis | Wheelchair Tennis | Two-bounce rule | `[SLIDER 0-100]` |
| wheelchair_racing | Wheelchair Racing | Track, road | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, classifier | `[TEXT INPUT]` |

---

### Wife Carrying
(Used In: Unique niche sport)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| carrier | Carrier | Carries the partner | `[SLIDER 0-100]` |
| carried | Carried | Is carried | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, organizer | `[TEXT INPUT]` |

---

### World Chase Tag (WCT)
(Used In: Performance/Agility)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| evader | Evader | Avoids being tagged | `[SLIDER 0-100]` |
| chaser | Chaser | Tries to tag evader | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, referee | `[TEXT INPUT]` |

---

### Wrestling (Freestyle)
(Used In: Combat, Olympic)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| wrestler | Wrestler | Competitor | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach | `[TEXT INPUT]` |

---

### Wushu
(Used In: Combat/Performance)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| taolu | Taolu (Forms) | Choreographed routines | `[SLIDER 0-100]` |
| sanda | Sanda (Sanshou) | Full-contact fighting | `[SLIDER 0-100]` |
| other | 🌐 Other (Please Specify) | Coach, judge | `[TEXT INPUT]` |

---

## 🌐

### Other (Please Specify)
(Used In: Any sport not listed above)

| Value | Display (Dropdown Option) | Typical Role Description | Weight % (Input) |
|-------|---------------------------|--------------------------|------------------|
| custom | — | **Manual Input Required** – User defines sport & role | `[TEXT INPUT]` + `[SLIDER 0-100]` |

---

**End of Document – All 126 Sports & Activities Covered**  
*Each dropdown includes a `Weight % (Input)` slider for performance/scout weighting.*