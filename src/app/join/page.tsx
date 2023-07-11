import JoinForm from '@/components/join/joinForm';
import authService from '../service/AuthService';

export default function JoinPage() {
  const serverJoinAction = async (email: string) => {
    'use server';

    const user = await authService.findUser(email);
    console.log(user);
    return user;
  };
  return <JoinForm action={serverJoinAction} />;
}
