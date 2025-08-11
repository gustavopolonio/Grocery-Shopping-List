import type { Profile } from "./profile";

export type List = {
  id: string;
  name: string;
  listMember: ListMember[];
  itemsCount?: number;
};

type ListMember = {
  profile: Profile;
};
