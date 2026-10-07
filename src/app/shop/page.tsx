import ShopGrid from '@/components/shop/ShopGrid';

export default function ShopPage({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams.category;
  const initialCategory = category === 'antitarnish' ? 'ANTI-TARNISH' : category?.toUpperCase();
  return <ShopGrid initialCategory={initialCategory} />;
}
