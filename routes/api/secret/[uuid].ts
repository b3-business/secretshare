import { FreshContext, Handlers } from "$fresh/server.ts";
import { secrets } from "../../../src/secretStorage/secrets.ts";

export const handler: Handlers = {
  GET(req: Request, _ctx: FreshContext) {
    const uuid = req.url.split("/").pop();
    console.log(`Fetching secret with uuid: ${uuid}`);
    if (!uuid) {
      console.log("No uuid provided");
      return new Response(null, { status: 400 });
    }
    const secret = secrets.get(uuid);
    if (!secret) {
      return new Response(null, { status: 404 });
    }
    return new Response(JSON.stringify(secret));
  },
};
