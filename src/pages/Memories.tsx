import { useState, useEffect, useMemo, useRef } from 'react';
import { Camera, Calendar, Heart, Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX, Music } from 'lucide-react';
import { siteData } from '@/siteData';
import type { Memory } from '@/types';
import ParticleField from '@/components/ParticleField';
import Lightbox from '@/components/Lightbox';

const categoryLabels: Record<string, string> = {
  'dates': 'Dates',
  'trips': 'Trips',
  'midnight-calls': 'Midnight Calls',
  'temple': 'Temple',
  'videos': 'Videos',
};

const categoryColors: Record<string, string> = {
  'dates': 'bg-blush-200 text-blush-700',
  'trips': 'bg-lavender-200 text-lavender-700',
  'midnight-calls': 'bg-cream-200 text-cream-700',
  'temple': 'bg-peach-200 text-peach-700',
  'videos': 'bg-mutedRed-200 text-mutedRed-700',
};

const photoRotations = ['rotate-[-2deg]', 'rotate-[1deg]', 'rotate-[-1deg]', 'rotate-[2deg]', 'rotate-0', 'rotate-[-3deg]'];

const timelinePhotoGroups: Record<string, string[]> = {
  'dates': [
    
    '/pictures/dates/pic13.jpeg',
    '/pictures/dates/pic11.jpeg',
    '/pictures/dates/pic16.jpeg',
    '/pictures/dates/pic17.jpeg',
    '/pictures/dates/pic19.jpeg',
    '/pictures/dates/pic27.jpeg',
    '/pictures/dates/pic33.jpeg',
    '/pictures/dates/pic35.jpeg',
    '/pictures/dates/pic38.jpeg',
    '/pictures/dates/pic4.jpeg',
    '/pictures/dates/pic41.jpeg',
    '/pictures/dates/pic42.jpeg',
    '/pictures/dates/pic46.jpeg',
    '/pictures/dates/pic47.jpeg',
    '/pictures/dates/pic50.jpeg',
    '/pictures/dates/pic51.jpeg',
    '/pictures/dates/pic57.jpeg',
    '/pictures/dates/pic7.jpeg',
  ],
  'trips': [
    '/pictures/trips/pic1.jpeg',
    '/pictures/trips/pic10.jpeg',
    '/pictures/trips/pic14.jpeg',
    '/pictures/trips/pic15.jpeg',
    '/pictures/trips/pic2.jpeg',
    '/pictures/trips/pic20.jpeg',
    '/pictures/trips/pic21.jpeg',
    '/pictures/trips/pic29.jpeg',
    '/pictures/trips/pic3.jpeg',
    '/pictures/trips/pic30.jpeg',
    '/pictures/trips/pic37.jpeg',
    '/pictures/trips/pic39.jpeg',
    '/pictures/trips/pic43.jpeg',
    '/pictures/trips/pic52.jpeg',
    '/pictures/trips/pic54.jpeg',
    '/pictures/trips/pic6.jpeg',
    '/pictures/trips/pic8.jpeg',
  ],
  'midnight-calls': [
    '/pictures/sleeping/pic36.jpeg',
    '/pictures/sleeping/pic44.jpeg',
    '/pictures/sleeping/pic45.jpeg',
    '/pictures/sleeping/pic48.jpeg',
    '/pictures/sleeping/pic49.jpeg',
    '/pictures/sleeping/pic55.jpeg',
    '/pictures/sleeping/pic56.jpeg',
  ],
  'temple': [
    '/pictures/temple/pic18.jpeg',
    '/pictures/temple/pic22.jpeg',
    '/pictures/temple/pic23.jpeg',
    '/pictures/temple/pic31.jpeg',
    '/pictures/temple/pic40.jpeg',
    '/pictures/temple/pic53.jpeg',
    '/pictures/temple/pic58.jpeg',
    '/pictures/temple/pic60.jpeg',
  ],
};

const videoList = [
  '/pictures/videos/vid1.mp4',
  '/pictures/videos/vid2.mp4',
  '/pictures/videos/vid3.mp4',
  '/pictures/videos/vid4.mp4',
  '/pictures/videos/vid5.mp4',
  '/pictures/videos/vid6.mp4',
  '/pictures/videos/vid7.mp4',
  '/pictures/videos/vid8.mp4',
];

