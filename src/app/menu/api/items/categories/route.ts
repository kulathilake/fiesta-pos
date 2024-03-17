/**
 * Get Item Categories
 */

import { ItemCategory, PrismaClient } from "@prisma/client";
import { ITEM_CAT_ERRORS } from "src/common/errors/item.errors";
import { getPrismaClient } from "src/libs/server/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const db = getPrismaClient();
    const categories = await db.itemCategory.findMany();
    return Response.json({ categories });
  } catch (error) {
    return Response.json(ITEM_CAT_ERRORS.ERROR_FETCHING_CATS, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ItemCategory;
    const db = getPrismaClient();
    const response = await db.itemCategory.create({
      data: body,
    });

    return Response.json(response);
  } catch (error) {
    return Response.json(ITEM_CAT_ERRORS.ERROR_CREATING_CAT, { status: 500 });
  }
}
