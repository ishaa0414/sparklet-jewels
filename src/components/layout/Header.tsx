'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Sparkle } from '@/components/ui/ScrapbookDecorations';
import { cn } from '@/lib/utils';

const SCROLL_THRESHOLD = 60;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex h-16 w-full items-center px-5 transition-[background-color,border-color] duration-300 lg:h-20 lg:px-10',
        scrolled ? 'border-b border-blush-300/30 backdrop-blur-sm' : 'border-b border-transparent'
      )}
      style={{ backgroundColor: scrolled ? 'rgba(255, 248, 247, 0.92)' : 'transparent' }}
    >
      <div className="flex w-full items-center justify-between">
        {/* LEFT — logo + wordmark */}
        <Link href="/" className="relative flex items-center gap-2.5">
          <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-full sm:h-11 sm:w-11 lg:h-12 lg:w-12">
            <Image src="/images/sparkletlogo.jpg" alt="" fill sizes="48px" className="object-cover" priority />
          </span>
          <span className="whitespace-nowrap font-display text-[11px] font-bold leading-none tracking-tight text-charcoal sm:text-[19px] lg:text-[22px]">
            SPARKLET JEWELS
          </span>
          <Sparkle
            size={10}
            color="#F27AA2"
            className="pointer-events-none absolute -right-3 -top-2 rotate-12 opacity-50"
          />
        </Link>

        {/* RIGHT — shop CTA */}
        <Button variant="primary" size="sm" href="/shop" className="shrink-0 whitespace-nowrap !px-3 !py-1.5 text-[11px] sm:!px-4 sm:!py-2 sm:text-sm">
          SEE ALL PRODUCTS →
        </Button>
      </div>

      {/* differentiator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-blush-300/60" aria-hidden="true" />
    </header>
  );
}
