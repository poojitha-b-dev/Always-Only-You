import { useState } from "react";

const LOVE_MESSAGES = [
  "You found a little pocket of love! Just a reminder that you are my absolute favorite person to do nothing and everything with. ♥",
  "Official notice: You are owed one tight, lingering hug the very next time I see you. No expiration date. ♥",
  "Still obsessed with you since July 13, 2025. Honestly, it’s getting a little ridiculous at this point. ♥",
  "If I had a star for every time you made me laugh, I’d basically own the whole night sky by now. ✨",
  "Just checking in to make sure you know how handsome, smart, and completely adored you are today. ♥",
  "Plot twist: You’re the best thing that ever happened to me, and I still get butterflies every time you text. ♥",
  "Consider this a digital forehead kiss. Go drink some water and have the best day, baby. ^^",
  "My favorite place in the entire world isn’t a spot on a map—it’s wherever I’m sitting next to you. ♥",
  "Reminder: Out of all the people in the world, I’d still pick you in every single universe. ♥",
  "You have a permanent VIP pass to my heart, my hoodies, and my undivided attention. ♥",
  "Just a tiny note to say I’m really, really proud of you—for everything you do and everything you are. ✨",
  "Warning: Finding this secret may result in sudden attacks of affection, random kisses, and me missing you 24/7. ♥",
  "Every ordinary day feels like my favorite memory just because I get to share it with you. ♥",
  "You’re my safe place, my favorite laugh, and my best friend all rolled into one. ♥",
  "I hope today treats you as kindly as you treat me every single day. Love you endlessly! ♥",
  "Fun fact: My smile gets about 10x bigger the second your name pops up on my screen. ^^",
  "Redeemable immediately: One long cuddle session, zero interruptions, and me telling you how much I adore you. ♥",
  "Thank you for being my home, my peace, and my favorite adventure since day one. ♥",
  "Just in case nobody told you yet today: You’re incredible, and I’m the luckiest person alive to call you mine. ♥",
  "Always and only you, Kash—today, tomorrow, and every day after that. ♥"
];

interface HiddenSecretProps {
  symbol?: string; // e.g. "♥" or "✨"
}

export default function HiddenSecret({ symbol = "♥" }: HiddenSecretProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isMoved, setIsMoved] = useState(false);
  const [revealCount, setRevealCount] = useState(0);

  const handleReveal = () => {
    const randomIndex = Math.floor(Math.random() * LOVE_MESSAGES.length);
    setCurrentMessage(LOVE_MESSAGES[randomIndex]);
    setIsMoved(true);
    setRevealCount((prev) => prev + 1);
    setIsOpen(true);
  };

  return (
    <span className="relative inline-block mx-1">
      {/* 
        Blends right into your background theme (tiny size, inherits color, subtle opacity),
        and slides/rotates gracefully out of place when clicked.
      */}
      <span
        onClick={handleReveal}
        className={`cursor-pointer inline-block text-xs opacity-60 hover:opacity-100 transition-all duration-500 select-none ${
          isMoved ? "translate-x-6 -translate-y-4 rotate-12 scale-110" : "translate-x-0 translate-y-0"
        }`}
        title="What's this?..."
      >
        {symbol}
      </span>

      {/* The cute post-it note popup revealed underneath */}
      {isOpen && (
        <div className="absolute top-6 left-0 bg-[#fff0f3] border border-[#ffccd5] p-3 rounded-xl shadow-xl w-64 z-50 text-left font-sans text-xs text-[#4a3538] animate-fade-in">
          <div className="flex justify-between items-center mb-1.5">
            <span className="font-semibold text-[#d96b83] font-hand text-sm">
              ✨ Secret note #{revealCount}
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-600 text-sm font-bold px-1"
            >
              ×
            </button>
          </div>
          <p className="m-0 leading-relaxed font-serif">
            "{currentMessage}"
          </p>
          <button 
            onClick={() => setIsOpen(false)}
            className="mt-2 text-[10px] text-stone-500 hover:text-stone-700 underline bg-transparent border-none p-0 cursor-pointer"
          >
            Hide back
          </button>
        </div>
      )}
    </span>
  );
}