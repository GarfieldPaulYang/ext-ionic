import { PipeTransform } from '@angular/core';
export declare class OrderBy implements PipeTransform {
    transform(input: any, [config]: [string]): any;
    private static _orderByComparator(a, b);
}
