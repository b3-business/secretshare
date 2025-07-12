import { signal } from "@preact/signals";

export type RichMessage =
  | {
    type: "string";
    text: string;
  }
  | {
    type: "error";
    text: string;
  }
  | {
    type: "secretFetch";
    secret: string;
  }
  | {
    type: "secretCreate";
    secretLink: string;
  };

export const lastMessage = signal<RichMessage | undefined>(undefined);
