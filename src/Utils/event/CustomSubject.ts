import { CustomEventEmitter } from "./CustomEventEmitter";

export class CustomSubject<T> {
  private _value: T;
  private _initial: T;
  private _emitter = new CustomEventEmitter<ObserverEvents<T>>();

  constructor(initial: T) {
    this._value = initial;
    this._initial = initial;
  }
  
  get value() {
    return this._value;
  }

  set(v: T | ((prev: T) => T)) {
    if (typeof v === "function") {
      //@ts-ignore
      const next = v(this.value);
      this._value = next;
      this._emitter.emit("set", next)
    } else {
      this._value = v;
      this._emitter.emit("set", v)
    }
  }

  on(callback: (v: T) => void) {
    return this._emitter.addListener("set", callback);
  }

  initialize() {
    this._value = this._initial;
  }
}

type ObserverEvents<T> = {
  set: (v: T) => void
}
