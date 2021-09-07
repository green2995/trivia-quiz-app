import constate from "constate";
import React from "react";
import { useDebounce } from "../Hooks/useDebounce";

const DEBOUNCE_DURATION = 100;

function useResponsive() {
  const [viewport, setViewport] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const size = findSize(viewport.width);
  const [appendUpdate, clearUpdate] = useDebounce();

  function onResize() {
    const {innerHeight, innerWidth} = window;
    appendUpdate(() => {
      setViewport({
        width: innerWidth,
        height: innerHeight,
      })
    }, DEBOUNCE_DURATION)
  }

  React.useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      clearUpdate();
      window.removeEventListener("resize", onResize);
    }
  }, [])

  return {
    viewport,
    size,
  } as const
}

export const [Provider, useResponsiveContext] = constate(useResponsive);

export function createResponsiveComponent<P>(Component: React.ComponentType<P>) {
  return (props: React.PropsWithChildren<ResponsiveProps<P>>) => {
    const {size} = useResponsive();
    const {lg, md, xs, sm, fallback} = props;
    const propMap = {lg, md, xs, sm};
        
    const p = propMap[size];
    if (p) return <Component {...p} children={props.children} />;
    if (!fallback) throw Error("no matching size: expected fallback but got none")
    return <Component {...fallback} children={props.children} />;
  }
}

function findSize(width: number) {
  const arr = Object.entries(sizeMap).sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < arr.length; i += 1) {
    if (width >= arr[i][1]) return arr[i][0] as "md" | "lg" | "sm"
  }

  return "xs";
}

const sizeMap = {
  sm: 768,
  md: 992,
  lg: 1200,
}

type ResponsiveProps<P> = {
  xs?: P
  sm?: P
  md?: P
  lg?: P
  fallback?: P
}