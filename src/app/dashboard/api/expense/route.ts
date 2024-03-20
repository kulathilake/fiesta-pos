import { DateTime } from "luxon";
import { NextRequest } from "next/server";
import { ExpenseAPIErrors } from "src/common/errors/expense.errors";
import { CreateExpenseRequest, createExpenseRequestValidator } from "src/common/types/api/expense/expense.types";
import { getPrismaClient } from "src/libs/server/prisma";

export async function GET(request:NextRequest) {
    try {
        const params = request.nextUrl.searchParams;
        const start = params.get("start");
        const end = params.get("end");
        if (!!!start || !!!end) {
          return Response.json(ExpenseAPIErrors.GET_EXPENSE_START_AND_END_REQUIRED_ERR, {
            status: 400,
          });
        }
        const db = getPrismaClient();
        const response = await db.expense.findMany({
            where: {
                incurredOn: {
                    gt: start,
                    lt: end,
                }
            }
        });
        return Response.json(response);
    } catch (error) {
        return Response.json(ExpenseAPIErrors.GET_EXPENSE_SERVER_ERROR,{status:500})
    }
}
export async function POST(request: Request) {
    try {
        const db = getPrismaClient();
        const body = (await request.json()) as CreateExpenseRequest;
        try {
            const hasValidDate = DateTime.fromISO((body as any).incurredOn).isValid;
            if(hasValidDate){
                body.incurredOn = new Date(body.incurredOn);
            }

            createExpenseRequestValidator.parse(body);
            const expenseRes = await db.expense.create({
                data: {
                    ...body
                }
            });
            return Response.json(expenseRes,{status:201});
        } catch (error) {
            return Response.json({
                error:ExpenseAPIErrors.CREATE_EXPENSE_INVALID_PAYLOAD,
                message: error
            },{status:400});
        }
    } catch (error) {

        return Response.json(ExpenseAPIErrors.CREATE_EXPENSE_SERVER_ERR,{status:500});
    }
}