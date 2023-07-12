'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import { LoginRequestResult } from '@/app/login/page';

type LoginOkProp = {
  isEmailOk: true;
  email: string;
};

type LoginFailProp = {
  isEmailOk: false;
  errorMessage?: string;
};

type LoginProp = LoginOkProp | LoginFailProp;

interface LoginForm {
  getUserFromAction: (formData: FormData) => Promise<LoginRequestResult>;
}

export default function LoginForm({ getUserFromAction }: LoginForm) {
  const [loginState, setLoginState] = useState<LoginProp>({ isEmailOk: false });

  const getUser = async (formData: FormData) => {
    const user = await getUserFromAction(formData);

    if ('error' in user) {
      setLoginState({ isEmailOk: false, errorMessage: user.error.message });
    }
    if ('email' in user) {
      setLoginState({ isEmailOk: true, email: user.email });
    }
  };

  const onLogin = async (formData: FormData) => {
    if (!loginState.isEmailOk) {
      return alert('올바르지 않은 접근입니다.');
    }
    const password = formData.get('password') as string;


    await signIn('credentials', {
      email: loginState.email,
      password,
      callbackUrl: '/',
    });
  };

  const reSetState = () => {
    setLoginState({ isEmailOk: false });
  };

  const disabled = loginState.isEmailOk ? true : false;
  const isEmailChecked = disabled;
  const errorMessage = loginState.isEmailOk ? null : loginState.errorMessage;
  const loginButtonText = isEmailChecked ? '로그인' : '임시 비밀번호 받기';
  const action = isEmailChecked ? onLogin : getUser;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="grid gap-5" action={action}>
        <Input type="email" name="email" placeholder="이메일" required disabled={disabled} />
        <Input type="text" name="password" placeholder="비밀번호" required disabled={!disabled} />
        <Button type="submit">{loginButtonText}</Button>
        <span className="text-red-300  text-xs px-1">
          {errorMessage ?? ''}
          {isEmailChecked && (
            <p
              className="text-blue-300 underline-offset-2 underline cursor-pointer"
              onClick={reSetState}
            >
              다시 입력하기
            </p>
          )}
        </span>
      </form>
    </main>
  );
}
