import { useRef } from "react";
import { EventDef, Track } from "../types";

/* ─── constants ─────────────────────────────────────────────────────── */

const BG        = "#070d1a";
const BORDER    = "rgba(255,255,255,0.06)";
const MUTED     = "#475569";

const TRACKS: { key: Track; label: string; sub: string; color: string }[] = [
  { key: "single",    label: "Fase 1 · Trilho Único",  sub: "",                          color: "#3b82f6" },
  { key: "anterior",  label: "Intestino Anterior",     sub: "Tronco Celíaco",            color: "#3b82f6" },
  { key: "medio",     label: "Intestino Médio",        sub: "A. Mesentérica Superior",   color: "#06b6d4" },
  { key: "posterior", label: "Intestino Posterior",    sub: "A. Mesentérica Inferior",   color: "#818cf8" },
];

const LABEL_W  = 154;
const AXIS_H   = 28;
const ROW_PAD  = 6;
const BAR_H    = 26;
const BAR_GAP  = 4;
const MIN_BAR_W = 36;

/* ─── lane packing ───────────────────────────────────────────────────── */

function packLanes(evs: EventDef[]): Map<string, number> {
  const sorted = [...evs].sort((a, b) => a.startWeek - b.startWeek);
  const laneEnd: number[] = [];
  const map = new Map<string, number>();
  for (const ev of sorted) {
    let lane = laneEnd.findIndex(end => end <= ev.startWeek + 0.05);
    if (lane === -1) lane = laneEnd.length;
    laneEnd[lane] = ev.endWeek;
    map.set(ev.id, lane);
  }
  return map;
}

function maxLane(map: Map<string, number>): number {
  return map.size === 0 ? 0 : Math.max(...map.values());
}

/* ─── component ──────────────────────────────────────────────────────── */

