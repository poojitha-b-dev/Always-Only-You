import { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { siteData } from '@/siteData';
import Cat from '@/components/Cat';
import { useHeartBurst, HeartBurst } from '@/components/HeartBurst';
import ParticleField from '@/components/ParticleField';

interface WelcomeProps {
  onEnter: () => void;
}

export default function Welcome({ onEnter }: WelcomeProps) {
  const [answer, setAnswer] = useState('');
  const [state, setState] = useState<'idle' | 'wrong' | 'correct'>('idle');
  const [wrongIndex, setWrongIndex] = useState(0);
  const { hearts, burst } = useHeartBurst();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = answer.trim().toLowerCase();
    const expected = siteData.welcomeAnswer.trim().toLowerCase();

    if (normalized === expected) {
      setState('correct');
      burst(20);
      setTimeout(onEnter, 3000);
    } else {
      setState('wrong');
      setWrongIndex((prev) => (prev + 1) % siteData.wrongAnswerReactions.length);
    }
  };

  const reaction = siteData.wrongAnswerReactions[wrongIndex];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-lavender-100 via-blush-100 to-cream-100 flex items-center justify-center overflow-hidden p-4">
      <ParticleField count={20} type="mixed" />
      <HeartBurst hearts={hearts} />

      {/* Floating cat decorations */}
      <div className="absolute top-10 left-10 opacity-20 hidden sm:block">
        <Cat type="neutral" size={60} />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 hidden sm:block">
        <Cat type="neutral" size={60} />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Idle / Wrong state */}
        {state !== 'correct' && (
          <div className="glass-card rounded-3xl p-8 sm:p-10 shadow-2xl animate-fade-in-up">
            <div className="flex justify-center mb-6">
              {state === 'wrong' ? (
                <Cat type="sad" size={100} />
              ) : (
                <div className="animate-gentle-float">
                  <Cat type="neutral" size={100} />
                </div>
              )}
            </div>

            <h1 className="font-hand text-3xl sm:text-4xl text-center text-blush-700 mb-2">
              Wait a second... Who are you?
            </h1>

            <div className="flex items-center justify-center gap-2 mb-6">
              <Lock size={16} className="text-lavender-500" />
              <span className="text-sm text-lavender-600">Answer correctly to enter</span>
            </div>

            {state === 'wrong' && (
              <div className="mb-6 text-center animate-scale-in">
                <p className="font-hand text-2xl text-mutedRed-600 mb-2">
                  {reaction.message}
                </p>
                <div className="text-4xl animate-shake-sad">{reaction.catEmoji}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-center text-lavender-700 text-sm sm:text-base">
                {siteData.welcomeQuestion}
              </p>
              <input
                type="text"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  if (state === 'wrong') setState('idle');
                }}
                placeholder="Type your answer here..."
                autoFocus
                className="w-full px-5 py-3 rounded-2xl border-2 border-blush-200 bg-white/80 text-center text-lg text-lavender-800 placeholder-blush-300 focus:outline-none focus:border-blush-400 transition-colors"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-2xl bg-gradient-to-r from-blush-400 to-lavender-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Let me in
                <ArrowRight size={18} />
              </button>
            </form>

            {state === 'wrong' && (
              <p className="text-center text-xs text-lavender-400 mt-4 animate-fade-in">
                Hint: check your heart, not your memory. (Or just ask me for the answer.)
              </p>
            )}
          </div>
        )}

        {/* Correct state */}
        {state === 'correct' && (
          <div className="glass-card rounded-3xl p-8 sm:p-12 shadow-2xl text-center animate-scale-in">
            <div className="flex justify-center mb-6">
              <Cat type="happy" size={120} />
            </div>
            <h1 className="font-hand text-3xl sm:text-5xl gradient-text mb-4 animate-fade-in-up">
              {siteData.correctAnswerMessage}
            </h1>
            <div className="text-4xl mb-4 animate-bounce-happy">🎉💕🐱</div>
            <p className="text-lavender-600 text-sm animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              Welcome to your little universe...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
