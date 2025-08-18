import onSubmit from "@/src/formHandler/fetch.ts";
import { signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

const fetched = signal(false);
const usePassphrase = signal(true);

export default function FetchSecret(
  props: { uuid: string},
) {

  if (!IS_BROWSER) {
    return <div></div>
  }

  const clientURL = new URL(location.href)
  // explicitly using hash here, since query parameter is passed to server. We do not want to expose the encryption key.
  // URL is explicitly crafted to use Query Parameter syntax by using #& (#-> start of hash parameter, & -> forcing 2nd parameter)
  const hashData = new URLSearchParams(clientURL.hash)
  console.log(Array.from(hashData)) // [ ["#", ""], ["encryptionKey","value"]] 
  // hash char itself will be first entry, since its not a special character like "?" and "&" and therefore interpreted as key

  const encryptionKey = atob(hashData.get("encryptionKey") || "");

  if (encryptionKey) {
    // automatic decryption, no need for passphrase
    usePassphrase.value = false;
  }
  return (
    <form
      name="fetchSecret"
      method="post"
      class="flex flex-col items-center"
      onSubmit={(ev) => {
        onSubmit(ev, props.uuid, encryptionKey);
        fetched.value = true;
      }}
      autocomplete="off"
    >
      {usePassphrase.value && (
        <label>
          Passphrase:&nbsp;
          <input
            class="p-2 border-2 border-gray-500 rounded"
            type="password"
            name="passphrase"
            required
            autocomplete="off"
          />
        </label>
      )}

      <button
        name="fetchSecretButton"
        type="submit"
        disabled={fetched.value}
        class={"p-2 rounded-lg" + (fetched.value ? " bg-slate-400 cursor-not-allowed" : " bg-primary")}
      >
        Abrufen
      </button>
    </form>
  );
}
