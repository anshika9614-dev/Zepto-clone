export interface Product {
  id: string | number;
  name: string;
  image: string;
  price: number;
  mrp: number;
  unit: string;
  rating: number;
  ratingCount: string;
  category: string;
  tags: string[];
  description: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  color: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
}
