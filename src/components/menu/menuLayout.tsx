"use client";

import * as Nav from "@radix-ui/react-navigation-menu";
import MenuItem, { MenuListProps } from "./menuItem";

interface MenuComponentProps {
  menuList: MenuListProps[];
  children?: React.ReactNode;
}

export default function MenuLayout({ menuList, children }: MenuComponentProps) {
  return (
    <Nav.Root className="fixed top-0 bg-zinc-900 w-full text-white z-50">
      <Nav.List className="flex p-3 gap-3">
        {menuList.map((menu) => {
          return (
            <MenuItem
              key={menu.key}
              href={menu.href}
              locationName={menu.locationName}
            />
          );
        })}
      </Nav.List>
    </Nav.Root>
  );
}
