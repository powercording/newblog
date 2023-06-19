import { getSession, createResponse } from "@/app/lib/sessionHandler";

const sessionCreate = async (req: Request, res: Response, user: any) => {
  const session = await getSession(req, res);
  session.user = {
    id: user.id,
    name: user.name,
  };
  await session.save();
  return session;
};

export async function POST(request: Request) {
  const { user } = await request.json();

  const response = new Response();
  sessionCreate(request, response, user);

  return createResponse(response, JSON.stringify({ state: "ok" }));
}
