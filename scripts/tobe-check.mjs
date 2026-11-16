// Verifies every evidence ID in tobe-data.js exists in index.html's A3 repository.
import fs from "node:fs"; import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const TB = require("../tobe-data.js");
const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const ids = new Set([...html.matchAll(/"((?:C1|S1|S2|OB01|SR)-[A-Z]*\d+)"\s*:\s*\{/g)].map(m => m[1]));
const used = new Set();
const add = a => (a || []).forEach(x => used.add(x));
TB.phases.forEach(p => add(p.ev)); TB.moments.forEach(m => add(m.ev)); TB.jordan.forEach(j => add(j.ev));
const bad = [...used].filter(x => !ids.has(x));
console.log(`${used.size} evidence IDs cited, ${ids.size} in repository`);
if (bad.length) { console.error("MISSING:", bad.join(", ")); process.exit(1); }
const gaps = new Set([...html.matchAll(/\{id:"(C\d)",title:/g)].map(m => m[1]));
const g = [...TB.phases.flatMap(p => p.pain.map(x => x.g)), ...TB.moments.flatMap(m => m.gaps), ...TB.concepts.flatMap(c => c.gaps)].filter(x => x !== "—" && !gaps.has(x));
if (g.length) { console.error("UNKNOWN GAPS:", g.join(", ")); process.exit(1); }
console.log("all IDs and gaps resolve");
