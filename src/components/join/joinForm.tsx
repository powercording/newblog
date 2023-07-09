import Button from '@/components/button/button';
import Input from '@/components/input/input';
import loginHandler from '@/app/service/AuthService';

export default function JoinForm() {
  const handleSubmit = async (formData: FormData) => {
    'use server';
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
