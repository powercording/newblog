export async function POST(request: Request) {
  const { user } = await request.json();

  const response = new Response(JSON.stringify({ state: "ok" }));

  return response;
}
