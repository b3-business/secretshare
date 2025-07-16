import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html lang="de">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SecretShare</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/api/res/tailwind.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
