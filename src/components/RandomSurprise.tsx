import { Shuffle, Sparkles } from 'lucide-react';
import type { PageId } from './Navbar';

interface RandomSurpriseProps {
  onNavigate: (page: PageId) => void;
}

const surpriseDestinations: { page: PageId; message: string }[] = [
  { page: 'love-me', message: 'Surprise! Answer a very important question...' },
  { page: 'open-when', message: 'Surprise! Open an envelope — it is waiting for you.' },
  { page: 'memories', message: 'Surprise! Let me take you down memory lane.' },
  { page: 'things-i-love', message: 'Surprise! Let me tell you what I love about you.' },
  { page: 'letter', message: 'Surprise! I wrote you a letter. Go read it.' },
];

export default function RandomSurprise({ onNavigate }: RandomSurpriseProps) {
  const handleClick = () => {
    const surprise = surpriseDestinations[Math.floor(Math.random() * surpriseDestinations.length)];
    onNavigate(surprise.page);
  };

  return (
    <button
      onClick={handleClick}
      className="group flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-blush-400 to-lavender-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <Shuffle size={20} className="group-hover:rotate-180 transition-transform duration-500" />
      <Sparkles size={18} className="group-hover:animate-wiggle" />
      Random Surprise
    </button>
  );
}
