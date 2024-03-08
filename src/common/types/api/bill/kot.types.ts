import { BillItem, Item, KOTStatus, KitchenTicket, KitchenTicketItem } from "@prisma/client";
import { BillItemWithItem } from "./bill.types";
import { z } from "zod";

export const KOTChangeStatusValidator = z.object({
    kotId: z.number(),
    status:  z.enum([KOTStatus.PREPARING, KOTStatus.PREPARING]).optional(),
})

export type KOTWithItems = KitchenTicket & {kotItems: KOIItem[]}
export type KOIItem = KitchenTicketItem & {billItem: BillItem & {item: Item}}
export type KOTChangeStatusRequestBody = z.infer<typeof KOTChangeStatusValidator>;