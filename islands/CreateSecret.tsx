import { signal } from "@preact/signals";
import onSubmit from "../src/formHandler/create.ts";

const isCustomExpireIn = signal(false);

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
      >
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
          Eigene Ablaufzeit (default: 1 Tag)
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

        <button type="submit">Anlegen</button>
      </form>
    </main>
  );
}
