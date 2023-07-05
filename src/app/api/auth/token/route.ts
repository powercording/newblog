import { database } from "@/database/databseClient";
import { token } from "@/lib/TokenSchema/schema";
import { InferModel } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, payload } = await req.json();

  const newToken = await database
    .insert(token)
    .values({ payload: `${payload}`, userId: +userId });

  return NextResponse.json({ message: "token created", data: newToken });
}
