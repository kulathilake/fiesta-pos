/**
 * Update existing bill item
 */

import { PrismaClient } from "@prisma/client";
import { UPDATE_BILL_ITEM_ERROR } from "src/common/errors/billItem.errors";
import { UpdateBillItemBody, UpdateBillItemValidator } from "src/common/types/api/bill/billItem.types";
import { getPrismaClient } from "src/libs/server/prisma";

export async function PUT(request: Request, {params}: {params:{id:string}}) {
    const {id:billId} = params;
    try {
        const body = await request.json() as UpdateBillItemBody;
        UpdateBillItemValidator.parse(body);
        const db = getPrismaClient();
        if(body.isDeleted) {
            const deleteRes = await db.billItem.delete({
                where: {
                    id: body.billItemId
                }
            });
            return Response.json(deleteRes);
        }else {
            const billItem = await db.billItem.findFirstOrThrow({
                where: {
                    id: body.billItemId
                }
            });
            
            const updateRes = await db.billItem.update({
                data: {
                    qty: body.qty
                },
                where:{
                    id: body.billItemId,
                }
            });

            return Response.json(updateRes)
        }
    } catch (error) {
        console.log(error)
        return Response.json(UPDATE_BILL_ITEM_ERROR.INVALID_PAYLOAD_ERROR, {status:400})
    }
}