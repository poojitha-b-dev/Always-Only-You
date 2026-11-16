import { Heart, Mail, BookOpen, Star, BookText, HelpCircle } from 'lucide-react';
import { siteData } from '@/siteData';
import type { PageId } from '@/components/Navbar';
import ParticleField from '@/components/ParticleField';
import BirthdaySurprise from '@/components/BirthdaySurprise';
import RelationshipCounter from '@/components/RelationshipCounter';
import RandomSurprise from '@/components/RandomSurprise';

interface HomeProps {
  onNavigate: (page: PageId) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const navCards: { page: PageId; label: string; description: string; icon: typeof Heart; gradient: string }[] = [
    {
      page: 'love-me',
      label: 'Do You Love Me?',
      description: 'A very important question with a very obvious answer.',
      icon: HelpCircle,
      gradient: 'from-blush-300 to-blush-500',
    },
    {
      page: 'open-when',
      label: 'Open When...',
      description: 'Envelopes for every mood. Open one whenever you need me.',
      icon: Mail,
      gradient: 'from-lavender-300 to-lavender-500',
    },
    {
      page: 'memories',
      label: 'Our Little Memories',
      description: 'A scrapbook of us — the moments that made us, us.',
      icon: BookOpen,
      gradient: 'from-cream-300 to-peach-400',
    },
    {
      page: 'things-i-love',
      label: 'Things I Love About You',
      description: 'Expand a card. Find a reason. There are many.',
      icon: Star,
      gradient: 'from-peach-300 to-mutedRed-300',
    },
    {
      page: 'letter',
      label: 'A Letter From Me',
      description: 'Words I wrote just for you. Open the envelope.',
      icon: BookText,
      gradient: 'from-lavender-300 to-blush-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 via-blush-50 to-lavender-50">
      <ParticleField count={18} type="mixed" />

      {/* Hero Section */}
      <section className="relative pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <p className="font-hand text-2xl text-blush-500 mb-2">{siteData.homepageGreeting},</p>
            <h1 className="font-hand text-5xl sm:text-7xl gradient-text mb-6">
              {siteData.boyfriendName}
            </h1>
          </div>

          {/* Couple Photo */}
          <div className="relative inline-block animate-fade-in-up mb-8" style={{ animationDelay: '0.2s' }}>
            <div className="scrapbook-photo rounded-lg overflow-hidden rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <img
                src={siteData.couplePhoto}
                alt="Us together"
                className="w-72 sm:w-96 h-auto object-cover"
              />
            </div>
            <div className="absolute -top-3 -right-3 text-3xl animate-heartbeat">💕</div>
          </div>

          {/* Intro */}
          <p className="font-serif text-base sm:text-lg text-lavender-700 leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {siteData.homepageIntro}
          </p>

          {/* Random Surprise */}
          <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <RandomSurprise onNavigate={onNavigate} />
          </div>
        </div>
      </section>

      {/* Birthday Section */}
      <section className="relative px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <BirthdaySurprise
            title={siteData.birthdayTitle}
            message={siteData.birthdayMessage}
            boyfriendName={siteData.boyfriendName}
          />
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
          <RelationshipCounter startDate={siteData.relationshipStartDate} />
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="relative px-4 py-12 pb-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-hand text-3xl sm:text-4xl text-center text-blush-600 mb-8">
            Explore Your Universe
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {navCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.page}
                  onClick={() => onNavigate(card.page)}
                  className="group glass-card rounded-3xl p-6 text-left hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${card.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="font-hand text-2xl text-lavender-800 mb-1">{card.label}</h3>
                  <p className="text-sm text-lavender-600">{card.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-blush-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <Heart size={14} fill="currentColor" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
