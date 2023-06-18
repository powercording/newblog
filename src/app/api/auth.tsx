import { database } from "@/database/databseClient";
import { user } from "@/lib/UserSchema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { email } = await request.json();

  console.log(email);
  const find = await database.select().from(user).where(eq(user.email, email));

  if (Array.isArray(find) && find.length > 0) {
    return NextResponse.json({ type: "user not found" })
  }
  return NextResponse.json({ hello: "world" });
}
