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
                <span className="font-hand text-lg sm:text-xl">A letter for <span className="font-hand font-normal text-blush-500">Kash</span></span>
              </div>

              {/* Letter body - Cursive font, slightly larger for a comfortable reading size */}
              <div className="font-hand text-lg sm:text-xl text-lavender-800 leading-relaxed space-y-4">
                {`Happiest birthday, baby ♥️. My heart is so full seeing my baby celebrate his 22nd birthday. Today might feel like just another ordinary day to you, but to me, it is the most special day of the year because it is the day the love of my life was born.

Looking back, I still can't believe we've already shared a wonderful year and a half together. Before I met you, I used to pray so much for God to send me a man who would love me deeply and truly care for me. I honestly never thought wishes like that actually came true, yet here you are. You have changed my life in ways you don't even realize, and I don't even want to imagine how empty my days would feel without you.

You are the most precious person in my life, and being with you feels just like magic—so comforting and sweet that I still can't believe I get to call you mine. Sometimes I just look at you in awe, wondering how someone so loyal, gentle, considerate, and cute can even exist. You make my saddest days brighter and warmer, and I appreciate every little thing that brought us closer together. Being with you has shown me what true love actually feels like—how beautiful is it to love someone so deeply and be loved the exact same way in return?

Thank you for always standing by my side, and for constantly trying to grow and be your best for us. Even though you are already completely perfect in my eyes, seeing how much effort you put into us makes me fall for you even more. Because of everything you are, I am—and always will be—so proud of you. Please promise me you will never doubt yourself, and never dare to worry that I might ever leave you. How could anyone ever walk away from someone they love this uncontrollably, especially after receiving so much love in return? All I want is to spend the rest of my life with you. Will you stay with me forever?

As much as I wanted to be with you today, I'm so sorry I couldn't spend time with you—I wish I could have at least come to your office in the evening just to see you. It hurts to miss your special day, so I'm making you a promise right now: next year, I will definitely be right there beside you to celebrate your birthday properly, okay?

You're the best thing that has ever happened to me, and I love you so much!`.split('\n').map((line, idx) => {
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
                <p className="font-hand text-lg sm:text-xl text-blush-600">{siteData.letterDate}</p>
                <p className="font-hand text-2xl sm:text-3xl text-blush-600">Pooja</p>
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
          </div>
        )}
      </div>
    </div>
  );
}