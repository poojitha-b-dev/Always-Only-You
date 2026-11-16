import { useState, useMemo } from 'react';
import { Camera, Calendar, Heart } from 'lucide-react';
import { siteData } from '@/siteData';
import type { Memory } from '@/types';
import ParticleField from '@/components/ParticleField';
import Lightbox from '@/components/Lightbox';

const categoryLabels: Record<Memory['category'], string> = {
  'first-date': 'First Date',
  'favourite-moment': 'Favourite Moment',
  'funny-incident': 'Funny Incident',
  'milestone': 'Milestone',
  'conversation': 'Conversation',
};

const categoryColors: Record<Memory['category'], string> = {
  'first-date': 'bg-blush-200 text-blush-700',
  'favourite-moment': 'bg-lavender-200 text-lavender-700',
  'funny-incident': 'bg-cream-200 text-cream-700',
  'milestone': 'bg-peach-200 text-peach-700',
  'conversation': 'bg-mutedRed-200 text-mutedRed-700',
};

const photoRotations = ['rotate-[-2deg]', 'rotate-[1deg]', 'rotate-[-1deg]', 'rotate-[2deg]', 'rotate-0', 'rotate-[-3deg]'];

export default function Memories() {
  const [filter, setFilter] = useState<Memory['category'] | 'all'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredMemories = useMemo(() => {
    if (filter === 'all') return siteData.memories;
    return siteData.memories.filter((m) => m.category === filter);
  }, [filter]);

  const photosWithImages = useMemo(() => {
    return filteredMemories
      .filter((m) => m.photoUrl)
      .map((m) => ({ url: m.photoUrl, title: m.title, description: m.description }));
  }, [filteredMemories]);

  const categories: (Memory['category'] | 'all')[] = ['all', 'first-date', 'favourite-moment', 'funny-incident', 'milestone', 'conversation'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-blush-50 to-lavender-50 pt-24 pb-24 px-4">
      <ParticleField count={10} type="stars" />

      <div className="relative max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="text-5xl mb-3 animate-gentle-float">📸</div>
          <h1 className="font-hand text-4xl sm:text-6xl gradient-text mb-3">Our Little Memories</h1>
          <p className="text-lavender-600 text-sm sm:text-base max-w-md mx-auto">
            A scrapbook of us. Every moment, big and small, that made us who we are.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? 'bg-blush-300 text-blush-700 shadow-md'
                  : 'bg-white/60 text-lavender-600 hover:bg-blush-100'
              }`}
            >
              {cat === 'all' ? 'All Memories' : categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Scrapbook Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blush-300 via-lavender-300 to-cream-300 sm:-translate-x-1/2" />

          <div className="space-y-8">
            {filteredMemories.map((memory, idx) => {
              const isLeft = idx % 2 === 0;
              const rotation = photoRotations[idx % photoRotations.length];
              const hasPhoto = Boolean(memory.photoUrl);

              return (
                <div
                  key={memory.id}
                  className={`relative flex items-center gap-4 ${
                    isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  } animate-fade-in-up`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10">
                    <div className="w-4 h-4 rounded-full bg-blush-400 ring-4 ring-blush-100 animate-pulse-soft" />
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 ml-12 sm:ml-0 ${isLeft ? 'sm:pr-8' : 'sm:pl-8'}`}>
                    <div className="glass-card rounded-3xl p-5 hover-lift">
                      {/* Photo */}
                      {hasPhoto ? (
                        <button
                          onClick={() => {
                            const photoIdx = photosWithImages.findIndex((p) => p.url === memory.photoUrl);
                            if (photoIdx !== -1) setLightboxIndex(photoIdx);
                          }}
                          className={`block w-full mb-4 scrapbook-photo rounded-lg overflow-hidden ${rotation} hover:rotate-0 transition-transform duration-500`}
                        >
                          <img
                            src={memory.photoUrl}
                            alt={memory.title}
                            className="w-full h-48 sm:h-56 object-cover"
                          />
                        </button>
                      ) : (
                        <div className={`w-full h-48 sm:h-56 mb-4 rounded-lg ${rotation} bg-gradient-to-br from-blush-100 to-lavender-100 flex flex-col items-center justify-center border-4 border-white shadow-md hover:rotate-0 transition-transform duration-500`}>
                          <Camera size={32} className="text-lavender-400 mb-2" />
                          <span className="text-xs text-lavender-400">Add photo here</span>
                        </div>
                      )}

                      {/* Category badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryColors[memory.category]}`}>
                          {categoryLabels[memory.category]}
                        </span>
                        {memory.date && (
                          <span className="flex items-center gap-1 text-xs text-lavender-400">
                            <Calendar size={12} />
                            {memory.date}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-hand text-2xl text-lavender-800 mb-2">{memory.title}</h3>

                      {/* Description */}
                      <p className="font-serif text-sm text-lavender-700 leading-relaxed">
                        {memory.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for the other side on desktop */}
                  <div className="hidden sm:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Empty state */}
        {filteredMemories.length === 0 && (
          <div className="text-center py-16 text-lavender-400">
            <Heart size={48} className="mx-auto mb-4 opacity-40" />
            <p>No memories in this category yet.</p>
          </div>
        )}

        {/* Note about customization */}
        <div className="mt-12 glass-card rounded-2xl p-5 text-center">
          <p className="text-sm text-lavender-500">
            These are placeholder memories. Replace them with your real moments in the data file.
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && photosWithImages.length > 0 && (
        <Lightbox
          images={photosWithImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
