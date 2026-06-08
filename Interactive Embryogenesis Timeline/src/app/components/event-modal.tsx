import { useState } from "react";
import { EventDef, EventImage } from "../types";

/* ─── helpers ───────────────────────────────────────────────────────── */

/** Prefixa caminhos de assets públicos com o base do Vite
 *  (ex.: "/eventos/x.jpeg" → "/timeline-embriologia/eventos/x.jpeg"),
 *  para que as imagens carreguem corretamente no GitHub Pages. */
function asset(src: string): string {
  return import.meta.env.BASE_URL + src.replace(/^\//, "");
}

function parseBold(text: string): React.ReactNode {
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: "inherit", fontWeight: 700 }}>{part}</strong>
      : part
  );
}

const TRACK_META: Record<string, { label: string; color: string }> = {
  single:    { label: "Fase 1 · Trilho Único",  color: "#3b82f6" },
  anterior:  { label: "Intestino Anterior",      color: "#3b82f6" },
  medio:     { label: "Intestino Médio",         color: "#06b6d4" },
  posterior: { label: "Intestino Posterior",     color: "#818cf8" },
};

function Pill({ text, color }: { text: string; color: string }) {
  return (
    <span style={{
      padding: "2px 9px", borderRadius: 6,
      border: `1px solid ${color}44`,
      background: `${color}16`, color,
      fontSize: 9, fontWeight: 700, letterSpacing: 0.5, whiteSpace: "nowrap",
    }}>
      {text}
    </span>
  );
}

/* ─── component ──────────────────────────────────────────────────────── */

interface Props {
  event: EventDef;
  onClose: () => void;
  onAnswered: (id: string) => void;
  preAnswered: boolean;
}

export function EventDetailModal({ event, onClose, onAnswered, preAnswered }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(preAnswered);
  const [lightbox, setLightbox] = useState<EventImage | null>(null);

  const track = TRACK_META[event.track] ?? TRACK_META.single;
  const color = track.color;

  const choose = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    onAnswered(event.id);
  };

  const optStyle = (i: number): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: "100%", textAlign: "left", padding: "9px 13px",
      borderRadius: 9, border: "1px solid", fontSize: 11.5, lineHeight: 1.45,
      cursor: "pointer", transition: "all 0.15s", background: "transparent",
      fontFamily: "inherit", display: "flex", alignItems: "flex-start", gap: 9,
    };
    if (!answered)
      return { ...base, borderColor: `${color}40`, color: "#64748b" };
    if (i === event.correctIndex)
      return { ...base, borderColor: "#22c55e77", background: "#dcfce7", color: "#16a34a", cursor: "default" };
    if (i === selected)
      return { ...base, borderColor: "#ef444477", background: "#fee2e2", color: "#dc2626", cursor: "default" };
    return { ...base, borderColor: "rgba(0,0,0,0.05)", color: "#94a3b8", cursor: "default" };
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(5px)",
          zIndex: 100,
        }}
      />

      {/* Modal card */}
      <div style={{
        position: "fixed",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(660px, 93vw)",
        maxHeight: "88vh",
        background: "#ffffff",
        border: `1px solid ${color}33`,
        borderRadius: 18,
        boxShadow: `0 0 0 1px rgba(0,0,0,0.08), 0 28px 70px rgba(0,0,0,0.15), 0 0 50px ${color}14`,
        zIndex: 101,
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>

        {/* Top accent stripe */}
        <div style={{
          height: 3, flexShrink: 0,
          background: `linear-gradient(90deg, ${color}00, ${color}dd, ${color}00)`,
        }} />

        {/* Header */}
        <div style={{
          padding: "16px 20px 14px", flexShrink: 0,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          display: "flex", alignItems: "flex-start", gap: 10,
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", marginBottom: 8 }}>
              <Pill text={event.code}  color={color} />
              <Pill text={track.label} color={color} />
              <Pill text={event.period} color="#64748b" />
            </div>
            <h2 style={{
              margin: 0, fontSize: 18, fontWeight: 800,
              color: "#0f172a", letterSpacing: -0.5, lineHeight: 1.3,
            }}>
              {event.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              flexShrink: 0, width: 30, height: 30, borderRadius: 8,
              background: "rgba(0,0,0,0.05)",
              border: "1px solid rgba(0,0,0,0.1)",
              color: "#64748b", fontSize: 18, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "inherit", lineHeight: 1,
            }}
          >×</button>
        </div>

        {/* Scrollable body */}
        <div style={{
          flex: 1, overflowY: "auto",
          padding: "18px 20px 22px",
          scrollbarWidth: "thin",
          scrollbarColor: "#cbd5e1 #ffffff",
        }}>

          {/* Evento principal */}
          <div style={{
            padding: "11px 14px", borderRadius: 10,
            background: `${color}0c`, border: `1px solid ${color}22`,
            marginBottom: 18,
          }}>
            <div style={{
              fontSize: 8.5, color: color, fontWeight: 700,
              letterSpacing: 1.8, textTransform: "uppercase", marginBottom: 5,
            }}>
              Evento principal
            </div>
            <p style={{ margin: 0, fontSize: 12.5, color: "#475569", lineHeight: 1.6 }}>
              {event.mainEvent}
            </p>
          </div>

          {/* Imagens */}
          {event.images && event.images.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <SectionLabel>Imagens</SectionLabel>
              <div style={{ marginTop: 10 }}>
                <ImageCarousel
                  images={event.images}
                  color={color}
                  onExpand={setLightbox}
                />
              </div>
            </div>
          )}

          {/* Desenvolvimento */}
          <SectionLabel>Desenvolvimento</SectionLabel>
          <ul style={{ margin: "10px 0 20px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {event.development.map((bullet, i) => (
              <li key={i} style={{
                display: "flex", gap: 10, alignItems: "flex-start",
                fontSize: 12, color: "#64748b", lineHeight: 1.65,
              }}>
                <span style={{
                  flexShrink: 0, marginTop: 7,
                  width: 5, height: 5, borderRadius: "50%",
                  background: color, opacity: 0.7,
                  display: "block",
                }} />
                <span>{parseBold(bullet)}</span>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(0,0,0,0.08)", marginBottom: 18 }} />

          {/* Questão */}
          <SectionLabel>Questão</SectionLabel>
          <p style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.6, margin: "10px 0 14px" }}>
            {event.question}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {event.options.map((opt, i) => (
              <button key={opt.letter} style={optStyle(i)} onClick={() => choose(i)}>
                <span style={{ fontWeight: 800, color: color, flexShrink: 0, fontSize: 10.5 }}>
                  {opt.letter})
                </span>
                <span>{opt.text}</span>
              </button>
            ))}
          </div>

          {answered && (
            <div style={{
              marginTop: 14, padding: "12px 14px", borderRadius: 10,
              background: "rgba(34,197,94,0.07)",
              border: "1px solid rgba(34,197,94,0.22)",
            }}>
              <div style={{
                fontSize: 8.5, color: "#4ade80", fontWeight: 700,
                letterSpacing: 1.8, textTransform: "uppercase", marginBottom: 6,
              }}>
                Explicação
              </div>
              <p style={{ margin: 0, fontSize: 12, color: "#4ade80", lineHeight: 1.6 }}>
                {event.explanation}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox (imagem ampliada) */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,0.88)",
            backdropFilter: "blur(3px)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: 24, cursor: "zoom-out",
          }}
        >
          <img
            src={asset(lightbox.src)}
            alt={lightbox.caption ?? ""}
            style={{
              maxWidth: "94vw", maxHeight: "84vh",
              objectFit: "contain", borderRadius: 8,
              background: "#fff",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          />
          {lightbox.caption && (
            <p style={{
              margin: "14px 0 0", maxWidth: 720, textAlign: "center",
              fontSize: 12.5, color: "#94a3b8", lineHeight: 1.6,
            }}>
              {lightbox.caption}
            </p>
          )}
          <span style={{ marginTop: 10, fontSize: 10, color: "#64748b" }}>
            Clique para fechar
          </span>
        </div>
      )}
    </>
  );
}

