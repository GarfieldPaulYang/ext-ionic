import { OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const STAR_RATING_VALUE_ACCESSOR: any;
export declare class StarRatingCmp implements OnInit, OnDestroy, ControlValueAccessor {
    private elementRef;
    max: number;
    readonly: boolean;
    private range;
    private innerValue;
    private hammer;
    private onChangeCallback;
    value: number;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    setIcon(r: number): string;
    writeValue(val: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    rate(amount: number): void;
    private setupHammerHandlers();
    private fullStates();
}
