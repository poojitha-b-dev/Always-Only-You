import { useState } from 'react';
import { ChevronDown, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData } from '@/siteData';
import ParticleField from '@/components/ParticleField';

export default function ThingsILove() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [opened, setOpened] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    setOpened((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-cream-50 to-blush-50 pt-24 pb-24 px-4">
      <ParticleField count={12} type="hearts" />

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
    </div>
  );
}