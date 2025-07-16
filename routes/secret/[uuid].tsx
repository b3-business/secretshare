import { PageProps } from "$fresh/server.ts";
import FetchSecret from "@/islands/FetchSecret.tsx";
import Log from "@/islands/Log.tsx";

export default function UUID(props: PageProps) {
  const { uuid } = props.params;
  const encryptionKey = atob(props.url.searchParams.get("encryptionKey") || "");
  return (
    <main class="flex flex-col items-center justify-center w-full max-w-[90%] md:max-w-2xl gap-4 mx-auto">
      <h2 class="mt-6 text-2xl font-bold items-center flex flex-col">
        Secret abrufen
      </h2>
      <p class="font-bold wrap-anywhere text-center">UUID: {uuid}</p>
      <p class="text-balance text-center">
        Mit dem Klick auf den nachfolgenden Button wird das Secret abgerufen.
        Danach ist dieses{" "}
        <strong class="underline underline-offset-2">nicht</strong>{" "}
        mehr abrufbar!
      </p>
      <FetchSecret uuid={uuid} encryptionKey={encryptionKey} />
      <Log />
    </main>
  );
}
