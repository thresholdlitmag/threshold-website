import { useEffect, useRef, useState } from "react";
import Botanical, { BotanicalKind, BOTANICAL_COLORS } from "./Botanical";
import { PETAL_EVENT } from "../lib/petals";

/**
 * The site's living flourishes: a small bloom wherever you click, petals
 * falling on a celebration, and the occasional petal drifting past in
 * the background.
 *
 * The falling petals are built as three nested elements rather than one,
 * because a single transform can't do what a real petal does. The outer
 * element falls, the middle one swings side to side like a pendulum, and
 * the inner one tumbles on two axes — so a petal turns edge-on, catches,
 * and swings back the way a real one does. One combined animation would
 * only ever look like a sprite sliding down the screen.
 *
 * All of it switches off for visitors who have asked for reduced motion.
 */

interface Bloom {
  id: number;
  x: number;
  y: number;
  kind: BotanicalKind;
  color: string;
  size: number;
  rotate: number;
}

interface Spark {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  spin: number;
  color: string;
  size: number;
}

interface Petal {
  id: number;
  kind: BotanicalKind;
  left: number;
  delay: number;
  fall: number;
  sway: number;
  swayAmp: number;
  spin: number;
  tumble: number;
  color: string;
  size: number;
  opacity: number;
  /** Background drift, as opposed to a celebration shower. */
  ambient: boolean;
}

const BLOOM_MS = 1000;
const SPARK_MS = 900;
const SHOWER_COUNT = 30;
/** How often something drifts past in the background. */
const AMBIENT_MIN_MS = 2600;
const AMBIENT_MAX_MS = 5200;
/** How many can be adrift at once, so a slow read doesn't fill the page. */
const AMBIENT_MAX_ON_SCREEN = 5;

