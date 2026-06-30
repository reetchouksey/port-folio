import { rooms } from "../data/content.js";
import RoomGlyph from "./icons/RoomGlyphs.jsx";

/**
 * 2D, animation-free replacement for the Three.js `HouseScene`. Used on:
 *   - touch devices
 *   - prefers-reduced-motion
 *   - low-end CPUs (≤ 4 cores) / low memory devices
 *
 * Mirrors the same `hovered` / `onHover` / `onClick` API the 3D scene uses,
 * so `Hero.jsx` and `RoomMarkers.jsx` can drop it in without any other
 * changes. Render cost: zero JS work per frame, just the browser painting
 * a static gradient + a few divs.
 */

const LAYOUT = [
  { id: "skills", gridArea: "office", subtle: "Office Room" },
  { id: "achievements", gridArea: "trophy", subtle: "Trophy Room" },
  { id: "about", gridArea: "living", subtle: "Living Room" },
  { id: "projects", gridArea: "garage", subtle: "Garage" },
  { id: "contact", gridArea: "reception", subtle: "Reception" },
];

export default function HouseSceneFallback({ hovered, onHover, onClick }) {
  const byId = Object.fromEntries(rooms.map((r) => [r.id, r]));

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#faf3e3_0%,#f1e2c4_60%,#e3d0a8_100%)]" />

      <Yard />

      <div
        className="relative h-full w-full p-3 sm:p-6"
        style={{
          display: "grid",
          gap: "0.55rem",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr 0.85fr",
          gridTemplateAreas: `
            "office trophy"
            "living garage"
            "reception reception"
          `,
        }}
      >
        {LAYOUT.map(({ id, gridArea, subtle }) => {
          const room = byId[id];
          if (!room) return null;
          const isHovered = hovered === id;
          const isOther = hovered && hovered !== id;
          return (
            <button
              key={id}
              type="button"
              onMouseEnter={() => onHover?.(id)}
              onMouseLeave={() => onHover?.(null)}
              onFocus={() => onHover?.(id)}
              onBlur={() => onHover?.(null)}
              onClick={() => onClick?.(id)}
              data-cursor="hover"
              aria-label={`Open ${room.label} — ${room.sub}`}
              style={{
                gridArea,
                background: `linear-gradient(135deg, ${room.color}26, ${room.color}10 60%, ${room.color}04)`,
                borderColor: `${room.color}55`,
                opacity: isOther ? 0.7 : 1,
                transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                boxShadow: isHovered
                  ? `0 14px 30px -14px ${room.color}80, 0 0 0 1px ${room.color}66 inset`
                  : "0 6px 14px -10px rgba(74,47,26,0.45), 0 0 0 1px rgba(74,47,26,0.06) inset",
              }}
              className="relative overflow-hidden rounded-2xl border text-left flex flex-col justify-between p-3 sm:p-4 transition-[transform,box-shadow,opacity] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-900"
            >
              <span className="absolute inset-0 pointer-events-none bg-noise opacity-[0.18] mix-blend-multiply" />
              <span className="absolute top-2 right-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-500">
                {subtle}
              </span>

              <span
                className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border bg-cream-50/80"
                style={{ borderColor: `${room.color}66`, color: room.color }}
                aria-hidden="true"
              >
                <RoomGlyph roomId={id} size={20} />
              </span>

              <span className="space-y-0.5">
                <span className="block font-display text-base sm:text-lg font-semibold text-ink-900 leading-tight">
                  {room.sub}
                </span>
                <span className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-ink-500">
                  {room.hint}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Yard() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <circle cx="40" cy="60" r="26" fill="#a8b58a" opacity="0.45" />
      <circle cx="40" cy="50" r="22" fill="#7a8442" opacity="0.55" />
      <circle cx="360" cy="80" r="24" fill="#a8b58a" opacity="0.45" />
      <circle cx="360" cy="68" r="20" fill="#7a8442" opacity="0.55" />
      <ellipse cx="200" cy="285" rx="180" ry="10" fill="#d4a04c" opacity="0.18" />
    </svg>
  );
}
