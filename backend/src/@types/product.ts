interface ProductItem {
  id: string;
  icon: string;
  name: string;
  quantity: number;
  note?: string | null;
  addedBy: string;
  createdAt: Date;
}

interface UserCustomProductItem {
  id: string;
  icon?: string | null;
  name: string;
  quantity: number;
  note?: string | null;
  addedBy: string;
  createdAt: Date;
}

export interface CategoryWithProducts {
  id: string;
  icon: string;
  name: string;
  products: ProductItem[];
  userCustomProducts: UserCustomProductItem[];
}
