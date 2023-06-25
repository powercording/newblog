import "./globals.css";
import { Inter } from "next/font/google";
import { MenuListProps } from "@/components/menu/menuItem";
import MenuLayout from "@/components/menu/menuLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth/options";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const menuList: MenuListProps[] = [
  {
    locationName: "Home",
    href: "/",
    key: "home",
  },
  {
    locationName: "Login",
    href: "/login",
    key: "login",
  },
  {
    locationName: "Join",
    href: "/join",
    key: "join",
  },
  {
    locationName: "Ai-Chat",
    href: "/ai",
    key: "ai",
  },
];

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);

  const currentMenu = [...menuList];
  const logedInMenu = currentMenu.filter((menu) => {
    return menu.key !== "login" && menu.key !== "join" && session?.user?.email;
  });

  const menuProps = logedInMenu.length > 0 ? logedInMenu : currentMenu;

  return (
    <html lang="en">
      <body className={inter.className}>
        <MenuLayout menuList={menuProps}></MenuLayout>
        {children}
      </body>
    </html>
  );
}
