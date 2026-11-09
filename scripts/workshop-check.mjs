#!/usr/bin/env node
// Checks the P10 workshop pack against the evidence base in index.html.
//   node scripts/workshop-check.mjs --write   regenerate workshop-evidence.js from index.html
//   node scripts/workshop-check.mjs           verify (exit 1 on any problem)
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");

function sliceConst(src, name) {
  const start = src.indexOf(`const ${name} = `);
  if (start < 0) throw new Error(`const ${name} not found in index.html`);
  const open = src.indexOf("{", start);
  let depth = 0, i = open, inStr = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) { if (c === "\\") i++; else if (c === inStr) inStr = null; continue; }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "{") depth++;
    if (c === "}" && --depth === 0) break;
  }
  return src.slice(open, i + 1);
}
const evalLiteral = (lit) => vm.runInNewContext(`(${lit})`);

const indexSrc = read("index.html");
const EVIDENCE = evalLiteral(sliceConst(indexSrc, "EVIDENCE"));
const evidenceFile = `/* GENERATED from index.html by scripts/workshop-check.mjs --write. Do not edit. */\nconst EVIDENCE = ${JSON.stringify(EVIDENCE, null, 1)};\n`;

if (process.argv.includes("--write")) {
  fs.writeFileSync(path.join(root, "workshop-evidence.js"), evidenceFile);
  console.log(`wrote workshop-evidence.js (${Object.keys(EVIDENCE).length} evidence items)`);
  process.exit(0);
}

const problems = [];
const bad = (m) => problems.push(m);

// 1. generated evidence copy must match index.html
if (!fs.existsSync(path.join(root, "workshop-evidence.js"))) bad("workshop-evidence.js missing — run with --write");
else if (read("workshop-evidence.js") !== evidenceFile) bad("workshop-evidence.js is stale — run with --write");

const WS = (await import(path.join(root, "workshop-data.js"))).default ?? (await import("node:module")).createRequire(import.meta.url)(path.join(root, "workshop-data.js"));
const gapSection = indexSrc.slice(indexSrc.indexOf("const CONTRADICTIONS"), indexSrc.indexOf("const PERSONAS"));
const gapIds = new Set([...gapSection.matchAll(/\{id:"(C\d+)"/g)].map((m) => m[1]));

// 2. every cited ID exists
const cited = new Map();
const cite = (where, ids = []) => ids.forEach((id) => { cited.set(id, (cited.get(id) || []).concat(where)); if (!EVIDENCE[id]) bad(`${where}: unknown evidence ID ${id}`); });
WS.moments.forEach((m) => { cite(m.id, m.ev); m.gaps.forEach((g) => gapIds.has(g) || bad(`${m.id}: unknown gap ${g}`)); });
WS.stations.forEach((s) => cite(s.id, s.ev));
WS.constraints.forEach((k) => { cite(k.id, k.ev); if (k.basis === "evidence" && !k.ev.length) bad(`${k.id}: basis "evidence" but no IDs`); });
WS.scenarios.forEach((s) => { cite(s.id, s.ev); if (s.kind === "evidence" && !s.ev.length) bad(`${s.id}: kind "evidence" but no IDs`); if (s.kind === "inferred" && s.ev.length) bad(`${s.id}: inferred card should not cite evidence`); });
WS.roles.forEach((r) => {
  if (!r.knows.length) bad(`${r.id}: no cited facts`);
  r.knows.forEach((k, i) => { if (!k.ev.length) bad(`${r.id}: fact ${i + 1} has no evidence ID`); cite(`${r.id}`, k.ev); });
  if (!r.unknown.length) bad(`${r.id}: no 'what you don't know' list`);
});

// 3. every moment is visible in the gallery, and every station points at a real moment
const stationMoments = WS.stations.map((s) => s.moment).join(" ");
WS.moments.forEach((m) => { if (!stationMoments.includes(m.id)) bad(`${m.id}: no evidence-gallery station`); });
WS.priors.forEach((p) => { if (!WS.moments.some((m) => m.id === p.m)) bad(`prior for unknown moment ${p.m}`); });
WS.moments.forEach((m) => { if (!WS.priors.some((p) => p.m === m.id)) bad(`${m.id}: no pre-registered prior`); });

// 4. agenda arithmetic
let t = 0;
WS.agenda.forEach((a) => { if (a.start !== t) bad(`agenda ${a.id}: starts at ${a.start}, expected ${t}`); t += a.mins; });
if (t !== WS.sessionMins) bad(`agenda totals ${t} min, session is ${WS.sessionMins}`);
const scheduled = WS.agenda.filter((a) => a.kind !== "b").reduce((s, a) => s + a.mins, 0);
const leads = new Set(WS.agenda.filter((a) => a.lead !== "-").map((a) => a.lead));
if (leads.size < 2) bad("no role swap: both facilitators must lead at least one activity");

console.log(`evidence items in index.html: ${Object.keys(EVIDENCE).length}; cited by the pack: ${cited.size}`);
console.log(`agenda: ${scheduled} min scheduled + ${WS.sessionMins - scheduled} min held buffer = ${t}`);
console.log(`roles: ${WS.roles.length}; constraint cards: ${WS.constraints.length}; scenarios: ${WS.scenarios.length}; moments: ${WS.moments.length}`);
const notUsed = Object.keys(EVIDENCE).filter((id) => !cited.has(id));
console.log(`evidence items not used in the pack (${notUsed.length}): ${notUsed.join(", ")}`);
if (problems.length) { console.error("\nPROBLEMS:\n- " + problems.join("\n- ")); process.exit(1); }
console.log("\nOK — all citations resolve, agenda sums, roles swap.");
