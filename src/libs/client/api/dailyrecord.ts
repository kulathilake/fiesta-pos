import { DailyRecord } from "@prisma/client";
import axios from "axios";
import { CloseDailyRecordRequest, OpenDailyRecordRequest } from "src/common/types/api/dailyRecord/dailyrecord.types";
import { AuthAPIClient } from "./auth";

export class DailyRecordClient {
    static async getDailyRecord(date:Date):Promise<DailyRecord>{
        return (await axios.get('/dashboard/api/dailyrecord',{
            params:{
                date
            },
            headers:{
                Authorization: AuthAPIClient.getInstance().token
            }
        })).data as DailyRecord;
    }
    static async openDailyRecord(data:OpenDailyRecordRequest):Promise<DailyRecord>{
        return (await axios.post('/dashboard/api/dailyrecord',data,{
            headers: {
                Authorization: AuthAPIClient.getInstance().token
            }
        })).data as DailyRecord
    };

    static async closeDailyRecor(data:CloseDailyRecordRequest):Promise<DailyRecord>{
        return (await axios.put('/dashboard/api/dailyrecord',data,{
            headers:{
                Authorization: AuthAPIClient.getInstance().token
            }
        }))
    }
}