import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { dateFormat } from '../utils/util';

@Pipe({
  name: 'dateFormat',
  pure: true
})
@Injectable()
export class DateFormat implements PipeTransform {
  transform(value: any, format: string = 'yyyy-MM-dd'): any {
    if (!value) {
      return null;
    }

    return dateFormat(value, format);
  }
}
