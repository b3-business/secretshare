import onSubmit from "../src/formHandler/create.ts";

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
        <button type="submit">Anlegen</button>
      </form>
    </main>
  );
}
