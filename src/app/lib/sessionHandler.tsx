import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface Session {
    user: {
      id: string;
      name: string;
    };
  }
}

const cookieConfig = {
  cookieName: "session",
  password: `${process.env.NEXT_PUBLIC_SESSION_PWD}`,
};

export function sessionHandler(fn: any) {
  return withIronSessionApiRoute(fn, cookieConfig);
}
