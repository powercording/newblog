import { database } from "@/database/databseClient";
import { user } from "@/lib/UserSchema/schema";
import { InferModel, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type ResponsType = InferModel<typeof user>;

export async function POST(
  req: Request
): Promise<NextResponse<ResponsType | undefined>> {
  const { email } = await req.json();
  const existUser = await database
    .select()
    .from(user)
    .where(eq(user.email, email));

  return NextResponse.json({ ...existUser[0] });
}

export type GetUserReturnType = ReturnType<typeof POST>;
