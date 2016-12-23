"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var _ = require('lodash');
var baidu_map_options_1 = require('./baidu-map-options');
var baidu_map_1 = require('./baidu-map');
var BaiduMap = (function () {
    function BaiduMap(_elementRef, baiduMapCtrl) {
        this._elementRef = _elementRef;
        this.baiduMapCtrl = baiduMapCtrl;
        this.onMapLoaded = new core_1.EventEmitter();
        this.onMapClick = new core_1.EventEmitter();
        this.onMarkerClick = new core_1.EventEmitter();
        this.mapLoaded = false;
    }
    BaiduMap.prototype.ngOnInit = function () {
        var _this = this;
        var opts = this.getOptions();
        this.baiduMapCtrl.init(opts, this._elementRef.nativeElement.querySelector('.baidu-map')).then(function () {
            _this.baiduMapCtrl.addEventListener('click', _this.onMapClick);
            _this.reDraw(opts);
            _this.onMapLoaded.emit();
            _this.mapLoaded = true;
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
    BaiduMap.prototype.ngOnDestroy = function () { };
    BaiduMap.prototype.reDraw = function (opts) {
        this.baiduMapCtrl.panTo(new BMap.Point(opts.center.lng, opts.center.lat));
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
        return Object.assign({}, baidu_map_options_1.baiduMapDefaultOpts, this.options);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BaiduMap.prototype, "options", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BaiduMap.prototype, "onMapLoaded", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BaiduMap.prototype, "onMapClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BaiduMap.prototype, "onMarkerClick", void 0);
    BaiduMap = __decorate([
        core_1.Component({
            selector: 'ion-baidu-map',
            template: '<div class="baidu-map"></div>'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, baidu_map_1.BaiduMapController])
    ], BaiduMap);
    return BaiduMap;
}());
exports.BaiduMap = BaiduMap;
//# sourceMappingURL=baidu-map-component.js.map