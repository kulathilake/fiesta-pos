import axios from "axios";
import { AuthAPIClient } from "./auth";
import { KitchenTicket } from "@prisma/client";
import { KOTWithItems } from "src/common/types/api/bill/kot.types";

export class KotClient {
    static async getCurrentBillKots(billId: string):Promise<KOTWithItems[]>{
        return (await axios.get(`/app/api/bill/${billId}/kot`,{
            headers: {
                Authorization: AuthAPIClient.getInstance().token
            }
        })).data
    }
}