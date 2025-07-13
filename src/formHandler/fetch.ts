import { decrypt } from "@/src/utils/crypt.ts";
import { lastMessage } from "@/src/utils/log.ts";
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
    lastMessage.value = {
      type: "error",
      text:
        "Fehler beim Abrufen des Secrets! Entweder ist der Link abgelaufen oder ungültig.",
    };
    return;
  }

  const data = await response.json().catch(() =>
    lastMessage.value = {
      type: "error",
      text:
        "Fehler beim Abrufen des Secrets! Entweder ist der Link abgelaufen oder ungültig.",
    }
  );
  // turn json object iv into Uint8Array
  data.iv = new Uint8Array(Object.values(data.iv));
  if (data == undefined || data.secret == undefined) {
    lastMessage.value = {
      type: "error",
      text:
        "Fehler beim Abrufen des Secrets! Entweder ist der Link abgelaufen oder ungültig.",
    };
    return;
  }

  if (encryptionKey) {
    data.secret = await decrypt(
      data.secret,
      data.iv,
      encryptionKey,
    );
  } else {
    console.log("No encryption key found, using passphrase...");
    data.secret = await decrypt(
      data.secret,
      data.iv,
      formData.get("passphrase") as string,
    );
  }
  const hashRaw = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(data.secret),
  );

  const hash = btoa(String.fromCharCode(...new Uint8Array(hashRaw)));

  if (hash !== data.hash) {
    console.log(`${hash} !== ${data.hash}`);
    lastMessage.value = {
      type: "error",
      text:
        `Verifikation des Secrets fehlgeschlagen. Falsche Passphrase. Verbleibende versuche: ${data.viewsLeft}`,
    };
    return;
  }

  lastMessage.value = {
    type: "secretFetch",
    extraInfo: `Anzahl verbleibender Ansichten: ${data.viewsLeft}`,
    secret: data.secret,
  };
}
