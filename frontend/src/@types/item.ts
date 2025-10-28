export type Item = {
  id: string;
  icon: string;
  name: string;
  quantity: number;
  note?: string;
  addedBy: string;
  createdAt: string;
};

type UserCustomProduct = {
  id: string;
  icon: string;
  name: string;
  quantity: number;
  note?: string;
  addedBy: string;
  createdAt: string;
};

export type Category = {
  icon: string;
  name: string;
  userCustomProducts: UserCustomProduct[];
  products: Item[];
};

export type CategoryItems = {
  categories: Category[];
};
