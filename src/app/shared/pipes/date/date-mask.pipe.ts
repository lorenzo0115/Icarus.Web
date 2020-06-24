import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'dateMask',
})
export class DateMaskPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!value) {
      return '';
    }
    return moment(value).local().format('MM-DD-YYYY');
  }
}
