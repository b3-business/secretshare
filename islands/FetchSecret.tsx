import onClick from "../src/formHandler/fetch.ts";
import { signal } from "@preact/signals";

export default function FetchSecret(props: { uuid: string }) {
  const fetched = signal(false);
  return (
    <button
      name={"fetchSecret"}
      onClick={(e) => {
        onClick(e, props.uuid);
        fetched.value = true;
      }}
      disabled={fetched}
    >
      Abrufen
    </button>
  );
}
