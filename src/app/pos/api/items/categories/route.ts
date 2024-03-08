/**
 * Get Item Categories
 */

import { PrismaClient } from "@prisma/client";
import { ITEM_CAT_FETCH_ERRORS } from "src/common/errors/item.errors";

export const dynamic = "force-dynamic";

export async function GET(){
    try {
        const db = new PrismaClient();
        const categories = await db.itemCategory.findMany()
        return Response.json({categories});
    } catch (error) {
        return Response.json(ITEM_CAT_FETCH_ERRORS.ERROR_FETCHING_CATS, {status:500})
    }
}
