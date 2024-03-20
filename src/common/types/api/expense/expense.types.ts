import { ExpenseType } from "@prisma/client";
import { z } from "zod"

export const createExpenseRequestValidator = z.object({
    incurredOn: z.date(),
    billId: z.string(),
    type: z.enum([
        ExpenseType.MAINTAINENCE,
        ExpenseType.OTHER,
        ExpenseType.PURCHASE,
        ExpenseType.UTILITY
    ]),
    comment: z.string(),
    amount: z.number()
}) 
export type CreateExpenseRequest = z.infer<typeof createExpenseRequestValidator>;

