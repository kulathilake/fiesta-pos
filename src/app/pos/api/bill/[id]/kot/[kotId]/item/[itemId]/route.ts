/**
 * KOT Item endpoints
 */

import { PrismaClient } from "@prisma/client";
import { KOT_ERRORS } from "src/common/errors/kot.errors";
import { getPrismaClient } from "src/libs/server/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { itemId: string; kotId: string } }
) {
  try {
    const db = getPrismaClient()
    const item = await db.kitchenTicketItem.findFirst({
      where: {
        id: +params.itemId,
        kotId: +params.kotId,
      },
      include: {
        kot: true,
        billItem: true,
      },
    });

    if (item) {
      const deleteKOTItemTask = db.kitchenTicketItem.delete({
        where: {
          id: item.id,
        },
      });
      const updateBillItemIdTask = db.billItem.update({
        where: {
          id: item.billItem.id,
        },
        data: {
          qty: item.billItem.qty - item.qty,
        },
      });
      const response = await db.$transaction([
        deleteKOTItemTask,
        updateBillItemIdTask,
      ]);
      return Response.json(response);
    } else {
      return Response.json(KOT_ERRORS.FAILED_TO_DELETE_KOT_ITEM, {
        status: 404,
      });
    }
  } catch (error) {
    console.error(error);
    return Response.json(KOT_ERRORS.FAILED_TO_DELETE_KOT_ITEM, { status: 500 });
  }
}
