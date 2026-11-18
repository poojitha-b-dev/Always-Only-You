import ParticleField from '@/components/ParticleField';
import RelationshipCounter from '@/components/RelationshipCounter';
import type { PageId } from '@/components/Navbar';

interface HomeProps {
  onNavigate: (page: PageId) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 via-blush-50 to-lavender-50 pb-12">
      <ParticleField count={18} type="mixed" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-8 px-4">
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
          <div className="relative inline-block animate-fade-in-up mb-6">
            <div className="scrapbook-photo rounded-lg overflow-hidden rotate-[-4deg]">
              <img
                src="/pictures/pic60.jpeg"
                alt="Us together"
                className="w-36 sm:w-44 h-auto object-cover"
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
    </div>
  );
}