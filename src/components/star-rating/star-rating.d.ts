import { OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const STAR_RATING_VALUE_ACCESSOR: any;
export declare class StarRatingCmp implements OnDestroy, ControlValueAccessor {
    half: boolean;
    max: number;
    readonly: boolean;
    stars: Array<string>;
    private _value;
    private onTouchedCallback;
    private onChangeCallback;
    constructor();
    value: number;
    out(): void;
    valchange(val: number): void;
    writeValue(val: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    ngOnDestroy(): void;
    _getStart(i: number): string;
    _updateStars(): void;
}
