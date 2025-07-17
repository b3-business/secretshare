import CreateSecret from "@/islands/CreateSecret.tsx";
import Log from "@/islands/Log.tsx";

export default function CreateSecretPage() {
  return (
    <main class="flex flex-col items-center justify-center">
      <Log class="mt-4" />
      <CreateSecret />
    </main>
  );
}
