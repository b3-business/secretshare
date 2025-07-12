import onSubmit from "../src/formHandler/create.ts";
import ExpireForm from "../components/CreateSecret/ExpireForm.tsx";
import PassphraseInput from "../components/CreateSecret/PassphraseInput.tsx";

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
        />
        <textarea
          rows={10}
          cols={60}
          name="secret"
          class="w-full p-2 border-2 border-gray-500 rounded"
          placeholder="Passwort, Token oder andere Information..."
        />

        <ExpireForm />
        <PassphraseInput />

        <button type="submit">Anlegen</button>
      </form>
    </main>
  );
}
