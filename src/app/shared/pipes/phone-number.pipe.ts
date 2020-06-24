import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (!value) return '';

    const firstArr = [];
    const secondArr = [];
    const thirdArr = [];
    [...value].forEach((el, index) => {
      if (index <= 2) {
        firstArr.push(el);
        return;
      }

      if (index <= 5 && index > 2) {
        secondArr.push(el);
        return;
      }

      if (index > 5) {
        thirdArr.push(el);
        return;
      }
    });

    return `(${firstArr.join('')}) ${secondArr.join('')}-${thirdArr.join('')}`;
  }
}
