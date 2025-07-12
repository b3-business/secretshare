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
      return <StringMsg text={message.secret} />;
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
