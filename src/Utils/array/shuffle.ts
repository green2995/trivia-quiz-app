export function shuffle<T>(arr: T[]): T[] {
  const bufferSize = 10;
  const buffers: Record<number, T[]> = {};

  for (let i = 0; i < bufferSize; i += 1) {
    buffers[i] = [];
  }

  for (let i = 0; i < arr.length; i += 1) {
    const random = Math.floor(Math.random() * bufferSize);
    buffers[random].push(arr[i]);
  }

  return Object.values(buffers)
    .reduce((acc, ele) => acc.concat(ele))
}