import type { Category } from "@/@types/item";
import type { Profile } from "@/@types/profile";

export type List = {
  id: string;
  name: string;
  listMember: ListMember[];
  itemsCount?: number;
};

type ListMember = {
  profile: Profile;
};

export type ListItems = {
  list: List;
  categories: Category[];
};
