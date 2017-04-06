"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var baidu_map_loader_1 = require("./baidu-map-loader");
var BMAP_STATUS_SUCCESS;
var BMAP_POINT_SIZE_SMALL;
var BMAP_POINT_SHAPE_CIRCLE;
var BaiduMapController = (function () {
    function BaiduMapController() {
    }
    BaiduMapController.prototype.init = function (opts, ele) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            baidu_map_loader_1.baiduMapLoader().then(function () {
                _this.initDeclarations();
                if (!ele || !opts) {
                    resolve();
                    return;
                }
                _this.map = new exports.BMap.Map(ele);
                setTimeout(function () {
                    _this.map.centerAndZoom(new exports.BMap.Point(opts.center.lng, opts.center.lat), opts.zoom);
                    if (opts.navCtrl) {
                        _this.map.addControl(new exports.BMap.NavigationControl());
                    }
                    if (opts.scaleCtrl) {
                        _this.map.addControl(new exports.BMap.ScaleControl());
                    }
                    if (opts.overviewCtrl) {
                        _this.map.addControl(new exports.BMap.OverviewMapControl());
                    }
                    if (opts.enableScrollWheelZoom) {
                        _this.map.enableScrollWheelZoom();
                    }
                    _this.map.setCurrentCity(opts.city);
                    resolve();
                });
            }, reject);
        });
    };
    BaiduMapController.prototype.translateGps = function (gpsData) {
        if (gpsData === void 0) { gpsData = []; }
        return new Promise(function (resolve) {
            var points = [];
            gpsData.forEach(function (value, index) {
                points.push(new exports.BMap.Point(value.lng, value.lat));
            });
            var convertor = new exports.BMap.Convertor();
            convertor.translate(points, 1, 5, resolve);
        });
    };
    BaiduMapController.prototype.geoLocation = function () {
        return new Promise(function (resolve, reject) {
            var location = new exports.BMap.Geolocation();
            location.getCurrentPosition(function (result) {
                if (location.getStatus() === BMAP_STATUS_SUCCESS) {
                    resolve(result);
                }
                else {
                    reject('不能获取位置');
                }
            }, function () {
                reject('定位失败');
            });
        });
    };
    BaiduMapController.prototype.clearOverlays = function () {
        this.map.clearOverlays();
    };
    BaiduMapController.prototype.panTo = function (point) {
        this.map.panTo(point);
    };
    BaiduMapController.prototype.geoLocationAndCenter = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.geoLocation().then(function (result) {
                _this.panTo(result.point);
                resolve(result);
            }, function () { return reject('定位失败'); });
        });
    };
    BaiduMapController.prototype.addEventListener = function (event, handler) {
        this.map.addEventListener(event, function (e) {
            handler.emit(e);
        });
    };
    BaiduMapController.prototype.addMarker = function (markerOpts, clickHandler) {
        var marker = this.createMarker(markerOpts);
        var infoWindow = this.createInfoWindow(markerOpts);
        if (infoWindow) {
            marker.addEventListener('click', function (e) {
                marker.openInfoWindow(infoWindow);
            });
        }
        else {
            marker.addEventListener('click', function (e) {
                clickHandler.emit(e);
            });
        }
        this.map.addOverlay(marker);
    };
    BaiduMapController.prototype.drawMarkers = function (markers, clickHandler) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (!markers || markers.length === 0) {
                    reject('没有传入兴趣点');
                    return;
                }
                _this.clearOverlays();
                markers.forEach(function (marker) {
                    _this.addMarker(marker, clickHandler);
                });
                resolve();
            });
        });
    };
    BaiduMapController.prototype.drawMassPoints = function (markers, opts, clickHandler) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (!markers || markers.length === 0) {
                    reject('没有传入兴趣点');
                    return;
                }
                _this.clearOverlays();
                var points = [];
                markers.forEach(function (marker) {
                    points.push(new exports.BMap.Point(marker.point.lng, marker.point.lat));
                });
                var pointCollection = new exports.BMap.PointCollection(points, _.assign({}, {
                    size: BMAP_POINT_SIZE_SMALL,
                    shape: BMAP_POINT_SHAPE_CIRCLE,
                    color: '#d340c3'
                }, opts));
                pointCollection.addEventListener('click', function (e) {
                    clickHandler.emit(e);
                });
                _this.map.addOverlay(pointCollection);
                resolve();
            });
        });
    };
    BaiduMapController.prototype.initDeclarations = function () {
        exports.BMap = window['BMap'];
        BMAP_STATUS_SUCCESS = window['BMAP_STATUS_SUCCESS'];
        BMAP_POINT_SIZE_SMALL = window['BMAP_POINT_SIZE_SMALL'];
        BMAP_POINT_SHAPE_CIRCLE = window['BMAP_POINT_SHAPE_CIRCLE'];
    };
    BaiduMapController.prototype.createIcon = function (marker) {
        if (marker.icon) {
            if (marker.size) {
                return new exports.BMap.Icon(marker.icon, new exports.BMap.Size(marker.size.width, marker.size.height));
            }
            return new exports.BMap.Icon(marker.icon);
        }
        return null;
    };
    BaiduMapController.prototype.createInfoWindow = function (marker) {
        if (marker.infoWindow) {
            var msg = '<p>' + marker.infoWindow.title + '</p><p>' + marker.infoWindow.content + '</p>';
            return new exports.BMap.InfoWindow(msg, {
                enableMessage: !!marker.infoWindow.enableMessage,
                enableCloseOnClick: true
            });
        }
        return null;
    };
    BaiduMapController.prototype.createMarker = function (marker) {
        var icon = this.createIcon(marker);
        var pt = new exports.BMap.Point(marker.point.lng, marker.point.lat);
        if (icon) {
            return new exports.BMap.Marker(pt, { icon: icon });
        }
        return new exports.BMap.Marker(pt);
    };
    return BaiduMapController;
}());
BaiduMapController = __decorate([
    core_1.Injectable()
], BaiduMapController);
exports.BaiduMapController = BaiduMapController;
//# sourceMappingURL=baidu-map.js.map