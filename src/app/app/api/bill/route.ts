/**
 * API Routes for bills
 */

import { PrismaClient } from "@prisma/client";
import { OPEN_BILL_ERROR } from "src/common/errors/bill.errors";
import { OpenBillReqBody } from "src/common/types/api/bill/bill.types";

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as OpenBillReqBody
        const db = new PrismaClient();
        const newBill = await db.bill.create({
            data: {
                id: Math.random().toLocaleString(),
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