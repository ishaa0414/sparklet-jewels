'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart as LucideHeart } from 'lucide-react';
import { Heart, Sparkle, TapeStrip } from '@/components/ui/ScrapbookDecorations';
import { cn, formatPrice } from '@/lib/utils';
import type { Product, ProductTag } from '@/types';

export interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'polaroid' | 'featured';
  showQuickAdd?: boolean;
  index?: number;
  className?: string;
}

const TAG_META: Record<ProductTag, { label: string; bg: string; text: string }> = {
  new: { label: 'NEW ✦', bg: '#E94F83', text: '#FFFFFF' },
  bestseller: { label: 'FAVE ♡', bg: '#242124', text: '#FFFFFF' },
  limited: { label: 'LIMITED', bg: '#F27AA2', text: '#FFFFFF' },
};

const ANNOTATIONS = ['so cute omg ✦', 'bestseller for a reason ♡', 'treat yourself 🎀'];

function getAnnotation(id: string) {
  const n = Number.parseInt(id, 10) || 0;
  return ANNOTATIONS[n % ANNOTATIONS.length];
}

const SPARKLE_ANGLES = [0, 90, 180, 270];

function SparkleParticle({ angle, onComplete }: { angle: number; onComplete: () => void }) {
  const radians = (angle * Math.PI) / 180;
  const x = Math.cos(radians) * 24;
  const y = Math.sin(radians) * 24;

  return (
    <motion.span
      className="pointer-events-none absolute left-1/2 top-1/2 z-30"
      initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
      animate={{ opacity: 0, x, y, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onAnimationComplete={onComplete}
    >
      <Sparkle size={10} color="#E94F83" />
    </motion.span>
  );
}

function WishlistButton({
  active,
  pulseKey,
  onClick,
  className,
  dark = false,
}: {
  active: boolean;
  pulseKey: number;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  dark?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      onClick={onClick}
      className={cn(
        'relative z-20 flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-200',
        dark ? 'border-white/50 bg-white/85' : 'border-blush-300 bg-white/90',
        className
      )}
    >
      <motion.span key={pulseKey} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.3 }} className="inline-flex">
        <LucideHeart
          size={14}
          color={active ? '#E94F83' : '#9B8B91'}
          fill={active ? '#E94F83' : 'none'}
          strokeWidth={1.75}
        />
      </motion.span>
    </button>
  );
}

function useWishlistBurst() {
  const [wishlisted, setWishlisted] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const [bursts, setBursts] = useState<number[]>([]);
  const burstCounter = useRef(0);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !wishlisted;
    setWishlisted(next);
    setPulseKey((k) => k + 1);
    if (next) {
      const id = burstCounter.current++;
      setBursts((prev) => [...prev, id]);
    }
  };

  const removeBurst = (id: number) => setBursts((prev) => prev.filter((b) => b !== id));

  return { wishlisted, pulseKey, bursts, toggle, removeBurst };
}

function ProductTagBadge({ tag }: { tag: ProductTag }) {
  const meta = TAG_META[tag];
  return (
    <span
      className="absolute left-2 top-2 z-20 rotate-[-1deg] px-2 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.08em]"
      style={{ backgroundColor: meta.bg, color: meta.text, borderRadius: '2px' }}
    >
      {meta.label}
    </span>
  );
}

