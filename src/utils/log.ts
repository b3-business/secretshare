import { signal } from "@preact/signals";

export type RichMessage =
  | {
    type: "string";
    text: string;
    extraInfo?: string;
  }
  | {
    type: "error";
    text: string;
    extraInfo?: string;
  }
  | {
    type: "secretFetch";
    secret: string;
    header?: string;
    extraInfo?: string;
  }
  | {
    type: "secretCreate";
    secretLink: string;
    header?: string;
    extraInfo?: string;
  };

export const lastMessage = signal<RichMessage | undefined>(undefined);
