export function createDebouncer() {
  let timoutId: NodeJS.Timeout;

  function append(callback: () => void, interval = 100) {
    clear();
    timoutId = setTimeout(callback, interval);
  }

  function clear() {
    if (timoutId !== undefined) clearTimeout(timoutId);    
  }

  return [append, clear] as const;
}

