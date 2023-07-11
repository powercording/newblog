'use client';

import Button from '@/components/button/button';
import Input from '@/components/input/input';
import { InferModel } from 'drizzle-orm';
import { user } from '@/lib/UserSchema/schema';

interface JoinForm {
  action: (email: string) => Promise<InferModel<typeof user> | null>;
}

export default function JoinForm({ action }: JoinForm) {
  const handleSubmit = async (formData: FormData) => {
    const user = await action(formData.get('email') as string);
    console.log(user);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={handleSubmit} className="grid gap-5">
        <Input type="email" name="email" placeholder="이메일" required />
        <Button type="submit">가입하기</Button>
      </form>
    </main>
  );
}
