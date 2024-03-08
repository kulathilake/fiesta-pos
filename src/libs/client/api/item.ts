/**
 * Items API Client
 */

import { Item } from "@prisma/client";
import axios from "axios";
import { GetCategoryItemsResponse, GetItemCatgoriesResponse } from "src/common/types/api/items/item.types";
import { AuthAPIClient } from "./auth";

export class ItemAPI {
    
    static async getItemCategories(): Promise<GetItemCatgoriesResponse>{
        return (await axios.get('/pos/api/items/categories')).data;
    }

    static async getCategoryItems(category:number):Promise<GetCategoryItemsResponse> {
        return (await axios.get(`/pos/api/items/cat/${category}/`)).data
    }

    static async createNewItem(body: Partial<Item>):Promise<Item> {
        return (await axios.post('/pos/api/items/',body, {
            headers: {
                'Authorization':AuthAPIClient.getInstance().token
            }
        }))
    }
}