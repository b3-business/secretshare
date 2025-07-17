import { JSX } from "preact/jsx-runtime";

export default function CardMsg(
  props: {
    header?: string;
    extraInfo?: string;
    children: JSX.Element | undefined;
  },
) {
  return (
    <div class="flex flex-col items-start justify-center gap-2 rounded-lg p-4 max-w-2xl border-2 border-red-400 ">
      {props.header && (
        <h3 class="text-lg font-bold text-red-500">{props.header}</h3>
      )}
      {props.extraInfo && <p>{props.extraInfo}</p>}
      {props.children}
    </div>
  );
}
