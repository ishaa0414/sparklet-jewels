'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TornEdge from '@/components/ui/TornEdge';
import ProductCard from '@/components/shop/ProductCard';
import { getRelatedProducts, products } from '@/lib/data/products';
import type { Product } from '@/types';

export interface RelatedProductsProps {
  product: Product;
}

const RELATED_COUNT = 4;

function fillToCount(list: Product[], product: Product, count: number) {
  if (list.length >= count) return list.slice(0, count);

  const usedSlugs = new Set([product.slug, ...list.map((p) => p.slug)]);
  const filler = products.filter((p) => !usedSlugs.has(p.slug));

  return [...list, ...filler].slice(0, count);
}

export default function RelatedProducts({ product }: RelatedProductsProps) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-100px' });

  const related = fillToCount(getRelatedProducts(product, RELATED_COUNT), product, RELATED_COUNT);

  if (related.length === 0) return null;

  return (
    <section className="relative overflow-hidden px-6 py-16" style={{ backgroundColor: '#FFF1F3' }}>
      <TornEdge position="top" color="#FFF1F3" />

      <div className="mx-auto max-w-6xl">
        <div ref={headerRef} className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-display font-[900] text-charcoal"
            style={{ fontSize: '36px' }}
          >
            YOU MIGHT ALSO LOVE ♡
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="mt-2 inline-block rotate-[-0.5deg] font-handwritten text-base"
            style={{ color: '#D93670' }}
          >
            more pieces just for you ✦
          </motion.p>
        </div>

        <div ref={gridRef} className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {related.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
            >
              <ProductCard product={p} variant="default" index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
