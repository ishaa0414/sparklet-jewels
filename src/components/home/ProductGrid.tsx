'use client';

import { useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/shop/ProductCard';
import { Sparkle } from '@/components/ui/ScrapbookDecorations';
import { products } from '@/lib/data/products';
import { cn } from '@/lib/utils';
import type { Category } from '@/types';

const TABS: { label: string; value: 'ALL' | Category }[] = [
  { label: 'ALL', value: 'ALL' },
  { label: 'EARRINGS', value: 'earrings' },
  { label: 'NECKLACES', value: 'necklaces' },
  { label: 'RINGS', value: 'rings' },
  { label: 'BRACELETS', value: 'bracelets' },
];

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative px-1 py-1 font-sans text-xs font-medium transition-colors duration-200',
        active ? 'text-blush-500' : 'text-[#9B8B91] hover:text-blush-600'
      )}
    >
      {label}
      {active && (
        <motion.svg
          layoutId="homepageTab"
          viewBox="0 0 100 6"
          preserveAspectRatio="none"
          className="absolute -bottom-1.5 left-0 h-1.5 w-full"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        >
          <path d="M1 3 Q25 1 50 3 T99 3" stroke="#E94F83" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </motion.svg>
      )}
    </button>
  );
}

function AnimatedCell({
  staggerIndex,
  className,
  children,
}: {
  staggerIndex: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: staggerIndex * 0.08, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState<'ALL' | Category>('ALL');
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  const featuredProducts = useMemo(() => {
    const filtered = activeTab === 'ALL' ? products : products.filter((p) => p.category === activeTab);
    return filtered.slice(0, 8);
  }, [activeTab]);

  const variantFor = (index: number): 'default' | 'featured' | 'polaroid' => {
    if (index === 4) return 'featured';
    if (index === 7) return 'polaroid';
    return 'default';
  };

  return (
    <section className="bg-cream px-4 py-12 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div ref={headerRef} className="relative mb-8 flex flex-col items-start justify-between gap-4 lg:mb-10 lg:flex-row lg:items-center">
          <Sparkle
            size={18}
            color="#F27AA2"
            className="pointer-events-none absolute -left-6 top-0 hidden rotate-[15deg] lg:block"
            aria-hidden="true"
          />

          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] text-blush-600"
            >
              ✦ HAND-PICKED FOR YOU
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="mt-2 font-display font-[900] text-charcoal"
              style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
            >
              MOST LOVED
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="mt-1 inline-block rotate-[-0.5deg] font-handwritten text-lg text-blush-600"
            >
              our bestsellers this season ♡
            </motion.p>
          </div>

          <div className="hidden lg:block">
            <Button variant="ghost" href="/shop">
              VIEW ALL →
            </Button>
          </div>
        </div>

        <div className="mb-8 flex items-center gap-6 border-b border-blush-200 pb-3 lg:mb-10">
          {TABS.map((tab) => (
            <TabButton
              key={tab.value}
              label={tab.label}
              active={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
            />
          ))}
        </div>

        <div key={activeTab} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {featuredProducts.map((product, index) => (
            <AnimatedCell key={product.id} staggerIndex={index}>
              <ProductCard product={product} variant={variantFor(index)} index={index} />
            </AnimatedCell>
          ))}
        </div>

        <div className="mt-6 lg:hidden">
          <Button variant="primary" href="/shop" className="w-full justify-center">
            SEE ALL PIECES →
          </Button>
        </div>
      </div>
    </section>
  );
}
