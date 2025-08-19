export type Item = {
  id: string;
  icon: string;
  name: string;
};

type UserCustomProduct = {
  id: string;
  icon: string;
  name: string;
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
