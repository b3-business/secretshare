import { lastMessage, RichMessage } from "../src/utils/log.ts";
import CardMsg from "./messages/CardMsg.tsx";
import ErrorCardMsg from "./messages/ErrorCardMsg.tsx";

function renderMessage(message: RichMessage | undefined) {
  if (!message) {
    return undefined;
  }

  switch (message.type) {
    case "string":
      return (
        <CardMsg header="Error">
          <span>{message.text}</span>
        </CardMsg>
      );
    case "error":
      return (
        <ErrorCardMsg header="Error">
          <span>{message.text}</span>
        </ErrorCardMsg>
      );
    case "secretFetch":
      return (
        <CardMsg header="Secret Data">
          <pre class="monospace whitespace-pre-wrap wrap-anywhere bg-gray-100 p-2 rounded-md overflow-auto max-w-[90dvw] min-w-md">
            {message.secret}
          </pre>
        </CardMsg>
      );
    case "secretCreate":
      return (
        <CardMsg header={message.header} extraInfo={message.extraInfo}>
          <a
            class="text-primary-dark text-lg"
            href={message.secretLink}
            target="_blank"
          >
            {message.secretLink}
          </a>
        </CardMsg>
      );
  }
}

export default function Log() {
  return <div>{renderMessage(lastMessage.value)}</div>;
}
