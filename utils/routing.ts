/**
 * Usage from a route handler:
 *
 * ```ts
 * return redirectTo("/login");
 * ```
 */
export function redirectTo(relativePath: string) {
  const headers = new Headers();
  headers.set("location", relativePath);
  return new Response(null, {
    status: 303,
    headers,
  });
}
