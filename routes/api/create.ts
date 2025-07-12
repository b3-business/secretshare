import { FreshContext, Handlers } from "$fresh/server.ts";
import { secrets } from "../../src/secretStorage/secrets.ts";

export const handler: Handlers = {
  async POST(req: Request, _ctx: FreshContext) {
    const { encryptedSecret, expireIn, allowedViews, hash, iv } = await req
      .json();
    const uuid = secrets.add({
      secret: encryptedSecret,
      expireIn,
      hash,
      allowedViews,
      iv,
    });
    return new Response(JSON.stringify({ link: uuid }), {
      headers: { "Content-Type": "application/json" },
      status: 201,
      statusText: "Created",
    });
  },
};
