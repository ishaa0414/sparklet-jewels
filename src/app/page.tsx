import HeroSection from '@/components/home/HeroSection';
import ProductGrid from '@/components/home/ProductGrid';
import ShopByMood from '@/components/home/ShopByMood';
import InstagramReels from '@/components/home/InstagramReels';
import AboutTeaser from '@/components/home/AboutTeaser';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <ScrollReveal>
        <ProductGrid />
      </ScrollReveal>
      <ScrollReveal>
        <ShopByMood />
      </ScrollReveal>
      <ScrollReveal>
        <InstagramReels />
      </ScrollReveal>
      <ScrollReveal>
        <AboutTeaser />
      </ScrollReveal>
    </div>
  );
}
