import { useState, useEffect } from 'react';
import { Cat } from 'lucide-react';
import Navbar, { type PageId } from '@/components/Navbar';
import Welcome from '@/pages/Welcome';
import Home from '@/pages/Home';
import LoveMe from '@/pages/LoveMe';
import OpenWhen from '@/pages/OpenWhen';
import Memories from '@/pages/Memories';
import ThingsILove from '@/pages/ThingsILove';
import Letter from '@/pages/Letter';
import BirthdayPage from '@/pages/BirthdayPage';

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

  const isBirthday = currentPage === 'birthday';

  return (
    <div className="relative min-h-screen">
      {!isBirthday && <Navbar currentPage={currentPage} onNavigate={handleNavigate} />}

      <main className={`transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
        {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
        {currentPage === 'love-me' && <LoveMe />}
        {currentPage === 'open-when' && <OpenWhen />}
        {currentPage === 'memories' && <Memories />}
        {currentPage === 'things-i-love' && <ThingsILove />}
        {currentPage === 'letter' && <Letter />}
        {currentPage === 'birthday' && <BirthdayPage onBack={() => handleNavigate('home')} />}
      </main>

      {/* Easter Egg: Hidden cat in footer */}
      {!isBirthday && (
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
              Made with love, for Kash ♥
            </p>
          </div>
        </footer>
      )}

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-blush-100/65 backdrop-blur-md px-4 py-6 animate-fade-in"
          onClick={() => setShowEasterEgg(false)}
        >
          <div
            className="relative bg-white/95 border-2 border-blush-200 rounded-3xl px-6 py-7 sm:px-10 sm:py-8 w-[92%] max-w-xl text-center shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl sm:text-5xl mb-2 animate-bounce-happy">🐱✨</div>
            <h3 className="font-hand text-3xl sm:text-4xl gradient-text mb-2">
              You found the secret cat!
            </h3>
            <p className="font-serif text-xs sm:text-sm text-lavender-700 leading-relaxed mb-4 max-w-md mx-auto">
              Well, well, well... someone couldn't resist poking the tiny cat five times. Welcome
              to the VIP corner!
            </p>
            <p className="font-hand text-xl text-blush-600 mb-3">
              Here is your secret message:
            </p>
            <div className="note-paper rounded-2xl px-5 py-4 sm:px-7 sm:py-5">
              <p className="font-hand text-lg sm:text-xl text-lavender-800 leading-relaxed">
                "Okay detective Kash, you really clicked a tiny cat five times just to see what
                would happen? Honestly, that level of curiosity is half the reason I fell for you.
                Your reward: one unlimited voucher for extra hugs, forehead kisses, and me never
                letting you forget how much I adore you. ♥"
              </p>
            </div>
            <button
              onClick={() => setShowEasterEgg(false)}
              className="mt-5 px-7 py-2.5 rounded-full bg-gradient-to-r from-blush-400 to-lavender-500 text-white font-medium shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}