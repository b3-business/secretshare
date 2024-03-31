import { lastMessage } from "../utils/log.ts";
import { JSX } from "preact";

export default async function onSubmit(
  event: JSX.TargetedEvent<HTMLFormElement, Event>,
) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const secret = formData.get("secret");
  const response = await fetch("/api/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ secret }),
  });
  const data = await response.json().catch(() =>
    lastMessage.value = "Fehler beim Erstellen des Secrets!"
  );
  if (data && data.link) {
    lastMessage.value = `Link erstellt: ${location.origin}/secret/${data.link}`;
  }
}
