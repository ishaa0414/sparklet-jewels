'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const MARQUEE_ITEM = 'NEW COLLECTION  ✦  HANDPICKED PIECES  ✦  MADE FOR EVERYDAY MAGIC  ✦  SHOP NOW  ✦  ';

function MarqueeStrip() {
  const content = MARQUEE_ITEM.repeat(4);
  return (
    <div className="relative z-10 flex h-10 items-center overflow-hidden" style={{ backgroundColor: '#242124' }}>
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
    <section className="relative overflow-hidden bg-white">
      {/* Mobile hero artwork */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative block max-h-screen w-full md:hidden"
        style={{ aspectRatio: '941 / 1672' }}
      >
        <Image
          src="/images/hero-mobile-bg.png"
          alt="Sparklet Jewels — jewellery for your main character era. Trendy charms, everyday joy."
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
      </motion.div>

      {/* Tablet hero artwork */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative hidden max-h-screen w-full md:block lg:hidden"
        style={{ aspectRatio: '1448 / 1086' }}
      >
        <Image
          src="/images/herotab.png"
          alt="Sparklet Jewels — jewellery for your main character era. Trendy charms, everyday joy."
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
      </motion.div>

      {/* Desktop hero artwork */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative hidden h-screen w-full lg:block"
      >
        <Image
          src="/images/hero-desktop-bg.png"
          alt="Sparklet Jewels — more than jewellery, it's a mood. Little charms, big personality."
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <MarqueeStrip />
    </section>
  );
}
