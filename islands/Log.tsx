import { lastMessage } from "../src/utils/log.ts";

export default function Log() {
  return (
    <section>
      <pre>{lastMessage}</pre>
    </section>
  );
}
