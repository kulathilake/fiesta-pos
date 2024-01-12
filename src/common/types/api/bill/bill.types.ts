import { Bill, BillType, BillItem, Item } from "@prisma/client";
import { z } from "zod";

export const OpenBillValidator = z.object({
    type: z.nativeEnum(BillType),
    table: z.number().nullable()
})

export type OpenBillReqBody = z.infer<typeof OpenBillValidator>

export type BillItemWithItem = BillItem & {item: Item}
export type BillWithItems = Bill & {items: BillItemWithItem[]}
