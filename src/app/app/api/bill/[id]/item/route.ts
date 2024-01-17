/**
 * API Routes for bills
 */

import { PrismaClient } from "@prisma/client";
import { CREATE_BILL_ITEM_ERRORS } from "src/common/errors/billItem.errors";
import { BillItemValidator, CreateBillItemBody } from "src/common/types/api/bill/billItem.types";

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as CreateBillItemBody
        BillItemValidator.parse(body);
        const db = new PrismaClient();
        try {
            const bill = await db.bill.findFirstOrThrow({
                where:{
                    id: body.billId
                },
                include: {
                    items: true
                }
            });

            const existingItem = bill.items.find(i=>(i.itemId === body.itemId));
            if(existingItem){
                const updateRes = await db.billItem.update({
                    where: {
                        id: existingItem.id
                    },
                    data: {
                        qty: existingItem.qty + body.qty
                    }
                });
                return Response.json(updateRes,{status:200});
            }else{
                const newBillItem = await db.billItem.create({
                    data: {
                        billId: body.billId,
                        itemId: body.itemId,
                        qty: body.qty,
                    }
                });
                return Response.json(newBillItem,{status:201});
            }


        } catch (error) {
            return Response.json(CREATE_BILL_ITEM_ERRORS.FAILED_TO_CREATE_BILL_ITEM_ERROR,{status:500})
        }
    } catch (error) {
        return Response.json(CREATE_BILL_ITEM_ERRORS.INVALID_PAYLOAD_ERROR,{status:400});
    }
}