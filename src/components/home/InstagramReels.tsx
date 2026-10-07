'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Instagram, Play } from 'lucide-react';
import { Heart } from '@/components/ui/ScrapbookDecorations';
import { INSTAGRAM_PROFILE_URL } from '@/lib/instagram';

interface Reel {
  url: string;
  image: string;
  handle: string;
  caption: string;
}

const REELS: Reel[] = [
  { url: 'https://www.instagram.com/reel/DdGYVmUSPHd/', image: '/images/reel-cover-1.jpg', handle: '@arnishringi', caption: 'stacked & sparkly ♡' },
  { url: 'https://www.instagram.com/reel/DdCH5K3R013/', image: '/images/reel-cover-2.jpg', handle: '@nirv.anaholic', caption: 'jewellery finds ✦' },
  { url: 'https://www.instagram.com/reel/DctPhhENId3/', image: '/images/reel-cover-3.jpg', handle: '@sumaannnaa', caption: 'obsessed with this one ♡' },
  { url: 'https://www.instagram.com/reel/DbVfbCmzZYG/', image: '/images/reel-cover-4.jpg', handle: '@najmin_t_united_', caption: 'main character era ✦' },
];

function ReelCard({ reel, index }: { reel: Reel; index: number }) {
  return (
    <motion.a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${reel.handle}'s reel on Instagram`}
      className="group relative block aspect-[9/16] w-[170px] shrink-0 snap-start overflow-hidden bg-charcoal sm:w-[200px]"
      style={{ borderRadius: '12px' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
    >
      <Image
        src={reel.image}
        alt={reel.caption}
        fill
        sizes="200px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(36,33,36,0.15) 0%, transparent 35%, rgba(36,33,36,0.8) 100%)' }}
        aria-hidden="true"
      />

      <span className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
        <Instagram size={13} />
      </span>

      <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white/90 transition-transform duration-200 group-hover:scale-110">
        <Play size={22} fill="white" strokeWidth={0} />
      </span>

      <div className="absolute inset-x-0 bottom-0 z-10 p-2.5">
        <p className="truncate font-sans text-[11px] font-semibold text-white">{reel.handle}</p>
        <p className="truncate font-sans text-[10px] text-white/85">{reel.caption}</p>
      </div>
    </motion.a>
  );
}

export default function InstagramReels() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden bg-blush-50 px-4 py-16 lg:px-6 lg:py-24">
      <motion.span
        className="pointer-events-none absolute left-6 top-10 hidden lg:block"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart size={20} color="#F27AA2" />
      </motion.span>

      <div ref={headerRef} className="relative mx-auto mb-10 max-w-2xl text-center lg:mb-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-blush-600"
        >
          REAL PEOPLE, REAL SPARKLE
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="mt-2 font-display font-[900] leading-[1.15] text-charcoal"
          style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
        >
          Loved by you,
          <br />
          <span className="italic text-blush-500">shared with the world</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="mt-3 font-sans text-[15px] font-light text-charcoal-soft"
        >
          From everyday fits to special moments — here&apos;s how our community styles Sparklet Jewels.
        </motion.p>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div
          className="hide-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth px-1 py-1 sm:justify-center"
        >
          {REELS.map((reel, index) => (
            <ReelCard key={reel.url} reel={reel} index={index} />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
        className="mt-10 flex justify-center lg:mt-12"
      >
        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blush-400 px-6 py-3 font-sans text-sm font-medium text-white transition-colors duration-200 hover:bg-blush-500"
          style={{ borderRadius: '999px' }}
        >
          EXPLORE MORE ON INSTAGRAM →
        </a>
      </motion.div>
    </section>
  );
}
