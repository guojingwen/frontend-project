import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appAgo'
})
export class AgoPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if(value) {
      const second = (Date.now() - (new Date(value)).getTime())/1000
      if(second < 30) {
        return '刚刚'
      }
      return new Date(value).toLocaleDateString();
      // const intervals = {
      //   年: 3600 * 24 * 365,
      //   月: 3600 * 24 * 30,
      //   周: 3600 * 24 * 7,
      //   天: 3600 * 24,
      //   小时: 3600,
      //   分钟: 60,
      //   秒: 1,
      // }
    }
  }
}
