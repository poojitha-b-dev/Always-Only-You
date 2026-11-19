import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData, LOVE_MESSAGES } from '@/siteData';
import ParticleField from '@/components/ParticleField';

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

export default function ThingsILove() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [opened, setOpened] = useState<Set<string>>(new Set());

  // Single active popup state and message queue for background secrets
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

  // Universal dismissal for background popup
  useEffect(() => {
    if (!activePopup) return;
    const handleClosePopup = () => setActivePopup(null);
    window.addEventListener('click', handleClosePopup);
    window.addEventListener('touchstart', handleClosePopup);
    window.addEventListener('keydown', handleClosePopup);
    window.addEventListener('scroll', handleClosePopup);
    return () => {
      window.removeEventListener('click', handleClosePopup);
      window.removeEventListener('touchstart', handleClosePopup);
      window.removeEventListener('keydown', handleClosePopup);
      window.removeEventListener('scroll', handleClosePopup);
    };
  }, [activePopup]);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    setOpened((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-cream-50 to-blush-50 pt-24 pb-24 px-4 relative overflow-x-hidden">
      <ParticleField count={12} type="hearts" />

      {/* Scattered Real Secret Spots safely locked in outer side margins */}
      {[
        { id: 'til-1', symbol: '♥', style: { top: '15%', left: '6%' } },
        { id: 'til-2', symbol: '♦', style: { top: '35%', right: '6%' } },
        { id: 'til-3', symbol: '✨', style: { top: '65%', left: '5%' } },
        { id: 'til-4', symbol: '♥', style: { top: '85%', right: '6%' } },
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

      <div className="relative max-w-3xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3 animate-gentle-float">✨</div>
          <h1 className="font-hand text-4xl sm:text-6xl text-lavender-900 mb-3 tracking-wide">
            Things I Love About You
          </h1>
          <p className="text-lavender-700 text-sm sm:text-base max-w-md mx-auto font-sans">
            Little reminders of why you're my favorite person in the world.
          </p>
        </div>

        {/* Emoji Progress Lights (Instead of boring stats) */}
        <div className="mb-8 flex flex-wrap justify-center items-center gap-2 max-w-md mx-auto px-4">
          {siteData.thingsILove.map((item, idx) => {
            const isOpened = opened.has(item.id);
            return (
              <div
                key={item.id}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpened
                    ? 'bg-blush-400 text-white scale-110 shadow-sm'
                    : 'bg-blush-100/60 text-blush-300'
                }`}
                title={`Reason ${idx + 1}`}
              >
                <Heart size={12} fill={isOpened ? 'currentColor' : 'none'} />
              </div>
            );
          })}
        </div>

        {/* Cards */}
        <div className="space-y-3">
          {siteData.thingsILove.map((item, idx) => {
            const isExpanded = expandedId === item.id;
            const isOpened = opened.has(item.id);
            return (
              <div
                key={item.id}
                className="glass-card rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => handleToggle(item.id)}
                  className="w-full p-4 sm:p-5 flex items-center gap-4 text-left transition-colors hover:bg-white/40"
                >
                  <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpened
                      ? 'bg-gradient-to-br from-cream-300 to-peach-400 text-white'
                      : 'bg-blush-100 text-blush-400'
                  }`}>
                    {isOpened ? <Heart size={16} fill="currentColor" /> : <span className="text-xs sm:text-sm font-sans font-bold">{idx + 1}</span>}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans font-medium text-sm sm:text-base text-lavender-900">{item.title}</h3>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-lavender-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Smooth top-to-bottom expansion animation */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-5 pb-5 pt-1">
                        <div className="note-paper rounded-xl p-5 shadow-inner">
                          <p className="font-hand text-xl sm:text-2xl text-lavender-800 leading-relaxed tracking-wide">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Custom sign-off */}
        <div className="mt-8 glass-card rounded-2xl p-6 text-center shadow-sm">
          <p className="font-hand text-2xl sm:text-3xl text-blush-600 mb-1">
            I love you, baby
          </p>
          <p className="font-sans text-sm font-medium text-lavender-700">
            — Pooja
          </p>
        </div>
      </div>

      {/* Single Active Popup for Background Secrets */}
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