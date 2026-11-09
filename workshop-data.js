/* P10 workshop data — single source for workshop.html (design pack) and
   workshop-materials.html (printables).

   Rules that keep this honest:
   - Evidence is cited by ID only. Quotes are rendered from workshop-evidence.js,
     which is generated from index.html by scripts/workshop-check.mjs --write,
     so a card can never carry a quote the evidence base does not contain.
   - Anything with no evidence ID is tagged "inferred" or "device" and says so.
   - Run `node scripts/workshop-check.mjs` after any edit here. */

const WS = {

/* ------------------------------------------------------------------ AGENDA */
agenda: [
  {id:"A1", start:0,  mins:6,  kind:"o", title:"Open, consent, role-in",            lead:"A", method:"Framed opening with explicit decision rule"},
  {id:"A2", start:6,  mins:12, kind:"g", title:"Evidence gallery",                  lead:"A", method:"Silent evidence gallery, role-lens stickers"},
  {id:"A3", start:18, mins:10, kind:"g", title:"Changeover walk-through",           lead:"A", method:"First-person journey walk-through on a timeline wall"},
  {id:"A4", start:28, mins:14, kind:"d", title:"Diverge",                           lead:"A", method:"Worst-possible-idea, then silent HMW + constraint cards, 1-2-All"},
  {id:"A5", start:42, mins:14, kind:"e", title:"Service staging",                   lead:"B", method:"Bodystorming on a floor plan with scenario + curveball cards"},
  {id:"A6", start:56, mins:24, kind:"c", title:"Converge and commit",               lead:"A", method:"Assumption map, owner-last dot vote, commitment cards, anonymous dissent round"},
  {id:"A7", start:80, mins:4,  kind:"o", title:"Read-back and close",               lead:"A", method:"Read-back plus anonymous 'what I didn't get to say' slips"},
  {id:"BF", start:84, mins:6,  kind:"b", title:"Held buffer (not scheduled)",       lead:"-", method:"Spent only by the contingency rules"}
],
sessionMins: 90,

/* ------------------------------------------- BOUNDARY OBJECT: THE TIMELINE */
moments: [
  {id:"M1", title:"Deciding where to go tonight",
   now:"Every channel repeats “coffee by day, cocktails by night”; none gives a changeover time. Four channels give four closing times. The cocktail menu is published on one third-party guide only.",
   ev:["SR-W01","SR-W02","SR-A01","SR-O02","SR-J02","SR-A03","SR-O03","SR-W04"], gaps:["C1","C2","C3"], who:["Jordan","First-timer"]},
  {id:"M2", title:"Arriving",
   now:"The dark, minimalist room is what reviewers praise, and in one review it read as closed. At 6:00 PM one customer asked whether coffee was still available.",
   ev:["SR-J07","SR-J08","OB01-E3"], gaps:["C7","C1"], who:["Jordan","First-timer"]},
  {id:"M3", title:"The afternoon crowd turns over",
   now:"At 5:00 PM some customers leave, staff clear tables and new customers find seats. Whether a daytime customer can keep their table into the evening is not evidenced anywhere (inferred for Alex).",
   ev:["OB01-E2","OB01-E6","S1-SQ11"], gaps:["C1"], who:["Alex","Sam"], inferred:true},
  {id:"M4", title:"Staff prepare the changeover",
   now:"Staff move alcohol and supplies to the centre table and one staff member starts the changeover. No time is stated and there is no shift handoff. Cocktail know-how sits with some staff.",
   ev:["S1-SQ08","S1-SQ09","S1-SQ07","S2-SQ03"], gaps:["C1","C6"], who:["Sam","Crossover staff","Owner"]},
  {id:"M5", title:"The signal",
   now:"Small lights go on the tables. Staff explain them only if asked; daytime customers are left undisturbed.",
   ev:["S1-SQ08","S1-SQ11","SR-W01"], gaps:["C1"], who:["Alex","Jordan","Sam"]},
  {id:"M6", title:"The room under load",
   now:"Groups ask staff to move two tables together, and a waiting crowd blocks the one walkway back to the seats.",
   ev:["OB01-E4","OB01-E5"], gaps:[], who:["Jordan","Sam"]},
  {id:"M7", title:"Calling the drink",
   now:"No screen or speaker: staff shout and customers may not hear. Staff call it the hardest part of the job and name their own fix. Included as the control moment — if the room ranks it first, that confirms what we already had.",
   ev:["S1-SQ22","S1-SQ23","SR-J10"], gaps:["C5"], who:["Alex","Sam"]}
],

/* ----------------------------------------------------- EVIDENCE GALLERY */
stations: [
  {id:"ST1", title:"What the channels promise", moment:"M1",
   prompt:"At 6 PM, what would a first-timer believe about whether this place is open and what it serves?",
   ev:["SR-W01","SR-W02","SR-A01","SR-O02","SR-J02","SR-A03","SR-O03"]},
  {id:"ST2", title:"The first look", moment:"M2",
   prompt:"What does the room say to someone standing outside it?",
   ev:["SR-J07","SR-J08","SR-J06","OB01-E3"]},
  {id:"ST3", title:"The turnover", moment:"M3",
   prompt:"Who leaves, who stays, and who decides?",
   ev:["OB01-E1","OB01-E2","OB01-E6","C1-CQ03","C1-CQ06"]},
  {id:"ST4", title:"The signal", moment:"M5",
   prompt:"How does anyone learn that service has changed? Note the card that disagrees with the others.",
   ev:["S1-SQ08","S1-SQ11","OB01-E3","C1-CQ11"]},
  {id:"ST5", title:"Backstage", moment:"M4",
   prompt:"What holds the changeover together when no system does?",
   ev:["S1-SQ07","S1-SQ09","S1-SQ19","S1-SQ20","S2-SQ03","S2-SQ04","S1-SQ05"]},
  {id:"ST6", title:"Under load", moment:"M6 / M7",
   prompt:"Where does the room break first when it is full?",
   ev:["OB01-E4","OB01-E5","S1-SQ22","S1-SQ23","SR-J10","C1-CQ05"]}
],

/* ---------------------------------------------- DIVERGE: PROMPTS + CARDS */
hmw: [
  {id:"H1", text:"How might we let a customer know, without asking anyone, when the room changes from coffee to cocktails?", moments:"M1 · M2 · M5"},
  {id:"H2", text:"How might we let a daytime guest decide to stay or go without feeling moved on?", moments:"M3 · M5"},
  {id:"H3", text:"How might we let staff start and hand over the changeover without relying on memory or one person?", moments:"M4 · M6 · M7"}
],

constraints: [
  {id:"K1", title:"Peak hands", rule:"Your idea may not add a task for counter staff.",
   why:"Staff describe Friday–Sunday peaks as three-person, no-lunch work. Assume the evening is no calmer.",
   basis:"inference", ev:["S1-SQ05"],
   note:"S1-SQ05 describes noon and afternoon peaks. Evening staffing is not evidenced."},
  {id:"K2", title:"Nobody asks", rule:"Assume no customer will ask a question. The idea must work in silence.",
   why:"Staff explain the lights only if asked, and daytime guests are left alone.",
   basis:"evidence", ev:["S1-SQ11","OB01-E3"], note:""},
  {id:"K3", title:"Keep the room's look", rule:"Nothing bright, loud or branded.",
   why:"Reviewers praise the room as dark, cozy and minimalist; a customer calls it quiet.",
   basis:"evidence", ev:["SR-J06","SR-J07","C1-CQ06"], note:"Tension to watch: SR-J08 says the same dark room read as closed."},
  {id:"K4", title:"Licence-holder off shift", rule:"Your idea must work on a shift without the cocktail-licensed staff member.",
   why:"Cocktail know-how is described as one person's background.",
   basis:"inference", ev:["S2-SQ03"],
   note:"Inference from one interview. What licensing the shop actually needs is not evidenced — ask the owner."},
  {id:"K5", title:"Only what the shop controls", rule:"The shop can edit its own website. Yelp, joe.coffee and ATL Coffeeshops keep saying what they say.",
   why:"The map records no contact with those channels.",
   basis:"evidence", ev:["SR-J02","SR-Y01","SR-A01"], note:"Basis: the ecosystem map's touch notes on each channel."},
  {id:"K6", title:"Guest, not problem", rule:"The daytime customer at the table must be treated as someone the shop wants back.",
   why:"Loyalty points and seasonal drinks are the retention levers on record.",
   basis:"evidence", ev:["S1-SQ11","SR-O04","C1-CQ12"], note:""}
],

scenarios: [
  {id:"SC1", title:"“Is coffee still available?”", setup:"6:00 PM. A customer at the counter asks whether coffee is still served.", ev:["OB01-E3"], kind:"evidence"},
  {id:"SC2", title:"Two tables together", setup:"6:30 PM. A group of friends asks staff to move two tables closer.", ev:["OB01-E4"], kind:"evidence"},
  {id:"SC3", title:"The blocked walkway", setup:"7:00 PM. People waiting for drinks stand in the one walkway; others cannot get back to their seats.", ev:["OB01-E5"], kind:"evidence"},
  {id:"SC4", title:"“Can I keep this table?”", setup:"A daytime customer with a laptop notices the lights and wonders whether to pack up.", ev:[], kind:"inferred",
   note:"No evidence that this question is ever asked. Staging it is how the workshop tests the inference."},
  {id:"SC5", title:"The dark frontage", setup:"Evening. Someone approaches, sees a dark room and no open sign, and walks on.", ev:["SR-J08"], kind:"evidence"},
  {id:"SC6", title:"“When do they close?”", setup:"A friend checks four sources and gets four answers.", ev:["SR-W02","SR-A01","SR-O02","SR-J02"], kind:"evidence"}
],

curveballs: [
  {id:"CB1", text:"The licence-holder has just called in sick."},
  {id:"CB2", text:"Six people join the counter line at once."},
  {id:"CB3", text:"The owner is on a call and cannot be reached for ten minutes."},
  {id:"CB4", text:"A daytime customer says, politely: “I'm not leaving.”"}
],

/* ------------------------------------------------------ SPECULATIVE ROLES */
roles: [
  {id:"R-OWN", name:"Owner", arch:"Escalation of last resort", type:"owner", strength:"none",
   source:"Ecosystem map actor “Owner” (visible only through staff accounts). No persona exists.",
   context:"Independent specialty coffee shop and roaster, opened December 2025. Added a cocktail programme in August 2026, so one small room now serves two occasions.",
   knows:[
    {t:"The shop opened in December 2025 and unveiled six cocktails in August 2026.", ev:["SR-A02","SR-A03"]},
    {t:"Your website carries the tagline and one set of hours, but no menu and no changeover time.", ev:["SR-W01","SR-W02","SR-W04"]},
    {t:"Ordering is outsourced to Chowbus, whose menu lists no alcohol.", ev:["SR-W04","SR-O01","SR-O03"]},
    {t:"Staff come to you when seniority cannot settle a question.", ev:["S1-SQ20","S2-SQ20"]},
    {t:"Reviewers praise the room; one thought it was closed.", ev:["SR-J07","SR-J06","SR-J08"]},
    {t:"Staff name the missing screen and speaker as the hardest part of the job and the first thing they would change.", ev:["S1-SQ22","S1-SQ23"]}],
   stance:{text:"You are wary of anything that makes the room feel like a bar by day or a café by night. You will say yes to a rule only if you can name who carries it on a Saturday.", basis:"assigned"},
   unknown:["Your costs, your evening sales, and why no changeover time has ever been set.","Your own view on table-keeping.","The team has never spoken to you (the map notes no access under Indirect Engagement). Everything you say beyond the list above is improvised: tag it IMPROV."]},

  {id:"R-SAM", name:"Sam", arch:"The Counter Barista", type:"staff", strength:"single source",
   source:"Persona p-sam. Interview S1 (15 responses, answered by a team member), with S2 and OB01.",
   context:"Four months at the counter on daytime shifts. Opens the bar before service and carries the room through the weekend peak.",
   knows:[
    {t:"Training was five days plus a short quiz.", ev:["S1-SQ03"]},
    {t:"You open the bar: bottles, machines, the outside area.", ev:["S1-SQ04"]},
    {t:"Friday–Sunday peaks need three people and leave no time for lunch.", ev:["S1-SQ05"]},
    {t:"There is no system: you ask each other before acting. There is no handoff at the end of a shift.", ev:["S1-SQ07","S1-SQ19","S1-SQ09"]},
    {t:"You ask whoever has worked longer, then the boss.", ev:["S1-SQ20"]},
    {t:"One staff member places the table lights; alcohol is staged on the centre table beforehand.", ev:["S1-SQ08"]},
    {t:"With daytime customers during the changeover: “just don't bother them.”", ev:["S1-SQ11"]},
    {t:"Shouting the drink is the hardest part of the job. Your fix is a speaker and a screen.", ev:["S1-SQ22","S1-SQ23"]}],
   stance:{text:"You would rather not become the person who enforces a table rule on daytime guests: your practice today is to leave them alone. You would welcome anything that removes the shouting.", basis:"evidence"},
   unknown:["What the room looks like at 7:30 PM, and whether anyone ever asks to keep a table.","What the owner thinks. Your interview was a single voice; tag anything beyond the list as IMPROV."]},

  {id:"R-XOV", name:"Crossover staff", arch:"The bridge between the two services", type:"staff", strength:"single source",
   source:"Ecosystem map actor “Crossover staff”; interview S2 (crossover shift).",
   context:"Ten months' tenure, prior Starbucks experience, holds a cocktail licence.",
   knows:[
    {t:"You see little difference between being a barista and a bartender, and your licence is why.", ev:["S2-SQ03"]},
    {t:"Evening shifts are mostly closing work; before cocktails launched you started organising about 20 minutes before closing.", ev:["S2-SQ04"]},
    {t:"The only system is printed labels, separate for kitchen and baristas.", ev:["S2-SQ07"]},
    {t:"You go straight to the boss or manager.", ev:["S2-SQ20"]}],
   stance:{text:"You treat the changeover as a shared routine rather than a personal skill, and you do not want to become the one person everyone asks.", basis:"assigned"},
   unknown:["How customers react in the evening from the staff side, and what the room looks like when it is full.","Everything beyond the list is IMPROV."]},

  {id:"R-ALX", name:"Alex", arch:"The Study Visitor", type:"customer", strength:"thin",
   source:"Persona p-alex, marked “to confirm”. Built from the general daytime interview C1 and public reviews. No student was interviewed.",
   context:"A student who visits in the afternoon to study alone.",
   knows:[
    {t:"A daytime regular comes to work, read or relax.", ev:["C1-CQ03"]},
    {t:"The room is quiet with relaxed background music.", ev:["C1-CQ06"]},
    {t:"When the counter line is long, customers use the kiosk instead.", ev:["C1-CQ05"]},
    {t:"Hours and menus have been clear to a daytime regular.", ev:["C1-CQ11"]},
    {t:"Reviewers call the room dark and cozy, good for hanging out.", ev:["SR-J06"]},
    {t:"Nearby cafés already hold the study-and-work niche (an unverified ranking).", ev:["SR-Y02"]},
    {t:"Staff leave daytime customers alone during the changeover; the call-out can be hard to hear.", ev:["S1-SQ11","SR-J10"]}],
   stance:{text:"You would rather be told a rule than guess. You do not want to be asked to leave without warning.", basis:"assigned"},
   unknown:["Whether you would reorder to keep a table, or leave. Whether this question is ever asked. These are what the workshop is testing: say what you would do, and tag it IMPROV.","Persona goal “know whether they can stay into the evening” is itself unconfirmed."]},

  {id:"R-JOR", name:"Jordan", arch:"The Social Visitor", type:"customer", strength:"thin",
   source:"Persona p-jordan, marked “to confirm”. Rests on observation OB01 and public sources. No evening customer was interviewed.",
   context:"Plans an evening visit with a small group of friends.",
   knows:[
    {t:"At 6:00 PM a customer asked whether coffee was still available.", ev:["OB01-E3"]},
    {t:"At 6:30 PM a group asked staff to move two tables closer.", ev:["OB01-E4"]},
    {t:"At 7:00 PM people waiting for drinks blocked the walkway.", ev:["OB01-E5"]},
    {t:"The only published cocktail menu is on ATL Coffeeshops; the ordering page lists no alcohol.", ev:["SR-A03","SR-O03"]},
    {t:"The website says “coffee by day, cocktails by night” and gives no time.", ev:["SR-W01"]},
    {t:"One reviewer came for the look and wants to return for “creative cocktails”.", ev:["SR-J07"]},
    {t:"Staff explain the table lights only if asked.", ev:["S1-SQ08"]}],
   stance:{text:"You check the menu before choosing where to take the group. If you cannot find one, you choose somewhere else.", basis:"persona behaviour"},
   unknown:["Whether groups ever plan ahead or book. How a group learns the seating rules.","Everything beyond the list is IMPROV."]},

  {id:"R-FTM", name:"First-timer", arch:"Meets the shop through four channels that disagree", type:"customer", strength:"thin",
   source:"Ecosystem map actor “First-timer” (an actor, not a formal persona). Public sources only.",
   context:"Has never been. Decides from what the internet says, and from what the frontage shows.",
   knows:[
    {t:"Four channels give four sets of closing hours.", ev:["SR-W02","SR-A01","SR-O02","SR-J02"]},
    {t:"The shop's own site has no menu; ordering links out.", ev:["SR-W04"]},
    {t:"Yelp files the shop under Cocktail Bars, with the city as Atlanta.", ev:["SR-Y01"]},
    {t:"One reviewer says the look is what drew them in.", ev:["SR-J07"]},
    {t:"One reviewer thought the shop was closed: dark, no open sign.", ev:["SR-J08"]}],
   stance:{text:"You are one bad signal from going elsewhere. A dark frontage and no open sign send you home.", basis:"evidence"},
   unknown:["Whether first-timers ever walk in anyway, and what they do after they are inside.","Everything beyond the list is IMPROV."]}
],

/* ------------------------------------- PRE-REGISTERED PRIORS (facilitators) */
priors: [
  {m:"M1", prior:"Publish one changeover time and one closing time on the shop's own site, and add the cocktail menu there.", surprise:"Participants rank M1 below M5, or say a published time is unenforceable."},
  {m:"M2", prior:"Make the frontage read as open after dark with a cue visible from outside.", surprise:"The room judges the dark look a net asset and drops the idea (tension with K3)."},
  {m:"M3", prior:"State a plain table-keeping rule: daytime guests may stay, and evening seating opens as they leave.", surprise:"Alex role-players say they would leave anyway, or would never ask. Both would mean the question is smaller than assumed."},
  {m:"M4", prior:"Post a changeover time on the rota and add a one-line shift handoff.", surprise:"Owner declines a stated time, which would make C1 a deliberate choice rather than an oversight."},
  {m:"M5", prior:"Put a small card on each table saying what the lights mean.", surprise:"Participants find the lights already work and the gap is upstream (M1)."},
  {m:"M6", prior:"Keep a flexible cluster of tables for groups from the changeover onward.", surprise:"Staging shows the walkway, not the tables, is the real limit."},
  {m:"M7", prior:"Add a screen and speaker for order notification, as staff propose.", surprise:"Owner or customers reject it on atmosphere grounds (tension with K3)."}
],
priorTopThree:"M3, M5, M1",

/* ------------------------------------------------------------- CAPTURE IDS */
rawOutputKinds: [
  {p:"G", label:"Gallery stickers (A2)"},
  {p:"W", label:"Walk-through friction pins (A3)"},
  {p:"D", label:"Diverge idea cards (A4)"},
  {p:"S", label:"Staging breakdown log (A5)"},
  {p:"C", label:"Converge placements and commitment cards (A6)"},
  {p:"X", label:"Dissent and “didn't get to say” slips (A6, A7)"},
  {p:"I", label:"IMPROV-tagged statements (any activity)"}
]
};

if (typeof module !== "undefined") module.exports = WS;
