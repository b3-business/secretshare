import { lastMessage, RichMessage } from "@/src/utils/log.ts";
import CardMsg from "./messages/CardMsg.tsx";
import ErrorCardMsg from "./messages/ErrorCardMsg.tsx";
import { twJoin } from "tailwind-merge";

function renderMessage(message: RichMessage | undefined) {
  if (!message) {
    return undefined;
  }

  switch (message.type) {
    case "string":
      return (
        <CardMsg>
          <span>{message.text}</span>
        </CardMsg>
      );
    case "error":
      return (
        <ErrorCardMsg header="Error" extraInfo={message.extraInfo}>
          <span>{message.text}</span>
        </ErrorCardMsg>
      );
    case "secretFetch":
      return (
        <CardMsg header="Secret Data" extraInfo={message.extraInfo}>
          <pre class="monospace whitespace-pre-wrap break-words bg-gray-100 p-2 rounded-md overflow-auto w-full">
            {message.secret}
          </pre>
        </CardMsg>
      );
    case "secretCreate":
      return (
        <CardMsg header={message.header} extraInfo={message.extraInfo}>
          <a
            class="text-primary-dark text-lg wrap-anywhere"
            href={message.secretLink}
            target="_blank"
          >
            {message.secretLink}
          </a>
        </CardMsg>
      );
  }
}

export default function Log(props: { class?: string }) {
  const classes = twJoin("w-full max-w-[90%] md:max-w-2xl", props.class);

  return (
    <div class={classes}>
      {renderMessage(lastMessage.value)}
    </div>
  );
}
