/**
 * Sales Endpoints
 */

import { NextRequest } from "next/server";
import { SALES_ENDPOINT_ERRORS } from "src/common/errors/sales.errors";
import { GetSalesSummaryResponse } from "src/common/types/api/sales/sales.types";
import { getPrismaClient } from "src/libs/server/prisma";

/**
 * Get sales for a given period of time
 * @param request
 */
export async function GET(request: NextRequest, c: any, d: any) {
  const params = request.nextUrl.searchParams;
  const start = params.get("start");
  const end = params.get("end");

  if (!!!start || !!!end) {
    return Response.json(SALES_ENDPOINT_ERRORS.START_AND_END_REQUIRED_ERR, {
      status: 400,
    });
  }
  try {
    const db = getPrismaClient();
    const finalizedSales =
      (
        await db.billPayment.aggregate({
          _sum: {
            total: true,
          },
          where: {
            paidAt: {
              lte: new Date(end),
              gt: new Date(start),
            },
          },
        })
      )._sum.total || 0;

    const billPayments = await db.billPayment.findMany({
      where: {
        paidAt: {
          gt: new Date(start),
          lt: new Date(end),
        },
      },
    });
    const pendingBills = await db.bill.findMany({
      where: {
        status: "OPEN",
        openedAt: {
          lte: end,
          gte: start,
        },
      },
      include: {
        items: {
          include: {
            item: {
              select: {
                price: true,
              },
            },
          },
        },
      },
    });

    let pendingSales = 0;
    pendingBills.forEach((bill) => {
      pendingSales += bill.items.reduce((tot, curr) => {
        return tot + curr.qty * curr.item.price;
      }, 0);
    });

    return Response.json({
      finalizedSales,
      pendingSales,
      total: finalizedSales + pendingSales,
      range: {
        start: new Date(start),
        end: new Date(end),
      },
    } as GetSalesSummaryResponse);
  } catch (error) {
    console.error(error);
    return Response.json(SALES_ENDPOINT_ERRORS.ERROR_RETRIEVING_SALES, {
      status: 500,
    });
  }
}
