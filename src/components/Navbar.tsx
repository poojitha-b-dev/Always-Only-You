import { Home, Heart, Mail, BookOpen, Star, Menu, X, FolderHeart, BookText, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import type { UserProfile } from '@/types';

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
  currentUser: UserProfile;
}

const mainNavItems = [
  { id: 'home' as PageId, label: 'Home', icon: Home },
  { id: 'love-me' as PageId, label: 'Do You Love Me?', icon: Heart },
  { id: 'open-when' as PageId, label: 'Open When...', icon: Mail },
  { id: 'memories' as PageId, label: 'Our Memories', icon: BookOpen },
  { id: 'things-i-love' as PageId, label: 'Things I Love About You', icon: Star },
];

const vaultItems = [
  { id: 'birthday' as PageId, label: 'Collections', icon: FolderHeart },
  { id: 'letter' as PageId, label: 'Notes & Letters', icon: BookText },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [vaultOpen, setVaultOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const vaultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (vaultRef.current && !vaultRef.current.contains(event.target as Node)) {
        setVaultOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
    setVaultOpen(false);
  };

  const isVaultActive = currentPage === 'birthday' || currentPage === 'letter';

  return (
    <>
      {/* Desktop Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-cream-50/90 backdrop-blur-md shadow-md py-2'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between gap-8 lg:gap-14">
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-blush-600 hover:text-blush-500 transition-colors shrink-0 mr-auto group"
          >
            <img
              src="/pictures/pic5.png"
              alt="Always & Only You logo"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-blush-200 shadow-sm group-hover:scale-105 transition-transform"
            />
            <span className="font-hand text-[26px] leading-none">Always & Only You ♥</span>
          </button>

          {/* Desktop links anchored to the right with extra space from the brand */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blush-200 text-blush-700 shadow-sm'
                      : 'text-blush-600 hover:bg-blush-100 hover:text-blush-500'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}

            {/* Our Vault Dropdown */}
            <div className="relative" ref={vaultRef}>
              <button
                onClick={() => setVaultOpen(!vaultOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isVaultActive
                    ? 'bg-blush-200 text-blush-700 shadow-sm'
                    : 'text-blush-600 hover:bg-blush-100 hover:text-blush-500'
                }`}
              >
                <FolderHeart size={16} />
                <span>Our Vault</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${vaultOpen ? 'rotate-180' : ''}`} />
              </button>

              {vaultOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-blush-200 p-2 z-50 animate-fade-in">
                  {vaultItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                          isActive
                            ? 'bg-blush-200 text-blush-700'
                            : 'text-blush-600 hover:bg-blush-50'
                        }`}
                      >
                        <Icon size={16} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
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
              {[...mainNavItems, ...vaultItems].map((item, idx) => {
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