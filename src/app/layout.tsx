import './globals.css';
import { Inter } from 'next/font/google';
import { MenuListProps } from '@/components/menu/menuItem';
import MenuLayout from '@/components/menu/menuLayout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth/options';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const menuList: MenuListProps[] = [
  {
    locationName: 'Home',
    href: '/',
    key: 'home',
  },
  {
    locationName: 'Ai-Chat',
    href: '/ai',
    key: 'ai',
  },
  {
    locationName: 'Blog',
    href: '/blog',
    key: 'blog',
  },
];

const withLogInMenu: MenuListProps[] = [
  {
    locationName: 'Add Post',
    href: '/post/add',
    key: 'addPost',
  },
  { locationName: 'Logout', href: undefined, key: 'logout' },
];

const withLogOutMenu: MenuListProps[] = [
  {
    locationName: 'Login',
    href: '/login',
    key: 'login',
  },

  {
    locationName: 'Join',
    href: '/join',
    key: 'join',
  },
];

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  let currentMenu: MenuListProps[] = menuList;

  if (session) {
    currentMenu = [...menuList, ...withLogInMenu];
  }

  if (!session) {
    currentMenu = [...menuList, ...withLogOutMenu];
  }

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen h-auto`}>
        <MenuLayout menuList={currentMenu} session={session}></MenuLayout>
        {children}
        <footer className="w-full h-20 bg-gray-900 flex justify-center items-center text-gray-400 gap-5">
          <span>powered by Next.js | author: powercording</span>
          <span>HP: 01020732223</span>
        </footer>
      </body>
    </html>
  );
}
