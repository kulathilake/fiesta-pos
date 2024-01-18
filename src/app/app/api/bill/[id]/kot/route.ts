/**
 * Get current bill tickets
 */

import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(request: Request, {params}: {params:{id:string}}){
    const {id:billId} = params;
    try {
        const db = new PrismaClient();
        const kotRes = await db.kitchenTicket.findMany({
            where: {
                billId,   
            },
            include:{
                billItem: {
                    include: {
                        item: true
                    }
                }
            }
        })
        return Response.json(kotRes);
    } catch (error) {
        
    }
    return Response.json({});
}