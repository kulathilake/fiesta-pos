import { Bill, BillType, BillItem, Item, PaymentMode } from "@prisma/client";
import { z } from "zod";

export const OpenBillValidator = z.object({
    type: z.nativeEnum(BillType),
    table: z.number().nullable()
});

export const CloseBillValidator = z.object({
    billId: z.string(),
    mode: z.enum([PaymentMode.CARD, PaymentMode.CASH, PaymentMode.BANK]),
    total: z.number(),
    tendered: z.number().nullable(),
    balance: z.number().nullable()
})

export type OpenBillReqBody = z.infer<typeof OpenBillValidator>
export type CloseBillReqBody = z.infer<typeof CloseBillValidator>
export type BillItemWithItem = BillItem & {item: Item}
export type BillWithItems = Bill & {items: BillItemWithItem[]}
