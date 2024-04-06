import { lastMessage } from "./log.ts";
export async function encrypt(key: string, secret: string) {
  const passphraseHash = new Uint8Array(
    await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(key),
    ),
  );
  if (!key || key.length < 1) {
    lastMessage.value = "Bitte geben Sie ein Passphrase ein!";
    return;
  }
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encryptedRaw = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    await crypto.subtle.importKey(
      "raw",
      passphraseHash,
      "AES-GCM",
      true,
      ["encrypt"],
    ),
    new TextEncoder().encode(secret),
  );
  const encryptedSecret = btoa(
    String.fromCharCode(...new Uint8Array(encryptedRaw)),
  );
  return { encryptedSecret, iv };
}

export async function decrypt(
  encryptedSecret: string,
  iv: Uint8Array,
  key: string,
) {
  if (!key || key.length < 1) {
    lastMessage.value = "Bitte geben Sie ein Passphrase ein!";
    return;
  }

  // hash passphrase to create a 128 bit Uint8Array functioning as key
  const passphraseHash = new Uint8Array(
    await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(key),
    ),
  );

  const decryptKey = await crypto.subtle.importKey(
    "raw",
    passphraseHash,
    "AES-GCM",
    true,
    ["decrypt"],
  ).catch((e) => {
    console.error(e);
    lastMessage.value = "Fehler beim Entschlüsseln des Secrets!";
    return;
  });

  if (!decryptKey) {
    return;
  }

  // secret from base64 to Uint8Array
  const b64 = atob(encryptedSecret);
  const secret = new Uint8Array(b64.length);
  for (let i = 0; i < b64.length; i++) {
    secret[i] = b64.charCodeAt(i);
  }

  const decryptedRaw = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    decryptKey,
    secret,
  ).catch((e: Error) => {
    console.error(e);
    lastMessage.value = "Fehler beim Entschlüsseln des Secrets!";
    return;
  });

  if (!decryptedRaw) {
    return;
  }

  const decryptedSecret = new TextDecoder().decode(decryptedRaw);
  return decryptedSecret;
}
