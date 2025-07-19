import { FreshContext, Handlers } from "$fresh/server.ts";
import { secrets } from "@/src/secretStorage/secrets.ts";

export const handler: Handlers = {
  async POST(req: Request, _ctx: FreshContext) {
    const { encryptedSecret, expireIn, allowedViews, iv } = await req
      .json();

    const responseError = (message: string, details?: Record<string, unknown>) => {
      console.error("Error in create secret:", message, details);
      return new Response(JSON.stringify({ error: message, details }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
        statusText: "Bad Request",
      });
    };

    if (!encryptedSecret || expireIn === undefined || !allowedViews || !iv) {
      return responseError("Ein oder mehrere Felder fehlen");
    }
    if (typeof encryptedSecret !== "string" || typeof expireIn !== "number" ||
        typeof allowedViews !== "number") {
      const types = {
        encryptedSecret: typeof encryptedSecret,
        expireIn: typeof expireIn,
        allowedViews: typeof allowedViews,
        iv: typeof iv,
      };

      return responseError("Ungültige Feldtypen", types);
    }

    if (expireIn === 0) {
      // -1 means default 1 day - 0 means custom, so we return an error to avoid confusion
      return responseError("Ungültiger Wert für die Ablaufzeit", {
        expireIn,
      });
    }
    if (allowedViews < 1) {
      return responseError("Ungültiger Wert für die Anzahl der Ansichten", {
        allowedViews,
      });
    }

    const uuid = secrets.add({
      secret: encryptedSecret,
      expireIn,
      allowedViews,
      iv,
    });

    console.log(`Secret created with UUID: ${uuid}: ${allowedViews} view(s), expires in ${expireIn === -1 ? "1 day" : `${expireIn} ms`}`);

    return new Response(JSON.stringify({ link: uuid }), {
      headers: { "Content-Type": "application/json" },
      status: 201,
      statusText: "Created",
    });
  },
};