export default function ProductCard({
  product,
  variant = 'default',
  showQuickAdd = true,
  index,
  className,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { wishlisted, pulseKey, bursts, toggle, removeBurst } = useWishlistBurst();
  const image = product.images[0];
  const showTape = variant === 'default' ? index !== undefined && index % 2 === 0 : true;
  const showAnnotation = variant === 'default' && index !== undefined && index % 3 === 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('added to bag:', product.name);
  };

  if (variant === 'polaroid') {
    const baseRotate = index !== undefined && index % 2 !== 0 ? 2 : -2;
    const tapeColor = index !== undefined && index % 2 !== 0 ? '#FDE7EC' : '#F8A6BC';

    return (
      <motion.article
        className={cn('group relative bg-white', className)}
        style={{ padding: '8px 8px 32px 8px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)' }}
        initial={{ rotate: baseRotate }}
        whileHover={{ rotate: 0, scale: 1.03 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <Link href={`/product/${product.slug}`} aria-label={product.name} className="absolute inset-0 z-0" />

        {showTape && (
          <div
            className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-[60%]"
            aria-hidden="true"
          >
            <TapeStrip width={64} height={20} color={tapeColor} />
          </div>
        )}

        <div className="relative aspect-square overflow-hidden bg-blush-100">
          {product.tag && <ProductTagBadge tag={product.tag} />}
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-300"
            style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          <div className="absolute inset-0 z-10" aria-hidden="true">
            <AnimatePresence>
              {bursts.map((id) =>
                SPARKLE_ANGLES.map((angle) => (
                  <SparkleParticle key={`${id}-${angle}`} angle={angle} onComplete={() => removeBurst(id)} />
                ))
              )}
            </AnimatePresence>
          </div>
          <WishlistButton
            active={wishlisted}
            pulseKey={pulseKey}
            onClick={toggle}
            className="absolute bottom-2 right-2"
          />
        </div>

        <div className="pt-3 text-center">
          <p className="truncate font-handwritten text-sm text-[#9B8B91]">{product.name}</p>
          <p className="mt-0.5 font-sans text-[13px] font-semibold text-blush-600">{formatPrice(product.price)}</p>
        </div>
      </motion.article>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.article
        className={cn('group relative overflow-hidden', className)}
        style={{ aspectRatio: '3 / 4', borderRadius: '4px' }}
        whileHover="hover"
        initial="rest"
      >
        <Link href={`/product/${product.slug}`} aria-label={product.name} className="absolute inset-0 z-0" />

        <motion.div
          variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(36,33,36,0.6) 100%)' }}
          aria-hidden="true"
        />

        <Heart size={20} color="#FFFFFF" className="absolute right-4 top-4 z-10 opacity-70" />

        <WishlistButton
          active={wishlisted}
          pulseKey={pulseKey}
          onClick={toggle}
          dark
          className="absolute right-4 top-4 z-20 mt-9"
        />

        <div className="absolute inset-0 z-10" aria-hidden="true">
          <AnimatePresence>
            {bursts.map((id) =>
              SPARKLE_ANGLES.map((angle) => (
                <SparkleParticle key={`${id}-${angle}`} angle={angle} onComplete={() => removeBurst(id)} />
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 p-4">
          <p className="truncate font-sans text-base font-semibold text-white">{product.name}</p>
          <p className="mt-1 font-handwritten text-lg text-blush-300">{formatPrice(product.price)}</p>
          <span className="mt-1 inline-block font-sans text-[11px] uppercase tracking-[0.08em] text-white underline underline-offset-2">
            VIEW →
          </span>
        </div>
      </motion.article>
    );
  }

  // 'default' variant
  const baseRotate = index !== undefined && index % 2 !== 0 ? 0.5 : -0.5;

  return (
    <motion.article
      className={cn('group relative overflow-visible bg-white', className)}
      style={{ borderRadius: '2px 8px 6px 4px', border: '1.5px solid #F8A6BC' }}
      initial={{ rotate: baseRotate }}
      whileHover={{ y: -4, rotate: 0, boxShadow: '0 8px 24px rgba(233, 79, 131, 0.12)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} aria-label={product.name} className="absolute inset-0 z-0" />

      {showTape && (
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 opacity-60"
          aria-hidden="true"
        >
          <TapeStrip width={60} height={18} color="#F8A6BC" />
        </div>
      )}

      <div className="relative aspect-square overflow-hidden bg-blush-100">
        {product.tag && <ProductTagBadge tag={product.tag} />}

        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-300"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />

        <div className="absolute inset-0 z-10" aria-hidden="true">
          <AnimatePresence>
            {bursts.map((id) =>
              SPARKLE_ANGLES.map((angle) => (
                <SparkleParticle key={`${id}-${angle}`} angle={angle} onComplete={() => removeBurst(id)} />
              ))
            )}
          </AnimatePresence>
        </div>

        <WishlistButton
          active={wishlisted}
          pulseKey={pulseKey}
          onClick={toggle}
          className="absolute right-2 top-2"
        />
      </div>

      <div className="relative z-10 p-3">
        <p className="truncate font-sans text-sm font-medium text-charcoal">{product.name}</p>
        <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.06em] text-[#9B8B91]">{product.category}</p>

        <div className="mt-1.5 flex items-center justify-between">
          <span className="font-sans text-[15px] font-semibold text-blush-600">{formatPrice(product.price)}</span>
        </div>

        {showAnnotation && (
          <p className="mt-1.5 rotate-[-0.5deg] font-handwritten text-[13px] text-blush-400">
            {getAnnotation(product.id)}
          </p>
        )}

        {showQuickAdd && (
          <AnimatePresence>
            {hovered && (
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onClick={handleQuickAdd}
                className="relative z-20 mt-2 h-8 w-full bg-blush-500 font-sans text-xs font-medium text-white"
                style={{ borderRadius: '3px' }}
              >
                ADD TO BAG ♡
              </motion.button>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.article>
  );
}
