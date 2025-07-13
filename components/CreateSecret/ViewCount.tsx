import { signal } from "@preact/signals";
import { scrollNumberInputValue } from "@/src/utils/wheelEventHandler.ts";

const useViewCount = signal(false);

export default function ViewCountInput() {
  return (
    <>
      <label>
        <input
          type="checkbox"
          name="useViewCount"
          checked={useViewCount.value}
          onChange={() => {
            useViewCount.value = !useViewCount.value;
          }}
        />
        &nbsp;Anzeigelimit ändern (default: 1)
      </label>
      {useViewCount.value && (
        <label>
          Anzeigelimit:&nbsp;
          <input
            type="number"
            name="viewCount"
            class="p-2 border-2 border-gray-500 rounded"
            placeholder="1"
            min={1}
            value={1}
            autocomplete="off"
            onWheel={scrollNumberInputValue}
          />
        </label>
      )}
    </>
  );
}
