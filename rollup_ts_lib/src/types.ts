export type AnyFun = (...args: any[]) => any;
export type AnyObj = {
  [key: string]: string;
};

export interface Processor {
  receive(arg: any): any;
  send(arg: any): any;
}