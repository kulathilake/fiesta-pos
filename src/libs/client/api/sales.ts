import axios from "axios";
import { AuthAPIClient } from "./auth";
import { GetSalesResponse } from "src/common/types/api/sales/sales.types";

export class SalesApiClient {
    /**
     * returns a sales summary for a given period of time.
     * @param start 
     * @param end 
     */
    static async getPosSalesSummary(start:string,end:string) {
        return (await axios.get('/dashboard/sales',{
            params: {
                start,
                end
            },
            headers: {
                Authorization: AuthAPIClient.getInstance().token
            }
        })).data as GetSalesResponse
    }
}