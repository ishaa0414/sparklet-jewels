import HeroSection from '@/components/home/HeroSection';
import ProductGrid from '@/components/home/ProductGrid';
import ShopByMood from '@/components/home/ShopByMood';
import AboutTeaser from '@/components/home/AboutTeaser';

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <ProductGrid />
      <ShopByMood />
      <AboutTeaser />
    </div>
  );
}
