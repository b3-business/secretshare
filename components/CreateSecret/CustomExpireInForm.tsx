import { signal } from "@preact/signals";
import { scrollNumberInputValue } from "@/src/utils/wheelEventHandler.ts";
const isCustomExpireIn = signal(false);

export default function CustomExpireInForm() {
  return (
    <>
      <input
        type="checkbox"
        name="customExpireIn"
        id="customExpireIn"
        checked={isCustomExpireIn.value}
        onChange={() => {
          isCustomExpireIn.value = !isCustomExpireIn.value;
        }}
      />
      <label
        for="customExpireIn"
        class="flex flex-col min-[360px]:flex-row min-[360px]:gap-1"
      >
        <span>Eigene Ablaufzeit</span>
        <span>(default: 1 Tag)</span>
      </label>
      {isCustomExpireIn.value && (
        <>
          <div>
            {/* placeholder div to keep the first grid column empty */}
          </div>
          <form id="duration" class="flex flex-row gap-2 justify-center">
            <label for="h">
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
              &nbsp;h
            </label>

            <label for="m">
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
              &nbsp;m
            </label>
          </form>
        </>
      )}
    </>
  );
}
