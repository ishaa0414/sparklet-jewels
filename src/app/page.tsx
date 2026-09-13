import HeroSection from '@/components/home/HeroSection';
import AboutTeaser from '@/components/home/AboutTeaser';

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <AboutTeaser />
    </div>
  );
}
