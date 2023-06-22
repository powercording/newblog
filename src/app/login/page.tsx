"use client";

import { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Input from "@/components/input/input";
import Button from "@/components/button/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const onEmailChange: React.EventHandler<ChangeEvent<HTMLInputElement>> = (
    e
  ) => {
    setEmail(e.target.value);
  };

  const onLogin = async () => {
    const user = await signIn("credentials", { email, callbackUrl: "/" });
    console.log(user);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid gap-5">
        <Input
          type="email"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={onEmailChange}
          required
        />
        {/* <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          required
        /> */}
        <Button type="submit" onClick={onLogin}>
          가입하기
        </Button>
      </div>
    </main>
  );
}
