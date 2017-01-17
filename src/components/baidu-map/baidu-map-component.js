import { Inject, Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import { WHCYIT_IONIC_CONFIG } from '../../config/config';
import { BaiduMapController, BMap } from './baidu-map';
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
        return _.assign({}, this.config.baiduMap, this.options);
    };
    BaiduMap.decorators = [
        { type: Component, args: [{
                    selector: 'ion-baidu-map',
                    template: "\n    <div class=\"offlinePanel\" [style.opacity]=\"opacity\">\n      <label>\u5509\u5440\uFF0C\u7F51\u7EDC\u51FA\u95EE\u9898\u4E86</label>\n    </div>\n  "
                },] },
    ];
    BaiduMap.ctorParameters = [
        { type: ElementRef, },
        { type: BaiduMapController, },
        { type: undefined, decorators: [{ type: Inject, args: [WHCYIT_IONIC_CONFIG,] },] },
    ];
    BaiduMap.propDecorators = {
        'options': [{ type: Input },],
        'onMapLoaded': [{ type: Output },],
        'onMapLoadFialed': [{ type: Output },],
        'onMapClick': [{ type: Output },],
        'onMarkerClick': [{ type: Output },],
    };
    return BaiduMap;
}());
//# sourceMappingURL=baidu-map-component.js.map