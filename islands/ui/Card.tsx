import { JSX } from "preact/jsx-runtime";
import { twJoin } from "tailwind-merge";

export default function Card(
  props: {
    class?: string;
    children: JSX.Element | undefined;
  },
) {
  const classes = twJoin(
    "shadow-lg rounded-lg  max-w-2xl border-[1px] border-gray-200",
    props.class,
  );
  return (
    <div class={classes}>
      {props.children}
    </div>
  );
}
