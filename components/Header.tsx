export default function Header() {
  return (
    <div class="px-2 py-4 mx-auto bg-primary ">
      <a href="/">
        <header class="md:max-w-screen mx-auto flex flex-col items-center justify-center">
          <h1 class="text-4xl font-bold mb-4">SecretShare</h1>
          <p class="text-2xl text-balance text-center">
            Teile Passwörter und Tokens sicher über Einmal-View URL
          </p>
        </header>
      </a>
    </div>
  );
}
