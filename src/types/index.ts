export type Category =
  | 'earrings'
  | 'necklaces'
  | 'rings'
  | 'bracelets'
  | 'charms'
  | 'sets'
  | 'bookmarks'
  | 'mini camera'
  | 'gothic'
  | 'couple';

export type ProductTag = 'new' | 'bestseller' | 'limited' | 'antitarnish';

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: Category;
  alsoIn?: Category[];
  tag?: ProductTag;
  description: string;
  material: string;
  dimensions: string;
  care: string;
  inStock: boolean;
  images: string[];
  relatedProducts: string[];
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  headline: string;
  subtext: string;
  productSlugs: string[];
}
