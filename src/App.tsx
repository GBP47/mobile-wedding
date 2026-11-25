import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { ArrowUp, Check, MessageCircle, Music, Pause, Share2, Volume2 } from 'lucide-react';
import { AccountsSection } from './components/AccountsSection';
import { CeremonySection } from './components/CeremonySection';
import { HeroCover } from './components/HeroCover';
import { PhotoSlideshowModal } from './components/PhotoSlideshowModal';
import { VenueMapSection } from './components/VenueMapSection';
import { WEDDING_DATA } from './data/weddingData';
import { shareWeddingToKakao } from './utils/kakaoShare';
import { weddingMusicPlayer } from './utils/weddingMusic';

export default function App() {
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [customSongName, setCustomSongName] = useState<string | null>(null);
  const [slideshow, setSlideshow] = useState<{ isOpen: boolean; initialIndex: number }>({
    isOpen: false,
    initialIndex: 0,
  });

  const audioInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const threshold = Math.max(240, window.innerHeight * 0.72);
      setShowStickyNav(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    return () => {
      weddingMusicPlayer.stop();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleMusic = async () => {
    const playing = await weddingMusicPlayer.toggle();
    setMusicPlaying(playing);
  };

  const handleSelectAudioFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    weddingMusicPlayer.setCustomAudioFile(file);
    setCustomSongName(file.name);
    await weddingMusicPlayer.start();
    setMusicPlaying(true);
  };

  const handleKakaoShare = async () => {
    const outcome = await shareWeddingToKakao();
    if (outcome === 'copied') {
      setShareFeedback('카카오톡에 붙여넣을 수 있도록 청첩장 문구와 링크가 복사되었습니다.');
      setTimeout(() => setShareFeedback(null), 3000);
    } else if (outcome === 'failed') {
      setShareFeedback('주소창 링크를 복사해 주세요.');
      setTimeout(() => setShareFeedback(null), 3000);
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareFeedback('링크가 복사되었습니다.');
      setTimeout(() => setShareFeedback(null), 2500);
    } catch {
      setShareFeedback(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-zinc-900">
      <input
        ref={audioInputRef}
        type="file"
        accept="audio/*"
        onChange={(e) => void handleSelectAudioFile(e)}
        className="hidden"
        aria-label="배경음악 음원 파일 선택"
      />

      {/* Minimal Sticky Top Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-[50px] bg-[#FAF8F5]/92 backdrop-blur-md border-b border-stone-200/80 transition-all duration-200 ${
          showStickyNav
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="h-full max-w-3xl mx-auto px-5 flex items-center justify-between gap-4">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('top');
            }}
            className="font-editorial text-sm font-medium text-zinc-900 whitespace-nowrap shrink-0"
          >
            {WEDDING_DATA.groom.firstName} · {WEDDING_DATA.bride.firstName}
          </a>

          <nav
            aria-label="청첩장 메뉴"
            className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-stone-600"
          >
            <a
              href="#ceremony"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('ceremony');
              }}
              className="min-h-[44px] inline-flex items-center hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
            >
              모시는 글
            </a>
            <a
              href="#map"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('map');
              }}
              className="min-h-[44px] inline-flex items-center hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
            >
              오시는 길
            </a>
            <a
              href="#accounts"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('accounts');
              }}
              className="min-h-[44px] inline-flex items-center hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
            >
              마음 전하실 곳
            </a>
          </nav>

          <button
            type="button"
            onClick={() => void handleToggleMusic()}
            aria-label={musicPlaying ? '배경음악 끄기' : '배경음악 켜기'}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center text-zinc-700 hover:text-zinc-950 cursor-pointer shrink-0"
          >
            {musicPlaying ? (
              <Pause className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Volume2 className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {shareFeedback && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] px-4 py-3 bg-zinc-900 text-white text-xs md:text-sm shadow-lg flex items-center gap-2"
        >
          <Check className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
          <span>{shareFeedback}</span>
        </div>
      )}

      <main>
        <HeroCover
          onScrollDown={() => scrollToSection('ceremony')}
          onOpenSlideshow={(index) => setSlideshow({ isOpen: true, initialIndex: index })}
          musicPlaying={musicPlaying}
          onToggleMusic={() => void handleToggleMusic()}
        />

        <CeremonySection
          onOpenSlideshow={(index) => setSlideshow({ isOpen: true, initialIndex: index })}
        />

        <VenueMapSection />

        <AccountsSection />
      </main>

      <PhotoSlideshowModal
        photos={WEDDING_DATA.photos}
        initialIndex={slideshow.initialIndex}
        isOpen={slideshow.isOpen}
        onClose={() => setSlideshow((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-stone-200/80 py-12 px-6 pb-safe">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
          <div>
            <p className="font-editorial text-sm font-medium text-zinc-900">
              {WEDDING_DATA.groom.fullName} · {WEDDING_DATA.bride.fullName}
            </p>
            <p className="text-xs text-stone-500 mt-1 tabular-nums">
              {WEDDING_DATA.date.shortDate} · {WEDDING_DATA.venue.fullName}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => void handleKakaoShare()}
              className="min-h-[42px] px-4 py-2 bg-[#FEE500] text-[#191919] text-xs font-medium hover:brightness-95 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>카카오톡 공유</span>
            </button>

            <button
              type="button"
              onClick={() => void handleCopyUrl()}
              className="min-h-[42px] px-4 py-2 border border-stone-300 bg-white text-xs font-medium text-zinc-800 hover:bg-stone-50 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-stone-500" aria-hidden="true" />
              <span>청첩장 주소 복사</span>
            </button>

            <button
              type="button"
              onClick={() => audioInputRef.current?.click()}
              className="min-h-[42px] px-3.5 py-2 border border-stone-300 bg-white text-xs text-stone-600 hover:text-zinc-900 hover:bg-stone-50 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Music className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="max-w-[110px] truncate">
                {customSongName ?? '음원 변경'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('top')}
              aria-label="맨 위로"
              className="min-h-[42px] min-w-[42px] border border-stone-300 bg-white text-zinc-700 hover:bg-stone-50 flex items-center justify-center cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
