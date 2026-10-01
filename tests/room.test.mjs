import test from "node:test";
import assert from "node:assert/strict";
import { roomReducer, exampleRoom, folderPath, folderContents, taskProgress, isTaskComplete, layoutWeek, monthWeeks, shadeForProgress, normalizeLink, publicShowcase, uniqueName } from "../lib/room.ts";

const today = "2026-10-01";
const room = () => exampleRoom(today);
const at = "2026-10-01T10:00:00.000Z";

test("any member can make folders, nested with no depth limit", () => {
  let r = room();
  let parent = null;
  for (let i = 0; i < 8; i++) {
    r = roomReducer(r, { type: "folder/create", id: `deep-${i}`, name: `Level ${i}`, parentId: parent, by: "m-theo", at });
    parent = `deep-${i}`;
  }
  assert.deepEqual(folderPath(r.folders, "deep-7").map((f) => f.name), ["Level 0", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6", "Level 7"]);
  // Not a member: nothing happens.
  assert.equal(roomReducer(r, { type: "folder/create", id: "x", name: "Mine", parentId: null, by: "stranger", at }), r);
});

test("a folder name already used at that level gets a number", () => {
  let r = roomReducer(room(), { type: "folder/create", id: "x", name: "script", parentId: null, by: "m-jun", at });
  assert.equal(r.folders.find((f) => f.id === "x").name, "script 2");
  assert.equal(uniqueName(["Cuts", "Cuts 2"], "Cuts"), "Cuts 3");
});

test("assets and folders move between folders, never into themselves", () => {
  let r = roomReducer(room(), { type: "asset/move", ids: ["a-recce"], to: "f-sc3" });
  assert.equal(r.assets.find((a) => a.id === "a-recce").folderId, "f-sc3");
  assert.deepEqual(folderContents(r, "f-boards"), { folders: 3, assets: 4 });
  // Storyboards into its own grandchild: refused.
  assert.equal(roomReducer(r, { type: "folder/move", id: "f-boards", to: "f-sc3" }), r);
  r = roomReducer(r, { type: "folder/move", id: "f-sc3", to: null });
  assert.equal(r.folders.find((f) => f.id === "f-sc3").parentId, null);
});

test("deleting a folder removes everything inside it", () => {
  const r = roomReducer(room(), { type: "folder/delete", id: "f-boards" });
  assert.ok(!r.folders.some((f) => ["f-boards", "f-act1", "f-sc3", "f-act2"].includes(f.id)));
  assert.ok(!r.assets.some((a) => ["a-sc3-1", "a-sc3-2", "a-act1"].includes(a.id)));
  assert.ok(r.assets.some((a) => a.id === "a-recce"));
});

test("progress follows ticked subtasks at any depth", () => {
  let r = room();
  // Pre-production: cast (done), boards (done), locations > permit (done), route (open) = 3 of 4.
  assert.deepEqual(taskProgress(r.tasks, "t-pre"), { done: 3, total: 4, ratio: 0.75 });
  r = roomReducer(r, { type: "task/toggle", id: "t-pre-loc-2" });
  assert.equal(taskProgress(r.tasks, "t-pre").ratio, 1);
  assert.ok(isTaskComplete(r.tasks, "t-pre-loc"));
  // Adding a subtask brings the parent back below 100%.
  r = roomReducer(r, { type: "task/create", task: { id: "new", parentId: "t-pre-loc-2", title: "Walk it at night", done: true, createdAt: at } });
  assert.deepEqual(taskProgress(r.tasks, "t-pre"), { done: 3, total: 4, ratio: 0.75 });
});

test("ticking a parent ticks everything under it, and again unticks it", () => {
  let r = roomReducer(room(), { type: "task/toggle", id: "t-edit" });
  assert.equal(taskProgress(r.tasks, "t-edit").ratio, 1);
  r = roomReducer(r, { type: "task/toggle", id: "t-edit" });
  assert.equal(taskProgress(r.tasks, "t-edit").ratio, 0);
});

test("a new task needs a name, valid dates and a palette colour", () => {
  const base = { id: "t", parentId: null, title: "Grade", done: false, createdAt: at, start: "2026-10-05", end: "2026-10-09", color: "sun" };
  assert.equal(roomReducer(room(), { type: "task/create", task: base }).tasks.at(-1).title, "Grade");
  for (const bad of [{ title: "  " }, { end: "2026-10-01" }, { start: "2026-02-30" }, { color: "#ff0000" }]) {
    const r = room();
    assert.equal(roomReducer(r, { type: "task/create", task: { ...base, ...bad } }), r);
  }
});

test("overlapping tasks get their own lanes so none is hidden", () => {
  const week = monthWeeks(2026, 9)[0]; // Mon 28 Sep to Sun 4 Oct
  assert.equal(week[0], "2026-09-28");
  const t = (id, start, end) => ({ id, parentId: null, title: id, done: false, start, end, color: "sky", createdAt: at });
  const { bars, lanes } = layoutWeek([t("a", "2026-09-20", "2026-09-30"), t("b", "2026-09-29", "2026-10-02"), t("c", "2026-10-01", "2026-10-10"), t("d", "2026-10-03", "2026-10-04")], week);
  assert.equal(lanes, 2);
  const lane = Object.fromEntries(bars.map((b) => [b.task.id, b]));
  assert.deepEqual([lane.a.col, lane.a.span, lane.a.fromBefore], [0, 3, true]);
  assert.notEqual(lane.a.lane, lane.b.lane);
  assert.notEqual(lane.b.lane, lane.c.lane);
  assert.equal(lane.a.lane, lane.c.lane); // no shared day, so c reuses a's lane
  assert.notEqual(lane.c.lane, lane.d.lane);
  assert.equal(lane.c.toAfter, true);
});

test("a month is covered by whole Monday-first weeks", () => {
  const weeks = monthWeeks(2026, 1); // February 2026 starts on a Sunday
  assert.equal(weeks[0][6], "2026-02-01");
  assert.equal(weeks.at(-1).includes("2026-02-28"), true);
});

test("bars darken as progress grows", () => {
  assert.equal(shadeForProgress("#ffffff", 0), "#ffffff");
  assert.equal(shadeForProgress("#ffffff", 1), "#666666");
  assert.ok(shadeForProgress("#74bdff", 0.5) < shadeForProgress("#74bdff", 0.2));
});

test("showcase: own work or a link, one line, owner can take it down", () => {
  let r = room();
  const piece = (over) => ({ id: "p", memberId: "m-jun", caption: "Our animatic", featured: false, addedAt: "2026-10-02T00:00:00.000Z", source: { type: "asset", assetId: "a-act1", name: "", kind: "other" }, ...over });
  r = roomReducer(r, { type: "showcase/add", piece: piece() });
  assert.equal(publicShowcase(r)[0].id, "p");
  assert.equal(publicShowcase(r)[0].source.name, "Act 1 animatic.mp4");
  // Someone else's asset: refused.
  assert.equal(roomReducer(r, { type: "showcase/add", piece: piece({ id: "q", memberId: "m-theo" }) }), r);
  // Unsafe link: refused; bare domain gets https.
  assert.equal(roomReducer(r, { type: "showcase/add", piece: piece({ id: "q", source: { type: "link", url: "javascript:alert(1)" } }) }), r);
  assert.equal(normalizeLink("vimeo.com/123"), "https://vimeo.com/123");
  // Only the owner features or unfeatures.
  assert.equal(roomReducer(r, { type: "showcase/feature", id: "p", featured: false, by: "m-jun" }), r);
  r = roomReducer(r, { type: "showcase/feature", id: "p", featured: false, by: "m-ava" });
  assert.ok(!publicShowcase(r).some((p) => p.id === "p"));
  assert.ok(r.showcase.some((p) => p.id === "p"));
});
