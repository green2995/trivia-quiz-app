import EventEmitter from "events";

export class CustomEventEmitter<T extends Record<string, (...parameters: any[]) => void>> {
  private _emitter: EventEmitter
  constructor() {
    this._emitter = new EventEmitter();
  }

  addListener<K extends Exclude<keyof T, number>>(type: K, listener: T[K]) {
    this._emitter.addListener(type, listener);
    const unsubscribe = () => this._emitter.removeListener(type, listener);
    return unsubscribe;
  }

  emit<K extends Exclude<keyof T, number>>(type: K, ...parameters: Parameters<T[K]>) {
    return this._emitter.emit(type, ...parameters);
  }

  listenerCount<K extends Exclude<keyof T, number>>(type: K) {
    return this._emitter.listenerCount(type);
  }

  removeAllListeners() {
    return this._emitter.removeAllListeners();
  }
}
