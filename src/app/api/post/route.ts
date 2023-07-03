import { database } from "@/database/databseClient";
import { post } from "@/lib/PostSchema/schema";
import { authOptions } from "@/lib/nextAuth/options";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  console.log("2");
  const { markdown, title, id } = await req.json();
  console.log("!");

  await database
    .update(post)
    .set({ content: markdown, title })
    .where(eq(post.id, id));

  return NextResponse.json({ ok: true });
}
