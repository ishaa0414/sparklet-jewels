'use client';

import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/shop/ProductCard';
import { Sparkle } from '@/components/ui/ScrapbookDecorations';
import { products } from '@/lib/data/products';

const FEATURED_SLUGS = [
  'deerly-yours-couple-rings',
  'everlasting-spark-couple-necklace',
  'starlight-couple-necklace',
  'gotham-couple-keyy',
  'crystal-cross',
  'golden-initial-letters-necklace',
  'frozen-star-dust',
  'y2k-glam-combo',
];

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

  const featuredProducts = useMemo(
    () => FEATURED_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter((p): p is (typeof products)[number] => Boolean(p)),
    []
  );

  return (
    <section className="bg-cream px-4 py-12 lg:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div ref={headerRef} className="relative mb-8 lg:mb-10">
          <Sparkle
            size={18}
            color="#F27AA2"
            className="pointer-events-none absolute -left-6 top-0 hidden rotate-[15deg] lg:block"
            aria-hidden="true"
          />

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="mt-2 font-display font-[900] text-charcoal"
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
          >
            SHOP THESE PRODUCTS
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {featuredProducts.map((product, index) => (
            <AnimatedCell key={product.id} staggerIndex={index}>
              <ProductCard product={product} index={index} />
            </AnimatedCell>
          ))}
        </div>

        <div className="mt-8 flex justify-center lg:mt-10">
          <Button variant="primary" href="/shop" className="w-full justify-center sm:w-auto">
            VIEW ALL →
          </Button>
        </div>
      </div>
    </section>
  );
}
