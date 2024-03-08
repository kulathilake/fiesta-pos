/**
 * API Routes for bills
 */

import { BillItem, PrismaClient } from "@prisma/client";
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
            let response: BillItem;

            if(existingItem){
                response = await db.billItem.update({
                    where: {
                        id: existingItem.id
                    },
                    data: {
                        qty: existingItem.qty + body.qty
                    }
                });

                
            }else{
                response = await db.billItem.create({
                    data: {
                        billId: body.billId,
                        itemId: body.itemId,
                        qty: body.qty,
                    }
                });
            }

            // create a new kot for the addition
            await db.kitchenTicket.create({
                data: {
                    typeOverride: body.typeOverride,
                    billItemId: response.id,
                    qty: body.qty,
                    billId: body.billId,
                    issuedAt: new Date()
                }
            });
            return Response.json(response,{status:existingItem?200:201});

        } catch (error) {
            return Response.json(CREATE_BILL_ITEM_ERRORS.FAILED_TO_CREATE_BILL_ITEM_ERROR,{status:500})
        }
    } catch (error) {
        return Response.json(CREATE_BILL_ITEM_ERRORS.INVALID_PAYLOAD_ERROR,{status:400});
    }
}