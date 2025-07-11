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

  const resultCss = await computeTailwindStyles();

  return new Response(resultCss, {
    headers: {
      "Content-Type": "text/css",
    },
  });
};
