import { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';

interface BirthdaySurpriseProps {
  title: string;
  message: string;
  boyfriendName: string;
}

export default function BirthdaySurprise({ title, message, boyfriendName }: BirthdaySurpriseProps) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blush-100 via-cream-100 to-lavender-100 p-6 sm:p-10 shadow-xl">
      <div className="absolute inset-0 bg-particles opacity-30" />

      <div className="relative text-center">
        <div className="inline-block mb-4 animate-pulse-soft">
          <span className="text-5xl sm:text-6xl">🎂</span>
        </div>

        <h2 className="font-hand text-3xl sm:text-5xl gradient-text mb-4">{title}</h2>

        {!opened ? (
          <div className="space-y-6">
            <p className="text-lavender-700 max-w-md mx-auto text-sm sm:text-base">
              There is something special waiting for you. Are you ready?
            </p>
            <button
              onClick={() => setOpened(true)}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blush-400 to-mutedRed-400 text-white font-medium shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-heartbeat"
            >
              <Gift size={22} className="group-hover:rotate-12 transition-transform" />
              Open your birthday surprise
            </button>
          </div>
        ) : (
          <div className="animate-fade-in-up space-y-4">
            <div className="text-4xl sm:text-5xl animate-bounce-happy mb-4">🎉🎊🎈</div>
            <p className="font-serif text-base sm:text-lg text-lavender-800 leading-relaxed max-w-lg mx-auto italic">
              {message}
            </p>
            <div className="flex justify-center gap-2 text-2xl animate-gentle-float">
              <span>🎁</span>
              <span>💝</span>
              <span>🌟</span>
            </div>
            <p className="font-hand text-2xl text-blush-600 mt-4">
              Happy Birthday, {boyfriendName}! ♥
            </p>
            <button
              onClick={() => setOpened(false)}
              className="text-sm text-lavender-500 hover:text-lavender-700 underline transition-colors mt-2"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
