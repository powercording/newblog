import Link from "next/link";

export type MenuListProps = {
  locationName: string;
  href: string;
  key: string | number;
};

interface MenuComponentProps {
  menuList: MenuListProps[];
}

export default function MenuComponent({ menuList }: MenuComponentProps) {
  return (
    <div className="fixed top-0 bg-zinc-900 opacity-70 w-full text-white">
      <ul className="flex p-3 gap-3">
        {menuList.map((menu) => {
          return (
            <li key={menu.key} className="hover:-translate-y-1">
              <Link href={menu.href} className="p-2">
                {menu.locationName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
