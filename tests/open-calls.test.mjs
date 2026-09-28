import test from "node:test";
import assert from "node:assert/strict";
import { selectOpenCalls, postedAgo } from "../lib/open-calls-data.ts";
const now = Date.parse("2026-09-29T12:00:00Z");
const post = (overrides={}) => ({id:"a",status:"Open",role:"Writer",project:"Example",url:"https://umdb.org/collaborate/post/a",createdAt:"2026-09-29T10:00:00Z",expiresAt:"2026-10-01T12:00:00Z",...overrides});
test("keeps only complete, open, unexpired posts with safe original links", () => {
  const rows=[post(),post({id:"closed",status:"closed"}),post({id:"expired",expiresAt:new Date(now).toISOString()}),post({id:"future",createdAt:"2026-10-01T00:00:00Z"}),post({id:"no-date",createdAt:""}),post({id:"no-url",url:""}),post({id:"script",url:"javascript:alert(1)"}),post({id:"foreign",url:"https://example.com/post"}),post({id:"credentials",url:"https://user:pass@umdb.org/post"}),post({id:"missing-status",status:undefined})];
  assert.deepEqual(selectOpenCalls({data:rows},now).map(x=>x.id),["a"]);
});
test("returns newest six in order without duplicates, and never pads a sparse feed",()=>{
  const rows=Array.from({length:8},(_,i)=>post({id:String(i),createdAt:new Date(now-(i+1)*3600000).toISOString()})).reverse();
  assert.deepEqual(selectOpenCalls([...rows,rows[0]],now).map(x=>x.id),["0","1","2","3","4","5"]);
  assert.equal(selectOpenCalls([post()],now).length,1);
  assert.deepEqual(selectOpenCalls({error:"unavailable"},now),[]);
});
test("normalized posts remain valid on the client and expire at the deadline",()=>{
  const selected=selectOpenCalls([post()],now);
  assert.equal(selectOpenCalls(selected,now).length,1);
  assert.deepEqual(selectOpenCalls(selected,Date.parse(selected[0].expiresAt)),[]);
  assert.equal(postedAgo(post().createdAt,now),"Posted 2 hours ago");
});
