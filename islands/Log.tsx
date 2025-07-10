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
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
          border: "solid 2px gray",
          padding: "1rem",
          backgroundColor: "lightgray",
          maxWidth: "100%",
          width: "100%",
          overflow: "auto",
          maxHeight: "50vh",
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
