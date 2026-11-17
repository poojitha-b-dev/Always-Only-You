import { useMemo } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

interface FloatingHeartsProps {
  count?: number;
  className?: string;
}

/** Softly rising hearts that drift up the screen on a loop. */
export function FloatingHearts({ count = 14, className = '' }: FloatingHeartsProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 18,
        delay: Math.random() * 8,
        duration: 9 + Math.random() * 8,
        opacity: 0.25 + Math.random() * 0.45,
        hue: Math.random() > 0.5 ? 'text-rose/40' : 'text-rose-light/40',
      })),
    [count],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className={`absolute bottom-[-40px] ${h.hue} animate-floatUp`}
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            opacity: h.opacity,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
          fill="currentColor"
        />
      ))}
    </div>
  );
}

/** Twinkling little stars + sparkles scattered across the background. */
export function SparkleField({ count = 18, className = '' }: FloatingHeartsProps) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 8 + Math.random() * 10,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
        Icon: Math.random() > 0.5 ? Star : Sparkles,
      })),
    [count],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {sparkles.map((s) => {
        const Icon = s.Icon;
        return (
          <Icon
            key={s.id}
            className="absolute text-rose-light/60 animate-twinkle"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}
