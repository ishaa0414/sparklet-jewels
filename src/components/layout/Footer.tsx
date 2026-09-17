import Link from 'next/link';
import { Instagram, MessageCircle } from 'lucide-react';
import TornEdge from '@/components/ui/TornEdge';
import { Heart, Star, ScrapbookFlower } from '@/components/ui/ScrapbookDecorations';
import { INSTAGRAM_PROFILE_URL } from '@/lib/instagram';

const SHOP_LINKS = [
  { label: 'Earrings', href: '/shop?category=earrings' },
  { label: 'Necklaces', href: '/shop?category=necklaces' },
  { label: 'Rings', href: '/shop?category=rings' },
  { label: 'Bracelets', href: '/shop?category=bracelets' },
  { label: 'Charms', href: '/shop?category=charms' },
];

const LINK_CLASSES = 'font-sans text-[13px] text-charcoal-soft transition-colors duration-200 hover:text-blush-500';
const HEADING_CLASSES = 'font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal-soft';

export default function Footer() {
  return (
    <footer className="paper-grain relative overflow-hidden bg-blush-200 pt-10">
      <TornEdge position="top" color="#FDE7EC" />

      <Heart
        size={70}
        color="#F27AA2"
        className="pointer-events-none absolute -left-4 top-16 rotate-[-8deg] opacity-20"
      />
      <Star
        size={40}
        color="#E94F83"
        className="pointer-events-none absolute right-8 top-10 rotate-12 opacity-20"
      />

      <div className="relative z-[1] mx-auto max-w-6xl px-5 pb-8 pt-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Column 1 — Brand */}
          <div>
            <div className="relative inline-flex items-center gap-1.5">
              <span className="font-display text-xl font-bold text-charcoal">SPARKLET JEWELS</span>
              <ScrapbookFlower size={18} color="#D93670" />
            </div>
            <p className="mt-2 font-handwritten text-base text-blush-600">made for everyday magic ♡</p>
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="mt-4 inline-flex items-center gap-2 text-charcoal-soft transition-colors duration-200 hover:text-blush-500"
            >
              <Instagram size={18} />
              <span className="font-sans text-[13px]">@sparklet.jewels</span>
            </a>
          </div>

          {/* Column 2 — Shop */}
          <div>
            <h3 className={HEADING_CLASSES}>SHOP</h3>
            <ul className="mt-4 space-y-2.5">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={LINK_CLASSES}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Get in touch */}
          <div>
            <h3 className={HEADING_CLASSES}>GET IN TOUCH</h3>
            <p className="mt-4 font-sans text-[13px] leading-relaxed text-charcoal-soft">
              Questions about an order or a piece? Message us directly.
            </p>
            <a
              href="https://wa.me/919304944981"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex items-center gap-2 text-charcoal-soft transition-colors duration-200 hover:text-blush-500"
            >
              <MessageCircle size={16} />
              <span className="font-sans text-[13px]">Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-blush-400/25 pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-sans text-[11px] text-[#9B8B91]">© 2025 Sparklet Jewels. All rights reserved.</p>
          <p className="font-handwritten text-sm text-blush-600">Made with ♡ for girls who sparkle</p>
        </div>
      </div>
    </footer>
  );
}
