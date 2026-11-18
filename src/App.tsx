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
import type { UserProfile, NoteItem } from '@/types';

const SECURITY_KEY = 'security-passed';
const USER_KEY = 'active-user';
const LOGIN_TIME_KEY = 'login-timestamp';
const NOTES_KEY = 'shared-notes-vault';
const LETTERS_KEY = 'shared-letters-vault';

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

export default function App() {
  const [securityPassed, setSecurityPassed] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [transitioning, setTransitioning] = useState(false);
  const [easterEggFound, setEasterEggFound] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [catClicks, setCatClicks] = useState(0);

  const [activePopupItem, setActivePopupItem] = useState<{ item: NoteItem; type: 'note' | 'letter' } | null>(null);

  useEffect(() => {
    try {
      const loginTime = localStorage.getItem(LOGIN_TIME_KEY);
      const now = Date.now();

      if (loginTime && now - parseInt(loginTime, 10) > TWO_DAYS_MS) {
        localStorage.removeItem(LOGIN_TIME_KEY);
        sessionStorage.clear();
        setSecurityPassed(false);
        setCurrentUser(null);
        return;
      }

      if (sessionStorage.getItem(SECURITY_KEY) === 'true') {
        setSecurityPassed(true);
      }
      const savedUser = sessionStorage.getItem(USER_KEY) as UserProfile;
      if (savedUser) {
        setCurrentUser(savedUser);
        checkUnreadNotes(savedUser);
      }
    } catch {
      // ignore
    }
  }, []);

  const checkUnreadNotes = (user: UserProfile) => {
    try {
      const rawNotes = localStorage.getItem(NOTES_KEY);
      const rawLetters = localStorage.getItem(LETTERS_KEY);
      
      const notes: NoteItem[] = rawNotes ? JSON.parse(rawNotes) : [];
      const letters: NoteItem[] = rawLetters ? JSON.parse(rawLetters) : [];
      
      const unreadNotes = notes.filter((n) => n.recipient === user && !n.isRead);
      const unreadLetters = letters.filter((l) => l.recipient === user && !l.isRead);

      if (unreadNotes.length > 0) {
        setActivePopupItem({ item: unreadNotes[0], type: 'note' });
      } else if (unreadLetters.length > 0) {
        setActivePopupItem({ item: unreadLetters[0], type: 'letter' });
      }
    } catch {
      // ignore
    }
  };

  const handlePassSecurity = () => {
    try {
      sessionStorage.setItem(SECURITY_KEY, 'true');
    } catch {
      // ignore
    }
    setSecurityPassed(true);
  };

  const handleSelectUser = (user: UserProfile) => {
    try {
      sessionStorage.setItem(USER_KEY, user);
      localStorage.setItem(LOGIN_TIME_KEY, Date.now().toString());
    } catch {
      // ignore
    }
    setCurrentUser(user);
    setCurrentPage('home');
    checkUnreadNotes(user);
  };

  const handleOpenUnreadMessage = () => {
    if (!activePopupItem) return;
    try {
      const storageKey = activePopupItem.type === 'letter' ? LETTERS_KEY : NOTES_KEY;
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const items: NoteItem[] = JSON.parse(raw);
        const updated = items.map((n) =>
          n.id === activePopupItem.item.id ? { ...n, isRead: true } : n
        );
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
    } catch {
      // ignore
    }

    setActivePopupItem(null);
    setCurrentPage('letter');
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

  if (!securityPassed) {
    return <Welcome onPassSecurity={handlePassSecurity} />;
  }

  if (!currentUser) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-lavender-100 via-blush-100 to-cream-100 flex items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-md">
          <div className="glass-card rounded-3xl p-8 sm:p-10 text-center shadow-2xl animate-fade-in-up">
            <div className="text-5xl mb-4 animate-gentle-float">💖</div>
            <h1 className="font-hand text-3xl sm:text-4xl text-blush-700 mb-2">
              Always & Only You
            </h1>
            <p className="text-lavender-600 text-sm mb-8">
              Who is opening our little world right now?
            </p>

            <div className="space-y-4 mb-6">
              <button
                onClick={() => handleSelectUser('pooja')}
                className="w-full py-4 rounded-2xl font-hand text-2xl bg-white/80 text-blush-600 hover:bg-blush-100 shadow-md transition-all"
              >
                🌸 Pooja
              </button>
              <button
                onClick={() => handleSelectUser('kash')}
                className="w-full py-4 rounded-2xl font-hand text-2xl bg-white/80 text-lavender-700 hover:bg-lavender-100 shadow-md transition-all"
              >
                💙 Kash
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isBirthday = currentPage === 'birthday';
  const senderName = activePopupItem?.item.sender === 'pooja' ? 'Pooja' : 'Kash';
  const itemTypeLabel = activePopupItem?.type === 'letter' ? 'letter' : 'note';

  return (
    <div className="relative min-h-screen">
      {!isBirthday && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          currentUser={currentUser}
        />
      )}

      {/* Notification popup positioned lower down with a slower, gentle floating motion */}
      {securityPassed && activePopupItem && (
        <div className="fixed top-40 right-40 z-[70] flex flex-col items-end transition-all duration-[2000ms]">
          <div className="w-4 h-4 bg-white border-t-2 border-l-2 border-blush-300 rotate-45 mr-8 -mb-2 shadow-sm relative z-10" />
          
          <div 
            onClick={handleOpenUnreadMessage}
            className="glass-card rounded-3xl px-5 py-4 shadow-2xl border-2 border-blush-300 bg-white/95 cursor-pointer hover:scale-105 transition-all flex flex-col items-center text-center max-w-[220px]"
          >
            <div className="w-12 h-12 rounded-full bg-blush-100 flex items-center justify-center text-2xl shadow-inner mb-2 animate-gentle-float">
              💌
            </div>
            <h4 className="font-hand text-xl text-blush-600 leading-tight">
              New {itemTypeLabel} from {senderName}!
            </h4>
          </div>
        </div>
      )}

      <main className={`transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
        {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
        {currentPage === 'love-me' && <LoveMe />}
        {currentPage === 'open-when' && <OpenWhen />}
        {currentPage === 'memories' && <Memories />}
        {currentPage === 'things-i-love' && <ThingsILove />}
        {currentPage === 'letter' && <Letter currentUser={currentUser} />}
        {currentPage === 'birthday' && <BirthdayPage onBack={() => handleNavigate('home')} />}
      </main>

      {/* Footer */}
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