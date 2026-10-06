"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  useVelocity,
  type AnimationPlaybackControls,
  type MotionValue,
  type PanInfo,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

/*
 * Cinematic 3D "DNA helix" carousel.
 * Cards travel along a sine-shaped double strand: neighbours rise and fall alternately,
 * rotate away in 3D, sink back in depth, blur and fade, and pick up an RGB split while moving fast.
 * Drag / swipe (with momentum + snapping), trackpad horizontal scroll, arrow keys, autoplay, infinite loop.
 */

interface DNACarouselProps<T> {
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (item: T, state: { isActive: boolean }) => ReactNode;
  /** Fires with the real item index (0..items.length-1) whenever the centred card changes. */
  onActiveChange?: (index: number) => void;
  /** Fires when the already-centred card is clicked or Enter is pressed. */
  onSelect?: (item: T, index: number) => void;
  cardWidth?: number;
  cardHeight?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  ariaLabel?: string;
  className?: string;
}

// With few items the loop looks sparse, so short lists are repeated to fill the helix.
const MIN_SLOTS = 8;
const VISIBLE_RANGE = 3.2;
const MAX_DOTS = 10;

const wrap = (v: number, total: number) => ((v % total) + total) % total;
// Signed distance of a slot from the centre, wrapped to [-total/2, total/2).
const wrapOffset = (v: number, total: number) => wrap(v + total / 2, total) - total / 2;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function useElementWidth(ref: RefObject<HTMLElement | null>, fallback: number) {
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
  return width;
}

interface Layout {
  spacing: number;
  amplitude: number;
  depth: number;
}

