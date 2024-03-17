/**
 * Fetch items that match a certain code
 */

import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const q = params.get("query");
  try {
    if (!q) return Response.json([]);
    const db = new PrismaClient();
    const itemRes = await db.item.findMany({
      where: {
        OR: [
          {
            code: {
              contains: q || "",
            },
          },
          {
            name: {
              contains: q || "",
            },
          },
        ],
      },
      orderBy: {
        name: "asc",
      },
    });
    return Response.json(itemRes);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
