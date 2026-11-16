import { useState, useEffect } from 'react';
import { Cat } from 'lucide-react';
import { siteData } from '@/siteData';
import Navbar, { type PageId } from '@/components/Navbar';
import Welcome from '@/pages/Welcome';
import Home from '@/pages/Home';
import LoveMe from '@/pages/LoveMe';
import OpenWhen from '@/pages/OpenWhen';
import Memories from '@/pages/Memories';
import ThingsILove from '@/pages/ThingsILove';
import Letter from '@/pages/Letter';

const ENTRY_KEY = 'universe-entered';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [transitioning, setTransitioning] = useState(false);
  const [easterEggFound, setEasterEggFound] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [catClicks, setCatClicks] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(ENTRY_KEY);
      if (saved === 'true') setEntered(true);
    } catch {
      // ignore
    }
  }, []);

  const handleEnter = () => {
    try {
      localStorage.setItem(ENTRY_KEY, 'true');
    } catch {
      // ignore
    }
    setEntered(true);
  };

  const handleNavigate = (page: PageId) => {
    if (page === currentPage) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTransitioning(false);
    }, 300);
  };

  const handleCatClick = () => {
    const next = catClicks + 1;
    setCatClicks(next);
    if (next >= 5 && !easterEggFound) {
      setEasterEggFound(true);
      setShowEasterEgg(true);
    }
  };

  if (!entered) {
    return <Welcome onEnter={handleEnter} />;
  }

  return (
    <div className="relative min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className={`transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
        {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
        {currentPage === 'love-me' && <LoveMe />}
        {currentPage === 'open-when' && <OpenWhen />}
        {currentPage === 'memories' && <Memories />}
        {currentPage === 'things-i-love' && <ThingsILove />}
        {currentPage === 'letter' && <Letter />}
      </main>

      {/* Easter Egg: Hidden cat in footer */}
      <footer className="relative bg-gradient-to-t from-lavender-100 to-transparent py-8 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          {!easterEggFound && (
            <button
              onClick={handleCatClick}
              className="inline-flex items-center gap-1.5 text-xs text-lavender-400 hover:text-lavender-600 transition-colors opacity-60 hover:opacity-100"
              title="..."
            >
              <Cat size={14} />
              <span>psst... {catClicks > 0 && catClicks < 5 && `${5 - catClicks} more...`}</span>
            </button>
          )}
          {easterEggFound && (
            <button
              onClick={() => setShowEasterEgg(true)}
              className="inline-flex items-center gap-1.5 text-xs text-blush-500 hover:text-blush-700 transition-colors"
            >
              <Cat size={14} fill="currentColor" />
              <span>You found a secret ♥</span>
            </button>
          )}
          <p className="mt-3 font-hand text-lg text-blush-600">
            Made with love, for {siteData.boyfriendName} ♥
          </p>
        </div>
      </footer>

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setShowEasterEgg(false)}
        >
          <div
            className="relative glass-card rounded-3xl p-8 max-w-sm text-center animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl mb-4 animate-bounce-happy">🐱✨</div>
            <h3 className="font-hand text-3xl gradient-text mb-3">You found the secret cat!</h3>
            <p className="font-serif text-sm text-lavender-700 leading-relaxed mb-4">
              Congratulations, explorer. You clicked the tiny cat five times and discovered
              a hidden corner of this universe.
            </p>
            <p className="font-hand text-xl text-blush-600 mb-4">
              Here is your secret message:
            </p>
            <div className="note-paper rounded-xl p-4">
              <p className="font-hand text-lg text-lavender-700">
                "If you are reading this, it means you are curious. And curiosity is one of the
                things I love most about you. There is always something new to discover — in this
                little universe, and in you. ♥"
              </p>
            </div>
            <button
              onClick={() => setShowEasterEgg(false)}
              className="mt-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-blush-400 to-lavender-500 text-white font-medium shadow hover:shadow-lg transition-all hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
