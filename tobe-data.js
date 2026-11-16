/* P11a to-be journey — single source for tobe.html (the map) and
   tobe-slides.html (intermediate presentation).

   Honesty rules, same as the P10 pack:
   - Evidence is cited by ID only; IDs resolve to the A3 repository in index.html.
   - "As-is" content comes from the P5 skeleton and the seven gaps (C1-C7).
   - Everything under "to-be" is a PROPOSAL. Each carries a status:
       cited      the problem it answers is evidenced; the fix is still a proposal
       inferred   the problem itself is inferred (no direct evidence it occurs)
       hypothesis the fix has a known tension and must be tested before it is committed
   - Emotion scores are team estimates on a 1-5 scale, not measurements.
   - Run `node scripts/tobe-check.mjs` after any edit. */

const TB = {

persona: {
  name: "Alex", arch: "The Study Visitor",
  quote: "I want a comfortable place to study and have coffee.",
  note: "Alex is the lead journey because the daytime customer and staff are the near-term priority (P5 team decision). Sam, the counter barista, is carried as the backstage lane. Jordan is covered at phase level further down."
},

/* ------------------------------------------------------------ PHASES */
/* emo: [as-is, to-be] on 1-5. time: before | during | after            */
phases: [
 {id:"P1", time:"before", name:"Decide", sub:"Where do I work today?",
  emo:[2.5, 4],
  does:"Checks Common's own site. Sees one changeover time, one closing time, the cocktail menu and how to order, and finds the same hours on every listing.",
  touch:[{t:"Shop website", n:"changed"}, {t:"Claimed listings", n:"new"}, {t:"ATL Coffeeshops · joe.coffee · Yelp", n:"existing"}],
  pain:[{g:"C1", t:"“Coffee by day, cocktails by night” — but no time."},
        {g:"C2", t:"Four channels, four closing times."},
        {g:"C3", t:"Cocktail menu exists on one third-party site only."}],
  change:"The home page states the changeover time, the closing time, the six cocktails and the ways to order. The shop then updates every listing it can claim to match.",
  back:"The owner sets the times once. The rota, the website and the listings all read from that one decision.",
  others:"The shop can only edit its own channels. Yelp, joe.coffee and ATL Coffeeshops need a claim or an update request, and the map records no contact with them yet.",
  types:["Channel","Process"],
  status:"cited", ev:["SR-W01","SR-W02","SR-A01","SR-O02","SR-J02","SR-A03","SR-W04","SR-Y02"]},

 {id:"P2", time:"during", name:"Arrive", sub:"Can I settle in?",
  emo:[3.5, 4],
  does:"Scans the room, claims a table, then orders. A small card on the table says what daytime guests can expect when the room changes.",
  touch:[{t:"Room & seating", n:"existing"}, {t:"Table card", n:"new"}],
  pain:[{g:"C1", t:"Nobody states whether a daytime guest can keep a table into the evening. This need is inferred, not evidenced."},
        {g:"C7", t:"The dark room reads as closed to some arrivals (matters mostly after dark)."}],
  change:"The look stays: dark, quiet, unbranded. The card is plain text, and it carries the table-keeping rule once the owner has chosen one. For evening arrivals, a subtle cue visible from outside shows the room is open.",
  back:"Staff keep clearing and resetting tables as they do now. The card means they do not have to explain the rule to each guest.",
  others:"None. This phase happens inside the shop.",
  types:["Customer engagement","Brand"],
  status:"inferred", ev:["C1-CQ03","C1-CQ06","SR-J06","SR-J07","SR-J08","OB01-E2"]},

 {id:"P3", time:"during", name:"Order", sub:"Get a drink, keep my seat",
  emo:[3, 4],
  does:"Orders at the counter, or at the kiosk when the line is long. A discreet sign says the kiosk is for everyone, and it gives a one-line description of each unfamiliar drink.",
  touch:[{t:"Counter", n:"existing"}, {t:"Kiosk + sign", n:"changed"}, {t:"Chowbus pickup", n:"existing"}],
  pain:[{g:"C4", t:"The kiosk and Chowbus both exist and neither is announced anywhere."},
        {g:"C4", t:"Alex found the kiosk on their own, to avoid losing a claimed seat in line."}],
  change:"A small sign by the line names the kiosk as the way to skip it. Drink descriptions on the kiosk answer “what is in this?” without a conversation.",
  back:"Kiosk and counter orders land in one shared queue the bar can see. No new task for the counter.",
  others:"Chowbus already takes pickup orders. The website now says so.",
  types:["Channel","Service"],
  status:"cited", ev:["C1-CQ04","C1-CQ05","S1-SQ16","S1-SQ03","SR-J03","SR-O01"]},

 {id:"P4", time:"during", name:"Wait", sub:"Is that my drink?",
  emo:[1.5, 3.8],
  moi:2,
  does:"Goes back to work. A quiet signal says the drink is ready, so Alex does not have to listen for a shout or break their focus.",
  touch:[{t:"Ready signal", n:"new"}, {t:"Shouted call-out", n:"fallback"}],
  pain:[{g:"C5", t:"No screen or speaker. Staff shout and hope customers hear."},
        {g:"C5", t:"Reviewers pick their drinks out by sight. Staff call the call-out the hardest part of the job."}],
  change:"Two options to test: a small, low-glare ready board, or a ready notification sent to a kiosk order. A spoken call stays as the fallback. Tension: a screen can clash with the room (K3).",
  back:"The barista marks a drink ready once, in the shared queue. The shout stops being the system.",
  others:"None yet. A phone notification would need a service the shop does not use today.",
  types:["Product system","Service"],
  status:"hypothesis", ev:["S1-SQ22","S1-SQ23","SR-J10","OB01-E5"]},

 {id:"P5", time:"during", name:"Work through the changeover", sub:"Where do I stand at 6?",
  emo:[2, 4],
  moi:3,
  does:"Keeps working. At the posted time the table lights go on. The card and the kiosk say what they mean, so Alex decides to stay, order an evening drink or wrap up, without being asked to leave.",
  touch:[{t:"Table lights", n:"existing"}, {t:"Table card", n:"new"}, {t:"Kiosk message", n:"new"}],
  pain:[{g:"C1", t:"The lights are the only signal. Staff explain them only if asked."},
        {g:"C1", t:"At 6:00 PM a customer asked whether coffee was still available."}],
  change:"The changeover happens at a stated time. The lights now mean something printed, not something you have to ask about.",
  back:"A short changeover checklist runs at the posted time, and anyone on shift can run it. Moving supplies to the staging table no longer depends on one person or on the licence-holder being in.",
  others:"None.",
  types:["Process","Customer engagement"],
  status:"inferred", ev:["S1-SQ08","S1-SQ11","OB01-E2","OB01-E3","S2-SQ03","S1-SQ07"]},

 {id:"P6", time:"after", name:"Leave & return", sub:"Would I come back?",
  emo:[3, 4.2],
  moi:4,
  does:"Packs up or stays on. The receipt shows loyalty points, and the website announces the seasonal drinks. Alex now knows the evening rule and can plan to return.",
  touch:[{t:"Loyalty points", n:"existing"}, {t:"Receipt / kiosk screen", n:"changed"}, {t:"Website", n:"changed"}],
  pain:[{g:"C6", t:"Staff leave without a handoff, so anything unresolved from the day is dropped."},
        {g:"—", t:"No post-visit evidence exists for any persona. Loyalty points and one remark about seasonal drinks are all we have."}],
  change:"Points are visible at the point of sale. Seasonal drinks are posted where Alex already looks (the shop's own site).",
  back:"Each shift ends with a one-line handoff note: what is unresolved, what the next shift needs to know.",
  others:"Loyalty program and Chowbus, which Alex can use to reorder next time.",
  types:["Customer engagement","Structure"],
  status:"inferred", ev:["SR-O04","C1-CQ12","S1-SQ09","S1-SQ04"]}
],

/* -------------------------------------------------- MOMENTS OF IMPACT */
moments: [
 {n:1, phase:"P1", title:"I know before I go",
  shift:"From four different answers about hours and no menu, to one answer on the shop's own site.",
  why:"This is where a first-timer or a regular decides. Today every channel says “coffee by day, cocktails by night” and none gives the time.",
  gaps:["C1","C2","C3"], status:"cited",
  ev:["SR-W01","SR-W02","SR-A03","SR-W04"],
  measure:"Count of “is coffee still available?” and “when do you close?” questions at the counter. One was observed at 6:00 PM (OB01-E3)."},
 {n:2, phase:"P4", title:"My drink finds me",
  shift:"From a shout across a quiet room to a signal Alex does not have to strain for.",
  why:"Staff name it the hardest part of the job, and it lands on the quiet Alex came for. It is the best-evidenced pain on the map.",
  gaps:["C5"], status:"hypothesis",
  ev:["S1-SQ22","S1-SQ23","SR-J10"],
  measure:"Missed or repeated call-outs per shift, and whether the owner accepts the signal as in keeping with the room."},
 {n:3, phase:"P5", title:"I know where I stand at 6",
  shift:"From lights only explained if you ask, to a stated time and a plain rule for daytime guests.",
  why:"It is Alex's own stated need. But there is no evidence this question is ever asked, so this moment is the least certain on the map. We keep it because the cost of testing it is low.",
  gaps:["C1"], status:"inferred",
  ev:["S1-SQ11","OB01-E2"],
  measure:"Ask daytime guests directly: have you ever wondered whether you could keep your table? If nobody has, this moment shrinks."},
 {n:4, phase:"P6", title:"Nothing rests on one person's memory",
  shift:"From verbal checks, seniority and no handoff, to a changeover checklist and a one-line handoff.",
  why:"This is the backstage reason the front-stage moments can hold. It rests on one staff voice and needs a second interview.",
  gaps:["C6"], status:"cited",
  ev:["S1-SQ07","S1-SQ09","S1-SQ20","S2-SQ03"],
  measure:"Whether a shift without the licence-holder can run the changeover from the checklist."}
],

/* ---------------------------------------------------------- CONCEPTS */
concepts: [
 {k:"a", title:"Say it once",
  body:"One changeover time, one closing time and the cocktail menu, decided by the owner and published on the shop's own site, then pushed to every listing the shop can claim.",
  moments:"Moment 1 · P1", gaps:["C1","C2","C3","C4"], types:["Channel","Process"]},
 {k:"b", title:"Signal it softly",
  body:"A plain table card and a kiosk message that explain the lights and the daytime-guest rule, and a quiet ready signal in place of the shout. Nothing bright, loud or branded.",
  moments:"Moments 2 and 3 · P3–P5", gaps:["C1","C4","C5","C7"], types:["Customer engagement","Product system","Service"]},
 {k:"c", title:"Make it shift-proof",
  body:"A shared order queue, a short changeover checklist anyone on shift can run, and a one-line handoff at clock-out. No new task at peak, and it works when the licence-holder is off.",
  moments:"Moment 4 · P2–P6 backstage", gaps:["C6"], types:["Process","Structure"]}
],

/* ---------------------------------------------------------- JORDAN */
jordan: [
 {phase:"Deciding", asis:"Checks the cocktail menu before choosing where to bring the group. It is on one third-party site (C3).",
  tobe:"The menu is on the shop's own site and the closing time matches every listing. A group can decide in one visit to one page.", ev:["SR-A03","SR-W04"]},
 {phase:"Arriving & ordering", asis:"Asks staff to move tables together, then asks whether coffee is still served (OB01-E4, E3).",
  tobe:"The frontage cue reads as open after dark. The table card and the changeover time answer the coffee question before it is asked.", ev:["OB01-E3","OB01-E4","SR-J08"]},
 {phase:"In the room", asis:"Learns service has changed only if a staff member explains the lights (S1-SQ08).",
  tobe:"The lights are explained on the card. A ready signal helps when a waiting crowd blocks the one walkway (OB01-E5).", ev:["S1-SQ08","OB01-E5"]}
],

types10: ["Profit model","Network","Structure","Process","Product performance","Product system","Service","Channel","Brand","Customer engagement"],

risks: [
 {t:"The owner may decline to state a time.", d:"That would make C1 a deliberate choice, not an oversight. Concept (a) depends on it.", basis:"inference"},
 {t:"A ready screen may clash with the room.", d:"Reviewers praise the dark, cozy, minimalist room (SR-J06, SR-J07). We test a low-glare board and a phone notification against each other.", basis:"evidence"},
 {t:"Alex may never ask about keeping a table.", d:"Alex's journey rests on the general daytime interview (C1) and secondary reviews, not on an interview with a student.", basis:"evidence"},
 {t:"Peak staffing.", d:"Every idea must add no task for counter staff. Evening staffing is not evidenced.", basis:"inference"}
]
};

if (typeof module !== "undefined") module.exports = TB;
