import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'treeImgNote',
})
export class TreeImgNotePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!args) return 'N/A';

    const [images, index] = args;
    const curImgNote = images[index].Note;
    if (!curImgNote) return 'N/A';

    const strArr = [...curImgNote];
    const result = strArr.reduce((acc, cur) => {
      if ([...acc].length > 8) {
        return acc;
      }

      return acc + cur;
    }, '');
    return result;
  }
}
