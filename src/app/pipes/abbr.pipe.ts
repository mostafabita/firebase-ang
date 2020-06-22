import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbr',
})
export class AbbrPipe implements PipeTransform {
  transform(value: string, length: number = 2): any {
    if (!value) return null;
    return value
      .split(' ')
      .map((str) => str.substr(0, 1))
      .join('')
      .substr(0, length)
      .toUpperCase();
  }
}
