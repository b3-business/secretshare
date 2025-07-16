import { JSX } from "preact/jsx-runtime";

export default function CardMsg(
  props: {
    header?: string;
    extraInfo?: string;
    children: JSX.Element | undefined;
  },
) {
  return (
    <div class="flex flex-col items-start justify-center gap-2 rounded-lg p-4 border-2 border-gray-300">
      {props.header && <h3 class="text-lg font-bold">{props.header}</h3>}
      {props.extraInfo && <p>{props.extraInfo}</p>}
      {props.children}
    </div>
  );
}
