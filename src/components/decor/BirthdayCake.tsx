import { motion, AnimatePresence } from 'framer-motion';
import { Wind } from 'lucide-react';

interface BirthdayCakeProps {
  /** Number of candles on the cake. */
  candleCount?: number;
  /** Whether the candles are currently lit. */
  lit: boolean;
  /** Whether to show the "blow out the candles" hint. */
  showHint?: boolean;
  /** Called when the user clicks/taps to blow out the candles. */
  onBlowOut: () => void;
}

/** An illustrated birthday cake with flickering, blow-out-able candles. */
export function BirthdayCake({ candleCount = 5, lit, showHint = false, onBlowOut }: BirthdayCakeProps) {
  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Candles */}
      <div className="flex items-end gap-2.5 mb-1">
        {Array.from({ length: candleCount }).map((_, i) => (
          <Candle key={i} lit={lit} delay={i * 0.15} />
        ))}
      </div>

      {/* Cake */}
      <div className="relative" onClick={lit ? onBlowOut : undefined} role={lit ? 'button' : undefined} aria-label={lit ? 'Blow out the candles' : undefined}>
        {/* top tier */}
        <div className="relative w-44 h-16 rounded-t-xl rounded-b-md bg-gradient-to-b from-rose-light to-rose shadow-card">
          {/* frosting drips */}
          <div className="absolute -bottom-1 left-0 right-0 flex justify-around">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-cream"
                style={{ marginTop: `${(i % 2) * 4}px` }}
              />
            ))}
          </div>
          {/* sprinkles */}
          {[
            { l: '18%', t: '30%', c: '#FFF8EF' },
            { l: '38%', t: '55%', c: '#DCD5F5' },
            { l: '60%', t: '32%', c: '#FFF8EF' },
            { l: '78%', t: '58%', c: '#DCD5F5' },
            { l: '28%', t: '70%', c: '#FFF8EF' },
          ].map((s, i) => (
            <div
              key={i}
              className="absolute h-1.5 w-3 rounded-full"
              style={{ left: s.l, top: s.t, backgroundColor: s.c, transform: `rotate(${i * 30}deg)` }}
            />
          ))}
        </div>

        {/* bottom tier */}
        <div className="relative w-56 h-20 -mt-1 rounded-t-lg rounded-b-xl bg-gradient-to-b from-blush to-lavender shadow-card">
          {/* frosting drips */}
          <div className="absolute -top-1 left-0 right-0 flex justify-around px-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-3.5 h-3.5 rounded-full bg-cream"
                style={{ marginTop: `${(i % 2) * 3}px` }}
              />
            ))}
          </div>
          {/* decorative dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-around px-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-2 w-2 rounded-full bg-rose/60" />
            ))}
          </div>
        </div>

        {/* plate */}
        <div className="h-2 w-64 -ml-4 rounded-full bg-ink/15 shadow-soft" />
      </div>

      {/* Blow hint */}
      <AnimatePresence>
        {showHint && lit && (
          <motion.button
            type="button"
            onClick={onBlowOut}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2 text-sm font-medium text-ink shadow-card backdrop-blur"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Wind className="h-4 w-4 text-rose" />
            Tap to make a wish &amp; blow out the candles
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function Candle({ lit, delay }: { lit: boolean; delay: number }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* flame */}
      <AnimatePresence>
        {lit && (
          <motion.div
            className="relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay }}
          >
            {/* glow */}
            <div className="absolute -inset-3 rounded-full bg-amber-300/40 blur-md" />
            {/* flame body */}
            <motion.div
              className="relative h-4 w-2.5 rounded-full"
              style={{
                background: 'radial-gradient(circle at 50% 80%, #FFE08A 0%, #FFB347 60%, #FF8C42 100%)',
              }}
              animate={{ scaleY: [1, 1.15, 0.95, 1.1, 1], scaleX: [1, 0.95, 1.05, 0.97, 1] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* smoke when out */}
      <AnimatePresence>
        {!lit && (
          <motion.div
            className="h-6 w-1 rounded-full bg-ink/15"
            initial={{ opacity: 0.5, y: 0 }}
            animate={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2 }}
          />
        )}
      </AnimatePresence>

      {/* wick */}
      <div className="h-1 w-0.5 bg-ink/40" />
      {/* candle stick */}
      <div className="h-10 w-2 rounded-sm bg-gradient-to-b from-rose to-rose-dark" />
    </div>
  );
}
