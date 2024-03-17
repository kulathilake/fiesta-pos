/**
 * Get current bill tickets
 */

import { KOTStatus, PrismaClient } from "@prisma/client";
import { getPrismaClient } from "src/libs/server/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request, {params}: {params:{id:string}}){
    const {id:billId} = params;
    try {
        const db = getPrismaClient();
        const kotRes = await db.kitchenTicket.findMany({
            where: {
                billId,   
            },
            orderBy: {
                status: 'asc',
            },
            include:{
                kotItems: {
                    include: {
                        billItem: {
                            include: {
                                item: true
                            }
                        }
                    }
                }
            },
        })
        return Response.json(kotRes);
    } catch (error) {
        
    }
    return Response.json({});
}