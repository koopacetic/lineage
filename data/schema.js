// Dataset schema. Each data/<key>.js registers window.DATASETS[key]; an optional
// data/<key>.expanded.js registers window.EXPANDED[key], merged on top when "Expanded" is selected.
//
// window.DATASETS[key] = {
//   title:    "Shown in the dataset toggle",
//   concepts: true?,            // nodes are tropes/genres rather than people (changes wording + dates)
//   groups:   [{ key, label, fill, stroke, until? }],   // colour groups; `until` = floruit cutoff year
//   ticks:    [year, ...],      // timeline column boundaries (ascending; uneven spacing is fine)
//   gap:      { from, to, note } | null,   // a stretch to shade + annotate on the timeline
//   periods:  [[label, fromYear, toYear], ...],   // captions along the top of the timeline
//   authors:  [{ id, name, born, died, works, fl?, group?, approx? }],
//             // id: lowercase letters/digits only. Years negative for BCE; died null = living / still going.
//             // works: 1–3 titles, most significant first. fl: year to place on the timeline
//             // (default born+40 for people, born for concepts). approx: dates are circa.
//   links:    [[fromId, toId, kind, note], ...],   // influencer -> influenced
//             // kind: "builds" (drew on) | "critiques" (argued against) | "transmits" (preserved/translated/carried)
//   picks:    { "List name": [ids...] },   // curated "key players" lists (ids missing in Small are skipped)
// }
// window.EXPANDED[key] = { authors, links, groups?, ticks?, gap?, periods?, picks?, enrich? }
//   authors/links/groups are appended; ticks/gap/periods/picks replace the base values.
// window.XXL[key] = same shape, layered on top of Expanded when "XXL" is selected. The XXL button is
//   disabled for datasets without one (currently only romance and tropes have it).
//
// Optional node fields (shown in the side panel when the node is focused):
//   blurb:   one or two sentences of context
//   reads:   [[label, title], ...]  recommended reading, best first (replaces `works` in the panel)
//   tropes:  [ids in the tropes dataset]   — on romance authors; rendered as cross-links
//   authors: [ids in the romance dataset]  — on tropes; rendered as cross-links
// enrich: { id: { blurb?, reads?, tropes?, authors? } } adds these fields to nodes from lower layers.
window.DATASETS ||= {};
window.EXPANDED ||= {};
window.range = (from, to, step) => { const r = []; for (let y = from; y <= to; y += step) r.push(y); return r; };
window.centuries = (from, to) => range(from, to, 100);
