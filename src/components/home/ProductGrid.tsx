'use client';

import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/shop/ProductCard';
import { Sparkle } from '@/components/ui/ScrapbookDecorations';
import { products } from '@/lib/data/products';

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
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  const featuredProducts = useMemo(() => products.slice(0, 8), []);

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
              SHOP THESE PRODUCTS
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

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
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
