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
      return (
        <div class="flex flex-col items-center justify-center gap-4">
          <h3>{message.header}</h3>
          <a href={message.secretLink} target="_blank">{message.secretLink}</a>
          <p>{message.extraInfo}</p>
        </div>
      );
  }
}

export default function Log() {
  return <div>{renderMessage(lastMessage.value)}</div>;
}
