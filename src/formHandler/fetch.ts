import { lastMessage } from "../utils/log.ts";
import { JSX } from "preact";

export default async function onClick(
  event: JSX.TargetedMouseEvent<HTMLButtonElement>,
  uuid: string,
) {
  event.preventDefault();
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
  console.log(data);
  if (data && data.secret) {
    lastMessage.value = `Secret Data: \n${data.secret}`;
  }
}
