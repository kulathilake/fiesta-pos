/**
 * Route to fetch all open bills.
 */

import { BillStatus, PrismaClient } from "@prisma/client";
import { OPEN_BILL_ERROR } from "src/common/errors/bill.errors";
import { getPrismaClient } from "src/libs/server/prisma";
export const dynamic = "force-dynamic";

export async function GET(){
    try {
        const db = getPrismaClient();
        const res = await db.bill.findMany({
            where: {
                status: BillStatus.OPEN
            },
            include: {
                items: {
                    include:{
                        item: true
                    }
                }
            }
        });
        return Response.json(res);
    } catch (error) {
        return Response.json(OPEN_BILL_ERROR.FAILED_TO_READ_OPEN_BILLS_ERROR,{status:500});
    }
}