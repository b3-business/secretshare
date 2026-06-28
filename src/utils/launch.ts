import { DENO_DEPLOYMENT_ID } from "$fresh/src/server/build_id.ts";

export const START_TIME = Date.now();
export const IS_DENO_DEPLOY = DENO_DEPLOYMENT_ID !== undefined;

console.log(`Server started at ${new Date(START_TIME).toLocaleString()}`);
console.log(`Running on Deno Deploy: ${IS_DENO_DEPLOY}`);
