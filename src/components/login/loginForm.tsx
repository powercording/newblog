'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import authService from '@/app/service/AuthService';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailOk, setIsEmailOk] = useState(false);

  const getUser = async () => {
    const user = await authService.findUser(email);
    if (user) {
      setIsEmailOk(true);
      authService.authRequest(user);
    }

    if (!user) {
      setIsEmailOk(false);
      setEmail('이메일이 올바르지 않습니다. 다시 입력해주세요.');
    }
  };

  const onLogin = async () => {
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });
  };

  const disabled = isEmailOk ? true : false;
  const onClick = isEmailOk ? onLogin : getUser;
  const loginButtonText = isEmailOk ? '로그인' : '임시 비밀번호 받기';

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid gap-5">
        <Input
          type="email"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={disabled}
        />
        <Input
          type="text"
          name="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={!disabled}
        />
        <Button type="submit" onClick={onClick}>
          {loginButtonText}
        </Button>
      </div>
    </main>
  );
}
