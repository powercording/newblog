import Button from "@/components/button/button";
import Input from "@/components/input/input";
import loginHandler from "../service/LoginHandler";

export default function JoinPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="grid gap-5">
        <Input type="email" name="email" placeholder="이메일" required />
        <Button type="submit">가입하기</Button>
      </form>
    </main>
  );
}
