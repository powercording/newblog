import * as Nav from "@radix-ui/react-navigation-menu";

export type MenuListProps = {
  locationName: string;
  href: string;
} & React.ComponentProps<typeof Nav.Link>;

export default function MenuItem({ locationName, href }: MenuListProps) {
  return (
    <Nav.Item>
      <Nav.Link className="NavigationMenuLink" href={href}>
        {locationName}
      </Nav.Link>
    </Nav.Item>
  );
}
