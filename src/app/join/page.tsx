import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { temp } from "@/app/api/temp";

export default function JoinPage() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    temp(formData);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={handleSubmit} className="grid gap-5">
        <Input type="text" name="id" placeholder="이메일" />
        <Button type="submit">가입하기</Button>
      </form>
    </main>
  );
}
