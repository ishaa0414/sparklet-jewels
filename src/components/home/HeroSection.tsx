'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Heart, Sparkle, Star, BowRibbon, TapeStrip } from '@/components/ui/ScrapbookDecorations';

const HEADLINE_LINES = [
  { text: 'MADE', delay: 0.3 },
  { text: 'FOR A', delay: 0.45 },
  { text: 'LITTLE', delay: 0.6 },
  { text: 'MAGIC', delay: 0.75 },
];

const MARQUEE_ITEM =
  'NEW COLLECTION  ✦  FREE SHIPPING OVER ₹999  ✦  HANDPICKED PIECES  ✦  MADE FOR EVERYDAY MAGIC  ✦  SHOP NOW  ✦  ';

function MarqueeStrip() {
  const content = MARQUEE_ITEM.repeat(4);
  return (
    <div className="relative z-10 flex h-10 items-center overflow-hidden bg-blush-500">
      <div className="animate-marquee flex w-max items-center whitespace-nowrap">
        <span className="px-2 font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-white">
          {content}
        </span>
        <span aria-hidden="true" className="px-2 font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-white">
          {content}
        </span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-blush-50">
      <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-[1600px] flex-col lg:min-h-[calc(100vh-64px)] lg:flex-row lg:items-center">
        {/* LEFT — editorial text */}
        <div className="w-full px-6 pb-14 pt-16 lg:w-[55%] lg:px-0 lg:py-0 lg:pl-12 lg:pr-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
            className="inline-block rotate-[-1deg] font-handwritten text-base text-blush-600"
          >
            ✦ new collection just dropped ✦
          </motion.p>

          <h1
            className="mt-3 font-display font-[900] leading-[0.95] text-charcoal"
            style={{ fontSize: 'clamp(52px, 7vw, 88px)' }}
          >
            {HEADLINE_LINES.map((line) => (
              <span key={line.text} className="block overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: line.delay, duration: 0.6, ease: 'easeOut' }}
                  className="relative inline-block"
                >
                  {line.text}
                  {line.text === 'FOR A' && (
                    <motion.svg
                      viewBox="0 0 220 20"
                      preserveAspectRatio="none"
                      className="absolute -bottom-2 left-0 h-4 w-full origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.9, duration: 0.5, ease: 'easeOut' }}
                    >
                      <path
                        d="M4 12 Q40 4 80 11 T160 8 Q190 6 216 12"
                        stroke="#F27AA2"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </motion.svg>
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
            className="mt-4 inline-block rotate-[-0.5deg] font-handwritten text-xl text-blush-600"
          >
            jewellery made for everyday sparkle ♡
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
            className="mt-4 max-w-[380px] font-sans text-[15px] font-light leading-[1.6] text-charcoal-soft"
          >
            Handpicked pieces for girls who believe every day deserves a little extra shimmer.
            Affordable, wearable, magical.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5, ease: 'easeOut' }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button variant="primary" href="/shop">
              SHOP THE COLLECTION →
            </Button>
            <Button variant="outline" href="/shop?sort=new">
              NEW ARRIVALS
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6, ease: 'easeOut' }}
            className="mt-8 font-sans text-xs text-[#9B8B91]"
          >
            ♡ &nbsp;4,200+ happy customers &nbsp;&nbsp;✦ &nbsp;free shipping over ₹999
          </motion.p>
        </div>

        {/* RIGHT — scrapbook visual composition */}
        <div className="relative w-full overflow-hidden px-6 pb-16 lg:w-[45%] lg:overflow-visible lg:px-0 lg:pb-0 lg:pr-10">
          <div className="relative mx-auto h-[440px] w-full max-w-[420px] lg:h-[640px] lg:max-w-none">
            {/* Element 7 — atmospheric background circle */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush-200"
              style={{ opacity: 0.5, filter: 'blur(60px)' }}
              aria-hidden="true"
            />

            {/* Element 2 — second smaller polaroid card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
              className="absolute left-4 top-16 z-0 hidden rotate-[3deg] bg-white p-2 pb-6 shadow-[0_16px_32px_-14px_rgba(233,79,131,0.3)] sm:block lg:left-16 lg:top-24"
            >
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80&auto=format&fit=crop"
                alt="Delicate gold rings on marble"
                width={180}
                height={180}
                unoptimized
                className="h-[180px] w-[180px] object-cover"
              />
            </motion.div>

            {/* Element 1 — main polaroid card */}
            <motion.div
              initial={{ opacity: 0, rotate: -4 }}
              animate={{ opacity: 1, rotate: -2 }}
              transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
              className="absolute right-2 top-1/2 z-10 w-[280px] -translate-y-1/2 bg-white p-[10px] pb-8 shadow-[0_24px_48px_-16px_rgba(233,79,131,0.4)] lg:right-16"
            >
              {/* Element 4 — tape strip "holding" the card */}
              <div className="pointer-events-none absolute -top-3 left-1/2 z-20 -translate-x-1/2 opacity-50" aria-hidden="true">
                <TapeStrip width={110} height={26} color="#F8A6BC" />
              </div>

              {/* Element 3 — pink paper tag */}
              <span className="absolute -top-3 left-4 z-20 rotate-[-3deg] bg-blush-300 px-3 py-1 font-handwritten text-[13px] text-white shadow-sm">
                ✦ new in
              </span>

              <Image
                src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80&auto=format&fit=crop"
                alt="Everyday favourite jewellery piece"
                width={280}
                height={280}
                unoptimized
                className="h-[280px] w-[280px] object-cover"
              />
              <p className="mt-3 text-center font-handwritten text-sm text-[#9B8B91]">everyday favourite ✦</p>
            </motion.div>

            {/* Element 5 — scattered decorations */}
            <motion.span
              className="absolute right-2 top-0 z-20 hidden lg:block"
              style={{ rotate: 15 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ delay: 0.8, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={28} color="#F27AA2" />
            </motion.span>

            <motion.span
              className="absolute bottom-6 left-0 z-20"
              style={{ rotate: -10 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ delay: 0.9, duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkle size={20} color="#E94F83" />
            </motion.span>

            <motion.span
              className="absolute right-4 top-1/3 z-20 hidden lg:block"
              style={{ rotate: 5 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ delay: 1, duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Star size={16} color="#F8A6BC" />
            </motion.span>

            <motion.span
              className="absolute bottom-0 left-1/3 z-20 hidden lg:block"
              animate={{ y: [0, -5, 0] }}
              transition={{ delay: 1.1, duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <BowRibbon size={32} color="#F27AA2" />
            </motion.span>

            {/* Element 6 — sticky-note annotation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5, ease: 'easeOut' }}
              className="absolute bottom-4 right-2 z-20 hidden rotate-[2deg] border border-blush-300 bg-blush-100 px-3 py-2 shadow-[0_6px_16px_-8px_rgba(0,0,0,0.15)] sm:block"
            >
              <p className="font-handwritten text-sm text-blush-600">your new fav piece? 👀</p>
            </motion.div>
          </div>
        </div>
      </div>

      <MarqueeStrip />
    </section>
  );
}
