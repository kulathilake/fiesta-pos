/**
 * API Routes for bills
 */

import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";
import { OPEN_BILL_ERROR } from "src/common/errors/bill.errors";
import { OpenBillReqBody } from "src/common/types/api/bill/bill.types";
import { getPrismaClient } from "src/libs/server/prisma";
import { billIdGenerator } from "src/libs/utils/ids";

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as OpenBillReqBody
        const db = getPrismaClient();
        const lastBill = (await db.bill.findMany({
            take: 1,
            orderBy: {
                openedAt: 'desc'
            }
        }))[0]

        const {id,visibleId}  = billIdGenerator(DateTime.fromJSDate(lastBill?.openedAt),lastBill?.visibleId); 
        
        const newBill = await db.bill.create({
            data: {
                id,
                visibleId,
                openedAt: new Date(),
                table: body.table,
                type: body.type,
                status: 'OPEN'
            }
        })
        return Response.json(newBill,{status:201});
    } catch (error) {
        return Response.json(OPEN_BILL_ERROR.FAILED_TO_READ_OPEN_BILLS_ERROR,{status:500});
    }
}