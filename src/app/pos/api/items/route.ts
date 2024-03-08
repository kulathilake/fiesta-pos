import { Item, PrismaClient } from "@prisma/client";

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as Item;   
        const db = new PrismaClient();
        const response = await db.item.create({
            data: body
        })
        return Response.json(response);
    } catch (error) {
        console.error(error);
        return Response.json(error,{status:500})
    }
}