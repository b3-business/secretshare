import { FreshContext } from "$fresh/server.ts";
import { computeTailwindStyles, cssCache } from "@/src/utils/cssCache.ts";

export const handler = async (
  _req: Request,
  _ctx: FreshContext,
) => {
  if (cssCache.has("tailwind.css")) {
    return new Response(cssCache.get("tailwind.css"), {
      headers: {
        "Content-Type": "text/css",
      },
    });
  }

  try {
    const resultCss = await computeTailwindStyles();
    return new Response(resultCss, {
      headers: {
        "Content-Type": "text/css",
      },
    });
  } catch (e) {
    console.error(`ON REQUEST: Error while computing tailwind styles: `, e);
    return new Response("Error while computing tailwind styles", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
};
