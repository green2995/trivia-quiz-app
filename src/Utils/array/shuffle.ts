export function shuffle<T>(arr: T[]): T[] {
  const buffers = {
    0: [] as T[],
    1: [] as T[],
    2: [] as T[],
  }

  for (let i = 0; i < arr.length; i += 1) {
    const random = Math.round(Math.random() * 2) as 0 | 1 | 2;
    buffers[random].push(arr[i]);
  }

  return Object.values(buffers)
    .reduce((acc, ele) => acc.concat(ele))
}