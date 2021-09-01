export function getAbsoluteOffset(el: HTMLElement) {
  let node: HTMLElement | null = el;
  let x = 0;
  let y = 0;

  while (node) {
    x += node.offsetLeft - node.scrollLeft;
    y += node.offsetTop - node.scrollTop;
    if ("offsetParent" in node) {
      node = node.offsetParent as HTMLElement;
    } else {
      node = null;
    }
  }

  return {left: x, top: y}
}