var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import { WHCYIT_IONIC_CONFIG } from '../../config/config';
import { BaiduMapController } from './baidu-map';
export var BaiduMap = (function () {
    function BaiduMap(_elementRef, baiduMapCtrl, config) {
        this._elementRef = _elementRef;
        this.baiduMapCtrl = baiduMapCtrl;
        this.config = config;
        this.onMapLoaded = new EventEmitter();
        this.onMapLoadFialed = new EventEmitter();
        this.onMapClick = new EventEmitter();
        this.onMarkerClick = new EventEmitter();
        this.opacity = 0;
        this.mapLoaded = false;
    }
    BaiduMap.prototype.ngAfterViewInit = function () {
        var _this = this;
        var opts = this.getOptions();
        this.baiduMapCtrl.init(opts, this._elementRef.nativeElement).then(function () {
            _this.baiduMapCtrl.addEventListener('click', _this.onMapClick);
            _this.reDraw(opts);
            _this.onMapLoaded.emit();
            _this.mapLoaded = true;
        }, function (e) {
            _this.opacity = 1;
            _this.onMapLoadFialed.emit(e);
        });
    };
    BaiduMap.prototype.ngOnChanges = function (changes) {
        if (!this.mapLoaded) {
            return;
        }
        var options = changes['options'];
        if (options.isFirstChange) {
            return;
        }
        if (options && !_.isEqual(options.previousValue, options.currentValue)) {
            this.reDraw(this.getOptions());
        }
    };
    BaiduMap.prototype.reDraw = function (opts) {
        this.baiduMapCtrl.panTo(new window['BMap'].Point(opts.center.lng, opts.center.lat));
        this.draw(opts.markers);
    };
    BaiduMap.prototype.draw = function (markers) {
        var opts = this.getOptions();
        if (opts.mass.enabled) {
            this.baiduMapCtrl.drawMassPoints(markers, opts.mass.options, this.onMarkerClick);
            return;
        }
        this.baiduMapCtrl.drawMarkers(markers, this.onMarkerClick);
    };
    BaiduMap.prototype.getOptions = function () {
        return _.assign({}, this.config.baiduMap, this.options);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BaiduMap.prototype, "options", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], BaiduMap.prototype, "onMapLoaded", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], BaiduMap.prototype, "onMapLoadFialed", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], BaiduMap.prototype, "onMapClick", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], BaiduMap.prototype, "onMarkerClick", void 0);
    BaiduMap = __decorate([
        Component({
            selector: 'ion-baidu-map',
            template: "\n    <div class=\"offlinePanel\" [style.opacity]=\"opacity\">\n      <label>\u5509\u5440\uFF0C\u7F51\u7EDC\u51FA\u95EE\u9898\u4E86</label>\n    </div>\n  "
        }),
        __param(2, Inject(WHCYIT_IONIC_CONFIG)), 
        __metadata('design:paramtypes', [ElementRef, BaiduMapController, Object])
    ], BaiduMap);
    return BaiduMap;
}());
//# sourceMappingURL=baidu-map-component.js.map