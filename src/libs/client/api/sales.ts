import axios from "axios";
import { AuthAPIClient } from "./auth";
import { GetSalesResponse, GetSalesSummaryResponse } from "src/common/types/api/sales/sales.types";

export class SalesApiClient {
    /**
     * returns a sales summary for a given period of time.
     * @param start 
     * @param end 
     */
    static async getPosSalesSummary(start:string,end:string) {
        return (await axios.get('/dashboard/api/sales/summary',{
            params: {
                start,
                end
            },
            headers: {
                Authorization: AuthAPIClient.getInstance().token
            }
        })).data as GetSalesSummaryResponse
    }

    static async getPosSales(start:string,end:string):Promise<GetSalesResponse> {
        return (await axios.get('/dashboard/api/sales',{
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