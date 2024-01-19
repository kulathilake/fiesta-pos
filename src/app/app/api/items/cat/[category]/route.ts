/**
 * Fetch items of a category
 */

import { PrismaClient } from "@prisma/client"

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { category: string } }) {
    try {
        const db = new PrismaClient();
        const itemRes = await db.item.findMany({
            where: {
                categoryId: Number(params.category)
            },
            orderBy: {
                name: "asc"
            }
        });
        return Response.json({items:itemRes})
    } catch (error) {
        return Response.json(error, {status:500});
    }
}