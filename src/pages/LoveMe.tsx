import { useState, useEffect, useRef } from 'react';
import { Heart, RotateCcw, Sparkles, Gift } from 'lucide-react';
import ParticleField from '@/components/ParticleField';
import { useHeartBurst, HeartBurst } from '@/components/HeartBurst';

const STICKERS = {
  start: '/stickers/b1.gif',
  no: [
    '/stickers/1.gif',
    '/stickers/2.gif',
    '/stickers/3.gif',
    '/stickers/a2.gif',
    '/stickers/5.gif',
    '/stickers/6.gif',
    '/stickers/7.gif',
  ],
  yes: [
    '/stickers/8.gif',
    '/stickers/9.gif',
    '/stickers/10.gif',
    '/stickers/11.gif',
    '/stickers/12.gif',
    '/stickers/13.gif',
    '/stickers/14.gif',
  ],
  kissCelebration: '/stickers/17.gif',
};

const NO_STAGES = [
  {
    message: 'Wait... really? 🥺',
    yesLabel: 'Yes, of course! ♥',
    noLabel: 'No',
  },
  {
    message: 'Ouch, that actually hurt a little.',
    yesLabel: 'Okay, yes I do!',
    noLabel: 'Still no',
  },
  {
    message: 'Are you sure? Think about me for a second.',
    yesLabel: 'Yes, my love 💕',
    noLabel: 'No way',
  },
  {
    message: "Now I'm actually sad, baby... 😢",
    yesLabel: 'Yes, I love you!',
    noLabel: 'Nope',
  },
  {
    message: 'What if I promise you extra hugs later?',
    yesLabel: 'Deal! Yes! 💋',
    noLabel: 'Never',
  },
  {
    message: "Please don't break my heart like this...",
    yesLabel: 'YES! ♥',
    noLabel: 'No...',
  },
  {
    message: "Okay, I'm hiding the No button now. Just say yes, baby 😘",
    yesLabel: 'YES, I LOVE YOU! 💋♥',
    noLabel: '',
  },
];

const YES_STAGES = [
  'Aww, tap it again if you really mean it.',
  "Okay stop, now I'm smiling like an idiot.",
  "Three times? You're making me blush, baby.",
  'I love you more, you know that right?',
  "Keep going, you're almost at your surprise...",
  'Just one more tap...',
  'Finally! Come get your kiss next time I see you 💋',
];

interface PouringKiss {
  id: number;
  left: number;
  emoji: string;
  size: number;
  duration: number;
  delay: number;
}

