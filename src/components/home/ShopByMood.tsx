'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Heart, Sparkle, Star, TapeStrip, ScrapbookFlower, BowRibbon } from '@/components/ui/ScrapbookDecorations';
import { cn } from '@/lib/utils';

interface Mood {
  title: string;
  tagline: string;
  caption: string;
  captionRotate: string;
  image: string;
  alt: string;
  href: string;
  rotate: string;
  bg: string;
}

const MOODS: Mood[] = [
  {
    title: 'GOTHIC',
    tagline: 'Bold charms for your darker side.',
    caption: 'for the main character energy ♡',
    captionRotate: 'rotate-[3deg]',
    image: '/sparklet-products/crystal-cross-rs-375/1.jpeg',
    alt: 'Gothic mood — dark charms and pendants',
    href: '/shop?category=charms',
    rotate: '-rotate-[3deg]',
    bg: 'bg-[#E4DEDF]',
  },
  {
    title: 'COUPLE',
    tagline: 'Matching pieces for your favourite people.',
    caption: 'better together ♡',
    captionRotate: 'rotate-[-2deg]',
    image: '/sparklet-products/everlasting-spark-couple-necklace-rs-489/1.jpeg',
    alt: 'Couple mood — matching necklaces',
    href: '/shop?category=necklaces',
    rotate: 'rotate-[2deg]',
    bg: 'bg-blush-200',
  },
  {
    title: 'GIRLY CUTE FINDS',
    tagline: 'All things cute, fun and full of personality.',
    caption: 'cute little finds ♡',
    captionRotate: 'rotate-[3deg]',
    image: '/sparklet-products/hello-meow-keychain-rs-199/1.jpeg',
    alt: 'Girly cute mood — playful charms',
    href: '/shop?category=charms',
    rotate: '-rotate-[2deg]',
    bg: 'bg-[#E9E2E1]',
  },
];

export default function ShopByMood() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden bg-[#FBF1EC] px-4 py-16 lg:px-6 lg:py-24">
      <div ref={headerRef} className="relative mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-blush-600"
        >
          ✦ SHOP BY MOOD
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="mt-2 font-display font-[900] text-charcoal"
          style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
        >
          FIND YOUR <span className="text-blush-500">KIND OF SPARKLE</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="mt-2 font-sans text-[15px] font-light text-charcoal-soft"
        >
          Different moods, same love for little details ♡
        </motion.p>
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-8">
        {MOODS.map((mood, index) => (
          <MoodCard key={mood.title} mood={mood} index={index} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
        className="mt-12 hidden rotate-[-1deg] text-right font-handwritten text-lg text-blush-600 lg:mt-16 lg:block lg:pr-8"
      >
        more than jewellery, it&apos;s a mood ♡
      </motion.p>

      {/* corner accent */}
      <div
        className="pointer-events-none absolute -bottom-6 -left-6 z-0 h-40 w-40 rotate-[10deg] bg-blush-300 lg:h-48 lg:w-48"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)', opacity: 0.7 }}
        aria-hidden="true"
      />
      <p className="pointer-events-none absolute bottom-6 left-4 z-10 rotate-[-4deg] font-handwritten text-base leading-tight text-blush-700 lg:bottom-8 lg:left-6 lg:text-lg">
        sparkle
        <br />
        little
        <br />
        more
        <br />
        everyday
      </p>
    </section>
  );
}

function MoodCard({ mood, index }: { mood: Mood; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="relative flex flex-col items-center px-2 text-center"
    >
      {/* floating decorations */}
      <motion.span
        className="pointer-events-none absolute -left-2 top-6 z-20 hidden lg:block"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
      >
        {index === 0 && <Star size={20} color="#3A3034" />}
        {index === 1 && <Heart size={20} color="#F27AA2" />}
        {index === 2 && <BowRibbon size={26} color="#F27AA2" />}
      </motion.span>

      {/* polaroid */}
      <div
        className={cn(
          'relative w-full max-w-[260px] bg-white p-2.5 pb-4 shadow-[0_16px_36px_-16px_rgba(0,0,0,0.3)]',
          mood.rotate
        )}
      >
        <div
          className="pointer-events-none absolute -top-3 left-1/2 z-20 -translate-x-1/2 opacity-60"
          aria-hidden="true"
        >
          <TapeStrip width={70} height={20} color="#F27AA2" />
        </div>

        <div className={cn('relative aspect-square w-full overflow-hidden', mood.bg)}>
          <Image src={mood.image} alt={mood.alt} fill sizes="(max-width: 640px) 80vw, 260px" className="object-cover" />
        </div>

        {/* sticky caption */}
        <div
          className={cn(
            'absolute -right-4 top-4 z-20 border border-blush-300 bg-white px-3 py-2 text-left shadow-[0_6px_16px_-10px_rgba(0,0,0,0.25)]',
            mood.captionRotate
          )}
        >
          <p className="max-w-[90px] font-handwritten text-sm leading-snug text-blush-600">{mood.caption}</p>
        </div>
      </div>

      <h3 className="mt-6 font-display font-[900] text-charcoal" style={{ fontSize: 'clamp(20px, 2.2vw, 26px)' }}>
        {mood.title}
      </h3>
      <p className="mt-1.5 max-w-[220px] font-sans text-sm font-light text-charcoal-soft">{mood.tagline}</p>

      <div className="mt-4">
        <Button variant="ghost" href={mood.href} size="sm">
          EXPLORE →
        </Button>
      </div>

      <span className="pointer-events-none absolute -bottom-2 right-4 hidden lg:block" aria-hidden="true">
        <ScrapbookFlower size={16} color="#D93670" />
      </span>
    </motion.div>
  );
}
