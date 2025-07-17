import onSubmit from "@/src/formHandler/create.ts";
import CustomExpireInForm from "../components/CreateSecret/CustomExpireInForm.tsx";
import PassphraseInput from "@/components/CreateSecret/PassphraseInput.tsx";
import ViewCountLimitInput from "../components/CreateSecret/ViewCountLimitInput.tsx";

export default function CreateSecret() {
  return (
    <section class="w-full max-w-[90%] md:max-w-2xl">
      <h2 class="my-4 text-2xl font-bold items-center flex flex-col">
        Erstelle ein neues Secret
      </h2>
      <form
        name="createSecret"
        method="post"
        class="flex flex-col items-stretch gap-4"
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
          class="min-h-40 md:min-h-60 p-2 border-2 border-gray-500 rounded"
          placeholder="Passwort, Token oder andere Information..."
        />

        <div class="grid grid-cols-[min-content_1fr] gap-4 items-center">
          <CustomExpireInForm />
          <PassphraseInput />
          <ViewCountLimitInput />
        </div>

        <button class="p-2" type="submit">
          Anlegen
        </button>
      </form>
    </section>
  );
}
