import { database } from "@/database/databseClient";
import { token } from "@/lib/TokenSchema/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, payload } = await req.json();
  console.log(userId, payload);
  const newToken = database
    .insert(token)
    .values({ payload: `${payload}`, userId: userId });

  return NextResponse.json(newToken);
}
