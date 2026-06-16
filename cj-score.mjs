// cj-score.mjs
// Run AFTER cj-sync.mjs. Re-scores the whole catalog for the CURRENT season
// (so curation tracks the calendar) and re-curates: show all, then hide
// anything below the season threshold.
//   ADMIN_TOKEN='your-admin-token' node cj-score.mjs
//
// HIDE_BELOW (default 50) sets the off-season cutoff. Set HIDE_BELOW=0 to skip
// hiding entirely and leave every in-stock item visible (sorted by score).

const API_BASE = process.env.API_BASE || "https://cj-proxy.milani-babak.workers.dev";
const clean = (s) => (s || "").trim().replace(/^[\u2018\u2019\u201C\u201D'"]+|[\u2018\u2019\u201C\u201D'"]+$/g, "");
const ADMIN_TOKEN = clean(process.env.ADMIN_TOKEN);
// Empty/unset -> default 50. Explicit "0" -> no hiding.
const HIDE_BELOW = (process.env.HIDE_BELOW === undefined || process.env.HIDE_BELOW === "")
  ? 50
  : Number(process.env.HIDE_BELOW);

async function call(method, path) {
  const r = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
  });
  return r.json().catch(() => ({}));
}

(async () => {
  if (!ADMIN_TOKEN) {
    console.error("Set ADMIN_TOKEN env var first.");
    process.exit(1);
  }

  console.log("Clearing old scores…");
  await call("GET", "/admin/rescore");

  console.log("Scoring for the current season…");
  let remaining = Infinity;
  let scoredTotal = 0;
  let guard = 0;
  while (remaining > 0 && guard++ < 300) {
    const d = await call("GET", "/score?limit=8");
    if (d.error) { console.warn("  score error:", d.detail || d.error); break; }
    scoredTotal += d.scored || 0;
    remaining = d.remaining ?? 0;
    process.stdout.write(`  scored ${scoredTotal}, ${remaining} left   \r`);
  }
  console.log(`\nScored ${scoredTotal}.`);

  if (HIDE_BELOW > 0) {
    console.log(`Re-curating: show all, then hide below ${HIDE_BELOW}…`);
    await call("POST", "/admin/showall");
    const h = await call("POST", `/admin/autohide?below=${HIDE_BELOW}`);
    console.log(`Hidden ${h.hidden ?? "?"} off-season items.`);
  } else {
    console.log("HIDE_BELOW=0 → leaving all items visible.");
  }

  console.log("Done.");
})();
