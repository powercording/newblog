import Button from "@/components/button/button";
import Input from "@/components/input/input";
import loginHandler from "../handler/LoginHandler";

export default function JoinPage() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const data = {
      email: formData.get("email"),
    };

    const user = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-cache",
    });

    const result = await user.json();

    if (result.state === "empty") {
      console.log("가입 가능");
      
    }

    if (result.state === "exist") {
      console.log("가입 불가능");
    }
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
