/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "@std/dotenv/load";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";
import { computeTailwindStyles } from "./src/utils/cssCache.ts";

// custom things to do before starting the server
try {
  await computeTailwindStyles();
} catch (e) {
  console.error(`ON STARTUP: Error while computing tailwind styles: `, e);
}

await start(manifest, config);
