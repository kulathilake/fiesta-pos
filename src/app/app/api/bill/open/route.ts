/**
 * Route to fetch all open bills.
 */

import { BillStatus, PrismaClient } from "@prisma/client";
import { OPEN_BILL_ERROR } from "src/common/errors/bill.errors";

export async function GET(){
    try {
        const db = new PrismaClient();
        const res = await db.bill.findMany({
            where: {
                status: BillStatus.OPEN
            },
            include: {
                items: true
            }
        });
        return Response.json(res);
    } catch (error) {
        return Response.json(OPEN_BILL_ERROR.FAILED_TO_READ_OPEN_BILLS_ERROR,{status:500});
    }
}