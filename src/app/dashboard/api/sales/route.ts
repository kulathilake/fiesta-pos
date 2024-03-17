/**
 * Sales Details Endpoint
 */

import { NextRequest } from "next/server";
import { SALES_ENDPOINT_ERRORS } from "src/common/errors/sales.errors";
import {
  GetSalesResponse,
  GetSalesSummaryResponse,
} from "src/common/types/api/sales/sales.types";
import { getPrismaClient } from "src/libs/server/prisma";

/**
 * Get sales for a given period of time
 * @param request
 */
export async function GET(request: NextRequest, c: any, d: any) {
  const params = request.nextUrl.searchParams;
  const start = params.get("start");
  const end = params.get("end");
  console.log(start, end);
  if (!!!start || !!!end) {
    return Response.json(SALES_ENDPOINT_ERRORS.START_AND_END_REQUIRED_ERR, {
      status: 400,
    });
  }
  try {
    const db = getPrismaClient();

    const response = await db.billPayment.findMany({
      where: {
        bill: {
          closedAt: {
            lte: end,
            gte: start,
          },
        },
      },
    });

    let total = 0;
    response.forEach((payment) => {
      total += payment.total;
    });

    const salesResponse = response.map((payment) => {
      return {
        billId: payment.billId,
        total: payment.total,
      };
    });

    return Response.json({
      total,
      sales: salesResponse,
      range: {
        start: new Date(start),
        end: new Date(end),
      },
    } as GetSalesResponse);
  } catch (error) {
    console.error(error);
    return Response.json(SALES_ENDPOINT_ERRORS.ERROR_RETRIEVING_SALES, {
      status: 500,
    });
  }
}
