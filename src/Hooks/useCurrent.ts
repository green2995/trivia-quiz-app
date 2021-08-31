import React from "react";

export function useCurrent<T extends object>(value: T) {
  const ref = React.useRef(value);
  return ref.current;
}