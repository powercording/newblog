"use client";

import * as Nav from "@radix-ui/react-navigation-menu";
import MenuItem, { MenuListProps } from "./menuItem";

interface MenuComponentProps {
  menuList: MenuListProps[];
}

export default function MenuLayout({ menuList }: MenuComponentProps) {
  return (
    <Nav.Root className="fixed top-0 bg-zinc-900 opacity-70 w-full text-white">
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
