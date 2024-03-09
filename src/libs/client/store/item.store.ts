import {
  Item,
  ItemCategory,
} from "@prisma/client";
import { create } from "zustand";

type State = {
  items: {
    [category: string]: Item[];
  };
  categories: ItemCategory[]
};
type Actions = {
  addCategoryItems: (category: ItemCategory, items: Item[]) => void;
  addCategories: (categories: ItemCategory[]) => void,
  addNewCategory: (category:ItemCategory) => void;
};
export const useItemStore = create<State & Actions>((set) => ({
  items: {},
  categories: [],
  addCategoryItems: (category: ItemCategory, items: Item[]) =>set((state) => ({items: {...state.items,[category.id]: items,}})),
  addCategories: (categories) => set(()=>({categories})),
  addNewCategory: (category) => set(state => {
    return {...state,categories:[...state.categories,category]}
  })
}
));
