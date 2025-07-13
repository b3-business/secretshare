import { redirectTo } from "@/utils/routing.ts";

/**
 * @bjesuiter: "async" is required here, otherwise the redirectTo will not work for some reason
 * (async pages are handled slightly differently in fresh than sync pages)
 */
export default async function Home() {
  return redirectTo("/create");
}