interface Props {
  events: EventDef[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  answeredSet: Set<string>;
  weekPx: number;
  onZoomChange: (v: number) => void;
  totalWeeks: number;
}

export function NotionTimeline({
  events, selectedId, onSelect,
  answeredSet, weekPx, onZoomChange, totalWeeks,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const wasDragging = useRef(false);

  const startDrag = (e: React.MouseEvent) => {
    const el = scrollRef.current!;
    const startX = e.pageX + el.scrollLeft;
    wasDragging.current = false;
    const onMove = (me: MouseEvent) => {
      wasDragging.current = true;
      el.scrollLeft = startX - me.pageX;
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.style.cursor = "grab";
    };
    el.style.cursor = "grabbing";
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const trackMeta = TRACKS.map(tc => {
    const evs  = events.filter(e => e.track === tc.key);
    const lanes = packLanes(evs);
    const n     = maxLane(lanes) + (evs.length > 0 ? 1 : 1);
    const rowH  = ROW_PAD * 2 + n * BAR_H + Math.max(0, n - 1) * BAR_GAP;
    return { ...tc, evs, lanes, n, rowH };
  });

  const contentW = totalWeeks * weekPx;

  return (
    <div style={{ background: BG, borderBottom: "1px solid " + BORDER, userSelect: "none", flexShrink: 0 }}>

      {/* ── Toolbar ── */}
      <div style={{
        height: 32, display: "flex", alignItems: "center",
        padding: "0 14px", gap: 8,
        borderBottom: "1px solid " + BORDER,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#d7eb00", boxShadow: "0 0 8px #d7eb00", flexShrink: 0 }} />
        <span style={{ fontSize: 9, color: MUTED, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>
          Linha do Tempo — Gantt
        </span>

        {/* Zoom */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
          <ZBtn onClick={() => onZoomChange(Math.max(28, weekPx - 14))}>−</ZBtn>
          <span style={{ fontSize: 9, color: MUTED, width: 72, textAlign: "center" }}>
            {weekPx} px / semana
          </span>
          <ZBtn onClick={() => onZoomChange(Math.min(240, weekPx + 14))}>+</ZBtn>
        </div>
      </div>

      {/* ── Grid ── */}
      <div
        ref={scrollRef}
        onMouseDown={startDrag}
        style={{ display: "flex", overflowX: "auto", overflowY: "hidden", cursor: "grab", scrollbarWidth: "none" }}
      >
        {/* Sticky left labels */}
        <div style={{
          width: LABEL_W, flexShrink: 0,
          position: "sticky", left: 0, zIndex: 20,
          background: BG, borderRight: "1px solid " + BORDER,
        }}>
          <div style={{ height: AXIS_H, borderBottom: "1px solid " + BORDER }} />
          {trackMeta.map(t => (
            <div key={t.key} style={{
              height: t.rowH, borderBottom: "1px solid " + BORDER,
              display: "flex", flexDirection: "column",
              justifyContent: "center", padding: "0 12px",
            }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: t.color, letterSpacing: 0.2 }}>{t.label}</div>
              {t.sub && <div style={{ fontSize: 8, color: MUTED, marginTop: 2 }}>{t.sub}</div>}
            </div>
          ))}
        </div>

        {/* Scrollable content */}
        <div style={{ position: "relative", width: contentW, flexShrink: 0 }}>

          {/* Week axis */}
          <div style={{
            display: "flex", height: AXIS_H,
            borderBottom: "1px solid " + BORDER,
            background: BG, zIndex: 10,
          }}>
            {Array.from({ length: totalWeeks }, (_, i) => (
              <div key={i} style={{
                width: weekPx, flexShrink: 0,
                display: "flex", alignItems: "center", paddingLeft: 8,
                borderLeft: "1px solid rgba(255,255,255,0.035)",
                fontSize: 9, color: MUTED, fontWeight: 700, letterSpacing: 0.5,
              }}>
                S{i + 1}
              </div>
            ))}
          </div>

          {/* Track rows */}
          {trackMeta.map(t => (
            <div key={t.key} style={{
              position: "relative", height: t.rowH,
              borderBottom: "1px solid " + BORDER,
            }}>
              {/* Subtle track tint */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(90deg, ${t.color}08, transparent 40%)`,
                pointerEvents: "none",
              }} />

              {/* Week gridlines */}
              {Array.from({ length: totalWeeks }, (_, i) => (
                <div key={i} style={{
                  position: "absolute",
                  left: i * weekPx, top: 0, bottom: 0, width: 1,
                  background: "rgba(255,255,255,0.025)",
                }} />
              ))}

              {/* Event bars */}
              {t.evs.map(ev => {
                const lane = t.lanes.get(ev.id) ?? 0;
                const x    = (ev.startWeek - 1) * weekPx;
                const rawW = (ev.endWeek - ev.startWeek) * weekPx;
                const w    = Math.max(MIN_BAR_W, rawW - 4);
                const y    = ROW_PAD + lane * (BAR_H + BAR_GAP);
                const sel  = selectedId === ev.id;
                const done = answeredSet.has(ev.id);

                return (
                  <div
                    key={ev.id}
                    onClick={() => { if (!wasDragging.current) onSelect(ev.id); }}
                    title={`${ev.code} — ${ev.title}`}
                    style={{
                      position: "absolute",
                      left: x + 2, top: y,
                      width: w, height: BAR_H,
                      borderRadius: 7,
                      background: sel ? `${t.color}28` : `${t.color}14`,
                      border: `1px solid ${sel ? t.color : t.color + "55"}`,
                      boxShadow: sel ? `0 0 16px ${t.color}44` : "none",
                      display: "flex", alignItems: "center", gap: 5,
                      padding: "0 8px",
                      cursor: "pointer",
                      overflow: "hidden",
                      transition: "all 0.12s",
                      zIndex: sel ? 5 : 2,
                    }}
                  >
                    {/* Organ icon */}
                    <span style={{
                      fontSize: 12, flexShrink: 0,
                      filter: `drop-shadow(0 0 5px ${t.color}99)`,
                    }}>
                      {ev.organIcon}
                    </span>

                    {/* Label (only if enough space) */}
                    {w > 68 && (
                      <span style={{
                        fontSize: 8.5, fontWeight: 600,
                        color: sel ? t.color : `${t.color}bb`,
                        whiteSpace: "nowrap", overflow: "hidden",
                        textOverflow: "ellipsis", letterSpacing: 0.2,
                        lineHeight: 1,
                      }}>
                        <span style={{ opacity: 0.65, marginRight: 3 }}>{ev.code}</span>
                        {ev.title}
                      </span>
                    )}

                    {/* Answered checkmark */}
                    {done && (
                      <span style={{ marginLeft: "auto", fontSize: 9, color: "#22c55e", flexShrink: 0 }}>✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── zoom button ────────────────────────────────────────────────────── */
function ZBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 24, height: 24, borderRadius: 6,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#94a3b8", fontSize: 15, cursor: "pointer",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontFamily: "inherit", lineHeight: 1, padding: 0,
      }}
    >
      {children}
    </button>
  );
}
