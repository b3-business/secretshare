import { signal } from "@preact/signals";
import { scrollNumberInputValue } from "@/src/utils/wheelEventHandler.ts";

const useViewCount = signal(false);

export default function ViewCountLimitInput() {
  return (
    <>
      <input
        type="checkbox"
        name="useViewCount"
        id="useViewCount"
        checked={useViewCount.value}
        onChange={() => {
          useViewCount.value = !useViewCount.value;
        }}
      />
      <label
        for="useViewCount"
        class="flex flex-col min-[360px]:flex-row min-[360px]:gap-1"
      >
        <span>Anzeigelimit ändern</span>
        <span>(default: 1)</span>
      </label>
      {useViewCount.value && (
        <>
          <div>
            {/* placeholder div to keep the first grid column empty */}
          </div>
          <label class="flex flex-col gap-2">
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
        </>
      )}
    </>
  );
}