/* ─── carousel ───────────────────────────────────────────────────────── */
function ImageCarousel({
  images, color, onExpand,
}: {
  images: EventImage[];
  color: string;
  onExpand: (img: EventImage) => void;
}) {
  const [idx, setIdx] = useState(0);
  const total = images.length;
  const cur = images[Math.min(idx, total - 1)];
  const go = (n: number) => setIdx((idx + n + total) % total);

  return (
    <div style={{
      border: `1px solid ${color}26`, borderRadius: 12,
      background: "#f5f5f5", overflow: "hidden",
    }}>
      {/* stage */}
      <div style={{ position: "relative", background: "#ffffff" }}>
        <button
          onClick={() => onExpand(cur)}
          title="Ampliar imagem"
          style={{
            display: "block", width: "100%", border: "none", padding: 0,
            background: "#ffffff", cursor: "zoom-in", lineHeight: 0,
          }}
        >
          <img
            src={asset(cur.src)}
            alt={cur.caption ?? ""}
            style={{
              display: "block", width: "100%", maxHeight: 300,
              objectFit: "contain", background: "#fff",
            }}
          />
        </button>

        {total > 1 && (
          <>
            <CarBtn side="left"  color={color} onClick={() => go(-1)}>‹</CarBtn>
            <CarBtn side="right" color={color} onClick={() => go(+1)}>›</CarBtn>
            <span style={{
              position: "absolute", top: 8, right: 8,
              padding: "2px 8px", borderRadius: 20,
              background: "rgba(0,0,0,0.6)", color: "#e2e8f0",
              fontSize: 10, fontWeight: 600,
            }}>
              {idx + 1}/{total}
            </span>
          </>
        )}
      </div>

      {/* caption */}
      {cur.caption && (
        <p style={{
          margin: 0, padding: "9px 12px",
          fontSize: 11, color: "#64748b", lineHeight: 1.5,
          borderTop: `1px solid ${color}1a`,
        }}>
          {cur.caption}
        </p>
      )}

      {/* dots */}
      {total > 1 && (
        <div style={{
          display: "flex", justifyContent: "center", gap: 6,
          padding: "0 0 10px",
        }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Imagem ${i + 1}`}
              style={{
                width: i === idx ? 18 : 6, height: 6, borderRadius: 4,
                border: "none", cursor: "pointer", padding: 0,
                background: i === idx ? color : "rgba(0,0,0,0.18)",
                transition: "all .15s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CarBtn({
  side, color, onClick, children,
}: {
  side: "left" | "right";
  color: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute", top: "50%", [side]: 8,
        transform: "translateY(-50%)",
        width: 30, height: 30, borderRadius: "50%",
        background: "rgba(0,0,0,0.55)",
        border: `1px solid ${color}55`,
        color: "#fff", fontSize: 18, lineHeight: 1, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "inherit",
      }}
    >
      {children}
    </button>
  );
}

/* ─── section label ──────────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 8.5, color: "#64748b", fontWeight: 700,
      letterSpacing: 1.8, textTransform: "uppercase",
    }}>
      {children}
    </div>
  );
}
