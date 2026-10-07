'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import Button from '@/components/ui/Button';
import { TapeStrip } from '@/components/ui/ScrapbookDecorations';
import { cn } from '@/lib/utils';

interface Mood {
  title: string;
  tagline: string;
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
    image: '/images/gothcover.png',
    alt: 'Gothic mood — spider pendant necklaces',
    href: '/shop?category=gothic',
    rotate: '-rotate-[3deg]',
    bg: 'bg-[#E4DEDF]',
  },
  {
    title: 'COUPLE',
    tagline: 'Matching pieces for your favourite people.',
    image: '/images/couplecover.png',
    alt: 'Couple mood — matching necklaces',
    href: '/shop?category=necklaces',
    rotate: 'rotate-[2deg]',
    bg: 'bg-blush-200',
  },
  {
    title: 'GIRLY CUTE FINDS',
    tagline: 'All things cute, fun and full of personality.',
    image: '/images/cutegirlcover.png',
    alt: 'Girly cute mood — playful charms',
    href: '/shop?category=charms',
    rotate: '-rotate-[2deg]',
    bg: 'bg-[#E9E2E1]',
  },
  {
    title: 'ANTI-TARNISH',
    tagline: 'Shine that lasts, wear after wear.',
    image: '/images/antitarnishcover.jpeg',
    alt: 'Anti-tarnish mood — golden cuffs and rings',
    href: '/shop?category=antitarnish',
    rotate: 'rotate-[3deg]',
    bg: 'bg-[#EFE6DA]',
  },
];

export default function ShopByMood() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden bg-[#FBF1EC] px-4 py-16 lg:px-6 lg:py-24">
      <div ref={headerRef} className="relative mx-auto mb-10 max-w-2xl text-center lg:mb-14">
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
          Different moods, same love for little details
        </motion.p>
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-6">
        {MOODS.map((mood, index) => (
          <MoodCard key={mood.title} mood={mood} index={index} />
        ))}
      </div>

      {/* corner accent */}
      <div
        className="pointer-events-none absolute -bottom-6 -left-6 z-0 h-40 w-40 rotate-[10deg] bg-blush-300 lg:h-48 lg:w-48"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)', opacity: 0.7 }}
        aria-hidden="true"
      />
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
    </motion.div>
  );
}
