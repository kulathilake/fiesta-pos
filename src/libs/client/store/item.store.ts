import {
  Item,
  ItemCategory,
} from "@prisma/client";
import { create } from "zustand";

type State = {
  items: {
    [category: string]: Item[];
  };
};
type Actions = {
  addCategoryItems: (category: ItemCategory, items: Item[]) => void;
};
export const useItemStore = create<State & Actions>((set) => ({
  items: {},
  addCategoryItems: (category: ItemCategory, items: Item[]) =>
    set((state) => ({items: {...state.items,[category.id]: items,}})),
}));
