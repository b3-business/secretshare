import { signal } from "@preact/signals";

const usePassphrase = signal(false);

export default function PassphraseInput() {
  return (
    <>
      <label>
        <input
          type="checkbox"
          name="usePassphrase"
          checked={usePassphrase.value}
          onChange={() => {
            usePassphrase.value = !usePassphrase.value;
          }}
        />
        &nbsp;Eigene Passphrase verwenden um das Secret zu verschlüsseln
        (optional)
      </label>
      {usePassphrase.value && (
        <label>
          Passphrase:&nbsp;
          <input
            type="password"
            name="passphrase"
            class="p-2 border-2 border-gray-500 rounded"
            placeholder={"Optional"}
            required
            autocomplete="off"
          />
        </label>
      )}
    </>
  );
}
