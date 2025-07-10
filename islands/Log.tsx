import { lastMessage } from "../src/utils/log.ts";

export default function Log() {
  return (
    // TODO: enable when tailwind integration is working
    // <section class="max-w-full w-full overflow-x-auto md:max-w-[80%] md:w-[80%] border-solid border-2 border-gray-300 bg-gray-100 p-2">
    //   <pre class="wrap-break-word whitespace-pre-wrap">{lastMessage}</pre>
    // </section>
    <section>
      <pre
        style={{
          // correct line breaks for really long messages (like base64 encoded certificate secrets)
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
          // styles to mark this as some kind of log output
          border: "solid 2px gray",
          padding: "1rem",
          backgroundColor: "lightgray",
          // correct sizing
          maxWidth: "90%",
          width: "90%",
          overflow: "auto",
          maxHeight: "50vh",
          margin: "0 auto",
          // hide the log box if there is no message
          display: lastMessage.value && lastMessage.value.length > 0
            ? "block"
            : "none",
        }}
      >
        {lastMessage}
      </pre>
    </section>
  );
}
