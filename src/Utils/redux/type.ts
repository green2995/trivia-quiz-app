import { PayloadAction, Slice } from "@reduxjs/toolkit";

export type SliceAction<T extends Slice, K extends keyof T["actions"]> =
  PayloadAction<Parameters<T["actions"][K]>[0]>