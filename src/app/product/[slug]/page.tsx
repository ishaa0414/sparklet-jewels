import { notFound } from 'next/navigation';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import RelatedProducts from '@/components/product/RelatedProducts';
import { getProductBySlug, getRelatedProducts, products } from '@/lib/data/products';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);

  return (
    <>
      <ProductGallery images={product.images} name={product.name} />
      <ProductInfo product={product} />
      <RelatedProducts products={related} />
    </>
  );
}
