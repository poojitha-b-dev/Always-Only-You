import { motion } from 'framer-motion';
import type { BirthdayPhoto, BirthdayWish } from '@/content/birthdayContent';
import { Gift, Heart } from 'lucide-react';

interface SurpriseRevealProps {
  heading: string;
  message: string;
  photos: BirthdayPhoto[];
  wishes: BirthdayWish[];
  signOff: string;
}

/** The revealed surprise: a personal message, polaroid photos, and wish cards. */
export function SurpriseReveal({ heading, message, photos, wishes, signOff }: SurpriseRevealProps) {
  return (
    <motion.section
      className="mx-auto mt-10 w-full max-w-3xl"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Personal message card */}
      <div className="relative rounded-3xl bg-cream/95 p-8 shadow-card sm:p-10">
        <div className="mb-4 flex items-center justify-center gap-2 text-rose">
          <Gift className="h-5 w-5" />
          <span className="font-hand text-2xl">{heading}</span>
          <Heart className="h-5 w-5" fill="currentColor" />
        </div>
        <p className="mx-auto max-w-xl text-center font-serif text-lg leading-relaxed text-ink sm:text-xl">
          {message}
        </p>
        <p className="mt-5 text-center font-hand text-2xl text-rose-dark">{signOff}</p>
      </div>

      {/* Polaroid photos */}
      <div className="mt-10 flex flex-wrap items-start justify-center gap-6">
        {photos.map((photo, i) => (
          <motion.figure
            key={i}
            className="relative w-52 rounded-sm bg-white p-3 pb-14 shadow-card"
            style={{ transform: `rotate(${photo.rotate}deg)` }}
            initial={{ opacity: 0, y: 30, rotate: photo.rotate - 6 }}
            animate={{ opacity: 1, y: 0, rotate: photo.rotate }}
            transition={{ delay: 0.3 + i * 0.2, type: 'spring', stiffness: 120 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
          >
            <div className="w-full overflow-hidden rounded-sm bg-blush/20 flex items-center justify-center">
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-auto object-contain max-h-[280px]"
              />
            </div>
            <figcaption className="absolute bottom-3 left-3 right-3 text-center font-hand text-lg text-ink leading-tight">
              {photo.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      {/* Wishes */}
      <div className="mt-12">
        <h3 className="mb-5 text-center font-serif text-2xl text-ink">Little wishes for your year</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {wishes.map((wish, i) => (
            <motion.div
              key={i}
              className="rounded-2xl bg-white/80 p-4 shadow-soft backdrop-blur-sm"
              initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.12 }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-start gap-3">
                <Heart className="mt-0.5 h-4 w-4 shrink-0 text-rose" fill="currentColor" />
                <p className="font-serif text-base leading-relaxed text-ink">{wish.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}