export default function Memories() {
  const [filter, setFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [currentIndices, setCurrentIndices] = useState<Record<string, number>>({});
  const [isAutoPlaying, setIsAutoPlaying] = useState<Record<string, boolean>>({});
  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});
  
  // Background music state
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.20); // 20 out of 100 volume
  const [showMusicMenu, setShowMusicMenu] = useState<boolean>(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicMenuRef = useRef<HTMLDivElement | null>(null);
  const menuTimerRef = useRef<NodeJS.Timeout | null>(null);

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const customMemories = [
    {
      id: 'm1',
      category: 'dates',
      date: 'July 13, 2025',
      title: 'Our Dates & Time Together',
      description: "Every single date with you feels like magic. Whether we're going out or just spending time together, you're my favorite person to be with.",
      photoUrl: '/pictures/dates/pic59.jpeg',
    },
    {
      id: 'm2',
      category: 'trips',
      date: 'July 2025',
      title: 'Short Trips & Sweet Getaways',
      description: 'Our trips to Vijayawada always bring me so much joy. Traveling by your side makes every journey together feel like a wonderful getaway.',
      photoUrl: '/pictures/trips/pic1.jpeg',
    },
    {
      id: 'm3',
      category: 'midnight-calls',
      date: 'July 19, 2025',
      title: 'Midnight Calls & Sleepy You',
      description: "Even when we're apart, staying on video call overnight and watching you sleep looking so cute is my favorite way to feel close to you.",
      photoUrl: '/pictures/sleeping/pic36.jpeg',
    },
    {
      id: 'm4',
      category: 'temple',
      date: 'October 2025',
      title: 'Quiet Blessings Together',
      description: "Finding peace in the quiet moments we share together. Every prayer and blessing feels extra special when I'm right by your side.",
      photoUrl: '/pictures/temple/pic18.jpeg',
    },
    {
      id: 'm5',
      category: 'videos',
      date: 'Overall Videos',
      title: 'Moments in Motion',
      description: 'Hearing your laugh, watching you, and playing back our little video clips brings all our best days wonderfully back to life.',
      photoUrl: '/pictures/videos/vid1.mp4',
    },
  ];

  const filteredMemories = useMemo(() => {
    if (filter === 'all') return customMemories;
    return customMemories.filter((m) => m.category === filter);
  }, [filter]);

  // Play music on page mount / return, and stop when navigating away or changing tabs
  useEffect(() => {
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.volume = volume;
      audioEl.play().then(() => {
        setIsPlayingMusic(true);
      }).catch(() => {
        setIsPlayingMusic(false);
      });
    }

    const handleVisibilityChange = () => {
      if (document.hidden && audioEl) {
        audioEl.pause();
        setIsPlayingMusic(false);
      } else if (!document.hidden && audioEl) {
        audioEl.play().then(() => {
          setIsPlayingMusic(true);
        }).catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (audioEl) {
        audioEl.pause();
        audioEl.currentTime = 0;
      }
    };
  }, []);

  // Handle auto-collapsing menu if no action is taken after opening
  useEffect(() => {
    if (showMusicMenu) {
      if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
      menuTimerRef.current = setTimeout(() => {
        setShowMusicMenu(false);
      }, 4000);
    }
    return () => {
      if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
    };
  }, [showMusicMenu]);

  // Close music popup menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (musicMenuRef.current && !musicMenuRef.current.contains(event.target as Node)) {
        setShowMusicMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleStopMusic = () => {
    if (audioRef.current) {
      if (isPlayingMusic) {
        audioRef.current.pause();
        setIsPlayingMusic(false);
      } else {
        audioRef.current.volume = volume;
        audioRef.current.play().then(() => {
          setIsPlayingMusic(true);
        }).catch(() => {});
      }
    }
    setShowMusicMenu(false);
  };

  const increaseVolume = () => {
    const newVol = Math.min(volume + 0.25, 1.0);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    setShowMusicMenu(false);
  };

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('data-memory-id');
        if (id) {
          const isVisible = entry.isIntersecting;
          setVisibleCards((prev) => ({ ...prev, [id]: isVisible }));

          const videoEl = videoRefs.current[id];
          if (videoEl) {
            if (isVisible) {
              videoEl.play().catch(() => {});
            } else {
              videoEl.pause();
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3,
    });

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [filteredMemories]);

  useEffect(() => {
    const initialIndices: Record<string, number> = {};
    const initialAutoPlay: Record<string, boolean> = {};
    filteredMemories.forEach((m) => {
      initialIndices[m.id] = 0;
      initialAutoPlay[m.id] = m.category !== 'videos';
    });
    setCurrentIndices(initialIndices);
    setIsAutoPlaying(initialAutoPlay);
  }, [filteredMemories]);

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    filteredMemories.forEach((memory) => {
      const isVisible = visibleCards[memory.id] ?? false;
      const playing = isAutoPlaying[memory.id] ?? false;

      if (isVisible && playing && memory.category !== 'videos') {
        intervals.push(
          setInterval(() => {
            const photos = timelinePhotoGroups[memory.category] || [memory.photoUrl];
            setCurrentIndices((prev) => ({
              ...prev,
              [memory.id]: ((prev[memory.id] || 0) + 1) % photos.length,
            }));
          }, 3500)
        );
      }
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [isAutoPlaying, visibleCards, filteredMemories]);

  const handleNext = (memoryId: string, length: number) => {
    setCurrentIndices((prev) => ({
      ...prev,
      [memoryId]: ((prev[memoryId] || 0) + 1) % length,
    }));
  };

  const handlePrev = (memoryId: string, length: number) => {
    setCurrentIndices((prev) => ({
      ...prev,
      [memoryId]: ((prev[memoryId] || 0) - 1 + length) % length,
    }));
  };

  const toggleAutoPlay = (memoryId: string) => {
    setIsAutoPlaying((prev) => ({
      ...prev,
      [memoryId]: !prev[memoryId],
    }));
  };

  const photosWithImages = useMemo(() => {
    return filteredMemories.filter(m => m.category !== 'videos').map((m) => {
      const photos = timelinePhotoGroups[m.category] || [m.photoUrl];
      const activeIdx = currentIndices[m.id] || 0;
      return { url: photos[activeIdx] || m.photoUrl, title: m.title, description: m.description };
    });
  }, [filteredMemories, currentIndices]);

  const categories = ['all', 'dates', 'trips', 'midnight-calls', 'temple', 'videos'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-blush-50 to-lavender-50 pt-24 pb-24 px-4 relative">
      {/* Background Audio Player */}
      <audio ref={audioRef} src="/music/music1.mp4" loop preload="auto" />

      {/* Floating Music Emoji Button & Collapsible Menu */}
      <div ref={musicMenuRef} className="fixed top-20 right-4 z-50">
        {!showMusicMenu ? (
          <button
            onClick={() => setShowMusicMenu(true)}
            className="w-12 h-12 rounded-full bg-white/95 backdrop-blur shadow-lg border border-blush-200 flex items-center justify-center text-xl hover:scale-110 transition-transform animate-pulse-soft"
            title="Music Settings"
          >
            🎵
          </button>
        ) : (
          <div className="flex flex-col gap-2 p-3 rounded-2xl bg-white/95 backdrop-blur shadow-xl border border-blush-200 min-w-[140px] animate-fade-in-up">
            <div className="flex items-center justify-between pb-1 border-b border-blush-100">
              <span className="text-xs font-hand text-blush-700">Music ♪</span>
              <button 
                onClick={() => setShowMusicMenu(false)}
                className="text-xs text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>
            <button
              onClick={toggleStopMusic}
              className="px-3 py-1.5 rounded-xl bg-blush-100 text-blush-700 text-xs font-medium hover:bg-blush-200 transition-colors text-center"
            >
              {isPlayingMusic ? 'Stop Music' : 'Play Music'}
            </button>
            <button
              onClick={increaseVolume}
              className="px-3 py-1.5 rounded-xl bg-lavender-100 text-lavender-700 text-xs font-medium hover:bg-lavender-200 transition-colors text-center"
            >
              Increase Volume
            </button>
          </div>
        )}
      </div>

      <ParticleField count={10} type="stars" />

      <div className="relative max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-6 animate-fade-in-up">
          <div className="text-5xl mb-3 animate-gentle-float">📸</div>
          <h1 className="font-hand text-4xl sm:text-6xl gradient-text mb-3">Our Little Memories</h1>
          <p className="text-lavender-600 text-sm sm:text-base max-w-md mx-auto">
            A scrapbook of us. Every moment, big and small, that made us who we are.
          </p>
        </div>

        {/* 🌟 Special Custom Finger-Heart Art Piece Placed Right Below Title 🌟 */}
        <div className="my-8 max-w-md mx-auto animate-fade-in-up">
          <div className="scrapbook-photo rounded-2xl p-4 bg-white shadow-xl rotate-[1deg] hover:rotate-0 transition-transform duration-500">
            <div className="overflow-hidden rounded-xl bg-stone-900/5 flex items-center justify-center">
              <img
                src="/pictures/pic34.jpeg"
                alt="In the quiet, I feel you here"
                className="w-full h-auto max-h-[350px] object-contain rounded-xl"
              />
            </div>
            <p className="text-center font-hand text-xl text-blush-600 mt-3">
              "In the quiet, I feel you here ♥"
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
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

        {/* Original Scrapbook Timeline with Connecting Line */}
        <div className="relative">
          {/* Timeline connecting line down the middle */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blush-300 via-lavender-300 to-cream-300 sm:-translate-x-1/2" />

          <div className="space-y-12">
            {filteredMemories.map((memory, idx) => {
              const isLeft = idx % 2 === 0;
              const rotation = photoRotations[idx % photoRotations.length];
              const isVideoBlock = memory.category === 'videos';

              const mediaList = isVideoBlock ? videoList : (timelinePhotoGroups[memory.category] || [memory.photoUrl]);
              const activeIdx = currentIndices[memory.id] || 0;
              const playing = isAutoPlaying[memory.id] ?? false;
              const currentMediaUrl = mediaList[activeIdx] || memory.photoUrl;

              const isPortraitPhoneStyle = memory.category === 'midnight-calls' || memory.category === 'temple';

              return (
                <div
                  key={memory.id}
                  ref={(el) => (cardRefs.current[memory.id] = el)}
                  data-memory-id={memory.id}
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
                    <div className="glass-card rounded-3xl p-5 shadow-lg hover-lift">
                      {/* Media Ticker */}
                      {/* Media Ticker */}
                      <div className={`relative w-full mb-4 scrapbook-photo overflow-hidden ${rotation} bg-white p-2 shadow-md transition-transform duration-500 hover:rotate-0`}>
                        <div 
                          className={`relative mx-auto overflow-hidden bg-blush-50 p-2 flex items-center justify-center ${
                            isPortraitPhoneStyle ? 'w-fit' : 'w-full h-64 sm:h-72'
                          }`}
                        >
                          {isVideoBlock ? (
                            <video
                              ref={(el) => (videoRefs.current[memory.id] = el)}
                              key={currentMediaUrl}
                              src={currentMediaUrl}
                              controls
                              preload="auto"
                              playsInline
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <img
                              src={currentMediaUrl}
                              alt={memory.title}
                              className={`${
                                isPortraitPhoneStyle ? 'max-h-[340px] w-auto h-auto' : 'w-full h-full object-contain'
                              } transition-all duration-500 ease-in-out cursor-pointer`}
                              onClick={() => {
                                const photoIdx = photosWithImages.findIndex((p) => p.url === currentMediaUrl);
                                if (photoIdx !== -1) setLightboxIndex(photoIdx);
                              }}
                            />
                          )}
                        </div>

                        {/* Slider Controls */}
                        <div className="flex items-center justify-between mt-3 px-1">
                          <button
                            onClick={() => handlePrev(memory.id, mediaList.length)}
                            className="p-1.5 rounded-full bg-blush-200/80 text-blush-700 hover:bg-blush-300 transition-colors"
                            title="Previous Item"
                          >
                            <ChevronLeft size={16} />
                          </button>

                          <div className="flex items-center gap-2">
                            {!isVideoBlock && (
                              <button
                                onClick={() => toggleAutoPlay(memory.id)}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blush-400 to-lavender-500 text-white text-[10px] font-medium shadow hover:scale-105 transition-all"
                              >
                                {playing ? <Pause size={12} /> : <Play size={12} />}
                                <span>{playing ? 'Stop' : 'Play'}</span>
                              </button>
                            )}
                            <span className="font-hand text-xs text-lavender-600">
                              {activeIdx + 1} / {mediaList.length}
                            </span>
                          </div>

                          <button
                            onClick={() => handleNext(memory.id, mediaList.length)}
                            className="p-1.5 rounded-full bg-blush-200/80 text-blush-700 hover:bg-blush-300 transition-colors"
                            title="Next Item"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Category badge & Dates */}
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

                  <div className="hidden sm:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>

        {filteredMemories.length === 0 && (
          <div className="text-center py-16 text-lavender-400">
            <Heart size={48} className="mx-auto mb-4 opacity-40" />
            <p>No memories in this category yet.</p>
          </div>
        )}
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