import { BillPayment } from "@prisma/client";
import axios from "axios";
import { BillWithItems } from "src/common/types/api/bill/bill.types";

const PRINT_SERVER_ADDR = process.env.PRINT_SERVER_ADDR || 'http://localhost:9000'

export class PrintClient {
    static async printBill(bill: BillWithItems) {
        axios.post(`${PRINT_SERVER_ADDR}/print/bill`,{
            ...bill,
        })
    }
}