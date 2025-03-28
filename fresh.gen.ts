// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_create from "./routes/api/create.ts";
import * as $api_secret_uuid_ from "./routes/api/secret/[uuid].ts";
import * as $index from "./routes/index.tsx";
import * as $secret_uuid_ from "./routes/secret/[uuid].tsx";
import * as $CreateSecret from "./islands/CreateSecret.tsx";
import * as $FetchSecret from "./islands/FetchSecret.tsx";
import * as $Log from "./islands/Log.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/create.ts": $api_create,
    "./routes/api/secret/[uuid].ts": $api_secret_uuid_,
    "./routes/index.tsx": $index,
    "./routes/secret/[uuid].tsx": $secret_uuid_,
  },
  islands: {
    "./islands/CreateSecret.tsx": $CreateSecret,
    "./islands/FetchSecret.tsx": $FetchSecret,
    "./islands/Log.tsx": $Log,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
