import { useState, useEffect, useCallback } from 'react';
import { Shuffle, RefreshCw, X } from 'lucide-react';
import { siteData } from '@/siteData';
import ParticleField from '@/components/ParticleField';
import type { OpenWhenCategory } from '@/types';

const STORAGE_KEY = 'open-when-message-history';

interface CategoryHistory {
  shuffled: number[]; // remaining indices
  shown: number[];    // shown indices (for reshuffle)
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

function getOrCreateShuffled(category: OpenWhenCategory, history: History): number[] {
  const existing = history[category.id];
  if (existing && existing.shuffled.length > 0) {
    return existing.shuffled;
  }
  // Create fresh shuffle of all indices
  const allIndices = Array.from({ length: category.messages.length }, (_, i) => i);
  return shuffleArray(allIndices);
}

export default function OpenWhen() {
  const [history, setHistory] = useState<History>({});
  const [openCategory, setOpenCategory] = useState<OpenWhenCategory | null>(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const getNextMessage = useCallback((category: OpenWhenCategory) => {
    setHistory((prevHistory) => {
      const updated = { ...prevHistory };
      let entry = updated[category.id];

      if (!entry || entry.shuffled.length === 0) {
        // Reshuffle: combine shown + new full set if exhausted
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
    setEnvelopeOpen(false);
    // Animate envelope opening, then reveal message
    setTimeout(() => {
      setEnvelopeOpen(true);
      getNextMessage(category);
    }, 100);
  };

  const handleNextMessage = () => {
    if (openCategory) {
      setEnvelopeOpen(false);
      setTimeout(() => {
        setEnvelopeOpen(true);
        getNextMessage(openCategory);
      }, 400);
    }
  };

  const handleClose = () => {
    setOpenCategory(null);
    setEnvelopeOpen(false);
    setCurrentMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-100 via-blush-50 to-cream-100 pt-24 pb-24 px-4">
      <ParticleField count={12} type="hearts" />

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
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                    {category.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-hand text-2xl text-lavender-800 mb-1">{category.label}</h3>
                    <p className="text-xs text-lavender-500">
                      {category.messages.length} messages inside · opens randomly
                    </p>
                  </div>
                  <div className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    ✉️
                  </div>
                </div>

                {/* Decorative envelope flap */}
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
            className="relative w-full max-w-md animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            {/* Envelope */}
            <div className="relative bg-gradient-to-br from-blush-300 to-blush-500 rounded-2xl shadow-2xl overflow-hidden">
              {/* Envelope flap */}
              <div
                className="relative h-0 transition-all duration-700"
                style={{
                  borderBottom: envelopeOpen ? '0 solid transparent' : '40px solid #ff7aa9',
                  borderLeft: '50% solid transparent',
                  borderRight: '50% solid transparent',
                  transform: envelopeOpen ? 'rotateX(180deg) translateY(-40px)' : 'none',
                  transformOrigin: 'top',
                  transition: 'transform 0.7s ease-in-out',
                }}
              />

              {/* Envelope body */}
              <div className="p-6 min-h-[200px]">
                {/* Letter inside */}
                <div
                  className={`note-paper rounded-xl p-6 transition-all duration-500 ${
                    envelopeOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{
                    transform: envelopeOpen ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.5s ease-out 0.3s',
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{openCategory.emoji}</span>
                    <span className="font-hand text-lg text-blush-600">{openCategory.label}</span>
                  </div>
                  <p className="font-hand text-xl text-lavender-800 leading-relaxed">
                    {currentMessage}
                  </p>
                </div>

                {/* Closed state hint */}
                {!envelopeOpen && (
                  <div className="text-center text-white/80 py-8">
                    <div className="text-4xl mb-2">✉️</div>
                    <p className="font-hand text-xl">Opening your letter...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Next message button */}
            {envelopeOpen && (
              <div className="mt-4 flex justify-center gap-3 animate-fade-in">
                <button
                  onClick={handleNextMessage}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 text-blush-600 font-medium shadow hover:shadow-lg transition-all hover:scale-105"
                >
                  <RefreshCw size={16} />
                  Reveal another
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
