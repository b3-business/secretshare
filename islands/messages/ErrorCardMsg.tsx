import { JSX } from "preact/jsx-runtime";

export default function CardMsg(
  props: {
    header?: string;
    extraInfo?: string;
    children: JSX.Element | undefined;
  },
) {
  return (
    <div class="flex flex-col items-start justify-center gap-2 shadow-lg rounded-lg p-4 max-w-2xl border-[1px] border-red-200 shadow-red-500/50">
      {props.header && (
        <h3 class="text-lg font-bold text-red-600">{props.header}</h3>
      )}
      {props.extraInfo && <p>{props.extraInfo}</p>}
      {props.children}
    </div>
  );
}
