export function initCanvas(elementRef) {
  const canvas = elementRef.current;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0, 0, 150, 75);
}
