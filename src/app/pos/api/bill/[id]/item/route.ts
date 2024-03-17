/**
 * API Routes for bill items
 */

import {
  BillItem,
  KitchenTicket,
  KitchenTicketItem,
  PrismaClient,
} from "@prisma/client";
import { CREATE_BILL_ITEM_ERRORS } from "src/common/errors/billItem.errors";
import {
  BillItemValidator,
  CreateBillItemBody,
} from "src/common/types/api/bill/billItem.types";
import { getPrismaClient } from "src/libs/server/prisma";

/**
 * Creates a bill item
 * @param request
 * @returns
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateBillItemBody;
    BillItemValidator.parse(body);
    const db = getPrismaClient();
    try {
      const bill = await db.bill.findFirstOrThrow({
        where: {
          id: body.billId,
        },
        include: {
          items: true,
        },
      });

      const existingItem = bill.items.find((i) => i.itemId === body.itemId);
      let response: BillItem;

      if (existingItem) {
        response = await db.billItem.update({
          where: {
            id: existingItem.id,
          },
          data: {
            qty: existingItem.qty + body.qty,
          },
        });
      } else {
        response = await db.billItem.create({
          data: {
            billId: body.billId,
            itemId: body.itemId,
            qty: body.qty,
          },
        });
      }

      // create or update kot item
      try {
        let kot;
        let kotItem;

        try {
          kot = await db.kitchenTicket.findFirstOrThrow({
            where: {
              billId: bill.id,
              status: "RECIEVED",
            },

            include: {
              kotItems: true,
            },
          });
        } catch (error) {
          kot = await db.kitchenTicket.create({
            data: {
              billId: bill.id,
              issuedAt: new Date(),
            },
            include: {
              kotItems: true,
            },
          });
        }

        kotItem = kot.  kotItems.find((item) => item.itemId === response.id);

        if (kotItem) {
          await db.kitchenTicketItem.update({
            where: {
              id: kotItem?.id,
            },
            data: {
              qty: kotItem.qty + body.qty,
            },
          });
        } else {
          await db.kitchenTicketItem.create({
            data: {
              kotId: kot.id,
              itemId: response.id,
              qty: body.qty,
              note: body.note,
            },
          });
        }
      } catch (error) {
        return Response.json(CREATE_BILL_ITEM_ERRORS.FAILED_TO_UPDATE_KOT, {
          status: 500,
        });
      }

      return Response.json(response, { status: existingItem ? 200 : 201 });
    } catch (error) {
      return Response.json(
        CREATE_BILL_ITEM_ERRORS.FAILED_TO_CREATE_BILL_ITEM_ERROR,
        { status: 500 }
      );
    }
  } catch (error) {
    return Response.json(CREATE_BILL_ITEM_ERRORS.INVALID_PAYLOAD_ERROR, {
      status: 400,
    });
  }
}
