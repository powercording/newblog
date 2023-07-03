import { database } from "@/database/databseClient";
import { post } from "@/lib/PostSchema/schema";
import { authOptions } from "@/lib/nextAuth/options";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const { content, title, id, userName } = await req.json();
  console.log(content);

  if (!session) {
    console.log("no session");
    return NextResponse.json({ ok: false, status: 401 });
  }

  if (session.user?.email !== userName) {
    console.log("user match failed");
    return NextResponse.json({ ok: false, status: 401 });
  }

  await database
    .update(post)
    .set({ content: content, title })
    .where(eq(post.id, id));

  return NextResponse.json({ ok: true });
}
