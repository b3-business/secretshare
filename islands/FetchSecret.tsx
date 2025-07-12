import onSubmit from "../src/formHandler/fetch.ts";
import { signal } from "@preact/signals";

const fetched = signal(false);
const usePassphrase = signal(true);

export default function FetchSecret(
  props: { uuid: string; encryptionKey: string | null },
) {
  if (props.encryptionKey) {
    // automatic decryption, no need for passphrase
    usePassphrase.value = false;
  }
  return (
    <form
      name="fetchSecret"
      method="post"
      class="flex flex-col items-center"
      onSubmit={(ev) => {
        onSubmit(ev, props.uuid, props.encryptionKey);
        fetched.value = true;
      }}
      autocomplete="off"
    >
      {usePassphrase.value && (
        <label>
          Passphrase:&nbsp;
          <input
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
        class="p-2"
      >
        Abrufen
      </button>
    </form>
  );
}
