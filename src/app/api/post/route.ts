import { database } from "@/database/databseClient";
import { post } from "@/lib/PostSchema/schema";
import { authOptions } from "@/lib/nextAuth/options";
import { eq } from "drizzle-orm";
import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type ValidParams = {
  userName: string;
  session?: Session | null;
};
type Valid = ({ userName, session }: ValidParams) => NextResponse;

export const vaild: Valid = ({ userName, session }) => {
  if (!session) {
    console.log("no session");
    return NextResponse.json({
      ok: false,
      status: 403,
      error: { message: "User not found. Please sign in first." },
    });
  }

  if (userName && session.user?.email !== userName) {
    console.log("user match failed");
    return NextResponse.json({
      ok: false,
      status: 401,
      error: { message: "Un authorized." },
    });
  }

  return NextResponse.json({ ok: true });
};

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const { content, title, id, userName } = await req.json();

  const validRequest = vaild({ userName, session });
  if (!validRequest.ok) {
    return validRequest;
  }

  await database
    .update(post)
    .set({ content: content, title })
    .where(eq(post.id, id));

  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { content, title } = await req.json();

  if (!session) {
    return NextResponse.json({ ok: false, status: 404 });
  }

  await database
    .insert(post)
    .values({ content, title, userName: session.user?.email! });

  return NextResponse.json({ ok: true });
}
