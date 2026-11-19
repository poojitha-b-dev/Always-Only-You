import { useState, useEffect, useRef } from 'react';
import ParticleField from '@/components/ParticleField';
import RelationshipCounter from '@/components/RelationshipCounter';
import { LOVE_MESSAGES } from '@/siteData';
import type { PageId } from '@/components/Navbar';

interface HomeProps {
  onNavigate: (page: PageId) => void;
}

export default function Home({ onNavigate: _onNavigate }: HomeProps) {
  const [activePopup, setActivePopup] = useState<{
    id: string;
    message: string;
    count: number;
    style: React.CSSProperties;
  } | null>(null);

  // Track clicked dummy icons (pure color toggle, no popup)
  const [clickedDummies, setClickedDummies] = useState<Record<string, boolean>>({});

  // Queue state for non-repeating unique messages
  const [messageQueue, setMessageQueue] = useState<string[]>([]);
  const [totalSeenCount, setTotalSeenCount] = useState(0);

  const elementRefs = useRef<Record<string, HTMLDivElement | HTMLSpanElement | null>>({});
  const photoAnchorRef = useRef<HTMLDivElement | null>(null);

  const toggleDummyIcon = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setClickedDummies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getNextUniqueMessage = () => {
    let queue = [...messageQueue];
    if (queue.length === 0) {
      queue = [...LOVE_MESSAGES];
      // Fisher-Yates shuffle
      for (let i = queue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [queue[i], queue[j]] = [queue[j], queue[i]];
      }
    }
    const nextMsg = queue.pop()!;
    setMessageQueue(queue);
    setTotalSeenCount((prev) => prev + 1);
    return nextMsg;
  };

  const handleReveal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    // Toggle close if clicking the exact same open button
    if (activePopup?.id === id) {
      setActivePopup(null);
      return;
    }

    const el = elementRefs.current[id];
    const popupWidth = 270;
    const popupHeight = 160;
    const navBarLimit = 95;
    const footerLimit = window.innerHeight - 95;

    let leftPos = window.innerWidth / 2 - popupWidth / 2;
    let topPos = 140;

    // For the two red hearts next to Kash & Pooja, place the box to the left or right of the photo
    if ((id === 'heart-left' || id === 'heart-right') && photoAnchorRef.current) {
      const photoRect = photoAnchorRef.current.getBoundingClientRect();
      const gap = 18;

      if (id === 'heart-left') {
        leftPos = photoRect.left - popupWidth - gap;
        if (leftPos < 12) {
          leftPos = photoRect.right + gap;
        }
      } else {
        leftPos = photoRect.right + gap;
        if (leftPos + popupWidth > window.innerWidth - 12) {
          leftPos = photoRect.left - popupWidth - gap;
        }
      }

      if (leftPos < 12) leftPos = 12;
      if (leftPos + popupWidth > window.innerWidth - 12) {
        leftPos = window.innerWidth - popupWidth - 12;
      }

      topPos = photoRect.top + photoRect.height / 2 - popupHeight / 2;
    } else if (el) {
      const rect = el.getBoundingClientRect();

      if (rect.left > window.innerWidth / 2) {
        leftPos = rect.left - popupWidth - 12;
      } else {
        leftPos = rect.right + 12;
      }

      if (leftPos < 16) leftPos = 16;
      if (leftPos + popupWidth > window.innerWidth - 16) {
        leftPos = window.innerWidth - popupWidth - 16;
      }

      topPos = rect.top + rect.height / 2 - popupHeight / 2;
    }

    if (topPos < navBarLimit) topPos = navBarLimit + 10;
    if (topPos + popupHeight > footerLimit) topPos = footerLimit - popupHeight - 10;

    const nextMsg = getNextUniqueMessage();

    setActivePopup({
      id,
      message: nextMsg,
      count: totalSeenCount + 1,
      style: {
        position: 'fixed',
        left: `${leftPos}px`,
        top: `${topPos}px`,
        width: `${popupWidth}px`,
        zIndex: 99999,
      },
    });
  };

  // Universal dismissal for active popup
  useEffect(() => {
    if (!activePopup) return;
    const handleClose = () => setActivePopup(null);
    window.addEventListener('click', handleClose);
    window.addEventListener('touchstart', handleClose);
    window.addEventListener('keydown', handleClose);
    window.addEventListener('scroll', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
      window.removeEventListener('touchstart', handleClose);
      window.removeEventListener('keydown', handleClose);
      window.removeEventListener('scroll', handleClose);
    };
  }, [activePopup]);

  const secretIcons = [
    { id: 'sec-1', symbol: '♥', style: { top: '18%', left: '6%' } },
    { id: 'sec-2', symbol: '♦', style: { top: '28%', right: '6%' } },
    { id: 'sec-3', symbol: '✨', style: { top: '55%', left: '5%' } },
    { id: 'sec-4', symbol: '♥', style: { top: '75%', right: '6%' } },
    { id: 'sec-5', symbol: '♦', style: { top: '90%', left: '7%' } },
  ];

  const dummyIcons = [
    { id: 'dum-1', symbol: '♡', style: { top: '13%', left: '14%' } },
    { id: 'dum-2', symbol: '✦', style: { top: '15%', right: '15%' } },
    { id: 'dum-3', symbol: '♥', style: { top: '24%', left: '4%' } },
    { id: 'dum-4', symbol: '♡', style: { top: '35%', right: '5%' } },
    { id: 'dum-5', symbol: '✦', style: { top: '44%', left: '7%' } },
    { id: 'dum-6', symbol: '♦', style: { top: '48%', right: '8%' } },
    { id: 'dum-7', symbol: '♡', style: { top: '63%', left: '8%' } },
    { id: 'dum-8', symbol: '✦', style: { top: '66%', right: '4%' } },
    { id: 'dum-9', symbol: '♥', style: { top: '82%', left: '4%' } },
    { id: 'dum-10', symbol: '♡', style: { top: '85%', right: '12%' } },
    { id: 'dum-11', symbol: '✦', style: { top: '93%', right: '6%' } },
    { id: 'dum-12', symbol: '♦', style: { top: '96%', left: '16%' } },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 via-blush-50 to-lavender-50 pb-12 relative overflow-x-hidden">
      <ParticleField count={18} type="mixed" />

      {/* Secret Icons (open secret note popup) */}
      {secretIcons.map((item) => (
        <div
          key={item.id}
          ref={(el) => (elementRefs.current[item.id] = el)}
          className="absolute z-10 pointer-events-auto"
          style={item.style}
        >
          <span
            onClick={(e) => handleReveal(item.id, e)}
            className="cursor-pointer inline-block text-xs sm:text-sm text-stone-400 hover:text-blush-500 opacity-60 hover:opacity-100 hover:scale-125 transition-all select-none p-2"
          >
            {item.symbol}
          </span>
        </div>
      ))}

      {/* Dummy Icons (clickable, change color on click, no message) */}
      {dummyIcons.map((item) => {
        const isClicked = !!clickedDummies[item.id];
        return (
          <div
            key={item.id}
            className="absolute z-10 pointer-events-auto"
            style={item.style}
          >
            <span
              onClick={(e) => toggleDummyIcon(item.id, e)}
              className={`cursor-pointer inline-block text-xs sm:text-sm transition-all duration-200 select-none p-2 hover:scale-125 ${
                isClicked
                  ? 'text-rose-500 opacity-100 scale-110'
                  : 'text-stone-400 hover:text-lavender-600 opacity-60 hover:opacity-100'
              }`}
            >
              {item.symbol}
            </span>
          </div>
        );
      })}

      {/* Hero Section */}
      <section className="relative pt-24 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <p className="font-hand text-2xl text-blush-500 mb-2">For my favorite person, Kash</p>
            <h1 className="font-hand text-5xl sm:text-7xl gradient-text mb-2">
              Always & Only You
            </h1>

            {/* Names with Secure Inline Hearts */}
            <p className="font-serif italic text-lg sm:text-xl text-lavender-700 tracking-wide mb-6 flex items-center justify-center gap-2">
              <span
                ref={(el) => (elementRefs.current['heart-left'] = el)}
                onClick={(e) => handleReveal('heart-left', e)}
                className="cursor-pointer inline-block text-rose-500 hover:text-rose-600 text-lg transition-transform hover:scale-125 select-none px-1"
              >
                ♥
              </span>
              <span>Kash & Pooja</span>
              <span
                ref={(el) => (elementRefs.current['heart-right'] = el)}
                onClick={(e) => handleReveal('heart-right', e)}
                className="cursor-pointer inline-block text-rose-500 hover:text-rose-600 text-lg transition-transform hover:scale-125 select-none px-1"
              >
                ♥
              </span>
            </p>
          </div>

          {/* Couple Photo (slightly bigger) */}
          <div
            ref={photoAnchorRef}
            className="relative inline-block animate-fade-in-up mb-6 z-0"
          >
            <div className="scrapbook-photo rounded-lg overflow-hidden rotate-[-4deg]">
              <img
                src="/pictures/pic60.jpeg"
                alt="Us together"
                className="w-44 sm:w-56 h-auto object-cover"
              />
            </div>
          </div>

          <p className="font-serif text-base sm:text-lg text-lavender-700 leading-relaxed max-w-2xl mx-auto mb-4">
            From the moment we met on July 13, 2025, you became my favorite person to talk to, laugh with, and come home to. Consider this a small digital scrapbook of us — made with way too much love, just for you, baby^^.
          </p>
        </div>
      </section>

      {/* Relationship Counter */}
      <section className="relative px-4 py-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-hand text-3xl sm:text-4xl text-blush-600 mb-2">
            We have been us for...
          </h2>
          <RelationshipCounter />
        </div>
      </section>

      {/* Single Active Popup */}
      {activePopup && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={activePopup.style}
          className="bg-[#fff0f3] border-2 border-[#ffccd5] p-4 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.3)] text-left font-sans text-xs sm:text-sm text-[#4a3538] animate-fade-in pointer-events-auto"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-[#d96b83] font-hand text-base">
              ✨ Secret note
            </span>
            <button
              onClick={() => setActivePopup(null)}
              className="text-stone-400 hover:text-stone-600 text-base font-bold px-1.5"
            >
              ×
            </button>
          </div>
          <p className="m-0 leading-relaxed font-serif text-xs sm:text-sm">
            "{activePopup.message}"
          </p>
          <div className="flex justify-between items-center mt-3 pt-1">
            <span className="text-[10px] text-stone-400 italic">
              (Press any key to close)
            </span>
            <span className="font-hand text-xs text-[#d96b83] font-medium">
              - I love you
            </span>
          </div>
        </div>
      )}
    </div>
  );
}