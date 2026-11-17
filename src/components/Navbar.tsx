import { Home, Heart, Mail, BookOpen, Star, BookText, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export type PageId =
  | 'home'
  | 'love-me'
  | 'open-when'
  | 'memories'
  | 'things-i-love'
  | 'letter'
  | 'birthday';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const navItems: { id: PageId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'love-me', label: 'Do You Love Me?', icon: Heart },
  { id: 'open-when', label: 'Open When...', icon: Mail },
  { id: 'memories', label: 'Our Memories', icon: BookOpen },
  { id: 'things-i-love', label: 'Things I Love About You', icon: Star },
  { id: 'letter', label: 'My Letter', icon: BookText },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-cream-50/90 backdrop-blur-md shadow-md py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() => handleNav('home')}
            className="font-hand text-2xl text-blush-600 hover:text-blush-500 transition-colors"
          >
            Always & Only You ♥
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blush-200 text-blush-700'
                      : 'text-blush-600 hover:bg-blush-100 hover:text-blush-500'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-full bg-blush-100 text-blush-600 hover:bg-blush-200 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-blush-50/95 backdrop-blur-sm pt-20">
            <div className="flex flex-col items-center gap-3 p-6">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-lg font-medium transition-all w-full max-w-xs justify-center animate-fade-in-up ${
                      isActive
                        ? 'bg-blush-200 text-blush-700'
                        : 'bg-white/80 text-blush-600 hover:bg-blush-100'
                    }`}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <Icon size={20} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}