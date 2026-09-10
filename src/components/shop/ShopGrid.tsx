'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CategoryFilter from '@/components/shop/CategoryFilter';
import ProductCard from '@/components/shop/ProductCard';
import Button from '@/components/ui/Button';
import { Heart, Sparkle, Star } from '@/components/ui/ScrapbookDecorations';
import { products } from '@/lib/data/products';
import type { Product } from '@/types';

const PAGE_SIZE = 12;
const LOAD_MORE_STEP = 8;

function matchesCategory(product: Product, category: string) {
  switch (category) {
    case 'ALL':
      return true;
    case 'EARRINGS':
      return product.category === 'earrings';
    case 'NECKLACES':
      return product.category === 'necklaces';
    case 'RINGS':
      return product.category === 'rings';
    case 'BRACELETS':
      return product.category === 'bracelets';
    case 'CHARMS':
      return product.category === 'charms';
    case 'SETS':
      return product.category === 'sets';
    case 'NEW ARRIVALS':
      return product.tag === 'new';
    case 'BESTSELLERS':
      return product.tag === 'bestseller';
    default:
      return true;
  }
}

function sortProducts(list: Product[], sortBy: string) {
  const sorted = [...list];
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => Number(b.tag === 'new') - Number(a.tag === 'new'));
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'popular':
      return sorted.sort((a, b) => Number(b.tag === 'bestseller') - Number(a.tag === 'bestseller'));
    case 'featured':
    default:
      return sorted;
  }
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
  exit: {},
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeOut' as const } },
};

function ShopPageHeader() {
  return (
    <div className="relative overflow-hidden bg-blush-50 px-6 py-10">
      <motion.span
        className="pointer-events-none absolute right-10 top-6 rotate-12 opacity-20"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart size={30} color="#F27AA2" />
      </motion.span>
      <motion.span
        className="pointer-events-none absolute left-1/3 top-4 opacity-25"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      >
        <Sparkle size={22} color="#E94F83" />
      </motion.span>
      <motion.span
        className="pointer-events-none absolute bottom-2 right-1/4 opacity-25"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.7, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      >
        <Star size={18} color="#F8A6BC" />
      </motion.span>

      <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-[#9B8B91]">HOME → SHOP</p>
      <h1
        className="mt-2 font-display font-[900] text-charcoal"
        style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}
      >
        THE COLLECTION
      </h1>
      <p className="mt-1 inline-block rotate-[-0.5deg] font-handwritten text-lg text-blush-600">
        find your next favourite piece ♡
      </p>
    </div>
  );
}

function CollectionCallout({ onShopEdit }: { onShopEdit: () => void }) {
  return (
    <div
      className="flex flex-col items-center gap-2 border-[1.5px] border-dashed border-blush-300 bg-blush-200 px-5 py-6 text-center"
      style={{ borderRadius: '4px 12px 6px 14px', gridColumn: '1 / -1' }}
    >
      <Star size={22} color="#E94F83" />
      <h3 className="font-handwritten text-xl text-blush-600">EVERYDAY SPARKLES ✦</h3>
      <p className="max-w-xs font-sans text-xs text-charcoal-soft">
        pieces you&apos;ll reach for every single day
      </p>
      <Button variant="outline" size="sm" onClick={onShopEdit} className="mt-1">
        SHOP THIS EDIT →
      </Button>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center gap-3 py-20 text-center">
      <Heart size={48} color="#F8A6BC" />
      <h3 className="font-display text-2xl text-charcoal">nothing here yet ♡</h3>
      <p className="font-handwritten text-lg text-blush-600">try a different category</p>
      <Button variant="outline" onClick={onReset} className="mt-2">
        VIEW ALL
      </Button>
    </div>
  );
}

export default function ShopGrid() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('featured');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => matchesCategory(product, activeCategory));
    return sortProducts(filtered, sortBy);
  }, [activeCategory, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;
  const progressPercent = filteredProducts.length
    ? Math.min(100, Math.round((visibleCount / filteredProducts.length) * 100))
    : 0;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setVisibleCount(PAGE_SIZE);
  };

  const resetToAll = () => handleCategoryChange('ALL');

  const gridItems = visibleProducts.flatMap((product, i) => {
    const isPolaroid = (i + 1) % 7 === 0;
    const items = [
      <motion.div key={product.id} variants={cardVariants}>
        <ProductCard product={product} variant={isPolaroid ? 'polaroid' : 'default'} index={i} />
      </motion.div>,
    ];

    if (i !== 0 && i % 8 === 0) {
      items.push(
        <motion.div key={`callout-${product.id}`} variants={cardVariants} style={{ gridColumn: '1 / -1' }}>
          <CollectionCallout onShopEdit={resetToAll} />
        </motion.div>
      );
    }

    return items;
  });

  return (
    <section>
      <ShopPageHeader />

      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        activeSortBy={sortBy}
        onSortChange={handleSortChange}
        totalProducts={filteredProducts.length}
      />

      <div className="px-4 py-4 sm:px-6 sm:py-8">
        {filteredProducts.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            <EmptyState onReset={resetToAll} />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${sortBy}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5"
            >
              {gridItems}
            </motion.div>
          </AnimatePresence>
        )}

        {filteredProducts.length > 0 && (
          <div className="mt-10 flex flex-col items-center">
            {hasMore ? (
              <>
                <p className="font-sans text-xs text-[#9B8B91]">
                  showing {visibleProducts.length} of {filteredProducts.length} pieces
                </p>
                <div className="mt-2 h-0.5 w-40 overflow-hidden bg-blush-200" style={{ borderRadius: '1px' }}>
                  <motion.div
                    className="h-full bg-blush-500"
                    style={{ borderRadius: '1px' }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
                <motion.div whileTap={{ scale: 0.97 }} className="mt-4">
                  <Button
                    variant="handmade"
                    onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
                  >
                    load more pieces ♡
                  </Button>
                </motion.div>
              </>
            ) : (
              <p className="font-handwritten text-lg text-blush-600">
                you&apos;ve seen it all ✦ check back for new drops ♡
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
