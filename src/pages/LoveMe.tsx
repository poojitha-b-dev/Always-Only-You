import { useState, useEffect, useRef } from 'react';
import { Heart, RotateCcw, Sparkles, Gift } from 'lucide-react';
import ParticleField from '@/components/ParticleField';
import { useHeartBurst, HeartBurst } from '@/components/HeartBurst';
import { siteData, LOVE_MESSAGES } from '@/siteData';

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
  kissCelebration: '/stickers/15.gif',
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

// Fake/dummy decoy component that wiggles on click without opening a popup
function FakeDecoySecret({ symbol = "✨", style }: { symbol?: string; style?: React.CSSProperties }) {
  const [wiggled, setWiggled] = useState(false);

  const handleFakeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWiggled(true);
    setTimeout(() => setWiggled(false), 600);
  };

  return (
    <div className="absolute z-10 pointer-events-auto" style={style}>
      <span
        onClick={handleFakeClick}
        className={`cursor-pointer inline-block text-xs sm:text-sm text-stone-400 opacity-60 hover:opacity-100 transition-transform duration-300 select-none p-2 ${
          wiggled ? "scale-150 rotate-12 text-blush-500" : ""
        }`}
        title="Just a little sparkle~"
      >
        {symbol}
      </span>
    </div>
  );
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

  // Single active popup state and message queue state for background secrets
  const [activePopup, setActivePopup] = useState<{
    id: string;
    message: string;
    style: React.CSSProperties;
  } | null>(null);
  const [messageQueue, setMessageQueue] = useState<string[]>([]);
  const elementRefs = useRef<Record<string, HTMLDivElement | HTMLSpanElement | null>>({});

  const getNextUniqueMessage = () => {
    let queue = [...messageQueue];
    if (queue.length === 0) {
      queue = [...LOVE_MESSAGES];
      for (let i = queue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [queue[i], queue[j]] = [queue[j], queue[i]];
      }
    }
    const nextMsg = queue.pop()!;
    setMessageQueue(queue);
    return nextMsg;
  };

  const handleReveal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (activePopup?.id === id) {
      setActivePopup(null);
      return;
    }

    const el = elementRefs.current[id];
    const popupWidth = 280;
    const popupHeight = 160;
    const navBarLimit = 95;
    const footerLimit = window.innerHeight - 95;

    let leftPos = window.innerWidth / 2 - popupWidth / 2;
    let topPos = 120;

    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.left > window.innerWidth / 2) {
        leftPos = rect.left - popupWidth - 12;
      } else {
        leftPos = rect.right + 12;
      }

      if (leftPos < 16) leftPos = 16;
      if (leftPos + popupWidth > window.innerWidth - 16) {
        leftPos = window.innerWidth - popupWidth - 16;
      }

      topPos = rect.top + rect.height / 2 - popupHeight / 2;
      if (topPos < navBarLimit) topPos = navBarLimit + 10;
      if (topPos + popupHeight > footerLimit) topPos = footerLimit - popupHeight - 10;
    }

    const nextMsg = getNextUniqueMessage();

    setActivePopup({
      id,
      message: nextMsg,
      style: {
        position: 'fixed',
        left: `${leftPos}px`,
        top: `${topPos}px`,
        width: `${popupWidth}px`,
        zIndex: 99999,
      },
    });
  };

  // Universal dismissal on keypress or click outside
  useEffect(() => {
    if (!activePopup) return;
    const handleClose = () => setActivePopup(null);
    window.addEventListener('click', handleClose);
    window.addEventListener('touchstart', handleClose);
    window.addEventListener('keydown', handleClose);
    window.addEventListener('scroll', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
      window.removeEventListener('touchstart', handleClose);
      window.removeEventListener('keydown', handleClose);
      window.removeEventListener('scroll', handleClose);
    };
  }, [activePopup]);

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
    <div className="min-h-screen bg-gradient-to-br from-blush-100 via-cream-100 to-lavender-100 pt-24 pb-24 px-4 overflow-x-hidden relative">
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

      {/* Scattered Real Secret Spots safely locked in outer side margins */}
      {[
        { id: 'love-1', symbol: '♥', style: { top: '15%', left: '6%' } },
        { id: 'love-2', symbol: '♦', style: { top: '35%', right: '6%' } },
        { id: 'love-3', symbol: '✨', style: { top: '65%', left: '5%' } },
        { id: 'love-4', symbol: '♥', style: { top: '85%', right: '6%' } },
      ].map((item) => (
        <div
          key={item.id}
          ref={(el) => (elementRefs.current[item.id] = el)}
          className="absolute z-10 pointer-events-auto"
          style={item.style}
        >
          <span
            onClick={(e) => handleReveal(item.id, e)}
            className="cursor-pointer inline-block text-xs sm:text-sm text-stone-400 hover:text-blush-500 opacity-60 hover:opacity-100 transition-all select-none p-2"
          >
            {item.symbol}
          </span>
        </div>
      ))}

      {/* Scattered Dummy / Decoy Icons */}
      <FakeDecoySecret symbol="✨" style={{ top: '22%', left: '14%' }} />
      <FakeDecoySecret symbol="♥" style={{ top: '45%', right: '14%' }} />
      <FakeDecoySecret symbol="♦" style={{ top: '75%', left: '12%' }} />

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

      {/* Single Active Popup with updated footer style */}
      {activePopup && (
        <div 
          onClick={(e) => e.stopPropagation()}
          style={activePopup.style}
          className="bg-[#fff0f3] border-2 border-[#ffccd5] p-4 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.3)] text-left font-sans text-xs sm:text-sm text-[#4a3538] animate-fade-in pointer-events-auto"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-[#d96b83] font-hand text-base">
              ✨ Secret note
            </span>
            <button 
              onClick={() => setActivePopup(null)}
              className="text-stone-400 hover:text-stone-600 text-base font-bold px-1.5"
            >
              ×
            </button>
          </div>
          <p className="m-0 leading-relaxed font-serif text-xs sm:text-sm">
            "{activePopup.message}"
          </p>
          <div className="flex justify-between items-center mt-3 pt-1">
            <span className="text-[10px] text-stone-400 italic">
              (Press any key to close)
            </span>
            <span className="font-hand text-xs text-[#d96b83] font-medium">
              - I love you
            </span>
          </div>
        </div>
      )}
    </div>
  );
}