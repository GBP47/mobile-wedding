import { useEffect, useRef, useState, type TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryPhoto } from '../data/weddingData';

interface PhotoSlideshowModalProps {
  photos: GalleryPhoto[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function PhotoSlideshowModal({
  photos,
  initialIndex,
  isOpen,
  onClose,
}: PhotoSlideshowModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setDragOffset(0);
    }
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, photos.length]);

  if (!isOpen) return null;

  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % photos.length);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    setDragOffset(0);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    setDragOffset(delta);
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    if (dragOffset < -48) {
      goNext();
    } else if (dragOffset > 48) {
      goPrev();
    }
    touchStartX.current = null;
    setDragOffset(0);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="웨딩 사진 전체 화면 슬라이드 쇼"
      className="fixed inset-0 z-50 bg-zinc-950 text-white flex flex-col justify-between select-none"
    >
      {/* Top Bar: Counter & Close */}
      <div className="relative z-20 flex items-center justify-between px-5 py-4">
        <span className="text-xs md:text-sm text-zinc-300 tabular-nums tracking-wider">
          {currentIndex + 1} / {photos.length}
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label="전체 화면 사진 닫기"
          className="min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {/* Horizontal Sliding Track */}
      <div
        className="relative flex-1 overflow-hidden flex items-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full w-full transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(calc(-${currentIndex * 100}% + ${dragOffset}px), 0, 0)`,
            transitionDuration: dragOffset !== 0 ? '0ms' : '300ms',
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="w-full h-full shrink-0 flex flex-col items-center justify-center px-4 md:px-16 py-2"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                referrerPolicy="no-referrer"
                draggable={false}
                className="max-h-[74dvh] max-w-full w-auto object-contain rounded-lg grayscale-[15%]"
              />
            </div>
          ))}
        </div>

        {/* Desktop & Mobile Prev / Next Buttons */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="이전 사진"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 min-h-[48px] min-w-[48px] rounded-full bg-black/45 border border-white/15 hover:bg-black/75 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="다음 사진"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 min-h-[48px] min-w-[48px] rounded-full bg-black/45 border border-white/15 hover:bg-black/75 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {/* Bottom Caption & Dot Navigation */}
      <div className="relative z-20 px-5 pb-6 pt-3 flex flex-col items-center gap-3 pb-safe">
        <p className="font-editorial text-xs md:text-sm text-zinc-300">
          {photos[currentIndex]?.caption}
        </p>

        <div className="flex items-center gap-2">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`${idx + 1}번째 사진 보기`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'w-6 bg-white'
                  : 'w-2 bg-white/35 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
