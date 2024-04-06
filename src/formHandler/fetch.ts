import { decrypt } from "../utils/crypt.ts";
import { lastMessage } from "../utils/log.ts";
import { JSX } from "preact";

export default async function onSubmit(
  event: JSX.TargetedEvent<HTMLFormElement, Event>,
  uuid: string,
  encryptionKey: string | null,
) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const response = await fetch(`/api/secret/${uuid}`, {
    method: "GET",
  });

  if (response.status >= 400) {
    lastMessage.value =
      "Fehler beim Abrufen des Secrets! Entweder ist der Link abgelaufen oder ungültig.";
    return;
  }

  const data = await response.json().catch(() =>
    lastMessage.value =
      "Fehler beim Abrufen des Secrets! Entweder ist der Link abgelaufen oder ungültig."
  );
  // turn json object iv into Uint8Array
  data.iv = new Uint8Array(Object.values(data.iv));
  if (data && data.secret) {
    if (formData.get("usePassphrase")) {
      data.secret = await decrypt(
        data.secret,
        data.iv,
        formData.get("passphrase") as string,
      );
    } else {
      if (encryptionKey) {
        data.secret = await decrypt(
          data.secret,
          data.iv,
          encryptionKey,
        );
      }
    }
    const hashRaw = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(data.secret),
    );

    const hash = btoa(String.fromCharCode(...new Uint8Array(hashRaw)));

    if (hash !== data.hash) {
      console.log(`${hash} !== ${data.hash}`);
      lastMessage.value =
        `Verifikation des Secrets fehlgeschlagen. Falsche Passphrase. Verbleibende versuche: ${data.viewsLeft}`;
      return;
    }
    lastMessage.value = `Secret Data: \n${data.secret}`;
  }
}
