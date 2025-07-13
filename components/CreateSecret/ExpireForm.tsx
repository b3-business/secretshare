import { signal } from "@preact/signals";
import { scrollNumberInputValue } from "@/src/utils/wheelEventHandler.ts";
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
          <input
            class="p-2 border-2 border-gray-500 rounded"
            id="h"
            name="h"
            type="number"
            min="0"
            max="999"
            value={0}
            onWheel={scrollNumberInputValue}
          />
          <label for="h">h</label>
          &nbsp;
          <input
            class="p-2 border-2 border-gray-500 rounded"
            id="m"
            name="m"
            type="number"
            min="0"
            max="59"
            value={0}
            onWheel={scrollNumberInputValue}
          />
          <label for="m">m</label>
        </form>
      )}
    </>
  );
}
