"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useState } from "react";

/*
 * Background "weather" for the hero: drifting snow (dots + spinning crystals), twinkling stars,
 * a storm glow along the top, and the occasional lightning strike.
 * Snow layers parallax with the mouse. Only runs while `active` (hero in view), never for reduced motion.
 */

// Small seeded PRNG so server and client render the same flakes (no hydration mismatch).
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Flake {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  blur: number;
  crystal: boolean;
  spin: number;
  desktopOnly: boolean;
}

const rand = mulberry32(20261006);

function makeFlakes(count: number, near: boolean): Flake[] {
  return Array.from({ length: count }, (_, i) => {
    const depth = near ? 0.55 + rand() * 0.45 : rand() * 0.55; // 0 = far, 1 = close
    const duration = 15 - depth * 8 + rand() * 4;
    const crystal = near && rand() > 0.55;
    return {
      id: i,
      left: rand() * 100,
      size: crystal ? 10 + depth * 10 : 2 + depth * 4,
      duration,
      delay: -rand() * duration, // start mid-fall so the screen is already snowing
      drift: (rand() - 0.5) * (40 + depth * 50),
      opacity: crystal ? 0.55 + depth * 0.35 : 0.3 + depth * 0.6,
      blur: !crystal && depth > 0.85 ? 1.5 : 0,
      crystal,
      spin: (rand() > 0.5 ? 1 : -1) * (120 + rand() * 240),
      desktopOnly: i % 2 === 1, // fewer flakes on phones
    };
  });
}

const FAR_FLAKES = makeFlakes(46, false);
const NEAR_FLAKES = makeFlakes(26, true);

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: rand() * 100,
  top: rand() * 65,
  size: 1 + rand() * 1.8,
  duration: 2 + rand() * 3,
  delay: rand() * 4,
}));

