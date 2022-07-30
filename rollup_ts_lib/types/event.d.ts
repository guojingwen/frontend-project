import { AnyFun } from "./types";
export default class EventEmmiter {
    private events;
    on(eventName: string, callback: AnyFun): void;
    emit(eventName: string, ...rest: any[]): void;
    off(eventName: string, callback: null | AnyFun): void;
    once(eventName: string, callback: AnyFun): void;
}
