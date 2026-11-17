import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface BalloonsProps {
  count?: number;
  className?: string;
}

const BALLOON_COLORS = ['#D9829B', '#DCD5F5', '#F8DCCB', '#E8A9BC', '#B85F7E'];

/** A cluster of gently bobbing balloons with curling strings. */
export function Balloons({ count = 8, className = '' }: BalloonsProps) {
  const balloons = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: (i / count) * 100 + (Math.random() * 8 - 4),
        top: Math.random() * 30,
        size: 38 + Math.random() * 28,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        swayDelay: Math.random() * 2,
      })),
    [count],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{ left: `${b.left}%`, top: `${b.top}%` }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: b.delay, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: b.duration, repeat: Infinity, ease: 'easeInOut', delay: b.swayDelay }}
          >
            {/* balloon body */}
            <div
              className="relative rounded-full"
              style={{
                width: b.size,
                height: b.size * 1.2,
                background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.65), ${b.color} 55%)`,
                boxShadow: `inset -4px -6px 10px rgba(0,0,0,0.12), 0 6px 18px rgba(217,130,155,0.25)`,
              }}
            >
              {/* knot */}
              <div
                className="absolute left-1/2 -bottom-1 h-0 w-0 -translate-x-1/2"
                style={{
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderTop: `6px solid ${b.color}`,
                }}
              />
            </div>
            {/* string */}
            <svg
              width="20"
              height="70"
              viewBox="0 0 20 70"
              className="mx-auto -mt-1"
              style={{ display: 'block' }}
            >
              <path
                d="M10 0 C 14 15, 6 30, 10 45 C 14 58, 8 64, 10 70"
                stroke="rgba(69,59,72,0.35)"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
