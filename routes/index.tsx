import CreateSecret from "../islands/CreateSecret.tsx";
import Log from "../islands/Log.tsx";

export default function Home() {
  return (
    <main class="flex flex-col items-center justify-center">
      <CreateSecret />
      <Log />
    </main>
  );
}
