/**
 * Bills API Client
 */

import { Bill, BillType } from "@prisma/client";
import axios from "axios";
import { GetCategoryItemsResponse, GetItemCatgoriesResponse } from "src/common/types/api/items/item.types";
import { AuthAPIClient } from "./auth";
import { BillWithItems } from "src/common/types/api/bill/bill.types";

export class BillAPI {
    
    static async openNewBill(type:BillType,table:number|null): Promise<any>{
        return (await axios.post('/app/api/bill',{
            type,
            table
        },{
            headers: {
                Authorization: AuthAPIClient.getInstance().token
            }
        })).data;
    }

    static async getOpenBills():Promise<(BillWithItems)[]> {
        return (await axios.get('/app/api/bill/open',{
            headers: {
                Authorization: AuthAPIClient.getInstance().token
            }
        })).data
    }
}