'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Sparkle, TapeStrip } from '@/components/ui/ScrapbookDecorations';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

export interface ProductGalleryProps {
  product: Product;
}

const SWIPE_THRESHOLD = 50;

function ComingSoonPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1" style={{ backgroundColor: '#FDE7EC' }}>
      <Sparkle size={28} color="#F27AA2" />
      <p className="font-handwritten text-base text-blush-600">✦ coming soon</p>
    </div>
  );
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const touchStartX = useRef<number | null>(null);

  const images = product.images && product.images.length > 0 ? product.images : [];
  const hasMultiple = images.length > 1;
  const activeImage = images[activeIndex];
  const activeImageFailed = failedImages[activeIndex];

  useEffect(() => {
    // Temporary debug aid — confirms the resolved image paths for this product.
    console.log('[ProductGallery] product.images:', product.images);
  }, [product.images]);

  const goTo = (index: number) => setActiveIndex(index);
  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);

  const markFailed = (index: number) => setFailedImages((prev) => ({ ...prev, [index]: true }));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !hasMultiple) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > SWIPE_THRESHOLD) {
      goNext();
    } else if (deltaX < -SWIPE_THRESHOLD) {
      goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <div className="lg:flex lg:gap-4">
      {hasMultiple && (
        <div className="hidden shrink-0 flex-col gap-2 lg:flex lg:w-20">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1} of ${product.name}`}
              className="relative shrink-0 overflow-hidden bg-blush-100"
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '3px 7px 5px 4px',
                border: `1.5px solid ${activeIndex === i ? '#E94F83' : 'transparent'}`,
              }}
            >
              {!failedImages[i] ? (
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  fill
                  sizes="72px"
                  className="object-cover"
                  onError={() => markFailed(i)}
                />
              ) : (
                <ComingSoonPlaceholder />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 flex-1 lg:mt-0">
        <div
          className="group relative aspect-square min-h-[400px] w-full overflow-hidden"
          style={{ backgroundColor: '#FFF1F3', borderRadius: '4px', position: 'relative' }}
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 opacity-40">
            <TapeStrip width={90} height={22} color="#F8A6BC" />
          </div>

          <Heart size={20} color="#F27AA2" className="absolute right-3 top-3 z-20 rotate-12" />

          <AnimatePresence mode="wait">
            {activeImage && !activeImageFailed ? (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover transition-transform duration-300 ease-out"
                  style={{ transform: zoomed ? 'scale(1.08)' : 'scale(1)' }}
                  onError={() => markFailed(activeIndex)}
                />
              </motion.div>
            ) : (
              <ComingSoonPlaceholder />
            )}
          </AnimatePresence>

          <p className="pointer-events-none absolute bottom-3 left-3 z-20 rotate-[-1deg] font-handwritten text-[11px] text-[#9B8B91]">
            ✦ real product photos
          </p>
        </div>

        {hasMultiple && (
          <>
            <div className="mt-3 flex gap-2 overflow-x-auto lg:hidden">
              {images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`View image ${i + 1} of ${product.name}`}
                  className="relative shrink-0 overflow-hidden bg-blush-100"
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '3px 7px 5px 4px',
                    border: `1.5px solid ${activeIndex === i ? '#E94F83' : 'transparent'}`,
                  }}
                >
                  {!failedImages[i] ? (
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      fill
                      sizes="72px"
                      className="object-cover"
                      onError={() => markFailed(i)}
                    />
                  ) : (
                    <ComingSoonPlaceholder />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-3 flex justify-center gap-1.5 lg:hidden">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={cn('h-1.5 w-1.5 rounded-full transition-colors duration-200')}
                  style={{ backgroundColor: activeIndex === i ? '#E94F83' : '#F8A6BC' }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
