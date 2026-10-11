'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import TornEdge from '@/components/ui/TornEdge';
import { Heart, ScrapbookFlower, Sparkle, TapeStrip } from '@/components/ui/ScrapbookDecorations';

export default function AboutTeaser() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const primaryImage = '/images/aboutimage1.jpg';
  const secondaryImage = '/images/aboutimage2.jpg';

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-blush-200 px-4 py-16 lg:px-6 lg:py-24">
      <TornEdge position="top" color="#FDE7EC" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-center">
        {/* LEFT — scrapbook visual composition */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative h-[380px] w-full max-w-[420px] lg:h-[420px] lg:w-1/2 lg:max-w-none"
        >
          {/* Element 6 — atmospheric circle */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush-300"
            style={{ opacity: 0.2, filter: 'blur(40px)' }}
            aria-hidden="true"
          />

          {/* Element 2 — smaller second polaroid, peeks from behind Element 1 */}
          <div className="absolute bottom-6 right-4 z-0 rotate-[4deg] bg-white p-2 pb-6 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.2)] lg:bottom-8 lg:right-6">
            <Image
              src={secondaryImage}
              alt="Sparklet Jewels — behind the scenes"
              width={180}
              height={180}
              className="h-[140px] w-[180px] object-cover lg:h-[160px]"
            />
            <p className="mt-2 text-center font-handwritten text-[13px] text-[#9B8B91]">made with ♡</p>
          </div>

          {/* Element 1 — main polaroid */}
          <div className="absolute left-2 top-2 z-10 w-[260px] rotate-[-3deg] bg-white p-2 pb-6 shadow-[0_16px_36px_-14px_rgba(217,54,112,0.35)] lg:left-4 lg:top-4">
            <div
              className="pointer-events-none absolute -top-3 left-1/2 z-20 -translate-x-1/2 opacity-50"
              aria-hidden="true"
            >
              <TapeStrip width={70} height={20} color="#F27AA2" />
            </div>
            <Image
              src={primaryImage}
              priority
              alt="Sparklet Jewels — behind the scenes"
              width={260}
              height={220}
              className="h-[220px] w-[260px] object-cover"
            />
            <p className="mt-2 text-center font-handwritten text-[13px] text-[#9B8B91]">the team behind the magic ✦</p>
          </div>

          {/* Element 3 — sticky note */}
          <div className="absolute right-0 top-0 z-20 rotate-[-2deg] border border-blush-300 bg-white px-3.5 py-2.5 shadow-[0_6px_18px_-10px_rgba(0,0,0,0.2)]">
            <p className="font-handwritten text-base text-blush-600">small brand, big dreams ♡</p>
          </div>

          {/* Element 5 — floating decorations */}
          <motion.span
            className="pointer-events-none absolute right-6 top-1/3 z-20"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart size={24} color="#F27AA2" />
          </motion.span>
          <motion.span
            className="pointer-events-none absolute bottom-0 left-0 z-20"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            <ScrapbookFlower size={20} color="#E94F83" />
          </motion.span>
          <motion.span
            className="pointer-events-none absolute left-1/2 top-0 z-20"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          >
            <Sparkle size={16} color="#D93670" />
          </motion.span>
        </motion.div>

        {/* RIGHT — brand story text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="w-full lg:w-1/2 lg:pl-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
            className="mt-2 font-display font-[900] leading-[1.1] text-charcoal"
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
          >
            OUR <span className="text-blush-500">STORY ♡</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
            className="mt-4 max-w-[480px] font-sans text-[15px] font-light leading-[1.7] text-charcoal-soft"
          >
            Sparklet Jewels began in October 2025 with a small dream and a big hope of building something of my own. My dad always encouraged me to become an independent businesswoman, and his belief in me has been one of my biggest inspirations.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
            className="mt-4 max-w-[480px] font-sans text-[15px] font-light leading-[1.7] text-charcoal-soft"
          >
            Along the way, my Ammi, Mama, Mami, Khala, Nani, Bhai, and Behen have stood by me with endless love and support, encouraging me to keep going even when things felt difficult.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
            className="mt-4 max-w-[480px] font-sans text-[15px] font-light leading-[1.7] text-charcoal-soft"
          >
            Alhamdulillah, we’re almost a year into this beautiful journey! From creating jewellery and receiving our very first orders to launching our own website, every little milestone has made this dream feel more real. What started as a small idea has slowly grown into something incredibly special to me.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.7, ease: 'easeOut' }}
            className="mt-4 max-w-[480px] font-sans text-[15px] font-light leading-[1.7] text-charcoal-soft"
          >
            A heartfelt thank you to my Ammi, Mama, Mami, Khala, Nani, Daddy, Bhai, Behen, my friends, and Isha for believing in me, supporting me, and being a part of this journey. Sparklet Jewels wouldn’t be where it is today without your love and encouragement.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.8, ease: 'easeOut' }}
            className="mt-4 inline-block rotate-[-0.5deg] font-handwritten text-xl text-blush-600"
          >
            This is just the beginning, InshaAllah. ♡
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
