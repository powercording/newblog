import loginHandler from "@/app/service/LoginHandler";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  const [find] = await loginHandler.findUser(email);
  if (find) {
    return NextResponse.json({ ok: true, data: find, status: 200 });
  }
}
