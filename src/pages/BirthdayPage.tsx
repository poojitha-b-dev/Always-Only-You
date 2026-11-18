import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { BirthdayCake } from '@/components/decor/BirthdayCake';
import { Balloons } from '@/components/decor/Balloons';
import { ConfettiBurst } from '@/components/decor/ConfettiBurst';
import { FloatingHearts, SparkleField } from '@/components/decor/BackgroundDecor';
import { SurpriseReveal } from '@/components/birthday/SurpriseReveal';
import { birthdayContent } from '@/content/birthdayContent';
import { siteData } from '@/siteData';
import { ArrowLeft, Gift, PartyPopper, Sparkles } from 'lucide-react';

interface BirthdayPageProps {
  onBack?: () => void;
}

export default function BirthdayPage({ onBack }: BirthdayPageProps) {
  const [openedSurpriseGate, setOpenedSurpriseGate] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  const blowOutCandles = useCallback(() => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setConfettiActive(true);
    window.setTimeout(() => setConfettiActive(false), 4500);
  }, [candlesLit]);

  const handleSurprise = useCallback(() => {
    setSurpriseOpen(true);
    setConfettiActive(true);
    window.setTimeout(() => setConfettiActive(false), 4500);
  }, []);

  useEffect(() => {
    if (!surpriseOpen) return;
    const onScroll = () => {
      if (window.scrollY < 100 && !confettiActive) {
        setConfettiActive(true);
        window.setTimeout(() => setConfettiActive(false), 4000);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [surpriseOpen, confettiActive]);

  const c = birthdayContent;

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-cream-50 via-blush-50 to-lavender-50">
      {/* Go Back button */}
      {onBack && (
        <motion.button
          type="button"
          onClick={onBack}
          className="fixed top-5 left-5 z-30 flex items-center gap-2 rounded-full bg-cream/85 px-4 py-2 font-sans text-sm font-medium text-inkSoft shadow-soft backdrop-blur transition-colors hover:bg-cream hover:text-rose-dark"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <ArrowLeft className="h-4 w-4 text-rose" />
          Go Back
        </motion.button>
      )}

      {/* Background decor (Only active balloons/confetti after opening gate) */}
      <FloatingHearts count={16} />
      <SparkleField count={20} />
      {openedSurpriseGate && <Balloons count={9} className="opacity-80" />}
      <ConfettiBurst active={confettiActive} count={90} />

      {/* INTRODUCTORY SURPRISE GATE CARD (Original styling & size) */}
      {!openedSurpriseGate ? (
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
          <motion.div
            className="glass-card w-full max-w-3xl rounded-3xl p-8 sm:p-10 text-center shadow-xl border-2 border-blush-200/70 bg-white/95"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, type: 'spring' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush-100 text-blush-600 text-xs uppercase tracking-widest mb-4">
              <Sparkles size={14} />
              Special Surprise
            </div>

            <h2 className="font-hand text-3xl sm:text-4xl text-blush-600 mb-3">
              {siteData.birthdayTitle}
            </h2>

            <p className="font-serif text-lavender-700 text-sm sm:text-base max-w-lg mx-auto mb-6">
              Because you make my days brighter, I saved a little birthday surprise right here for you...
            </p>

            <button
              type="button"
              onClick={() => {
                setOpenedSurpriseGate(true);
                setConfettiActive(true);
                setTimeout(() => setConfettiActive(false), 4000);
              }}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blush-400 to-lavender-500 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mx-auto"
            >
              <Gift size={20} className="group-hover:rotate-12 transition-transform" />
              There's something waiting for you...
            </button>
          </motion.div>
        </div>
      ) : (
        /* MAIN BIRTHDAY CONTENT & SURPRISE REVEAL */
        <div className="relative z-10 flex min-h-screen flex-col items-center px-4 py-12 sm:py-16 animate-fade-in">
          {/* Kicker */}
          <motion.p
            className="mb-3 flex items-center gap-2 rounded-full bg-cream/80 px-4 py-1.5 font-sans text-xs uppercase tracking-[0.25em] text-rose shadow-soft backdrop-blur sm:text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {c.kicker}
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="max-w-2xl text-center font-serif text-4xl font-semibold leading-tight text-ink text-balance sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <span className="shimmer-text">{c.headline}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-4 max-w-md text-center font-sans text-base leading-relaxed text-inkSoft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {c.subtitle}
          </motion.p>

          {/* Cake */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 90 }}
          >
            <BirthdayCake
              candleCount={5}
              lit={candlesLit}
              showHint
              onBlowOut={blowOutCandles}
            />
          </motion.div>

          {/* Cake-blown confirmation */}
          <AnimatePresence>
            {!candlesLit && !surpriseOpen && (
              <motion.p
                className="mt-20 font-hand text-2xl text-rose-dark"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Wish made. Now… there's one more thing.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Surprise button */}
          <AnimatePresence>
            {!surpriseOpen && (
              <motion.div
                className="mt-20"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  type="button"
                  onClick={handleSurprise}
                  className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-rose to-rose-dark px-7 py-4 font-sans text-base font-medium text-cream shadow-glow"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Gift className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  {c.surpriseButtonLabel}
                  <PartyPopper className="h-5 w-5 transition-transform group-hover:-rotate-12" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Surprise reveal */}
          <AnimatePresence>
            {surpriseOpen && (
              <SurpriseReveal
                heading={c.revealHeading}
                message={c.revealMessage}
                photos={c.photos}
                wishes={c.wishes}
                signOff={c.signOff}
              />
            )}
          </AnimatePresence>

          {/* Footer note */}
          <motion.p
            className="mt-16 max-w-sm text-center font-hand text-xl text-inkSoft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            This little place stays open all year — come back whenever you need a smile.❤️
          </motion.p>
        </div>
      )}
    </main>
  );
}