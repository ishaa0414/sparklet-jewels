import { Product } from '@/types';

export interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div>
      {/* TODO: ProductInfo — name, price, description, material, add-to-bag */}
    </div>
  );
}
