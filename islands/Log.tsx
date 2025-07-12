import { lastMessage, RichMessage } from "../src/utils/log.ts";
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
      return <StringMsg text={message.secretLink} />;
  }
}

export default function Log() {
  return <div>{renderMessage(lastMessage.value)}</div>;
}
