import { signal } from "@preact/signals";
const isCustomExpireIn = signal(false);

export default function ExpireForm() {
  return (
    <>
      <label class="mt-4">
        <input
          type="checkbox"
          name="customExpireIn"
          checked={isCustomExpireIn.value}
          onChange={() => {
            isCustomExpireIn.value = !isCustomExpireIn.value;
          }}
        />
        &nbsp;Eigene Ablaufzeit (default: 1 Tag)
      </label>
      {isCustomExpireIn.value && (
        <form id="duration">
          <input id="h" name="h" type="number" min="0" max="999" value={0} />
          <label for="h">h</label>
          &nbsp;
          <input id="m" name="m" type="number" min="0" max="59" value={0} />
          <label for="m">m</label>
        </form>
      )}
    </>
  );
}
