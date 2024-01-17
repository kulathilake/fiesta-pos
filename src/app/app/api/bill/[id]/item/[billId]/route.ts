/**
 * Update existing bill item
 */

import { PrismaClient } from "@prisma/client";
import { UPDATE_BILL_ITEM_ERROR } from "src/common/errors/billItem.errors";
import { UpdateBillItemBody, UpdateBillItemValidator } from "src/common/types/api/bill/billItem.types";

export async function PUT(request: Request) {
    try {
        const body = await request.json() as UpdateBillItemBody;
        UpdateBillItemValidator.parse(body);
        const db = new PrismaClient();
        if(body.isDeleted) {
            const deleteRes = await db.billItem.delete({
                where: {
                    id: body.billItemId
                }
            });
            return Response.json(deleteRes);
        }else {
            const updateRes = await db.billItem.update({
                data: {
                    qty: body.qty
                },
                where:{
                    id: body.billItemId
                }
            });

            return Response.json(updateRes)
        }
    } catch (error) {
        return Response.json(UPDATE_BILL_ITEM_ERROR.INVALID_PAYLOAD_ERROR, {status:400})
    }
}