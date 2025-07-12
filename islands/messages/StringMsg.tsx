export default function StringMsg(props: { text: string }) {
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
        }}
        class="md:min-w-[250px]"
      >
        {props.text}
      </pre>
    </section>
  );
}
