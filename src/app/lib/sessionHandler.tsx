import { getIronSession, createResponse, IronSession } from "iron-session";

type SessionData = {
  user?: {
    id: string;
    name: string;
  };
};

type GetSession = (
  req: Request,
  res: Response
) => Promise<IronSession<SessionData>>;

export const cookieConfig = {
  cookieName: "session",
  password: `${process.env.NEXT_PUBLIC_SESSION_PWD}`,
};

export const getSession: GetSession = (req, res) => {
  const session = getIronSession<SessionData>(req, res, cookieConfig);

  return session;
};

export { createResponse };
