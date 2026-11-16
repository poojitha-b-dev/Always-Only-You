import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: { url: string; title: string; description: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const next = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const prev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [next, prev, onClose]);

  if (!images[currentIndex]) return null;
  const image = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors z-10"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      <div
        className="relative max-w-3xl w-full animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.url}
          alt={image.title}
          className="w-full max-h-[70vh] object-contain rounded-2xl"
        />
        <div className="mt-4 text-center">
          <h3 className="font-hand text-2xl text-white">{image.title}</h3>
          <p className="text-white/80 text-sm mt-1">{image.description}</p>
        </div>
      </div>
    </div>
  );
}
