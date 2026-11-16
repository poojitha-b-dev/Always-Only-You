import { useState } from 'react';
import { Heart, RotateCcw } from 'lucide-react';
import { siteData } from '@/siteData';
import Cat from '@/components/Cat';
import ParticleField from '@/components/ParticleField';
import { useHeartBurst, HeartBurst } from '@/components/HeartBurst';

export default function LoveMe() {
  const [noCount, setNoCount] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [showConclusion, setShowConclusion] = useState<null | 'yes' | 'no'>(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [catType, setCatType] = useState<'neutral' | 'happy' | 'sad'>('neutral');
  const { hearts, burst } = useHeartBurst();

  const handleYes = () => {
    const count = yesCount + 1;
    setYesCount(count);
    setCatType('happy');
    setShowConclusion(null);

    const reactions = siteData.yesReactions;
    const message = reactions[(count - 1) % reactions.length].message;
    setCurrentMessage(message);
    burst(15);

    if (count >= 5) {
      setShowConclusion('yes');
      setCurrentMessage(siteData.yesConclusion);
    }
  };

  const handleNo = () => {
    const count = noCount + 1;
    setNoCount(count);
    setCatType('sad');
    setShowConclusion(null);

    const reactions = siteData.noReactions;
    const message = reactions[(count - 1) % reactions.length].message;
    setCurrentMessage(message);

    if (count >= 8) {
      setShowConclusion('no');
      setCurrentMessage(siteData.noConclusion);
    }
  };

  const handleReset = () => {
    setNoCount(0);
    setYesCount(0);
    setShowConclusion(null);
    setCurrentMessage('');
    setCatType('neutral');
  };

  // NO button runs away — gets progressively harder to click
  const noButtonOffset = Math.min(noCount, 6);
  const noButtonShake = noCount > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-100 via-cream-100 to-lavender-100 pt-24 pb-24 px-4">
      <ParticleField count={15} type="hearts" />
      <HeartBurst hearts={hearts} />

      <div className="relative max-w-2xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="font-hand text-4xl sm:text-6xl gradient-text mb-4">
            Do you love me?
          </h1>
          <p className="text-lavender-600 text-sm">
            Choose wisely. The cat is watching.
          </p>
        </div>

        {/* Cat Display */}
        <div className="flex justify-center mb-6">
          <div key={catType + noCount + yesCount} className="animate-scale-in">
            <Cat type={catType} size={120} />
          </div>
        </div>

        {/* Message */}
        {currentMessage && (
          <div className="glass-card rounded-2xl p-5 mb-8 text-center animate-fade-in-up" key={currentMessage}>
            <p className="font-hand text-2xl text-blush-700">{currentMessage}</p>
          </div>
        )}

        {/* Buttons */}
        {!showConclusion && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={handleYes}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blush-400 to-mutedRed-400 text-white text-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-heartbeat"
              >
                <span className="flex items-center gap-2">
                  <Heart size={24} fill="currentColor" />
                  YES
                </span>
              </button>

              <button
                onClick={handleNo}
                className={`px-8 py-4 rounded-full bg-lavender-300 text-lavender-700 text-xl font-bold shadow-lg hover:bg-lavender-400 transition-all duration-300 ${noButtonShake ? 'animate-shake-sad' : ''}`}
                style={{
                  transform: noButtonShake ? `translate(${noButtonOffset * 15}px, ${noButtonOffset * -8}px) rotate(${noButtonOffset * 3}deg)` : 'none',
                  opacity: Math.max(0.3, 1 - noButtonOffset * 0.1),
                  fontSize: `${Math.max(0.7, 1 - noButtonOffset * 0.05)}rem`,
                }}
              >
                NO
              </button>
            </div>

            {/* Progress hint */}
            {(noCount > 0 || yesCount > 0) && (
              <div className="text-sm text-lavender-500 animate-fade-in">
                {yesCount > 0 && <span className="mr-3">YES clicks: {yesCount}</span>}
                {noCount > 0 && <span>NO clicks: {noCount} {noCount < 8 ? '(keep going, the cat is getting dramatic)' : ''}</span>}
              </div>
            )}
          </div>
        )}

        {/* Conclusion + Reset */}
        {showConclusion && (
          <div className="text-center space-y-6 animate-scale-in">
            <div className="glass-card rounded-3xl p-8">
              <div className="text-5xl mb-4 animate-bounce-happy">
                {showConclusion === 'yes' ? '😸💕🎉' : '😹😤💌'}
              </div>
              <p className="font-hand text-2xl text-blush-700 mb-4">{currentMessage}</p>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/80 text-lavender-600 font-medium shadow hover:shadow-lg transition-all hover:scale-105"
            >
              <RotateCcw size={18} />
              Play again
            </button>
          </div>
        )}

        {/* Fun counter */}
        {(noCount >= 3 || yesCount >= 3) && !showConclusion && (
          <div className="mt-8 text-center animate-fade-in">
            <div className="inline-block glass-card rounded-full px-4 py-2">
              <span className="text-sm text-lavender-600">
                {noCount >= 3 && yesCount < 1 && 'The cat is drafting its will... '}
                {yesCount >= 3 && noCount === 0 && 'The cat is living its best life! '}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
