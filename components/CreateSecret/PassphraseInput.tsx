import { signal } from "@preact/signals";

const usePassphrase = signal(false);

export default function PassphraseInput() {
  return (
    <>
      <input
        type="checkbox"
        name="usePassphrase"
        id="usePassphrase"
        checked={usePassphrase.value}
        onChange={() => {
          usePassphrase.value = !usePassphrase.value;
        }}
      />
      <label for="usePassphrase">
        Eigene Passphrase verwenden um das Secret zu verschlüsseln <br />
        (optional)
      </label>
      {usePassphrase.value && (
        <>
          <div>
            {/* placeholder div to keep the first grid column empty */}
          </div>
          <label class="flex flex-col gap-2">
            Passphrase:&nbsp;
            <input
              type="password"
              name="passphrase"
              class="p-2 border-2 border-gray-500 rounded"
              placeholder="Optional"
              required
              autocomplete="off"
            />
          </label>
        </>
      )}
    </>
  );
}
