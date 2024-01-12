import { BillType } from "@prisma/client";
import { z } from "zod";

export const OpenBillValidator = z.object({
    type: z.nativeEnum(BillType),
    table: z.number().nullable()
})

export type OpenBillReqBody = z.infer<typeof OpenBillValidator>