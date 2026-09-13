'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Heart as HeartIcon, ShoppingBag, Menu, X } from 'lucide-react';
import { Heart, Sparkle, Star } from '@/components/ui/ScrapbookDecorations';
import { cn } from '@/lib/utils';

const NAV_LINKS = [{ label: 'SHOP', href: '/shop' }];

const SCROLL_THRESHOLD = 60;

const underlineVariants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <motion.div
      initial="rest"
      animate={active ? 'hover' : 'rest'}
      whileHover="hover"
      className="relative"
    >
      <Link
        href={href}
        className="font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-charcoal-soft"
      >
        {label}
      </Link>
      <motion.svg
        viewBox="0 0 100 6"
        preserveAspectRatio="none"
        className="absolute -bottom-1.5 left-0 h-1.5 w-full origin-left"
        variants={underlineVariants}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <path d="M1 3 Q25 1 50 3 T99 3" stroke="#E94F83" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  );
}

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative text-charcoal-soft transition-colors duration-200 hover:text-blush-500"
    >
      {children}
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex h-14 w-full items-center px-5 transition-[background-color,border-color] duration-300 lg:h-16 lg:px-10',
        scrolled ? 'border-b border-blush-300/30 backdrop-blur-sm' : 'border-b border-transparent'
      )}
      style={{ backgroundColor: scrolled ? 'rgba(255, 248, 247, 0.92)' : 'transparent' }}
    >
      <div className="flex w-full items-center justify-between lg:grid lg:grid-cols-3">
        {/* LEFT — wordmark */}
        <div className="relative flex items-center gap-1.5">
          <Link
            href="/"
            className="font-display text-[16px] font-bold leading-none tracking-tight text-charcoal sm:text-[19px] lg:text-[22px]"
          >
            SPARKLET JEWELS
          </Link>
          <motion.span
            className="inline-flex"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart size={14} color="#F27AA2" />
          </motion.span>
          <Sparkle
            size={10}
            color="#F27AA2"
            className="pointer-events-none absolute -right-3 -top-2 rotate-12 opacity-50"
          />
        </div>

        {/* CENTER — desktop nav */}
        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} active={pathname === link.href} />
          ))}
        </nav>

        {/* RIGHT — icons */}
        <div className="flex items-center justify-end gap-4">
          <div className="hidden items-center gap-4 lg:flex">
            <IconButton label="Search">
              <Search size={18} />
            </IconButton>
            <IconButton label="Wishlist">
              <HeartIcon size={18} />
            </IconButton>
            <IconButton label="Cart">
              <ShoppingBag size={18} />
              <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blush-500 font-sans text-[10px] leading-none text-white">
                2
              </span>
            </IconButton>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className="text-charcoal-soft transition-colors duration-200 hover:text-blush-500 lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 top-0 z-40 flex h-dvh w-full flex-col overflow-hidden bg-blush-50 pt-24"
          >
            <Heart size={80} color="#F27AA2" className="pointer-events-none absolute -left-6 top-24 rotate-[-8deg] opacity-30" />
            <Star size={56} color="#F27AA2" className="pointer-events-none absolute right-6 top-1/3 rotate-12 opacity-30" />
            <Heart size={44} color="#E94F83" className="pointer-events-none absolute bottom-24 left-10 rotate-6 opacity-30" />
            <Star size={36} color="#E94F83" className="pointer-events-none absolute bottom-40 right-12 rotate-[-12deg] opacity-30" />

            <nav className="relative z-10 flex flex-1 flex-col items-start gap-6 px-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-display text-[28px] text-charcoal"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
