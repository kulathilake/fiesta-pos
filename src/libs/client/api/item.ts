/**
 * Items API Client
 */

import { Item, ItemCategory } from "@prisma/client";
import axios from "axios";
import {
  GetCategoryItemsResponse,
  GetItemCatgoriesResponse,
} from "src/common/types/api/items/item.types";
import { AuthAPIClient } from "./auth";

export class ItemAPI {

  static async getItemCategories(): Promise<GetItemCatgoriesResponse> {
    return (await axios.get("/menu/api/items/categories")).data;
  }

  static async getCategoryItems(
    category: number
  ): Promise<GetCategoryItemsResponse> {
    return (await axios.get(`/menu/api/items/cat/${category}/`)).data;
  }

  static async createNewItem(body: Partial<Item>): Promise<Item> {
    return await axios.post("/menu/api/items/", body, {
      headers: {
        Authorization: AuthAPIClient.getInstance().token,
      },
    });
  }

  static async createNewCat(
    body: Partial<ItemCategory>
  ): Promise<ItemCategory> {
    return (await axios.post("/menu/api/items/categories", body, {
      headers: {
        Authorization: AuthAPIClient.getInstance().token,
      },
    })).data;
  }
}
