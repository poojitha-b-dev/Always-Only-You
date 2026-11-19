import { useState, useEffect, useCallback, useRef } from 'react';
import { Sparkles, X } from 'lucide-react';
import { siteData, LOVE_MESSAGES } from '@/siteData';
import ParticleField from '@/components/ParticleField';
import type { OpenWhenCategory } from '@/types';

const STORAGE_KEY = 'open-when-message-history';

interface CategoryHistory {
  shuffled: number[];
  shown: number[];
}

type History = Record<string, CategoryHistory>;

function loadHistory(): History {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore corrupt storage
  }
  return {};
}

function saveHistory(history: History) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // ignore storage errors
  }
}

function shuffleArray(arr: number[]): number[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
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

export default function OpenWhen() {
  const [, setHistory] = useState<History>({});
  const [openCategory, setOpenCategory] = useState<OpenWhenCategory | null>(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [noteVisible, setNoteVisible] = useState(false);

  // Single active popup state and message queue for background secrets
  const [activePopup, setActivePopup] = useState<{
    id: string;
    message: string;
    style: React.CSSProperties;
  } | null>(null);
  const [messageQueue, setMessageQueue] = useState<string[]>([]);
  const elementRefs = useRef<Record<string, HTMLDivElement | HTMLSpanElement | null>>({});

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

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

  const getNextMessage = useCallback((category: OpenWhenCategory) => {
    setHistory((prevHistory) => {
      const updated = { ...prevHistory };
      let entry = updated[category.id];

      if (!entry || entry.shuffled.length === 0) {
        const allIndices = Array.from({ length: category.messages.length }, (_, i) => i);
        entry = {
          shuffled: shuffleArray(allIndices),
          shown: [],
        };
      }

      const idx = entry.shuffled[0];
      const remaining = entry.shuffled.slice(1);
      const newShown = [...entry.shown, idx];

      updated[category.id] = {
        shuffled: remaining,
        shown: newShown,
      };

      saveHistory(updated);
      setCurrentMessage(category.messages[idx]);
      return updated;
    });
  }, []);

  const handleOpenEnvelope = (category: OpenWhenCategory) => {
    setOpenCategory(category);
    setNoteVisible(false);
    getNextMessage(category);

    requestAnimationFrame(() => {
      setTimeout(() => {
        setNoteVisible(true);
      }, 60);
    });
  };

  const handleNextMessage = () => {
    if (!openCategory || !noteVisible) return;
    setNoteVisible(false);
    setTimeout(() => {
      getNextMessage(openCategory);
      setNoteVisible(true);
    }, 320);
  };

  const handleClose = () => {
    setNoteVisible(false);
    setOpenCategory(null);
    setCurrentMessage('');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-100 via-blush-50 to-cream-100 pt-24 pb-24 px-4 relative overflow-x-hidden">
      <ParticleField count={12} type="hearts" />

      {/* Scattered Real Secret Spots safely locked in outer side margins */}
      {[
        { id: 'ow-1', symbol: '♥', style: { top: '15%', left: '6%' } },
        { id: 'ow-2', symbol: '♦', style: { top: '35%', right: '6%' } },
        { id: 'ow-3', symbol: '✨', style: { top: '65%', left: '5%' } },
        { id: 'ow-4', symbol: '♥', style: { top: '85%', right: '6%' } },
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

      <div className="relative max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="text-5xl mb-3 animate-gentle-float">💌</div>
          <h1 className="font-hand text-4xl sm:text-6xl gradient-text mb-3">Open When...</h1>
          <p className="text-lavender-600 text-sm sm:text-base max-w-md mx-auto">
            Little envelopes for whenever you need me. Each one has something different inside —
            open one and see.
          </p>
        </div>

        {/* Envelope Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {siteData.openWhenCategories.map((category, idx) => (
            <button
              key={category.id}
              onClick={() => handleOpenEnvelope(category)}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="glass-card rounded-3xl p-6 text-left hover-lift overflow-hidden relative">
                {/* Envelope visual */}
                <div className="flex items-center gap-4">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}
                  >
                    {category.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-hand text-2xl text-lavender-800">{category.label}</h3>
                  </div>
                  <div className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    ✉️
                  </div>
                </div>

                {/* Decorative envelope icon */}
                <div className="absolute -bottom-2 -right-2 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
                  ✉️
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Envelope Modal */}
      {openCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            {/* Envelope Container */}
            <div className="relative bg-gradient-to-br from-blush-300 to-blush-500 rounded-2xl shadow-2xl overflow-hidden p-6 min-h-[220px] flex items-center justify-center">
              {/* Zoom-out / Zoom-in Note Card */}
              <div
                className={`note-paper w-full rounded-xl p-6 transition-all duration-300 ease-out transform ${
                  noteVisible
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-75 pointer-events-none'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{openCategory.emoji}</span>
                  <span className="font-hand text-lg text-blush-600">{openCategory.label}</span>
                </div>
                <p className="font-hand text-xl text-lavender-800 leading-relaxed">
                  {currentMessage}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleNextMessage}
                disabled={!noteVisible}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/95 text-blush-600 font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:scale-100"
              >
                <Sparkles size={16} />
                Pick Another Note
              </button>
            </div>
          </div>
        </div>
      )}

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