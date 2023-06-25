"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { pickUser, createToken } from "@/actions/user";
import Input from "@/components/input/input";
import Button from "@/components/button/button";

type LoginOkProp = {
  email: string;
  password: string;
  isEmailOk: true;
};

type LoginFailProp = {
  email: string;
  password: string;
  isEmailOk: false;
};

type LoginProp = LoginOkProp | LoginFailProp;

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailOk, setIsEmailOk] = useState(false);

  const getUser = async () => {
    const user = await pickUser(email);
    if (user.ok) {
      setIsEmailOk(true);
      createToken(email, user);
    }

    if (!user.ok) {
      setIsEmailOk(false);
      setEmail(user.message);
    }
  };

  const onLogin = async () => {
    const user = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid gap-5">
        <Input
          type="email"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isEmailOk ? true : false}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isEmailOk ? false : true}
        />
        <Button type="submit" onClick={isEmailOk ? onLogin : getUser}>
          {isEmailOk ? "로그인" : "임시 비밀번호 받기"}
        </Button>
      </div>
    </main>
  );
}
