

export const scrollNumberInputValue = (e: WheelEvent) => {
  const target = e.target as HTMLInputElement;

  if (!target || target.tagName !== "INPUT") return;
  if (target.type === "number") {
    e.preventDefault();
    e.stopPropagation();

    const min = parseInt(target.min, 10) || 0;
    const max = parseInt(target.max, 10) || Number.MAX_SAFE_INTEGER;

    if (e.deltaY < 0) {
      target.value = String(Math.min(Number(target.value) + 1, max));
    } else if (e.deltaY > 0) {
      target.value = String(Math.max(Number(target.value) - 1, min));
    }
  }
}