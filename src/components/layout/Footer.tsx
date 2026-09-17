import Link from 'next/link';
import { Instagram } from 'lucide-react';
import TornEdge from '@/components/ui/TornEdge';
import Button from '@/components/ui/Button';
import { Heart, Star, Sparkle, ScrapbookFlower } from '@/components/ui/ScrapbookDecorations';
import { INSTAGRAM_PROFILE_URL } from '@/lib/instagram';

const SHOP_LINKS = [
  { label: 'Earrings', href: '/shop?category=earrings' },
  { label: 'Necklaces', href: '/shop?category=necklaces' },
  { label: 'Rings', href: '/shop?category=rings' },
  { label: 'Bracelets', href: '/shop?category=bracelets' },
  { label: 'Charms', href: '/shop?category=charms' },
  { label: 'Sets', href: '/shop?category=sets' },
];

const HELP_LINKS = [
  { label: 'Shipping & Returns', href: '/help/shipping-returns' },
  { label: 'Size Guide', href: '/help/size-guide' },
  { label: 'Care Instructions', href: '/help/care' },
  { label: 'Contact Us', href: '/help/contact' },
  { label: 'FAQs', href: '/help/faqs' },
];

const LINK_CLASSES = 'font-sans text-[13px] text-charcoal-soft transition-colors duration-200 hover:text-blush-500';
const HEADING_CLASSES = 'font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal-soft';

function PinterestIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.1 2 11.2c0 3.7 2.1 6.8 5.1 8.1-.1-.7-.1-1.7 0-2.4.1-.7 1-4.2 1-4.2s-.2-.5-.2-1.2c0-1.1.7-2 1.5-2 .7 0 1 .5 1 1.2 0 .7-.5 1.8-.7 2.8-.2.8.4 1.5 1.3 1.5 1.5 0 2.6-1.9 2.6-4.1 0-1.7-1.2-3-3.5-3-2.5 0-4.1 1.9-4.1 3.9 0 .7.3 1.5.6 1.9.1.1.1.2.1.3-.1.4-.3 1.2-.3 1.3 0 .2-.2.3-.4.2-1.2-.5-2-2.3-2-3.7 0-3 2.2-5.8 6.3-5.8 3.3 0 5.9 2.3 5.9 5.5 0 3.3-2.1 5.9-4.9 5.9-1 0-1.9-.5-2.2-1.1l-.6 2.3c-.2.8-.8 1.9-1.2 2.5.9.3 1.9.4 2.9.4 5.5 0 10-4.1 10-9.2S17.5 2 12 2z" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 2c.3 2.3 1.8 4 4.2 4.3v2.8c-1.5.1-2.8-.4-4.2-1.3v6.7c0 3.4-2.8 6.1-6.2 5.9-3.1-.2-5.5-2.8-5.5-5.9 0-3.3 2.7-5.9 5.9-5.9.3 0 .6 0 .9.1v2.9c-.3-.1-.6-.2-.9-.2-1.6 0-2.9 1.3-2.9 3s1.3 3 2.9 3 3-1.3 3-3V2h2.8z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: 'Instagram', href: INSTAGRAM_PROFILE_URL, icon: Instagram },
  { label: 'Pinterest', href: 'https://pinterest.com', icon: PinterestIcon },
  { label: 'TikTok', href: 'https://tiktok.com', icon: TikTokIcon },
];

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
      <Sparkle
        size={30}
        color="#F27AA2"
        className="pointer-events-none absolute bottom-24 right-1/4 rotate-6 opacity-15"
      />

      <div className="relative z-[1] mx-auto max-w-6xl px-5 pb-8 pt-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <div>
            <div className="relative inline-flex items-center gap-1.5">
              <span className="font-display text-xl font-bold text-charcoal">SPARKLET JEWELS</span>
              <ScrapbookFlower size={18} color="#D93670" />
            </div>
            <p className="mt-2 font-handwritten text-base text-blush-600">made for everyday magic ♡</p>
            <div className="mt-4 flex items-center gap-4">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="text-charcoal-soft transition-colors duration-200 hover:text-blush-500"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
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

          {/* Column 3 — Help */}
          <div>
            <h3 className={HEADING_CLASSES}>HELP</h3>
            <ul className="mt-4 space-y-2.5">
              {HELP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={LINK_CLASSES}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Newsletter */}
          <div>
            <h3 className="font-handwritten text-lg text-charcoal">stay in the loop ♡</h3>
            <p className="mt-2 font-sans text-xs leading-relaxed text-charcoal-soft">
              new drops, behind the scenes, and exclusive discounts straight to your inbox.
            </p>
            <form className="mt-4">
              <input
                type="email"
                required
                placeholder="your email address"
                className="w-full border-[1.5px] border-blush-300 bg-white px-3.5 py-2.5 font-sans text-sm text-charcoal placeholder:text-charcoal-soft/50 focus:outline-none focus:ring-1 focus:ring-blush-400"
                style={{ borderRadius: '4px' }}
              />
              <Button type="submit" variant="primary" className="mt-3 w-full justify-center">
                SUBSCRIBE ♡
              </Button>
            </form>
            <p className="mt-2 font-sans text-[11px] text-[#9B8B91]">no spam, only sparkle ✦</p>
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
