import { PageProps } from "$fresh/server.ts";
import FetchSecret from "../../islands/FetchSecret.tsx";
import Log from "../../islands/Log.tsx";

export default function GreetPage(props: PageProps) {
  const { uuid } = props.params;
  return (
    <main class={"flex flex-col items-center justify-center"}>
      <h2>Secret</h2>
      <p>UUID: {uuid}</p>
      <p>
        Mit dem Klick auf den nachfolgenden Button wird das Secret abgerufen.
        Danach ist dieses <strong>nicht</strong> mehr abrufbar.
      </p>
      <FetchSecret uuid={uuid} />
      <Log />
    </main>
  );
}
