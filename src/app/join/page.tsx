import Button from "@/components/button/button";
import Input from "@/components/input/input";
import loginHandler from "../handler/LoginHandler";

export default function JoinPage() {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const user = await loginHandler.login(formData);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={handleSubmit} className="grid gap-5">
        <Input type="email" name="id" placeholder="이메일" required />
        <Button type="submit">가입하기</Button>
      </form>
    </main>
  );
}
