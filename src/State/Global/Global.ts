import { useCurrent } from "../../Hooks/useCurrent";
import GlobalX from "./GlobalX";

const globalX = new GlobalX();

export function useGlobal() {
  const global = useCurrent(globalX);
  return global;
}
