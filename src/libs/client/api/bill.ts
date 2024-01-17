/**
 * Bills API Client
 */

import { Bill, BillPayment, BillType } from "@prisma/client";
import axios from "axios";
import { AuthAPIClient } from "./auth";
import { BillWithItems, CloseBillReqBody } from "src/common/types/api/bill/bill.types";
import { CreateBillItemBody, UpdateBillItemBody } from "src/common/types/api/bill/billItem.types";

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

    static async addBillItem(billId: string, itemId:number, qty: number): Promise<BillWithItems> {
        return (await axios.post(`/app/api/bill/${billId}/item`,{
            billId,
            itemId,
            qty,
        } as CreateBillItemBody,{
            headers: {
                Authorization: AuthAPIClient.getInstance().token
            }
        })).data;
    }

    static async updateBillItem(billId:string, billItemId:number, newQty:number, isDeleted:boolean):Promise<BillWithItems>{
        return (await axios.put(`/app/api/bill/${billId}/item/${billItemId}`,{
            billItemId,
            qty: newQty,
            isDeleted
        } as UpdateBillItemBody,{
            headers: {
                Authorization: AuthAPIClient.getInstance().token
            }
        }))
    }

    static async closeBill(data: CloseBillReqBody):Promise<{bill:BillWithItems, payment:BillPayment}>{
        return (await axios.put(`/app/api/bill/${data.billId}/close`,{
            ...data,   
        })).data
    }
}