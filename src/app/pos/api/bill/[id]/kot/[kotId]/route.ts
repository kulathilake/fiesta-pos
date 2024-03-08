/**
 * Update existing bill item
 */

import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";
import { UPDATE_BILL_ITEM_ERROR } from "src/common/errors/billItem.errors";
import { UpdateBillItemBody, UpdateBillItemValidator } from "src/common/types/api/bill/billItem.types";
import { KOTChangeStatusRequestBody } from "src/common/types/api/bill/kot.types";

export async function PUT(request: Request, {params}: {params:{kotId:string}}) {
    const {kotId} = params;
    const db = new PrismaClient();
    try {
        const body = (await request.json()) as KOTChangeStatusRequestBody;
        const response = await db.kitchenTicket.update({
            where: {
                id: +kotId,
            },
            data: {
                status: body.status,
                updatedAt: new Date()
            }
        })
        return Response.json(response);
    } catch (error) {
        console.log(error)
        return Response.json(UPDATE_BILL_ITEM_ERROR.INVALID_PAYLOAD_ERROR, {status:400})
    }
}