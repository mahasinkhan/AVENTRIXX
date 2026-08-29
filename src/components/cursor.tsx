"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const [on, setOn] = useState(false);
  const [hot, setHot] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const ringX = useSpring(x, { stiffness: 230, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 230, damping: 26, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 950, damping: 45, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 950, damping: 45, mass: 0.2 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const soft = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || soft.matches) return;

    setOn(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as Element | null;
      const next = !!el?.closest?.("a, button, input, textarea, [data-cursor]");
      setHot((prev) => (prev === next ? prev : next));
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!on) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
      >
        <motion.div
          animate={{ scale: hot ? 1.9 : 1, opacity: hot ? 0.6 : 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="-ml-5 -mt-5 h-10 w-10 rounded-pill border border-white/70"
        />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
      >
        <motion.div
          animate={{ scale: hot ? 0 : 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="-ml-1 -mt-1 h-2 w-2 rounded-pill bg-white"
        />
      </motion.div>
    </>
  );
}

