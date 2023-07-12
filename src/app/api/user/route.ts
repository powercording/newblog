import { database } from '@/database/databseClient';
import { user } from '@/lib/UserSchema/schema';
import { InferModel, eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

type ResponsType = InferModel<typeof user>;

export async function POST(req: Request): Promise<NextResponse<ResponsType | undefined>> {
  const { email } = await req.json();
  const existUser = await database.select().from(user).where(eq(user.email, email));

  return NextResponse.json({ ...existUser[0] });
}

export type GetUserReturnType = ReturnType<typeof POST>;

export async function PUT(req: Request) {
  const { email } = await req.json();

  const createdUser = await database
    .insert(user)
    .values({ email, name: email, updatedAt: sql`(CURRENT_TIMESTAMP(3))` });

  if (createdUser.rowsAffected !== 0) {
    return NextResponse.json({ status: 200 });
  }

  return NextResponse.json({ status: 500 });
}
