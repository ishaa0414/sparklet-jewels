'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Minus, Plus, Heart as LucideHeart } from 'lucide-react';
import Button from '@/components/ui/Button';
import { openWhatsAppOrder } from '@/lib/whatsapp';
import { formatPrice, cn } from '@/lib/utils';
import type { Product, ProductTag } from '@/types';

export interface ProductInfoProps {
  product: Product;
}

const TAG_META: Record<ProductTag, { label: string; bg: string; text: string }> = {
  new: { label: 'NEW ✦', bg: '#E94F83', text: '#FFFFFF' },
  bestseller: { label: 'FAVE ♡', bg: '#242124', text: '#FFFFFF' },
  limited: { label: 'LIMITED', bg: '#F27AA2', text: '#FFFFFF' },
  antitarnish: { label: 'ANTI-TARNISH ✦', bg: '#B8892E', text: '#FFFFFF' },
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const tagMeta = product.tag ? TAG_META[product.tag] : null;

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => Math.min(10, q + 1));

  const handleOrderViaWhatsApp = () => {
    openWhatsAppOrder(product.name, quantity, product.slug);
  };

  return (
    <div className="pb-24 lg:pb-0">
      <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-[#9B8B91]">
        <Link href="/" className="hover:text-blush-500">
          HOME
        </Link>{' '}
        →{' '}
        <Link href="/shop" className="hover:text-blush-500">
          SHOP
        </Link>{' '}
        → {product.category} → {product.name}
      </p>

      <h1 className="mt-3 font-display text-[24px] font-bold leading-tight text-charcoal lg:text-[32px]">
        {product.name}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className="font-sans text-[10px] font-medium uppercase tracking-[0.08em]"
          style={{
            backgroundColor: '#FDE7EC',
            border: '1px solid #F8A6BC',
            color: '#D93670',
            padding: '2px 10px',
            borderRadius: '2px',
          }}
        >
          {product.category}
        </span>

        {tagMeta && (
          <span
            className="rotate-[-1deg] font-sans text-[10px] font-semibold uppercase tracking-[0.08em]"
            style={{ backgroundColor: tagMeta.bg, color: tagMeta.text, padding: '2px 10px', borderRadius: '2px' }}
          >
            {tagMeta.label}
          </span>
        )}
      </div>

      <p className="mt-4 font-sans text-[28px] font-bold" style={{ color: '#D93670' }}>
        {formatPrice(product.price)}
      </p>

      <p className="mt-1 inline-block rotate-[-0.5deg] font-handwritten text-[15px] text-blush-400">
        {product.description}
      </p>

      <div className="my-5 h-px" style={{ backgroundColor: 'rgba(248, 166, 188, 0.3)' }} />

      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: product.inStock ? '#4CAF50' : '#E53935' }}
          aria-hidden="true"
        />
        <p className="font-sans text-[13px] text-[#3A3034]">
          {product.inStock ? 'In Stock — ready to ship ✦' : 'Out of Stock'}
        </p>
      </div>

      <div className="mt-5">
        <p className="font-sans text-xs text-[#9B8B91]">quantity:</p>
        <div className="mt-2 flex items-center gap-3">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={decrement}
            disabled={quantity <= 1}
            className="flex h-8 w-8 items-center justify-center bg-white text-charcoal disabled:opacity-40"
            style={{ border: '1.5px solid #F8A6BC', borderRadius: '4px' }}
          >
            <Minus size={14} />
          </button>
          <span className="w-6 text-center font-sans text-sm font-medium text-charcoal">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={increment}
            disabled={quantity >= 10}
            className="flex h-8 w-8 items-center justify-center bg-white text-charcoal disabled:opacity-40"
            style={{ border: '1.5px solid #F8A6BC', borderRadius: '4px' }}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="hidden lg:block">
        <motion.button
          type="button"
          onClick={handleOrderViaWhatsApp}
          whileHover={{ backgroundColor: '#D93670', y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full font-sans text-[15px] font-semibold text-white"
          style={{ height: '52px', borderRadius: '4px 10px 6px 8px', backgroundColor: '#E94F83' }}
        >
          ORDER ON WHATSAPP ♡
        </motion.button>
      </div>

      <Button
        variant="outline"
        className="mt-3 w-full justify-center"
        onClick={() => setWishlisted((w) => !w)}
      >
        <motion.span
          key={wishlisted ? 'on' : 'off'}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 0.3 }}
          className="inline-flex"
        >
          <LucideHeart size={15} color={wishlisted ? '#E94F83' : 'currentColor'} fill={wishlisted ? '#E94F83' : 'none'} strokeWidth={1.75} />
        </motion.span>
        {wishlisted ? 'SAVED TO WISHLIST ♡' : 'SAVE TO WISHLIST ♡'}
      </Button>

      <div
        className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-4 bg-white px-4 py-3 lg:hidden"
        style={{ borderTop: '1px solid #F8A6BC' }}
      >
        <span className="font-sans text-lg font-bold" style={{ color: '#D93670' }}>
          {formatPrice(product.price)}
        </span>
        <motion.button
          type="button"
          onClick={handleOrderViaWhatsApp}
          whileTap={{ scale: 0.98 }}
          className={cn('flex-1 font-sans text-sm font-semibold text-white')}
          style={{ height: '44px', borderRadius: '4px 10px 6px 8px', backgroundColor: '#E94F83', maxWidth: '220px' }}
        >
          ORDER ON WHATSAPP ♡
        </motion.button>
      </div>
    </div>
  );
}