/* Weighted: mostly leaves, with petals mixed through. */
const FALLING_KINDS: BotanicalKind[] = [
  "leaf",
  "leaf",
  "leaf",
  "petal",
  "petal",
];

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function range(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

let idSeed = 0;
function nextId(): number {
  return ++idSeed;
}

function makePetal(ambient: boolean): Petal {
  return {
    id: nextId(),
    kind: pick(FALLING_KINDS),
    left: range(-4, 100),
    delay: ambient ? 0 : range(0, 1100),
    fall: ambient ? range(11000, 16000) : range(4200, 7000),
    sway: range(1800, 3400),
    swayAmp: range(18, 62),
    spin: range(2200, 4200),
    tumble: range(1500, 3000),
    color: pick(BOTANICAL_COLORS),
    size: ambient ? range(15, 26) : range(15, 30),
    opacity: ambient ? range(0.28, 0.46) : range(0.75, 1),
    ambient,
  };
}

export default function FlowerEffects() {
  const [blooms, setBlooms] = useState<Bloom[]>([]);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [petals, setPetals] = useState<Petal[]>([]);
  const [enabled, setEnabled] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setEnabled(!query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  // Nothing outlives the component.
  useEffect(
    () => () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    },
    [],
  );

  function later(fn: () => void, ms: number) {
    timers.current.push(window.setTimeout(fn, ms));
  }

  /* ---- a bloom, and a small scatter of petals, where you clicked ---- */
  useEffect(() => {
    if (!enabled) return;

    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target?.closest("a, button, .chip, [role='link']")) return;

      const { clientX: x, clientY: y } = event;
      const bloom: Bloom = {
        id: nextId(),
        x,
        y,
        kind: pick(["flower", "daisy", "flower"] as BotanicalKind[]),
        color: pick(BOTANICAL_COLORS),
        size: range(22, 32),
        rotate: range(-40, 40),
      };
      setBlooms((current) => [...current, bloom]);
      later(
        () => setBlooms((c) => c.filter((b) => b.id !== bloom.id)),
        BLOOM_MS,
      );

      // Three petals thrown outward, so a click scatters rather than
      // just popping in place.
      const batch: Spark[] = Array.from({ length: 3 }, () => {
        const angle = range(0, Math.PI * 2);
        const distance = range(26, 58);
        return {
          id: nextId(),
          x,
          y,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance - 14,
          spin: range(-220, 220),
          color: pick(BOTANICAL_COLORS),
          size: range(10, 16),
        };
      });
      setSparks((current) => [...current, ...batch]);
      const ids = new Set(batch.map((s) => s.id));
      later(() => setSparks((c) => c.filter((s) => !ids.has(s.id))), SPARK_MS);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled]);

  /* ---- a shower of petals on celebration events ---- */
  useEffect(() => {
    if (!enabled) return;

    function onShower() {
      const batch = Array.from({ length: SHOWER_COUNT }, () =>
        makePetal(false),
      );
      setPetals((current) => [...current, ...batch]);

      const longest = Math.max(...batch.map((p) => p.delay + p.fall));
      const ids = new Set(batch.map((p) => p.id));
      later(
        () => setPetals((c) => c.filter((p) => !ids.has(p.id))),
        longest + 300,
      );
    }

    window.addEventListener(PETAL_EVENT, onShower);
    return () => window.removeEventListener(PETAL_EVENT, onShower);
  }, [enabled]);

  /* ---- one petal drifting past now and then ---- */
  useEffect(() => {
    if (!enabled) return;
    let stopped = false;
    let timer = 0;

    function drift() {
      if (stopped) return;
      // Don't pile up leaves in a tab nobody is looking at.
      if (!document.hidden) {
        const petal = makePetal(true);
        setPetals((current) => {
          // Cap what's adrift. Without this, sitting on a long poem for
          // a few minutes would gradually fill the screen.
          const ambient = current.filter((p) => p.ambient);
          if (ambient.length >= AMBIENT_MAX_ON_SCREEN) return current;
          return [...current, petal];
        });
        // Tracked in the shared ref so unmounting clears it too.
        later(
          () => setPetals((c) => c.filter((p) => p.id !== petal.id)),
          petal.fall + 400,
        );
      }
      timer = window.setTimeout(drift, range(AMBIENT_MIN_MS, AMBIENT_MAX_MS));
    }

    timer = window.setTimeout(drift, range(2500, 5000));
    return () => {
      stopped = true;
      window.clearTimeout(timer);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="flower-effects" aria-hidden="true">
      {blooms.map((bloom) => (
        <span
          key={bloom.id}
          className="bloom"
          style={{
            left: bloom.x,
            top: bloom.y,
            ["--bloom-rotate" as string]: `${bloom.rotate}deg`,
            ["--bloom-ms" as string]: `${BLOOM_MS}ms`,
          }}
        >
          <Botanical kind={bloom.kind} color={bloom.color} size={bloom.size} />
        </span>
      ))}

      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="spark"
          style={{
            left: spark.x,
            top: spark.y,
            ["--spark-dx" as string]: `${spark.dx}px`,
            ["--spark-dy" as string]: `${spark.dy}px`,
            ["--spark-spin" as string]: `${spark.spin}deg`,
            ["--spark-ms" as string]: `${SPARK_MS}ms`,
          }}
        >
          <Botanical kind="petal" color={spark.color} size={spark.size} />
        </span>
      ))}

      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal-fall"
          style={{
            left: `${petal.left}%`,
            opacity: petal.opacity,
            ["--fall-ms" as string]: `${petal.fall}ms`,
            ["--fall-delay" as string]: `${petal.delay}ms`,
          }}
        >
          <span
            className="petal-sway"
            style={{
              ["--sway-ms" as string]: `${petal.sway}ms`,
              ["--sway-amp" as string]: `${petal.swayAmp}px`,
            }}
          >
            <span
              className="petal-spin"
              style={{
                ["--spin-ms" as string]: `${petal.spin}ms`,
                ["--tumble-ms" as string]: `${petal.tumble}ms`,
              }}
            >
              <Botanical
                kind={petal.kind}
                color={petal.color}
                size={petal.size}
              />
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}
