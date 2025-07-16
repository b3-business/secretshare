import CreateSecret from "@/islands/CreateSecret.tsx";
import Log from "@/islands/Log.tsx";
import Card from "@/islands/ui/Card.tsx";

export default function CreateSecretPage() {
  return (
    <main class="flex flex-col items-center justify-center">
      <CreateSecret />
      <Log />
    </main>
  );
}
