import { BillType } from "@prisma/client";
import { string, z } from "zod";

export const BillItemValidator = z.object({
    billId: z.string(),
    itemId: z.number(),
    qty: z.number(),
    typeOverride: z.enum([BillType.DINEIN, BillType.TAKEOUT]).optional(),
});

export const UpdateBillItemValidator = z.object({
    billItemId: z.number(),
    qty: z.number(),
    isDeleted: z.boolean(),
    createNewKoT: z.boolean().optional()
})

export type CreateBillItemBody = z.infer<typeof BillItemValidator>;
export type UpdateBillItemBody = z.infer<typeof UpdateBillItemValidator>;