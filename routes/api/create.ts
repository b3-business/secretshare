import { FreshContext, Handlers } from "$fresh/server.ts";
import { secrets } from "../../src/secretStorage/secrets.ts";

export const handler: Handlers = {
  async POST(req: Request, _ctx: FreshContext) {
    const secret = await req.json();
    const uuid = secrets.add(secret);
    return new Response(JSON.stringify({ link: uuid }));
  },
};
