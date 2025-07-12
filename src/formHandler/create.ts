import { encrypt } from "../utils/crypt.ts";
import { lastMessage } from "../utils/log.ts";
import { JSX } from "preact";

export default async function onSubmit(
  event: JSX.TargetedEvent<HTMLFormElement, Event>,
) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const secret = formData.get("secret") as string;

  if (!secret || secret.length < 1) {
    lastMessage.value = {
      type: "string",
      text: "Bitte geben Sie ein Secret ein!",
    };
    return;
  }

  let expireIn = -1;

  if (formData.get("customExpireIn")) {
    const durationFormData = new FormData(
      document.getElementById("duration") as HTMLFormElement,
    );
    const h = Number(durationFormData.get("h") || 0);
    const m = Number(durationFormData.get("m") || 0);
    expireIn = (h * 60 + m) * 60 * 1000;
  }

  let encryptedSecret = secret;
  let iv = undefined;
  let generatedKey = false;
  let encryptionKey = formData.get("passphrase") as string | null;

  if (formData.get("usePassphrase") == "on") {
    if (!encryptionKey) {
      lastMessage.value = {
        type: "string",
        text: "Bitte geben Sie ein Passphrase ein!",
      };
      return;
    }
  } else {
    // generate a random key
    console.log("Generating random key...");
    encryptionKey = btoa(
      String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))),
    );
    generatedKey = true;
  }

  console.log(`using encryption key: ${encryptionKey}`);
  const encryptedData = await encrypt(
    encryptionKey,
    secret,
  );
  if (encryptedData == undefined) {
    lastMessage.value = {
      type: "error",
      text: "Fehler beim Verschlüsseln des Secrets!",
    };
    return;
  }
  encryptedSecret = encryptedData.encryptedSecret;
  iv = encryptedData.iv;

  const hashArray = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(secret),
  );
  const allowedViews = 1;

  const hash = btoa(String.fromCharCode(...new Uint8Array(hashArray)));

  const response = await fetch("/api/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ encryptedSecret, expireIn, hash, allowedViews, iv }),
  });
  const data = await response.json().catch(() =>
    lastMessage.value = {
      type: "error",
      text: "Fehler beim Erstellen des Secrets!",
    }
  );
  if (data && data.link) {
    const secretUrl = `${location.origin}/secret/${data.link}${
      generatedKey ? `?encryptionKey=${btoa(encryptionKey)}` : ""
    }`;
    // copy url to clipboard
    navigator.clipboard.writeText(secretUrl);
    lastMessage.value = {
      type: "secretCreate",
      secretLink: secretUrl,
      header: `Link erstellt`,
      extraInfo: `Link wurde in die Zwischenablage kopiert!`,
    };
  }
}
