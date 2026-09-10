import HeroSection from '@/components/home/HeroSection';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import ProductGrid from '@/components/home/ProductGrid';
import AboutTeaser from '@/components/home/AboutTeaser';

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <FeaturedCollections />
      <ProductGrid />
      <AboutTeaser />
    </div>
  );
}
