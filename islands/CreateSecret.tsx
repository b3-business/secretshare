import onSubmit from "@/src/formHandler/create.ts";
import CustomExpireInForm from "../components/CreateSecret/CustomExpireInForm.tsx";
import PassphraseInput from "@/components/CreateSecret/PassphraseInput.tsx";
import ViewCount from "@/components/CreateSecret/ViewCount.tsx";

export default function CreateSecret() {
  return (
    <section>
      <h2 class="my-4 text-2xl font-bold items-center flex flex-col">
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
          name="secret"
          class="w-[90%] min-h-40 p-2 border-2 border-gray-500 rounded"
          placeholder="Passwort, Token oder andere Information..."
        />

        <div class="grid grid-cols-[min-content_1fr] gap-4 items-center justify-center w-[90%] mt-4">
          <CustomExpireInForm />
          <PassphraseInput />
          <ViewCount />
        </div>

        <button class="p-2 self-stretch" type="submit">Anlegen</button>
      </form>
    </section>
  );
}
