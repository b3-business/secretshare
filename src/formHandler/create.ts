import { lastMessage } from "../utils/log.ts";
import { JSX } from "preact";

export default async function onSubmit(
  event: JSX.TargetedEvent<HTMLFormElement, Event>,
) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const secret = formData.get("secret") as string;

  if (!secret || secret.length < 1) {
    lastMessage.value = "Bitte geben Sie ein Secret ein!";
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
  const response = await fetch("/api/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ secret, expireIn }),
  });
  const data = await response.json().catch(() =>
    lastMessage.value = "Fehler beim Erstellen des Secrets!"
  );
  if (data && data.link) {
    lastMessage.value = `Link erstellt: ${location.origin}/secret/${data.link}`;
  }
}