function HelixCard({
  slot,
  total,
  position,
  speed,
  layout,
  width,
  height,
  isActive,
  onClick,
  children,
}: {
  slot: number;
  total: number;
  position: MotionValue<number>;
  speed: MotionValue<number>;
  layout: Layout;
  width: number;
  height: number;
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  const d = useTransform(position, (p) => wrapOffset(slot - p, total));

  const x = useTransform(d, (v) => v * layout.spacing);
  // Alternating strands: right neighbour rises, left neighbour dips.
  const y = useTransform(d, (v) => -Math.sin((v * Math.PI) / 2) * layout.amplitude);
  const z = useTransform(d, (v) => -Math.abs(v) * layout.depth);
  const rotateY = useTransform(d, (v) => clamp(-v * 24, -65, 65));
  const rotateZ = useTransform(d, (v) => Math.sin((v * Math.PI) / 2) * 5);
  const scale = useTransform(d, (v) => 1 - Math.min(Math.abs(v), 3) * 0.1);
  const zIndex = useTransform(d, (v) => 100 - Math.round(Math.abs(v) * 10));
  const opacity = useTransform(d, (v) => {
    const a = Math.abs(v);
    if (a > VISIBLE_RANGE) return 0;
    const fadeAtLoopSeam = clamp((total / 2 - a) / 0.6, 0, 1);
    return (1 - Math.min(a, 3) * 0.22) * fadeAtLoopSeam;
  });
  const visibility = useTransform(opacity, (o) => (o < 0.02 ? "hidden" : "visible"));
  const filter = useTransform([d, speed], (values: number[]) => {
    const [v, s] = values;
    const blur = Math.abs(v) < 0.05 ? 0 : Math.min(Math.abs(v), 3) * 2.2;
    const split = Math.min(Math.abs(s) * 1.4, 7);
    const rgb =
      split > 0.4
        ? ` drop-shadow(${split}px 0 0 rgba(255,0,90,0.45)) drop-shadow(${-split}px 0 0 rgba(0,200,255,0.45))`
        : "";
    return `blur(${blur.toFixed(2)}px)${rgb}`;
  });

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 cursor-pointer select-none [&_img]:pointer-events-none"
      style={{
        width,
        height,
        marginLeft: -width / 2,
        marginTop: -height / 2,
        x,
        y,
        z,
        rotateY,
        rotateZ,
        scale,
        zIndex,
        opacity,
        visibility,
        filter,
      }}
      onClick={onClick}
      aria-hidden={!isActive}
    >
      <motion.div
        className="w-full h-full"
        whileHover={isActive ? { y: -8 } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function DNACarousel<T>({
  items,
  getKey,
  renderItem,
  onActiveChange,
  onSelect,
  cardWidth = 340,
  cardHeight = 440,
  autoplay = false,
  autoplayInterval = 3500,
  ariaLabel = "Carousel",
  className = "",
}: DNACarouselProps<T>) {
  const n = items.length;
  const reps = n >= 3 ? Math.max(1, Math.ceil(MIN_SLOTS / n)) : 1;
  const total = n * reps;

  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useElementWidth(containerRef, 1100);
  const w = Math.min(cardWidth, Math.max(180, containerWidth * 0.68));
  const h = w * (cardHeight / cardWidth);
  const layout: Layout = { spacing: w * 0.8, amplitude: h * 0.12, depth: w * 0.5 };

  const position = useMotionValue(0);
  const speed = useVelocity(position);
  const [activeSlot, setActiveSlot] = useState(0);
  const activeIndex = n ? activeSlot % n : 0;

  const reduceMotion = useReducedMotion();
  const inView = useInView(containerRef, { amount: 0.4 });
  const [paused, setPaused] = useState(false);

  const animRef = useRef<AnimationPlaybackControls | null>(null);
  const dragStart = useRef(0);
  const moved = useRef(false);

  useMotionValueEvent(position, "change", (p) => {
    if (total) setActiveSlot(wrap(Math.round(p), total));
  });

  useEffect(() => {
    onActiveChange?.(activeIndex);
  }, [activeIndex, onActiveChange]);

  const goTo = useCallback(
    (target: number, velocity = 0) => {
      animRef.current?.stop();
      animRef.current = animate(
        position,
        target,
        reduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 150, damping: 24, mass: 1, velocity }
      );
    },
    [position, reduceMotion]
  );

  const step = useCallback(
    (dir: number) => goTo(Math.round(position.get()) + dir),
    [goTo, position]
  );

  // Jump to a real item index along the shortest path round the loop.
  const goToIndex = useCallback(
    (index: number) => {
      const current = Math.round(position.get());
      let delta = index - (wrap(current, total) % n);
      if (delta > n / 2) delta -= n;
      if (delta < -n / 2) delta += n;
      goTo(current + delta);
    },
    [goTo, position, total, n]
  );

  // Autoplay: only while visible on screen and not being interacted with.
  useEffect(() => {
    if (!autoplay || reduceMotion || paused || !inView || n < 2) return;
    const id = setInterval(() => step(1), autoplayInterval);
    return () => clearInterval(id);
  }, [autoplay, autoplayInterval, reduceMotion, paused, inView, n, step]);

  // Horizontal trackpad / shift+wheel scroll moves the helix; vertical scroll still scrolls the page.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    let snapTimer: ReturnType<typeof setTimeout>;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 2) return;
      e.preventDefault();
      animRef.current?.stop();
      position.set(position.get() + e.deltaX / layout.spacing);
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => goTo(Math.round(position.get())), 140);
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      node.removeEventListener("wheel", onWheel);
      clearTimeout(snapTimer);
    };
  }, [position, layout.spacing, goTo]);

  const onPanStart = () => {
    animRef.current?.stop();
    dragStart.current = position.get();
    setPaused(true);
  };

  const onPan = (_: PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 5) moved.current = true;
    position.set(dragStart.current - info.offset.x / layout.spacing);
  };

  const onPanEnd = (_: PointerEvent, info: PanInfo) => {
    const velocity = -info.velocity.x / layout.spacing;
    const target = Math.round(position.get() + clamp(velocity * 0.3, -4, 4));
    goTo(target, velocity);
    setPaused(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "Enter" && n) {
      onSelect?.(items[activeIndex], activeIndex);
    }
  };

  if (!n) return null;

  return (
    <div className={className}>
      <motion.div
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDownCapture={() => (moved.current = false)}
        onClickCapture={(e) => {
          // A drag that ends over a card or link shouldn't count as a click.
          if (moved.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onPanStart={onPanStart}
        onPan={onPan}
        onPanEnd={onPanEnd}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 rounded-3xl"
        style={{
          height: h + layout.amplitude * 2 + 60,
          perspective: 1400,
          touchAction: "pan-y",
        }}
      >
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {Array.from({ length: total }, (_, slot) => {
            const item = items[slot % n];
            const isActive = slot === activeSlot;
            return (
              <HelixCard
                key={`${getKey(item)}-${Math.floor(slot / n)}`}
                slot={slot}
                total={total}
                position={position}
                speed={speed}
                layout={layout}
                width={w}
                height={h}
                isActive={isActive}
                onClick={() => {
                  if (isActive) onSelect?.(item, slot % n);
                  else goTo(Math.round(position.get() + wrapOffset(slot - position.get(), total)));
                }}
              >
                {renderItem(item, { isActive })}
              </HelixCard>
            );
          })}
        </div>
      </motion.div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-5">
        <motion.button
          type="button"
          onClick={() => step(-1)}
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur text-slate-700 dark:text-slate-200 flex items-center justify-center hover:border-indigo-500 transition-colors"
          aria-label="Previous"
        >
          ←
        </motion.button>

        {n > MAX_DOTS ? (
          // Too many items for dots (they'd overflow on phones): show a progress bar instead.
          <div className="relative h-1.5 w-28 sm:w-40 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden">
            <motion.span
              className="absolute inset-y-0 left-0 rounded-full bg-indigo-500"
              animate={{ width: `${((activeIndex + 1) / n) * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            />
          </div>
        ) : (
        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={getKey(item)}
              type="button"
              onClick={() => goToIndex(i)}
              aria-label={`Go to item ${i + 1}`}
              className="relative h-2 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden transition-[width] duration-300"
              style={{ width: i === activeIndex ? 28 : 8 }}
            >
              {i === activeIndex && (
                <motion.span
                  layoutId={`dna-dot-${ariaLabel}`}
                  className="absolute inset-0 rounded-full bg-indigo-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        )}

        <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400 w-12 text-center">
          {String(activeIndex + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>

        <motion.button
          type="button"
          onClick={() => step(1)}
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur text-slate-700 dark:text-slate-200 flex items-center justify-center hover:border-indigo-500 transition-colors"
          aria-label="Next"
        >
          →
        </motion.button>
      </div>
    </div>
  );
}
