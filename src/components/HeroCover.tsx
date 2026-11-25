import { useState } from 'react';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

interface HeroCoverProps {
  onScrollDown: () => void;
  onOpenSlideshow: (index: number) => void;
  musicPlaying: boolean;
  onToggleMusic: () => void;
}

export function HeroCover({
  onScrollDown,
  onOpenSlideshow,
  musicPlaying,
  onToggleMusic,
}: HeroCoverProps) {
  const [imageError, setImageError] = useState(false);
  const coverPhoto = WEDDING_DATA.photos[0];

  return (
    <section
      id="top"
      onClick={() => onOpenSlideshow(0)}
      className="relative h-[100dvh] w-full overflow-hidden bg-zinc-900 select-none cursor-pointer"
      aria-label="청첩장 대표 사진"
    >
      {!imageError ? (
        <img
          src={coverPhoto.src}
          alt={coverPhoto.alt}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="absolute inset-0 h-full w-full object-cover object-[50%_46%] scale-[1.18]"
        />
      ) : (
        <div
          className="absolute inset-0 bg-zinc-900 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="font-editorial text-2xl text-zinc-300">
            {WEDDING_DATA.groom.firstName} · {WEDDING_DATA.bride.firstName}
          </span>
        </div>
      )}

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/75 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 h-full max-w-4xl mx-auto px-6 py-8 md:py-10 flex flex-col justify-between text-white">
        <div className="flex items-center justify-between">
          <span className="text-xs tracking-[0.2em] text-white/85 tabular-nums">
            {WEDDING_DATA.date.shortDate}
          </span>

          <div onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={onToggleMusic}
              aria-label={musicPlaying ? '배경음악 끄기' : '배경음악 켜기'}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white/85 hover:text-white transition-colors cursor-pointer"
            >
              {musicPlaying ? (
                <Volume2 className="w-5 h-5" aria-hidden="true" />
              ) : (
                <VolumeX className="w-5 h-5 opacity-75" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <h1
            className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-white mb-3"
            style={{ textWrap: 'balance' }}
          >
            {WEDDING_DATA.groom.fullName}
            <span className="mx-3 text-white/60 font-normal">·</span>
            {WEDDING_DATA.bride.fullName}
          </h1>
          <p className="text-sm text-white/90 mb-1">
            {WEDDING_DATA.date.displayFull}
          </p>
          <p className="text-xs text-white/75 mb-7">
            {WEDDING_DATA.venue.fullName}
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onScrollDown();
            }}
            aria-label="아래로 내려서 초대장 보기"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronDown className="w-6 h-6 animate-bounce" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
