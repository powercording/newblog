import { database } from "@/database/databseClient";
import { token } from "@/lib/TokenSchema/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type Params = {
  params: {
    password: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  const { password } = params;
  console.log(password);

  const existToken = await database
    .select()
    .from(token)
    .where(eq(token.payload, password));

  return NextResponse.json(existToken[0]);
}
