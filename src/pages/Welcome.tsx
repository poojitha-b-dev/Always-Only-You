import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import Cat from '@/components/Cat';
import ParticleField from '@/components/ParticleField';

interface WelcomeProps {
  onEnter: () => void;
}

interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: string;
  emoji: string;
}

const QUESTION = 'Where was our first trip together?';
const ACCEPTED_ANSWERS = ['vijayawada', 'vijaywada', 'bza'];
const EXTENSIONS = ['.gif', '.jpg', '.jpeg', '.png', '.webp'];

function SmartSticker({ name }: { name: string }) {
  const [extIndex, setExtIndex] = useState(0);

  useEffect(() => {
    setExtIndex(0);
  }, [name]);

  const src = `/stickers/${name}${EXTENSIONS[extIndex] ?? '.gif'}`;

  return (
    <img
      src={src}
      alt="Reaction sticker"
      onError={() => {
        if (extIndex < EXTENSIONS.length - 1) {
          setExtIndex((prev) => prev + 1);
        }
      }}
      className="w-36 h-36 sm:w-40 sm:h-40 object-contain mx-auto"
    />
  );
}

export default function Welcome({ onEnter }: WelcomeProps) {
  const [answer, setAnswer] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintStep, setHintStep] = useState<0 | 1 | 2>(0);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const isLocked = wrongAttempts >= 7;
  const totalAttempts = wrongAttempts + 1;

  const triggerHeartWave = useCallback(() => {
    const sizes = ['text-2xl', 'text-3xl', 'text-4xl'];
    const wave: FloatingHeart[] = Array.from({ length: 35 }, (_, i) => ({
      id: Date.now() + i,
      left: 4 + Math.random() * 92,
      delay: Math.random() * 0.8,
      duration: 2.2 + Math.random() * 1.2,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      emoji: '❤️',
    }));
    setHearts(wave);
    setTimeout(() => setHearts([]), 3500);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked || isCorrect) return;

    const normalized = answer.trim().toLowerCase();
    if (!normalized) return;

    if (ACCEPTED_ANSWERS.includes(normalized)) {
      setIsCorrect(true);
      triggerHeartWave();
      setTimeout(onEnter, 3200);
    } else {
      setAnswer(''); // Clears the text box automatically on a wrong guess
      setWrongAttempts((prev) => Math.min(prev + 1, 7));
    }
  };

  const getCurrentDisplay = () => {
    if (isCorrect) {
      return {
        sticker: 'a10',
        catEmoji: '😻',
        reactionText:
          totalAttempts === 1
            ? 'First try! You actually remembered ♥'
            : `Took you ${totalAttempts} tries, but you got it ♥`,
      };
    }

    if (wrongAttempts === 0) {
      return {
        sticker: 'a1',
        catEmoji: '🐱',
        reactionText: '',
      };
    }

    if (wrongAttempts === 1) {
      return {
        sticker: 'a2',
        catEmoji: '😼',
        reactionText: 'Excuse me? Are you serious?',
      };
    }

    if (wrongAttempts === 2) {
      return {
        sticker: 'a3',
        catEmoji: '🙀',
        reactionText: 'You forgot already? Think again',
      };
    }

    if (wrongAttempts === 3) {
      return {
        sticker: 'a4',
        catEmoji: '😾',
        reactionText: 'Stop guessing random places',
      };
    }

    if (wrongAttempts === 4) {
      return {
        sticker: 'a5',
        catEmoji: '💢',
        reactionText: "That's it, I'm mad now",
      };
    }

    if (wrongAttempts === 5) {
      if (hintStep === 1) {
        return {
          sticker: 'a6',
          catEmoji: '😜',
          reactionText: 'Just playing! Give me 10 kisses first... or maybe I won’t tell',
        };
      }
      if (hintStep === 2) {
        return {
          sticker: 'a7',
          catEmoji: '😽',
          reactionText: "Fine, don't forget my 10 kisses! It starts with 'V'",
        };
      }
      return {
        sticker: 'a5(1)',
        catEmoji: '😿',
        reactionText: 'You’re struggling so bad... need a hint?',
      };
    }

    if (wrongAttempts === 6) {
      return {
        sticker: 'a8',
        catEmoji: '🥺',
        reactionText: 'Last chance before I lock the door',
      };
    }

    return {
      sticker: 'a9',
      catEmoji: '🚪',
      reactionText: 'BYE~ Button locked! Refresh the page (and owe me 10 kisses) to try again',
    };
  };

  const current = getCurrentDisplay();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-lavender-100 via-blush-100 to-cream-100 flex items-center justify-center overflow-hidden p-4">
      <ParticleField count={20} type="mixed" />

      {/* Full-screen bottom-to-top floating hearts that disappear */}
      {hearts.length > 0 && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          {hearts.map((h) => (
            <div
              key={h.id}
              className={`absolute -bottom-10 animate-float-up ${h.size}`}
              style={{
                left: `${h.left}%`,
                animationDelay: `${h.delay}s`,
                animationDuration: `${h.duration}s`,
              }}
            >
              {h.emoji}
            </div>
          ))}
        </div>
      )}

      {/* Subtle corner cat decorations */}
      <div className="absolute top-10 left-10 opacity-20 hidden sm:block">
        <Cat type="neutral" size={60} />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 hidden sm:block">
        <Cat type="neutral" size={60} />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="glass-card rounded-3xl p-8 sm:p-10 shadow-2xl animate-fade-in-up">
          {/* 1. Sticker at the Top */}
          <div className="flex justify-center mb-5">
            <div className={wrongAttempts === 0 && !isCorrect ? 'animate-gentle-float' : 'animate-scale-in'}>
              <SmartSticker name={current.sticker} />
            </div>
          </div>

          {/* 2. "Wait a second... Who are you?" ONLY on initial screen */}
          {wrongAttempts === 0 && !isCorrect && (
            <h1 className="font-hand text-3xl sm:text-4xl text-center text-blush-700 mb-6">
              Wait a second... Who are you?
            </h1>
          )}

          {/* 3. Reaction Message + Cat Emoji above Question */}
          {wrongAttempts > 0 && !isCorrect && (
            <div className="mb-6 text-center animate-scale-in">
              <p className="font-hand text-2xl text-mutedRed-600 mb-2">
                {current.reactionText}
              </p>
              <div className="text-4xl animate-shake-sad select-none">
                {current.catEmoji}
              </div>
            </div>
          )}

          {/* Success State */}
          {isCorrect && (
            <div className="text-center animate-scale-in">
              <h1 className="font-hand text-3xl sm:text-4xl gradient-text mb-4">
                {current.reactionText}
              </h1>
              <div className="text-5xl mb-4 animate-bounce-happy">
                {current.catEmoji}
              </div>
              <p className="text-lavender-600 text-sm">
                Welcome to your little universe...
              </p>
            </div>
          )}

          {/* 4. Question + Input + Submit Button */}
          {!isCorrect && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-center text-lavender-700 text-sm sm:text-base">
                {QUESTION}
              </p>

              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={isLocked}
                placeholder={isLocked ? 'Refresh page to unlock...' : 'Type your answer here...'}
                autoFocus
                className="w-full px-5 py-3 rounded-2xl border-2 border-blush-200 bg-white/80 text-center text-lg text-lavender-800 placeholder-blush-300 focus:outline-none focus:border-blush-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />

              <button
                type="submit"
                disabled={isLocked}
                className={`w-full px-6 py-3 rounded-2xl bg-gradient-to-r from-blush-400 to-lavender-500 text-white font-medium shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  isLocked
                    ? 'opacity-45 cursor-not-allowed pointer-events-none grayscale'
                    : 'hover:shadow-xl hover:scale-[1.02]'
                }`}
              >
                {isLocked ? 'Locked (Refresh Page)' : 'Let me in'}
                {!isLocked && <ArrowRight size={18} />}
              </button>
            </form>
          )}

          {/* 5. Hint Buttons below Submit Button (Attempt 5) */}
          {!isCorrect && wrongAttempts === 5 && (
            <div className="mt-4 flex flex-col items-center gap-2 animate-scale-in">
              {hintStep === 0 && (
                <button
                  type="button"
                  onClick={() => setHintStep(1)}
                  className="px-4 py-2 rounded-full bg-lavender-100 hover:bg-lavender-200 text-lavender-700 text-sm font-medium transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles size={15} />
                  Need a Hint?
                </button>
              )}

              {hintStep === 1 && (
                <button
                  type="button"
                  onClick={() => setHintStep(2)}
                  className="px-4 py-2 rounded-full bg-blush-400 hover:bg-blush-500 text-white text-sm font-medium transition-all flex items-center gap-1.5 shadow-md animate-bounce"
                >
                  <Heart size={15} fill="currentColor" />
                  Fine, I promise 10 kisses 😘
                </button>
              )}
            </div>
          )}

          {/* Attempt Number */}
          {!isCorrect && wrongAttempts > 0 && (
            <p className="text-center text-xs text-lavender-400 mt-4">
              Attempt {wrongAttempts}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}