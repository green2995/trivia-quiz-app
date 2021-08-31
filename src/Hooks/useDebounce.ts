import { createDebouncer } from "../Utils/timing/debounce";
import { useCurrent } from "./useCurrent";

export function useDebounce() {
  const [append, clear] = useCurrent(createDebouncer());
  return [append, clear] as const;
}