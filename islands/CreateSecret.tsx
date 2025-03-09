import { signal } from "@preact/signals";
import onSubmit from "../src/formHandler/create.ts";

const isCustomExpireIn = signal(false);
const usePassphrase = signal(false);

export default function CreateSecret() {
  return (
    <main>
      <h2 class="my-8 text-2xl font-bold items-center flex flex-col">
        Erstelle ein neues Secret
      </h2>
      <form
        name="createSecret"
        method="post"
        class="flex flex-col items-center"
        onSubmit={onSubmit}
        autocomplete="off"
      >
        <input
          autocomplete="false"
          name="hidden"
          type="text"
          style="display:none;"
        >
        </input>
        <textarea
          rows={10}
          cols={60}
          name="secret"
          class="w-full p-2 border-2 border-gray-500 rounded"
          placeholder="Passwort, Token oder andere Information..."
        />
        <label class="mt-4">
          <input
            type="checkbox"
            name="customExpireIn"
            checked={isCustomExpireIn.value}
            onChange={() => {
              isCustomExpireIn.value = !isCustomExpireIn.value;
            }}
          />
          &nbsp;Eigene Ablaufzeit (default: 1 Tag)
        </label>
        {isCustomExpireIn.value && (
          <form id="duration">
            <input id="h" name="h" type="number" min="0" max="999" value={0} />
            <label for="h">h</label>
            &nbsp;
            <input id="m" name="m" type="number" min="0" max="59" value={0} />
            <label for="m">m</label>
          </form>
        )}
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

        <button type="submit">Anlegen</button>
      </form>
    </main>
  );
}
