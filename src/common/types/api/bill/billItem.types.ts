import { string, z } from "zod";

export const BillItemValidator = z.object({
    billId: z.string(),
    itemId: z.number(),
    qty: z.number(),
});

export const UpdateBillItemValidator = z.object({
    billItemId: z.number(),
    qty: z.number(),
    isDeleted: z.boolean()
})

export type CreateBillItemBody = z.infer<typeof BillItemValidator>;
export type UpdateBillItemBody = z.infer<typeof UpdateBillItemValidator>;