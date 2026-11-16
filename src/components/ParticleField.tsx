import { useMemo } from 'react';

interface ParticleFieldProps {
  count?: number;
  type?: 'hearts' | 'stars' | 'mixed';
  className?: string;
}

export default function ParticleField({ count = 15, type = 'mixed', className = '' }: ParticleFieldProps) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = 3 + Math.random() * 4;
      const size = 0.6 + Math.random() * 1.4;
      const isHeart = type === 'hearts' ? true : type === 'stars' ? false : Math.random() > 0.5;
      return { id: i, left, top, delay, duration, size, isHeart };
    });
  }, [count, type]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-gentle-float"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.size}rem`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: 0.5,
          }}
        >
          {p.isHeart ? '♥' : '✦'}
        </div>
      ))}
    </div>
  );
}
