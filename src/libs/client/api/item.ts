/**
 * Items API Client
 */

import axios from "axios";
import { GetCategoryItemsResponse, GetItemCatgoriesResponse } from "src/common/types/api/items/item.types";

export class ItemAPI {
    
    static async getItemCategories(): Promise<GetItemCatgoriesResponse>{
        return (await axios.get('/pos/api/items/categories')).data;
    }

    static async getCategoryItems(category:number):Promise<GetCategoryItemsResponse> {
        return (await axios.get(`/pos/api/items/cat/${category}/`)).data
    }
}