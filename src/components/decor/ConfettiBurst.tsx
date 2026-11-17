import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface ConfettiBurstProps {
  /** When true, fires a burst of confetti pieces. */
  active: boolean;
  /** Number of confetti pieces. */
  count?: number;
  className?: string;
}

const CONFETTI_COLORS = ['#D9829B', '#DCD5F5', '#F8DCCB', '#E8A9BC', '#F8DDE5', '#FFF8EF'];

/** A one-shot confetti burst that rains down from the top center. */
export function ConfettiBurst({ active, count = 80, className = '' }: ConfettiBurstProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const angle = (Math.random() - 0.5) * 120;
        const distance = 200 + Math.random() * 400;
        return {
          id: i,
          x: Math.sin((angle * Math.PI) / 180) * distance,
          y: 300 + Math.random() * 500,
          rotation: Math.random() * 720 - 360,
          color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          size: 6 + Math.random() * 8,
          delay: Math.random() * 0.3,
          duration: 2 + Math.random() * 2,
          round: Math.random() > 0.6,
        };
      }),
    [count],
  );

  if (!active) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/3"
          style={{
            width: p.size,
            height: p.round ? p.size : p.size * 0.5,
            backgroundColor: p.color,
            borderRadius: p.round ? '9999px' : '2px',
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotation }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}
