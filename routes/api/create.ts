import { FreshContext, Handlers } from "$fresh/server.ts";
import { secrets } from "@/src/secretStorage/secrets.ts";

export const handler: Handlers = {
  async POST(req: Request, _ctx: FreshContext) {
    const { encryptedSecret, expireIn, allowedViews, iv } = await req
      .json();

    if (!encryptedSecret || !expireIn || !allowedViews || !iv) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
        statusText: "Bad Request",
      });
    }
    if (typeof encryptedSecret !== "string" || typeof expireIn !== "number" ||
        typeof allowedViews !== "number") {
      return new Response(JSON.stringify({ error: "Invalid field types" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
        statusText: "Bad Request",
      });
    }
    const uuid = secrets.add({
      secret: encryptedSecret,
      expireIn,
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
