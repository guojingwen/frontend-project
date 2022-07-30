import EventEmmiter from "./event";
import { Processor } from "./types";
import {camelCase} from 'lodash';

export * from './dataProcessors';


export default class Chat extends EventEmmiter {
  private processors: Processor[];
  constructor() {
    super();
    this.processors = [] as Processor[];
    console.log('es2022', [1,2,3].at(-1));
    console.log('camelCase', camelCase('abc-xyz-nnn'));
  }
  test() {
    console.log('test', this.processors);
  }
}
