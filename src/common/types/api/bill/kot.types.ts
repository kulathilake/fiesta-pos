import { KitchenTicket } from "@prisma/client";
import { BillItemWithItem } from "./bill.types";

export type KOTWithItems = KitchenTicket & {billItem: BillItemWithItem}