function SnowCrystal({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="-12 -12 24 24" className="block">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none">
        {[0, 60, 120].map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <line x1="0" y1="-11" x2="0" y2="11" />
            <polyline points="-3,-8 0,-5 3,-8" />
            <polyline points="-3,8 0,5 3,8" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function SnowLayer({
  flakes,
  px,
  py,
  strength,
}: {
  flakes: Flake[];
  px: MotionValue<number>;
  py: MotionValue<number>;
  strength: number;
}) {
  const x = useTransform(px, (v) => v * strength);
  const y = useTransform(py, (v) => v * strength * 0.6);

  return (
    <motion.div className="absolute -inset-10" style={{ x, y }}>
      {flakes.map((flake) => (
        <motion.span
          key={flake.id}
          className={`absolute top-0 ${flake.crystal ? "text-indigo-400 dark:text-white" : "rounded-full bg-indigo-400 dark:bg-white"} ${flake.desktopOnly ? "hidden sm:block" : ""}`}
          style={{
            left: `${flake.left}%`,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            filter: flake.crystal
              ? "drop-shadow(0 0 4px rgba(165,180,252,0.9))"
              : flake.blur
                ? `blur(${flake.blur}px)`
                : undefined,
            boxShadow: flake.crystal ? undefined : "0 0 6px rgba(165,180,252,0.6)",
          }}
          initial={{ y: "-5vh", x: 0, rotate: 0 }}
          animate={{
            y: "110vh",
            x: [0, flake.drift, -flake.drift / 2, flake.drift / 3],
            rotate: flake.crystal ? flake.spin : 0,
          }}
          transition={{
            y: { duration: flake.duration, delay: flake.delay, repeat: Infinity, ease: "linear" },
            x: { duration: flake.duration / 2, delay: flake.delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
            rotate: { duration: flake.duration, delay: flake.delay, repeat: Infinity, ease: "linear" },
          }}
        >
          {flake.crystal && <SnowCrystal size={flake.size} />}
        </motion.span>
      ))}
    </motion.div>
  );
}

interface Strike {
  id: number;
  left: number;
  path: string;
  branches: string[];
}

// Jagged bolt from top to bottom of a 160 x 400 box, with a couple of forks.
function makeBolt(): Pick<Strike, "path" | "branches"> {
  let x = 80;
  let y = 0;
  const points: [number, number][] = [[x, y]];
  while (y < 400) {
    y += 22 + Math.random() * 30;
    x = Math.min(150, Math.max(10, x + (Math.random() - 0.5) * 55));
    points.push([x, Math.min(y, 400)]);
  }
  const toPath = (pts: [number, number][]) =>
    pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`).join(" ");

  const branches = [0.3, 0.55].map((at) => {
    const [bx, by] = points[Math.max(1, Math.floor(points.length * at))];
    const dir = Math.random() > 0.5 ? 1 : -1;
    const pts: [number, number][] = [[bx, by]];
    let cx = bx;
    let cy = by;
    for (let i = 0; i < 3; i++) {
      cx += dir * (10 + Math.random() * 18);
      cy += 18 + Math.random() * 22;
      pts.push([cx, cy]);
    }
    return toPath(pts);
  });

  return { path: toPath(points), branches };
}

export default function HeroWeather({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  const [strike, setStrike] = useState<Strike | null>(null);

  // Mouse parallax, -1..1 across the screen, smoothed.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 40, damping: 20 });
  const py = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (!active || reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [active, reduceMotion, mx, my]);

  // Lightning: a strike every 5–10 seconds while the hero is on screen.
  useEffect(() => {
    if (!active || reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    let clear: ReturnType<typeof setTimeout>;
    const schedule = (wait: number) => {
      timer = setTimeout(() => {
        setStrike({ id: Date.now(), left: 8 + Math.random() * 80, ...makeBolt() });
        clear = setTimeout(() => setStrike(null), 1100);
        schedule(5000 + Math.random() * 5000);
      }, wait);
    };
    schedule(2500);
    return () => {
      clearTimeout(timer);
      clearTimeout(clear);
    };
  }, [active, reduceMotion]);

  if (reduceMotion || !active) return null;

  return (
    // Full viewport width even though the hero content is width-limited.
    <div className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden" aria-hidden="true">
      {/* Storm glow along the top edge */}
      <motion.div
        className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-indigo-300/30 via-indigo-200/10 to-transparent dark:from-indigo-500/20 dark:via-indigo-900/10"
        animate={{ opacity: strike ? [0.6, 1, 0.7, 1, 0.6] : 0.6 }}
        transition={{ duration: 0.8 }}
      />

      {/* Twinkling stars (dark mode only) */}
      <div className="absolute inset-0 hidden dark:block">
        {STARS.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${star.left}%`, top: `${star.top}%`, width: star.size, height: star.size }}
            animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Snow: far layer barely follows the mouse, near layer follows more → depth */}
      <SnowLayer flakes={FAR_FLAKES} px={px} py={py} strength={-10} />
      <SnowLayer flakes={NEAR_FLAKES} px={px} py={py} strength={-28} />

      {/* Lightning */}
      <AnimatePresence>
        {strike && (
          <motion.div key={strike.id} className="absolute inset-0" exit={{ opacity: 0, transition: { duration: 0.25 } }}>
            {/* Flash radiating from where the bolt lands */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at ${strike.left + 6}% 20%, rgba(199,210,254,0.55), rgba(129,140,248,0.18) 35%, transparent 70%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.2, 0.8, 0] }}
              transition={{ duration: 0.8, times: [0, 0.08, 0.22, 0.32, 1] }}
            />

            {/* Bolt: wide coloured glow underneath a thin bright core */}
            <svg
              className="absolute top-0 h-[78%] w-40"
              style={{ left: `${strike.left}%` }}
              viewBox="0 0 160 400"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id={`bolt-glow-${strike.id}`} x="-50%" y="-10%" width="200%" height="120%">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              </defs>
              {[strike.path, ...strike.branches].map((d, i) => {
                const isMain = i === 0;
                const timing = {
                  pathLength: { duration: isMain ? 0.16 : 0.12, delay: isMain ? 0 : 0.06 + i * 0.04, ease: "easeOut" as const },
                  opacity: { duration: 0.9, times: [0, 0.3, 0.4, 0.5, 1] },
                };
                return (
                  <g key={i}>
                    <motion.path
                      d={d}
                      fill="none"
                      className="stroke-indigo-500 dark:stroke-indigo-400"
                      strokeWidth={isMain ? 9 : 5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      filter={`url(#bolt-glow-${strike.id})`}
                      initial={{ pathLength: 0, opacity: 0.9 }}
                      animate={{ pathLength: 1, opacity: [0.9, 0.9, 0.3, 0.9, 0] }}
                      transition={timing}
                    />
                    <motion.path
                      d={d}
                      fill="none"
                      className="stroke-indigo-600 dark:stroke-white"
                      strokeWidth={isMain ? 2.4 : 1.4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0, opacity: 1 }}
                      animate={{ pathLength: 1, opacity: [1, 1, 0.3, 1, 0] }}
                      transition={timing}
                    />
                  </g>
                );
              })}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
