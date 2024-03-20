import { NextRequest } from "next/server";
import {
  CloseDailyRecordRequest,
  OpenDailyRecordRequest,
} from "src/common/types/api/dailyRecord/dailyrecord.types";
import { getPrismaClient } from "src/libs/server/prisma";

export async function GET(request: NextRequest) {
  try {
    const db = getPrismaClient();
    const params = request.nextUrl.searchParams;
    const date = params.get("date");
    if (date) {
      const dailyRecord = await db.dailyRecord.findFirst({
        where: {
          date: new Date(date),
        },
      });
      return Response.json(dailyRecord);
    } else {
      return Response.json("", { status: 400 });
    }
  } catch (error) {}
}
export async function POST(request: Request) {
  try {
    const db = getPrismaClient();
    const data = (await request.json()) as OpenDailyRecordRequest;
    const dailyRecord = await db.dailyRecord.create({
      data: {
        ...data,
        openedBy: `${data.openedBy}`,
      },
    });
    return Response.json(dailyRecord);
  } catch (error) {
    return Response.json("", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const db = getPrismaClient();
    const body = (await request.json()) as CloseDailyRecordRequest;
    if (body.id) {
      const closedDailyRecord = await db.dailyRecord.update({
        where: {
          id: body.id,
        },
        data: {
          ...body,
          closedBy: `${body.closedBy}`,
        },
      });
      return Response.json(closedDailyRecord);
    }
  } catch (error) {
    return Response.json("", { status: 500 });
  }
}
