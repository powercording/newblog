import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession, createResponse } from "@/app/lib/sessionHandler";
import loginHandler from "@/app/handler/LoginHandler";
import { get } from "http";

export async function POST(request: Request) {
  const { email } = await request.json();
  const find = await loginHandler.findUser(email);

  if (Array.isArray(find) && find.length > 0) {
    return NextResponse.json({ state: "exist" });
  }

  if (Array.isArray(find) && find.length === 0) {
    return new Response("d", {
      headers: { "Set-Cookie": `user=${find[0].email}` },
    });
  }
  const response = new Response();
  const session = await getSession(request, response);
  session.user = { id: "1", name: "test" };
  await session.save();

  return createResponse(response, JSON.stringify({ state: "ok" }));
}
