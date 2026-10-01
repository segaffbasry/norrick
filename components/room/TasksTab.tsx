"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { addDays, colorHex, daysBetween, inkOn, isISODate, isTaskComplete, layoutWeek, monthWeeks, shadeForProgress, subtasksOf, taskColors, taskProgress, toISODate, type Room, type RoomAction, type Task, type TaskColorId } from "@/lib/room";
import { newId } from "./useRoom";
import { field, Modal, primaryPill, quietPill } from "./Primitives";
import { ChevronLeft, ChevronRight, Plus, Trash } from "./RoomIcons";

interface Props {
  room: Room;
  dispatch: (action: RoomAction) => boolean;
}

const monthName = (y: number, m: number) => new Date(Date.UTC(y, m, 1)).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
const shortDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const range = (t: Task) => (t.start && t.end ? (t.start === t.end ? shortDate(t.start) : `${shortDate(t.start)} – ${shortDate(t.end)}`) : "");

// Tasks: a month calendar pinned beside (or above, on phones) the task list.
// Each task is a coloured bar from its start to its finish date; it darkens as
// its subtasks are ticked off, and clicking it opens the task.
export function TasksTab({ room, dispatch }: Props) {
  const today = useMemo(() => toISODate(new Date()), []);
  const [month, setMonth] = useState(() => ({ y: Number(today.slice(0, 4)), m: Number(today.slice(5, 7)) - 1 }));
  const [openId, setOpenId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const top = room.tasks.filter((t) => t.parentId === null).sort((a, b) => (a.start ?? "").localeCompare(b.start ?? "") || a.createdAt.localeCompare(b.createdAt));
  const open = openId ? room.tasks.find((t) => t.id === openId && t.parentId === null) : undefined;

  const flip = (delta: number) => setMonth(({ y, m }) => ({ y: y + Math.floor((m + delta) / 12), m: (((m + delta) % 12) + 12) % 12 }));
  const showDate = (iso: string) => setMonth({ y: Number(iso.slice(0, 4)), m: Number(iso.slice(5, 7)) - 1 });

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section aria-label="Calendar" className="lg:sticky lg:top-[168px]">
        <Calendar
          room={room}
          year={month.y}
          month={month.m}
          today={today}
          onFlip={flip}
          onToday={() => showDate(today)}
          onOpen={setOpenId}
        />
      </section>

      <section aria-labelledby="task-list-title" className="grid gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2 id="task-list-title" className="font-display text-heading font-semibold">Tasks</h2>
          <button type="button" onClick={() => setCreating(true)} className={primaryPill}>
            <Plus /> New task
          </button>
        </div>
        {top.length === 0 && <p className="rounded-card border border-dashed border-border p-6 text-center text-small text-muted">No tasks yet. Give the first one a start date, a finish date and a colour, and it appears on the calendar.</p>}
        <ul role="list" className="grid gap-2">
          {top.map((t) => {
            const p = taskProgress(room.tasks, t.id);
            const subs = subtasksOf(room.tasks, t.id).length;
            const hex = colorHex(t.color);
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => {
                    setOpenId(t.id);
                    if (t.start) showDate(t.start);
                  }}
                  className="grid w-full gap-3 rounded-card border border-border bg-surface/60 p-4 text-left transition-colors hover:border-[#4a4256] hover:bg-surface"
                >
                  <span className="flex items-start gap-3">
                    <span aria-hidden className="mt-1.5 size-3 shrink-0 rounded-full" style={{ background: shadeForProgress(hex, p.ratio), boxShadow: `0 0 0 2px ${hex}55` }} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{t.title}</span>
                      <span className="block text-small text-muted">{range(t)}{t.start && t.end ? ` · ${daysBetween(t.start, t.end) + 1} days` : ""}</span>
                    </span>
                    <span className="font-display text-small font-semibold tabular-nums">{Math.round(p.ratio * 100)}%</span>
                  </span>
                  <ProgressBar ratio={p.ratio} hex={hex} />
                  <span className="text-small text-muted">{subs ? `${p.done} of ${p.total} subtasks done` : isTaskComplete(room.tasks, t.id) ? "Done" : "No subtasks yet"}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {creating && (
        <NewTask
          today={today}
          used={top.map((t) => t.color)}
          onClose={() => setCreating(false)}
          onCreate={(task) => {
            if (dispatch({ type: "task/create", task })) {
              setCreating(false);
              if (task.start) showDate(task.start);
              setOpenId(task.id);
            }
          }}
        />
      )}
      {open && <TaskSheet room={room} task={open} dispatch={dispatch} onClose={() => setOpenId(null)} />}
    </div>
  );
}

function ProgressBar({ ratio, hex }: { ratio: number; hex: string }) {
  return (
    <span role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(ratio * 100)} aria-label="Progress" className="block h-1.5 overflow-hidden rounded-full bg-border">
      <span className="block h-full rounded-full transition-[width,background-color] duration-500" style={{ width: `${ratio * 100}%`, background: shadeForProgress(hex, ratio) }} />
    </span>
  );
}

/* -------------------------------------------------------------------------- */

const BAR_AREA = 84;
const GAP = 3;

function Calendar({ room, year, month, today, onFlip, onToday, onOpen }: { room: Room; year: number; month: number; today: string; onFlip: (d: number) => void; onToday: () => void; onOpen: (id: string) => void }) {
  const weeks = monthWeeks(year, month);
  const inMonth = (iso: string) => Number(iso.slice(5, 7)) - 1 === month;
  return (
    <div className="overflow-hidden rounded-panel border border-border bg-surface/40">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <h2 aria-live="polite" className="font-display text-lead font-semibold">{monthName(year, month)}</h2>
        <div className="flex items-center gap-1">
          <button type="button" onClick={onToday} className="mr-1 rounded-pill border border-border px-3 py-1.5 text-small text-copy hover:border-copy">Today</button>
          <button type="button" aria-label="Previous month" onClick={() => onFlip(-1)} className="grid size-9 place-items-center rounded-full hover:bg-surface"><ChevronLeft /></button>
          <button type="button" aria-label="Next month" onClick={() => onFlip(1)} className="grid size-9 place-items-center rounded-full hover:bg-surface"><ChevronRight /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 border-b border-border text-center text-[11px] font-medium uppercase tracking-[0.08em] text-muted">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span key={d} className="py-2">{d}</span>)}
      </div>
      {weeks.map((week) => {
        const { bars, lanes } = layoutWeek(room.tasks, week);
        // Days with more than one task split their space between the lanes.
        const laneH = lanes ? Math.max(18, Math.min(26, Math.floor((BAR_AREA - (lanes - 1) * GAP) / lanes))) : 0;
        const area = Math.max(BAR_AREA, lanes * laneH + (lanes - 1) * GAP);
        return (
          <div key={week[0]} className="relative grid grid-cols-7 border-b border-border last:border-b-0">
            {week.map((day) => (
              <div key={day} className={`border-r border-border last:border-r-0 ${inMonth(day) ? "" : "bg-background/60"}`} style={{ minHeight: 30 + area + 8 }}>
                <span className={`m-1.5 inline-grid size-6 place-items-center rounded-full text-[12px] tabular-nums ${day === today ? "bg-primary font-semibold text-white" : inMonth(day) ? "text-copy" : "text-muted/50"}`}>
                  {Number(day.slice(8))}
                </span>
              </div>
            ))}
            <div className="pointer-events-none absolute inset-x-0" style={{ top: 34, height: area }}>
              {bars.map((b) => {
                const p = taskProgress(room.tasks, b.task.id);
                const bg = shadeForProgress(colorHex(b.task.color), p.ratio);
                return (
                  <button
                    key={b.task.id}
                    type="button"
                    onClick={() => onOpen(b.task.id)}
                    aria-label={`${b.task.title}, ${range(b.task)}, ${Math.round(p.ratio * 100)}% done`}
                    title={`${b.task.title} · ${range(b.task)} · ${Math.round(p.ratio * 100)}% done`}
                    className={`pointer-events-auto absolute flex items-center overflow-hidden px-2 text-left text-[11px] font-semibold leading-none transition-[background-color,filter] duration-500 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white ${b.fromBefore ? "rounded-l-none" : "rounded-l-[6px]"} ${b.toAfter ? "rounded-r-none" : "rounded-r-[6px]"}`}
                    style={{
                      left: `calc(${(b.col / 7) * 100}% + ${b.fromBefore ? 0 : 4}px)`,
                      width: `calc(${(b.span / 7) * 100}% - ${(b.fromBefore ? 0 : 4) + (b.toAfter ? 0 : 4)}px)`,
                      top: b.lane * (laneH + GAP),
                      height: laneH,
                      background: bg,
                      color: inkOn(bg),
                    }}
                  >
                    <span className="truncate">{b.fromBefore ? "← " : ""}{b.task.title}</span>
                    {b.span > 1 && <span className="ml-auto pl-1.5 tabular-nums opacity-75">{Math.round(p.ratio * 100)}%</span>}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function ColorPicker({ value, onChange, used = [] }: { value: TaskColorId; onChange: (c: TaskColorId) => void; used?: (TaskColorId | undefined)[] }) {
  return (
    <fieldset>
      <legend className="mb-2 text-small font-medium text-copy">Colour</legend>
      <div className="flex flex-wrap gap-2">
        {taskColors.map((c) => (
          <label key={c.id} title={c.label} className="relative">
            <input type="radio" name="task-color" value={c.id} checked={value === c.id} onChange={() => onChange(c.id)} className="peer sr-only" />
            <span aria-hidden className="block size-9 rounded-full ring-offset-2 ring-offset-background transition-shadow peer-checked:ring-2 peer-checked:ring-white peer-focus-visible:ring-2 peer-focus-visible:ring-primary" style={{ background: c.hex }} />
            <span className="sr-only">{c.label}{used.includes(c.id) ? " (already used)" : ""}</span>
            {used.includes(c.id) && value !== c.id && <span aria-hidden className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-background bg-muted" />}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function NewTask({ today, used, onClose, onCreate }: { today: string; used: (TaskColorId | undefined)[]; onClose: () => void; onCreate: (t: Task) => void }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(addDays(today, 6));
  // Suggest the first colour nobody is using yet, so bars stay easy to tell apart.
  const [color, setColor] = useState<TaskColorId>(() => taskColors.find((c) => !used.includes(c.id))?.id ?? "violet");
  const valid = title.trim() && isISODate(start) && isISODate(end) && end >= start;
  return (
    <Modal title="New task" onClose={onClose}>
      <form
        className="grid gap-5 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) onCreate({ id: newId("t"), parentId: null, title, done: false, start, end, color, createdAt: new Date().toISOString() });
        }}
      >
        <label className="grid gap-2">
          <span className="text-small font-medium text-copy">Task name</span>
          <input autoFocus required maxLength={80} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Colour grade" className={field} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-2">
            <span className="text-small font-medium text-copy">Start date</span>
            <input type="date" required value={start} onChange={(e) => { setStart(e.target.value); if (e.target.value > end) setEnd(e.target.value); }} className={`${field} [color-scheme:dark]`} />
          </label>
          <label className="grid gap-2">
            <span className="text-small font-medium text-copy">Finish date</span>
            <input type="date" required min={start} value={end} onChange={(e) => setEnd(e.target.value)} className={`${field} [color-scheme:dark]`} />
          </label>
        </div>
        {end < start && <p className="text-small text-[#ff8a8a]">The finish date can&apos;t be before the start date.</p>}
        <ColorPicker value={color} onChange={setColor} used={used} />
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className={quietPill}>Cancel</button>
          <button type="submit" disabled={!valid} className={primaryPill}>Create task</button>
        </div>
      </form>
    </Modal>
  );
}

/* -------------------------------------------------------------------------- */

function TaskSheet({ room, task, dispatch, onClose }: { room: Room; task: Task; dispatch: (a: RoomAction) => boolean; onClose: () => void }) {
  const [confirming, setConfirming] = useState(false);
  const p = taskProgress(room.tasks, task.id);
  const hex = colorHex(task.color);
  const hasSubs = subtasksOf(room.tasks, task.id).length > 0;
  return (
    <Modal title="Task details" onClose={onClose} side>
      <div className="grid gap-7 p-6">
        <div className="grid gap-4">
          <InlineTitle value={task.title} onSave={(title) => dispatch({ type: "task/update", id: task.id, patch: { title } })} className="font-display text-title font-semibold" />
          <div className="flex items-end gap-4">
            <span className="font-display text-[44px] font-semibold leading-none tabular-nums" style={{ color: hex }}>{Math.round(p.ratio * 100)}%</span>
            <span className="pb-1 text-small text-muted">{hasSubs ? `${p.done} of ${p.total} subtasks done` : p.done ? "Done" : "Not done yet"}</span>
          </div>
          <ProgressBar ratio={p.ratio} hex={hex} />
          {!hasSubs && (
            <label className="flex items-center gap-3 text-small text-copy">
              <input type="checkbox" checked={task.done} onChange={() => dispatch({ type: "task/toggle", id: task.id })} className="size-4 accent-primary" />
              Mark this task done
            </label>
          )}
          <p className="text-small text-muted">Progress updates by itself as subtasks are ticked off, and the bar on the calendar darkens with it.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-2">
            <span className="text-small font-medium text-copy">Start date</span>
            <input type="date" value={task.start ?? ""} onChange={(e) => isISODate(e.target.value) && dispatch({ type: "task/update", id: task.id, patch: { start: e.target.value } })} className={`${field} [color-scheme:dark]`} />
          </label>
          <label className="grid gap-2">
            <span className="text-small font-medium text-copy">Finish date</span>
            <input type="date" min={task.start} value={task.end ?? ""} onChange={(e) => isISODate(e.target.value) && dispatch({ type: "task/update", id: task.id, patch: { end: e.target.value } })} className={`${field} [color-scheme:dark]`} />
          </label>
        </div>
        <ColorPicker value={task.color ?? "violet"} onChange={(color) => dispatch({ type: "task/update", id: task.id, patch: { color } })} />

        <section aria-labelledby="subtasks-title" className="grid gap-3">
          <h3 id="subtasks-title" className="font-display text-lead font-semibold">Subtasks</h3>
          <SubtaskList room={room} parentId={task.id} dispatch={dispatch} depth={0} />
          <AddSubtask parentId={task.id} dispatch={dispatch} placeholder="Add a subtask" />
        </section>

        <div className="border-t border-border pt-5">
          {confirming ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-auto text-small text-copy">Delete this task and all its subtasks?</span>
              <button type="button" onClick={() => setConfirming(false)} className={quietPill}>Keep it</button>
              <button type="button" onClick={() => { dispatch({ type: "task/delete", id: task.id }); onClose(); }} className={`${primaryPill} !bg-[#d93b3b]`}>Delete task</button>
            </div>
          ) : (
            <button type="button" onClick={() => setConfirming(true)} className="inline-flex items-center gap-2 text-small text-muted hover:text-[#ff8a8a]"><Trash /> Delete task</button>
          )}
        </div>
      </div>
    </Modal>
  );
}

function SubtaskList({ room, parentId, dispatch, depth }: { room: Room; parentId: string; dispatch: (a: RoomAction) => boolean; depth: number }) {
  const subs = subtasksOf(room.tasks, parentId).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  if (!subs.length) return null;
  return (
    <ul role="list" className={depth ? "ml-[11px] border-l border-border pl-4" : ""}>
      {subs.map((t) => <SubtaskNode key={t.id} room={room} task={t} dispatch={dispatch} depth={depth} />)}
    </ul>
  );
}

function SubtaskNode({ room, task, dispatch, depth }: { room: Room; task: Task; dispatch: (a: RoomAction) => boolean; depth: number }) {
  const [adding, setAdding] = useState(false);
  const p = taskProgress(room.tasks, task.id);
  const hasSubs = subtasksOf(room.tasks, task.id).length > 0;
  const complete = p.total > 0 && p.done === p.total;
  return (
    <li className="py-0.5">
      <div className="group flex items-center gap-3 rounded-[10px] py-1.5 pr-1 hover:bg-surface">
        <Check checked={complete} partial={hasSubs && p.done > 0 && !complete} label={task.title} onChange={() => dispatch({ type: "task/toggle", id: task.id })} />
        <InlineTitle value={task.title} onSave={(title) => dispatch({ type: "task/update", id: task.id, patch: { title } })} className={`min-w-0 flex-1 text-body ${complete ? "text-muted line-through decoration-muted/60" : ""}`} />
        {hasSubs && <span className="text-small tabular-nums text-muted">{p.done}/{p.total}</span>}
        <button type="button" onClick={() => setAdding(true)} aria-label={`Add a subtask under ${task.title}`} title="Add subtask" className="grid size-8 place-items-center rounded-full text-muted opacity-100 hover:bg-background hover:text-foreground sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"><Plus /></button>
        <button type="button" onClick={() => dispatch({ type: "task/delete", id: task.id })} aria-label={`Delete ${task.title}`} title="Delete" className="grid size-8 place-items-center rounded-full text-muted opacity-100 hover:bg-background hover:text-[#ff8a8a] sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"><Trash /></button>
      </div>
      <SubtaskList room={room} parentId={task.id} dispatch={dispatch} depth={depth + 1} />
      {adding && (
        <div className="ml-[11px] border-l border-border pl-4">
          <AddSubtask parentId={task.id} dispatch={dispatch} placeholder={`Subtask of ${task.title}`} autoFocus onDone={() => setAdding(false)} />
        </div>
      )}
    </li>
  );
}

function Check({ checked, partial, label, onChange }: { checked: boolean; partial: boolean; label: string; onChange: () => void }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = partial;
  }, [partial]);
  return <input ref={ref} type="checkbox" checked={checked} onChange={onChange} aria-label={`${label} done`} className="ml-1 size-[18px] shrink-0 accent-primary" />;
}

function AddSubtask({ parentId, dispatch, placeholder, autoFocus, onDone }: { parentId: string; dispatch: (a: RoomAction) => boolean; placeholder: string; autoFocus?: boolean; onDone?: () => void }) {
  const [value, setValue] = useState("");
  return (
    <form
      className="flex gap-2 py-1.5"
      onSubmit={(e) => {
        e.preventDefault();
        if (!value.trim()) return onDone?.();
        dispatch({ type: "task/create", task: { id: newId("t"), parentId, title: value, done: false, createdAt: new Date().toISOString() } });
        setValue("");
      }}
    >
      <label className="flex-1">
        <span className="sr-only">{placeholder}</span>
        <input
          autoFocus={autoFocus}
          value={value}
          maxLength={80}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && onDone) {
              e.stopPropagation();
              e.preventDefault();
              onDone();
            }
          }}
          onBlur={() => !value.trim() && onDone?.()}
          className={`${field} h-10`}
        />
      </label>
      <button type="submit" disabled={!value.trim()} className={quietPill}>Add</button>
    </form>
  );
}

function InlineTitle({ value, onSave, className }: { value: string; onSave: (v: string) => void; className: string }) {
  const [draft, setDraft] = useState<string | null>(null);
  if (draft === null)
    return (
      <button type="button" onClick={() => setDraft(value)} title="Rename" className={`truncate rounded-[6px] text-left hover:bg-surface ${className}`}>
        {value}
      </button>
    );
  const commit = () => {
    if (draft.trim() && draft.trim() !== value) onSave(draft);
    setDraft(null);
  };
  return (
    <input
      autoFocus
      value={draft}
      maxLength={80}
      aria-label="Name"
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") {
          e.stopPropagation();
          e.preventDefault();
          setDraft(null);
        }
      }}
      className={`w-full rounded-[6px] border border-primary bg-surface px-1 outline-none ${className}`}
    />
  );
}