// Plays any GIF continuously at original normal speed with zero gap between loops
function SlowSticker({
  src,
  alt,
  speedMultiplier = 1.0,
  className = '',
}: {
  src: string;
  alt: string;
  speedMultiplier?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fallbackToImg, setFallbackToImg] = useState(false);

  useEffect(() => {
    setFallbackToImg(false);
    let cancelled = false;
    let timerId: number | undefined;

    const isGif = src.toLowerCase().endsWith('.gif');
    if (!isGif || typeof (window as unknown as { ImageDecoder?: unknown }).ImageDecoder === 'undefined') {
      setFallbackToImg(true);
      return;
    }

    async function decodeAndPlay() {
      try {
        const response = await fetch(src);
        if (!response.ok || !response.body) {
          if (!cancelled) setFallbackToImg(true);
          return;
        }

        const ImageDecoderCtor = (window as unknown as {
          ImageDecoder: new (init: { data: ReadableStream<Uint8Array>; type: string }) => {
            tracks: { ready: Promise<void>; selectedTrack?: { frameCount: number } };
            decode: (opts: { frameIndex: number }) => Promise<{
              image: VideoFrame;
              complete: boolean;
            }>;
            close: () => void;
          };
        }).ImageDecoder;

        const decoder = new ImageDecoderCtor({
          data: response.body,
          type: 'image/gif',
        });

        await decoder.tracks.ready;
        const frameCount = decoder.tracks.selectedTrack?.frameCount ?? 1;

        if (frameCount <= 1) {
          decoder.close();
          if (!cancelled) setFallbackToImg(true);
          return;
        }

        const frames: { bitmap: ImageBitmap; durationMs: number }[] = [];
        for (let i = 0; i < frameCount; i++) {
          if (cancelled) break;
          const result = await decoder.decode({ frameIndex: i });
          const bitmap = await createImageBitmap(result.image);
          const rawMs = result.image.duration ? result.image.duration / 1000 : 100;
          result.image.close();
          frames.push({ bitmap, durationMs: Math.max(40, rawMs) });
        }
        decoder.close();

        if (cancelled || frames.length === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = frames[0].bitmap.width;
        canvas.height = frames[0].bitmap.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let index = 0;
        const drawNext = () => {
          if (cancelled) return;
          const frame = frames[index];
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(frame.bitmap, 0, 0);

          const slowedDelay = frame.durationMs / speedMultiplier;

          index = (index + 1) % frames.length;
          timerId = window.setTimeout(drawNext, slowedDelay);
        };

        drawNext();
      } catch {
        if (!cancelled) setFallbackToImg(true);
      }
    }

    decodeAndPlay();

    return () => {
      cancelled = true;
      if (timerId) window.clearTimeout(timerId);
    };
  }, [src, speedMultiplier]);

  if (fallbackToImg) {
    return <img src={src} alt={alt} className={className} />;
  }

  return <canvas ref={canvasRef} aria-label={alt} className={className} />;
}

export default function LoveMe() {
  const [noCount, setNoCount] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [lastAction, setLastAction] = useState<'none' | 'yes' | 'no'>('none');
  const [showGift, setShowGift] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [pouringKisses, setPouringKisses] = useState<PouringKiss[]>([]);
  const { hearts, burst } = useHeartBurst();

  const pourKissesFromGift = () => {
    const emojis = ['💋', '😘', '💋', '💕', '💋', '💖', '💋', '🥰'];
    const items: PouringKiss[] = Array.from({ length: 36 }, (_, i) => ({
      id: Date.now() + i,
      left: 8 + Math.random() * 84,
      emoji: emojis[i % emojis.length],
      size: 22 + Math.floor(Math.random() * 18),
      duration: 4.2 + Math.random() * 2.2,
      delay: Math.random() * 1.6,
    }));
    setPouringKisses(items);
    burst(30);
  };

  const handleYes = () => {
    const nextYes = Math.min(yesCount + 1, 7);
    setYesCount(nextYes);
    setLastAction('yes');
    setCurrentMessage(YES_STAGES[nextYes - 1]);
    burst(nextYes >= 7 ? 24 : 10);

    if (nextYes >= 7) {
      setShowGift(true);
    }
  };

  const handleOpenGift = () => {
    setGiftOpened(true);
    pourKissesFromGift();
  };

  const handleNo = () => {
    if (noCount >= 7) return;
    const nextNo = noCount + 1;
    setNoCount(nextNo);
    setYesCount(0);
    setLastAction('no');
    setCurrentMessage(NO_STAGES[nextNo - 1].message);
  };

  const handleReset = () => {
    setNoCount(0);
    setYesCount(0);
    setLastAction('none');
    setShowGift(false);
    setGiftOpened(false);
    setCurrentMessage('');
    setPouringKisses([]);
  };

  const activeSticker = giftOpened
    ? STICKERS.kissCelebration
    : lastAction === 'yes'
      ? STICKERS.yes[Math.max(0, yesCount - 1)]
      : lastAction === 'no'
        ? STICKERS.no[Math.max(0, noCount - 1)]
        : STICKERS.start;

  const isNoBroken = noCount >= 7;
  const activeYesLabel =
    yesCount > 0 && !showGift
      ? `YES! (${yesCount}/7) ♥`
      : noCount > 0
        ? NO_STAGES[noCount - 1].yesLabel
        : 'YES ♥';

  const activeNoLabel = noCount > 0 && noCount < 7 ? NO_STAGES[noCount - 1].noLabel : 'No';
  const yesScale = 1 + Math.min(noCount, 6) * 0.08 + Math.min(yesCount, 6) * 0.04;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-100 via-cream-100 to-lavender-100 pt-24 pb-24 px-4 overflow-hidden relative">
      <style>{`
        @keyframes kissPour {
          0% {
            transform: translateY(0) scale(0.5) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(-75vh) scale(1.2) rotate(20deg);
            opacity: 0;
          }
        }
        .animate-kiss-pour {
          animation-name: kissPour;
          animation-timing-function: ease-out;
          animation-iteration-count: infinite;
        }
      `}</style>

      <ParticleField count={12} type="hearts" />
      <HeartBurst hearts={hearts} />

      {giftOpened && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {pouringKisses.map((kiss) => (
            <span
              key={kiss.id}
              className="absolute bottom-24 animate-kiss-pour select-none"
              style={{
                left: `${kiss.left}%`,
                fontSize: `${kiss.size}px`,
                animationDuration: `${kiss.duration}s`,
                animationDelay: `${kiss.delay}s`,
              }}
            >
              {kiss.emoji}
            </span>
          ))}
        </div>
      )}

      <div className="relative max-w-lg mx-auto">
        <div className="text-center mb-4 animate-fade-in-up">
          <h1 className="font-hand text-4xl sm:text-5xl gradient-text mb-1.5">
            Do you love me, baby?
          </h1>
        </div>

        {/* Sticker Frame at Original Normal Speed */}
        <div className="flex justify-center mb-4">
          <div className="bg-white/90 p-2.5 rounded-3xl shadow-lg border-2 border-blush-200/80 transition-all duration-300">
            <SlowSticker
              key={activeSticker}
              src={activeSticker}
              alt="Reaction"
              speedMultiplier={1.0}
              className="w-32 h-32 sm:w-36 sm:h-36 object-contain rounded-2xl"
            />
          </div>
        </div>

        {currentMessage && !giftOpened && (
          <div
            className="glass-card rounded-2xl px-4 py-2.5 mb-5 max-w-xs mx-auto text-center shadow-sm border border-blush-200/70 transition-all duration-300"
            key={currentMessage}
          >
            <p className="font-hand text-base sm:text-lg text-blush-700 leading-snug">
              {currentMessage}
            </p>
          </div>
        )}

        {!showGift && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-5 flex-wrap min-h-[80px]">
              <button
                onClick={handleYes}
                style={{ transform: `scale(${yesScale})` }}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-blush-400 to-mutedRed-400 text-white text-lg font-bold shadow-lg hover:shadow-2xl transition-all duration-300 z-10"
              >
                <span className="flex items-center gap-2">
                  <Heart size={20} fill="currentColor" />
                  {activeYesLabel}
                </span>
              </button>

              {!isNoBroken && (
                <button
                  onClick={handleNo}
                  className="px-5 py-2.5 rounded-full bg-lavender-200 text-lavender-700 text-sm font-bold shadow hover:bg-lavender-300 transition-all duration-200 z-20"
                  style={{
                    transform:
                      noCount > 0
                        ? `translate(${18 + noCount * 8}px, ${(noCount % 2 === 0 ? 1 : -1) * 14}px) scale(${Math.max(0.7, 1 - noCount * 0.04)})`
                        : 'none',
                    opacity: Math.max(0.55, 1 - noCount * 0.06),
                  }}
                >
                  {activeNoLabel}
                </button>
              )}
            </div>

            {noCount > 0 && !isNoBroken && (
              <p className="text-xs text-lavender-500">
                {noCount} / 7 🥺
              </p>
            )}
            {yesCount > 0 && yesCount < 7 && (
              <p className="text-xs text-blush-500 font-medium">
                {yesCount} / 7 — keep tapping YES 💕
              </p>
            )}
          </div>
        )}

        {showGift && !giftOpened && (
          <div className="text-center mt-2">
            <button
              onClick={handleOpenGift}
              className="group relative inline-flex flex-col items-center justify-center bg-white/95 border-2 border-blush-300 rounded-3xl px-7 py-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="text-6xl sm:text-7xl mb-2 transition-transform duration-300 group-hover:scale-110">
                🎁
              </div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blush-400 to-mutedRed-400 text-white text-sm font-semibold shadow">
                <Gift size={15} />
                Tap to open your gift
              </span>
            </button>
          </div>
        )}

        {giftOpened && (
          <div className="text-center space-y-4 max-w-xs sm:max-w-sm mx-auto">
            <div className="bg-white/95 border-2 border-blush-300 rounded-3xl p-5 shadow-xl">
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-blush-100 text-blush-600 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
                <Sparkles size={12} />
                Gift Opened
              </div>
              <h2 className="font-hand text-2xl sm:text-3xl gradient-text mb-2">
                A Million Kisses For You! 💋
              </h2>
              <div className="note-paper rounded-2xl p-3.5 my-2">
                <p className="font-hand text-sm sm:text-base text-lavender-800 leading-relaxed">
                  🎟️ <strong>Kiss Voucher:</strong> Redeemable for one big, real-life kiss from
                  Pooja next time we meet! ♥
                </p>
              </div>
              <button
                onClick={pourKissesFromGift}
                className="mt-2 px-4 py-1.5 rounded-full bg-blush-100 hover:bg-blush-200 text-blush-600 text-xs font-semibold transition-colors"
              >
                Pour more kisses 💋
              </button>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/85 text-lavender-600 text-xs font-medium shadow hover:shadow-md transition-all hover:scale-105"
            >
              <RotateCcw size={14} />
              Ask me again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}