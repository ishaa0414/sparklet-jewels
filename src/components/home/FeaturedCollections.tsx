'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import TornEdge from '@/components/ui/TornEdge';
import Button from '@/components/ui/Button';
import { Heart, Sparkle, ScrapbookFlower, Star, BowRibbon, TapeStrip } from '@/components/ui/ScrapbookDecorations';

interface Collection {
  id: string;
  name: string;
  subtitle: string;
  annotation: string;
  bg: string;
  accent: string;
  image: string;
  tag: string;
  rotation: number;
}

const collections: Collection[] = [
  {
    id: 'everyday-sparkles',
    name: 'EVERYDAY SPARKLES',
    subtitle: "pieces you'll reach for every single day",
    annotation: 'minimalist magic ✦',
    bg: '#FDE7EC',
    accent: '#E94F83',
    image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d',
    tag: '42 pieces',
    rotation: -1.5,
  },
  {
    id: 'party-girl',
    name: 'PARTY GIRL',
    subtitle: 'turn heads, break hearts, repeat',
    annotation: 'extra is always enough 🎀',
    bg: '#F8A6BC',
    accent: '#D93670',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e',
    tag: '28 pieces',
    rotation: 1,
  },
  {
    id: 'cute-little-charms',
    name: 'CUTE LITTLE CHARMS',
    subtitle: 'collect them all, stack them up',
    annotation: 'tiny treasures ♡',
    bg: '#FFF8F7',
    accent: '#F27AA2',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a',
    tag: '35 pieces',
    rotation: -0.5,
  },
  {
    id: 'made-to-layer',
    name: 'MADE TO LAYER',
    subtitle: 'mix, match, and make it yours',
    annotation: 'more is more ✦',
    bg: '#FFF1F3',
    accent: '#E94F83',
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236',
    tag: '19 pieces',
    rotation: 2,
  },
];

const CARD_RADIUS = '4px 12px 8px 10px';

function CollectionCard({ collection, index }: { collection: Collection; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/shop?collection=${collection.id}`} className="block">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
        className="group relative cursor-pointer overflow-hidden"
        style={{ backgroundColor: collection.bg, borderRadius: CARD_RADIUS, aspectRatio: '4 / 5' }}
      >
        <motion.div
          className="relative flex h-full w-full flex-col"
          initial={{ rotate: collection.rotation }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {/* image area — top 60% */}
          <div className="relative h-[60%] w-full overflow-hidden">
            <Image
              src={`${collection.image}?w=600&q=80&auto=format&fit=crop`}
              alt={collection.name}
              fill
              unoptimized
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-300"
              style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: `linear-gradient(to bottom, transparent 40%, ${collection.bg} 100%)` }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 opacity-40"
              aria-hidden="true"
            >
              <TapeStrip width={70} height={20} color="#FFFFFF" />
            </div>

            {index === 0 && (
              <Heart size={20} color="#FFFFFF" className="pointer-events-none absolute right-3 top-3 opacity-60" />
            )}
            {index === 1 && (
              <>
                <Sparkle size={16} color="#FFFFFF" className="pointer-events-none absolute right-3 top-3" />
                <Sparkle size={16} color="#FFFFFF" className="pointer-events-none absolute bottom-3 left-3" />
              </>
            )}
            {index === 2 && (
              <ScrapbookFlower
                size={24}
                color="#FFFFFF"
                className="pointer-events-none absolute left-3 top-3 opacity-50"
              />
            )}
            {index === 3 && (
              <Star size={14} color="#FFFFFF" className="pointer-events-none absolute right-4 top-4 opacity-40" />
            )}
          </div>

          {/* content area — bottom 40% */}
          <div className="relative flex-1 p-4">
            <h3 className="mb-1.5 font-display text-lg font-bold text-charcoal lg:text-[22px]">
              {collection.name}
            </h3>
            <p className="mb-3 font-sans text-[13px] text-charcoal-soft">{collection.subtitle}</p>
            <div className="flex items-center justify-between gap-2">
              <span
                className="inline-block rotate-[-1deg] font-handwritten text-sm"
                style={{ color: collection.accent }}
              >
                {collection.annotation}
              </span>
              <span
                className="whitespace-nowrap px-2 py-0.5 font-sans text-[11px]"
                style={{
                  borderRadius: '2px',
                  border: `1px solid ${collection.accent}`,
                  color: collection.accent,
                  backgroundColor: 'rgba(255,255,255,0.8)',
                }}
              >
                {collection.tag}
              </span>
            </div>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ borderRadius: CARD_RADIUS, border: `2px solid ${collection.accent}` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.span
            className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-3.5 py-1.5 font-sans text-xs font-semibold"
            style={{ color: collection.accent, borderRadius: '2px' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.2 }}
          >
            SHOP NOW →
          </motion.span>
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default function FeaturedCollections() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section className="relative overflow-hidden bg-blush-100 px-4 py-12 lg:px-6 lg:py-20">
      <TornEdge position="top" color="#FFF1F3" />
      <TornEdge position="bottom" color="#FFF1F3" />

      <div className="mx-auto max-w-6xl">
        <div ref={headerRef} className="relative mb-10 lg:mb-14">
          <Star
            size={18}
            color="#F8A6BC"
            className="pointer-events-none absolute -top-2 left-1/2 opacity-40"
            aria-hidden="true"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-blush-600"
          >
            ✦ SHOP BY COLLECTION
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="mt-2 font-display font-[900] leading-[1.05] text-charcoal"
            style={{ fontSize: 'clamp(32px, 4.5vw, 48px)' }}
          >
            FIND YOUR
            <br />
            <span className="relative inline-flex items-center gap-2">
              AESTHETIC
              <BowRibbon size={32} color="#F27AA2" className="rotate-[10deg]" />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="mt-2 inline-block rotate-[-0.5deg] font-handwritten text-xl text-blush-600"
          >
            curated edits just for you ♡
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
          {collections.map((collection, index) => (
            <CollectionCard key={collection.id} collection={collection} index={index} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="inline-block rotate-[-0.5deg] font-handwritten text-xl text-blush-600">
            can&apos;t decide? we&apos;ve got you ♡
          </p>
          <Button variant="primary" href="/shop">
            SHOP ALL COLLECTIONS →
          </Button>
        </div>
      </div>
    </section>
  );
}
