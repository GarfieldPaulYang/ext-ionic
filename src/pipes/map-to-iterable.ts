import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'map-to-iterable'
})
@Injectable()
export class MapToIterable {
  transform(value, args) {
    let result: Array<any> = [];

    if (value.entries) {
      for (var [key, value] of value.entries()) {
        result.push({ key, value });
      }
    } else {
      for (let key in value) {
        result.push({ key, value: value[key] });
      }
    }

    return result;
  }
}
