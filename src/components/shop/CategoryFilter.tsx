'use client';

import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Star } from '@/components/ui/ScrapbookDecorations';
import { cn } from '@/lib/utils';

export interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeSortBy: string;
  onSortChange: (sort: string) => void;
  totalProducts: number;
}

const CATEGORIES = ['ALL', 'EARRINGS', 'NECKLACES', 'RINGS', 'BRACELETS', 'CHARMS', 'BOOKMARKS', 'SETS', 'MINI CAMERA', 'GOTHIC', 'COUPLE', 'ANTI-TARNISH'];

const SORT_OPTIONS = [
  { value: 'featured', label: 'featured' },
  { value: 'newest', label: 'newest first' },
  { value: 'price-asc', label: 'price: low to high' },
  { value: 'price-desc', label: 'price: high to low' },
  { value: 'popular', label: 'most loved ♡' },
];

const TAB_RADIUS = '3px 7px 5px 6px';

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
  activeSortBy,
  onSortChange,
  totalProducts,
}: CategoryFilterProps) {
  return (
    <div
      className="sticky top-16 z-40 border-b px-4 py-2 backdrop-blur-sm sm:px-6 sm:py-3"
      style={{ backgroundColor: 'rgba(255, 248, 247, 0.95)', borderColor: 'rgba(248, 166, 188, 0.3)' }}
    >
      <div className="hide-scrollbar flex gap-2 overflow-x-auto">
        {CATEGORIES.map((category) => {
          const active = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={cn(
                'relative shrink-0 whitespace-nowrap px-4 py-1.5 font-sans text-xs font-medium uppercase tracking-wide transition-colors duration-200',
                active
                  ? 'text-white'
                  : 'border-[1.5px] border-transparent text-charcoal-soft hover:border-blush-300 hover:bg-blush-100 hover:text-blush-600'
              )}
              style={{ borderRadius: TAB_RADIUS }}
            >
              {active && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 z-0 bg-blush-500"
                  style={{ borderRadius: TAB_RADIUS, border: '1.5px solid #E94F83' }}
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-1">
                {active && <Star size={10} color="#FFFFFF" />}
                {category}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <p className="font-sans text-[11px] text-charcoal-soft sm:text-xs">showing {totalProducts} pieces ✦</p>

        <div className="flex items-center gap-2">
          <label htmlFor="shop-sort-by" className="font-sans text-[11px] text-charcoal-soft sm:text-xs">
            sort by:
          </label>
          <div className="relative">
            <select
              id="shop-sort-by"
              value={activeSortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none border border-blush-300 bg-white py-1 pl-2 pr-6 font-sans text-xs text-charcoal-soft focus:outline-none"
              style={{ borderRadius: '4px' }}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={12}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#9B8B91]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
