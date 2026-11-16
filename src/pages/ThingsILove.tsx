import { useState } from 'react';
import { ChevronDown, Star } from 'lucide-react';
import { siteData } from '@/siteData';
import ParticleField from '@/components/ParticleField';

export default function ThingsILove() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [discovered, setDiscovered] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    setDiscovered((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const allDiscovered = discovered.size === siteData.thingsILove.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-cream-50 to-blush-50 pt-24 pb-24 px-4">
      <ParticleField count={12} type="hearts" />

      <div className="relative max-w-3xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="text-5xl mb-3 animate-gentle-float">⭐</div>
          <h1 className="font-hand text-4xl sm:text-6xl gradient-text mb-3">
            Things I Love About You
          </h1>
          <p className="text-lavender-600 text-sm sm:text-base max-w-md mx-auto">
            Tap each card to uncover a reason. There are {siteData.thingsILove.length} of them.
            And that is just the beginning.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8 max-w-sm mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-lavender-500">Discovered</span>
            <span className="text-xs font-medium text-blush-600">
              {discovered.size} / {siteData.thingsILove.length}
            </span>
          </div>
          <div className="h-2 rounded-full bg-blush-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blush-400 to-lavender-500 rounded-full transition-all duration-500"
              style={{ width: `${(discovered.size / siteData.thingsILove.length) * 100}%` }}
            />
          </div>
          {allDiscovered && (
            <p className="text-center mt-3 font-hand text-lg text-blush-600 animate-fade-in">
              You found them all! And I have even more reasons... ♥
            </p>
          )}
        </div>

        {/* Cards */}
        <div className="space-y-3">
          {siteData.thingsILove.map((item, idx) => {
            const isExpanded = expandedId === item.id;
            const isDiscovered = discovered.has(item.id);
            return (
              <div
                key={item.id}
                className="glass-card rounded-2xl overflow-hidden hover-lift animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <button
                  onClick={() => handleToggle(item.id)}
                  className="w-full p-5 flex items-center gap-4 text-left"
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isDiscovered
                      ? 'bg-gradient-to-br from-cream-300 to-peach-400 text-white'
                      : 'bg-blush-100 text-blush-400'
                  }`}>
                    {isDiscovered ? <Star size={18} fill="currentColor" /> : <span className="text-sm font-bold">{idx + 1}</span>}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-hand text-xl text-lavender-800">{item.title}</h3>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-lavender-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Expandable content */}
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: isExpanded ? '200px' : '0px',
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <div className="px-5 pb-5 pt-1">
                    <div className="note-paper rounded-xl p-4">
                      <p className="font-hand text-lg text-lavender-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Customization note */}
        <div className="mt-8 glass-card rounded-2xl p-5 text-center">
          <p className="text-sm text-lavender-500">
            Replace these with your own reasons — the more specific, the better.
          </p>
        </div>
      </div>
    </div>
  );
}
