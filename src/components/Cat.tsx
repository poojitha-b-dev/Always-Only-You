interface CatProps {
  type: 'happy' | 'sad' | 'neutral';
  size?: number;
  className?: string;
}

export default function Cat({ type, size = 80, className = '' }: CatProps) {
  const animation =
    type === 'happy'
      ? 'animate-dancing-cat'
      : type === 'sad'
        ? 'animate-crying-cat'
        : 'animate-gentle-float';

  const eyeColor = type === 'sad' ? '#7660d9' : '#2d2d2d';
  const mouth =
    type === 'happy'
      ? 'M30 52 Q40 62 50 52 Q60 62 70 52'
      : type === 'sad'
        ? 'M30 58 Q40 50 50 58 Q60 50 70 58'
        : 'M35 54 Q50 58 65 54';

  const tears = type === 'sad';

  return (
    <div className={`inline-block ${animation} ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} className="overflow-visible">
        {/* Ears */}
        <polygon points="22,28 30,12 40,30" fill="#ffaccb" stroke="#ec3770" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="78,28 70,12 60,30" fill="#ffaccb" stroke="#ec3770" strokeWidth="2" strokeLinejoin="round" />
        {/* Inner ears */}
        <polygon points="26,26 30,17 35,26" fill="#ff7aa9" />
        <polygon points="74,26 70,17 65,26" fill="#ff7aa9" />

        {/* Head */}
        <circle cx="50" cy="50" r="30" fill="#ffe9f0" stroke="#ec3770" strokeWidth="2.5" />

        {/* Eyes */}
        {type === 'happy' ? (
          <>
            <path d="M32 44 Q36 40 40 44" stroke={eyeColor} strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M60 44 Q64 40 68 44" stroke={eyeColor} strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="36" cy="44" r="4" fill={eyeColor} />
            <circle cx="64" cy="44" r="4" fill={eyeColor} />
            {tears && (
              <>
                <ellipse cx="36" cy="54" rx="2" ry="5" fill="#7660d9" opacity="0.6" className="animate-gentle-float" />
                <ellipse cx="64" cy="54" rx="2" ry="5" fill="#7660d9" opacity="0.6" className="animate-gentle-float" />
              </>
            )}
          </>
        )}

        {/* Nose */}
        <path d="M48 49 L52 49 L50 52 Z" fill="#ff7aa9" />

        {/* Mouth */}
        <path d={mouth} stroke={eyeColor} strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Whiskers */}
        <line x1="18" y1="50" x2="32" y2="48" stroke="#ec3770" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="18" y1="54" x2="32" y2="54" stroke="#ec3770" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="82" y1="50" x2="68" y2="48" stroke="#ec3770" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="82" y1="54" x2="68" y2="54" stroke="#ec3770" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />

        {/* Blush (happy only) */}
        {type === 'happy' && (
          <>
            <circle cx="30" cy="54" r="4" fill="#ff7aa9" opacity="0.3" />
            <circle cx="70" cy="54" r="4" fill="#ff7aa9" opacity="0.3" />
          </>
        )}
      </svg>
    </div>
  );
}
