import { Expense } from "@prisma/client";
import axios from "axios";
import { AuthAPIClient } from "./auth";

export class ExpenseApiClient {
    static async createExpense(body: Partial<Expense>):Promise<Expense>{
        return (await axios.post('/dashboard/api/expense',body, {
            headers:{
                Authorization: AuthAPIClient.getInstance().token
            }
        })).data as Expense
    }

    static async getExpenses(start:Date,end: Date): Promise<Expense[]> {
        return (await axios.get('/dashboard/api/expense',{
            params: {
                start,
                end
            },
            headers: {
                Authorization: AuthAPIClient.getInstance().token
            }
        })).data as Expense[]
    }
}