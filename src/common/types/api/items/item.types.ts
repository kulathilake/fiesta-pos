import { Item } from "@prisma/client";

export type GetItemCatgoriesResponse = {
    categories: {
        id: number;
        label: string;
        section: 'HOT_KITCHEN' | 'BBQ_N_GRILL' | 'INDIAN_CUISINE'
    }[]
};

export type GetCategoryItemsResponse = {
    category: string;
    items: Item[]
}