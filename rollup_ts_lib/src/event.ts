import { AnyFun } from "./types";

export default class EventEmmiter {
  private events: {
    [key: string]: Array<AnyFun>;
  } = {};
  on(eventName: string, callback: AnyFun) {
    const events = (this.events[eventName] ??= []);
    events.push(callback);
  }
  emit(eventName: string, ...rest: any[]) {
    const events = (this.events[eventName] ??= []);
    events.forEach((cb) => cb(...rest));
  }
  off(eventName: string, callback: null | AnyFun) {
    const events = (this.events[eventName] ??= []);
    if (!callback) {
      this.events[eventName].length = 0;
    } else {
      this.events[eventName] = events.filter(item => (item != callback) && ((item as any).cb !== callback));
    }
  }
  once(eventName: string, callback: AnyFun) {
    const once = (...rest: any[]) => {
      callback(...rest);
      this.off(eventName, once);
    }
    once.cb = callback;
    this.on(eventName, once);
  }
}
