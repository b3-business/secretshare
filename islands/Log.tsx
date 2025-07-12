import { lastMessage, RichMessage } from "../src/utils/log.ts";
import CardMsg from "./messages/CardMsg.tsx";
import StringMsg from "./messages/StringMsg.tsx";

function renderMessage(message: RichMessage | undefined) {
  if (!message) {
    return undefined;
  }

  switch (message.type) {
    case "string":
      return <StringMsg text={message.text} />;
    case "error":
      return <StringMsg text={message.text} />;
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
