import axios from "axios";
import { AuthAPIClient } from "./auth";
import { KOTStatus, KitchenTicket } from "@prisma/client";
import { KOTChangeStatusRequestBody, KOTWithItems } from "src/common/types/api/bill/kot.types";

export class KotClient {
    static async getCurrentBillKots(billId: string):Promise<KOTWithItems[]>{
        return (await axios.get(`/pos/api/bill/${billId}/kot`,{
            headers: {
                Authorization: AuthAPIClient.getInstance().token
            }
        })).data
    }

    static async updateKOTStatus(billId:number, kotId:number,status: KOTStatus):Promise<KOTWithItems> {
        return (await axios.put(`/pos/api/bill/${billId}/kot/${kotId}`,{
            kotId: kotId,
            status
        } as KOTChangeStatusRequestBody))
    }
}
