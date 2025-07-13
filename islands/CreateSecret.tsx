import onSubmit from "@/src/formHandler/create.ts";
import ExpireForm from "@/components/CreateSecret/ExpireForm.tsx";
import PassphraseInput from "@/components/CreateSecret/PassphraseInput.tsx";
import ViewCount from "@/components/CreateSecret/ViewCount.tsx";

export default function CreateSecret() {
  return (
    <section>
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
        <ViewCount />

        <button class="p-2" type="submit">Anlegen</button>
      </form>
    </section>
  );
}
