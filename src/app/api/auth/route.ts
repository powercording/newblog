import { database } from "@/database/databseClient";
import { user } from "@/lib/UserSchema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  const existUser = await database
    .select()
    .from(user)
    .where(eq(user.email, email));

  return NextResponse.json(existUser[0]);
}
