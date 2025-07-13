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
    ) || false;
  } else {
    console.log("No encryption key found, using passphrase...");
    data.secret = await decrypt(
      data.secret,
      data.iv,
      formData.get("passphrase") as string,
    ) || false;
  }

  if (!data.secret) {
    // just return, lastMessage will be set in decrypt function
    return;
  }

  lastMessage.value = {
    type: "secretFetch",
    extraInfo: `Anzahl verbleibender Ansichten: ${data.viewsLeft}`,
    secret: data.secret,
  };
}
