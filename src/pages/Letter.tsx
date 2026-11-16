import { useState } from 'react';
import { Mail, BookText } from 'lucide-react';
import { siteData } from '@/siteData';
import ParticleField from '@/components/ParticleField';

export default function Letter() {
  const [opened, setOpened] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleOpen = () => {
    setAnimating(true);
    setTimeout(() => {
      setOpened(true);
      setAnimating(false);
    }, 1000);
  };

  const handleClose = () => {
    setOpened(false);
    setAnimating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-100 via-blush-50 to-cream-100 pt-24 pb-24 px-4">
      <ParticleField count={10} type="hearts" />

      <div className="relative max-w-2xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="text-5xl mb-3 animate-gentle-float">💌</div>
          <h1 className="font-hand text-4xl sm:text-6xl gradient-text mb-3">A Letter From Me</h1>
          <p className="text-lavender-600 text-sm sm:text-base max-w-md mx-auto">
            I wrote this for you. Open it when you are ready.
          </p>
        </div>

        {!opened ? (
          /* Envelope */
          <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={handleOpen}
              disabled={animating}
              className="group relative w-72 sm:w-80"
            >
              {/* Envelope body */}
              <div className="relative h-56 sm:h-64 bg-gradient-to-br from-blush-300 to-blush-500 rounded-lg shadow-2xl overflow-visible">

                {/* Envelope flap (triangle) */}
                <div
                  className="absolute top-0 left-0 right-0 transition-all duration-1000 ease-in-out"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '50% solid transparent',
                    borderRight: '50% solid transparent',
                    borderTop: animating ? '0 solid transparent' : '110px solid #ff7aa9',
                    transformOrigin: 'top',
                    transform: animating ? 'rotateX(180deg) translateY(-5px)' : 'rotateX(0)',
                    zIndex: animating ? 1 : 3,
                  }}
                />

                {/* Wax seal */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-opacity duration-500"
                  style={{ opacity: animating ? 0 : 1 }}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-mutedRed-400 to-mutedRed-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-hand text-2xl">♥</span>
                  </div>
                </div>

                {/* Opening hint */}
                <div
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-500"
                  style={{ opacity: animating ? 0 : 1 }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Mail size={28} className="text-white/90" />
                    <span className="font-hand text-xl text-white/90 whitespace-nowrap">Read my letter</span>
                  </div>
                </div>

                {/* Letter peeking out during animation */}
                {animating && (
                  <div className="absolute inset-x-3 top-3 bottom-3 letter-paper rounded-lg shadow-xl animate-letter-rise" />
                )}
              </div>
            </button>

            <p className="mt-6 text-sm text-lavender-500 animate-pulse-soft">
              Tap the envelope to open
            </p>
          </div>
        ) : (
          /* Letter content */
          <div className="animate-fade-in-up">
            <div className="letter-paper rounded-2xl p-6 sm:p-10 shadow-2xl relative">
              {/* Letter header */}
              <div className="flex items-center gap-2 mb-6 text-blush-500">
                <BookText size={20} />
                <span className="font-hand text-xl">A letter for {siteData.boyfriendName}</span>
              </div>

              {/* Letter body */}
              <div className="font-serif text-lavender-800 leading-relaxed space-y-4 text-sm sm:text-base">
                {siteData.letterContent.split('\n').map((line, idx) => {
                  if (line.trim() === '') {
                    return <div key={idx} className="h-3" />;
                  }
                  return (
                    <p
                      key={idx}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${Math.min(idx * 0.03, 0.6)}s` }}
                    >
                      {line}
                    </p>
                  );
                })}
              </div>

              {/* Letter signature */}
              <div className="mt-8 text-right">
                <p className="font-hand text-lg text-blush-600">{siteData.letterDate}</p>
                <p className="font-hand text-2xl gradient-text">{siteData.yourName}</p>
              </div>

              {/* Decorative corners */}
              <div className="absolute top-3 left-3 text-blush-300 text-2xl">♡</div>
              <div className="absolute top-3 right-3 text-blush-300 text-2xl">♡</div>
              <div className="absolute bottom-3 left-3 text-blush-300 text-2xl">♡</div>
              <div className="absolute bottom-3 right-3 text-blush-300 text-2xl">♡</div>
            </div>

            {/* Close button */}
            <div className="text-center mt-6">
              <button
                onClick={handleClose}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 text-lavender-600 font-medium shadow hover:shadow-lg transition-all hover:scale-105"
              >
                Close letter
              </button>
            </div>

            {/* Customization note */}
            <div className="mt-6 glass-card rounded-2xl p-4 text-center">
              <p className="text-sm text-lavender-500">
                This is placeholder letter content. Replace it with your own words from the heart.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
