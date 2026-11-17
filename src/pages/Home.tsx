import { Gift, Sparkles } from 'lucide-react';
import { siteData } from '@/siteData';
import type { PageId } from '@/components/Navbar';
import ParticleField from '@/components/ParticleField';
import RelationshipCounter from '@/components/RelationshipCounter';
import RandomSurprise from '@/components/RandomSurprise';

interface HomeProps {
  onNavigate: (page: PageId) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 via-blush-50 to-lavender-50 pb-20">
      <ParticleField count={18} type="mixed" />

      {/* Hero Section */}
      <section className="relative pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <p className="font-hand text-2xl text-blush-500 mb-2">For my favorite person, Kash</p>
            <h1 className="font-hand text-5xl sm:text-7xl gradient-text mb-2">
              Always & Only You
            </h1>
            <p className="font-serif italic text-lg sm:text-xl text-lavender-700 tracking-wide mb-6">
              Kash & Pooja
            </p>
          </div>

          {/* Couple Photo */}
          <div className="relative inline-block animate-fade-in-up mb-8" style={{ animationDelay: '0.2s' }}>
          <div className="scrapbook-photo rounded-lg overflow-hidden rotate-[-4deg] hover:rotate-0 transition-transform duration-500">
              <img
                src="/pictures/pic60.jpeg"
                alt="Us together"
                className="w-48 sm:w-60 h-auto object-cover"
              />
            </div>
            <div className="absolute -top-3 -right-3 text-3xl animate-heartbeat">💕</div>
          </div>

          {/* Intro */}
          <p
            className="font-serif text-base sm:text-lg text-lavender-700 leading-relaxed max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            From the moment we met on June 15, 2025, you became my favorite person to talk to, laugh with, and come home to. Consider this a small digital scrapbook of us — made with way too much love, just for you, baby^^.
          </p>

          {/* Random Surprise */}
          <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <RandomSurprise onNavigate={onNavigate} />
          </div>
        </div>
      </section>

      {/* Birthday Section -> Navigates directly to BirthdayPage */}
      <section className="relative px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-3xl p-8 sm:p-10 text-center shadow-xl border-2 border-blush-200/70">
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
              onClick={() => onNavigate('birthday')}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blush-400 to-lavender-500 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Gift size={20} className="group-hover:rotate-12 transition-transform" />
              There's something waiting for you...
            </button>
          </div>
        </div>
      </section>

      {/* Relationship Counter */}
      <section className="relative px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-hand text-3xl sm:text-4xl text-blush-600 mb-2">
            We have been us for...
          </h2>
          <p className="text-lavender-600 text-sm mb-6">
            Every second is a treasure. Here is the count.
          </p>
          <RelationshipCounter />
        </div>
      </section>
    </div>
  );
}