import { useState, useCallback } from 'react';

interface Heart {
  id: number;
  left: number;
  emoji: string;
}

export function useHeartBurst() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const burst = useCallback((count = 12) => {
    const newHearts: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      left: 20 + Math.random() * 60,
      emoji: ['❤️', '💕', '💖', '💗', '💓', '💘'][Math.floor(Math.random() * 6)],
    }));
    setHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.includes(h)));
    }, 2500);
  }, []);

  const clear = useCallback(() => setHearts([]), []);

  return { hearts, burst, clear };
}

export function HeartBurst({ hearts }: { hearts: Heart[] }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-0 animate-float-up text-3xl"
          style={{ left: `${h.left}%` }}
        >
          {h.emoji}
        </div>
      ))}
    </div>
  );
}
