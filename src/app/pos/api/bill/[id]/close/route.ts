/**
 * Close an open bill
 */

import { PrismaClient } from "@prisma/client";
import { CLOSE_BILL_ERROR } from "src/common/errors/bill.errors";
import { CloseBillReqBody } from "src/common/types/api/bill/bill.types";
import { getPrismaClient } from "src/libs/server/prisma";

export async function PUT(request:Request){
    try {
        const body = await request.json() as CloseBillReqBody
        const db = getPrismaClient();
        try {
            const paymentRes = db.billPayment.create({
                data: {
                    billId: body.billId,
                    mode: body.mode,
                    total: body.total,
                    tendered: body.tendered,
                    balance: body.balance,
                    paidAt: new Date()
                }
            });
            const billUpdateRes = db.bill.update({
                data:{
                    status: 'PAID',
                    closedAt: new Date(),
                },
                where:{
                    id: body.billId
                }
            })

            const transaction = await db.$transaction([paymentRes,billUpdateRes],{
                isolationLevel: 'ReadCommitted'
            });
            return Response.json({bill:transaction[1],payment:transaction[0]});
        } catch (error) {
            return Response.json(CLOSE_BILL_ERROR.FAILED_TO_CLOSE_BILL_ERROR,{status:500});
        }
    } catch (error) {
        return Response.json(CLOSE_BILL_ERROR.INVALID_PAYLOAD_ERROR, {status:400});
    }
}