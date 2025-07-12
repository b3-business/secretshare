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
        <div class="flex flex-col items-start justify-center gap-2 shadow-lg rounded-lg p-4 max-w-2xl border-[1px] border-gray-200">
          <h3 class="text-lg font-bold">{message.header}</h3>
          <a
            class="text-primary-dark text-lg"
            href={message.secretLink}
            target="_blank"
          >
            {message.secretLink}
          </a>
          <p class="">{message.extraInfo}</p>
        </div>
      );
  }
}

export default function Log() {
  return <div>{renderMessage(lastMessage.value)}</div>;
}
