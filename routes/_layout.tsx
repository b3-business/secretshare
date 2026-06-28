import { PageProps } from "$fresh/server.ts";
import { DENO_DEPLOYMENT_ID } from "$fresh/src/server/build_id.ts";
import Header from "../components/Header.tsx";
import { IS_DENO_DEPLOY, START_TIME } from "@/src/utils/launch.ts";

export default function Layout({ Component, state }: PageProps) {
  return (
    <div>
      <Header />
      <Component />
      <footer class="absolute bottom-0 w-full text-center text-sm text-gray-500 p-2">
        Server started at {new Date(START_TIME).toLocaleString()}{IS_DENO_DEPLOY ? ` - DenoDeployID: ${DENO_DEPLOYMENT_ID}` : ""}
      </footer>
    </div>
  );
}
